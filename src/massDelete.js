async function massDelete() {
    const modelName = await context("model");
    let take = 200;
    let skip = 0;

    const totalQuery = `{ ${["all" + modelName ]}{ totalCount }}`
    const totalRecords = await gql(totalQuery);
    let loopTimes = Math.ceil(totalRecords.allImport.totalCount / take);
    let idsToDelete = [];
    
    for (let i = 0; i < loopTimes; i++) { 
        const getImportIds = `{ ${["all" + modelName ]}(take: ${take}, skip: ${skip}){ results{ id }}}`
        const resultImportIds = await gql(getImportIds);

        resultImportIds.allImport.results.forEach(obj => {
            idsToDelete.push(obj.id);
        });
        skip = skip + take;
    }
    
    if (idsToDelete.length > 0) {
        let deleteImport = `
            mutation {
                ${["deleteMany" + modelName]}(input: $input) {
                    id
                }
            }
        `;
        await gql(deleteImport, { input: { ids: idsToDelete } });
    } 
}

export default massDelete;