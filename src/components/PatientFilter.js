import React from 'react';

const PatientFilter = ({ searchTerm, setSearchTerm, ageFilter, setAgeFilter, genderFilter, setGenderFilter }) => {
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleAgeFilter = (e) => {
        setAgeFilter(e.target.value);
    };

    const handleGenderFilter = (e) => {
        setGenderFilter(e.target.value);
    };

    return (
        <div className="mb-4 flex space-x-4">
            <input
                type="text"
                placeholder="Search by name, doctor, or ID"
                value={searchTerm}
                onChange={handleSearch}
                className="w-full px-4 py-2 border rounded-md"
            />
            <input
                type="number"
                placeholder="Filter by age"
                value={ageFilter}
                onChange={handleAgeFilter}
                className="w-full px-4 py-2 border rounded-md"
            />
            <select
                value={genderFilter}
                onChange={handleGenderFilter}
                className="w-full px-4 py-2 border rounded-md"
            >
                <option value="">Filter by Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </select>
        </div>
    );
};

export default PatientFilter;
