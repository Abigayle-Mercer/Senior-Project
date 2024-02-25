import "./HomePage.css";
import { useNavigate } from "react-router-dom";



function HomePage() {
     const navigate = useNavigate();
     const navigateToTeacher = () => {
       navigate("/Teacher-Login");
     };
     const navigateToStudent = () => {
       navigate("/Student-Login");
     };
  return (
    <div className="home">
      <div className="title"> Welcome to Digital SEL!</div>
      <div className="options">
        <div className="button-wrapper">
          <input
            onClick={navigateToTeacher}
            className="button"
            type="submit"
            value="I am a Teacher!"
          />
        </div>
        <div className="button-wrapper">
          <input
            onClick={navigateToStudent}
            className="button"
            type="submit"
            value="I am a Student!"
          />
        </div>
      </div>
    </div>
  );
}
export default HomePage;
