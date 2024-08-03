import React from "react";
import "./DashBoard.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
function DashBoard() {



  const todos = [
    {survey: "SURVEY 1234567", data: "10/2/2022", class: "AP BIO", status: "not submitted"},
    {survey: "SURVEY 2", data: "9/24/2022", class: "SOCIAL STUDIES", status: "not submitted"},
    {survey: "SURVEY 3", data: "12/5/2022", class: "HOME ROOM", status: "not submitted"}

  ]


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

      <div className="lower-content">
        <div className="todo">
          <div className="todo-content">
            <h2>TODO: </h2>

            <div className="todo-list">
              {todos.map((todo, index) => (
                <div key={index} className="todo-cell">
                  <p>{todo.survey}</p>
                  <p>{todo.data}</p>
                  <p>{todo.class}</p>
                  <p>{todo.status}</p>
                </div>
              ))}
            </div>
            
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
    </div>
  );
}

export default DashBoard;
