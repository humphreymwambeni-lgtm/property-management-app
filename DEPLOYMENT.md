# Deployment Configuration

## Docker Deployment

The application includes Docker support for easy deployment.

### Using Docker Compose

```bash
docker-compose up -d
```

This will:
1. Start PostgreSQL database
2. Build and start backend server
3. Build and start frontend application

### Access the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api
- Database: localhost:5432

### Stop Services

```bash
docker-compose down
```

### View Logs

```bash
docker-compose logs -f backend
docker-compose logs -f frontend
```

## Environment Variables

Update `docker-compose.yml` to change:
- Database credentials
- JWT secret
- API URL
- Port numbers

## Building Individual Images

### Backend

```bash
cd backend
docker build -t property-app-backend:latest .
```

### Frontend

```bash
cd frontend
docker build -t property-app-frontend:latest .
```

## Production Deployment

### Environment Variables (Production)

Always set these in production:

```env
NODE_ENV=production
JWT_SECRET=<generate_secure_key>
DB_HOST=<production_db_host>
DB_USER=<production_user>
DB_PASSWORD=<secure_password>
CORS_ORIGIN=<production_domain>
```

### Database Backup

```bash
docker-compose exec db pg_dump -U postgres property_management > backup.sql
```

### Database Restore

```bash
docker-compose exec -T db psql -U postgres property_management < backup.sql
```
