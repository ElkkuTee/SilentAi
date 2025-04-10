// netlify/functions/chat.js
export async function handler(event, context) {
  const API_KEY = process.env.OPENAI_API_KEY;
  const BASE_URL = "https://models.inference.ai.azure.com/v1/chat/completions";

  const { message } = JSON.parse(event.body);

  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-4o",
      messages: [{ role: "user", content: message }]
    })
  });

  const data = await response.json();

  return {
    statusCode: 200,
    body: JSON.stringify(data)
  };
}
