from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_purchase_decreases_quantity():
    client.post("/api/auth/register", json={
        "email": "buyer@test.com",
        "password": "password"
    })
    login = client.post("/api/auth/login", json={
        "email": "buyer@test.com",
        "password": "password"
    })
    token = login.json()["access_token"]

    sweet = client.post(
        "/api/sweets",
        json={
            "name": "Ladoo",
            "category": "Indian",
            "price": 5.0,
            "quantity": 1
        },
        headers={"Authorization": f"Bearer {token}"}
    ).json()

    purchase = client.post(
        f"/api/sweets/{sweet['id']}/purchase",
        headers={"Authorization": f"Bearer {token}"}
    )

    assert purchase.status_code == 200
