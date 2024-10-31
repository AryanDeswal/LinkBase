import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
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

  const [filePreviews, setFilePreviews] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false); // Track submission state

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const { name } = e.target;

    setFormData(prevState => ({
      ...prevState,
      [name]: file
    }));

    if (file) {
      if (file.type.startsWith('image/')) {
        // For images, create an object URL for preview
        setFilePreviews(prevPreviews => ({
          ...prevPreviews,
          [name]: URL.createObjectURL(file)
        }));
      } else if (file.type === 'application/pdf') {
        // For PDFs, show a placeholder icon or text
        setFilePreviews(prevPreviews => ({
          ...prevPreviews,
          [name]: 'PDF Preview Available'
        }));
      } else {
        // For other file types, you can add placeholder text or icons
        setFilePreviews(prevPreviews => ({
          ...prevPreviews,
          [name]: 'File uploaded'
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Disable the button when submitting

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const response = await fetch('https://projectassociate-1.onrender.com/api/architecture/upload', {
        method: 'POST',
        body: formDataToSend
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      toast.success('Architectcur project added successfully!');
      // Optionally reset the form here if needed
    } catch (error) {
      toast.error('Error submitting form: ' + error.message);
    } finally {
      setIsSubmitting(false); // Re-enable the button after submission
    }
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
        accept="*/*" // Accept any file type
        className="w-full p-2 border border-gray-300 rounded"
      />
      {filePreviews[name] && (
        <div className="mt-2">
          {filePreviews[name].startsWith('blob') ? (
            <img src={filePreviews[name]} alt={label} className="max-w-full h-auto" />
          ) : (
            <span className="text-sm text-gray-500">{filePreviews[name]}</span>
          )}
        </div>
      )}
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
      <ToastContainer />
      <button
        className={`w-full text-left p-2 text-center mb-4 rounded ${
          isActive ? 'bg-blue-600 text-white' : 'bg-gray-100'
        }`}
        onClick={onClick}
      >
        Add Architectural Project
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
          {renderFormInput('PAN', 'Pan', 'PAN')}
          {renderFormInput('Aadhar', 'Aadhar', 'Aadhar')}
          {renderFormInput('Pin', 'Pin', 'Pin')}
          {renderFormInput('Email', 'email', 'Email')}
        </div>

        {renderSection('Presentation Drawing', [
          { label: 'Presentation Drawing 1', name: 'Presentation_Drawing_1' },
          { label: 'Presentation Drawing 2', name: 'Presentation_Drawing_2' },
          { label: 'Presentation Drawing 3', name: 'Presentation_Drawing_3' }
        ])}

        {/* Sections */}
        {renderSection('3D Model', [
          { label: 'File Model  3D 1', name: 'File_Model_3D_1' },
          { label: 'File Model  3D 2', name: 'File_Model_3D_2' },
          { label: 'File Model  3D 3', name: 'File_Model_3D_3' }
        ])}

        {/* Elevations */}
        {renderSection('Working Drawing', [
          { label: 'Submission Drawing', name: 'Submission_Drawing' },
          { label: 'All Floor Plan', name: 'All_Floor_Plan' },
          { label: 'All Section', name: 'All_Section' },
          { label: 'All Elevation', name: 'All_Elevation' },
          { label: 'Toilet', name: 'toilet' },
          { label: 'All Electric Drawing', name: 'All_Electric_Drawing' },
          { label: 'Tile Layout', name: 'tile_Layout' },
          { label: 'All Grills and Railing', name: 'All_Grills_And_Railing' },
          { label: 'Column Footing', name: 'Column_Footing' },
          { label: 'Pleanth Beam', name: 'Pleanth_Beam' },
          { label: 'Stair Case Drawing', name: 'Stair_Case_Drawing' },
        ])}

        {/* Slabs */}
        {renderSection('Slabs', [
          { label: 'Slab 1', name: 'Slab_1' },
          { label: 'Slab 2', name: 'Slab_2' },
          { label: 'Slab 3', name: 'Slab_3' },
          { label: 'Slab 4', name: 'Slab_4' },
          { label: 'Slab 5', name: 'Slab_5' }
        ])}
        
        <button
          type="submit"
          disabled={isSubmitting} // Disable the button when submitting
          className={`w-full py-2 mt-4 text-white rounded hover:bg-blue-700 ${isSubmitting ? 'bg-gray-400' : 'bg-blue-600'}`}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Project'}
        </button>
      </form>
    </div>
  );
};

export default AddArchitecturalProject;
