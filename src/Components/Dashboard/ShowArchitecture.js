import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for Toastify

const ShowArchitecture = () => {
  const { projectId } = useParams();
  const [projectData, setProjectData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false); // State for editing
  const [editingProject, setEditingProject] = useState({}); // State for editing project
  const [imageFiles, setImageFiles] = useState({}); // State for image files

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const response = await fetch(`https://projectassociate-prxp.onrender.com/api/architecture/data/${projectId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch project data');
        }
        const data = await response.json();
        setProjectData(data.data);
        setEditingProject(data.data); // Initialize editing project data
      } catch (error) {
        console.error('Error fetching project data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (projectId) {
      fetchProjectData();
    }
  }, [projectId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingProject((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e, name) => {
    const file = e.target.files[0];
    setImageFiles((prev) => ({ ...prev, [name]: file }));
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    
    // Append all fields to FormData
    Object.keys(editingProject).forEach((key) => {
      formData.append(key, editingProject[key]);
    });
  
    // Append image files to FormData
    Object.keys(imageFiles).forEach((key) => {
      if (imageFiles[key]) {
        formData.append(key, imageFiles[key]);
      }
    });
  
    try {
      const response = await fetch(`https://projectassociate-prxp.onrender.com/api/architecture/update/${editingProject._id}`, {
        method: 'PUT',
        body: formData,
      });
      if (!response.ok) {
        throw new Error('Failed to update project data');
      }
      const data = await response.json();
  
      // Update project data in the state with the new data, including new image URLs
      setProjectData((prev) => ({
        ...prev,
        ...data.data, // Merge existing project data with updated data from API
      }));
  
      // Also update the editingProject to reflect the changes
      setEditingProject((prev) => ({
        ...prev,
        ...data.data, // Update editing project state
      }));
  
      toast.success('Project updated successfully!'); // Show success notification
      setEditing(false); // Exit edit mode after updating
    } catch (error) {
      console.error('Error updating project data:', error);
      toast.error('Failed to update project. Please try again.'); // Show error notification
    }
  };

  const handleViewDetails = (url) => {
    if(url == "null" ){
        alert("File not exist")
    }
    else{
      console.log(url)
      window.open(url, '_blank');
    }
    
  };

  // Function to handle sharing
  const handleShare = (url, name) => {
    if (navigator.share) {
      navigator.share({
        title: `Check out this ${name}`,
        url,
      })
      .then(() => console.log('Successfully shared'))
      .catch((error) => console.error('Error sharing', error));
    } else {
      toast.error('Share feature not supported on this browser.');
    }
  };

  const imagesWithNames = [
    {
      name: "Presentation Drawing 1",
      key: "Presentation_Drawing_1",
      url: editingProject.Presentation_Drawing_1,
    },
    {
      name: "Presentation Drawing 2",
      key: "Presentation_Drawing_2",
      url: editingProject.Presentation_Drawing_2,
    },
    {
      name: "Presentation Drawing 3",
      key: "Presentation_Drawing_3",
      url: editingProject.Presentation_Drawing_3,
    },
    {
      name: "3D Model 1",
      key: "File_Model_3D_1",
      url: editingProject.File_Model_3D_1,
    },
    {
      name: "3D Model 2",
      key: "File_Model_3D_2",
      url: editingProject.File_Model_3D_2,
    },
    {
      name: "3D Model 3",
      key: "File_Model_3D_3",
      url: editingProject.File_Model_3D_3,
    },
    {
      name: "Submission Drawing",
      key: "Submission_Drawing",
      url: editingProject.Submission_Drawing,
    },
    {
      name: "All Floor Plan",
      key: "All_Floor_Plan",
      url: editingProject.All_Floor_Plan,
    },
    {
      name: "All Section",
      key: "All_Section",
      url: editingProject.All_Section,
    },
    {
      name: "All Elevation",
      key: "All_Elevation",
      url: editingProject.All_Elevation,
    },
    { name: "Toilet Drawing", key: "toilet", url: editingProject.toilet },
    {
      name: "All Electric Drawing",
      key: "All_Electric_Drawing",
      url: editingProject.All_Electric_Drawing,
    },
    {
      name: "Tile Layout",
      key: "tile_Layout",
      url: editingProject.tile_Layout,
    },
    {
      name: "All Grills and Railing",
      key: "All_Grills_And_Railing",
      url: editingProject.All_Grills_And_Railing,
    },
    {
      name: "Column Footing",
      key: "Column_Footing",
      url: editingProject.Column_Footing,
    },
    {
      name: "Pleanth Beam",
      key: "Pleanth_Beam",
      url: editingProject.Pleanth_Beam,
    },
    {
      name: "Stair Case Drawing",
      key: "Stair_Case_Drawing",
      url: editingProject.Stair_Case_Drawing,
    },
    { name: "Slab 1", key: "Slab_1", url: editingProject.Slab_1 },
    { name: "Slab 2", key: "Slab_2", url: editingProject.Slab_2 },
    { name: "Slab 3", key: "Slab_3", url: editingProject.Slab_3 },
    { name: "Slab 4", key: "Slab_4", url: editingProject.Slab_4 },
    { name: "Slab 5", key: "Slab_5", url: editingProject.Slab_5 },
    {
      name: "Property Card",
      key: "Property_Card",
      url: editingProject.Property_Card,
    },
    {
      name: "Property Map",
      key: "Property_Map",
      url: editingProject.Property_Map,
    },
    {
      name: "Completion Drawing",
      key: "Completion_Drawing",
      url: editingProject.Completion_Drawing,
    },
    {
      name: "Sanction Drawing",
      key: "SanctionDrawing",
      url: editingProject.SanctionDrawing,
    },
    {
      name: "Revise Sanction Drawing",
      key: "Revise_Sanction",
      url: editingProject.Revise_Sanction,
    },
    {
      name: "Completion Letter",
      key: "Completion_Letter",
      url: editingProject.Completion_Letter,
    },
  ];


  return (
    <div className="min-h-screen bg-gray-50">
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
                Title: {editing ? <input type="text" name="title" value={editingProject.title} onChange={handleChange} className="border p-2 rounded" /> : projectData.title}
              </h1>
              <p className="text-gray-600 text-lg">
                {editing ? (
                  <textarea name="description" value={editingProject.description} onChange={handleChange} className="border p-2 rounded w-full" />
                ) : (
                  projectData.description
                )}
              </p>
            </div>
            
            <div className="mt-4 space-y-4 grid grid-cols-2">
                {['clientName', 'projectType', 'siteAddress', 'gstNo', 'mahareraNo', 'projectHead', 'rccDesignerName', 'email'].map((field) => (
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
            

            <div className="bg-white rounded-lg shadow-sm p-6 ">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Images</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {imagesWithNames.map(({ name, key, url }) => (
                  <div key={key} className="border rounded overflow-hidden shadow-lg">
                    {url.endsWith('.pdf') ? (
                      <iframe src={url} title={name} className="w-full h-48" frameBorder="0"></iframe>
                    ) : (
                      <img src={url} alt={name} className="w-full h-48 object-cover" />
                    )}
                    <div className="p-4">
                      <h3 className="text-lg font-semibold">{name}</h3>
                      <button
                        onClick={() => handleViewDetails(url)}
                        className="mt-2 text-blue-500 hover:underline"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => handleShare(url, name)}
                        className="ml-4 mt-2 bg-blue-600 text-white px-3 py-1 rounded"
                      >
                        Share
                      </button>
                      {editing && (
                        <div className="mt-4">
                          <input type="file" onChange={(e) => handleFileChange(e, key)} />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

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
