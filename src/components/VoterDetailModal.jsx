import React from 'react';
import { formatDate } from '../utils/validation';

export const VoterDetailModal = ({ voter, onClose }) => {
  if (!voter) return null;

  const handlePrint = () => {
    const fullName = [voter.firstName, voter.middleName, voter.lastName].filter(Boolean).join(' ');
    const printWindow = window.open('', '', 'height=600,width=800');
    const htmlContent = `
      <html>
        <head>
          <title>Voter Details - ${fullName}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .detail-row { margin: 10px 0; }
            .label { font-weight: bold; color: #333; }
            .value { color: #666; }
          </style>
        </head>
        <body>
          <h1>Voter Details</h1>
          <div class="detail-row">
            <span class="label">S.NO:</span>
            <span class="value">${voter.serialNumber}</span>
          </div>
          <div class="detail-row">
            <span class="label">VOTER FIRSTNAME:</span>
            <span class="value">${voter.firstName}</span>
          </div>
          <div class="detail-row">
            <span class="label">VOTER LASTNAME:</span>
            <span class="value">${voter.lastName}</span>
          </div>
          <div class="detail-row">
            <span class="label">VOTER NAME:</span>
            <span class="value">${fullName}</span>
          </div>
          <div class="detail-row">
            <span class="label">AGE:</span>
            <span class="value">${voter.age}</span>
          </div>
          <div class="detail-row">
            <span class="label">GENDER:</span>
            <span class="value">${voter.gender}</span>
          </div>
          <div class="detail-row">
            <span class="label">EPIC NO:</span>
            <span class="value">${voter.voterId}</span>
          </div>
          <div class="detail-row">
            <span class="label">AC_NO:</span>
            <span class="value">${voter.constituency}</span>
          </div>
          <div class="detail-row">
            <span class="label">PART_NO:</span>
            <span class="value">${voter.partNumber}</span>
          </div>
          <div class="detail-row">
            <span class="label">PART_NAME (मराठी):</span>
            <span class="value">${voter.partName}</span>
          </div>
          <div class="detail-row">
            <span class="label">PART_NAME (English):</span>
            <span class="value">${voter.partNameEng}</span>
          </div>
        </body>
      </html>
    `;
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.print();
  };

  const handleShareWhatsApp = () => {
    const fullName = [voter.firstName, voter.middleName, voter.lastName].filter(Boolean).join(' ');
    const message = `S.NO: ${voter.serialNumber} | Name: ${fullName} | Age: ${voter.age} | Gender: ${voter.gender} | EPIC_NO: ${voter.voterId} | AC_NO: ${voter.constituency} | PART_NO: ${voter.partNumber} | PART_NAME: ${voter.partName} | PART_NAME_ENG: ${voter.partNameEng}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Voter Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="space-y-3">
            <p className="text-gray-900">
              <span className="font-semibold">S.NO:</span> {voter.serialNumber}
            </p>
            <p className="text-gray-900">
              <span className="font-semibold">VOTER FIRSTNAME:</span> {voter.firstName}
            </p>
            <p className="text-gray-900">
              <span className="font-semibold">VOTER LASTNAME:</span> {voter.lastName}
            </p>
            <p className="text-gray-900">
              <span className="font-semibold">VOTER NAME:</span> {[voter.firstName, voter.middleName, voter.lastName].filter(Boolean).join(' ')}
            </p>
            <p className="text-gray-900">
              <span className="font-semibold">AGE:</span> {voter.age}
            </p>
            <p className="text-gray-900">
              <span className="font-semibold">GENDER:</span> {voter.gender}
            </p>
            <p className="text-gray-900">
              <span className="font-semibold">EPIC NO:</span> {voter.voterId}
            </p>
            <p className="text-gray-900">
              <span className="font-semibold">AC_NO:</span> {voter.constituency}
            </p>
            <p className="text-gray-900">
              <span className="font-semibold">PART_NO:</span> {voter.partNumber}
            </p>
            <p className="text-gray-900">
              <span className="font-semibold">PART_NAME (मराठी):</span> {voter.partName}
            </p>
            <p className="text-gray-900">
              <span className="font-semibold">PART_NAME (English):</span> {voter.partNameEng}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 px-6 py-4 flex gap-3 justify-end">
          <button
            onClick={handleShareWhatsApp}
            className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition"
          >
            Share on WhatsApp
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition"
          >
            Print
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
