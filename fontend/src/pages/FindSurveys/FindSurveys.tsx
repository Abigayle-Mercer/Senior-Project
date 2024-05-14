import { useNavigate } from "react-router-dom";

function FindSurveys() {
  const navigate = useNavigate();
  const navigateToDashBoard = () => {
    navigate("/DashBoard");
  };
  return (
    <div>
      <p>THIS IS THE Find new Survyes page </p>
      <button onClick={navigateToDashBoard}>back</button>
    </div>
  );
}

export default FindSurveys;
