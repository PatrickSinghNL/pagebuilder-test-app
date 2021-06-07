async function helloWorld() {
	const message = await context("message");
	const name = await context("name");
	console.log(name, ' ', message);
}

export default helloWorld;