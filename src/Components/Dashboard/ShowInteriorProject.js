import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ShowInteriorProject() {
  const { projectId } = useParams();
  const [projectData, setProjectData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editingProject, setEditingProject] = useState({});
  const widgetRef = useRef();

  const fetchProjectData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://projectassoicate.onrender.com/api/interior/interior/${projectId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch project data");
      }
      const data = await response.json();
      setProjectData(data.data);
      setEditingProject(data.data); // Initialize editing project data
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
            setEditingProject((prevState) => ({
              ...prevState,
              [sectionName]: [...(prevState[sectionName] || []), uploadedUrl],
            }));
          }
          toast.success("File uploaded successfully!");
        }
      }
    );
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingProject((prev) => ({ ...prev, [name]: value }));
  };

  const openCloudinaryWidget = (sectionName) => {
    widgetRef.current.sectionName = sectionName;
    widgetRef.current.open();
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `https://projectassoicate.onrender.com/api/interior/update/interiors/${editingProject._id}`,
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
      toast.success("Project updated successfully!"); // Display success message
      setEditing(false); 
      fetchProjectData();// Stop editing mode
    } catch (error) {
      console.error("Error updating project data:", error);
      toast.error("Failed to update project. Please try again.");
    }
  };

  const handleShareImage = (imageUrl) => {
    navigator.clipboard.writeText(imageUrl).then(() => {
      toast.success("Image link copied to clipboard!");
    }).catch(err => {
      console.error('Failed to copy: ', err);
      toast.error("Failed to copy image link.");
    });
  };

  const handleRemoveImage = (sectionName, indexToRemove) => {
    setEditingProject(prevState => ({
      ...prevState,
      [sectionName]: prevState[sectionName].filter((_, index) => index !== indexToRemove)
    }));
  };

  const renderFileInputs = (sectionName, label) => (
    <div className="mb-8">
      <h3 className="font-bold mb-4 text-2xl text-gray-800 border-b pb-2">{label}</h3>
      {editing ? (
        <button
          type="button"
          onClick={() => openCloudinaryWidget(sectionName)}
          className="mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          + Upload {label}
        </button>
      ) : null}
      
      {(editingProject[sectionName] || []).length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(editingProject[sectionName] || []).map((fileUrl, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg shadow-md overflow-hidden border transition-all duration-300 hover:shadow-xl group relative"
            >
              {/* PDF File Handling */}
              {fileUrl.endsWith(".pdf") ? (
                <iframe 
                  src={fileUrl}
                  width="100%" 
                  height="500px" 
                  type="application/pdf"
                  title="PDF File"
                ></iframe>
              ) : (
                <div className="relative">
                  <img
                    src={fileUrl}
                    alt={`${label} ${index + 1}`}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              )}

              {/* Share Button (visible only when not in editing mode) */}
              {!editing && (
                <div className="absolute top-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => handleShareImage(fileUrl)}
                    className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 shadow-md"
                    title="Share File"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                      <polyline points="16 6 12 2 8 6"></polyline>
                      <line x1="12" y1="2" x2="12" y2="15"></line>
                    </svg>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 py-6 bg-gray-100 rounded-lg">
          No Files Present
        </div>
      )}
    </div>
  );

  return (
    <div>
      <div className="min-h-screen bg-gray-50 p-10">
        <ToastContainer />
        <div className="container mx-auto px-4 py-8">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : projectData ? (
            <div className="space-y-8">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">
                  Title:{" "}
                  {editing ? (
                    <input
                      type="text"
                      name="title"
                      value={editingProject.title}
                      onChange={(e) =>
                        setEditingProject((prev) => ({
                          ...prev,
                          title: e.target.value,
                        }))
                      }
                      className="border p-2 rounded"
                    />
                  ) : (
                    projectData.title
                  )}
                </h1>
                <p className="text-gray-600 text-lg text-center">
                  {editing ? (
                    <textarea
                      name="description"
                      value={editingProject.description}
                      onChange={(e) =>
                        setEditingProject((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                      className="border p-2 rounded w-full"
                    />
                  ) : (
                    projectData.description
                  )}
                </p>
              </div>

              <div className="mt-4 space-y-4 grid grid-cols-2 gap-4">
                {[
                  "Aadhar",
                  "Pin",
                  "email",
                  "gstNo",
                  "projectHead",
                  "rccDesignerName",
                  "siteAddress",
                ].map((field) => (
                  <div key={field} className="bg-white p-4 rounded-lg shadow-sm">
                    <label className="block font-semibold mb-2 text-gray-700 capitalize">{field}:</label>
                    {editing ? (
                      <input
                        type="text"
                        name={field}
                        value={editingProject[field]}
                        onChange={handleChange}
                        className="border p-2 rounded w-full bg-gray-50"
                      />
                    ) : (
                      <p className="text-gray-600">{projectData[field]}</p>
                    )}
                  </div>
                ))}
              </div>

              {[
                "Ceiling",
                "Detail_Working",
                "Electrical",
                "Elevation",
                "Estimate",
                "Floor_Plan",
                "Flooring",
                "Furniture",
                "Onsite",
                "Plumbing",
                "Presentation",
                "Section",
                "ThreeD_Model"
              ].map((key) => renderFileInputs(key, key.replace("_", " ")))}

              {/* Edit/Update Buttons */}
              {editing ? (
                <div className="flex justify-center gap-4 mt-6">
                  <button
                    onClick={handleUpdate}
                    className="bg-green-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-600"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => setEditing(false)}
                    className="bg-gray-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="flex justify-center mt-6">
                  <button
                    onClick={() => setEditing(true)}
                    className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600"
                  >
                    Edit Project
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center text-lg text-red-500">Project not found!</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ShowInteriorProject;
