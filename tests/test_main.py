from app import app

def test_data():
    client = app.test_client()
    response = client.post("/testingdata")

    assert response.status_code == 200
    