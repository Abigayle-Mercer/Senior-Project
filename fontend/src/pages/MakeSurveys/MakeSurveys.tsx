import { useNavigate } from "react-router-dom";

function MakeSurveys() {
  const navigate = useNavigate();
  const navigateToDashBoard = () => {
    navigate("/DashBoard");
  };
  return (
    <div>
      <p>THIS IS THE Make New Surveys Page </p>
      <button onClick={navigateToDashBoard}>back</button>
    </div>
  );
}

export default MakeSurveys;
