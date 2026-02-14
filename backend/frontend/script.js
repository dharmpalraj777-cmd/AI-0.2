async function send() {
  const msg = document.getElementById("msg").value;
  document.getElementById("chat").innerHTML += `<p><b>You:</b> ${msg}</p>`;

  const res = await fetch("https://your-app-name.onrender.com/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: msg })
  });

  const data = await res.json();
  document.getElementById("chat").innerHTML += `<p><b>AI:</b> ${data.reply}</p>`;
  document.getElementById("msg").value = "";
}
