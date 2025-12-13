from sqlalchemy import String, Enum
from sqlalchemy.orm import Mapped, mapped_column
from uuid import uuid4
import enum
from app.db.base import Base

class UserRole(enum.Enum):
    USER = "USER"
    ADMIN = "ADMIN"

class User(Base):
    __tablename__ = "users"

    id: Mapped[str] = mapped_column(
        primary_key=True, default=lambda: str(uuid4())
    )
    email: Mapped[str] = mapped_column(String, unique=True, index=True)
    password_hash: Mapped[str] = mapped_column(String)
    role: Mapped[UserRole] = mapped_column(
        Enum(UserRole), default=UserRole.USER
    )
