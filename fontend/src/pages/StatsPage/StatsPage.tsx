import { useNavigate } from "react-router-dom";

function StatsPage() {
     const navigate = useNavigate();
     const navigateToDashBoard = () => {
       navigate("/DashBoard");
     };
     return (
        <div>
            <p>THIS IS THE STATS PAGE </p>
            <button onClick={navigateToDashBoard}>back</button>
        </div>
     )
    }


export default StatsPage;
