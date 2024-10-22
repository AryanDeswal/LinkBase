import React, { useState } from 'react';

const AddInteriorProject = ({ isActive, onClick }) => {
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
    email: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    // Handle file uploads here
    console.log(`File selected for ${e.target.name}:`, e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission
    console.log('Form data submitted:', formData);
    // You can also send this data to your API here
  };

  const renderFormInput = (label, name, placeholder) => (
    <div className="col-span-1">
      <label className="block mb-1 text-sm font-medium text-gray-700">{label}</label>
      <input
        type="text"
        name={name}
        value={formData[name]}
        onChange={handleInputChange}
        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
        placeholder={placeholder}
      />
    </div>
  );

  const renderFileInput = (label, name) => (
    <div className="col-span-1">
      <label className="block mb-1 text-sm font-medium text-gray-700">{label}</label>
      <input
        type="file"
        name={name}
        onChange={handleFileChange}
        accept="image/*"
        className="w-full p-2 border border-gray-300 rounded"
      />
    </div>
  );

  const renderSection = (title, fields) => (
    <>
      <h2 className="text-center pt-5 pb-4 font-bold uppercase">{title}</h2>
      <div className="grid grid-cols-3 gap-4">
        {fields.map((field, index) => renderFileInput(field.label, field.name))}
      </div>
    </>
  );

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow">
      <button
        className={`w-full text-left p-2 text-center mb-4 rounded ${
          isActive ? 'bg-blue-600 text-white' : 'bg-gray-100'
        }`}
        onClick={onClick}
      >
        Add Interior Project
      </button>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Basic Information */}
        <div className="grid grid-cols-2 gap-4">
          {renderFormInput('Title', 'title', 'Project Title')}
          {renderFormInput('Client Name', 'clientName', 'Client Name')}
          {renderFormInput('Project Type', 'projectType', 'Project Type')}
          {renderFormInput('Site Address', 'siteAddress', 'Site Address')}
          {renderFormInput('GST No', 'gstNo', 'GST No')}
          {renderFormInput('Mahera No', 'maheraNo', 'Mahera No')}
          {renderFormInput('Project Head', 'projectHead', 'Project Head')}
          {renderFormInput('RCC Designer Name', 'rccDesignerName', 'RCC Designer Name')}
          {renderFormInput('PAN', 'pan', 'PAN')}
          {renderFormInput('Aadhar', 'aadhar', 'Aadhar')}
          {renderFormInput('Pin', 'pin', 'Pin')}
          {renderFormInput('Email', 'email', 'Email')}
        </div>

        {/* Floor Plans */}
        {renderSection('Presentation Drawing', [
          { label: 'Floor Plan 1', name: 'floorPlan1' },
          { label: 'Floor Plan 2', name: 'floorPlan2' },
          { label: 'Floor Plan 3', name: 'floorPlan3' },
          { label: 'Floor Plan 4', name: 'floorPlan4' }
        ])}

        {/* Sections */}
        {renderSection('Section', [
          { label: 'Section 1', name: 'section1' },
          { label: 'Section 2', name: 'section2' },
          { label: 'Section 3', name: 'section3' },
          { label: 'Section 4', name: 'section4' },
          { label: 'All Section', name: 'allSection' }
        ])}

        {/* Elevations */}
        {renderSection('Elevations', [
          { label: 'Elevation 1', name: 'elevation1' },
          { label: 'Elevation 2', name: 'elevation2' },
          { label: 'Elevation 3', name: 'elevation3' },
          { label: 'Elevation 4', name: 'elevation4' },
          { label: 'All Elevation', name: 'allElevation' }
        ])}

        {/* 3D Models */}
        {renderSection('3D Model', [
          { label: 'ThreeD Model1', name: 'threeDModel1' },
          { label: 'ThreeD Model2', name: 'threeDModel2' },
          { label: 'ThreeD Model3', name: 'threeDModel3' }
        ])}

        {/* Working Drawings */}
        {renderSection('Detail Working Drawings', [
          { label: 'Electric Layout 1', name: 'electricLayout1' },
          { label: 'Electric Layout 2', name: 'electricLayout2' },
          { label: 'Electric Layout 3', name: 'electricLayout3' },
          { label: 'Ceiling Layout 1', name: 'ceilingLayout1' },
          { label: 'Ceiling Layout 2', name: 'ceilingLayout2' },
          { label: 'Ceiling Layout 3', name: 'ceilingLayout3' },
          { label: 'Ceiling Layout 4', name: 'ceilingLayout4' },
          { label: 'Plumbing Detail 1', name: 'plumbingDetail1' },
          { label: 'Plumbing Detail 2', name: 'plumbingDetail2' },
          { label: 'Flooring Details 1', name: 'flooringDetails1' },
          { label: 'Flooring Details 2', name: 'flooringDetails2' },
          { label: 'Flooring Details 3', name: 'flooringDetails3' },
          { label: 'Flooring Details 4', name: 'flooringDetails4' },
          { label: 'Flooring Details 5', name: 'flooringDetails5' }
        ])}

        {/* Selection Details */}
        {renderSection('Selection Details', [
          { label: 'Laminator Venner 1', name: 'laminatorVenner1' },
          { label: 'Laminator Venner 2', name: 'laminatorVenner2' },
          { label: 'Handles Hardware 1', name: 'handlesHardware1' },
          { label: 'Handles Hardware 2', name: 'handlesHardware2' },
          { label: 'Curtain 1', name: 'curtain1' },
          { label: 'Curtain 2', name: 'curtain2' },
          { label: 'Flooring Detail 2', name: 'flooringDetail2' },
          { label: 'Flooring Details 2', name: 'flooringDetails2' },
          { label: 'Flooring Details 3', name: 'flooringDetails3' },
          { label: 'Plumbing Details 1', name: 'plumbingDetails1' },
          { label: 'Plumbing Details 2', name: 'plumbingDetails2' },
          { label: 'Plumbing Details 3', name: 'plumbingDetails3' }
        ])}

        <div className="flex justify-end pt-6">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit Project
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddInteriorProject;
