import React from 'react';
import { formatDate } from '../utils/validation';

export const ResultsList = ({
  results,
  totalCount,
  currentPage,
  pageSize,
  onPageChange,
  onVoterSelect,
  isLoading
}) => {
  const totalPages = Math.ceil(totalCount / pageSize);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-gray-200 h-24 rounded-lg animate-pulse"></div>
        ))}
      </div>
    );
  }

  if (totalCount === 0) {
    return (
      <div className="bg-white rounded-lg p-8 text-center">
        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <h3 className="mt-2 text-lg font-medium text-gray-900">No voters found</h3>
        <p className="mt-1 text-sm text-gray-500">Try adjusting your search criteria</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Results Count */}
      <div className="bg-yellow-100 border-l-4 border-yellow-500 p-3 shadow-md">
        <p className="text-sm font-bold text-gray-800">
          Found <span className="text-yellow-700">{totalCount}</span> voter{totalCount !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Voter Cards */}
      <div className="space-y-3">
        {results.map(voter => (
          <div
            key={voter.id}
            onClick={() => onVoterSelect(voter)}
            className="bg-white p-4 border-2 border-gray-300 hover:border-blue-500 hover:shadow-lg cursor-pointer transition"
          >
            <div className="space-y-3">
              {/* Name Section */}
              <div className="pb-3 border-b border-gray-200">
                <p className="text-lg font-bold text-gray-900">
                  {[voter.firstName, voter.middleName, voter.lastName].filter(Boolean).join(' ')}
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  <span className="font-bold">EPIC_NO:</span> <span className="text-blue-600 font-semibold">{voter.voterId}</span>
                </p>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-blue-50 p-2">
                  <p className="font-bold text-gray-600">Gender</p>
                  <p className="text-gray-900 font-semibold">{voter.gender}</p>
                </div>
                <div className="bg-green-50 p-2">
                  <p className="font-bold text-gray-600">Age</p>
                  <p className="text-gray-900 font-semibold">{voter.age}</p>
                </div>
                <div className="bg-purple-50 p-2">
                  <p className="font-bold text-gray-600">Serial No.</p>
                  <p className="text-gray-900 font-semibold">{voter.serialNumber}</p>
                </div>
                <div className="bg-orange-50 p-2">
                  <p className="font-bold text-gray-600">Constituency</p>
                  <p className="text-gray-900 font-semibold">{voter.constituency}</p>
                </div>
                <div className="bg-red-50 p-2 col-span-2">
                  <p className="font-bold text-gray-600">PART_NAME (हिंदी)</p>
                  <p className="text-gray-900 font-semibold text-xs">{voter.partName}</p>
                </div>
                <div className="bg-indigo-50 p-2 col-span-2">
                  <p className="font-bold text-gray-600">PART_NAME (English)</p>
                  <p className="text-gray-900 font-semibold text-xs">{voter.partNameEng}</p>
                </div>
                <div className="bg-gray-50 p-2 col-span-2">
                  <p className="font-bold text-gray-600">Address</p>
                  <p className="text-gray-900 font-semibold text-xs">{voter.address}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
    </div>
  );
};
