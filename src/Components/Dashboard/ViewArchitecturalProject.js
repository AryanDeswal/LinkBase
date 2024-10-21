import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa'; // Import icons

const ViewArchitecturalProject = () => {
  const [projectData, setProjectData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage] = useState(3); // Show only 3 projects per page

  // State for editing
  const [editingProject, setEditingProject] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', clientName: '', projectType: '', siteAddress: '', gstNo: '' });

  // Fetch architectural project data from API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://localhost:3001/account');
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        const data = await response.json();
        setProjectData(data); // Set project data from API
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Calculate total pages and slice the project data for the current page
  const totalProjects = projectData.length;
  const totalPages = Math.ceil(totalProjects / projectsPerPage);
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projectData.slice(indexOfFirstProject, indexOfLastProject);

  // Function to handle delete operation
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this project?");
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:3001/account/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Failed to delete the project');
        }
        // Remove deleted project from state
        setProjectData(projectData.filter(project => project._id !== id));
      } catch (err) {
        setError(err.message);
      }
    }
  };

  // Function to handle edit operation
  const handleEdit = (project) => {
    setEditingProject(project);
    setEditForm({
      title: project.title,
      clientName: project.clientName,
      projectType: project.projectType,
      siteAddress: project.siteAddress,
      gstNo: project.gstNo,
    });
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:3001/account/${editingProject._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm),
      });
      if (!response.ok) {
        throw new Error('Failed to update the project');
      }
      // Update the project data in state
      const updatedProject = await response.json();
      setProjectData(projectData.map(project => (project._id === updatedProject._id ? updatedProject : project)));
      setEditingProject(null);
      setEditForm({ title: '', clientName: '', projectType: '', siteAddress: '', gstNo: '' }); // Clear the form
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">View Architectural Projects</h2>

      {/* Edit Project Form */}
      {editingProject && (
        <div className="mb-6 p-4 bg-gray-100 rounded">
          <h3 className="text-lg font-bold mb-2">Edit Project</h3>
          <input
            type="text"
            value={editForm.title}
            onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
            placeholder="Title"
            className="border p-2 mb-2 w-full"
          />
          <input
            type="text"
            value={editForm.clientName}
            onChange={(e) => setEditForm({ ...editForm, clientName: e.target.value })}
            placeholder="Client Name"
            className="border p-2 mb-2 w-full"
          />
          <input
            type="text"
            value={editForm.projectType}
            onChange={(e) => setEditForm({ ...editForm, projectType: e.target.value })}
            placeholder="Project Type"
            className="border p-2 mb-2 w-full"
          />
          <input
            type="text"
            value={editForm.siteAddress}
            onChange={(e) => setEditForm({ ...editForm, siteAddress: e.target.value })}
            placeholder="Site Address"
            className="border p-2 mb-2 w-full"
          />
          <input
            type="text"
            value={editForm.gstNo}
            onChange={(e) => setEditForm({ ...editForm, gstNo: e.target.value })}
            placeholder="GST No"
            className="border p-2 mb-2 w-full"
          />
          <button onClick={handleUpdate} className="px-4 py-2 bg-green-500 text-white rounded">
            Update Project
          </button>
          <button onClick={() => setEditingProject(null)} className="px-4 py-2 bg-red-500 text-white rounded ml-2">
            Cancel
          </button>
        </div>
      )}

      {/* Project List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {currentProjects.map((project) => (
          <div key={project._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-4">
              <h3 className="text-lg font-bold mb-2">{project.title}</h3>
              <p className="text-gray-600 mb-1">Client Name: {project.clientName}</p>
              <p className="text-gray-600 mb-1">Project Type: {project.projectType}</p>
              <p className="text-gray-600 mb-1">Site Address: {project.siteAddress}</p>
              <p className="text-gray-600 mb-1">GST No: {project.gstNo}</p>
             
              {/* Display images if they exist */}
              {project.Presentation_Drawing_1 && (
                <img 
                  src={project.Presentation_Drawing_1} 
                  alt="Presentation Drawing 1" 
                  className="w-full h-48 object-cover mt-2 rounded"
                />
              )}
              {project.Submission_Drawing && (
                <img 
                  src={project.Submission_Drawing} 
                  alt="Submission Drawing" 
                  className="w-full h-48 object-cover mt-2 rounded"
                />
              )}
              {project.toilet && (
                <img 
                  src={project.toilet} 
                  alt="Toilet Drawing" 
                  className="w-full h-48 object-cover mt-2 rounded"
                />
              )}
            </div>
            {/* Action Buttons */}
            <div className="flex justify-between p-4">
              <button onClick={() => handleEdit(project)} className="px-4 py-2 text-yellow-500 hover:text-yellow-700">
                <FaEdit /> {/* Edit icon */}
              </button>
              <button onClick={() => handleDelete(project._id)} className="px-4 py-2 text-red-500 hover:text-red-700">
                <FaTrashAlt /> {/* Delete icon */}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        <button 
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
          disabled={currentPage === 1} 
          className="px-4 py-2 bg-blue-500 text-white rounded-l"
        >
          Previous
        </button>
        
        <span className="px-4 py-2 bg-gray-200 text-gray-700">{currentPage} / {totalPages}</span>
        
        <button 
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
          disabled={currentPage === totalPages} 
          className="px-4 py-2 bg-blue-500 text-white rounded-r"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ViewArchitecturalProject;
