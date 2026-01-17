import React, { useState } from 'react';

export const FilterPanel = ({ filters, onFilterChange, onClearFilters }) => {
  const [minAge, setMinAge] = useState(filters.ageRange?.[0] || 18);
  const [maxAge, setMaxAge] = useState(filters.ageRange?.[1] || 80);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleAgeChange = () => {
    onFilterChange('ageRange', [minAge, maxAge]);
  };

  const handleGenderChange = (gender) => {
    onFilterChange('gender', gender);
  };

  const handleStatusChange = (status) => {
    onFilterChange('status', status);
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.ageRange) count++;
    if (filters.gender?.length > 0) count += filters.gender.length;
    if (filters.status?.length > 0) count += filters.status.length;
    return count;
  };

  const activeCount = getActiveFilterCount();

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-3 flex justify-between items-center hover:bg-gray-50 transition"
      >
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          <span className="font-semibold text-gray-900">Filters</span>
          {activeCount > 0 && (
            <span className="ml-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">
              {activeCount}
            </span>
          )}
        </div>
        <svg
          className={`w-5 h-5 text-gray-600 transition ${isExpanded ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </button>

      {/* Content */}
      {isExpanded && (
        <div className="border-t border-gray-200 p-4 space-y-4">
          {/* Age Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Age Range</label>
            <div className="space-y-2">
              <div className="flex gap-2 items-center">
                <input
                  type="number"
                  min="18"
                  max="100"
                  value={minAge}
                  onChange={(e) => setMinAge(Number(e.target.value))}
                  onBlur={handleAgeChange}
                  className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                />
                <span className="text-gray-500">to</span>
                <input
                  type="number"
                  min="18"
                  max="100"
                  value={maxAge}
                  onChange={(e) => setMaxAge(Number(e.target.value))}
                  onBlur={handleAgeChange}
                  className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                />
              </div>
              <input
                type="range"
                min="18"
                max="100"
                value={minAge}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  if (val <= maxAge) setMinAge(val);
                }}
                onMouseUp={handleAgeChange}
                className="w-full"
              />
            </div>
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
            <div className="space-y-2">
              {['M', 'F', 'Other'].map(gender => (
                <label key={gender} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.gender?.includes(gender) || false}
                    onChange={() => handleGenderChange(gender)}
                    className="w-4 h-4 rounded"
                  />
                  <span className="text-sm text-gray-700">
                    {gender === 'M' ? 'Male' : gender === 'F' ? 'Female' : 'Other'}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <div className="space-y-2">
              {['Active', 'Inactive', 'Suspended'].map(status => (
                <label key={status} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.status?.includes(status) || false}
                    onChange={() => handleStatusChange(status)}
                    className="w-4 h-4 rounded"
                  />
                  <span className="text-sm text-gray-700">{status}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Active Filters Tags */}
          {activeCount > 0 && (
            <div className="pt-2 border-t border-gray-200">
              <div className="flex flex-wrap gap-2">
                {filters.ageRange && (
                  <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    Age: {filters.ageRange[0]}-{filters.ageRange[1]}
                    <button
                      onClick={() => onFilterChange('ageRange', null)}
                      className="ml-1 hover:text-blue-600"
                    >
                      ×
                    </button>
                  </span>
                )}
                {filters.gender?.map(g => (
                  <span key={g} className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    {g === 'M' ? 'Male' : g === 'F' ? 'Female' : 'Other'}
                    <button
                      onClick={() => handleGenderChange(g)}
                      className="ml-1 hover:text-blue-600"
                    >
                      ×
                    </button>
                  </span>
                ))}
                {filters.status?.map(s => (
                  <span key={s} className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    {s}
                    <button
                      onClick={() => handleStatusChange(s)}
                      className="ml-1 hover:text-blue-600"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <button
                onClick={onClearFilters}
                className="mt-2 text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
