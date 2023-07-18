import "./register.css";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from "axios";
import { useNavigate,NavLink } from "react-router-dom";

const Register = ({ inputs, title }) => {
  const navigate = useNavigate();
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "upload");
    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/daoiexk6p/image/upload",
        data
      );

      const { url } = uploadRes.data;

      const newUser = {
        ...info,
        isAdmin: false,
        img: url,
      };

      await axios.post("/auth/register", newUser);
      window.alert("Registration Successful!");
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  console.log(info);
  return (
    <div className="new">
      <div className="newContainer">
        <div className="top">
          <h1>Register Yourself!</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              <div className="formInput">
                <input
                  type="text"
                  placeholder="username"
                  id="username"
                  onChange={handleChange}
                />
                <input
                  type="email"
                  placeholder="email"
                  id="email"
                  onChange={handleChange}
                />
                <input
                  type="text"
                  placeholder="country"
                  id="country"
                  onChange={handleChange}
                />
                <input
                  type="text"
                  placeholder="city"
                  id="city"
                  onChange={handleChange}
                />
                <input
                  type="text"
                  placeholder="phone"
                  id="phone"
                  onChange={handleChange}
                />
                <input
                  type="password"
                  placeholder="password"
                  id="password"
                  onChange={handleChange}
                />
              </div>
              <button onClick={handleClick}>Send</button>
              <NavLink to="/login" style={{textDecoration:"None",color:"inherit"}}>I am already register!</NavLink>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
