// npm i openai
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.NEURALAKE_API_KEY,
  baseURL: "https://api.neuralake.cloud/v1",
});

const stream = await client.chat.completions.create({
  model: "text",
  messages: [{ role: "user", content: "Write a function that reads a JSON file." }],
  stream: true,
});
for await (const chunk of stream) {
  process.stdout.write(chunk.choices[0]?.delta?.content ?? "");
}
console.log();
