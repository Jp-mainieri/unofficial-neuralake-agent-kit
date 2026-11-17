"""Retry com backoff para 429/500; 401 e 400 não são repetidos."""
import os, random, time
from openai import OpenAI, APIStatusError, RateLimitError, InternalServerError

client = OpenAI(api_key=os.environ["NEURALAKE_API_KEY"],
                base_url="https://api.neuralake.cloud/v1",
                max_retries=0)  # controlamos o retry aqui


def ask(prompt: str, model: str = "text", attempts: int = 5) -> str:
    for i in range(attempts):
        try:
            r = client.chat.completions.create(
                model=model, messages=[{"role": "user", "content": prompt}])
            return r.choices[0].message.content
        except (RateLimitError, InternalServerError):
            if i == attempts - 1:
                raise
            time.sleep(min(30, 2 ** i) + random.random())
        except APIStatusError as e:  # 400 / 401 etc.
            raise RuntimeError(f"HTTP {e.status_code}: não repetir. {e.message}") from e


if __name__ == "__main__":
    print(ask("Diga olá."))
