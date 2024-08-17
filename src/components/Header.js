import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    const [dateTime, setDateTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => setDateTime(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

    // Format the date and time separately
    const formattedDate = dateTime.toLocaleDateString('en-US');
    const formattedTime = dateTime.toLocaleTimeString('en-US');

    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                {/* Date and Time */}
                <div className="text-xl font-bold flex items-center space-x-2">
                    <span className="text-blue-500">{formattedDate}</span>
                    <span className="text-green-500">{formattedTime}</span>
                </div>

                {/* Centered Logo */}

                <div className=' flex flex-col text-center items-center'>
                    <a href="/" className=" items-center">
                        <span className="self-center text-3xl font-bold whitespace-nowrap dark:text-white">OptiManager System</span>
                    </a>
                    <a href="/" className=" items-center">
                        <span className="self-center text-5xl font-bold whitespace-nowrap dark:text-white">name of Clinec</span>
                    </a>
                </div>
                {/* Buttons */}
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                        <Link to="/new-user" className="text-white m-1 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                            Create New patient
                        </Link>
                    <button
                        type="button"
                        className="text-white m-1 bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                    >
                        LOG OUT
                    </button>

                </div>
            </div>
        </nav>
    );
};

export default Header;

