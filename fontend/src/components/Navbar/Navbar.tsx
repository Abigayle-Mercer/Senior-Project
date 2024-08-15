import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css'; // Assuming your styles are in Navbar.css
import { useAuth } from "../useAuth/useAuth";

const Navbar = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const navigateToHome = () => {
        logout();
    };

    const navigateToDashboard = () => {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if (user.isTeacher) {
            navigate('/TeacherDashBoard');
        } else {
            navigate('/StudentDashBoard');
        }
    };

    return (
        <nav className="navbar">
            <ul className="nav-list">
                <li className="nav-item">
                    <button className="nav-button" onClick={navigateToHome}>Logout</button>
                </li>
                <li className="nav-item">
                    <button className="nav-button" onClick={navigateToDashboard}>Dashboard</button>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
