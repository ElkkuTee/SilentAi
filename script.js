const chat = document.getElementById("chat");
const messageInput = document.getElementById("message");
const sendBtn = document.getElementById("send");

function appendMessage(text, sender) {
  const msg = document.createElement("div");
  msg.className = `message ${sender}`;
  msg.textContent = `${sender === 'user' ? 'You' : 'AI'}: ${text}`;
  chat.appendChild(msg);
  chat.scrollTop = chat.scrollHeight;
}

async function sendMessage() {
  const userMessage = messageInput.value.trim();
  if (!userMessage) return;

  appendMessage(userMessage, 'user');
  messageInput.value = "";

  try {
    const response = await fetch("/.netlify/functions/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMessage })
    });

    const data = await response.json();
    const aiMessage = data.choices?.[0]?.message?.content || "No response from AI.";
    appendMessage(aiMessage, 'bot');
  } catch (err) {
    appendMessage("Error talking to AI: " + err.message, 'bot');
  }
}

sendBtn.addEventListener("click", sendMessage);
messageInput.addEventListener("keydown", e => {
  if (e.key === "Enter") sendMessage();
});
