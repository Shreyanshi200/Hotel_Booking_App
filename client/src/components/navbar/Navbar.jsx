import "./navbar.css";
import { Link,useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
const Navbar = () => {
  const { user } = useContext(AuthContext);
  const navigate =useNavigate();
  const loginout=()=>{
    localStorage.clear();
    navigate("/login");
  }
  const RenderItem = ()=>{
    if(user){
      return(
        <div className="navItems">
        <span>{user.username}</span>
        <button className="navButton" onClick={loginout}>Logout</button>
        </div>
      )
    }else{
      return(
        <div className="navItems">
          <Link to="/register">
          <button className="navButton">Register</button>
          </Link>
          <Link to="/login">
          <button className="navButton" >Login</button>
          </Link>
        </div>
      )
      
    }
  }
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">HotelBooking</span>
        </Link>
        <RenderItem/>
      </div>
    </div>
  );
};

export default Navbar;