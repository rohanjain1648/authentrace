import faiss
import numpy as np
import os
import hashlib

DIMENSION = 64
index = faiss.IndexFlatL2(DIMENSION)

mock_corpus = [
    "The rapid advancement of artificial intelligence has precipitated a paradigm shift in education.",
    "Machine learning models often hallucinate facts when trained on unverified data.",
    "Academic integrity is paramount in the era of generative AI tools like ChatGPT."
]

def text_to_vector(text: str) -> np.ndarray:
    """Fast deterministic vector generator for FAISS index matching without heavy model downloads."""
    vector = np.zeros(DIMENSION, dtype='float32')
    words = text.lower().split()
    for w in words:
        h = int(hashlib.md5(w.encode('utf-8')).hexdigest(), 16)
        idx = h % DIMENSION
        vector[idx] += 1.0
    norm = np.linalg.norm(vector)
    if norm > 0:
        vector = vector / norm
    return vector

# Populate FAISS index
corpus_vectors = np.array([text_to_vector(doc) for doc in mock_corpus], dtype='float32')
index.add(corpus_vectors)

def check_similarity(text: str) -> float:
    """
    Checks the similarity of the submitted text against the mock corpus using FAISS.
    Returns a score from 0 to 100 representing similarity match.
    """
    if not text.strip():
        return 0.0
        
    try:
        query_vec = np.array([text_to_vector(text)], dtype='float32')
        distances, indices = index.search(query_vec, 1)
        
        min_distance = distances[0][0]
        # Distance range: 0.0 (identical) to 2.0 (orthogonal)
        similarity = max(0.0, 100.0 - (min_distance * 50.0))
        return min(100.0, float(similarity))
        
    except Exception as e:
        print(f"Similarity check failed: {e}")
        return 0.0
