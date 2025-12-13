from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from app.db.session import SessionLocal
from app.services.auth_service import register_user, authenticate_user
from app.models import user

router = APIRouter(prefix="/api/auth", tags=["auth"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/register", status_code=status.HTTP_201_CREATED)
def register(payload: dict, db: Session = Depends(get_db)):
    user = register_user(db, payload["email"], payload["password"])
    return {"id": user.id, "email": user.email}

@router.post("/login")
def login(payload: dict, db: Session = Depends(get_db)):
    db_user, token = authenticate_user(
        db, payload["email"], payload["password"]
    )
    return {
        "access_token": token,
        "token_type": "bearer",
        "role": db_user.role.value,   
    }
