console.log("Non-blocking: Start");

function showMessage() {
  console.log("setTimeout callback");
}

setTimeout(showMessage, 1000);

console.log("After setTimeout");
