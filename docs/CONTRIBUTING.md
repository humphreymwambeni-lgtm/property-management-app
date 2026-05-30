# Contributing Guide

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/property-management-app.git`
3. Create a new branch: `git checkout -b feature/your-feature-name`
4. Follow the setup guide in [SETUP.md](./SETUP.md)

## Development Workflow

### Code Style

- **Language**: TypeScript (strict mode)
- **Formatter**: Prettier (configured)
- **Linter**: ESLint

### Commit Messages

Use clear, descriptive commit messages:

```
feat: Add property search filter
fix: Fix booking date validation
docs: Update API documentation
refactor: Refactor auth middleware
test: Add unit tests for booking service
```

### Pull Request Process

1. Ensure your code is well-tested
2. Update documentation as needed
3. Create a descriptive PR title and description
4. Link related issues
5. Request reviews from maintainers
6. Address feedback
7. Merge after approval

## Project Structure

### Backend

```
backend/
├── src/
│   ├── controllers/     # Request handlers
│   ├── routes/         # API routes
│   ├── models/         # Database models
│   ├── middleware/     # Express middleware
│   ├── database/       # DB configuration
│   └── server.ts       # Entry point
├── dist/               # Compiled JavaScript
└── package.json
```

### Frontend

```
frontend/
├── src/
│   ├── components/     # React components
│   ├── pages/         # Page components
│   ├── store/         # Redux slices
│   ├── services/      # API services
│   ├── types/         # TypeScript types
│   └── App.tsx        # Root component
├── public/            # Static files
└── package.json
```

## Testing

### Backend

```bash
cd backend
npm test
```

### Frontend

```bash
cd frontend
npm test
```

## Linting

### Backend

```bash
cd backend
npm run lint
```

## Adding Features

### New API Endpoint

1. Create controller in `backend/src/controllers/`
2. Add route in `backend/src/routes/`
3. Update API documentation
4. Test with curl or Postman

### New Frontend Component

1. Create component in `frontend/src/components/`
2. Add types in `frontend/src/types/`
3. Use Redux for state management
4. Style with Tailwind CSS

### New Database Model

1. Create model in `backend/src/models/`
2. Define relationships
3. Create migration
4. Update API accordingly

## Reporting Issues

When reporting issues:

1. Use a clear title
2. Describe the problem
3. Provide steps to reproduce
4. Share expected vs actual behavior
5. Include error messages/logs
6. Mention your environment

## Feature Requests

1. Check if already requested
2. Provide clear use case
3. Explain expected behavior
4. Suggest implementation approach

## Code Review Checklist

- [ ] Code follows project style
- [ ] No hardcoded secrets
- [ ] Error handling implemented
- [ ] Input validation present
- [ ] Documentation updated
- [ ] Tests added/updated
- [ ] No console errors/warnings
- [ ] Performance optimized

## Questions?

Feel free to:
1. Open an issue for discussion
2. Join our community discussions
3. Email the maintainers

**Thank you for contributing!** 🎉
