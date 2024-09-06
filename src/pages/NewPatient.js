import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../UserContext'; // Import the useUser hook

const NewPatient = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const [patientData, setPatientData] = useState({
    patientName: '',
    doctorName: '',
    phoneNumber: '',
    dateOfBirth: '',
    language: '',
    kupatCholim: '',
    gender: '',
    email: '',
  });

  // Function to generate random string
  const randomString = (length) => {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  // Function to fill form with random test data
  const fillData = () => {
    const randomName = `Patient ${randomString(5)}`;
    const randomDoctor = `Dr. ${randomString(5)}`;
    const randomEmail = `${randomString(7)}@gmail.com`;
    const randomPhone = `123-456-${Math.floor(1000 + Math.random() * 9000)}`;
    const randomDateOfBirth = `19${Math.floor(70 + Math.random() * 30)}-01-01`;
    const randomLanguage = ['Hebrew', 'Arabic', 'English'][Math.floor(Math.random() * 3)];
    const randomKupatCholim = ['ליאומית', 'כללית', 'מאוחדת', 'מכבי', 'Maccabi'][Math.floor(Math.random() * 5)];
    const randomGender = ['Male', 'Female'][Math.floor(Math.random() * 2)];

    setPatientData({
      patientName: randomName,
      doctorName: randomDoctor,
      phoneNumber: randomPhone,
      dateOfBirth: randomDateOfBirth,
      language: randomLanguage,
      kupatCholim: randomKupatCholim,
      gender: randomGender,
      email: randomEmail,
      eyeExaminations: [], // Ensure eyeExaminations starts as an empty array
    });
  };

  // Function to handle form submission
  const handleChange = (e) => {
    setPatientData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // API call to create a new patient
      const response = await axios.post(`${BASE_URL}/api/patients`, {
        ...patientData,
        userId: user._id  // Send the user ID if required by the backend
      });

      if (response.status === 201) {
        navigate('/home');
      }
    } catch (error) {
      console.error('Error adding new patient:', error);
    }
  };


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Create New Patient</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="patientName">
              Patient's Name
            </label>
            <input
              type="text"
              id="patientName"
              name="patientName"
              value={patientData.patientName}
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
              value={patientData.doctorName}
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
              value={patientData.phoneNumber}
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
              value={patientData.dateOfBirth}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={patientData.email}
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
              value={patientData.language}
              onChange={handleChange}  // make sure handleChange properly updates only the relevant part of the state
              className="w-full px-3 py-2 border rounded-md"
              required
            >
              <option value="">Select Language</option>
              <option value="Hebrew">Hebrew</option>
              <option value="Arabic">Arabic</option>
              <option value="English">English</option>
            </select>

          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="kupatCholim">
              קופת חולים
            </label>
            <select
              id="kupatCholim"
              name="kupatCholim"
              value={patientData.kupatCholim}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            >
              <option value="">Select קופת חולים</option>
              <option value="ליאומית">ליאומית</option>
              <option value="כללית">כללית</option>
              <option value="מאוחדת">מאוחדת</option>
              <option value="מכבי">מכבי</option>
              <option value="Maccabi">Maccabi</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gender">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={patientData.gender}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={fillData}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
            >
              Fill Data
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Create Patient
            </button>
            <Link
              to="/home"
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

export default NewPatient;
