import pytest
from fastapi.testclient import TestClient
from backend.main import app

client = TestClient(app)

def test_api_health():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "AuthenTrace API is running"}

def test_submission_flow():
    payload = {
        "student": "Integration Student",
        "assignment": "Test Essay",
        "aiDisclosed": "true",
        "text": "The rapid advancement of artificial intelligence has precipitated a paradigm shift in education."
    }
    response = client.post("/api/submissions", data=payload)
    assert response.status_code == 202
    data = response.json()
    assert "id" in data
    assert data["status"] == "Analyzing"

def test_admin_settings_update():
    response = client.get("/api/admin/settings")
    assert response.status_code == 200
    
    update_payload = {
        "institution_name": "Test University",
        "ai_weight": 0.6,
        "similarity_weight": 0.4
    }
    put_response = client.put("/api/admin/settings", json=update_payload)
    assert put_response.status_code == 200
    updated_data = put_response.json()
    assert updated_data["institution_name"] == "Test University"
    assert updated_data["ai_weight"] == 0.6

def test_audit_logs_endpoint():
    response = client.get("/api/audit-logs")
    assert response.status_code == 200
    logs = response.json()
    assert isinstance(logs, list)

def test_sso_authentication():
    payload = {
        "email": "dr.smith@university.edu",
        "provider": "okta"
    }
    response = client.post("/api/auth/sso/login", json=payload)
    assert response.status_code == 200
    res_data = response.json()
    assert "session_token" in res_data
    assert res_data["user"]["role"] == "Faculty"

def test_public_rest_api():
    payload = {
        "text": "Academic integrity is paramount in higher education.",
        "student_id": "STU-9901",
        "assignment_name": "API Benchmark Test"
    }
    response = client.post("/api/v1/public/analyze", json=payload, headers={"X-API-Key": "test_api_key_123"})
    assert response.status_code == 200
    res = response.json()
    assert "overall_score" in res
    assert "citation_analysis" in res

def test_data_retention_purge():
    response = client.delete("/api/data-retention/purge")
    assert response.status_code == 200
    res = response.json()
    assert "purged_count" in res
    assert "retention_days" in res
