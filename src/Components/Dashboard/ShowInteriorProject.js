import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for Toastify

const ShowInteriorProject = () => {
  const { projectId } = useParams();
  const [projectData, setProjectData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false); // State for editing
  const [editingProject, setEditingProject] = useState({}); // State for editing project
  const [imageFiles, setImageFiles] = useState({}); // State for image files

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const response = await fetch(`https://projectassociate-1.onrender.com/api/interior/interior/${projectId}`);
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
      const response = await fetch(`https://projectassociate-1.onrender.com/api/interior/update/interiors/${editingProject._id}`, {
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
  

  const imagesWithNames = [
    { name: 'Floor Plan 1', key: 'Floor_Plan_1', url: editingProject.Floor_Plan_1 },
    { name: 'Floor Plan 2', key: 'Floor_Plan_2', url: editingProject.Floor_Plan_2 },
    { name: 'Floor Plan 3', key: 'Floor_Plan_3', url: editingProject.Floor_Plan_3 },
    { name: 'Floor Plan 4', key: 'Floor_Plan_4', url: editingProject.Floor_Plan_4 },
    { name: 'Section 1', key: 'Section_1', url: editingProject.Section_1 },
    { name: 'Section 2', key: 'Section_2', url: editingProject.Section_2 },
    { name: 'Section 3', key: 'Section_3', url: editingProject.Section_3 },
    { name: 'Section 4', key: 'Section_4', url: editingProject.Section_4 },
    { name: 'Elevation 1', key: 'Elevation_1', url: editingProject.Elevation_1 },
    { name: 'Elevation 2', key: 'Elevation_2', url: editingProject.Elevation_2 },
    { name: 'Elevation 3', key: 'Elevation_3', url: editingProject.Elevation_3 },
    { name: 'Elevation 4', key: 'Elevation_4', url: editingProject.Elevation_4 },
    { name: '3D Model 1', key: 'ThreeD_Model_1', url: editingProject.ThreeD_Model_1 },
    { name: '3D Model 2', key: 'ThreeD_Model_2', url: editingProject.ThreeD_Model_2 },
    { name: '3D Model 3', key: 'ThreeD_Model_3', url: editingProject.ThreeD_Model_3 },
    { name: 'Detail Working Layout 1', key: 'Detail_Working_Layout_1', url: editingProject.Detail_Working_Layout_1 },
    { name: 'Electrical Layout 1', key: 'Electrical_Layout_1', url: editingProject.Electrical_Layout_1 },
    { name: 'Electrical Layout 2', key: 'Electrical_Layout_2', url: editingProject.Electrical_Layout_2 },
    { name: 'Electrical Layout 3', key: 'Electrical_Layout_3', url: editingProject.Electrical_Layout_3 },
    { name: 'Celling Layout 1', key: 'Celling_Layout_1', url: editingProject.Celling_Layout_1 },
    { name: 'Celling Layout 2', key: 'Celling_Layout_2', url: editingProject.Celling_Layout_2 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <ToastContainer /> {/* Include ToastContainer to render notifications */}
      <div className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : projectData ? (
          <div className="space-y-8">
            {/* Header Section */}
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

            {/* Project Details Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Project Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <DetailItem label="Client" value={editing ? <input type="text" name="clientName" value={editingProject.clientName} onChange={handleChange} className="border p-2 rounded" /> : projectData.clientName} />
                <DetailItem label="Project Type" value={editing ? <input type="text" name="projectType" value={editingProject.projectType} onChange={handleChange} className="border p-2 rounded" /> : projectData.projectType} />
                <DetailItem label="Location" value={editing ? <input type="text" name="siteAddress" value={editingProject.siteAddress} onChange={handleChange} className="border p-2 rounded" /> : projectData.siteAddress} />
                <DetailItem label="GST No" value={editing ? <input type="text" name="gstNo" value={editingProject.gstNo} onChange={handleChange} className="border p-2 rounded" /> : projectData.gstNo} />
                <DetailItem label="Project Head" value={editing ? <input type="text" name="projectHead" value={editingProject.projectHead} onChange={handleChange} className="border p-2 rounded" /> : projectData.projectHead} />
                <DetailItem label="RCC Designer" value={editing ? <input type="text" name="rccDesignerName" value={editingProject.rccDesignerName} onChange={handleChange} className="border p-2 rounded" /> : projectData.rccDesignerName} />
                <DetailItem label="PAN" value={editing ? <input type="text" name="Pan" value={editingProject.Pan} onChange={handleChange} className="border p-2 rounded" /> : projectData.Pan} />
                
              </div>
            </div>

            {/* Image Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Images</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {imagesWithNames.map((image, index) => (
                  <div key={index} className="bg-gray-100 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{image.name}</h3>
                    {image.url ? (
                      <img src={image.url} alt={image.name} className="w-full h-48 object-cover" />
                    ) : (
                      <p className="text-gray-500">No image available</p>
                    )}
                    {editing && (
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, image.key)}
                        className="mt-2"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Edit and Update Button */}
            <div className="flex justify-end space-x-4">
              {editing ? (
                <>
                  <button onClick={handleUpdate} className="px-4 py-2 bg-blue-500 text-white rounded-lg">
                    Update
                  </button>
                  <button onClick={() => setEditing(false)} className="px-4 py-2 bg-gray-300 text-black rounded-lg">
                    Cancel
                  </button>
                </>
              ) : (
                <button onClick={() => setEditing(true)} className="px-4 py-2 bg-yellow-500 text-white rounded-lg">
                  Edit
                </button>
              )}
            </div>
          </div>
        ) : (
          <p className="text-gray-500">Project not found.</p>
        )}
      </div>
    </div>
  );
};

const DetailItem = ({ label, value }) => {
  return (
    <div>
      <h3 className="text-sm font-medium text-gray-700">{label}</h3>
      <p className="text-gray-900">{value}</p>
    </div>
  );
};

export default ShowInteriorProject;
