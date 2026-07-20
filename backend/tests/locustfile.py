from locust import HttpUser, task, between, events
import random

class StudentUser(HttpUser):
    wait_time = between(1, 3)

    @task(3)
    def submit_essay(self):
        sample_essays = [
            "The rapid advancement of artificial intelligence has precipitated a paradigm shift in education.",
            "Machine learning models often hallucinate facts when trained on unverified data.",
            "Academic integrity is paramount in the era of generative AI tools like ChatGPT."
        ]
        text = random.choice(sample_essays) + f" [Student Hash: {random.randint(1000, 9999)}]"
        
        payload = {
            "student": f"Student-{random.randint(1, 300)}",
            "assignment": "Concurrent Batch Test",
            "aiDisclosed": random.choice(["true", "false"]),
            "text": text
        }
        self.client.post("/api/submissions", data=payload)

    @task(1)
    def check_health(self):
        self.client.get("/")
