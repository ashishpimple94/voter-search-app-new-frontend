import React, { useState, useCallback } from 'react';

/**
 * Custom hook for filter management
 */
export const useFilter = () => {
  const [filters, setFilters] = useState({
    ageRange: null,
    gender: [],
    status: []
  });

  const updateAgeRange = useCallback((minAge, maxAge) => {
    setFilters(prev => ({
      ...prev,
      ageRange: [minAge, maxAge]
    }));
  }, []);

  const updateGender = useCallback((gender) => {
    setFilters(prev => ({
      ...prev,
      gender: prev.gender.includes(gender)
        ? prev.gender.filter(g => g !== gender)
        : [...prev.gender, gender]
    }));
  }, []);

  const updateStatus = useCallback((status) => {
    setFilters(prev => ({
      ...prev,
      status: prev.status.includes(status)
        ? prev.status.filter(s => s !== status)
        : [...prev.status, status]
    }));
  }, []);

  const removeFilter = useCallback((filterType, value) => {
    setFilters(prev => {
      if (filterType === 'ageRange') {
        return { ...prev, ageRange: null };
      }
      return {
        ...prev,
        [filterType]: prev[filterType].filter(item => item !== value)
      };
    });
  }, []);

  const clearAllFilters = useCallback(() => {
    setFilters({
      ageRange: null,
      gender: [],
      status: []
    });
  }, []);

  const hasActiveFilters = () => {
    return filters.ageRange !== null || filters.gender.length > 0 || filters.status.length > 0;
  };

  return {
    filters,
    updateAgeRange,
    updateGender,
    updateStatus,
    removeFilter,
    clearAllFilters,
    hasActiveFilters
  };
};
