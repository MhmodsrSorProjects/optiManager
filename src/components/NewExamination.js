import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../UserContext'; // Import the user context

const NewExamination = () => {
    const { id } = useParams(); // Get the patient ID from the URL
    const navigate = useNavigate();
    const { user } = useUser(); // Get the logged-in user from the context
    const [patient, setPatient] = useState(null); // State to store patient data
    const [formData, setFormData] = useState({
        dateOfEyeExamination: '',
        sphRightEye: '',
        sphLeftEye: '',
        cylRightEye: '',
        cylLeftEye: '',
        axRightEye: '',
        axLeftEye: '',
        pd: '',
        prRightEye: '',
        prLeftEye: '',
        add: '',
        koter: '',
        segment: '',
        glassesType: ''
    }); // State to handle form data
    const [loading, setLoading] = useState(true); // State to handle loading
    const [error, setError] = useState(''); // State to handle errors

    // Function to fill form with random test data
    const fillData = () => {
        setFormData({
            dateOfEyeExamination: '2024-01-15',
            sphRightEye: `${(-2 + Math.random()).toFixed(2)}`,
            sphLeftEye: `${(-1.5 + Math.random()).toFixed(2)}`,
            cylRightEye: `${(-0.5 + Math.random()).toFixed(2)}`,
            cylLeftEye: `${(-0.75 + Math.random()).toFixed(2)}`,
            axRightEye: `${Math.floor(Math.random() * 180)}`,
            axLeftEye: `${Math.floor(Math.random() * 180)}`,
            pd: `${60 + Math.floor(Math.random() * 10)}`,
            prRightEye: `${Math.random().toFixed(1)}`,
            prLeftEye: `${Math.random().toFixed(1)}`,
            add: `+${(1 + Math.random()).toFixed(1)}`,
            koter: 'Normal',
            segment: `${8 + Math.floor(Math.random() * 5)} mm`,
            glassesType: 'מולטיפוקל'
        });
    };

    useEffect(() => {
        // Fetch the patient data based on user ID and patient ID
        const fetchPatientData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/clinicUsers/${user.id}`);
                const clinicUser = response.data;
                const foundPatient = clinicUser.patients.find((p) => p.id.toString() === id);

                if (foundPatient) {
                    setPatient(foundPatient);
                } else {
                    setError('Patient not found.');
                }
            } catch (err) {
                console.error('Error fetching patient data:', err);
                setError('Error fetching patient data.');
            } finally {
                setLoading(false);
            }
        };

        fetchPatientData();
    }, [id, user.id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Add new examination to the patient's existing examinations
            const updatedPatient = { ...patient, eyeExaminations: [...patient.eyeExaminations, formData] };

            // Update the patient's data on the backend
            const updatedPatients = user.patients.map((p) => p.id.toString() === id ? updatedPatient : p);
            await axios.put(`http://localhost:3000/clinicUsers/${user.id}`, {
                ...user,
                patients: updatedPatients,
            });

            console.log('New Examination Data:', formData);
            navigate('/home'); // Navigate to home after successful submission
        } catch (err) {
            console.error('Error saving new examination:', err);
            setError('Error saving new examination. Please try again.');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return (
            <div className="container mx-auto mt-8">
                <h1 className="text-3xl font-bold mb-4">Error</h1>
                <p>{error}</p>
                <button
                    onClick={() => navigate('/home')}
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Go Back
                </button>
            </div>
        );
    }

    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-3xl font-bold mb-4">New Eye Examination for {patient.patientName}</h1>
            <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {/* Button to fill data */}
                    <button
                        type="button"
                        onClick={fillData}
                        className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                    >
                        Fill Data
                    </button>
                    {/* Date of Examination */}
                    <div>
                        <label className="block mb-2 text-sm font-bold">Date of Examination</label>
                        <input
                            type="date"
                            name="dateOfEyeExamination"
                            value={formData.dateOfEyeExamination}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    {/* Sph inputs side by side with background color */}
                    <div className="grid grid-cols-2 gap-4 bg-blue-50 p-3 rounded-md">
                        <div>
                            <label className="block mb-2 text-sm font-bold">Sph (R)</label>
                            <input
                                type="text"
                                name="sphRightEye"
                                value={formData.sphRightEye}
                                onChange={handleChange}
                                className="w-full p-2 border rounded text-sm"
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-bold">Sph (L)</label>
                            <input
                                type="text"
                                name="sphLeftEye"
                                value={formData.sphLeftEye}
                                onChange={handleChange}
                                className="w-full p-2 border rounded text-sm"
                                required
                            />
                        </div>
                    </div>
                    {/* CYL inputs side by side with background color */}
                    <div className="grid grid-cols-2 gap-4 bg-green-50 p-3 rounded-md">
                        <div>
                            <label className="block mb-2 text-sm font-bold">CYL (R)</label>
                            <input
                                type="text"
                                name="cylRightEye"
                                value={formData.cylRightEye}
                                onChange={handleChange}
                                className="w-full p-2 border rounded text-sm"
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-bold">CYL (L)</label>
                            <input
                                type="text"
                                name="cylLeftEye"
                                value={formData.cylLeftEye}
                                onChange={handleChange}
                                className="w-full p-2 border rounded text-sm"
                                required
                            />
                        </div>
                    </div>
                    {/* AX inputs side by side with background color */}
                    <div className="grid grid-cols-2 gap-4 bg-yellow-50 p-3 rounded-md">
                        <div>
                            <label className="block mb-2 text-sm font-bold">AX (R)</label>
                            <input
                                type="text"
                                name="axRightEye"
                                value={formData.axRightEye}
                                onChange={handleChange}
                                className="w-full p-2 border rounded text-sm"
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-bold">AX (L)</label>
                            <input
                                type="text"
                                name="axLeftEye"
                                value={formData.axLeftEye}
                                onChange={handleChange}
                                className="w-full p-2 border rounded text-sm"
                                required
                            />
                        </div>
                    </div>
                    {/* PD input */}
                    <div className="bg-pink-50 p-3 rounded-md">
                        <label className="block mb-2 text-sm font-bold">PD</label>
                        <input
                            type="text"
                            name="pd"
                            value={formData.pd}
                            onChange={handleChange}
                            className="w-full p-2 border rounded text-sm"
                            required
                        />
                    </div>
                    {/* PR inputs side by side with background color */}
                    <div className="grid grid-cols-2 gap-4 bg-purple-50 p-3 rounded-md">
                        <div>
                            <label className="block mb-2 text-sm font-bold">PR (R)</label>
                            <input
                                type="text"
                                name="prRightEye"
                                value={formData.prRightEye}
                                onChange={handleChange}
                                className="w-full p-2 border rounded text-sm"
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-bold">PR (L)</label>
                            <input
                                type="text"
                                name="prLeftEye"
                                value={formData.prLeftEye}
                                onChange={handleChange}
                                className="w-full p-2 border rounded text-sm"
                                required
                            />
                        </div>
                    </div>
                    {/* ADD input */}
                    <div className="bg-teal-50 p-3 rounded-md">
                        <label className="block mb-2 text-sm font-bold">ADD</label>
                        <input
                            type="text"
                            name="add"
                            value={formData.add}
                            onChange={handleChange}
                            className="w-full p-2 border rounded text-sm"
                            required
                        />
                    </div>
                    {/* Koter input */}
                    <div>
                        <label className="block mb-2 text-sm font-bold">Koter</label>
                        <input
                            type="text"
                            name="koter"
                            value={formData.koter}
                            onChange={handleChange}
                            className="w-full p-2 border rounded text-sm"
                        />
                    </div>
                    {/* Segment input */}
                    <div>
                        <label className="block mb-2 text-sm font-bold">Segment</label>
                        <input
                            type="text"
                            name="segment"
                            value={formData.segment}
                            onChange={handleChange}
                            className="w-full p-2 border rounded text-sm"
                        />
                    </div>
                    {/* Glasses Type input */}
                    <div>
                        <label className="block mb-2 text-sm font-bold">Glasses Type</label>
                        <input
                            type="text"
                            name="glassesType"
                            value={formData.glassesType}
                            onChange={handleChange}
                            className="w-full p-2 border rounded text-sm"
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Save Examination
                </button>
            </form>
        </div>
    );
};

export default NewExamination;
