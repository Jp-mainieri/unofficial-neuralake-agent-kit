"""Chamada simples. Requer: pip install openai; NEURALAKE_API_KEY definido."""
import os
from openai import OpenAI

client = OpenAI(api_key=os.environ["NEURALAKE_API_KEY"],
                base_url="https://api.neuralake.cloud/v1")

r = client.chat.completions.create(
    model="text",  # text | reasoning | reasoning-pro | code | multimodal | auto
    messages=[
        {"role": "system", "content": "Você é um assistente técnico."},
        {"role": "user", "content": "Explique o que é um data lake em 2 frases."},
    ],
    temperature=0.5,
    max_tokens=400,  # modelos de raciocínio gastam tokens antes de responder
)
c = r.choices[0]
print(c.message.content or f"(vazio; finish_reason={c.finish_reason}: aumente max_tokens)")
