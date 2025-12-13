# Sweet Shop Management System

A full-stack **Sweet Shop Management System** built using **Test-Driven Development (TDD)** principles.
The application allows users to browse and purchase sweets, while admin users can manage inventory with role-based access control.

This project demonstrates backend API design, authentication, authorization, database integration, frontend SPA development, testing, and modern development workflows.

---

## Features

### Authentication & Authorization

* User registration and login
* JWT-based authentication
* Role-based access control (USER / ADMIN)
* Protected API endpoints

### Sweets Management

* View all available sweets
* Search sweets by name, category, and price range
* Purchase sweets (quantity decreases automatically)
* Purchase disabled when stock is zero

### Admin Features

* Add new sweets
* Update sweet details
* Delete sweets
* Restock inventory
* Admin access enforced on backend

### Testing

* Test-Driven Development (TDD)
* Unit & integration tests for:

  * Authentication
  * Sweets CRUD
  * Inventory operations
  * Search functionality
* Proper test isolation using database transactions

---

## Tech Stack

### Backend

* **FastAPI**
* **Python**
* **SQLAlchemy**
* **PostgreSQL / SQLite**
* **JWT Authentication**
* **Pytest**

### Frontend

* **React + TypeScript**
* **Vite**
* **Axios**
* **React Router**
* **Tailwind CSS**

---

## Project Structure

```
sweet-shop-system/
│
├── backend/
│   ├── app/
│   │   ├── routers/
│   │   ├── services/
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── core/
│   │   └── main.py
│   ├── tests/
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── auth/
│   │   └── api/
│   └── package.json
│
└── README.md
```

---

## Getting Started

### Prerequisites

* Python 3.10+
* Node.js 18+
* Git

---

## Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # (Windows: venv\Scripts\activate)
pip install -r requirements.txt
```

Run database migrations (if applicable) and start the server:

```bash
uvicorn app.main:app --reload
```

Backend runs at:

```
http://127.0.0.1:8000
```

---

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

## Admin Setup

Admin users are provisioned via a **seed script / database update**.

Example:

```sql
UPDATE users SET role='ADMIN' WHERE email='admin@test.com';
```

> In real-world systems, admin users are typically provisioned via scripts or operational workflows, not self-registration.

---

## Running Tests

From the backend directory:

```bash
pytest
```

### Test Coverage Includes

* User registration & login
* JWT authentication
* Sweets CRUD operations
* Inventory purchase & restock
* Admin-only authorization checks
* Search filtering
* Database isolation between tests

---

## Screenshots

> Add screenshots in a `/screenshots` folder and reference them here.

* Login Page
* Dashboard with sweets list
* Purchase button disabled when quantity is zero
* Admin panel (add / restock / delete sweets)

Example:

```
screenshots/login.png
screenshots/dashboard.png
screenshots/admin.png
```

---

## My AI Usage

AI tools were used **selectively and responsibly** during development.

### Tools Used

* **ChatGPT**

### How AI Was Used

* Brainstorming API endpoint structure
* Generating initial test templates
* Identifying edge cases during testing
* Refactoring suggestions for cleaner code structure

### Reflection

All architectural decisions, business logic, authorization rules, and final implementations were written and validated by me.
AI was used as a productivity assistant, not a replacement for understanding or decision-making.

AI significantly improved development speed while maintaining full ownership and accountability for the codebase.

---

## Notes for Evaluators

* Backend strictly enforces authorization rules (frontend does not assume trust)
* TDD approach followed throughout development
* Clean commit history with meaningful messages
* AI co-authorship included only where appropriate and transparently documented

---

## Conclusion

This project demonstrates:

* Full-stack development capability
* Strong backend fundamentals
* Secure authentication and authorization
* Clean frontend architecture
* Professional testing practices
* Responsible AI usage

---
