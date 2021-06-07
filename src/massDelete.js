async function massDelete() {
    const modelName = await context("model");
    const getQueryName = "all" + modelName;
    const deleteQueryName = "deleteMany" + modelName;

    const getImportIds = `{ ${[getQueryName]}(take: 200, skip: 0){ totalCount results{ id }}}`
    const resultImportIds = await gql(getImportIds);
    console.log(resultImportIds.allImport.totalCount);

    if (resultImportIds.allImport.results.length > 0) {
        const idsToDelete = resultImportIds.allImport.results.map(a => a.id);
        let deleteImport = `
            mutation {
                ${[deleteQueryName]}(input: $input) {
                    id
                }
            }
        `;
        return await gql(deleteImport, { input: { ids: idsToDelete } });
    }
}

export default massDelete;