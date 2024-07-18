import React from "react";
import "./DashBoard.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
function DashBoard() {



  const navigate = useNavigate();
  const navigateToStats = () => {
    navigate("/Stats-Page");
  };
  const navigateToFindSurveys = () => {
    navigate("/FindSurveys-Page");
  };
  const navigateToMakeSurveys = () => {
    navigate("/MakeSurveys-Page");
  };
  const navigateToPreviousResponses = () => {
    navigate("/PreviousResponses-Page");
  };
  return (
    <div>
      
      <div className="container">
        <div
          className="card"
          style={{ backgroundColor: "#7bd9e3" }}
          onClick={navigateToStats}
        >
          <h2 className="title"> Stats Page</h2>
        </div>
        <div
          className="card"
          style={{ backgroundColor: "#4fb2bd" }}
          onClick={navigateToPreviousResponses}
        >
          <h2 className="title">Previous Responses</h2>
        </div>
        <div
          className="card"
          style={{ backgroundColor: "#0e727d" }}
          onClick={navigateToFindSurveys}
        >
          <h2 className="title">Find New Surveys!</h2>
        </div>
        <div
          className="card"
          style={{ backgroundColor: "#094a63" }}
          onClick={navigateToMakeSurveys}
        >
          <h2 className="title">Make a new Survey!</h2>
        </div>
      </div>

      <div className="container2">
        <div className="resource">
          <h2 className="title"> Resource 1</h2>
        </div>
        <div className="resource">
          <h2 className="title">Resource 2</h2>
        </div>
      </div>
      <div className="container2">
        <div className="resource">
          <h2 className="title">Resource 3</h2>
        </div>
        <div className="resource">
          <h2 className="title">Resource 4</h2>
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
