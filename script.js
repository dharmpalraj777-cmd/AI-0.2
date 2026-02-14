const chatBox = document.getElementById("chatBox");

function sendMessage() {
  const input = document.getElementById("userInput");
  const message = input.value.trim();
  if (message === "") return;

  addMessage(message, "user");
  input.value = "";

  showTyping();

  setTimeout(() => {
    removeTyping();
    const reply = generateReply(message);
    addMessage(reply, "bot");
  }, 1200);
}

function addMessage(text, sender) {
  const div = document.createElement("div");
  div.classList.add("message", sender);
  div.innerText = text;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function showTyping() {
  const typing = document.createElement("div");
  typing.classList.add("message", "bot");
  typing.id = "typing";
  typing.innerText = "Typing...";
  chatBox.appendChild(typing);
}

function removeTyping() {
  const typing = document.getElementById("typing");
  if (typing) typing.remove();
}

function generateReply(msg) {
  msg = msg.toLowerCase();

  if (msg.includes("hello")) {
    return "Hello 👋 How can I help you today?";
  } 
  else if (msg.includes("ai")) {
    return "I am an advanced AI assistant built using HTML, CSS and JavaScript.";
  } 
  else if (msg.includes("price")) {
    return "Please tell me the product name.";
  } 
  else if (msg.includes("who are you")) {
    return "I am your smart AI assistant 🤖";
  } 
  else {
    return "That's interesting! Tell me more...";
  }
}

function clearChat() {
  chatBox.innerHTML = "";
}
