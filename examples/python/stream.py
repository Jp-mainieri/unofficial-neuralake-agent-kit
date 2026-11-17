import os
from openai import OpenAI

client = OpenAI(api_key=os.environ["NEURALAKE_API_KEY"],
                base_url="https://api.neuralake.cloud/v1")

stream = client.chat.completions.create(
    model="text",
    messages=[
        {"role": "system", "content": "You are a technical assistant."},
        {"role": "user", "content": "Write a function that reads a JSON file."},
    ],
    temperature=0.5,
    stream=True,
)
for chunk in stream:
    print(chunk.choices[0].delta.content or "", end="", flush=True)
print()
