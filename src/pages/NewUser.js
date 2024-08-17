import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NewUser = () => {
  const [userData, setUserData] = useState({
    patientName: '',
    doctorName: '',
    patientID: '',
    phoneNumber: '',
    dateOfBirth: '',
    language: '',
    kupatCholim: '',
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you'd send this data to your backend server.
    console.log('New User Data:', userData);
    // Reset form
    setUserData({
      patientName: '',
      doctorName: '',
      patientID: '',
      phoneNumber: '',
      dateOfBirth: '',
      language: '',
      kupatCholim: '',
    });
    // Optionally, redirect to another page after submission
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Create New patient</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="patientName">
              Patient's Name
            </label>
            <input
              type="text"
              id="patientName"
              name="patientName"
              value={userData.patientName}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="doctorName">
              Doctor's Name
            </label>
            <input
              type="text"
              id="doctorName"
              name="doctorName"
              value={userData.doctorName}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="patientID">
              Patient ID
            </label>
            <input
              type="text"
              id="patientID"
              name="patientID"
              value={userData.patientID}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phoneNumber">
              Phone Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={userData.phoneNumber}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dateOfBirth">
              Date of Birth
            </label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={userData.dateOfBirth}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="language">
              Language
            </label>
            <select
              id="language"
              name="language"
              value={userData.language}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            >
              <option value="">Select Language</option>
              <option value="Hebrew">Hebrew</option>
              <option value="Arabic">Arabic</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="kupatCholim">
              קופת חולים
            </label>
            <select
              id="kupatCholim"
              name="kupatCholim"
              value={userData.kupatCholim}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            >
              <option value="">Select קופת חולים</option>
              <option value="ליאומית">ליאומית</option>
              <option value="כללית">כללית</option>
              <option value="מאוחדת">מאוחדת</option>
              <option value="מכבי">מכבי</option>
            </select>
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Create User
            </button>
            <Link
              to="/"
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewUser;