import React, { useState } from 'react';
import fakeData from '../assets/fakeData.json';

const ClinicsManagement = () => {
  const [clinics, setClinics] = useState(fakeData.clinicUsers.map(user => user.clinic));
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', id: '' });

  const handleAddClinic = () => {
    setShowForm(true);
    setFormData({ name: '', id: `clinic${clinics.length + 1}` });
  };

  const handleEditClinic = (clinic) => {
    setShowForm(true);
    setFormData(clinic);
  };

  const handleDeleteClinic = (clinicId) => {
    const updatedClinics = clinics.filter(clinic => clinic.id !== clinicId);
    setClinics(updatedClinics);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (formData.id) {
      setClinics(clinics.map(clinic => (clinic.id === formData.id ? formData : clinic)));
    } else {
      setClinics([...clinics, { ...formData, id: `clinic${clinics.length + 1}` }]);
    }
    setShowForm(false);
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Manage Clinics</h2>
      <button
        onClick={handleAddClinic}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Add New Clinic
      </button>
      <table className="table-auto w-full bg-white shadow-md rounded">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Clinic Name</th>
            <th className="py-3 px-6 text-left">Clinic ID</th>
            <th className="py-3 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {clinics.map((clinic) => (
            <tr key={clinic.id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-left">{clinic.name}</td>
              <td className="py-3 px-6 text-left">{clinic.id}</td>
              <td className="py-3 px-6 text-center">
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded m-1"
                  onClick={() => handleEditClinic(clinic)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded m-1"
                  onClick={() => handleDeleteClinic(clinic.id)}
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
          <h3 className="text-xl font-bold mb-4">{formData.id ? 'Edit Clinic' : 'Add Clinic'}</h3>
          <label className="block mb-2">Clinic Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
          <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
            {formData.id ? 'Update Clinic' : 'Add Clinic'}
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

export default ClinicsManagement;
