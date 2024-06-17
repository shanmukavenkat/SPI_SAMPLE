import React, { useState } from 'react';
import axios from 'axios';
import VVIT_logo from "./images/VVIT_logo.svg";
import st1 from "./images/st1.svg";
import st2 from "./images/st2.svg";
import students from "./images/students.svg";
import './App.css';

function App() {
    const [studentData, setStudentData] = useState(null);
    const [rollNumber, setRollNumber] = useState('');
    const [error, setError] = useState('');

    const performSearch = async () => {
        if (!rollNumber.trim()) {
            setError('Please enter a valid roll number');
            return;
        }

        try {
            const response = await axios.post(`http://192.186.1.236:5000/students/${rollNumber}`);
            setStudentData(response.data);
            setError('');
        } catch (error) {
            console.error('Error fetching student data:', error);
            setError('Error fetching student data. Please try again.');
            setStudentData(null);
        }
    };

    const handleInputChange = (e) => {
        setRollNumber(e.target.value);
        if (e.target.value === '') {
            setStudentData(null);
            setError('');
        }
    };

    return (
        <div className="container">
            <div className="row">
                <nav className="navbar">
                    <a className="navbar-brand" href="clg.html">
                        <img src={VVIT_logo} alt="logo" className="logo" />
                    </a>
                    <button className="btn btn-primary button_s text-right">LOGIN</button>
                </nav>
            </div>
            <div className="text-center">
                <h1 className="titles m-2">SPI</h1>
                <label>
                    <div className="col-12 col-md-12 col-xl-12 col-sm-12 col-lg-12 search-container w-auto">
                        <input
                            type="text"
                            placeholder="ENTER YOUR ROLL NUMBER"
                            name="search"
                            className="search-input"
                            value={rollNumber}
                            onChange={handleInputChange}
                        />
                        <button className="search-button" onClick={performSearch}>
                            <i className="fa-solid fa-magnifying-glass fa-bounce fa-lg"></i>
                        </button>
                    </div>
                </label>
                {!studentData && !error && (
                    <div className="d-flex flex-row justify-content-center">
                        <img src={st1} className="st1 mr-2 d-none d-sm-none d-md-block d-lg-block d-xl-block" alt="illustration" />
                        <img src={students} className="st3 d-none d-sm-none d-md-inline d-lg-block d-xl-block" alt="illustration" />
                        <img src={st2} className="st2 d-none d-sm-none d-md-inline d-lg-block d-xl-block" alt="illustration" />
                        <img src={students} className="st4 d-sm-block d-md-none d-lg-none d-xl-none pr-4" alt="illustration" />
                    </div>
                )}
            </div>
            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}
            {studentData && (
                <div className="table-container shadow-lg mt-3">
                    <table className="student-details-table">
                        <tbody>
                            <tr>
                                <th>STUDENT NAME:</th>
                                <td>{studentData.Name_of_the_Candidate}</td>
                            </tr>
                            <tr>
                                <th>REGD NO:</th>
                                <td>{studentData.rollNo}</td>
                            </tr>
                            <tr>
                                <th>BRANCH:</th>
                                <td>{studentData.branch}</td>
                            </tr>
                            <tr>
                                <th>SECTION:</th>
                                <td>{studentData.section}</td>
                            </tr>
                            <tr>
                                <th>1st Year SGPA (1):</th>
                                <td>{studentData['first_year_SGPA(1)']}</td>
                                <th>1st Year SGPA (2):</th>
                                <td>{studentData['first_year_SGPA(2)']}</td>
                            </tr>
                            <tr>
                                <th>2nd Year SGPA (1):</th>
                                <td>{studentData['second_year_SGPA(1)']}</td>
                                <th>2nd Year SGPA (2):</th>
                                <td>{studentData['second_year_SGPA(2)']}</td>
                            </tr>
                            <tr>
                                <th>3rd Year SGPA (1):</th>
                                <td>{studentData['third_year_SGPA(1)']}</td>
                                <th>3rd Year SGPA (2):</th>
                                <td>{studentData['third_year_SGPA(2)']}</td>
                            </tr>
                            <tr>
                                <th>4th Year SGPA (1):</th>
                                <td>{studentData['fourth_year_SGPA(1)']}</td>
                                <th>4th Year SGPA (2):</th>
                                <td>{studentData['fourth_year_SGPA(2)']}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default App;
