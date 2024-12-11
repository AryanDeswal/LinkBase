import React, { useState, useRef, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const AddInteriorProject = ({ isActive, onClick }) => {
  const [formData, setFormData] = useState({
    title: "",
    clientName: "",
    siteAddress: "",
    gstNo: "",
    projectHead: "",
    rccDesignerName: "",
    PAN: "",
    Aadhar: "",
    Pin: "",
    email: "",
    documentSections: {
      Floor_Plan: [],
      Section: [],
      All_Elevation: [],
      Elevation: [],
      ThreeD_Model: [],
      Detail_Working: [],
      Flooring: [],
      Furniture: [],
      Presentation: [],
      Ceiling: [],
      Electrical: [],
      Plumbing: [],
      Laminator_Venner: [],
      Handles_Hardware: [],
      Estimate: [],
      Curtains: [],
      Onsite: [],
    },
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const widgetRef = useRef(null);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePin = (pin) => /^\d{6}$/.test(pin);

  useEffect(() => {
    widgetRef.current = window.cloudinary.createUploadWidget(
      {
        cloudName: "dmjxco87a",
        uploadPreset: "Architecture",
        multiple: false,
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          const uploadedUrl = result.info.secure_url;
          const sectionName = widgetRef.current.sectionName;
          if (sectionName) {
            setFormData((prev) => ({
              ...prev,
              documentSections: {
                ...prev.documentSections,
                [sectionName]: [...prev.documentSections[sectionName], uploadedUrl],
              },
            }));
            toast.success("File uploaded successfully!");
          }
        }
      }
    );
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let newErrors = { ...errors };

    if (name === "email" && !validateEmail(value)) {
      newErrors.email = "Invalid email format.";
    } else if (name === "Pin" && !validatePin(value)) {
      newErrors.Pin = "Pin must be exactly 6 digits.";
    } else {
      delete newErrors[name];
    }

    setErrors(newErrors);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const openCloudinaryWidget = (sectionName) => {
    widgetRef.current.sectionName = sectionName;
    widgetRef.current.open();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (Object.keys(errors).length > 0) {
      toast.error("Please fix the errors before submitting.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "https://projectassoicate.onrender.com/api/interior/interiors",
        { ...formData, ...formData.documentSections }
      );
      console.log("Form data submitted:", response);
      toast.success("Interior project added successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error submitting form: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const renderFormInput = (label, name, placeholder, type = "text") => (
    <div className="col-span-1">
      <label className="block mb-2 text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        name={name}
        value={formData[name]}
        onChange={handleInputChange}
        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
        placeholder={placeholder}
      />
      {errors[name] && <p className="text-red-600 text-sm mt-1">{errors[name]}</p>}
    </div>
  );

  const renderFileInputs = (sectionName, label) => (
    <div className="p-4 bg-blue-100 rounded-lg shadow-md">
      <h3 className="font-semibold text-gray-700 mb-2">{label}</h3>
      <button
        type="button"
        onClick={() => openCloudinaryWidget(sectionName)}
        className="text-blue-500 text-sm mb-2 hover:underline"
      >
        + Upload {label}
      </button>
      <ul>
        {formData.documentSections[sectionName].map((fileUrl, index) => (
          <li key={index} className="text-sm text-gray-600 truncate">
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600"
            >
              {fileUrl}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="w-full max-w-6xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      <ToastContainer />
      <button
        className={`w-full p-3 mb-6 rounded-lg transition-all font-semibold text-lg ${
          isActive ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
        }`}
        onClick={onClick}
      >
        Add Interior Project
      </button>
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Project Details */}
        <div className="p-6 bg-gray-50 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-700 mb-4">Project Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderFormInput("Title", "title", "Project Title")}
            {renderFormInput("Client Name", "clientName", "Client Name")}
            {renderFormInput("Site Address", "siteAddress", "Site Address")}
            {renderFormInput("GST No", "gstNo", "GST No")}
            {renderFormInput("Project Head", "projectHead", "Project Head")}
            {renderFormInput("RCC Designer Name", "rccDesignerName", "RCC Designer Name")}
            {renderFormInput("PAN", "PAN", "PAN")}
            {renderFormInput("Aadhar", "Aadhar", "Enter 12-digit Aadhar")}
            {renderFormInput("Pin", "Pin", "Enter 6-digit Pin")}
            {renderFormInput("Email", "email", "Enter your email", "email")}
          </div>
        </div>
        {/* Document Upload Sections */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {Object.keys(formData.documentSections).map((sectionKey) =>
            renderFileInputs(sectionKey, sectionKey.replace(/_/g, " "))
          )}
        </div>
        <button
          type="submit"
          className={`w-full p-3 text-lg font-medium rounded-lg text-white bg-blue-600 ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
          }`}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Project"}
        </button>
      </form>
    </div>
  );
};

export default AddInteriorProject;
