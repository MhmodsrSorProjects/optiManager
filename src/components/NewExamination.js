import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const NewExamination = () => {
    console.log("NewExamination");
    const { state } = useLocation();
    const navigate = useNavigate();
    const { user } = state;
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

        // here i want to add the backend.
        console.log('New Examination Data:', formData);
        navigate('/');
    };

    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-3xl font-bold mb-4">New Eye Examination for {user.patientName}</h1>
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
                    <div>
                        <label className="block mb-2 text-sm font-bold">Sph (R)</label>
                        <input
                            type="text"
                            name="sphRightEye"
                            value={formData.sphRightEye}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
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
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-bold">CYL (R)</label>
                        <input
                            type="text"
                            name="cylRightEye"
                            value={formData.cylRightEye}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
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
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-bold">AX (R)</label>
                        <input
                            type="text"
                            name="axRightEye"
                            value={formData.axRightEye}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
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
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-bold">PD</label>
                        <input
                            type="text"
                            name="pd"
                            value={formData.pd}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-bold">PR (R)</label>
                        <input
                            type="text"
                            name="prRightEye"
                            value={formData.prRightEye}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
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
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-bold">ADD</label>
                        <input
                            type="text"
                            name="add"
                            value={formData.add}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-bold">Koter</label>
                        <input
                            type="text"
                            name="koter"
                            value={formData.koter}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-bold">Segment</label>
                        <input
                            type="text"
                            name="segment"
                            value={formData.segment}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-bold">Glasses Type</label>
                        <input
                            type="text"
                            name="glassesType"
                            value={formData.glassesType}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
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
