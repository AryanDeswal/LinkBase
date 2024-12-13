import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ShowInteriorProject = () => {
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
        cloudName: "dmjxco87a", // Replace with your Cloudinary cloud name
        uploadPreset: "Architecture", // Replace with your Cloudinary upload preset
        multiple: false,
        resourceType: "raw",
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
      toast.success("Project updated successfully!");

      setEditing(false);
      fetchProjectData();
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
    <div>
      <h3 className="font-bold mb-2 text-2xl">{label}</h3>
      {editing && (
        <button
          type="button"
          onClick={() => openCloudinaryWidget(sectionName)}
          className="text-blue-500 text-sm mb-4"
        >
          + Upload {label}
        </button>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {(editingProject[sectionName] || []).length > 0
          ? (editingProject[sectionName] || []).map((fileUrl, index) => {
              // Extract the file name from the URL
              const fileName = fileUrl.split("/").pop();

              return (
                <div key={index} className="relative group">
                  {fileUrl.endsWith(".pdf") ? (
                    <div className="relative">
                      <iframe
                        src={fileUrl}
                        width="100%"
                        height="200px"
                        className="border rounded-md"
                        title={`File ${index + 1}`}
                      ></iframe>
                      <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
                        <button
                          onClick={() => handleRemoveImage(sectionName, index)}
                          className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 shadow-md"
                          title="Remove File"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M6 2L18 2L18 20L6 20L6 2Z"></path>
                            <path d="M9 2V20"></path>
                            <path d="M15 2V20"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="relative">
                      <img
                        src={fileUrl}
                        alt={`File ${index + 1}`}
                        className="w-full h-60 object-cover rounded-lg"
                      />
                      <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
                        <button
                          onClick={() => handleRemoveImage(sectionName, index)}
                          className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 shadow-md"
                          title="Remove File"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M6 2L18 2L18 20L6 20L6 2Z"></path>
                            <path d="M9 2V20"></path>
                            <path d="M15 2V20"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  )}
                  {/* Display the file name below the preview */}
                  <p className="text-center mt-2 text-sm">{fileName}</p>
                </div>
              );
            })
          : <p>No File Present</p>}
      </div>
    </div>
  );

  return (
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
              <p className="text-gray-600 text-lg">
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

            <div className="mt-4 space-y-4 grid grid-cols-2 gap-6">
              {[
                "clientName",
                "projectType",
                "siteAddress",
                "gstNo",
                "mahareraNo",
              ].map((field) => (
                <div key={field}>
                  <label className="block font-semibold">{field}:</label>
                  {editing ? (
                    <input
                      type="text"
                      name={field}
                      value={editingProject[field]}
                      onChange={handleChange}
                      className="border p-2 rounded w-full"
                    />
                  ) : (
                    <p>{projectData[field]}</p>
                  )}
                </div>
              ))}
            </div>

            {[
               "Presentation_Drawing",
               "Ceiling",
               "Electrical", 
               "Door_Handle", 
               "Curtains",
               "Furniture",
               "Laminates",
               "Venner",
               "Hinges",
               "Plumbing",
               "Windows",
               "Interior_Fittings",
            ].map((section) =>
              renderFileInputs(section, section.replace(/_/g, " "))
            )}

            <div className="flex space-x-4 mt-6 justify-center">
              {editing ? (
                <>
                  <button
                    onClick={handleUpdate}
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => setEditing(false)}
                    className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setEditing(true)}
                  className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600"
                >
                  Edit Project
                </button>
              )}
            </div>
          </div>
        ) : (
          <p className="text-center text-xl text-gray-600">Project not found</p>
        )}
      </div>
    </div>
  );
};

export default ShowInteriorProject;
