import React, { useState, useCallback, useEffect } from 'react';

const HISTORY_KEY = 'voter_search_history';
const MAX_HISTORY = 10;

/**
 * Custom hook for search history management
 */
export const useHistory = () => {
  const [history, setHistory] = useState([]);

  // Load history from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(HISTORY_KEY);
      if (stored) {
        setHistory(JSON.parse(stored));
      }
    } catch (err) {
      console.error('Failed to load search history:', err);
    }
  }, []);

  const addToHistory = useCallback((query, type) => {
    const newItem = {
      query,
      type,
      timestamp: Date.now()
    };

    setHistory(prev => {
      // Remove duplicate if exists
      const filtered = prev.filter(item => !(item.query === query && item.type === type));
      // Add new item at beginning
      const updated = [newItem, ...filtered].slice(0, MAX_HISTORY);
      // Save to localStorage
      try {
        localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
      } catch (err) {
        console.error('Failed to save search history:', err);
      }
      return updated;
    });
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
    try {
      localStorage.removeItem(HISTORY_KEY);
    } catch (err) {
      console.error('Failed to clear search history:', err);
    }
  }, []);

  return {
    history,
    addToHistory,
    clearHistory
  };
};
