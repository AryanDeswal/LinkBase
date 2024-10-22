import React, { useState } from 'react';

const AddArchitecturalProject = ({ isActive, onClick }) => {
  // Form State
  const [formData, setFormData] = useState({
    title: '',
    clientName: '',
    projectType: '',
    siteAddress: '',
    gstNo: '',
    maheraNo: '',
    projectHead: '',
    rccDesignerName: '',
    pan: '',
    aadhar: '',
    pin: '',
    email: '',
    // Add additional fields for other inputs
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0] // store file object
    });
  };

  // Sample handleSubmit function for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Make a POST request to the API
    try {
      const response = await fetch('http://localhost:3001/account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      console.log('Success:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const FormField = ({ label, name, type = 'text', accept, placeholder }) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        name={name}
        accept={accept}
        value={type === 'file' ? undefined : formData[name]}
        placeholder={placeholder}
        onChange={type === 'file' ? handleFileChange : handleInputChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  );

  const FileUploadSection = ({ title, fields }) => (
    <div className="mt-6">
      <h2 className="text-xl font-bold text-center py-6 uppercase text-gray-800">
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {fields.map((field, index) => (
          <FormField
            key={index}
            label={field.label}
            name={field.name}
            type="file"
            accept="image/*"
          />
        ))}
      </div>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-7xl mx-auto bg-white rounded-lg shadow-lg">
      {/* Header */}
      <div className="p-4">
        <button
          className={`w-full py-3 px-4 rounded-md transition-colors ${
            isActive 
              ? 'bg-blue-600 text-white hover:bg-blue-700' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          onClick={onClick}
        >
          Add Architectural Project
        </button>
      </div>

      {/* Form Content */}
      <div className="p-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: 'Title', name: 'title' },
            { label: 'Client Name', name: 'clientName' },
            { label: 'Project Type', name: 'projectType' },
            { label: 'Site Address', name: 'siteAddress' },
            { label: 'GST No', name: 'gstNo' },
            { label: 'Mahera No', name: 'maheraNo' },
            { label: 'Project Head', name: 'projectHead' },
            { label: 'RCC Designer Name', name: 'rccDesignerName' },
            { label: 'PAN', name: 'pan' },
            { label: 'Aadhar', name: 'aadhar' },
            { label: 'Pin', name: 'pin' },
            { label: 'Email', name: 'email' }
          ].map((field, index) => (
            <FormField 
              key={index} 
              label={field.label} 
              name={field.name}
              placeholder={`Enter ${field.label}`} 
            />
          ))}
        </div>

        {/* Presentation Section */}
        <FileUploadSection
          title="Presentation"
          fields={[
            { label: 'Presentation Drawing 1', name: 'presentationDrawing1' },
            { label: 'Presentation Drawing 2', name: 'presentationDrawing2' },
            { label: 'Presentation Drawing 3', name: 'presentationDrawing3' }
          ]}
        />

        {/* 3D Model Section */}
        <FileUploadSection
          title="3D Model"
          fields={[
            { label: 'File Model 3D 1', name: 'fileModel3D1' },
            { label: 'File Model 3D 2', name: 'fileModel3D2' },
            { label: 'File Model 3D 3', name: 'fileModel3D3' }
          ]}
        />

        {/* Working Drawing Section */}
        <FileUploadSection
          title="Working Drawing"
          fields={[
            { label: 'Submission Drawing', name: 'submissionDrawing' },
            { label: 'All Floor Plan', name: 'allFloorPlan' },
            // Add more fields as needed
          ]}
        />

        {/* Submit Button */}
        <div className="flex justify-end mt-8">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Submit Project
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddArchitecturalProject;
