from sqlalchemy import and_
from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from app.models.sweet import Sweet
from app.models.user import User, UserRole


def create_sweet(db: Session, data):
    sweet = Sweet(**data.model_dump())
    db.add(sweet)
    db.commit()
    db.refresh(sweet)
    return sweet


def list_sweets(db: Session):
    return db.query(Sweet).all()


def update_sweet(db: Session, sweet_id: str, data):
    sweet = db.query(Sweet).filter(Sweet.id == sweet_id).first()
    if not sweet:
        raise HTTPException(404, "Sweet not found")

    for field, value in data.model_dump(exclude_unset=True).items():

        setattr(sweet, field, value)

    db.commit()
    db.refresh(sweet)
    return sweet


def delete_sweet(db: Session, sweet_id: str, user: User):
    if user.role != UserRole.ADMIN:
        raise HTTPException(status.HTTP_403_FORBIDDEN, "Admin only")

    sweet = db.query(Sweet).filter(Sweet.id == sweet_id).first()
    if not sweet:
        raise HTTPException(404, "Sweet not found")

    db.delete(sweet)
    db.commit()


def purchase_sweet(db: Session, sweet_id: str):
    sweet = db.query(Sweet).filter(Sweet.id == sweet_id).first()
    if not sweet:
        raise HTTPException(404, "Sweet not found")

    if sweet.quantity <= 0:
        raise HTTPException(400, "Out of stock")

    sweet.quantity -= 1
    db.commit()
    db.refresh(sweet)
    return sweet


def restock_sweet(db: Session, sweet_id: str, amount: int, user: User):
    if user.role != UserRole.ADMIN:
        raise HTTPException(status.HTTP_403_FORBIDDEN, "Admin only")

    sweet = db.query(Sweet).filter(Sweet.id == sweet_id).first()
    if not sweet:
        raise HTTPException(404, "Sweet not found")

    sweet.quantity += amount
    db.commit()
    db.refresh(sweet)
    return sweet

def search_sweets(
    db: Session,
    name: str | None,
    category: str | None,
    price_min: float | None,
    price_max: float | None,
):
    query = db.query(Sweet)

    if name:
        query = query.filter(Sweet.name.ilike(f"%{name}%"))

    if category:
        query = query.filter(Sweet.category == category)

    if price_min is not None:
        query = query.filter(Sweet.price >= price_min)

    if price_max is not None:
        query = query.filter(Sweet.price <= price_max)

    return query.all()
