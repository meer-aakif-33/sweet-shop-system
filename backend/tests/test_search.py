def seed_sweets(client, token):
    sweets = [
        {"name": "Gulab Jamun", "category": "Indian", "price": 10.0, "quantity": 5},
        {"name": "Rasgulla", "category": "Indian", "price": 8.0, "quantity": 5},
        {"name": "Brownie", "category": "Western", "price": 15.0, "quantity": 5},
    ]

    for s in sweets:
        client.post(
            "/api/sweets",
            json=s,
            headers={"Authorization": f"Bearer {token}"},
        )


def register_and_login(client):
    client.post("/api/auth/register", json={
        "email": "search@test.com",
        "password": "password",
    })
    res = client.post("/api/auth/login", json={
        "email": "search@test.com",
        "password": "password",
    })
    return res.json()["access_token"]


def test_search_by_name(client):
    token = register_and_login(client)
    seed_sweets(client, token)

    res = client.get(
        "/api/sweets/search?name=gulab",
        headers={"Authorization": f"Bearer {token}"},
    )

    assert res.status_code == 200
    assert len(res.json()) == 1
    assert res.json()[0]["name"] == "Gulab Jamun"


def test_search_by_category(client):
    token = register_and_login(client)
    seed_sweets(client, token)

    res = client.get(
        "/api/sweets/search?category=Indian",
        headers={"Authorization": f"Bearer {token}"},
    )

    assert res.status_code == 200
    assert len(res.json()) == 2


def test_search_by_price_range(client):
    token = register_and_login(client)
    seed_sweets(client, token)

    res = client.get(
        "/api/sweets/search?price_min=9&price_max=16",
        headers={"Authorization": f"Bearer {token}"},
    )

    assert res.status_code == 200
    assert len(res.json()) == 2
