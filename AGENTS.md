# AGENTS.md - Coding Guidelines for ONLY SOP

## Project Overview
React + Vite application for school bus tracking system. Uses Leaflet for maps, React hooks for state management.

## Build/Lint/Test Commands

```bash
# Development server
npm run dev

# Production build
npm run build

# ESLint linting
npm run lint

# Preview production build
npm run preview
```

**Note:** No test framework is currently configured. To run tests if added later, use the appropriate command (e.g., `npm test` or `npm run test:unit`).

## Tech Stack
- **Framework:** React 19.2.0 with Hooks
- **Build Tool:** Vite 7.2.4
- **Linting:** ESLint 9.x (Flat Config)
- **Maps:** Leaflet + React-Leaflet
- **Icons:** Lucide React
- **Styling:** CSS with CSS Variables

## Code Style Guidelines

### Imports
- Use ES modules (`import/export`)
- Group imports: React first, then third-party, then local
- Use absolute imports for components: `import Layout from './components/Layout'`
- No semicolons after import statements

```javascript
import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import { Bus, User } from 'lucide-react'
import Layout from './components/Layout'
import './index.css'
```

### Formatting
- No semicolons (except when required)
- Single quotes for strings
- 2 spaces indentation
- Trailing commas in objects/arrays
- Max line length: 100 characters

### Naming Conventions
- **Components:** PascalCase (e.g., `Login.jsx`, `MapComponent.jsx`)
- **Functions:** camelCase (e.g., `handleLogin`, `toggleStudentStatus`)
- **Constants:** UPPER_SNAKE_CASE for true constants
- **State Variables:** Descriptive names (e.g., `isAuthenticated`, `userRole`)
- **CSS Variables:** kebab-case with semantic names (e.g., `--primary-color`, `--glass-bg`)

### Component Structure
```javascript
const ComponentName = ({ prop1, prop2 }) => {
  // State declarations
  const [state, setState] = useState(initialValue)
  
  // Event handlers
  const handleEvent = () => { }
  
  // Render
  return (
    <div>
      {/* JSX */}
    </div>
  )
}

export default ComponentName
```

### State Management
- Use `useState` for local component state
- Use functional updates when depending on previous state
- Lift state up when needed by multiple components

### Error Handling
- Validate user inputs before processing
- Use try-catch for async operations
- Display user-friendly error messages
- Clear errors when appropriate

```javascript
const [error, setError] = useState('')

const handleSubmit = (e) => {
  e.preventDefault()
  if (!isValid) {
    setError('Validation message')
    return
  }
  setError('')
  // Process...
}
```

### CSS Guidelines
- Use CSS variables from `index.css` for consistency
- Prefer semantic class names (e.g., `.glass-panel`, `.btn-primary`)
- Use inline styles only for dynamic values
- Mobile-first responsive design (breakpoints: 768px, 1024px)

### ESLint Rules
- No unused variables (except React components starting with capital letter)
- React Hooks rules enforced
- React Refresh for Vite compatibility
- ECMAScript 2020 syntax

### File Organization
```
src/
├── components/       # React components
│   ├── Layout.jsx
│   ├── Login.jsx
│   └── ...
├── App.jsx          # Root component
├── main.jsx         # Entry point
└── index.css        # Global styles
```

## Git Workflow
- Commit messages should be concise and descriptive
- Do not commit `node_modules/`, `dist/`, or `.env` files
- Do not commit secrets or API keys
- Run `npm run lint` before committing

## Performance
- Use React.memo for expensive components
- Lazy load routes if app grows
- Optimize images before adding to public/
- Use CSS containment where appropriate

## Security
- Never expose API keys in client code
- Validate all user inputs
- Sanitize data before display (prevent XSS)
- Use HTTPS in production
