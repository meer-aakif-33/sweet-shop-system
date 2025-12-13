from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def register_and_login(email, password, is_admin=False):
    client.post("/api/auth/register", json={
        "email": email,
        "password": password
    })
    res = client.post("/api/auth/login", json={
        "email": email,
        "password": password
    })
    return res.json()["access_token"]


def test_create_and_list_sweets():
    token = register_and_login("user1@test.com", "password123")

    create = client.post(
        "/api/sweets",
        json={
            "name": "Gulab Jamun",
            "category": "Indian",
            "price": 10.0,
            "quantity": 5
        },
        headers={"Authorization": f"Bearer {token}"}
    )

    assert create.status_code == 201

    list_res = client.get(
        "/api/sweets",
        headers={"Authorization": f"Bearer {token}"}
    )

    assert list_res.status_code == 200
    assert len(list_res.json()) == 1
