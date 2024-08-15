import React from "react";
import "./StudentDashBoard.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

function DashBoard() {
  const todos = [
    { survey: "SURVEY 1234567", data: "10/2/2022", class: "AP BIO", status: "not submitted" },
    { survey: "SURVEY 2", data: "9/24/2022", class: "SOCIAL STUDIES", status: "not submitted" },
    { survey: "SURVEY 3", data: "12/5/2022", class: "HOME ROOM", status: "not submitted" }
  ];

  const navigate = useNavigate();

  const handleSurveyClick = (todo: typeof todos[0]) => {
    navigate("/TakeSurvey", { state: { survey: todo } });
  };

  return (
    <div>
      <div className="container">
        <div className="s-card" style={{ backgroundColor: "#7bd9e3" }} onClick={() => navigate("/Stats-Page")}>
          <h2 className="title">Stats Page</h2>
        </div>
        <div className="s-card" style={{ backgroundColor: "#4fb2bd" }} onClick={() => navigate("/PreviousResponses-Page")}>
          <h2 className="title">Previous Responses</h2>
        </div>
        <div className="s-card" style={{ backgroundColor: "#0e727d" }} onClick={() => navigate("/FindSurveys-Page")}>
          <h2 className="title">Find New Surveys!</h2>
        </div>
      </div>

      <div className="lower-content">
        <div className="todo">
          <div className="todo-content">
            <h2>TODO:</h2>

            <div className="todo-list">
              <div className="todo-header">
                <div className="todo-cell header">Survey</div>
                <div className="todo-cell header">Date</div>
                <div className="todo-cell header">Class</div>
                <div className="todo-cell header">Status</div>
              </div>
              {todos.map((todo, index) => (
                <div key={index} className="todo-row" onClick={() => handleSurveyClick(todo)}>
                  <div className="todo-cell">{todo.survey}</div>
                  <div className="todo-cell">{todo.data}</div>
                  <div className="todo-cell">{todo.class}</div>
                  <div className="todo-cell">{todo.status}</div>
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
