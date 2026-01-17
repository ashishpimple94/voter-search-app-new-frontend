import React, { useState, useCallback } from 'react';
import { fetchVoters } from '../services/apiService';
import cacheService from '../services/cacheService';
import { validateSearchQuery } from '../utils/validation';

/**
 * Custom hook for search functionality with API integration
 */
export const useSearch = () => {
  const [results, setResults] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentQuery, setCurrentQuery] = useState(null);

  const executeSearch = useCallback((query, page = 1) => {
    console.log('🔍 executeSearch called with:', query, page);
    console.log('🔍 Query type:', query.type);
    console.log('🔍 Query value:', query.value);
    console.log('🔍 Query filters:', query.filters);
    
    // Validate query
    const validation = validateSearchQuery(query.value);
    if (!validation.isValid) {
      console.log('❌ Validation failed:', validation.error);
      setError(validation.error);
      setResults([]);
      setTotalCount(0);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Check cache
      const cacheKey = cacheService.generateKey(query, page);
      console.log('📦 Cache key:', cacheKey);
      const cachedResult = cacheService.get(cacheKey);

      if (cachedResult) {
        console.log('Using cached result');
        setResults(cachedResult.voters);
        setTotalCount(cachedResult.totalCount);
        setCurrentPage(page);
        setCurrentQuery(query);
        setIsLoading(false);
        return;
      }

      console.log('Fetching from API...');
      // Fetch from API
      fetchVoters(query.type, query.value)
        .then(voters => {
          console.log('API returned voters:', voters.length);
          // Previously we were paginating to 10 results per page on the frontend.
          // Now we remove that limit and show all voters returned by the API.
          const pageSize = voters.length;
          const totalCount = voters.length;
          const paginatedResults = voters;

          const result = {
            voters: paginatedResults,
            totalCount,
            page,
            pageSize,
            timestamp: Date.now()
          };

          // Cache result
          cacheService.set(cacheKey, result);

          console.log('Setting results:', paginatedResults.length);
          setResults(paginatedResults);
          setTotalCount(totalCount);
          setCurrentPage(page);
          setCurrentQuery(query);
          setError(null);
          setIsLoading(false);
        })
        .catch(err => {
          console.error('Search error:', err);
          setError('Failed to fetch voters. Please try again.');
          setResults([]);
          setTotalCount(0);
          setIsLoading(false);
        });
    } catch (err) {
      console.error('Unexpected error:', err);
      setError('An error occurred during search. Please try again.');
      setResults([]);
      setTotalCount(0);
      setIsLoading(false);
    }
  }, []);

  const handlePageChange = useCallback((page) => {
    if (currentQuery) {
      executeSearch(currentQuery, page);
    }
  }, [currentQuery, executeSearch]);

  const clearSearch = useCallback(() => {
    setResults([]);
    setTotalCount(0);
    setCurrentPage(1);
    setError(null);
    setCurrentQuery(null);
  }, []);

  return {
    results,
    totalCount,
    currentPage,
    isLoading,
    error,
    executeSearch,
    handlePageChange,
    clearSearch
  };
};
