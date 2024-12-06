import React, { useState, useRef, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios"

const AddArchitecturalProject = () => {
  const [formData, setFormData] = useState({
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
    Presentation_Drawing: [],
    File_Model_3D: [],
    Drawings: [],
    Working_Drawings: [],
    All_Floor: [],
    All_Section: [],
    All_Elevation: [],
    Site_Photo: [],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const widgetRef = useRef();

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
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create a FormData instance for submission
      const formDataToSend = new FormData();

      // Iterate over formData keys to append fields and files
      Object.entries(formData).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((file) => {
            if (file) {
              formDataToSend.append(key, file);
            }
          });
        } else {
          formDataToSend.append(key, value);
        }
      });
      const response = await axios.post('http://localhost:8000/api/architecture/upload',formData)

      // Check if the response is successful
      if(response.error){
        toast.error("Architectural project Error!");

      }
      toast.success("Architectural project added successfully!");

      // Reset form state
      setFormData({
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
        Presentation_Drawing: [],
        File_Model_3D: [],
        Drawings: [],
        Working_Drawings: [],
        All_Floor: [],
        All_Section: [],
        All_Elevation: [],
        Site_Photo: [],
      });
    } catch (error) {
      toast.error("Error submitting form: " + error.message);
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

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

  const openCloudinaryWidget = (sectionName) => {
    widgetRef.current.sectionName = sectionName;
    widgetRef.current.open();
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <ToastContainer />
      <div className="bg-slate-200 p-2 text-center">
        Add Architecture Project
      </div>
      <form className="space-y-8 mt-2" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          {[
            {
              label: "Title",
              name: "title",
              placeholder: "Architecture Title",
            },
            {
              label: "Client Name",
              name: "clientName",
              placeholder: "Client Name",
            },
            {
              label: "Project Type",
              name: "projectType",
              placeholder: "Project Type",
            },
            {
              label: "Site Address",
              name: "siteAddress",
              placeholder: "Site Address",
            },
            { label: "GST No", name: "gstNo", placeholder: "GST No" },
            {
              label: "Maharera No",
              name: "mahareraNo",
              placeholder: "Maharera No",
            },
            {
              label: "Project Head",
              name: "projectHead",
              placeholder: "Project Head",
            },
            {
              label: "RCC Designer Name",
              name: "rccDesignerName",
              placeholder: "RCC Designer Name",
            },
            { label: "PAN", name: "pan", placeholder: "PAN" },
            { label: "Aadhar", name: "aadhar", placeholder: "Aadhar" },
            { label: "Pin", name: "pin", placeholder: "Pin" },
            { label: "Email", name: "email", placeholder: "Email" },
          ].map(({ label, name, placeholder }) => (
            <div key={name}>
              <label>{label}</label>
              <input
                type="text"
                name={name}
                placeholder={placeholder}
                value={formData[name]}
                onChange={handleInputChange}
                className="block w-full p-2 border border-gray-300 rounded"
              />
            </div>
          ))}
        </div>

        {renderFileInputs("Presentation_Drawing", "Presentation_Drawing")}
        {renderFileInputs("File_Model_3D", "File_Model_3D")}
        {renderFileInputs("Drawings", "Drawings")}
        {renderFileInputs("Working_Drawings", "Working Drawing")}
        {renderFileInputs("All_Floor", "All_Floor")}
        {renderFileInputs("All_Section", "All_Section")}
        {renderFileInputs("All_Elevation", "All_Elevation")}
        {renderFileInputs("Site_Photo", "Site_Photo")}

        <button
          type="submit"
          className={`w-full py-2 text-white rounded ${
            isSubmitting ? "bg-gray-400" : "bg-blue-600"
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default AddArchitecturalProject;
