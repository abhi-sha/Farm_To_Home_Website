import React, { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import { appContext } from "../App";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();
  const { mode, login, setLogin } = useContext(appContext);

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handlechange = (e) => {
    e.preventDefault();
    setCredentials({ ...credentials, [e.target.id]: e.target.value });
  };
  const handleclick = async (e) => {
    e.preventDefault();

    const url = "https://farm-to-home-website-backend.onrender.com/api/loginuser";
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await res.json();

    if (json?.success === true) {
      {
        localStorage.setItem("loggedIn", true);
        localStorage.setItem("mail", credentials.email);
        setLogin(true);
        navigate("/");
      }
    } else {
      alert(json?.error[0]?.msg);
    }
  };
  return (
    <div className={`${mode}register`}>
      <Navbar></Navbar>
      <div
        className={`${mode}registerform`}
        style={{
          display: "flex",
          flexDirection: "column",

          width: "40%",
          margin: "auto",
          marginTop: "60px",
          padding: "20px",
          borderRadius: "20px",
        }}
      >
        <div style={{ textAlign: "center", padding: "10px" }}>
          <h3>LOGIN FORM</h3>
        </div>

        <div style={{ display: "inline-flex", padding: "10px" }}>
          <h5 style={{ minWidth: "150px" }}>EMAIL : </h5>
          <input
            id="email"
            onChange={handlechange}
            value={credentials.email}
            style={{ flex: 1 }}
            type="text"
          />{" "}
        </div>
        <div style={{ display: "inline-flex", padding: "10px" }}>
          <h5 style={{ minWidth: "150px" }}>PASSWORD : </h5>
          <input
            id="password"
            onChange={handlechange}
            value={credentials.password}
            style={{ flex: 1 }}
            type="password"
          />{" "}
        </div>
        <div
          style={{
            display: "inline-flex",
            padding: "10px",
            textAlign: "center",
          }}
        >
          {" "}
          <button style={{ marginRight: "20px", backgroundColor:mode==="DARK"?"	#383838":"white",
                                color:mode==="DARK"?"white":"black",}} onClick={handleclick}>
            SUBMIT
          </button>{" "}
          <button style={{backgroundColor:mode==="DARK"?"	#383838":"white",
                                color:mode==="DARK"?"white":"black",}}>
            <Link
              to="/register"
              style={{ textDecoration: "none", color:mode==="DARK"?"white":"black" }}
            >
              {" "}
              CREATE USER ?
            </Link>
          </button>{" "}
        </div>
      </div>
    </div>
  );
};

export default Register;
