/**
 * Validation utilities
 */

/**
 * Validate search query
 * @param {string} query - Search query
 * @returns {Object} Validation result
 */
export const validateSearchQuery = (query) => {
  if (!query || query.trim() === '') {
    return {
      isValid: false,
      error: 'Please enter a search term'
    };
  }

  if (query.trim().length < 2) {
    return {
      isValid: false,
      error: 'Search term must be at least 2 characters'
    };
  }

  return {
    isValid: true,
    error: null
  };
};

/**
 * Validate voter ID format
 * @param {string} voterId - Voter ID
 * @returns {Object} Validation result
 */
export const validateVoterId = (voterId) => {
  if (!voterId || voterId.trim() === '') {
    return {
      isValid: false,
      error: 'Please enter a voter ID'
    };
  }

  // Voter ID format: V followed by digits
  const voterIdRegex = /^V?\d+$/i;
  if (!voterIdRegex.test(voterId.trim())) {
    return {
      isValid: false,
      error: 'Voter ID must be numeric (e.g., V001 or 001)'
    };
  }

  return {
    isValid: true,
    error: null
  };
};

/**
 * Sanitize input to prevent XSS
 * @param {string} input - Input string
 * @returns {string} Sanitized string
 */
export const sanitizeInput = (input) => {
  if (!input) return '';
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

/**
 * Format date string
 * @param {string} dateStr - Date string
 * @returns {string} Formatted date
 */
export const formatDate = (dateStr) => {
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch {
    return dateStr;
  }
};

/**
 * Parse full name into first, middle, and last name
 * @param {string} fullName - Full name string
 * @returns {Object} Object with firstName, middleName, lastName
 */
export const parseFullName = (fullName) => {
  if (!fullName) {
    return { firstName: '', middleName: '', lastName: '' };
  }

  const parts = fullName.trim().split(/\s+/);
  
  if (parts.length === 1) {
    return {
      firstName: parts[0],
      middleName: '',
      lastName: ''
    };
  } else if (parts.length === 2) {
    return {
      firstName: parts[0],
      middleName: '',
      lastName: parts[1]
    };
  } else {
    // For 3+ parts: first, middle(s), last
    return {
      firstName: parts[0],
      middleName: parts.slice(1, -1).join(' '),
      lastName: parts[parts.length - 1]
    };
  }
};
