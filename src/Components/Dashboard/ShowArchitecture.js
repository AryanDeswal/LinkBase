import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const ShowArchitecture = () => {
  const { projectId } = useParams();
  const [projectData, setProjectData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editingProject, setEditingProject] = useState({});
  const widgetRef = useRef();

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const response = await fetch(
          `https://projectassoicate.onrender.com/api/architecture/data/${projectId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch project data");
        }
        const data = await response.json();
        setProjectData(data.data);
        setEditingProject(data.data); // Initialize editing project data
      } catch (error) {
        console.error("Error fetching project data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (projectId) {
      fetchProjectData();
    }
  }, [projectId]);

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
        `https://projectassoicate.onrender.com/api/architecture/update/${editingProject._id}`,
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
    } catch (error) {
      console.error("Error updating project data:", error);
      toast.error("Failed to update project. Please try again.");
    }
  };

  const renderFileInputs = (sectionName, label) => (
    <div>
      <h3 className="font-bold mb-2 text-2xl">{label}</h3>
     {editing ? <button
        type="button"
        onClick={() => openCloudinaryWidget(sectionName)}
        className="text-blue-500 text-sm"
      >
        + Upload {label}
      </button> :  null }
     
      
      <ul className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-20">
        {(editingProject[sectionName] || []).length > 0
          ? (editingProject[sectionName] || []).map((fileUrl, index) => (
              <li key={index} className="mt-2 text-sm text-gray-600">
                {fileUrl.length > 0 ? (
                  fileUrl.endsWith(".pdf") ? (
                    <iframe src={fileUrl} width="100%" height="600px"></iframe>
                  ) : (
                    <img
                      src={fileUrl}
                      alt={`File ${index + 1}`}
                      className="w-full h-[20rem]  object-cover"
                    />
                  )
                ) : (
                  "No valid file"
                )}
              </li>
            ))
          : "No File Present"}
      </ul>
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

            <div className="mt-4 space-y-4 grid grid-cols-2">
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
              "All_Floor",
              "Drawings",
              "Presentation_Drawing",
              "File_Model_3D",
              "Site_Photo",
              "Working_Drawings",
            ].map((key) => renderFileInputs(key, key.replace("_", " ")))}

            <div className="flex justify-center mt-8 space-x-4">
              {!editing && (
                <button
                  onClick={() => setEditing(true)}
                  className="bg-blue-600 text-white px-6 py-2 rounded"
                >
                  Edit
                </button>
              )}
              {editing && (
                <>
                  <button
                    onClick={handleUpdate}
                    className="bg-green-600 text-white px-6 py-2 rounded"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => setEditing(false)}
                    className="bg-red-600 text-white px-6 py-2 rounded"
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        ) : (
          <p>No project data found.</p>
        )}
      </div>
    </div>
  );
};

export default ShowArchitecture;
