/**
 * CacheService - LRU cache with TTL for search results
 */

class CacheService {
  constructor(maxSize = 50, ttl = 5 * 60 * 1000) { // 5 minutes default
    this.cache = new Map();
    this.maxSize = maxSize;
    this.ttl = ttl;
    this.accessOrder = [];
  }

  /**
   * Generate cache key from query
   * @param {SearchQuery} query - Search query
   * @param {number} page - Page number
   * @returns {string} Cache key
   */
  generateKey(query, page) {
    // Include a version field so changes in search logic invalidate old cache entries
    const queryStr = JSON.stringify({ type: query.type, value: query.value, v: 3 });
    return `${queryStr}:${page}`;
  }

  /**
   * Get value from cache
   * @param {string} key - Cache key
   * @returns {SearchResult|null} Cached result or null
   */
  get(key) {
    if (!this.cache.has(key)) {
      return null;
    }

    const { value, timestamp } = this.cache.get(key);

    // Check if expired
    if (Date.now() - timestamp > this.ttl) {
      this.cache.delete(key);
      this.accessOrder = this.accessOrder.filter(k => k !== key);
      return null;
    }

    // Update access order (move to end)
    this.accessOrder = this.accessOrder.filter(k => k !== key);
    this.accessOrder.push(key);

    return value;
  }

  /**
   * Set value in cache
   * @param {string} key - Cache key
   * @param {SearchResult} value - Value to cache
   */
  set(key, value) {
    // If key already exists, remove it first
    if (this.cache.has(key)) {
      this.accessOrder = this.accessOrder.filter(k => k !== key);
    }

    // If cache is full, remove least recently used
    if (this.cache.size >= this.maxSize && !this.cache.has(key)) {
      const lruKey = this.accessOrder.shift();
      this.cache.delete(lruKey);
    }

    // Add new entry
    this.cache.set(key, {
      value,
      timestamp: Date.now()
    });
    this.accessOrder.push(key);
  }

  /**
   * Clear all cache
   */
  clear() {
    this.cache.clear();
    this.accessOrder = [];
  }

  /**
   * Get cache size
   * @returns {number} Number of cached items
   */
  size() {
    return this.cache.size;
  }
}

export default new CacheService();
