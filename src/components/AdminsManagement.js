import React, { useState } from 'react';
import fakeData from '../assets/fakeData.json';

const AdminsManagement = () => {
  const [admins, setAdmins] = useState(fakeData.clinicUsers);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ username: '', password: '', clinic: { name: '', id: '' } });

  const handleAddAdmin = () => {
    setShowForm(true);
    setFormData({ username: '', password: '', clinic: { name: '', id: '' } });
  };

  const handleEditAdmin = (admin) => {
    setShowForm(true);
    setFormData(admin);
  };

  const handleDeleteAdmin = (adminId) => {
    const updatedAdmins = admins.filter(admin => admin.id !== adminId);
    setAdmins(updatedAdmins);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (formData.id) {
      setAdmins(admins.map(admin => (admin.id === formData.id ? formData : admin)));
    } else {
      setAdmins([...admins, { ...formData, id: `admin${admins.length + 1}` }]);
    }
    setShowForm(false);
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Manage Clinic Admins</h2>
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
            <th className="py-3 px-6 text-left">Clinic ID</th>
            <th className="py-3 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {admins.map((admin) => (
            <tr key={admin.id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-left">{admin.username}</td>
              <td className="py-3 px-6 text-left">{admin.clinic.name}</td>
              <td className="py-3 px-6 text-left">{admin.clinic.id}</td>
              <td className="py-3 px-6 text-center">
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded m-1"
                  onClick={() => handleEditAdmin(admin)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded m-1"
                  onClick={() => handleDeleteAdmin(admin.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showForm && (
        <form onSubmit={handleFormSubmit} className="mt-8 bg-gray-100 p-4 rounded shadow-md">
          <h3 className="text-xl font-bold mb-4">{formData.id ? 'Edit Admin' : 'Add Admin'}</h3>
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
            value={formData.clinic.name}
            onChange={(e) => setFormData({ ...formData, clinic: { ...formData.clinic, name: e.target.value } })}
            className="w-full p-2 border rounded"
            required
          />
          <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
            {formData.id ? 'Update Admin' : 'Add Admin'}
          </button>
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

export default AdminsManagement;
