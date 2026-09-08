export async function helloWorld() {
  console.log("Hello, World!");
  await bye();
}

async function bye() {
  console.log("Goodbye, World!");
}