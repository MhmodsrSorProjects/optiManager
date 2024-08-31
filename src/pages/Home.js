import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PatientFilter from '../components/PatientFilter';
import axios from 'axios';
import { useUser } from '../UserContext'; // Import the useUser hook

const Home = () => {
    const { user } = useUser(); // Get user from the context
    const [patients, setPatients] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [ageFilter, setAgeFilter] = useState('');
    const [genderFilter, setGenderFilter] = useState('');
    const [selectedPatients, setSelectedPatients] = useState([]);

    useEffect(() => {
        if (user) {
            // Fetch patients for the logged-in clinic admin
            axios.get(`http://localhost:3000/clinicUsers/${user.id}`)
                .then((response) => {
                    const clinicUser = response.data;
                    setPatients(clinicUser.patients || []);
                })
                .catch((error) => {
                    console.error('Error fetching patients:', error);
                });
        }
    }, [user]);

    const handleOpenClick = (patient) => {
        setSelectedPatient(patient);
    };

    const handleClose = () => {
        setSelectedPatient(null);
    };

    const calculateAge = (dateOfBirth) => {
        const dob = new Date(dateOfBirth);
        const diffMs = Date.now() - dob.getTime();
        const ageDt = new Date(diffMs);
        return Math.abs(ageDt.getUTCFullYear() - 1970);
    };

    const filteredPatients = patients.filter((patient) => {
        const matchesSearchTerm =
            patient.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            patient.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            patient.email.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesAgeFilter =
            ageFilter === '' || calculateAge(patient.dateOfBirth) === parseInt(ageFilter);

        const matchesGenderFilter =
            genderFilter === '' || patient.gender === genderFilter;

        return matchesSearchTerm && matchesAgeFilter && matchesGenderFilter;
    });

    const handleSelectPatient = (id) => {
        setSelectedPatients((prevSelected) =>
            prevSelected.includes(id)
                ? prevSelected.filter((selectedId) => selectedId !== id)
                : [...prevSelected, id]
        );
    };

    const handleSelectAll = () => {
        if (selectedPatients.length === filteredPatients.length) {
            setSelectedPatients([]);
        } else {
            setSelectedPatients(filteredPatients.map((patient) => patient.id));
        }
    };

    const isSelected = (id) => selectedPatients.includes(id);

    return (
        <div>
            <div className="container mx-auto mt-8">
                <h1 className="text-3xl font-bold mb-4">Patient Eye Examination Records</h1>

                <PatientFilter
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    ageFilter={ageFilter}
                    setAgeFilter={setAgeFilter}
                    genderFilter={genderFilter}
                    setGenderFilter={setGenderFilter}
                    selectedPatients={selectedPatients}
                    filteredPatients={filteredPatients}
                />

                <table className="table-auto w-full bg-white shadow-md rounded">
                    <thead>
                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-center">
                                <input
                                    type="checkbox"
                                    checked={selectedPatients.length === filteredPatients.length}
                                    onChange={handleSelectAll}
                                />
                            </th>
                            <th className="py-3 px-6 text-left">Patient's Name</th>
                            <th className="py-3 px-6 text-left">Doctor's Name</th>
                            <th className="py-3 px-6 text-left">Phone Number</th>
                            <th className="py-3 px-6 text-left">Email</th>
                            <th className="py-3 px-6 text-left">Date of Birth</th>
                            <th className="py-3 px-6 text-left">Age</th>
                            <th className="py-3 px-6 text-left">Gender</th>
                            <th className="py-3 px-6 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {filteredPatients.map((patient) => (
                            <tr key={patient.id} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6 text-center">
                                    <input
                                        type="checkbox"
                                        checked={isSelected(patient.id)}
                                        onChange={() => handleSelectPatient(patient.id)}
                                    />
                                </td>
                                <td className="py-3 px-6 text-left whitespace-nowrap">{patient.patientName}</td>
                                <td className="py-3 px-6 text-left">{patient.doctorName}</td>
                                <td className="py-3 px-6 text-left">{patient.phoneNumber}</td>
                                <td className="py-3 px-6 text-left">{patient.email}</td>
                                <td className="py-3 px-6 text-left">{patient.dateOfBirth}</td>
                                <td className="py-3 px-6 text-left">{calculateAge(patient.dateOfBirth)}</td>
                                <td className="py-3 px-6 text-left">{patient.gender}</td>
                                <td className="py-3 px-6 text-center">
                                    <button
                                        className="bg-blue-500 text-white px-4 py-2 rounded m-1"
                                        onClick={() => handleOpenClick(patient)}
                                    >
                                        Open
                                    </button>

                                    <Link
                                        to={`/new-examination/${patient.id}`}
                                        state={{ patient }}
                                        className="bg-green-500 text-white px-4 py-2 rounded m-1"
                                    >
                                        New Eye Examination
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {selectedPatient && (
                    <div className="mt-8">
                        <h2 className="text-2xl font-bold mb-4">{selectedPatient.patientName}'s Examination History</h2>
                        <button className="mb-4 bg-red-500 text-white px-4 py-2 rounded" onClick={handleClose}>
                            Close
                        </button>
                        <table className="table-auto w-full bg-white shadow-md rounded">
                            <thead>
                                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                    <th className="py-3 px-6 text-left">Date of Examination</th>
                                    <th className="py-3 px-6 text-left">Sph (R)</th>
                                    <th className="py-3 px-6 text-left">Sph (L)</th>
                                    <th className="py-3 px-6 text-left">CYL (R)</th>
                                    <th className="py-3 px-6 text-left">CYL (L)</th>
                                    <th className="py-3 px-6 text-left">AX (R)</th>
                                    <th className="py-3 px-6 text-left">AX (L)</th>
                                    <th className="py-3 px-6 text-left">PD</th>
                                    <th className="py-3 px-6 text-left">PR (R)</th>
                                    <th className="py-3 px-6 text-left">PR (L)</th>
                                    <th className="py-3 px-6 text-left">ADD</th>
                                    <th className="py-3 px-6 text-left">Koter</th>
                                    <th className="py-3 px-6 text-left">Segment</th>
                                    <th className="py-3 px-6 text-left">Glasses Type</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-600 text-sm font-light">
                                {selectedPatient.eyeExaminations.map((exam, index) => (
                                    <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                                        <td className="py-3 px-6 text-left whitespace-nowrap">{exam.dateOfEyeExamination}</td>
                                        <td className="py-3 px-6 text-left">{exam.sphRightEye}</td>
                                        <td className="py-3 px-6 text-left">{exam.sphLeftEye}</td>
                                        <td className="py-3 px-6 text-left">{exam.cylRightEye}</td>
                                        <td className="py-3 px-6 text-left">{exam.cylLeftEye}</td>
                                        <td className="py-3 px-6 text-left">{exam.axRightEye}</td>
                                        <td className="py-3 px-6 text-left">{exam.axLeftEye}</td>
                                        <td className="py-3 px-6 text-left">{exam.pd}</td>
                                        <td className="py-3 px-6 text-left">{exam.prRightEye}</td>
                                        <td className="py-3 px-6 text-left">{exam.prLeftEye}</td>
                                        <td className="py-3 px-6 text-left">{exam.add}</td>
                                        <td className="py-3 px-6 text-left">{exam.koter}</td>
                                        <td className="py-3 px-6 text-left">{exam.segment}</td>
                                        <td className="py-3 px-6 text-left">{exam.glassesType}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
