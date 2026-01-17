# Configuration Guide

## Environment Setup

### Node.js Version
- **Minimum**: Node.js 16.x
- **Recommended**: Node.js 18.x or 20.x
- **Check version**: `node --version`

### npm Version
- **Minimum**: npm 8.x
- **Recommended**: npm 9.x or higher
- **Check version**: `npm --version`

## Project Configuration Files

### package.json
Main project configuration with dependencies and scripts.

**Key Scripts**:
```json
{
  "dev": "vite",           // Start dev server
  "build": "vite build",   // Build for production
  "preview": "vite preview" // Preview production build
}
```

**Dependencies**:
- `react`: UI framework
- `react-dom`: React DOM rendering
- `axios`: HTTP client (optional, for future API integration)

**Dev Dependencies**:
- `vite`: Build tool
- `@vitejs/plugin-react`: React plugin for Vite
- `tailwindcss`: CSS framework
- `postcss`: CSS processor
- `autoprefixer`: CSS vendor prefixes

### tailwind.config.js
Tailwind CSS configuration.

```javascript
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

**Customization**:
- Add custom colors in `theme.colors`
- Add custom fonts in `theme.fontFamily`
- Add plugins in `plugins` array

### postcss.config.js
PostCSS configuration for Tailwind CSS processing.

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

### vite.config.js
Vite build tool configuration.

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

**Customization**:
- Add `server` config for dev server options
- Add `build` config for build optimization
- Add `resolve` config for import aliases

## Application Configuration

### Search Configuration

**File**: `src/services/searchService.js`

```javascript
// Pagination
const pageSize = 10; // Results per page

// Mock database
const mockVoterDatabase = [...]; // Add/modify voters here
```

### Cache Configuration

**File**: `src/services/cacheService.js`

```javascript
class CacheService {
  constructor(
    maxSize = 50,           // Max cached items
    ttl = 5 * 60 * 1000     // 5 minutes TTL
  ) { ... }
}
```

**Customization**:
```javascript
// Increase cache size to 100
new CacheService(100, 5 * 60 * 1000)

// Reduce TTL to 2 minutes
new CacheService(50, 2 * 60 * 1000)
```

### Debounce Configuration

**File**: `src/components/SearchBar.jsx`

```javascript
// Default debounce delay: 300ms
// To change, modify the debounce call:
onSearch={debounce(handleSearch, 500)} // 500ms delay
```

### Pagination Configuration

**File**: `src/hooks/useSearch.js`

```javascript
const result = performSearch(query, page, 10); // 10 items per page
```

**To change page size**:
```javascript
const result = performSearch(query, page, 20); // 20 items per page
```

## Styling Configuration

### Tailwind CSS Customization

**File**: `tailwind.config.js`

#### Add Custom Colors
```javascript
theme: {
  extend: {
    colors: {
      'custom-blue': '#1e40af',
      'custom-green': '#15803d',
    }
  }
}
```

#### Add Custom Fonts
```javascript
theme: {
  extend: {
    fontFamily: {
      'sans': ['Inter', 'sans-serif'],
      'serif': ['Merriweather', 'serif'],
    }
  }
}
```

#### Add Custom Spacing
```javascript
theme: {
  extend: {
    spacing: {
      '128': '32rem',
      '144': '36rem',
    }
  }
}
```

### CSS Customization

**File**: `src/index.css`

Add custom CSS after Tailwind directives:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom styles */
.custom-class {
  @apply px-4 py-2 rounded-lg;
}
```

## Data Configuration

### Adding Sample Voters

**File**: `src/services/searchService.js`

```javascript
const mockVoterDatabase = [
  {
    id: '13',
    voterId: 'V013',
    name: 'New Voter',
    constituency: 'New Constituency',
    age: 35,
    gender: 'M',
    registrationDate: '2023-01-01',
    address: 'New Address',
    status: 'Active'
  },
  // Add more voters...
];
```

### Modifying Constituencies

**File**: `src/services/searchService.js`

Update the `constituency` field in `mockVoterDatabase`:
```javascript
constituency: 'Your Constituency Name'
```

The `getConstituencies()` function automatically extracts unique values.

## Performance Configuration

### Optimize Build Size

**vite.config.js**:
```javascript
export default defineConfig({
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
      }
    }
  }
})
```

### Enable Source Maps

**vite.config.js**:
```javascript
export default defineConfig({
  build: {
    sourcemap: true,
  }
})
```

## Development Configuration

### Dev Server Port

**vite.config.js**:
```javascript
export default defineConfig({
  server: {
    port: 3000,
    strictPort: false,
  }
})
```

### Hot Module Replacement

Vite enables HMR by default. To customize:
```javascript
export default defineConfig({
  server: {
    hmr: {
      host: 'localhost',
      port: 5173,
    }
  }
})
```

## Environment Variables

Create `.env` file in project root:

```env
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=Voter Search
VITE_DEBUG=false
```

Access in code:
```javascript
const apiUrl = import.meta.env.VITE_API_URL;
```

## Browser Configuration

### Supported Browsers

**vite.config.js**:
```javascript
export default defineConfig({
  build: {
    target: 'es2020', // or 'esnext'
  }
})
```

### Polyfills

For older browser support, add to `src/main.jsx`:
```javascript
import 'core-js/stable';
import 'regenerator-runtime/runtime';
```

## Deployment Configuration

### Build Output

Production build output goes to `dist/` directory.

**vite.config.js**:
```javascript
export default defineConfig({
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
})
```

### Base URL

For deployment in subdirectory:
```javascript
export default defineConfig({
  base: '/voter-search/',
})
```

## Testing Configuration

### Jest Setup

Create `jest.config.js`:
```javascript
export default {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
};
```

## Troubleshooting Configuration

### Port Already in Use
Vite will automatically use next available port. Or specify:
```bash
npm run dev -- --port 3000
```

### Module Not Found
Check `vite.config.js` for alias configuration:
```javascript
export default defineConfig({
  resolve: {
    alias: {
      '@': '/src',
    }
  }
})
```

### Styles Not Loading
Ensure `tailwind.config.js` content paths are correct:
```javascript
content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
]
```

### Build Fails
Clear cache and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

## Performance Tuning

### Optimize Images
Use optimized image formats (WebP, AVIF)

### Code Splitting
Vite automatically code-splits at route boundaries

### Lazy Loading
Implement React.lazy() for components:
```javascript
const SearchBar = React.lazy(() => import('./components/SearchBar'));
```

## Security Configuration

### Content Security Policy

Add to `index.html`:
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; script-src 'self' 'unsafe-inline'">
```

### CORS Configuration

For API requests, configure CORS in backend or use proxy:
```javascript
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      }
    }
  }
})
```

## Monitoring Configuration

### Error Tracking

Add error boundary in `App.jsx`:
```javascript
class ErrorBoundary extends React.Component {
  componentDidCatch(error, errorInfo) {
    console.error('Error:', error, errorInfo);
    // Send to error tracking service
  }
  // ...
}
```

### Analytics

Add tracking code to `src/main.jsx`:
```javascript
// Google Analytics, Mixpanel, etc.
```

---

For more information, see:
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [React Documentation](https://react.dev/)
