# Setup Guide

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 16 or higher ([Download](https://nodejs.org/))
- **npm** 7 or higher (comes with Node.js)
- **PostgreSQL** 13 or higher ([Download](https://www.postgresql.org/download/))
- **Git** ([Download](https://git-scm.com/))

## Step 1: Clone the Repository

```bash
git clone https://github.com/humphreymwambeni-lgtm/property-management-app.git
cd property-management-app
git checkout dev  # Switch to development branch
```

## Step 2: Setup Database

### Create PostgreSQL Database

1. Open PostgreSQL command line or a tool like pgAdmin

2. Create a new database:

```sql
CREATE DATABASE property_management;
```

3. (Optional) Create a dedicated user:

```sql
CREATE USER pm_user WITH PASSWORD 'your_secure_password';
ALTER ROLE pm_user SET client_encoding TO 'utf8';
ALTER ROLE pm_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE pm_user SET default_transaction_deferrable TO on;
GRANT ALL PRIVILEGES ON DATABASE property_management TO pm_user;
```

## Step 3: Backend Setup

### Install Dependencies

```bash
cd backend
npm install
```

### Configure Environment Variables

1. Create a `.env` file in the `backend` directory:

```bash
cp .env.example .env
```

2. Edit `.env` with your settings:

```env
NODE_ENV=development
PORT=5000

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=property_management
DB_USER=postgres
DB_PASSWORD=your_password

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d

# CORS
CORS_ORIGIN=http://localhost:3000
```

### Run Database Migrations

```bash
npm run migrate
```

This will create all necessary tables and indexes.

### Start Backend Server

```bash
npm run dev
```

You should see:
```
🚀 Server running on port 5000
📋 Environment: development
✅ Database connection established
✅ Database synchronized
```

## Step 4: Frontend Setup

### Install Dependencies

```bash
cd ../frontend
npm install
```

### Configure Environment Variables

1. Create a `.env` file in the `frontend` directory:

```bash
echo "REACT_APP_API_URL=http://localhost:5000/api" > .env
```

Optionally, create `.env.local` for local overrides:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

### Start Frontend Server

```bash
npm start
```

The app will open at `http://localhost:3000`

---

## Verification

### Backend Health Check

```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "status": "OK",
  "timestamp": "2026-05-30T12:00:00Z"
}
```

### Frontend

Open your browser and visit `http://localhost:3000`

You should see the Property Management App homepage.

---

## Quick Test

### 1. Create an Account

1. Click "Sign Up"
2. Enter your details
3. Choose "Property Owner" or "Customer"
4. Click "Sign Up"

### 2. Create a Property (Owner Only)

1. Login as a property owner
2. Click "Add Property"
3. Fill in property details
4. Click "Create Property"

### 3. Book a Property (Customer)

1. Login as a customer
2. Browse properties
3. Click on a property
4. Select check-in and check-out dates
5. Click "Book Now"

---

## Troubleshooting

### Backend Issues

**Port 5000 already in use:**
```bash
# Change port in .env
PORT=5001
```

**Database connection failed:**
- Verify PostgreSQL is running
- Check database credentials in `.env`
- Ensure database exists: `CREATE DATABASE property_management;`

**JWT_SECRET not set:**
```bash
# Generate a secure key
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
# Copy output to JWT_SECRET in .env
```

### Frontend Issues

**Port 3000 already in use:**
```bash
npm start -- --port 3001
```

**API connection failed:**
- Verify backend is running on port 5000
- Check REACT_APP_API_URL in `.env`
- Check browser console for CORS errors

**Dependencies not installing:**
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## Production Deployment

### Backend

1. Build the project:
```bash
npm run build
```

2. Start production server:
```bash
NODE_ENV=production npm start
```

### Frontend

1. Build for production:
```bash
npm run build
```

2. Serve the `build` folder with a web server (Nginx, Apache, or Node.js)

---

## Development Tips

### Hot Reload

Both frontend and backend support hot reload in development:
- **Backend**: Uses `ts-node` with automatic restart
- **Frontend**: React Scripts automatically reloads on file changes

### Debugging

**Backend:**
```bash
DEBUG=* npm run dev
```

**Frontend:**
Use React Developer Tools browser extension

### Database Tools

Recommended tools for PostgreSQL:
- **pgAdmin** - Web-based management tool
- **DBeaver** - Cross-platform database tool
- **psql** - Command-line tool

---

## Next Steps

1. Review the [API Documentation](./API.md)
2. Check the [Database Schema](./DATABASE.md)
3. Read the [README](../README.md)
4. Explore the codebase
5. Create issues for bugs or feature requests

---

## Support

For issues or questions:
1. Check existing issues on GitHub
2. Create a new issue with detailed information
3. Join our community discussions

**Happy coding!** 🚀
