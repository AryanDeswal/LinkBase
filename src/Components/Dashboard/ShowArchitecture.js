import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

const ShowArchitecture = () => {
  const { projectId } = useParams();
  const [projectData, setProjectData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editingProject, setEditingProject] = useState({});
  const [expandedSections, setExpandedSections] = useState({}); // Track dropdown states

  const fetchProjectData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://projectassociate-fld7.onrender.com/api/architecture/data/${projectId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch project data");
      }
      const data = await response.json();
      if (!data) {
        setLoading(true)
      }
      setProjectData(data.data);
      setEditingProject(data.data); // Initialize editing project data
      setLoading(false)
    } catch (error) {
      console.error("Error fetching project data:", error);
      toast.error("Failed to fetch project data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Call the fetchProjectData on component mount and whenever projectId changes
  useEffect(() => {
    if (projectId) {
      fetchProjectData(); // Call fetchProjectData globally
    }
  }, [projectId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingProject((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `https://projectassociate-fld7.onrender.com/api/architecture/update/${editingProject._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editingProject),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update project data");
      }
      const data = await response.json();
      setProjectData(data.data);
      setEditingProject(data.data);

      toast.success("Project updated successfully!");
      setEditing(false);
      fetchProjectData();
    } catch (error) {
      console.error("Error updating project data:", error);
      toast.error("Failed to update project. Please try again.");
    }
  };

  const toggleSection = (sectionName) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionName]: !prev[sectionName],
    }));
  };

  const handleShareImage = (imageUrl) => {
    navigator.clipboard
      .writeText(imageUrl)
      .then(() => {
        toast.success("Image link copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
        toast.error("Failed to copy image link.");
      });
  };

  const handleRemoveImage = (sectionName, indexToRemove) => {
    setEditingProject((prevState) => {
      const updatedSection = prevState[sectionName].filter(
        (_, index) => index !== indexToRemove
      );
      const updatedState = { ...prevState, [sectionName]: updatedSection };

      // Sync projectData to reflect changes immediately
      setProjectData((prevProjectData) => ({
        ...prevProjectData,
        [sectionName]: updatedSection,
      }));

      return updatedState;
    });
  };

  const uploadFileHandler = async (e, sectionName) => {
    const file = e.target.files[0];
    if (!file) {
      toast.error("Please select a file to upload.");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("file", file);

      const { data } = await axios.post(
        "https://projectassociate-fld7.onrender.com/api/auth/upload",
        formData
      );

      const fileUrl = data.fileUrl;
      setEditingProject({
        ...editingProject,
        [sectionName]: [...editingProject[sectionName], fileUrl]
      })
      toast.success("File uploaded successfully!");
    } catch (error) {
      console.error("File upload failed:", error);
      toast.error("File upload failed. Please try again.");
    }
  };

  const renderFileInputs = (sectionName) => (
    <div>
      <h3 className="font-bold mb-2 text-2xl">{myMap.get(sectionName)}</h3>
      {editing && (
        <input
          type="file"
          onChange={(e) => uploadFileHandler(e, sectionName)}
          className="text-blue-500 text-sm mb-4"
        />
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {(projectData[sectionName] || []).length > 0 ? (
          (projectData[sectionName] || []).map((fileUrl, index) => {
            const fileName = fileUrl.split("/").pop().split("?")[0];

            return (
              <div key={index} className="relative group">
                <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="block">
                  {fileUrl.endsWith(".pdf") ? (
                    <iframe
                      src={fileUrl}
                      width="100%"
                      height="200px"
                      className="border rounded-md pointer-events-none"
                      title={`File ${index + 1}`}
                    ></iframe>
                  ) : (
                    <img
                      src={fileUrl}
                      alt={`File ${index + 1}`}
                      className="w-full h-60 object-cover rounded-lg"
                    />
                  )}
                </a>
                <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => handleShareImage(fileUrl)}
                    className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 shadow-md"
                    title="Share File"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                      <polyline points="16 6 12 2 8 6"></polyline>
                      <line x1="12" y1="2" x2="12" y2="15"></line>
                    </svg>
                  </button>
                  <button
                    onClick={() => handleRemoveImage(sectionName, index)}
                    className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 shadow-md"
                    title="Remove File"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M6 2L18 2L18 20L6 20L6 2Z"></path>
                      <path d="M9 2V20"></path>
                      <path d="M15 2V20"></path>
                    </svg>
                  </button>
                </div>
                <p className="text-center mt-2">{fileName}</p>
              </div>
            );
          })
        ) : (
          <p>No File Present</p>
        )}
      </div>
    </div>
  );

  const myMap = new Map([
    ["title", "Title"],
    ["clientName", "Client Name"],
    ["siteAddress", "Site Address"],
    ["gstNo", "GST Number"],
    ["projectHead", "Project Head"],
    ["leadFirm", "Lead Firm"],
    ["rccDesignerName", "RCC Designer Name"],
    ["Aadhar", "Aadhar"],
    ["PAN", "PAN"],
    ["Pin", "Pin"],
    ["email", "Email"],
    ["Area_Calculations", "Area Calculations"],
    ["Presentation_Drawings", "Presentation Drawings"],
    ["Submission_Drawings", "Submission Drawings"],
    ["Center_Line", "Center Line"],
    ["Floor_Plans", "Floor Plans"],
    ["Sections", "Sections"],
    ["Elevations", "Elevations"],
    ["Compound_Wall_Details", "Compound_Wall Details"],
    ["Toilet_Layouts", "Toilet Layouts"],
    ["Electric_Layouts", "Electric Layouts"],
    ["Tile_Layouts", "Tile Layouts"],
    ["Grill_Details", "Grill Details"],
    ["Railing_Details", "Railing Details"],
    ["Column_footing_Drawings", "Column Footing Drawings"],
    ["Plinth_Beam_Drawings", "Plinth Beam Drawings"],
    ["StairCase_Details", "StairCase Details"],
    ["Slab_Drawings", "Slab Drawings"],
    ["Property_Card", "Property Card"],
    ["Property_Map", "Property Map"],
    ["Sanction_Drawings", "Sanction Drawings"],
    ["Revise_Sanction_Drawings", "Revise Sanction Drawings"],
    ["Completion_Drawings", "Completion Drawings"],
    ["Completion_Letter", "Completion Letter"],
    ["Estimate", "Estimate"],
    ["Bills_Documents", "Bills"],
    ["Consultancy_Fees", "Consultancy Fees"],
    ["Site_Photos", "Site Photos"],
    ["Other_Documents", "Other Documents"]
  ]);

  const renderSection = (sectionName, fields) => (
    <div className="mb-4">
      <div
        className="flex justify-between items-center cursor-pointer bg-blue-100 px-4 py-3 rounded-lg shadow"
        onClick={() => toggleSection(sectionName)}
      >
        <h3 className="text-xl font-bold text-blue-700">{sectionName}</h3>
        <button>
          {expandedSections[sectionName] ? "▲" : "▼"}
        </button>
      </div>
      {sectionName === "Project Details" ?
        expandedSections[sectionName] && (
          <div className="mt-2 ml-4">
            <table className="table-auto border-collapse border border-gray-300 w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2">Field</th>
                  <th className="border border-gray-300 px-4 py-2">Value</th>
                </tr>
              </thead>
              <tbody>
                {fields.map((field) => (
                  <tr key={field} className="text-gray-800">
                    <td className="border border-gray-300 px-4 py-2 font-bold">{myMap.get(field)}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      {editing ? (
                        <input
                          type="text"
                          name={field}
                          value={editingProject[field] || ""}
                          onChange={handleChange}
                          className="border p-2 rounded w-full"
                        />
                      ) : (
                        <p>{projectData[field]}</p>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) :
        expandedSections[sectionName] && (
          <div className="mt-2 ml-4">
            {fields.map((field) => (
              renderFileInputs(field)
            ))}
          </div>
        )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <div className="flex justify-end">
        <button
          onClick={() => window.history.back()} // Navigate back in history
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow-lg"
        >
          Back
        </button>
      </div>

      <ToastContainer />

      <div className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : projectData ? (
          <div className="space-y-8">
            {renderSection("Project Details", [
              "title",
              "clientName",
              "siteAddress",
              "gstNo",
              "projectHead",
              "leadFirm",
              "rccDesignerName",
              "Aadhar",
              "PAN",
              "Pin",
              "email",
            ])}
            {renderSection("Drawings", [
              "Area_Calculations",
              "Presentation_Drawings",
              "Submission_Drawings",
            ])}
            {renderSection("Working Drawings", [
              "Center_Line",
              "Floor_Plans",
              "Sections",
              "Elevations",
            ])}
            {renderSection("Detail Drawings", [
              "Compound_Wall_Details",
              "Toilet_Layouts",
              "Electric_Layouts",
              "Tile_Layouts",
              "Grill_Details",
              "Railing_Details",
            ])}
            {renderSection("RCC", [
              "Column_footing_Drawings",
              "Plinth_Beam_Drawings",
              "StairCase_Details",
              "Slab_Drawings",
            ])}
            {renderSection("Documents & Other", [
              "Property_Card",
              "Property_Map",
              "Sanction_Drawings",
              "Revise_Sanction_Drawings",
              "Completion_Drawings",
              "Completion_Letter",
            ])}
            {renderSection("Estimates & Bills", [
              "Estimate",
              "Bills_Documents",
              "Consultancy_Fees"
            ])}
            {renderSection("Onsite Photos", [
              "Site_Photos",
              "Other_Documents"
            ])}

            <div className="flex justify-center space-x-4 mt-4">
              {editing ? (
                <>
                  <button
                    onClick={handleUpdate}
                    className="bg-green-500 text-white px-6 py-2 rounded-full"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => setEditing(false)}
                    className="bg-gray-500 text-white px-6 py-2 rounded-full"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setEditing(true)}
                  className="bg-blue-500 text-white px-6 py-2 rounded-full"
                >
                  Edit Project
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center text-xl text-gray-500">
            Project Not Found
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowArchitecture;

