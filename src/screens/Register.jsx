import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { appContext } from "../App";
import { useNavigate } from "react-router-dom";
import "./Register.css";
const Register = () => {
  const { mode } = useContext(appContext);
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handlechange = (e) => {
    e.preventDefault();
    setCredentials({ ...credentials, [e.target.id]: e.target.value });
    console.log(credentials);
  };
  const handleclick = async (e) => {
    e.preventDefault();

    const url = "http://localhost:3001/api/createuser";
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await res.json();
    console.log("JSON", json);

    if (json?.success === true) {
      {
        setCredentials({ name: "", email: "", password: "" });
        alert("USER CREATED");
        navigate("/login");
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
          <h3>SIGN UP FORM</h3>
        </div>
        <div style={{ display: "inline-flex", padding: "10px" }}>
          <h5 style={{ minWidth: "150px" }}>NAME : </h5>
          <input
            id="name"
            onChange={handlechange}
            value={credentials.name}
            style={{ flex: 1 }}
            type="text"
          />{" "}
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
            alignContent: "space-between",
          }}
        >
          {" "}
          <button
            style={{
              marginRight: "20px",
              backgroundColor: mode === "DARK" ? "	#383838" : "white",
              color: mode === "DARK" ? "white" : "black",
            }}
            onClick={handleclick}
          >
            SUBMIT
          </button>{" "}
          <button
            style={{
              backgroundColor: mode === "DARK" ? "	#383838" : "white",
              color: mode === "DARK" ? "white" : "black",
            }}
          >
            <Link
              to="/login"
              style={{ textDecoration: "none", color: mode==="DARK"?"white":"black" }}
            >
              {" "}
              ALREADY A USER ?{" "}
            </Link>
          </button>{" "}
        </div>
      </div>
    </div>
  );
};

export default Register;
