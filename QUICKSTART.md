# Quick Start Guide

## Get Started in 3 Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Open in Browser
Navigate to `http://localhost:5173`

## What You Get

A fully functional voter search application with:

- 🔍 **Search**: By name, voter ID, or constituency
- 🎯 **Filters**: Age, gender, registration status
- 📄 **Pagination**: Navigate through large result sets
- 💾 **History**: Recent searches saved locally
- ⚡ **Performance**: Cached results, debounced search
- 📱 **Responsive**: Works on mobile, tablet, desktop
- 🎨 **Beautiful UI**: Built with Tailwind CSS

## Sample Data

The app comes with 12 sample voters pre-loaded:

- **Rajesh Kumar** (V001) - Mumbai Central
- **Priya Singh** (V002) - Mumbai Central
- **Amit Patel** (V003) - Delhi South
- **Neha Sharma** (V004) - Bangalore East
- **Vikram Reddy** (V005) - Hyderabad West
- And 7 more...

## Try These Searches

1. **Search by Name**: "Rajesh" or "Singh"
2. **Search by Voter ID**: "V001" or "V005"
3. **Search by Constituency**: "Mumbai Central" or "Delhi South"
4. **Apply Filters**: Age 25-40, Female, Active status

## Key Features to Explore

### Search Bar
- Type to search (debounced)
- Select search type (name/ID/constituency)
- Recent searches dropdown
- Clear button

### Results
- Click any voter to see full details
- Pagination for large result sets
- Status badges (Active/Inactive/Suspended)

### Filters
- Expand filter panel
- Adjust age range with slider
- Select gender and status
- Remove individual filters or clear all

### Voter Details Modal
- View complete voter information
- Print voter details
- Export to CSV

### Search History
- Automatically saved to browser
- Click to re-run previous searches
- Max 10 recent searches

## Development

### Project Structure
```
src/
├── components/     # React components
├── hooks/         # Custom React hooks
├── services/      # Business logic
├── utils/         # Helper functions
└── types/         # Type definitions
```

### Key Files

- **App.jsx**: Main application component
- **SearchBar.jsx**: Search input interface
- **ResultsList.jsx**: Results display with pagination
- **FilterPanel.jsx**: Advanced filtering
- **VoterDetailModal.jsx**: Voter information modal
- **searchService.js**: Core search logic
- **cacheService.js**: Result caching

### Styling

All styling uses Tailwind CSS utility classes. No custom CSS needed!

### Adding More Voters

Edit `src/services/searchService.js` and add to `mockVoterDatabase`:

```javascript
{
  id: '13',
  voterId: 'V013',
  name: 'Your Name',
  constituency: 'Your Constituency',
  age: 30,
  gender: 'M',
  registrationDate: '2023-01-01',
  address: 'Your Address',
  status: 'Active'
}
```

## Troubleshooting

### Port Already in Use
If port 5173 is busy, Vite will use the next available port. Check the terminal output.

### Styles Not Loading
Make sure Tailwind CSS is properly configured:
```bash
npm install -D tailwindcss postcss autoprefixer
```

### Search Not Working
Check browser console for errors. Ensure search value is not empty.

## Next Steps

1. **Connect to Backend**: Replace mock data with API calls
2. **Add Authentication**: Implement user login
3. **Enhance Filtering**: Add more filter options
4. **Export Features**: Add PDF export
5. **Analytics**: Track search patterns
6. **Testing**: Add unit and integration tests

## Need Help?

- Check README.md for detailed documentation
- Review component files for implementation details
- Check browser console for error messages

Happy searching! 🎉
