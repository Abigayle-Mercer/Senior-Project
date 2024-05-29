import "./HomePage.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../components/useAuth/useAuth";



function HomePage() {
     const navigate = useNavigate();
     const navigateToLogin = () => {
       navigate("/Login-Page");
     };

    //const { logout } = useAuth();
    //logout();


  
    
  return (
    <div className="home">
      <div className="title"> Welcome to Digital SEL!</div>
      <div className="options">
        <div className="button-wrapper">
          <input
            onClick={navigateToLogin}
            className="button"
            type="submit"
            value="I am a Teacher!"
          />
        </div>
      </div>
    </div>
  );
}
export default HomePage;
