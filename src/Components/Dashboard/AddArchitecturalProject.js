import React from 'react';

const AddArchitecturalProject = ({ isActive, onClick }) => {
  const SectionTitle = ({ children }) => (
    <h2 className="text-xl font-bold text-center py-6 uppercase text-gray-800">
      {children}
    </h2>
  );

  const FormField = ({ label, type = "text", accept, placeholder }) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        accept={accept}
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  );

  const FileUploadSection = ({ title, fields }) => (
    <div className="mt-6">
      <SectionTitle>{title}</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {fields.map((field, index) => (
          <FormField
            key={index}
            label={field}
            type="file"
            accept="image/*"
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-7xl mx-auto bg-white rounded-lg shadow-lg">
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
            'Title', 'Client Name', 'Project Type', 'Site Address',
            'GST No', 'Mahera No', 'Project Head', 'RCC Designer Name',
            'PAN', 'Aadhar', 'Pin', 'Email'
          ].map((label, index) => (
            <FormField 
              key={index} 
              label={label} 
              placeholder={`Enter ${label}`} 
            />
          ))}
        </div>

        {/* Presentation Section */}
        <FileUploadSection
          title="Presentation"
          fields={[
            'Presentation Drawing 1',
            'Presentation Drawing 2',
            'Presentation Drawing 3'
          ]}
        />

        {/* 3D Model Section */}
        <FileUploadSection
          title="3D Model"
          fields={[
            'File Model 3D 1',
            'File Model 3D 2',
            'File Model 3D 3'
          ]}
        />

        {/* Working Drawing Section */}
        <FileUploadSection
          title="Working Drawing"
          fields={[
            'Submission Drawing',
            'All Floor Plan',
            'All Section',
            'All Elevation',
            'Toilet',
            'All Electric Drawing',
            'Title Layout',
            'All Grills And Railing',
            'Column Footing',
            'Plinth Beam',
            'Staircase Drawing'
          ]}
        />

        {/* Structure Drawing Section */}
        <div className="mt-6">
          <SectionTitle>Structure Drawing</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Slab Inputs */}
            {[1, 2, 3, 4, 5].map((num) => (
              <FormField
                key={`slab-${num}`}
                label={`Slab ${num}`}
                type="file"
                accept="image/*"
              />
            ))}
            
            {/* Date Fields */}
            <FormField
              label="Building Approval Date"
              type="date"
            />
            <FormField
              label="Building Completion Date"
              type="date"
            />
            
            {/* Additional Documents */}
            {[
              'Property Card',
              'Property Map',
              'Completion Drawing',
              'Sanction Drawing',
              'Revise Sanction',
              'Completion Letter'
            ].map((label, index) => (
              <FormField
                key={`doc-${index}`}
                label={label}
                type="file"
                accept="image/*"
              />
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end mt-8">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Submit Project
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddArchitecturalProject;