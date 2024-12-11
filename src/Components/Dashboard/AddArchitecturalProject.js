import React, { useState, useRef, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

// Constants
const CLOUDINARY_CONFIG = {
  cloudName: "dmjxco87a",
  uploadPreset: "Architecture",
  multiple: false,
};

const INITIAL_FORM_STATE = {
  title: "",
  clientName: "",
  projectType: "",
  siteAddress: "",
  gstNo: "",
  mahareraNo: "",
  projectHead: "",
  rccDesignerName: "",
  pan: "",
  aadhar: "",
  pin: "",
  email: "",
  documentSections: {
    Presentation_Drawing: [],
    File_Model_3D: [],
    Drawings: [],
    Submission_Drawing: [],
    All_Floor:[],
    All_Section:[],
    All_Elevation:[],
    Working_Drawings: [],
    All_Floor: [],
    All_Section: [],
    All_Elevation: [],
    Toilet_Layout: [],
    AllElectric_Drawing: [],
    Tile_Layout: [],
    AllGrills_Railing: [],
    Pleasant_Beam: [],
    StairCase_Drawing: [],
    Slab: [],
    Column_footing: [],
    Property_Card: [],
    Completion_Drawing: [],
    Estimate:[],
    Bill:[],
    Sanction_Drawing: [],
    Revise_Sanction: [],
    Completion_Letter: [],
    Site_Photo: [],
  }
};

const FORM_FIELDS = [
  { label: "Title", name: "title", placeholder: "Architecture Title" },
  { label: "Client Name", name: "clientName", placeholder: "Client Name" },
  { label: "Project Type", name: "projectType", placeholder: "Project Type" },
  { label: "Site Address", name: "siteAddress", placeholder: "Site Address" },
  { label: "GST No", name: "gstNo", placeholder: "GST No" },
  { label: "Maharera No", name: "mahareraNo", placeholder: "Maharera No" },
  { label: "Project Head", name: "projectHead", placeholder: "Project Head" },
  { label: "RCC Designer Name", name: "rccDesignerName", placeholder: "RCC Designer Name" },
  { label: "PAN", name: "pan", placeholder: "PAN" },
  { label: "Aadhar", name: "aadhar", placeholder: "Aadhar" },
  { label: "Pin", name: "pin", placeholder: "Pin" },
  { label: "Email", name: "email", placeholder: "Email" },
];

const FILE_SECTIONS = [
  { name: "Presentation_Drawing", label: "Presentation Drawing" },
  { name: "File_Model_3D", label: "3D Model Files" },
  { name: "Drawings", label: "Drawings" },
  { name: "Submission_Drawing", label: "Submission Drawing" },
  { name: "Working_Drawings", label: "Working Drawing" },
  { name: "All_Floor", label: "Floor Plans" },
  { name: "All_Section", label: "Sections" },
  { name: "All_Elevation", label: "Elevations" },
  { name: "Toilet_Layout", label: "Toilet Layout" },
  { name: "AllElectric_Drawing", label: "All Electric Drawing" },
  { name: "Tile_Layout", label: "Tile Layout" },
  { name: "AllGrills_Railing", label: "All Grills Railing" },
  { name: "Pleasant_Beam", label: "Pleasant Beam" },
  { name: "StairCase_Drawing", label: "StairCase Drawing" },
  { name: "Slab", label: "Slab" },
  { name: "Column_footing", label: "Column Footing" },
  { name: "Property_Card", label: "Property Card" },
  { name: "Completion_Drawing", label: "Completion Drawing" },
  { name: "Sanction_Drawing", label: "Sanction Drawing" },
  { name: "Revise_Sanction", label: "Revise Sanction" },
  { name: "Completion_Letter", label: "Completion Letter" },
  {name:"Estimate",label:"Estimate  Bill"},
  {name:"Bill",label:"Bill"},
  { name: "Site_Photo", label: "Site Photos" },
];

const AddArchitecturalProject = () => {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const widgetRef = useRef();

  // Cloudinary Widget Setup
  useEffect(() => {
    widgetRef.current = window.cloudinary.createUploadWidget(
      CLOUDINARY_CONFIG,
      handleCloudinaryUpload
    );
  }, []);

  const handleCloudinaryUpload = (error, result) => {
    if (!error && result && result.event === "success") {
      const uploadedUrl = result.info.secure_url;
      const sectionName = widgetRef.current.sectionName;

      if (sectionName) {
        setFormData((prevState) => ({
          ...prevState,
          documentSections: {
            ...prevState.documentSections,
            [sectionName]: [...prevState.documentSections[sectionName], uploadedUrl],
          }
        }));
        toast.success("File uploaded successfully!");
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Combine main form data with document sections
    const submitData = {
      ...formData,
      ...formData.documentSections
    };

    try {
      const response = await axios.post(
        'https://projectassoicate.onrender.com/api/architecture/upload',
        submitData
      );

      if (response.error) {
        throw new Error("Failed to add architectural project");
      }

      toast.success("Architectural project added successfully!");
      setFormData(INITIAL_FORM_STATE);
    } catch (error) {
      toast.error(`Error submitting form: ${error.message}`);
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const openCloudinaryWidget = (sectionName) => {
    widgetRef.current.sectionName = sectionName;
    widgetRef.current.open();
  };

  // UI Components
  const FormField = ({ label, name, placeholder }) => (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type="text"
        name={name}
        placeholder={placeholder}
        value={formData[name]}
        onChange={handleInputChange}
        className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );

  const FileUploadSection = ({ name, label }) => (
    <div className="space-y-2 p-4 bg-gray-50 rounded-lg">
      <h3 className="font-medium text-gray-900">{label}</h3>
      <button
        type="button"
        onClick={() => openCloudinaryWidget(name)}
        className="inline-flex items-center px-3 py-1.5 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50 transition-colors"
      >
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Upload {label}
      </button>
      {formData.documentSections[name].length > 0 && (
        <ul className="mt-2 space-y-1">
          {formData.documentSections[name].map((fileUrl, index) => (
            <li key={index} className="text-sm text-gray-600">
              <a 
                href={fileUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-blue-500 hover:underline"
              >
                File {index + 1}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-6">
      <ToastContainer />
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-blue-600 p-4 text-white text-center text-lg font-medium">
          Add Architecture Project
        </div>
        
        <form className="p-6 space-y-8" onSubmit={handleSubmit}>
          {/* Text Input Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FORM_FIELDS.map((field) => (
              <FormField key={field.name} {...field} />
            ))}
          </div>

          {/* File Upload Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {FILE_SECTIONS.map((section) => (
              <FileUploadSection key={section.name} {...section} />
            ))}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`
                px-6 py-2 rounded-md text-white font-medium
                ${isSubmitting 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                }
              `}
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Submitting...
                </span>
              ) : (
                'Submit Project'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddArchitecturalProject;