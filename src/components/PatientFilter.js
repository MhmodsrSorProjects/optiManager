import axios from 'axios';
import React, { useState } from 'react';

const PatientFilter = ({
  searchTerm,
  setSearchTerm,
  ageFilter,
  setAgeFilter,
  genderFilter,
  setGenderFilter,
  filteredPatients,
  selectedPatients,
  handleSelectPatient,
  handleSelectAll
}) => {
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleEmailSend = () => {
    const selectedPatientEmails = filteredPatients
      .filter(patient => selectedPatients.includes(patient._id))
      .map(patient => patient.email);

    if (selectedPatientEmails.length > 0) {
      const emailData = {
        recipients: selectedPatientEmails,
        subject,
        message
      };

      sendEmails(emailData);
    } else {
      console.log('No patients selected or no emails available.');
    }
  };

  const sendEmails = async (emailData) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/email/send`, emailData);
      console.log('Email sent successfully:', response.data);
    } catch (error) {
      console.error('Failed to send email:', error);
    }
  };

  return (
    <div>
      <div className="flex space-x-4 mb-4">
        <input
          type="text"
          placeholder="Search by name, doctor, or email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Filter by age"
          value={ageFilter}
          onChange={(e) => setAgeFilter(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <select
          value={genderFilter}
          onChange={(e) => setGenderFilter(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">Filter by gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>

      <input
        type="text"
        placeholder="Email Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        className="w-full p-2 border rounded mb-2"
      />
      <textarea
        placeholder="Write your message here"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows="4"
        className="w-full p-2 border rounded mb-4"
      />
      <button onClick={handleEmailSend} className="bg-blue-500 text-white px-4 py-2 rounded">
        Send Email
      </button>
    </div>
  );
};

export default PatientFilter;
