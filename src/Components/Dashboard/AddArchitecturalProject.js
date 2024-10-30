import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify'; // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css';

const AddArchitecturalProject = ({ isActive, onClick }) => {
  const [formData, setFormData] = useState({
    title: '',
    clientName: '',
    projectType: '',
    siteAddress: '',
    gstNo: '',
    mahareraNo: '',
    projectHead: '',
    rccDesignerName: '',
    pan: '',
    aadhar: '',
    pin: '',
    email: '',
    Presentation_Drawing_1: null,
    Presentation_Drawing_2: null,
    Presentation_Drawing_3: null,
    File_Model_3D_1: null,
    File_Model_3D_2: null,
    File_Model_3D_3: null,
    Submission_Drawing: null,
    All_Floor_Plan: null,
    All_Section: null,
    All_Elevation: null,
    toilet: null,
    All_Electric_Drawing: null,
    tile_Layout: null,
    All_Grills_And_Railing: null,
    Column_Footing: null,
    Pleanth_Beam: null,
    Stair_Case_Drawing: null,
    Slab_1: null,
    Slab_2: null,
    Slab_3: null,
    Slab_4: null,
    Slab_5: null,
    Property_Card: null,
    Property_Map: null,
    Completion_Drawing: null,
    SanctionDrawing: null,
    Revise_Sanction: null,
    Completion_Letter: null
  });

  const [imagePreviews, setImagePreviews] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files[0]
    }));

    if (files[0]) {
      const fileURL = URL.createObjectURL(files[0]);
      setImagePreviews((prevPreviews) => ({
        ...prevPreviews,
        [name]: fileURL
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formBody = new FormData();
      Object.keys(formData).forEach(key => {
        formBody.append(key, formData[key]);
      });

      const response = await fetch('https://projectassociate-1.onrender.com/api/architecture/upload', {
        method: 'POST',
        body: formBody
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Success:', data);
      toast.success('Architectural project added successfully!'); // Display success message

      // Reset the form
      setFormData({
        title: '',
        clientName: '',
        projectType: '',
        siteAddress: '',
        gstNo: '',
        mahareraNo: '',
        projectHead: '',
        rccDesignerName: '',
        pan: '',
        aadhar: '',
        pin: '',
        email: '',
        Presentation_Drawing_1: null,
        Presentation_Drawing_2: null,
        Presentation_Drawing_3: null,
        File_Model_3D_1: null,
        File_Model_3D_2: null,
        File_Model_3D_3: null,
        Submission_Drawing: null,
        All_Floor_Plan: null,
        All_Section: null,
        All_Elevation: null,
        toilet: null,
        All_Electric_Drawing: null,
        tile_Layout: null,
        All_Grills_And_Railing: null,
        Column_Footing: null,
        Pleanth_Beam: null,
        Stair_Case_Drawing: null,
        Slab_1: null,
        Slab_2: null,
        Slab_3: null,
        Slab_4: null,
        Slab_5: null,
        Property_Card: null,
        Property_Map: null,
        Completion_Drawing: null,
        SanctionDrawing: null,
        Revise_Sanction: null,
        Completion_Letter: null
      });
      setImagePreviews({});
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to add project. Please try again.'); // Display error message
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
      {imagePreviews[name] && (
        <img src={imagePreviews[name]} alt={label} className="mt-2 h-32 object-cover rounded-md" />
      )}
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
      <div className="p-4">
        <button
          type="button"
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
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: 'Title', name: 'title' },
            { label: 'Client Name', name: 'clientName' },
            { label: 'Project Type', name: 'projectType' },
            { label: 'Site Address', name: 'siteAddress' },
            { label: 'GST No', name: 'gstNo' },
            { label: 'Maharera No', name: 'mahareraNo' },
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
        <FileUploadSection
          title="Presentation"
          fields={[
            { label: 'Presentation Drawing 1', name: 'Presentation_Drawing_1' },
            { label: 'Presentation Drawing 2', name: 'Presentation_Drawing_2' },
            { label: 'Presentation Drawing 3', name: 'Presentation_Drawing_3' }
          ]}
        />
        <FileUploadSection
          title="3D Model"
          fields={[
            { label: 'File Model 3D 1', name: 'File_Model_3D_1' },
            { label: 'File Model 3D 2', name: 'File_Model_3D_2' },
            { label: 'File Model 3D 3', name: 'File_Model_3D_3' }
          ]}
        />
        <FileUploadSection
          title="Working Drawing"
          fields={[
            { label: 'Submission Drawing', name: 'Submission_Drawing' },
            { label: 'All Floor Plan', name: 'All_Floor_Plan' },
            { label: 'All Section', name: 'All_Section' },
            { label: 'All Elevation', name: 'All_Elevation' },
            { label: 'Toilet', name: 'toilet' },
            { label: 'All Electric Drawing', name: 'All_Electric_Drawing' },
            { label: 'Tile Layout', name: 'tile_Layout' },
            { label: 'All Grills And Railing', name: 'All_Grills_And_Railing' },
            { label: 'Column Footing', name: 'Column_Footing' },
            { label: 'Pleanth Beam', name: 'Pleanth_Beam' },
            { label: 'Stair Case Drawing', name: 'Stair_Case_Drawing' },
            { label: 'Slab 1', name: 'Slab_1' },
            { label: 'Slab 2', name: 'Slab_2' },
            { label: 'Slab 3', name: 'Slab_3' },
            { label: 'Slab 4', name: 'Slab_4' },
            { label: 'Slab 5', name: 'Slab_5' },
            { label: 'Property Card', name: 'Property_Card' },
            { label: 'Property Map', name: 'Property_Map' },
            { label: 'Completion Drawing', name: 'Completion_Drawing' },
            { label: 'Sanction Drawing', name: 'SanctionDrawing' },
            { label: 'Revise Sanction', name: 'Revise_Sanction' },
            { label: 'Completion Letter', name: 'Completion_Letter' }
          ]}
        />
      </div>
      <div className="p-4">
        <button
          type="submit"
          className="w-full py-3 px-4 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
        >
          Submit
        </button>
      </div>
      <ToastContainer /> {/* Add ToastContainer here */}
    </form>
  );
};

export default AddArchitecturalProject;
