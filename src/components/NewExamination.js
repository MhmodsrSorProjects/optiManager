import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const NewExamination = () => {
    const { patientId } = useParams(); // This correctly captures the patientId from the URL
    
    const navigate = useNavigate();
    const BASE_URL = process.env.REACT_APP_API_BASE_URL;

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

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const fillData = () => {
        setFormData({
            dateOfEyeExamination: new Date().toISOString().slice(0, 10), // Today's date in YYYY-MM-DD format
            sphRightEye: `${(-2 + Math.random() * 4).toFixed(2)}`,
            sphLeftEye: `${(-2 + Math.random() * 4).toFixed(2)}`,
            cylRightEye: `${(-0.5 + Math.random()).toFixed(2)}`,
            cylLeftEye: `${(-0.5 + Math.random()).toFixed(2)}`,
            axRightEye: `${Math.floor(Math.random() * 180)}`,
            axLeftEye: `${Math.floor(Math.random() * 180)}`,
            pd: `${60 + Math.floor(Math.random() * 10)}`,
            prRightEye: `${(0.5 + Math.random()).toFixed(1)}`,
            prLeftEye: `${(0.5 + Math.random()).toFixed(1)}`,
            add: `+${(1 + Math.random()).toFixed(1)}`,
            koter: 'Normal',
            segment: `${8 + Math.floor(Math.random() * 5)} mm`,
            glassesType: 'Multifocal'
        });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post(`${BASE_URL}/api/patients/${patientId}/examinations`, formData);
            navigate('/home');
        } catch (error) {
            console.error('Failed to add examination:', error);
            setError('Failed to add examination. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-3xl font-bold mb-4">New Eye Examination</h1>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <button
                        type="button"
                        onClick={fillData}
                        className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                    >
                        Fill Data
                    </button>
                    {Object.entries(formData).map(([key, value]) => (
                        <div key={key}>
                            <label className="block mb-2 text-sm font-bold">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</label>
                            <input
                                type={key.includes('Date') ? 'date' : 'text'}
                                name={key}
                                value={value}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                    ))}
                </div>
                <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
                    {loading ? 'Saving...' : 'Save Examination'}
                </button>
            </form>
        </div>
    );
};

export default NewExamination;
