import React, { useState, useEffect } from "react";
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
      Area_Calculations: [],
      Presentation_Drawings: [],
      Submission_Drawings: [],
      Center_Line: [],
      Floor_Plans: [],
      Sections: [],
      Elevations: [],
      Compound_Wall_Details: [],
      Toilet_Layouts: [],
      Electric_Layouts: [],
      Tile_Layouts: [],
      Grill_Details: [],
      Railing_Details: [],
      Column_footing_Drawings: [],
      Plinth_Beam_Drawings: [],
      StairCase_Details: [],
      Slab_Drawings: [],
      Property_Card: [],

      Property_Map: [],
      Sanction_Drawings: [],
      Revise_Sanction_Drawings: [],
      Completion_Drawings: [],
      Completion_Letter: [],
      Estimate: [],
      Bills_Documents: [],
      Site_Photos: [],
      Other_Documents: [],
    },
  });

  const [loading, setLoading] = useState(false);
  const [uploadingSection, setUploadingSection] = useState(null);
  const [errors, setErrors] = useState({});
  const [toggle, setToggle] = useState({});
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);

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
      return;
    }

    setUploadingSection(sectionName);

    try {
      const uploadedUrls = await Promise.all(
        Array.from(files).map(async (file) => {
          const formDataToUpload = new FormData();
          formDataToUpload.append("file", file);

          const { data } = await axios.post(
            "https://projectassoicate-mt1x.onrender.com/api/auth/uploadarchitecture",
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

    if (isFormSubmitting) {
      toast.info("Form is already being submitted.");
      return;
    }

    setIsFormSubmitting(true);

    try {
      await axios.post(
        "https://projectassoicate-mt1x.onrender.com/api/architecture/upload",
        transformedObject
      );
      toast.success("Architecture project added successfully!");
      setFormData({
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
          Area_Calculations: [],
          Presentation_Drawings: [],
          Submission_Drawings: [],
          Center_Line: [],
          Floor_Plans: [],
          Sections: [],
          Elevations: [],
          Compound_Wall_Details: [],
          Toilet_Layouts: [],
          Electric_Layouts: [],
          Tile_Layouts: [],
          Grill_Details: [],
          Railing_Details: [],
          Column_footing_Drawings: [],
          Plinth_Beam_Drawings: [],
          StairCase_Details: [],
          Slab_Drawings: [],
          Property_Card: [],
    
          Property_Map: [],
          Sanction_Drawings: [],
          Revise_Sanction_Drawings: [],
          Completion_Drawings: [],
          Completion_Letter: [],
          Estimate: [],
          Bills_Documents: [],
          Site_Photos: [],
          Other_Documents: [],
        },
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error submitting form: " + error.message);
    } finally {
      setLoading(false);
      setIsFormSubmitting(false);
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
        {formData.documentSections[sectionName]?.map((fileUrl, index) => (
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
    {
      heading: "Drawings",
      sections: [
        "Area_Calculations",
        "Presentation_Drawings",
        "Submission_Drawings",
      ],
    },
    {
      heading: "Working Drawings",
      sections: ["Center_Line", "Floor_Plans", "Sections", "Elevations"],
    },
    {
      heading: "Detail Drawings",
      sections: [
        "Compound_Wall_Details",
        "Toilet_Layouts",
        "Electric_Layouts",
        "Tile_Layouts",
        "Grill_Details",
        "Railing_Details",
      ],
    },
    {
      heading: "RCC",
      sections: ["Column_footing_Drawings", "Plinth_Beam_Drawings", "StairCase_Details", "Slab_Drawings"],
    },
    {
      heading: "Documents & Other",
      sections: [
        "Property_Card",
        "Property_Map",
        "Sanction_Drawings",
        " Revise_Sanction_Drawings",
        "Completion_Drawings",
        "Completion_Letter",
      ],
    },
    { heading: "Estimates & Bills", sections: ["Estimate", "Bills_Documents"] },
    { heading: "Onsite Photos", sections: ["Site_Photos","Other_Documents"] },
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
        Add Architecture Project
      </button>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {renderFormInput("Title", "title", "Enter project title")}
          {renderFormInput("Client Name", "clientName", "Enter client name")}
          {renderFormInput("Site Address", "siteAddress", "Enter site address")}
          {renderFormInput("GST No", "gstNo", "Enter GST number")}
          {renderFormInput("Project Head", "projectHead", "Enter project head")}
          {renderFormInput(
            "RCC Designer Name",
            "rccDesignerName",
            "Enter RCC designer name"
          )}
          {renderFormInput("PAN", "PAN", "Enter PAN")}
          {renderFormInput("Aadhar", "Aadhar", "Enter Aadhar")}
          {renderFormInput("Pin", "Pin", "Enter Pin")}
          {renderFormInput("Email", "email", "Enter email", "email")}
        </div>

        {documentGroups.map((group, idx) => (
  <div key={idx}>
    <h3 className="text-xl font-bold">{group.heading}</h3>
    {group.sections.map((section) =>
      renderFileInputs(section, section.replace("_", " "))
    )}
  </div>
))}


        <div className="flex justify-end space-x-4">
          <button
            type="button"
            className="py-2 px-6 bg-gray-400 text-white rounded-md"
            onClick={onClick}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="py-2 px-6 bg-blue-500 text-white rounded-md disabled:bg-blue-300"
            disabled={loading || isFormSubmitting}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddArchitecturalProject;
