import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    PAN: '',
    Aadhar: '',
    Pin: '',
    email: '',
    Floor_Plan_1: '',
    Floor_Plan_2: '',
    Floor_Plan_3: '',
    Floor_Plan_4: '',
    Section_1: '',
    Section_2: '',
    Section_3: '',
    Section_4: '',
    All_Section: '',
    Elevation_1: '',
    Elevation_2: '',
    Elevation_3: '',
    Elevation_4: '',
    All_Elevation: '',
    ThreeD_Model_1: '',
    ThreeD_Model_2: '',
    ThreeD_Model_3: '',
    Detail_Working_Layout_1: '',
    Electrical_Layout_1: '',
    Electrical_Layout_2: '',
    Electrical_Layout_3: '',
    Celling_Layout_1: '',
    Celling_Layout_2: '',
    Flooring_Details_1: '',
    Flooring_Details_2: '',
    PlumbingDetails_1: '',
    PlumbingDetails_2: '',
    Furniture_Details_1: '',
    Furniture_Details_2: '',
    Furniture_Details_3: '',
    Furniture_Details_4: '',
    Furniture_Details_5: '',
    Laminator_Venner_1: '',
    Laminator_Venner_2: '',
    Handles_Hardware_1: '',
    Handles_Hardware_2: '',
    Curtains_1: '',
    Curtains_2: ''
  });

  const [loading, setLoading] = useState(false);
  const [filePreviews, setFilePreviews] = useState({});
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let newErrors = { ...errors };

    if (name === 'email') {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(value)) {
        newErrors.email = 'Invalid email format';
      } else {
        delete newErrors.email;
      }
    }

    if (name === 'PAN' && !/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(value)) {
      newErrors.PAN = 'PAN must be 10 characters (5 letters, 4 digits, 1 letter).';
    } else if (name === 'Aadhar' && !/^\d{12}$/.test(value)) {
      newErrors.Aadhar = 'Aadhar must be exactly 12 digits.';
    } else if (name === 'Pin' && !/^\d{6}$/.test(value)) {
      newErrors.Pin = 'Pin must be exactly 6 digits.';
    } else {
      delete newErrors[name];
    }
    
    setErrors(newErrors);
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];

    const reader = new FileReader();
    reader.onload = () => {
      setFilePreviews(prevState => ({
        ...prevState,
        [name]: reader.result
      }));
    };
    reader.readAsDataURL(file);

    setFormData(prevState => ({
      ...prevState,
      [name]: file
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (Object.keys(errors).length > 0) {
      toast.error('Please fix the errors before submitting.');
      setLoading(false);
      return;
    }

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const response = await fetch('https://projectassociate-1.onrender.com/api/interior/interiors', {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Form data submitted:', data);
      toast.success('Interior project added successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Error submitting form: ' + error.message);
    } finally {
      setLoading(false);
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
      {errors[name] && <p className="text-red-600 text-sm">{errors[name]}</p>}
    </div>
  );

  const renderFileInput = (label, name) => (
    <div className="col-span-1">
      <label className="block mb-1 text-sm font-medium text-gray-700">{label}</label>
      <input
        type="file"
        name={name}
        onChange={handleFileChange}
        className="w-full p-2 border border-gray-300 rounded"
      />
      {filePreviews[name] && (
        <img src={filePreviews[name]} alt={`${name} preview`} className="mt-2 w-full h-auto border" />
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
        Add Interior Project
      </button>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          {renderFormInput('Title', 'title', 'Project Title')}
          {renderFormInput('Client Name', 'clientName', 'Client Name')}
          {renderFormInput('Project Type', 'projectType', 'Project Type')}
          {renderFormInput('Site Address', 'siteAddress', 'Site Address')}
          {renderFormInput('GST No', 'gstNo', 'GST No')}
          {renderFormInput('Mahera No', 'maheraNo', 'Mahera No')}
          {renderFormInput('Project Head', 'projectHead', 'Project Head')}
          {renderFormInput('RCC Designer Name', 'rccDesignerName', 'RCC Designer Name')}
          {renderFormInput('PAN', 'PAN', 'PAN')}
          {renderFormInput('Aadhar', 'Aadhar', 'Enter 12-digit Aadhar')}
          {renderFormInput('Pin', 'Pin', 'Enter 6-digit Pin')}
          {renderFormInput('Email', 'email', 'Enter your email')}
        </div>

        {renderSection('Presentation Drawing', [
          { label: 'Floor Plan 1', name: 'Floor_Plan_1' },
          { label: 'Floor Plan 2', name: 'Floor_Plan_2' },
          { label: 'Floor Plan 3', name: 'Floor_Plan_3' },
          { label: 'Floor Plan 4', name: 'Floor_Plan_4' }
        ])}

        <button
          type="submit"
          className={`w-full p-2 bg-blue-600 text-white rounded ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default AddInteriorProject;
