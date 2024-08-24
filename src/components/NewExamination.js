import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const NewExamination = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { patient } = location.state || {}; // Fallback to an empty object

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
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Handle form submission (e.g., sending data to the backend)
        console.log('New Examination Data:', formData);
        navigate('/');
    };

    // If no patient data is found in the state, show a warning message
    if (!patient || !patient.patientName) {
        return (
            <div className="container mx-auto mt-8">
                <h1 className="text-3xl font-bold mb-4">Patient Not Found</h1>
                <p>Please go back and select a patient.</p>
                <button
                    onClick={() => navigate('/')}
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
