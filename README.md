# Voter Search Application

A robust, responsive voter search application built with React and Tailwind CSS. Search for voters by name, voter ID, or constituency with advanced filtering and pagination capabilities.

## Features

✅ **Multi-criteria Search**
- Search by voter name (case-insensitive partial matching)
- Search by voter ID (exact matching)
- Search by constituency

✅ **Advanced Filtering**
- Filter by age range
- Filter by gender
- Filter by registration status
- Active filter tags with easy removal

✅ **Pagination**
- Efficient pagination for large result sets
- Page navigation with smart page number display
- Results counter

✅ **Voter Details**
- Detailed voter information modal
- Print functionality
- Export to CSV

✅ **Search History**
- Recent searches dropdown
- Persistent search history (localStorage)
- Quick access to previous searches

✅ **Performance**
- Search result caching (5-minute TTL)
- Debounced search input (300ms)
- LRU cache with size limits

✅ **Responsive Design**
- Mobile-optimized (< 640px)
- Tablet-optimized (640px - 1024px)
- Desktop-optimized (> 1024px)
- Touch-friendly controls

## Project Structure

```
voter-search-app/
├── src/
│   ├── components/
│   │   ├── SearchBar.jsx          # Search input and type selector
│   │   ├── ResultsList.jsx        # Voter results with pagination
│   │   ├── FilterPanel.jsx        # Advanced filtering options
│   │   └── VoterDetailModal.jsx   # Detailed voter information
│   ├── hooks/
│   │   ├── useSearch.js           # Search state management
│   │   ├── useFilter.js           # Filter state management
│   │   └── useHistory.js          # Search history management
│   ├── services/
│   │   ├── searchService.js       # Core search logic
│   │   └── cacheService.js        # LRU cache with TTL
│   ├── utils/
│   │   ├── debounce.js            # Debounce utilities
│   │   └── validation.js          # Input validation
│   ├── types/
│   │   └── index.js               # TypeScript-like type definitions
│   ├── App.jsx                    # Main application component
│   ├── main.jsx                   # React entry point
│   └── index.css                  # Tailwind CSS imports
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
├── index.html
└── README.md
```

## Installation

### Prerequisites
- Node.js 16+ and npm

### Setup

1. **Install dependencies**
```bash
npm install
```

2. **Start development server**
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

3. **Build for production**
```bash
npm run build
```

4. **Preview production build**
```bash
npm run preview
```

## Usage

### Search by Name
1. Select "By Name" radio button
2. Enter a voter name (partial matches work)
3. Click "Search"

### Search by Voter ID
1. Select "By Voter ID" radio button
2. Enter a voter ID (e.g., V001)
3. Click "Search"

### Search by Constituency
1. Select "By Constituency" radio button
2. Select a constituency from the dropdown
3. Click "Search"

### Apply Filters
1. Click the "Filters" panel to expand
2. Adjust age range, gender, or status filters
3. Filters apply automatically to current results

### View Voter Details
1. Click on any voter card in the results
2. A modal will open with complete voter information
3. Use "Print" to print voter details
4. Use "Export CSV" to download voter data

### Recent Searches
1. Click on the search input field
2. Recent searches appear in a dropdown
3. Click a recent search to execute it again

## Data Models

### Voter
```javascript
{
  id: string,
  voterId: string,
  name: string,
  constituency: string,
  age: number,
  gender: 'M' | 'F' | 'Other',
  registrationDate: string,
  address: string,
  status: 'Active' | 'Inactive' | 'Suspended'
}
```

### SearchQuery
```javascript
{
  type: 'name' | 'voterId' | 'constituency',
  value: string,
  filters?: FilterCriteria
}
```

### FilterCriteria
```javascript
{
  ageRange?: [number, number],
  gender?: string[],
  status?: string[]
}
```

## Performance Characteristics

- **Search Response Time**: < 500ms for queries matching up to 1000 records
- **Cache TTL**: 5 minutes
- **Debounce Delay**: 300ms
- **Page Size**: 10 voters per page
- **Max Cache Size**: 50 entries (LRU eviction)
- **Max Search History**: 10 items

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Technologies Used

- **React 18**: UI framework
- **Tailwind CSS 3**: Utility-first CSS framework
- **Vite**: Build tool and dev server
- **JavaScript ES6+**: Modern JavaScript

## Future Enhancements

- [ ] Backend API integration
- [ ] Advanced search operators
- [ ] Bulk operations
- [ ] User authentication
- [ ] Audit logging
- [ ] Data export (Excel, PDF)
- [ ] Advanced analytics
- [ ] Real-time search suggestions

## License

MIT

## Support

For issues or questions, please create an issue in the repository.
