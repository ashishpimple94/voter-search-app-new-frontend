import React, { useState, useRef, useEffect } from 'react';
import { fetchConstituencies } from '../services/apiService';

export const SearchBar = ({ onSearch, recentSearches, isLoading }) => {
  const [searchType, setSearchType] = useState('name');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  const [constituencies, setConstituencies] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    fetchConstituencies().then(data => {
      setConstituencies(data);
    }).catch(err => {
      console.error('Failed to fetch constituencies:', err);
    });
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    
    console.log('🔍 Search button clicked!');
    console.log('🔍 Search type:', searchType);
    console.log('🔍 First name:', firstName);
    console.log('🔍 Middle name:', middleName);
    console.log('🔍 Last name:', lastName);
    console.log('🔍 Search value:', searchValue);
    
    if (searchType === 'name') {
      // For name search, combine all three fields and normalize
      let searchQuery = `${firstName} ${middleName} ${lastName}`;
      // Normalize spaces and convert to uppercase to match backend expectations
      searchQuery = searchQuery.replace(/\s+/g, ' ').trim().toUpperCase();
      
      console.log('📝 Name search processing...');
      console.log('📝 Combined & normalized query:', searchQuery);
      
      if (searchQuery) {
        console.log('✅ Sending search request:', { type: searchType, value: searchQuery });
        // Send the combined query
        onSearch({
          type: searchType,
          value: searchQuery
        });
      } else {
        console.log('❌ Search query is empty!');
      }
    } else if (searchValue.trim()) {
      console.log('✅ Sending search request:', { type: searchType, value: searchValue });
      onSearch({
        type: searchType,
        value: searchValue
      });
    } else {
      console.log('❌ Search value is empty!');
    }
  };

  const handleHistoryClick = (query, type) => {
    if (type === 'name') {
      setSearchValue('');
    } else {
      setSearchValue(query);
    }
    setSearchType(type);
    setShowHistory(false);
    onSearch({
      type,
      value: query
    });
  };

  const handleClear = () => {
    setFirstName('');
    setMiddleName('');
    setLastName('');
    setSearchValue('');
    setSearchType('name');
    inputRef.current?.focus();
  };

  return (
    <div className="bg-white shadow-xl p-6 mb-8 border border-gray-200">
      {/* Yellow Header */}
      <div className="bg-yellow-400 text-center py-3 px-4 mb-6 font-bold text-lg text-gray-800">
        Find Your Voter Information
      </div>

      <form onSubmit={handleSearch} className="space-y-4">
        {/* Search Type Selector - Radio Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className={`flex items-center gap-3 cursor-pointer p-3 border-2 transition ${searchType === 'name' ? 'border-blue-600 bg-blue-50' : 'border-gray-300 bg-white'}`}>
            <input
              type="radio"
              value="name"
              checked={searchType === 'name'}
              onChange={(e) => setSearchType(e.target.value)}
              className="w-4 h-4 text-blue-600"
            />
            <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
            </svg>
            <span className="text-sm font-semibold text-gray-700">By Name</span>
          </label>
          <label className={`flex items-center gap-3 cursor-pointer p-3 border-2 transition ${searchType === 'voterId' ? 'border-blue-600 bg-blue-50' : 'border-gray-300 bg-white'}`}>
            <input
              type="radio"
              value="voterId"
              checked={searchType === 'voterId'}
              onChange={(e) => setSearchType(e.target.value)}
              className="w-4 h-4 text-blue-600"
            />
            <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-semibold text-gray-700">By Voter ID</span>
          </label>
        </div>

        {/* Search Input */}
        <div className="relative">
          {searchType === 'name' ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">पहिले नाव / First Name: <span className="text-red-600">*</span></label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First Name"
                  className="w-full px-3 py-2 border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition shadow-sm text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">वडिलांचे नाव / Middle name :</label>
                <input
                  type="text"
                  value={middleName}
                  onChange={(e) => setMiddleName(e.target.value)}
                  placeholder="Middle Name"
                  className="w-full px-3 py-2 border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition shadow-sm text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">आडनाव / Last Name: <span className="text-red-600">*</span></label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last Name"
                  className="w-full px-3 py-2 border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition shadow-sm text-sm"
                />
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Voter Id Card / EPIC No.: </label>
              <input
                ref={inputRef}
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onFocus={() => setShowHistory(true)}
                onBlur={() => setTimeout(() => setShowHistory(false), 200)}
                placeholder="Voter ID"
                className="w-full px-3 py-2 border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition shadow-sm text-sm"
              />

              {/* Recent Searches Dropdown */}
              {showHistory && recentSearches.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-gray-300 shadow-2xl z-10">
                  <div className="p-2">
                    <p className="text-xs font-bold text-gray-600 px-2 py-1 uppercase tracking-wide">Recent Searches</p>
                    {recentSearches.map((item, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleHistoryClick(item.query, item.type)}
                        className="w-full text-left px-2 py-1 hover:bg-blue-50 text-xs text-gray-700 transition"
                      >
                        🕐 {item.query}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2 justify-center">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-400 text-gray-800 font-bold py-2 px-8 transition shadow-md hover:shadow-lg disabled:shadow-none text-sm"
          >
            {isLoading ? 'Searching...' : 'Submit'}
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="bg-white border-2 border-gray-400 text-gray-700 font-bold py-2 px-8 hover:bg-gray-50 transition shadow-md text-sm"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};
