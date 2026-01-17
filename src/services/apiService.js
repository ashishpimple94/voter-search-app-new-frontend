/**
 * API Client for voter search
 */

import { parseFullName } from '../utils/validation';

const API_BASE_URL = 'https://prabhag8-backend-1.onrender.com/api';

// Helper: normalize name strings (case-insensitive, collapse spaces)
const normalizeName = (str = '') => str.toUpperCase().replace(/\s+/g, ' ').trim();

// Helper: simple Levenshtein distance for fuzzy matching
const levenshtein = (a = '', b = '') => {
  const s = a;
  const t = b;
  const m = s.length;
  const n = t.length;
  if (m === 0) return n;
  if (n === 0) return m;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = s[i - 1] === t[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,      // deletion
        dp[i][j - 1] + 1,      // insertion
        dp[i - 1][j - 1] + cost // substitution
      );
    }
  }
  return dp[m][n];
};

// Tokenize name into words
const tokenizeName = (str = '') => normalizeName(str).split(' ').filter(Boolean);

// Compare single tokens with a max distance
const areTokensClose = (aToken, bToken, maxDistance = 2) => {
  if (!aToken || !bToken) return false;
  return levenshtein(aToken, bToken) <= maxDistance;
};

// Prefix match helper: allow matching on first N letters (e.g. 3 letters)
const isPrefixMatch = (aToken = '', bToken = '', minPrefixLength = 3) => {
  const aNorm = normalizeName(aToken);
  const bNorm = normalizeName(bToken);
  if (!aNorm || !bNorm) return false;

  const shorter = aNorm.length <= bNorm.length ? aNorm : bNorm;
  const longer = aNorm.length <= bNorm.length ? bNorm : aNorm;

  if (shorter.length < minPrefixLength) return false;
  return longer.startsWith(shorter);
};

// Fuzzy match: focus on FIRST + LAST name, ignore middle differences
// Examples it should handle:
// - DB: "RAHUL GAIKWAD", User: "RAHUL VIJAY GAIKWAD" (extra middle name)
// - DB: "RAHUL GAYAKWAD", User: "RAHUL GAIKWAD" (surname spelling off by 1–2 chars)
// - DB: "RAHUL GAIKWAD", User: "RAH GAI" (3-letter prefixes)
const isCloseNameMatch = (a, b) => {
  const aTokens = tokenizeName(a);
  const bTokens = tokenizeName(b);
  if (!aTokens.length || !bTokens.length) return false;

  const aFirst = aTokens[0];
  const aLast = aTokens[aTokens.length - 1];
  const bFirst = bTokens[0];
  const bLast = bTokens[bTokens.length - 1];

  // Allow slightly higher distance for surnames (common spelling variations)
  const lastClose =
    areTokensClose(aLast, bLast, 3) ||
    isPrefixMatch(aLast, bLast, 3); // 3-letter prefix OK for last name

  const firstClose =
    areTokensClose(aFirst, bFirst, 2) ||
    isPrefixMatch(aFirst, bFirst, 3); // 3-letter prefix OK for first name

  // Consider it a match if first and last names are close enough
  return lastClose && firstClose;
};

/**
 * Transform API voter data to app format
 * @param {Object} voter - Voter from API
 * @returns {Object} Transformed voter
 */
const transformVoter = (voter) => {
  // Get voter name from name field
  const voterName = voter.name || voter.Name || voter.VOTER_NAME || '';
  const nameParts = parseFullName(voterName);
  
  console.log('Raw voter data:', voter); // Debug log
  
  return {
    id: voter._id || voter.EPIC_NO || Math.random().toString(),
    voterId: voter.EPIC_NO || voter.voterIdCard || 'N/A',
    firstName: nameParts.firstName,
    middleName: nameParts.middleName,
    lastName: nameParts.lastName,
    serialNumber: voter.serialNumber || voter.SLNOINPART || 'N/A',
    partName: voter.PART_NAME || 'N/A',
    partNameEng: voter.PART_NAME_ENG || 'N/A',
    gender: voter.gender || 'N/A',
    constituency: voter.constituency || voter.AC_NO || 'N/A',
    age: voter.age || 'N/A',
    registrationDate: voter.createdAt || new Date().toISOString(),
    address: voter.address || voter.adr1 || 'N/A',
    status: 'Active'
  };
};

/**
 * Fetch voters from backend API
 * @param {string} searchType - Type of search (name, voterId, constituency)
 * @param {string} searchValue - Search value
 * @returns {Promise<Array>} Array of voters
 */
export const fetchVoters = async (searchType, searchValue) => {
  try {
    // Normalize search value for consistent backend behavior
    const normalizedSearchValue = normalizeName(searchValue || '');
    const endpoint = `${API_BASE_URL}/voters/search?query=${encodeURIComponent(normalizedSearchValue)}`;
    
    console.log('🚀 API Request - Endpoint:', endpoint);
    console.log('🚀 Search Type:', searchType);
    console.log('🚀 Raw Search Value:', searchValue);
    console.log('🚀 Normalized Search Value:', normalizedSearchValue);
    console.log('🚀 Encoded Query:', encodeURIComponent(normalizedSearchValue));

    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
    });

    console.log('📊 API Response Status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response:', errorText);
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    console.log('API Response:', data);
    
    // Handle the API response format - it returns data in a 'data' field
    let voters = Array.isArray(data) ? data : (data.data || data.voters || []);
    
    console.log('Voters extracted (primary call):', voters.length);
    
    if (voters.length > 0) {
      console.log('First voter raw:', voters[0]);
      // Transform voters to app format
      return voters.map(transformVoter);
    }

    // If no voters found and this is a name search with multiple parts, try a fuzzy fallback
    if (searchType === 'name') {
      const tokens = normalizedSearchValue.split(' ').filter(Boolean);
      if (tokens.length >= 2) {
        const lastNameToken = tokens[tokens.length - 1];
        console.log('🧪 No exact matches, trying fallback search with last name token:', lastNameToken);

        const fallbackEndpoint = `${API_BASE_URL}/voters/search?query=${encodeURIComponent(lastNameToken)}`;
        console.log('🧪 Fallback API Request - Endpoint:', fallbackEndpoint);

        const fallbackResponse = await fetch(fallbackEndpoint, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          mode: 'cors',
        });

        console.log('📊 Fallback API Response Status:', fallbackResponse.status);

        if (fallbackResponse.ok) {
          const fallbackData = await fallbackResponse.json();
          console.log('Fallback API Response:', fallbackData);

          let fallbackVoters = Array.isArray(fallbackData)
            ? fallbackData
            : (fallbackData.data || fallbackData.voters || []);

          console.log('Voters extracted (fallback):', fallbackVoters.length);

          // Fuzzy match on full name to find closest matches to the user query
          const targetFullName = normalizedSearchValue;

          fallbackVoters = fallbackVoters.filter((v) => {
            const nameFromApi = v.name || v.Name || v.VOTER_NAME || '';
            return isCloseNameMatch(nameFromApi, targetFullName);
          });

          console.log('Voters after fuzzy filter:', fallbackVoters.length);

          if (fallbackVoters.length > 0) {
            return fallbackVoters.map(transformVoter);
          }
        }
      }
    }

    // Still nothing found
    return [];
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

/**
 * Get all constituencies from backend
 * @returns {Promise<Array>} Array of constituencies
 */
export const fetchConstituencies = async () => {
  try {
    const endpoint = `${API_BASE_URL}/voters`;
    console.log('Fetching voters from:', endpoint);

    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
    });

    console.log('Voters response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Voters API Error:', errorText);
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    console.log('Voters API Response:', data);
    
    // Extract unique constituencies
    let voters = Array.isArray(data) ? data : (data.data || data.voters || []);
    const constituencies = [...new Set(voters.map(v => v.constituency || v.Constituency).filter(Boolean))];
    
    return constituencies.sort();
  } catch (error) {
    console.error('Constituencies API Error:', error);
    return [];
  }
};
