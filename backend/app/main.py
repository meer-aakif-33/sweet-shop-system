from fastapi import FastAPI
from app.routers import auth
from app.routers import sweets
app = FastAPI()
app.include_router(auth.router)
app.include_router(sweets.router)
