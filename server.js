const express = require("express");
const fetch = require("node-fetch");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY;
const BASE_URL = "https://models.inference.ai.azure.com";

app.use(express.static(path.join(__dirname)));
app.use(express.json());

app.post("/api/chat", async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await fetch(`${BASE_URL}/v1/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [{ role: "user", content: userMessage }]
      })
    });

    const data = await response.json();
    const aiMessage = data.choices?.[0]?.message?.content || "No response from AI.";
    res.json({ reply: aiMessage });

  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: "Error contacting AI." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
