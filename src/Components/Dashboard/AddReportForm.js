// src/components/AddReportForm.jsx
import React, { useState } from 'react';

const AddReportForm = () => {
  const [reportData, setReportData] = useState({
    reportTitle: '',
    reportDescription: ''
  });

  const handleReportChange = (e) => {
    const { name, value } = e.target;
    setReportData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Add Report</h2>
      <form className="space-y-4">
        <div>
          <label className="block text-gray-700">Report Title</label>
          <input
            type="text"
            name="reportTitle"
            value={reportData.reportTitle}
            onChange={handleReportChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter report title"
          />
        </div>
        <div>
          <label className="block text-gray-700">Report Description</label>
          <textarea
            name="reportDescription"
            value={reportData.reportDescription}
            onChange={handleReportChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter report description"
          ></textarea>
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Submit Report
        </button>
      </form>
    </div>
  );
};

export default AddReportForm;