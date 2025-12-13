from app.db.session import SessionLocal
from app.models.user import User, UserRole
from app.core.security import hash_password

# Start a DB session
db = SessionLocal()

email = "admin@test.com"

# Ensure admin exists
if not db.query(User).filter(User.email == email).first():
    admin = User(
        email=email,
        password_hash=hash_password("admin123"),
        role=UserRole.ADMIN
    )
    db.add(admin)
    db.commit()
    print("Admin user created")
else:
    print("Admin already exists")

# --- NEW PART: Fetch and display user info ---
print("\nAll users in DB:")
users = db.query(User).all()
for u in users:
    print(f"ID: {u.id}, Email: {u.email}, Role: {u.role}, PasswordHash: {u.password_hash}")

# Fetch only admins
admins = db.query(User).filter(User.role == UserRole.ADMIN).all()
print("\nAdmin accounts:")
for a in admins:
    print(f"ID: {a.id}, Email: {a.email}")

# Close session
db.close()
