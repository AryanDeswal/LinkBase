import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const AddArchitecturalProject = ({ isActive, onClick }) => {
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
      Presentation_Drawing: [],
      Submission_Drawing: [],
      Floor: [],
      Section: [],
      Elevation: [],
      Toilet_Layout: [],
      Electric_Drawing: [],
      Tile_Layout: [],
      Grills: [],
      Railing: [],
      Column_footing: [],
      Pleanth_Beam: [],
      StairCase_Drawing: [],
      Slab: [],
      Property_Card: [],
      Property_Map: [],
      Completion_Drawing: [],
      Sanction_Drawing: [],
      Revise_Sanction: [],
      Completion_Letter: [],
      Estimate: [],
      Bill: [],
      Site_Photo: [],
    },
  });

  const [loading, setLoading] = useState(false);
  const [uploadingSection, setUploadingSection] = useState(null);
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePin = (pin) => /^\d{6}$/.test(pin);

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

  const uploadFileHandler = async (e, sectionName) => {
    const files = e.target.files;

    if (!files.length) {
      toast.error("Please select files to upload.");
      return;
    }

    if (uploadingSection === sectionName) {
      toast.warning("Already uploading files for this section.");
      return; // Prevent multiple uploads for the same section.
    }

    setUploadingSection(sectionName);

    try {
      const uploadedUrls = await Promise.all(
        Array.from(files).map(async (file) => {
          const formDataToUpload = new FormData();
          formDataToUpload.append("file", file);

          const { data } = await axios.post(
            "http://localhost:8000/api/auth/uploadarchitecture",
            formDataToUpload
          );

          return data.fileUrl;
        })
      );

      setFormData((prev) => ({
        ...prev,
        documentSections: {
          ...prev.documentSections,
          [sectionName]: [
            ...prev.documentSections[sectionName],
            ...uploadedUrls,
          ],
        },
      }));

      toast.success("Files uploaded successfully!");
    } catch (error) {
      console.error("File upload failed:", error);
      toast.error("File upload failed. Please try again.");
    } finally {
      setUploadingSection(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const transformedObject = {
      ...formData,
      ...formData.documentSections,
    };
    delete transformedObject.documentSections;

    setLoading(true);

    if (Object.keys(errors).length > 0) {
      toast.error("Please fix the errors before submitting.");
      setLoading(false);
      return;
    }

    try {
      await axios.post(
        "http://localhost:8000/api/architecture/upload",
        transformedObject
      );
      toast.success("Architecture project added successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error submitting form: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const renderFormInput = (label, name, placeholder, type = "text") => (
    <div className="col-span-1">
      <label className="block mb-2 text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={formData[name]}
        onChange={handleInputChange}
        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
        placeholder={placeholder}
      />
      {errors[name] && (
        <p className="text-red-600 text-sm mt-1">{errors[name]}</p>
      )}
    </div>
  );

  const renderFileInputs = (sectionName, label) => (
    <div className="p-4 bg-blue-100 rounded-lg shadow-md">
      <h3 className="font-semibold text-gray-700 mb-2">{label}</h3>
      <input
        type="file"
        multiple
        onChange={(e) => uploadFileHandler(e, sectionName)}
        className="text-blue-500 text-sm mb-2 hover:underline"
      />
      {uploadingSection === sectionName && (
        <p className="text-blue-600 font-medium">Uploading...</p>
      )}
      <ul>
        {formData.documentSections[sectionName].map((fileUrl, index) => (
          <li key={index} className="text-sm text-gray-600 truncate">
            <span className="p-1 font-semibold">{index + 1}.</span>
            {fileUrl.endsWith(".pdf") ? (
              <a
                href={fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600"
              >
                View PDF
              </a>
            ) : (
              <img
                src={fileUrl}
                alt={`Uploaded file ${index + 1}`}
                className="w-20 h-20 object-cover rounded-md"
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );

  const documentGroups = [
    { heading: "Drawing", sections: ["Presentation_Drawing","Submission_Drawing"] },
    { heading: "Working Drawing", sections: ["Floor","Section","Elevation"] },
    { heading: "Detail Drawing", sections: ["Toilet_Layout","Electric_Drawing","Tile_Layout","Grills","Railing"] },
    { heading: "RCC", sections: ["Column_footing", "Pleanth_Beam", "StairCase_Drawing","Slab"] },
    { heading: "Documents", sections: ["Property_Card", "Property_Map", "Completion_Drawing", "Sanction_Drawing","Revise_Sanction","Completion_Letter"] },
    { heading: "Estimates & Bills", sections: ["Estimate", "Bill"] },
    { heading: "Onsite Photos", sections: ["Site_Photo"] },
  ];

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
        <div className="p-6 bg-gray-50 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-700 mb-4">Project Details</h2>
          <div className="grid md:grid-cols-2 gap-6">
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
        {documentGroups.map((group, index) => (
          <div key={index}>
            <h2 className="text-lg font-bold text-gray-800 mb-4">{group.heading}</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {group.sections.map((sectionKey) =>
                renderFileInputs(sectionKey, sectionKey.replace(/_/g, " "))
              )}
            </div>
          </div>
        ))}
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

export default AddArchitecturalProject;
