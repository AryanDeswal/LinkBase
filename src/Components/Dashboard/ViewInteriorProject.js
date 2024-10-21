import React from 'react';

const ViewInteriorProject = () => {
  // Sample interior project data with Google image URLs
  const projectData = [
    {
      id: 1,
      name: 'Luxury Living Room',
      description: 'A stylish and comfortable living room design.',
      location: 'Miami, FL, USA',
      imageUrl: 'https://via.placeholder.com/400x300?text=Luxury+Living+Room',
    },
    {
      id: 2,
      name: 'Modern Kitchen',
      description: 'A sleek, modern kitchen with stainless steel appliances.',
      location: 'Dallas, TX, USA',
      imageUrl: 'https://via.placeholder.com/400x300?text=Modern+Kitchen',
    },
    {
      id: 3,
      name: 'Cozy Bedroom',
      description: 'A warm and inviting bedroom with natural lighting.',
      location: 'Seattle, WA, USA',
      imageUrl: 'https://via.placeholder.com/400x300?text=Cozy+Bedroom',
    },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">View Interior Projects</h2>
      
      {/* Project List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projectData.map((project) => (
          <div key={project.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img 
              src={project.imageUrl} 
              alt={project.name} 
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-bold mb-2">{project.name}</h3>
              <p className="text-gray-600 mb-3">{project.description}</p>
              <p className="text-gray-500 text-sm">📍 {project.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewInteriorProject;