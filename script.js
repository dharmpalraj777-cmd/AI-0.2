async function sendMessage() {
  const input = document.getElementById("userInput");
  const message = input.value.trim();
  if (!message) return;

  addMessage(message, "user");
  input.value = "";

  const response = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ message })
  });

  const data = await response.json();
  addMessage(data.reply, "bot");
}

function addMessage(text, sender) {
  const chatBox = document.getElementById("chatBox");
  const div = document.createElement("div");
  div.classList.add("message", sender);
  div.innerText = text;
  chatBox.appendChild(div);
}

// 👇 Enter key support
document.getElementById("userInput").addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    sendMessage();
  }
});
