from sqlalchemy import String, Integer, Numeric
from sqlalchemy.orm import Mapped, mapped_column
from uuid import uuid4
from app.db.base import Base

class Sweet(Base):
    __tablename__ = "sweets"

    id: Mapped[str] = mapped_column(
        primary_key=True, default=lambda: str(uuid4())
    )
    name: Mapped[str] = mapped_column(String, index=True)
    category: Mapped[str] = mapped_column(String, index=True)
    price: Mapped[float] = mapped_column(Numeric(10, 2))
    quantity: Mapped[int] = mapped_column(Integer)
