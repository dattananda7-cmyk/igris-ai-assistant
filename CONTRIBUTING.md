# IGRIS Contributing Guide

Thank you for your interest in contributing to IGRIS! This guide will help you get started.

## Code of Conduct

Please be respectful and inclusive. We follow the [Contributor Covenant](https://www.contributor-covenant.org/).

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/yourusername/igris-ai-assistant.git`
3. Add upstream: `git remote add upstream https://github.com/dattananda7-cmyk/igris-ai-assistant.git`
4. Create a feature branch: `git checkout -b feature/your-feature-name`
5. Make your changes
6. Push to your fork: `git push origin feature/your-feature-name`
7. Create a Pull Request

## Development Setup

See [DEVELOPMENT.md](DEVELOPMENT.md) for detailed setup instructions.

## Commit Guidelines

Use conventional commits:

```
feat: Add new feature
fix: Fix a bug
docs: Update documentation
style: Code style changes (formatting, missing semicolons, etc)
refactor: Code refactoring without changing functionality
test: Add or update tests
chore: Dependencies, configuration, etc
perf: Performance improvements
```

Examples:
```
feat: Add voice input support
fix: Resolve authentication token refresh bug
docs: Update API documentation
test: Add unit tests for chat reducer
```

## Pull Request Process

1. **Update from upstream**
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Write clear PR description**
   - What does this PR do?
   - Why is it needed?
   - Related issues (close #123)

3. **Ensure code quality**
   ```bash
   # Backend
   cd backend && npm run lint && npm test
   
   # Frontend
   cd frontend && npm run lint
   ```

4. **Update documentation** if needed

5. **Keep PR focused** - one feature per PR

## Code Style

### JavaScript/Node.js
- Use ES6+ features
- Async/await over callbacks
- Use const/let, avoid var
- 2-space indentation
- Use semicolons

### React Native
- Functional components with hooks
- Component names in PascalCase
- Props destructuring
- StyleSheet for styling
- Comment complex logic

### Backend
- Organize by feature/route
- Use middleware for concerns
- Validate input with Zod
- Consistent error handling
- JSDoc comments for functions

## Testing

### Backend
```bash
cd backend

# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run specific test
npm test -- auth.test.js
```

### Frontend
```bash
cd frontend

# Run tests
npm test

# With coverage
npm test -- --coverage
```

## Documentation

- Update README if adding features
- Update API docs for backend changes
- Add JSDoc comments
- Update ROADMAP if it affects roadmap
- Include examples for new features

## Issue Types

### Bug Report
- Clear description of issue
- Steps to reproduce
- Expected vs actual behavior
- Environment info
- Screenshots/logs if applicable

### Feature Request
- Clear description
- Use cases
- Any constraints
- Suggested implementation (optional)

### Documentation
- What's unclear?
- Suggested improvements
- Examples needed?

## Review Process

1. At least one maintainer review
2. All checks must pass (tests, lint)
3. No conflicts with main branch
4. Maintainer merges when approved

## Areas to Contribute

### Backend
- API endpoints
- Database optimizations
- Error handling
- Testing
- Documentation
- Performance improvements

### Frontend
- UI components
- Screens
- Animations
- Performance
- Testing
- Accessibility

### DevOps
- CI/CD pipeline
- Deployment automation
- Infrastructure
- Monitoring

### Documentation
- API docs
- Setup guides
- Architecture decisions
- Best practices
- Examples

## Help & Questions

- Create a discussion for questions
- Check existing issues
- Email: dev@igris.ai
- Discord: [Join community](https://discord.gg/igris)

## Recognition

Contributors will be:
- Added to CONTRIBUTORS.md
- Mentioned in release notes
- Given credit in commits

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing to IGRIS! 🚀**
