/**
 * SearchService - Core search logic for voter records
 */

// Mock voter database
const mockVoterDatabase = [
  {
    id: '1',
    voterId: 'V001',
    firstName: 'Rajesh',
    middleName: 'Kumar',
    lastName: 'Singh',
    constituency: 'Mumbai Central',
    age: 35,
    gender: 'M',
    registrationDate: '2020-01-15',
    address: '123 Main St, Mumbai',
    status: 'Active'
  },
  {
    id: '2',
    voterId: 'V002',
    firstName: 'Priya',
    middleName: 'Rani',
    lastName: 'Singh',
    constituency: 'Mumbai Central',
    age: 28,
    gender: 'F',
    registrationDate: '2021-03-20',
    address: '456 Oak Ave, Mumbai',
    status: 'Active'
  },
  {
    id: '3',
    voterId: 'V003',
    firstName: 'Amit',
    middleName: 'Kumar',
    lastName: 'Patel',
    constituency: 'Delhi South',
    age: 42,
    gender: 'M',
    registrationDate: '2019-06-10',
    address: '789 Pine Rd, Delhi',
    status: 'Active'
  },
  {
    id: '4',
    voterId: 'V004',
    firstName: 'Neha',
    middleName: 'Priya',
    lastName: 'Sharma',
    constituency: 'Bangalore East',
    age: 31,
    gender: 'F',
    registrationDate: '2020-11-05',
    address: '321 Elm St, Bangalore',
    status: 'Inactive'
  },
  {
    id: '5',
    voterId: 'V005',
    firstName: 'Vikram',
    middleName: 'Raj',
    lastName: 'Reddy',
    constituency: 'Hyderabad West',
    age: 38,
    gender: 'M',
    registrationDate: '2018-09-12',
    address: '654 Maple Dr, Hyderabad',
    status: 'Active'
  },
  {
    id: '6',
    voterId: 'V006',
    firstName: 'Anjali',
    middleName: 'Devi',
    lastName: 'Verma',
    constituency: 'Mumbai Central',
    age: 26,
    gender: 'F',
    registrationDate: '2022-02-14',
    address: '987 Cedar Ln, Mumbai',
    status: 'Active'
  },
  {
    id: '7',
    voterId: 'V007',
    firstName: 'Rohan',
    middleName: 'Singh',
    lastName: 'Gupta',
    constituency: 'Delhi South',
    age: 45,
    gender: 'M',
    registrationDate: '2017-05-22',
    address: '147 Birch Way, Delhi',
    status: 'Active'
  },
  {
    id: '8',
    voterId: 'V008',
    firstName: 'Divya',
    middleName: 'Kumari',
    lastName: 'Nair',
    constituency: 'Kochi North',
    age: 33,
    gender: 'F',
    registrationDate: '2020-08-30',
    address: '258 Spruce St, Kochi',
    status: 'Active'
  },
  {
    id: '9',
    voterId: 'V009',
    firstName: 'Sanjay',
    middleName: 'Kumar',
    lastName: 'Mishra',
    constituency: 'Bangalore East',
    age: 50,
    gender: 'M',
    registrationDate: '2016-12-03',
    address: '369 Walnut Ave, Bangalore',
    status: 'Suspended'
  },
  {
    id: '10',
    voterId: 'V010',
    firstName: 'Kavya',
    middleName: 'Rani',
    lastName: 'Iyer',
    constituency: 'Mumbai Central',
    age: 29,
    gender: 'F',
    registrationDate: '2021-07-18',
    address: '741 Ash Rd, Mumbai',
    status: 'Active'
  },
  {
    id: '11',
    voterId: 'V011',
    firstName: 'Arjun',
    middleName: 'Raj',
    lastName: 'Singh',
    constituency: 'Delhi South',
    age: 36,
    gender: 'M',
    registrationDate: '2019-04-25',
    address: '852 Poplar Ln, Delhi',
    status: 'Active'
  },
  {
    id: '12',
    voterId: 'V012',
    firstName: 'Meera',
    middleName: 'Devi',
    lastName: 'Desai',
    constituency: 'Hyderabad West',
    age: 40,
    gender: 'F',
    registrationDate: '2018-10-11',
    address: '963 Willow Dr, Hyderabad',
    status: 'Active'
  }
];

/**
 * Get full name from voter object
 * @param {Voter} voter - Voter object
 * @returns {string} Full name
 */
const getFullName = (voter) => {
  return `${voter.firstName} ${voter.middleName} ${voter.lastName}`.trim();
};

/**
 * Search voters by name (case-insensitive partial matching)
 * @param {string} name - Search term (can be first, middle, or last name)
 * @returns {Voter[]} Matching voters
 */
export const searchByName = (name) => {
  if (!name || name.trim() === '') {
    return [];
  }
  const searchTerm = name.toLowerCase().trim();
  return mockVoterDatabase.filter(voter =>
    voter.firstName.toLowerCase().includes(searchTerm) ||
    voter.middleName.toLowerCase().includes(searchTerm) ||
    voter.lastName.toLowerCase().includes(searchTerm)
  );
};

/**
 * Search voters by voter ID (exact matching)
 * @param {string} voterId - Voter ID
 * @returns {Voter[]} Matching voter (0 or 1 result)
 */
export const searchByVoterId = (voterId) => {
  if (!voterId || voterId.trim() === '') {
    return [];
  }
  const searchTerm = voterId.trim().toUpperCase();
  return mockVoterDatabase.filter(voter =>
    voter.voterId.toUpperCase() === searchTerm
  );
};

/**
 * Search voters by constituency
 * @param {string} constituency - Constituency name
 * @returns {Voter[]} Matching voters sorted by name
 */
export const searchByConstituency = (constituency) => {
  if (!constituency || constituency.trim() === '') {
    return [];
  }
  const searchTerm = constituency.toLowerCase().trim();
  return mockVoterDatabase
    .filter(voter =>
      voter.constituency.toLowerCase().includes(searchTerm)
    )
    .sort((a, b) => a.name.localeCompare(b.name));
};

/**
 * Apply filters to voter list
 * @param {Voter[]} voters - Voter list
 * @param {FilterCriteria} filters - Filter criteria
 * @returns {Voter[]} Filtered voters
 */
export const applyFilters = (voters, filters) => {
  if (!filters) return voters;

  return voters.filter(voter => {
    // Age range filter
    if (filters.ageRange) {
      const [minAge, maxAge] = filters.ageRange;
      if (voter.age < minAge || voter.age > maxAge) {
        return false;
      }
    }

    // Gender filter
    if (filters.gender && filters.gender.length > 0) {
      if (!filters.gender.includes(voter.gender)) {
        return false;
      }
    }

    // Status filter
    if (filters.status && filters.status.length > 0) {
      if (!filters.status.includes(voter.status)) {
        return false;
      }
    }

    return true;
  });
};

/**
 * Perform search with pagination
 * @param {SearchQuery} query - Search query
 * @param {number} page - Page number (1-indexed)
 * @param {number} pageSize - Results per page
 * @returns {SearchResult} Search result with pagination
 */
export const performSearch = (query, page = 1, pageSize = 10) => {
  if (!query || !query.value || query.value.trim() === '') {
    return {
      voters: [],
      totalCount: 0,
      page,
      pageSize,
      timestamp: Date.now()
    };
  }

  let results = [];

  // Perform search based on type
  switch (query.type) {
    case 'name':
      results = searchByName(query.value);
      break;
    case 'voterId':
      results = searchByVoterId(query.value);
      break;
    case 'constituency':
      results = searchByConstituency(query.value);
      break;
    default:
      results = [];
  }

  // Apply filters
  if (query.filters) {
    results = applyFilters(results, query.filters);
  }

  // Apply pagination
  const totalCount = results.length;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedResults = results.slice(startIndex, endIndex);

  return {
    voters: paginatedResults,
    totalCount,
    page,
    pageSize,
    timestamp: Date.now()
  };
};

/**
 * Get all constituencies
 * @returns {string[]} List of unique constituencies
 */
export const getConstituencies = () => {
  const constituencies = new Set(mockVoterDatabase.map(v => v.constituency));
  return Array.from(constituencies).sort();
};
