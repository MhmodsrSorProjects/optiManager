import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HeaderSuperAdmin = ({ user, setUser }) => {
    const [dateTime, setDateTime] = useState(new Date());
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => setDateTime(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

    const formattedDate = dateTime.toLocaleDateString('en-US');
    const formattedTime = dateTime.toLocaleTimeString('en-US');

    const handleLogout = () => {
        setUser(null);
        navigate('/');
    };

    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <div className="text-xl font-bold flex items-center space-x-2">
                    <span className="text-blue-500">{formattedDate}</span>
                    <span className="text-green-500">{formattedTime}</span>
                </div>

                <div className="flex flex-col text-center items-center">
                    <a href="/" className="items-center">
                        <span className="self-center text-3xl font-bold whitespace-nowrap dark:text-white">OptiManager System</span>
                    </a>
                </div>

                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <button
                        type="button"
                        className="text-white m-1 bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                        onClick={handleLogout}
                    >
                        LOG OUT
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default HeaderSuperAdmin;
