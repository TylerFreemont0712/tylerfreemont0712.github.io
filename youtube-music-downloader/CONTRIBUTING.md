# Contributing to YouTube Music Downloader

Thank you for considering contributing to this project! Here are some guidelines to help you get started.

## Development Setup

1. Fork the repository
2. Clone your fork: `git clone <your-fork-url>`
3. Create a branch: `git checkout -b feature/your-feature-name`
4. Set up the development environment (see README.md)

## Code Style

### Python (Backend)
- Follow PEP 8 guidelines
- Use type hints where appropriate
- Write docstrings for functions and classes
- Keep functions focused and small

### JavaScript (Frontend)
- Use ESLint configuration provided
- Follow React best practices
- Use functional components with hooks
- Keep components focused and reusable

## Commit Messages

Follow conventional commits format:
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Build process or auxiliary tool changes

Example: `feat: add support for SoundCloud downloads`

## Testing

### Backend
```bash
cd backend
pytest
```

### Frontend
```bash
cd frontend
npm test
```

Ensure all tests pass before submitting a PR.

## Pull Request Process

1. Update documentation if needed
2. Add tests for new features
3. Ensure all tests pass
4. Update README.md with any new features or changes
5. Submit the PR with a clear description of changes

## Feature Requests

Open an issue with:
- Clear description of the feature
- Use cases
- Any potential implementation details

## Bug Reports

Open an issue with:
- Description of the bug
- Steps to reproduce
- Expected behavior
- Actual behavior
- Environment details (OS, browser, Python version, etc.)

## Code Review

All submissions require review. We use GitHub pull requests for this purpose.

## Questions?

Feel free to open an issue for any questions about contributing.

Thank you for your contributions!
