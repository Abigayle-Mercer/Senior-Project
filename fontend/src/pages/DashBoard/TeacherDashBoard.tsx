import React, { useState } from "react";
import "./TeacherDashBoard.css";
import { useNavigate } from "react-router-dom";
import CreateNewClass from "../../components/CreateNewClass/CreateNewClass";
import Navbar from "../../components/Navbar/Navbar";


function TeacherDashBoard() {
  const [isPanelVisible, setIsPanelVisible] = useState(false);

  const todos = [
    { survey: "SURVEY 1234567", data: "10/2/2022", class: "AP BIO", status: "not submitted" },
    { survey: "SURVEY 2", data: "9/24/2022", class: "SOCIAL STUDIES", status: "not submitted" },
    { survey: "SURVEY 3", data: "12/5/2022", class: "HOME ROOM", status: "not submitted" }
  ];

  const classes = [
    {classname: "Class 1"},
    {classname: "Class 2"},
    {classname: "Class 3"},
  ]

  const navigate = useNavigate();
  const navigateToStats = () => navigate("/Stats-Page");
  const navigateToFindSurveys = () => navigate("/FindSurveys-Page");
  const navigateToMakeSurveys = () => navigate("/MakeSurveys-Page");
  const navigateToPreviousResponses = () => navigate("/PreviousResponses-Page");

  const togglePanel = () => {
    setIsPanelVisible(!isPanelVisible);
  };

  const handleOverlayClick = (event: React.MouseEvent) => {
    if (event.currentTarget === event.target) {
      togglePanel();
    }
  };

  return (
    <div>
      <div className="container">
        <div className="card" style={{ backgroundColor: "#7bd9e3" }} onClick={navigateToStats}>
          <h2 className="title">Stats Page</h2>
        </div>
        <div className="card" style={{ backgroundColor: "#4fb2bd" }} onClick={navigateToPreviousResponses}>
          <h2 className="title">Previous Responses</h2>
        </div>
        <div className="card" style={{ backgroundColor: "#0e727d" }} onClick={navigateToFindSurveys}>
          <h2 className="title">Find New Surveys!</h2>
        </div>
        <div className="card" style={{ backgroundColor: "#094a63" }} onClick={navigateToMakeSurveys}>
          <h2 className="title">Make a new Survey!</h2>
        </div>
      </div>
      <div className="middle-content">
        <div className="add-class">
            <span>Classes:</span>
            <select className="class-dropdown">
            <option value="">Select a class</option>
            {classes.map((cls, index) => (
              <option key={index} value={cls.classname}>
                {cls.classname}
              </option>
            ))}
            </select>
            <button className="button-add" onClick={togglePanel}>+</button>
        </div>
    </div>


    {isPanelVisible && (
        <div className="overlay" onClick={handleOverlayClick}>
          <div className="sliding-panel" onClick={(e) => e.stopPropagation()}>
            <h2 className="panel-title">Create New Class</h2>
            <CreateNewClass />
          </div>
        </div>
      )}


      <div className="lower-content">
        <div className="teacher-todo">
            <div className="assign-survey">

            </div>
          
        </div>

        <div className="teacher-todo">
          
        </div>

        <div className="teacher-todo">
          
        </div>
       
      </div>
    </div>
  );
}

export default TeacherDashBoard;
