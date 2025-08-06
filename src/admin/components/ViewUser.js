import React, { useEffect, useState } from 'react';
import { FaTrashAlt, FaEye, FaEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ViewUsers = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [popupMessage, setPopupMessage] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const usersPerPage = 5;
  const token = window.sessionStorage.getItem('authorization');

  const fetchUsers = async () => {
    try {
      const response = await fetch('https://projectassociate-fld7.onrender.com/api/auth/users', {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }

      const data = await response.json();
      setUsers(data);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [token, navigate]);

  const handleEdit = (user) => {
    setEditingUser(user);
    setEditFormData(user);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://projectassociate-fld7.onrender.com/api/auth/users/${editingUser._id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(editFormData),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update user');
      }

      setUsers((prevUsers) =>
        prevUsers.map((user) => (user._id === editingUser._id ? editFormData : user))
      );
      setPopupMessage('User updated successfully!');
      setTimeout(() => setPopupMessage(''), 3000);
      setEditingUser(null);
    } catch (err) {
      console.error('Error updating user:', err);
      setPopupMessage(`Error: ${err.message}`);
      setTimeout(() => setPopupMessage(''), 3000);
    }
  };

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm) ||
      user.email.toLowerCase().includes(searchTerm)
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const response = await fetch(
          `https://projectassociate-fld7.onrender.com/api/auth/users/${userId}`,
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to delete user');
        }

        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));

        if (currentUsers.length === 1 && currentPage > 1) {
          setCurrentPage((prev) => prev - 1);
        }

        setPopupMessage('User deleted successfully!');
        setTimeout(() => setPopupMessage(''), 3000);
      } catch (err) {
        console.error('Error deleting user:', err);
        setPopupMessage(`Error: ${err.message}`);
        setTimeout(() => setPopupMessage(''), 3000);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {popupMessage && (
        <div className="fixed top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded shadow">
          {popupMessage}
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">View Users</h2>
        <div className="relative flex-1 md:flex-initial">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full table-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentUsers.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <img
                      className="h-10 w-10 rounded-full mr-3"
                      src={'/human-icon.png'}
                      alt={user.name}
                    />
                    <div>
                      <div className="font-medium text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.dob}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <div className="flex items-center text-sm text-gray-500">📧 {user.email}</div>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      📍 {user.address}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end space-x-4">
                    <button onClick={() => setSelectedUser(user)} className="text-blue-500">
                      <FaEye size={20} />
                    </button>
                    <button onClick={() => handleEdit(user)} className="text-green-500">
                      <FaEdit size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <FaTrashAlt size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">User Details</h2>
            <p><strong>Name:</strong> {selectedUser.name}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Date of Birth:</strong> {selectedUser.dob}</p>
            <p><strong>Phone Number:</strong> {selectedUser.phone}</p>
            <p><strong>Family Phone Number:</strong> {selectedUser.familyPhoneNumber}</p>
            <p><strong>Address:</strong> {selectedUser.address}</p>
            <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded" onClick={() => setSelectedUser(null)}>Close</button>
          </div>
        </div>
      )}

      <div className="mt-4 flex justify-center space-x-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
              }`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {editingUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Edit User</h2>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={editFormData.name}
              onChange={handleEditChange}
              className="w-full border p-2 mb-2"
              placeholder="Enter your name"
            />

            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={editFormData.email}
              onChange={handleEditChange}
              className="w-full border p-2 mb-2"
              placeholder="Enter your email"
            />

            <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={editFormData.dob ? new Date(editFormData.dob).toISOString().split("T")[0] : ""}
              onChange={handleEditChange}
              className="w-full border p-2 mb-2"
            />

            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="text"
              name="phone"
              value={editFormData.phone}
              onChange={handleEditChange}
              className="w-full border p-2 mb-2"
              placeholder="Enter your phone number"
            />

            <label className="block text-sm font-medium text-gray-700">Family Phone Number</label>
            <input
              type="text"
              name="familyPhoneNumber"
              value={editFormData.familyPhoneNumber}
              onChange={handleEditChange}
              className="w-full border p-2 mb-2"
              placeholder="Enter your family phone number"
            />

            <label className="block text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              name="address"
              value={editFormData.address}
              onChange={handleEditChange}
              className="w-full border p-2 mb-2"
              placeholder="Enter your address"
            />

            <button className="bg-blue-500 text-white px-4 py-2 mr-2" onClick={handleEditSubmit}>
              Save
            </button>
            <button className="bg-gray-500 text-white px-4 py-2" onClick={() => setEditingUser(null)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewUsers;
