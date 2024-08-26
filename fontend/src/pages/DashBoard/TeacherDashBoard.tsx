import React, { useState } from "react";
import "./TeacherDashBoard.css";
import { useNavigate } from "react-router-dom";
import CreateNewClass from "../../components/CreateNewClass/CreateNewClass";

interface Student {
  name: string;
  status: string;
}

interface Survey {
  survey: string;
  description: string;
  date: string;
  class: string;
  status: string;
  students: Student[];
}

interface Class {
  classname: string;
  pastSurveys: Survey[];
}


function TeacherDashBoard() {
  const [isPanelVisible, setIsPanelVisible] = useState(false);
  const [showLikedSurveys, setShowLikedSurveys] = useState(false)
  const [showMySurveys, setShowMySurveys] = useState(false)
  const [selectedPastSurvey, setSelectedPastSurvey] = useState<Survey>({survey: "", description: "", date: "", class: "", status: "", students: []})
  const [selectedClass, setSelectedClass] = useState<Class>({ classname: "", pastSurveys: []});
  const [selectedSurvey, setSelectedSurvey] = useState<Survey | null>(null); // Track the selected survey
  



 

  
  const likedSurveys = [
    { survey: "Survey #1", description: "This survey is designed to show case your growth across multiple quarters dfsdafdsfdfad It highlights the following metacompetencies: thing1, thing2, thing3....etc. ", date: "10/01/2022", class: "", status: "", students: [] },
    { survey: "Survey #2", description: "This survey is designed to showcase your growth across multiple quarters.", date: "10/02/2022", class: "", status: "", students: [] },
    { survey: "Survey #3", description: "This survey is designed to showcase your growth across multiple quarters.", date: "10/03/2022", class: "", status: "", students: [] },
    { survey: "Survey #4", description: "This survey is designed to showcase your growth across multiple quarters.", date: "10/04/2022", class: "", status: "", students: [] },
    { survey: "Survey #5", description: "This survey is designed to showcase your growth across multiple quarters.", date: "10/05/2022", class: "", status: "", students: [] },
    { survey: "Survey #6", description: "This survey is designed to showcase your growth across multiple quarters.", date: "10/06/2022", class: "", status: "", students: [] }
  ];


  const classes = [
    {classname: "Class 1", pastSurveys: [{survey: "SURVEY 1234567", description: "", date: "10/2/2022", class: "AP BIO", status: "13/20", students: [{name: "abby mercer", status: "submitted"}, {name: "mike wisowski", status: "submitted"}, {name: "baylor Pond", status: "submitted"}, {name: "Riley Grubbs", status: "not submitted"}, {name: "Kayley Couch", status: "submitted"}, {name: "Ryan Beck", status: "not submitted"}, {name: "Jake Oconner", status: "submitted"}, {name: "Lila Williams", status: "submitted"}]}, {survey: "SURVEY 2", description: "", date: "9/24/2022", class: "SOCIAL STUDIES", status: "19/20", students: []}, {survey: "SURVEY 3", description: "", date: "12/5/2022", class: "HOME ROOM", status: "11/20", students: []}]},
    {classname: "Class 2", pastSurveys: [{survey: "SURVEY 1234567", description: "", date: "10/2/2022", class: "AP BIO", status: "32/32", students: []}]},
    {classname: "Class 3", pastSurveys: [{survey: "SURVEY 2", description: "", date: "19/20", class: "SOCIAL STUDIES", status: "5/25", students: []}, {survey: "SURVEY 3", description: "", date: "12/5/2022", class: "HOME ROOM", status: "23/25", students: []}]},
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

  const handleClassChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedClassName = event.target.value;
    const selectedClassObj = classes.find(cls => cls.classname === selectedClassName);
    setSelectedClass(selectedClassObj || {classname: "", pastSurveys: []});
    setSelectedPastSurvey({survey: "", description: "", date: "", class: "", status: "", students: []})
  };

  const handleSurveyClick = (survey: Survey) => {
    setSelectedPastSurvey(survey);
  };

  const handleSurveySelection = (survey: Survey) => {
    setSelectedSurvey(survey); // Track the selected survey
  };
  const handleAddSurvey = () => {
    if (selectedClass.classname && selectedSurvey) {
      // Add the selected survey to the current class's past surveys
      const updatedClass = {
        ...selectedClass,
        pastSurveys: [...selectedClass.pastSurveys, { ...selectedSurvey, class: selectedClass.classname, status: "0/20", date: new Date().toLocaleDateString() }]
      };
      setSelectedClass(updatedClass);

      // Optionally, update the classes array (if it's stored globally)
      // In this case, we're only updating the local selectedClass state.
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
            <select className="class-dropdown" onChange={handleClassChange}>
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
              <h2>Assign New Survey!</h2>
              <div className="survey-buttons">
                <button className="survey-button" onClick={() => {setShowLikedSurveys(true); setShowMySurveys(false); setSelectedSurvey(null);}}>Liked Surveys</button>
                <button className="survey-button" onClick={() => {setShowLikedSurveys(false); setShowMySurveys(true); setSelectedSurvey(null); }}>My Surveys</button>
              </div>

              {showLikedSurveys && (
              <div className="liked-surveys-card">
                <h3>Liked Surveys</h3>
                <div className="surveys-scroll">
                  <ul className="survey-list">
                    {likedSurveys.map((survey, index) => (
                      <li
                        key={index}
                        className={`survey-cell ${
                          (selectedSurvey && selectedSurvey.survey === survey.survey) ? "highlighted" : ""
                        }`}
                        onClick={() => handleSurveySelection(survey)}
                      >
                        <h4>{survey.survey}</h4>
                        <p>{survey.description}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            {showMySurveys && (
              <div className="liked-surveys-card">
                <h3>My Surveys</h3>
                <div className="surveys-scroll">
                  <ul className="survey-list">
                    {likedSurveys.map((survey, index) => (
                      <li
                        key={index}
                        className={`survey-cell ${
                          (selectedSurvey && selectedSurvey.survey == survey.survey) ? "highlighted" : ""
                        }`}
                        onClick={() => handleSurveySelection(survey)}
                      >
                        <h4>{survey.survey}</h4>
                        <p>{survey.description}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          <button className="submit-button" onClick={handleAddSurvey}>
              Submit
            </button>
            </div>
          
        </div>

        <div className="teacher-todo">
          <div className="past-surveys">
            <h2>Past Surveys</h2>

            <div className="past-surveys-list">
              <div className="past-surveys-header">
                <div className="past-surveys-cell header">Survey</div>
                <div className="past-surveys-cell header">Date</div>
                <div className="past-surveys-cell header">Status</div>
              </div>
              {selectedClass.pastSurveys.map((survey, index) => (
                <div key={index} className="past-surveys-row" onClick={() => handleSurveyClick(survey)}>
                  <div className="past-surveys-cell">{survey.survey}</div>
                  <div className="past-surveys-cell">{survey.date}</div>
                  <div className="past-surveys-cell">{survey.status}</div>
                </div>
              ))}
            </div>


          </div>
          
        </div>

        <div className="teacher-todo">
          <div className="selected-survey">
          <h2>{selectedPastSurvey.survey}</h2>
          <div className="past-surveys-list">
            <div className="survey-scroll">
            {selectedPastSurvey.students.map((student, index) => (
                <div key={index} className="past-surveys-row">
                  <div className="past-surveys-cell">{student.name}</div>
                 
                  <div className="past-surveys-cell">{student.status}</div>
                </div>
              ))}
              </div>

          </div>
          </div>

          
        </div>
       
      </div>
    </div>
  );
}

export default TeacherDashBoard;
