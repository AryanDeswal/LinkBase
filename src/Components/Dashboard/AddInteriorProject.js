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
    Floor_Plan: [],
    Section: [],
    Elevation: [],
    ThreeD_Model: [],
    Detail_Working: [],
    Flooring: [],
    Furniture: [],
    Presentation: [],
    Ceiling: [],
    Electrical: [],
    Plumbing: [],
    Estimate: [],
    Onsite: [],
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const widgetRef = useRef(null);

  // Initialize Cloudinary widget
  useEffect(() => {
    widgetRef.current = window.cloudinary.createUploadWidget(
      {
        cloudName: "dmjxco87a", // Replace with your Cloudinary cloud name
        uploadPreset: "Architecture", // Replace with your Cloudinary upload preset
        multiple: false,
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          const uploadedUrl = result.info.secure_url;
          const sectionName = widgetRef.current.sectionName;

          if (sectionName) {
            setFormData((prevState) => ({
              ...prevState,
              [sectionName]: [...prevState[sectionName], uploadedUrl],
            }));
          }
          toast.success("File uploaded successfully!");
        }
      }
    );
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let newErrors = { ...errors };

    if (name === "email") {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(value)) {
        newErrors.email = "Invalid email format";
      } else {
        delete newErrors.email;
      }
    }

    if (name === "Pin" && !/^\d{6}$/.test(value)) {
      newErrors.Pin = "Pin must be exactly 6 digits.";
    } else {
      delete newErrors.Pin;
    }

    setErrors(newErrors);
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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

    const formDataToSend = new FormData();
    for (const key in formData) {
      if (Array.isArray(formData[key])) {
        formData[key].forEach((file, index) => {
          if (file) {
            formDataToSend.append(`${key}[${index}]`, file);
          }
        });
      } else {
        formDataToSend.append(key, formData[key]);
      }
    }

    try {
      // const response = await fetch(
      //   "http:localhost:8000/api/interior/interiors",
      //   {
      //     method: "POST",
      //     body: formDataToSend,
      //   }
      // );
      const response = await axios.post("http://localhost:8000/api/interior/interiors",formData)

      console.log("Form data submitted:", response);
      toast.success("Interior project added successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error submitting form: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const renderFormInput = (label, name, placeholder) => (
    <div className="col-span-1">
      <label className="block mb-1 text-sm font-medium text-gray-700">
        {label}
      </label>
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

  const renderFileInputs = (sectionName, label) => (
    <div>
      <h3 className="font-bold mb-2">{label}</h3>
      <button
        type="button"
        onClick={() => openCloudinaryWidget(sectionName)}
        className="text-blue-500 text-sm"
      >
        + Upload {label}
      </button>
      <ul>
        {formData[sectionName].map((fileUrl, index) => (
          <li key={index} className="mt-2 text-sm text-gray-600">
            <a href={fileUrl} target="_blank" rel="noopener noreferrer">
              {fileUrl}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow">
      <ToastContainer />
      <button
        className={`w-full p-2 text-center mb-4 rounded ${
          isActive ? "bg-blue-600 text-white" : "bg-gray-100"
        }`}
        onClick={onClick}
      >
        Add Interior Project
      </button>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          {renderFormInput("Title", "title", "Project Title")}
          {renderFormInput("Client Name", "clientName", "Client Name")}
          {renderFormInput("Site Address", "siteAddress", "Site Address")}
          {renderFormInput("GST No", "gstNo", "GST No")}
          {renderFormInput("Project Head", "projectHead", "Project Head")}
          {renderFormInput("RCC Designer Name", "rccDesignerName", "RCC Designer Name")}
          {renderFormInput("PAN", "PAN", "PAN")}
          {renderFormInput("Aadhar", "Aadhar", "Enter 12-digit Aadhar")}
          {renderFormInput("Pin", "Pin", "Enter 6-digit Pin")}
          {renderFormInput("Email", "email", "Enter your email")}
        </div>

        {renderFileInputs("Floor_Plan", "Floor Plan")}
        {renderFileInputs("Section", "Section")}
        {renderFileInputs("Elevation", "Elevation")}
        {renderFileInputs("ThreeD_Model", "ThreeD Model")}
        {renderFileInputs("Detail_Working", "Detail Working")}
        {renderFileInputs("Flooring", "Flooring")}
        {renderFileInputs("Furniture", "Furniture")}
        {renderFileInputs("Presentation", "Presentation")}
        {renderFileInputs("Ceiling", "Ceiling")}
        {renderFileInputs("Electrical", "Electrical")}
        {renderFileInputs("Plumbing", "Plumbing")}
        {renderFileInputs("Estimate", "Estimate")}
        {renderFileInputs("Onsite", "Onsite")}

        <button
          type="submit"
          className={`w-full p-2 bg-blue-600 text-white rounded ${
            loading ? "opacity-50 cursor-not-allowed" : ""
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
