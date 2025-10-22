# ConQ Repository Conventions

This document outlines the organizational structure and conventions followed in the ConQ repository.

## Repository Structure Overview

The ConQ repository follows a well-organized structure to maintain clarity and facilitate collaboration between developers and AI agents.

## Core Folders and Their Purpose

### `.agents/`
**Location**: Repository root
**Purpose**: Contains agent-specific instructions and configurations

This folder houses specialized instructions for different types of AI agents that work on the codebase:
- **UI Agents**: Instructions for agents specialized in frontend/UI work
- **Backend Agents**: Instructions for agents handling backend services
- **Database Agents**: Instructions for database schema and migration agents
- **Testing Agents**: Instructions for test automation agents
- **Documentation Agents**: Instructions for documentation generation agents

Each agent type has its own instruction file that defines:
- Specific responsibilities
- Coding standards to follow
- Tools and frameworks to use
- Common patterns and best practices
- File naming conventions
- Testing requirements

**Note**: This folder is tracked in git to ensure all team members and agents follow consistent guidelines.

### `Repo_Structure/`
**Location**: Repository root
**Purpose**: Documents the complete repository structure

Contains documentation about:
- Directory hierarchy
- Module organization
- Service boundaries
- File naming patterns
- Location of key configuration files

This serves as a map for navigating the codebase.

### `Project_Docs/`
**Location**: Repository root
**Purpose**: Contains project documentation

Includes:
- Architecture decisions (ADRs)
- API documentation
- System design documents
- Feature specifications
- Integration guides
- Deployment procedures

### `Project_Updates/`
**Location**: Repository root
**Purpose**: Tracks implementation progress and changes

Contains chronological updates about:
- Features implemented
- Bugs fixed
- Refactoring completed
- Dependencies updated
- Performance improvements
- Breaking changes

Each update should include:
- Date of implementation
- Description of changes
- Files modified
- Related issues/tickets
- Migration notes (if applicable)

### `Repo_Conventions/`
**Location**: Repository root (this folder)
**Purpose**: Defines repository conventions and metadata

Documents:
- `0 Conventions.md` - This conventions guide (overview)
- `1 Folder Structure.md` - Directory organization and structure
- `2 Route Access Control.md` - Access control policies and protected routes
- Coding standards
- Commit message formats
- Branch naming conventions
- Pull request guidelines
- Code review checklist
- CI/CD pipeline documentation

## File Naming Conventions

### Documentation Files
- Use descriptive names with spaces: `0 Conventions.md`, `API Integration Guide.md`
- Number important index files: `0 Conventions.md`, `1 Getting Started.md`
- Use sentence case for titles

### Code Files
- **Frontend**: Follow Next.js conventions (kebab-case for files, PascalCase for components)
- **Backend**: Follow Go conventions (snake_case for packages, PascalCase for exported types)
- **Configuration**: Use lowercase with hyphens: `docker-compose.yml`, `.env.example`

## Git Conventions

### Tracked Folders
The following folders **ARE** tracked in git:
- `.agents/` - Agent-specific instructions
- `Repo_Structure/` - Repository structure documentation
- `Repo_Conventions/` - Convention documentation
- `Project_Docs/` - Project documentation
- `Project_Updates/` - Implementation updates

### Ignored Folders
Standard ignores apply:
- `node_modules/`
- `.next/`
- `dist/`
- `build/`
- `.env` (but `.env.example` is tracked)

## Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types**:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

## Branch Naming

- `feature/<feature-name>` - New features
- `fix/<bug-description>` - Bug fixes
- `refactor/<component-name>` - Refactoring
- `docs/<doc-name>` - Documentation updates

## Agent Collaboration Guidelines

When multiple agents work on the codebase:

1. **Check `.agents/` folder** for your specialized instructions before starting work
2. **Update `Project_Updates/`** after completing significant changes
3. **Follow conventions** defined in this document
4. **Document architectural decisions** in `Project_Docs/`
5. **Maintain `Repo_Structure/`** if you add new modules or services

## Code Review Checklist

Before merging:
- [ ] Code follows style guidelines
- [ ] Tests are written and passing
- [ ] Documentation is updated
- [ ] No hardcoded credentials or secrets
- [ ] Error handling is comprehensive
- [ ] Performance implications considered
- [ ] Backwards compatibility maintained (or migration plan provided)

## Continuous Integration

All PRs must:
- Pass automated tests
- Pass linting checks
- Have no merge conflicts
- Be reviewed by at least one team member
- Update relevant documentation

## Questions or Clarifications

If you're unsure about any convention:
1. Check this document first
2. Look for similar patterns in existing code
3. Check agent-specific instructions in `.agents/`
4. Consult project documentation in `Project_Docs/`

---

**Last Updated**: 2025-10-23
**Maintained By**: Development Team
