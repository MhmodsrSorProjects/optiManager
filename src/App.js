import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import NewExamination from './components/NewExamination';
import Header from './components/Header';
import Login from './pages/Login';
import NewUser from './pages/NewUser'; // Import the NewUser component
import './App.css';

const App = () => {
  const location = useLocation();
  const hideHeader = location.pathname === '/login';

  return (
    <div className="App ">
      {!hideHeader && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/new-examination/:id" element={<NewExamination />} />
        <Route path="/new-user" element={<NewUser />} /> {/* Add this line */}
      </Routes>
    </div>
  );
};

const AppWrapper = () => (
  <Router>
    <App/>
  </Router>
);

export default AppWrapper;