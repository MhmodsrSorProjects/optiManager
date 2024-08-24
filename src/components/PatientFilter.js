import React, { useState } from 'react';

const PatientFilter = ({ searchTerm, setSearchTerm, ageFilter, setAgeFilter, genderFilter, setGenderFilter, selectedPatients, filteredPatients }) => {
    const [emailMessage, setEmailMessage] = useState('');

    const handleEmailSend = () => {
        const selectedPatientEmails = filteredPatients
            .filter(patient => selectedPatients.includes(patient.patientID))
            .map(patient => patient.email)
            .join(', ');

        console.log('Sending email to:', selectedPatientEmails);
        console.log('Message:', emailMessage);
        // Here you would handle the email sending logic, e.g., via an API call.
    };

    return (
        <div className="mb-6">
            <div className="flex space-x-4">
                <input
                    type="text"
                    placeholder="Search by name, doctor, or ID"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-2 border rounded-md"
                />
                <input
                    type="text"
                    placeholder="Filter by age"
                    value={ageFilter}
                    onChange={(e) => setAgeFilter(e.target.value)}
                    className="w-full p-2 border rounded-md"
                />
                <select
                    value={genderFilter}
                    onChange={(e) => setGenderFilter(e.target.value)}
                    className="w-full p-2 border rounded-md"
                >
                    <option value="">Filter by gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
            </div>

            {selectedPatients.length > 0 && (
                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
                    <h3 className="text-lg font-bold mb-2">Send Email to Selected Patients</h3>
                    <textarea
                        placeholder="Enter your message here"
                        value={emailMessage}
                        onChange={(e) => setEmailMessage(e.target.value)}
                        className="w-full p-2 border rounded-md mb-4"
                        rows="4"
                    />
                    <button
                        onClick={handleEmailSend}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    >
                        Send Email
                    </button>
                </div>
            )}
        </div>
    );
};

export default PatientFilter;
