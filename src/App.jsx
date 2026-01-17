import React, { useState, useCallback } from 'react';
import { SearchBar } from './components/SearchBar';
import { ResultsList } from './components/ResultsList';
import { FilterPanel } from './components/FilterPanel';
import { VoterDetailModal } from './components/VoterDetailModal';
import { useSearch } from './hooks/useSearch';
import { useFilter } from './hooks/useFilter';
import { useHistory } from './hooks/useHistory';
import { applyFilters } from './services/searchService';

function App() {
  const [selectedVoter, setSelectedVoter] = useState(null);
  const { results, totalCount, currentPage, isLoading, error, executeSearch, handlePageChange, clearSearch } = useSearch();
  const { filters, updateAgeRange, updateGender, updateStatus, removeFilter, clearAllFilters, hasActiveFilters } = useFilter();
  const { history, addToHistory } = useHistory();

  // Apply filters to results
  const filteredResults = applyFilters(results, filters);

  const handleSearch = useCallback((query) => {
    console.log('🎯 App handleSearch called with:', query);
    addToHistory(query.value, query.type);
    executeSearch({ ...query, filters }, 1);
  }, [executeSearch, addToHistory]);

  const handleFilterChange = useCallback((filterType, value) => {
    if (filterType === 'ageRange') {
      updateAgeRange(value[0], value[1]);
    } else if (filterType === 'gender') {
      updateGender(value);
    } else if (filterType === 'status') {
      updateStatus(value);
    }
  }, [updateAgeRange, updateGender, updateStatus]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md border-b-4 border-yellow-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <img 
              src="https://static.thenounproject.com/png/729479-200.png" 
              alt="Voter Search Logo" 
              className="w-12 h-12 object-contain"
            />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Voter Search</h1>
              <p className="text-gray-600 text-sm mt-1">Find voter records easily</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 rounded-lg p-4 flex items-start gap-3 shadow-md animate-pulse">
            <svg className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <div>
              <h3 className="font-bold text-red-900 text-lg">Error</h3>
              <p className="text-red-700 text-sm mt-1">{error}</p>
            </div>
          </div>
        )}

        {/* Search Bar */}
        <div className="mb-8 animate-fade-in">
          <SearchBar
            onSearch={handleSearch}
            recentSearches={history.slice(0, 5)}
            isLoading={isLoading}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-6">
          {/* Main Content - Results */}
          <div>
            {results.length > 0 && (
              <div className="mb-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 text-sm text-blue-900 shadow-sm">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zm-11-1a1 1 0 11-2 0 1 1 0 012 0z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <strong>Search Results:</strong> Found {results.length} voter{results.length !== 1 ? 's' : ''}
                    {hasActiveFilters() && ` • Showing ${filteredResults.length} after filters`}
                  </div>
                </div>
              </div>
            )}

            <ResultsList
              results={filteredResults}
              totalCount={filteredResults.length}
              currentPage={currentPage}
              pageSize={10}
              onPageChange={handlePageChange}
              onVoterSelect={setSelectedVoter}
              isLoading={isLoading}
            />
          </div>
        </div>
      </main>

      {/* Voter Detail Modal */}
      <VoterDetailModal
        voter={selectedVoter}
        onClose={() => setSelectedVoter(null)}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center">
          <p className="text-sm text-gray-600">
            Designed and Developed By <span className="font-semibold text-gray-900">XtendOnline</span>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
