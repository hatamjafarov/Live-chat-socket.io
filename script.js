const socket = io("http://localhost:3000");
const messageContainer = document.getElementById("message-container");
const messageForm = document.getElementById("send-container");
const messageInput = document.getElementById("message-input");

const buttton = document.getElementById("send-button");

const name = prompt("Adın nədir?");
appendInfo("Sən qoşuldun");
socket.emit("new-user", name);

socket.on("chat-message", (data) => {
  appendMessage(`${data.name}: ${data.message}`);
});

socket.on("user-connected", (name) => {
  appendInfo(`${name} qoşuldu`);
});
socket.on("user-disconnected", (name) => {
  appendInfo(`${name} ayrıldı`);
});

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(messageContainer.scrollHeigh);
  messageContainer.scrollTop = messageContainer.scrollHeight;
  if (messageInput.value) {
    const message = messageInput.value;
    appendMessage(`Sən: ${message}`);
    socket.emit("send-chat-message", message);
    messageInput.value = "";
  }
});

function appendInfo(message) {
  const info = document.createElement("div");
  info.innerHTML = message;
  messageContainer.append(info);
}

function appendMessage(message) {
  const messageElement = document.createElement("li");
  const messageInnerElement = document.createElement("p");
  messageInnerElement.innerHTML = message;
  messageElement.append(messageInnerElement);
  messageContainer.append(messageElement);
}
