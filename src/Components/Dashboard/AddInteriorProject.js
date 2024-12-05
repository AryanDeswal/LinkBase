import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    Floor_Plan: [null],
    Section: [null],
    Elevetion: [null],
    ThreeD_Model: [null],
    Detail_Working: [null],
    Flooring: [null],
    Furnitre: [null],
    Presentation:[null],
    Ceiling:[null],
    Electrical:[null],
    Plumbing:[null],
    Estimate:[null],
    Onsite:[null]
  });

  const [loading, setLoading] = useState(false);
  const [filePreviews, setFilePreviews] = useState({});
  const [errors, setErrors] = useState({});

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
      delete newErrors[name];
    }

    setErrors(newErrors);
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // const handleFileChange = (e) => {
  //   const { name, files } = e.target;
  //   const file = files[0];

  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     setFilePreviews(prevState => ({
  //       ...prevState,
  //       [name]: reader.result
  //     }));
  //   };
  //   reader.readAsDataURL(file);

  //   setFormData(prevState => ({
  //     ...prevState,
  //     [name]: file
  //   }));
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);

  //   if (Object.keys(errors).length > 0) {
  //     toast.error('Please fix the errors before submitting.');
  //     setLoading(false);
  //     return;
  //   }

  //   const formDataToSend = new FormData();
  //   for (const key in formData) {
  //     formDataToSend.append(key, formData[key]);
  //   }

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));
  // };

  const handleFileChange = (e, sectionIndex, sectionName) => {
    const file = e.target.files[0];
    const updatedSection = [...formData[sectionName]];
    updatedSection[sectionIndex] = file;

    setFormData((prevState) => ({
      ...prevState,
      [sectionName]: updatedSection,
    }));

    if (file) {
      const preview = file.type.startsWith("image/")
        ? URL.createObjectURL(file)
        : file.type === "application/pdf"
        ? "PDF Preview Available"
        : "File uploaded";

      setFilePreviews((prevPreviews) => ({
        ...prevPreviews,
        [`${sectionName}_${sectionIndex}`]: preview,
      }));
    }
  };

  const addFileInput = (sectionName) => {
    setFormData((prevState) => ({
      ...prevState,
      [sectionName]: [...prevState[sectionName], null],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setIsSubmitting(true);

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
      const response = await fetch(
        "https://projectassociate-prxp.onrender.com/api/interior/interiors",
        {
          method: "POST",
          body: formDataToSend,
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Form data submitted:", data);
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
      {formData[sectionName].map((file, index) => (
        <div key={index} className="mb-2">
          <input
            type="file"
            onChange={(e) => handleFileChange(e, index, sectionName)}
            className="block w-full p-2 border border-gray-300 rounded"
          />
          {filePreviews[`${sectionName}_${index}`] && (
            <div className="mt-2">
              {filePreviews[`${sectionName}_${index}`].startsWith("blob") ? (
                <img
                  src={filePreviews[`${sectionName}_${index}`]}
                  alt={`${label} Preview`}
                  className="max-w-full h-auto"
                />
              ) : (
                <span className="text-sm text-gray-500">
                  {filePreviews[`${sectionName}_${index}`]}
                </span>
              )}
            </div>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={() => addFileInput(sectionName)}
        className="text-blue-500 text-sm"
      >
        + Add More
      </button>
    </div>
  );

  // const renderSection = (title, fields) => (
  //   <>
  //     <h2 className="text-center pt-5 pb-4 font-bold uppercase">{title}</h2>
  //     <div className="grid grid-cols-3 gap-4">
  //       {fields.map((field, index) => renderFileInput(field.label, field.name))}
  //     </div>
  //   </>
  // );

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
          {renderFormInput(
            "RCC Designer Name",
            "rccDesignerName",
            "RCC Designer Name"
          )}
          {renderFormInput("PAN", "PAN", "PAN")}
          {renderFormInput("Aadhar", "Aadhar", "Enter 12-digit Aadhar")}
          {renderFormInput("Pin", "Pin", "Enter 6-digit Pin")}
          {renderFormInput("Email", "email", "Enter your email")}
        </div>

        {/* Floor Plans */}
        {/* {renderSection('Presentation Drawing', [
          { label: 'Floor Plan 1', name: 'Floor_Plan_1' },
          { label: 'Floor Plan 2', name: 'Floor_Plan_2' },
          { label: 'Floor Plan 3', name: 'Floor_Plan_3' },
          { label: 'Floor Plan 4', name: 'Floor_Plan_4' }
        ])} */}

        {/* Sections */}
        {/* {renderSection('Section', [
          { label: 'Section 1', name: 'Section_1' },
          { label: 'Section 2', name: 'Section_2' },
          { label: 'Section 3', name: 'Section_3' },
          { label: 'Section 4', name: 'Section_4' },
          { label: 'All Section', name: 'All_Section' }
        ])} */}

        {/* Elevations */}
        {/* {renderSection('Elevations', [
          { label: 'Elevation 1', name: 'Elevation_1' },
          { label: 'Elevation 2', name: 'Elevation_2' },
          { label: 'Elevation 3', name: 'Elevation_3' },
          { label: 'Elevation 4', name: 'Elevation_4' },
          { label: 'All Elevation', name: 'All_Elevation' }
        ])} */}

        {/* 3D Models */}
        {/* {renderSection('3D Model', [
          { label: 'ThreeD Model 1', name: 'ThreeD_Model_1' },
          { label: 'ThreeD Model 2', name: 'ThreeD_Model_2' },
          { label: 'ThreeD Model 3', name: 'ThreeD_Model_3' }
        ])} */}

        {/* Working Drawings */}
        {/* {renderSection('Detail Working Drawings', [
          { label: 'Electrical Layout 1', name: 'Electrical_Layout_1' },
          { label: 'Electrical Layout 2', name: 'Electrical_Layout_2' },
          { label: 'Electrical Layout 3', name: 'Electrical_Layout_3' },
          { label: 'Celling Layout 1', name: 'Celling_Layout_1' },
          { label: 'Celling Layout 2', name: 'Celling_Layout_2' }
        ])} */}

        {/* Flooring & Plumbing */}
        {/* {renderSection('Flooring and Plumbing', [
          { label: 'Flooring Details 1', name: 'Flooring_Details_1' },
          { label: 'Flooring Details 2', name: 'Flooring_Details_2' },
          { label: 'Plumbing Details 1', name: 'PlumbingDetails_1' },
          { label: 'Plumbing Details 2', name: 'PlumbingDetails_2' }
        ])} */}

        {/* Furniture & Lamination */}
        {/* {renderSection('Furniture and Lamination', [
          { label: 'Furniture Details 1', name: 'Furniture_Details_1' },
          { label: 'Furniture Details 2', name: 'Furniture_Details_2' },
          { label: 'Furniture Details 3', name: 'Furniture_Details_3' },
          { label: 'Furniture Details 4', name: 'Furniture_Details_4' },
          { label: 'Furniture Details 5', name: 'Furniture_Details_5' },
          { label: 'Laminator Venner 1', name: 'Laminator_Venner_1' },
          { label: 'Laminator Venner 2', name: 'Laminator_Venner_2' },
          { label: 'Handles Hardware 1', name: 'Handles_Hardware_1' },
          { label: 'Handles Hardware 2', name: 'Handles_Hardware_2' },
          { label: 'Curtains 1', name: 'Curtains_1' },
          { label: 'Curtains 2', name: 'Curtains_2' }
        ])} */}

        {renderFileInputs("Floor_Plan", "Floor Plan")}
        {renderFileInputs("Section", "Section")}
        {renderFileInputs("Elevetion", "Elevetion")}
        {renderFileInputs("ThreeD_Model", "ThreeD Model")}
        {renderFileInputs("Detail_Working", "Detail Working")}
        {renderFileInputs("Flooring", "Flooring")}
        {renderFileInputs("Furnitre", "Furnitre")}
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
          {loading ? "Submitting..." : "Submit Project "}
        </button>
      </form>
    </div>
  );
};

export default AddInteriorProject;
