import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SuperAdminDashboard = ({ user, setUser }) => {
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const [view, setView] = useState('admins'); // Controls current view between 'admins' and 'clinics'
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({ username: '', password: '', name: '', id: '' });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/api/users`);
      const clinicAdmins = response.data.filter(user => user.role === 'clinicadmin');
      setAdmins(clinicAdmins);
    } catch (error) {
      setError('Failed to fetch data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle adding a new admin
  const handleAddAdmin = () => {
    setShowForm(true);
    setFormData({ username: '', password: '', name: '' });
  };

  // Handle editing an admin
  const handleEditAdmin = (admin) => {
    setShowForm(true);
    setFormData(admin);
  };

  // Handle deleting an admin
  const handleDeleteAdmin = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/api/users/${id}`); // Updated to backend route
      setAdmins(admins.filter(admin => admin._id !== id)); // Use _id if using MongoDB ObjectId
    } catch (error) {
      setError('Failed to delete admin. Please try again.');
    }
  };

  // Handle form submission for adding or editing an admin
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData._id) {
        // Update existing admin
        await axios.put(`${BASE_URL}/api/users/${formData._id}`, formData); // Use _id for MongoDB
        setAdmins(admins.map(admin => (admin._id === formData._id ? formData : admin)));
      } else {
        // Add new admin
        const response = await axios.post(`${BASE_URL}/api/users`, {
          ...formData,
          role: 'clinicadmin',
        });
        setAdmins([...admins, response.data]);
      }
      setShowForm(false);
    } catch (error) {
      setError('Failed to save admin data. Please try again.');
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Manage Clinic Admins</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <button
            onClick={handleAddAdmin}
            className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
          >
            Add New Admin
          </button>
          <table className="table-auto w-full bg-white shadow-md rounded">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Admin Username</th>
                <th className="py-3 px-6 text-left">Clinic Name</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {admins.map((admin) => (
                <tr key={admin._id} className="border-b border-gray-200 hover:bg-gray-100"> {/* Use _id for MongoDB */}
                  <td className="py-3 px-6 text-left">{admin.username}</td>
                  <td className="py-3 px-6 text-left">{admin.name}</td>
                  <td className="py-3 px-6 text-center">
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded m-1"
                      onClick={() => handleEditAdmin(admin)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded m-1"
                      onClick={() => handleDeleteAdmin(admin._id)} // Use _id for MongoDB
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showForm && (
        <form onSubmit={handleFormSubmit} className="mt-8 bg-gray-100 p-4 rounded shadow-md">
          <h3 className="text-xl font-bold mb-4">{formData._id ? 'Edit Admin' : 'Add Admin'}</h3> {/* Use _id for MongoDB */}
          <label className="block mb-2">Admin Username</label>
          <input
            type="text"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
          <label className="block mb-2 mt-4">Admin Password</label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
          <label className="block mb-2 mt-4">Clinic Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
          <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
            {formData._id ? 'Update Admin' : 'Add Admin'}
          </button> {/* Use _id for MongoDB */}
          <button
            type="button"
            className="mt-4 bg-gray-500 text-white px-4 py-2 rounded ml-4"
            onClick={() => setShowForm(false)}
          >
            Cancel
          </button>
        </form>
      )}
    </div>
  );
};

export default SuperAdminDashboard;
