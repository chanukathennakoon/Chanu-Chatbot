const chatBox = document.getElementById("chat-box");
const chatForm = document.getElementById("chat-form");
const userInput = document.getElementById("user-input");

const API_KEY = "AIzaSyCm4zV-6hAx_5WjPQ1XT52Qggka52tZ6zY";
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const message = userInput.value.trim();
  if (!message) return;

  appendMessage("user", message);
  userInput.value = "";

  try {
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: message }] }]
      })
    });

    const data = await response.json();
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response.";
    appendMessage("bot", reply);
  } catch (error) {
    appendMessage("bot", "⚠️ Error: " + error.message);
  }
});

function appendMessage(sender, text) {
  const messageDiv = document.createElement("div");
  messageDiv.className = `message ${sender}`;
  messageDiv.textContent = text;
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}
const clearBtn = document.getElementById("clear-btn");

clearBtn.addEventListener("click", () => {
  chatBox.innerHTML = "";
});

const fileInput = document.getElementById("file-input");

fileInput.addEventListener("change", async () => {
  const file = fileInput.files[0];
  if (file && file.type === "application/pdf") {
    appendMessage("user", `📎 Reading: ${file.name}...`);

    const reader = new FileReader();
    reader.onload = async function () {
      const typedarray = new Uint8Array(this.result);
      const pdf = await pdfjsLib.getDocument(typedarray).promise;

      let fullText = "";
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const pageText = content.items.map(item => item.str).join(" ");
        fullText += `\n\nPage ${i}:\n` + pageText;
      }

      appendMessage("user", `📄 Extracted text from "${file.name}"`);
      sendToGemini(fullText.slice(0, 10000)); // Limit for prompt size
    };
    reader.readAsArrayBuffer(file);
  } else {
    appendMessage("bot", "❌ Please upload a valid PDF file.");
  }
});
async function sendToGemini(message) {
  try {
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: message }] }]
      })
    });

    const data = await response.json();
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response.";
    appendMessage("bot", reply);
  } catch (error) {
    appendMessage("bot", "⚠️ Error: " + error.message);
  }
}
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = userInput.value.trim();
  if (!message) return;

  appendMessage("user", message);
  userInput.value = "";
  sendToGemini(message);
});

