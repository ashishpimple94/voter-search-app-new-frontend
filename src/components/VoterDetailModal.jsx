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
            <span class="label">Name:</span>
            <span class="value">${fullName}</span>
          </div>
          <div class="detail-row">
            <span class="label">EPIC_NO:</span>
            <span class="value">${voter.voterId}</span>
          </div>
          <div class="detail-row">
            <span class="label">Gender:</span>
            <span class="value">${voter.gender}</span>
          </div>
          <div class="detail-row">
            <span class="label">Serial Number:</span>
            <span class="value">${voter.serialNumber}</span>
          </div>
          <div class="detail-row">
            <span class="label">PART_NAME:</span>
            <span class="value">${voter.partName}</span>
          </div>
          <div class="detail-row">
            <span class="label">PART_NAME_ENG:</span>
            <span class="value">${voter.partNameEng}</span>
          </div>
          <div class="detail-row">
            <span class="label">Status:</span>
            <span class="value">${voter.status}</span>
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
    const message = `Name: ${fullName} | EPIC_NO: ${voter.voterId} | Gender: ${voter.gender} | Serial Number: ${voter.serialNumber} | PART_NAME: ${voter.partName} | PART_NAME_ENG: ${voter.partNameEng}`;

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
              <span className="font-semibold">Name:</span> {[voter.firstName, voter.middleName, voter.lastName].filter(Boolean).join(' ')}
            </p>
            <p className="text-gray-900">
              <span className="font-semibold">EPIC_NO:</span> {voter.voterId}
            </p>
            <p className="text-gray-900">
              <span className="font-semibold">Gender:</span> {voter.gender}
            </p>
            <p className="text-gray-900">
              <span className="font-semibold">Serial Number:</span> {voter.serialNumber}
            </p>
            <p className="text-gray-900">
              <span className="font-semibold">PART_NAME:</span> {voter.partName}
            </p>
            <p className="text-gray-900">
              <span className="font-semibold">PART_NAME_ENG:</span> {voter.partNameEng}
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
