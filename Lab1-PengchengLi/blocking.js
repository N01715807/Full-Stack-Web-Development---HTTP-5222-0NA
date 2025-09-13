console.log("Blocking: Start");

function showMessage() {
  console.log("setTimeout callback");
}

setTimeout(showMessage, 1000);

let start = Date.now();
while (Date.now() - start < 3000) {
}

console.log("Blocking");