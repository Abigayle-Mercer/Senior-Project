import { useNavigate } from "react-router-dom";

function PreviousResponses() {
  const navigate = useNavigate();
  const navigateToDashBoard = () => {
    navigate("/DashBoard");
  };
  return (
    <div>
      <p>THIS IS THE PREVIOUS RESPONSES PAGE </p>
      <button onClick={navigateToDashBoard}>back</button>
    </div>
  );
}

export default PreviousResponses;
