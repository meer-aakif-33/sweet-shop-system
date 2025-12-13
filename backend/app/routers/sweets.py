from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from app.schemas.sweet import SweetCreate, SweetUpdate, SweetResponse
from app.services.sweet_service import (
    create_sweet,
    list_sweets,
    update_sweet,
    delete_sweet,
    purchase_sweet,
    restock_sweet,
)
from app.core.dependencies import get_db, get_current_user
from app.models.user import User

router = APIRouter(prefix="/api/sweets", tags=["sweets"])


@router.post("", status_code=201, response_model=SweetResponse)
def add_sweet(
    payload: SweetCreate,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    return create_sweet(db, payload)


@router.get("", response_model=list[SweetResponse])
def get_sweets(
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    return list_sweets(db)


@router.put("/{sweet_id}", response_model=SweetResponse)
def edit_sweet(
    sweet_id: str,
    payload: SweetUpdate,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    return update_sweet(db, sweet_id, payload)


@router.delete("/{sweet_id}", status_code=204)
def remove_sweet(
    sweet_id: str,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    delete_sweet(db, sweet_id, user)


@router.post("/{sweet_id}/purchase")
def purchase(
    sweet_id: str,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    return purchase_sweet(db, sweet_id)


@router.post("/{sweet_id}/restock")
def restock(
    sweet_id: str,
    amount: int,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    return restock_sweet(db, sweet_id, amount, user)
