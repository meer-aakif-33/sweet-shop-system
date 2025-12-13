from pydantic import BaseModel
from typing import Optional

class SweetCreate(BaseModel):
    name: str
    category: str
    price: float
    quantity: int

class SweetUpdate(BaseModel):
    name: Optional[str]
    category: Optional[str]
    price: Optional[float]
    quantity: Optional[int]

class SweetResponse(BaseModel):
    id: str
    name: str
    category: str
    price: float
    quantity: int
