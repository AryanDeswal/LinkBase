// import React, { useState } from "react";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const AddArchitecturalProject = ({ isActive, onClick }) => {
//   const [formData, setFormData] = useState({
//     title: "",
//     clientName: "",
//     projectType: "",
//     siteAddress: "",
//     gstNo: "",
//     mahareraNo: "",
//     projectHead: "",
//     rccDesignerName: "",
//     pan: "",
//     aadhar: "",
//     pin: "",
//     email: "",
//     Presentation_Drawing: [null],
//     File_Model_3D: [null],
//     Drawings: [null],
//   });

//   const [filePreviews, setFilePreviews] = useState({});
//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleFileChange = (e, sectionIndex, sectionName) => {
//     const file = e.target.files[0];
//     const updatedSection = [...formData[sectionName]];
//     updatedSection[sectionIndex] = file;

//     setFormData((prevState) => ({
//       ...prevState,
//       [sectionName]: updatedSection,
//     }));

//     if (file) {
//       const preview = file.type.startsWith("image/")
//         ? URL.createObjectURL(file)
//         : file.type === "application/pdf"
//         ? "PDF Preview Available"
//         : "File uploaded";

//       setFilePreviews((prevPreviews) => ({
//         ...prevPreviews,
//         [`${sectionName}_${sectionIndex}`]: preview,
//       }));
//     }
//   };

//   const addFileInput = (sectionName) => {
//     setFormData((prevState) => ({
//       ...prevState,
//       [sectionName]: [...prevState[sectionName], null],
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     const formDataToSend = new FormData();
//     for (const key in formData) {
//       if (Array.isArray(formData[key])) {
//         formData[key].forEach((file, index) => {
//           if (file) {
//             formDataToSend.append(`${key}[${index}]`, file);
//           }
//         });
//       } else {
//         formDataToSend.append(key, formData[key]);
//       }

//       console.log(formData)
//     }

//     try {
//       const response = await fetch(
//         "http://localhost:8000/api/architecture/upload",
//         {
//           method: "POST",
//           body: formDataToSend,
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }

//       const data = await response.json();
//       console.log(data)
//       toast.success("Architectural project added successfully!");
//       setFormData({
//         title: "",
//         clientName: "",
//         projectType: "",
//         siteAddress: "",
//         gstNo: "",
//         mahareraNo: "",
//         projectHead: "",
//         rccDesignerName: "",
//         pan: "",
//         aadhar: "",
//         pin: "",
//         email: "",
//         Presentation_Drawing: [null],
//         File_Model_3D: [null],
//         Drawings: [null],
//       });
//     } catch (error) {
//       toast.error("Error submitting form: " + error.message);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const renderFileInputs = (sectionName, label) => (
//     <div>
//       <h3 className="font-bold mb-2">{label}</h3>
//       {formData[sectionName].map((file, index) => (
//         <div key={index} className="mb-2">
//           <input
//             type="file"
//             onChange={(e) => handleFileChange(e, index, sectionName)}
//             className="block w-full p-2 border border-gray-300 rounded"
//           />
//           {filePreviews[`${sectionName}_${index}`] && (
//             <div className="mt-2">
//               {filePreviews[`${sectionName}_${index}`].startsWith("blob") ? (
//                 <img
//                   src={filePreviews[`${sectionName}_${index}`]}
//                   alt={`${label} Preview`}
//                   className="max-w-full h-auto"
//                 />
//               ) : (
//                 <span className="text-sm text-gray-500">
//                   {filePreviews[`${sectionName}_${index}`]}
//                 </span>
//               )}
//             </div>
//           )}
//         </div>
//       ))}
//       <button
//         type="button"
//         onClick={() => addFileInput(sectionName)}
//         className="text-blue-500 text-sm"
//       >
//         + Add More
//       </button>
//     </div>
//   );

//   return (
//     <div className="p-4 bg-white rounded-lg shadow">
//       <ToastContainer />
//       <div className="bg-slate-200 p-2 text-center">Add Architecture Project</div>
//       <form className="space-y-8 mt-2" onSubmit={handleSubmit}>
//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <label>Title</label>
//             <input
//               type="text"
//               name="title"
//               placeholder="Architecture Title"
//               value={formData.title}
//               onChange={handleInputChange}
//               className="block w-full p-2 border border-gray-300 rounded"
//             />
//           </div>
//           <div>
//             <label>Client Name</label>
//             <input
//               type="text"
//               name="clientName"
//               placeholder="Client Name"
//               value={formData.clientName}
//               onChange={handleInputChange}
//               className="block w-full p-2 border border-gray-300 rounded"
//             />
//           </div>{" "}
//           <div>
//             <label>Project Type</label>
//             <input
//               type="text"
//               name="projectType"
//               placeholder="Project Type"
//               value={formData.titlprojectType}
//               onChange={handleInputChange}
//               className="block w-full p-2 border border-gray-300 rounded"
//             />
//           </div>{" "}
//           <div>
//             <label>Site Address</label>
//             <input
//               type="text"
//               name="siteAddress"
//               placeholder="Site Address"
//               value={formData.siteAddress}
//               onChange={handleInputChange}
//               className="block w-full p-2 border border-gray-300 rounded"
//             />
//           </div>
//           <div>
//             <label>GST No</label>
//             <input
//               type="text"
//               name="gstNo"
//               placeholder="GST No"
//               value={formData.gstNo}
//               onChange={handleInputChange}
//               className="block w-full p-2 border border-gray-300 rounded"
//             />
//           </div>
//           <div>
//             <label>Maharera No</label>
//             <input
//               type="text"
//               name="mahareraNo"
//               placeholder="Maharera No"
//               value={formData.mahareraNo}
//               onChange={handleInputChange}
//               className="block w-full p-2 border border-gray-300 rounded"
//             />
//           </div>
//           <div>
//             <label>Project Head</label>
//             <input
//               type="text"
//               name="projectHead"
//               placeholder="Project Head"
//               value={formData.projectHead}
//               onChange={handleInputChange}
//               className="block w-full p-2 border border-gray-300 rounded"
//             />
//           </div>
//           <div>
//             <label>RCC Designer Name</label>
//             <input
//               type="text"
//               name="rccDesignerName"
//               placeholder="RCC Designer Name"
//               value={formData.rccDesignerName}
//               onChange={handleInputChange}
//               className="block w-full p-2 border border-gray-300 rounded"
//             />
//           </div>
//           <div>
//             <label>PAN</label>
//             <input
//               type="text"
//               name="pan"
//               placeholder="PAN"
//               value={formData.pan}
//               onChange={handleInputChange}
//               className="block w-full p-2 border border-gray-300 rounded"
//             />
//           </div>
//           <div>
//             <label>Aadhar</label>
//             <input
//               type="text"
//               name="aadhar"
//               placeholder="Aadhar"
//               value={formData.aadhar}
//               onChange={handleInputChange}
//               className="block w-full p-2 border border-gray-300 rounded"
//             />
//           </div>
//           <div>
//             <label>Pin</label>
//             <input
//               type="text"
//               name="pin"
//               placeholder="Pin"
//               value={formData.pin}
//               onChange={handleInputChange}
//               className="block w-full p-2 border border-gray-300 rounded"
//             />
//           </div>
//           <div>
//             <label>Email</label>
//             <input
//               type="text"
//               name="email"
//               placeholder="Email"
//               value={formData.email}
//               onChange={handleInputChange}
//               className="block w-full p-2 border border-gray-300 rounded"
//             />
//           </div>
//           {/* Add other text inputs here */}
//         </div>

//         {renderFileInputs("Presentation_Drawing", "Presentation Drawing")}
//         {renderFileInputs("File_Model_3D", "3D Model")}
//         {renderFileInputs("Drawings", "Drawings")}

//         <button
//           type="submit"
//           className={`w-full py-2 text-white rounded ${
//             isSubmitting ? "bg-gray-400" : "bg-blue-600"
//           }`}
//           disabled={isSubmitting}
//         >
//           {isSubmitting ? "Submitting..." : "Submit"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddArchitecturalProject;


import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddArchitecturalProject = ({ isActive, onClick }) => {
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
    Presentation_Drawing: [null],
    File_Model_3D: [null],
    Drawings: [null],
    Working_Drawings:[null],
    All_Floor:[null],
    All_Section:[null],
    All_Elevation:[null],
    Site_Photo:[null]
  });

  const [filePreviews, setFilePreviews] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

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

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setIsSubmitting(true);

  //   const formDataToSend = new FormData();
  //   for (const key in formData) {
  //     if (Array.isArray(formData[key])) {
  //       formData[key].forEach((file, index) => {
  //         if (file) {
  //           formDataToSend.append(`${key}[${index}]`, file);
  //         }
  //       });
  //     } else {
  //       formDataToSend.append(key, formData[key]);
  //     }
  //   }

  //   try {
  //     const response = await fetch("http://localhost:8000/api/architecture/upload", {
  //       method: "POST",
  //       body: formDataToSend,
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to submit the form");
  //     }

  //     const data = await response.json();
  //     toast.success("Architectural project added successfully!");
  //     console.log(data);

  //     setFormData({
  //       title: "",
  //       clientName: "",
  //       projectType: "",
  //       siteAddress: "",
  //       gstNo: "",
  //       mahareraNo: "",
  //       projectHead: "",
  //       rccDesignerName: "",
  //       pan: "",
  //       aadhar: "",
  //       pin: "",
  //       email: "",
  //       Presentation_Drawing: [null],
  //       File_Model_3D: [null],
  //       Drawings: [null],
  //     });
  //     setFilePreviews({});
  //   } catch (error) {
  //     toast.error("Error submitting form: " + error.message);
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    try {
      // Create a FormData instance for submission
      const formDataToSend = new FormData();
  
      // Iterate over formData keys to append fields and files
      Object.entries(formData).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((file, index) => {
            if (file) {
              formDataToSend.append(key, file); // Removed `[index]` to match standard field handling
            }
          });
        } else {
          formDataToSend.append(key, value);
        }
      });
  
      // Send POST request with FormData
      const response = await fetch("http://localhost:8000/api/architecture/upload", {
        method: "POST",
        body: formDataToSend,
      });
  
      // Check if the response is successful
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.message || "Failed to submit the form");
      }
  
      const data = await response.json();
      console.log(data)
      toast.success("Architectural project added successfully!");
      console.log(data);
  
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
      });
      setFilePreviews({});
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

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <ToastContainer />
      <div className="bg-slate-200 p-2 text-center">Add Architecture Project</div>
      <form className="space-y-8 mt-2" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          {[
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

        {renderFileInputs("Presentation_Drawing", "Presentation Drawing")}
        {renderFileInputs("File_Model_3D", "3D Model")}
        {renderFileInputs("Drawings", "Drawings")}
        {renderFileInputs("Working_Drawings", "Working Drawings")}
        {renderFileInputs("All_Floor", "All Floor")}
        {renderFileInputs("All_Section", "All Section")}
        {renderFileInputs("All_Elevation", "All Elevation")}
        {renderFileInputs("Site_Photo", "Site Photo")}
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
