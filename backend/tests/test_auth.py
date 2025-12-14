import sys
from pathlib import Path

# Fix Python path
BACKEND_DIR = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(BACKEND_DIR))

def test_user_can_register(client):
    response = client.post(
        "/api/auth/register",
        json={
            "email": "user@example.com",
            "password": "secret123"
        }
    )
    assert response.status_code == 201
    assert "id" in response.json()
    assert response.json()["email"] == "user@example.com"


def test_user_can_login(client):
    client.post(
        "/api/auth/register",
        json={
            "email": "login@example.com",
            "password": "secret123"
        }
    )

    response = client.post(
        "/api/auth/login",
        json={
            "email": "login@example.com",
            "password": "secret123"
        }
    )

    assert response.status_code == 200
    assert "access_token" in response.json()
    assert response.json()["token_type"] == "bearer"


def test_login_fails_with_wrong_password(client):
    client.post(
        "/api/auth/register",
        json={
            "email": "wrongpass@example.com",
            "password": "correctpass"
        }
    )

    response = client.post(
        "/api/auth/login",
        json={
            "email": "wrongpass@example.com",
            "password": "wrongpass"
        }
    )

    assert response.status_code == 401
