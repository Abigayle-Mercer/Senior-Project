import "./HomePage.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../components/useAuth/useAuth";



function HomePage() {
     const navigate = useNavigate();
     const navigateToTeacherLogin = () => {
       navigate("/Teacher-Login");
     };
     const navigateToStudentLogin = () => {
       navigate("/Student-Login");
     };

    //const { logout } = useAuth();
    //logout();


  
    
  return (
    <div className="home">
      <div className="title"> Welcome to Digital SEL!</div>
      <div className="options">
        <div className="button-wrapper">
          <input
            onClick={navigateToTeacherLogin}
            className="button"
            type="submit"
            value="I am a Teacher!"
          />
        </div>
        <div className="button-wrapper">
          <input
            onClick={navigateToStudentLogin}
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
