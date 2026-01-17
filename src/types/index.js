/**
 * @typedef {Object} Voter
 * @property {string} id - Unique identifier
 * @property {string} voterId - Voter ID (EPIC_NO)
 * @property {string} firstName - First name
 * @property {string} middleName - Middle name
 * @property {string} lastName - Last name
 * @property {string} name - Full name (computed)
 * @property {string} constituency - Electoral constituency
 * @property {number} age - Age of voter
 * @property {'M' | 'F' | 'Other'} gender - Gender
 * @property {string} registrationDate - Registration date
 * @property {string} address - Residential address
 * @property {'Active' | 'Inactive' | 'Suspended'} status - Registration status
 * @property {string} serialNumber - Serial number from API
 * @property {string} partName - Part name (PART_NAME)
 * @property {string} partNameEng - Part name in English (PART_NAME_ENG)
 */

/**
 * @typedef {Object} SearchQuery
 * @property {'name' | 'voterId' | 'constituency'} type - Search type
 * @property {string} value - Search value
 * @property {FilterCriteria} [filters] - Optional filters
 */

/**
 * @typedef {Object} FilterCriteria
 * @property {[number, number]} [ageRange] - Age range [min, max]
 * @property {string[]} [gender] - Gender filter
 * @property {string[]} [status] - Status filter
 */

/**
 * @typedef {Object} SearchResult
 * @property {Voter[]} voters - Array of voters
 * @property {number} totalCount - Total count
 * @property {number} page - Current page
 * @property {number} pageSize - Page size
 * @property {number} timestamp - Timestamp
 */

/**
 * @typedef {Object} SearchHistoryItem
 * @property {string} query - Search query
 * @property {'name' | 'voterId' | 'constituency'} type - Search type
 * @property {number} timestamp - Timestamp
 */

export {}
