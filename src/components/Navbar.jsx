import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { appContext } from "../App";
const Navbar = () => {
  const { mode, setMode, login, setLogin, cart } = useContext(appContext);
  const [cartcount, setCartcount] = useState(0);
  useEffect(() => {
    let count = 0;

    for (let i in cart) {
      const temp = cart[i];
      count = count + temp["count"];
    }

    setCartcount(count);
  }, [cart]);

  return (
    <div className="Navbarcontainer">
      <div className="Navbaritem">
        <Link to="/" className="navbarlink">
          HOME
        </Link>
      </div>
      <div className="Navbaritem" style={{ flex: 1 }}>
        {" "}
        <Link className="navbarlink" to="/aboutme">
          ABOUT PROJECT
        </Link>
      </div>
      <div className="Navbaritem">
      
           <Link to="/cart" className="navbarlink">
         CART  <span style={{ color: "red" }}>{cartcount}</span>
        </Link>
          
       
      </div>
      {login === "false" ? (
        <>
          {" "}
          <div className="Navbaritem">
            {" "}
            <Link className="navbarlink" to="/login">
              LOGIN
            </Link>
          </div>
          <div className="Navbaritem">
            {" "}
            <Link className="navbarlink" to="/register">
              REGISTER
            </Link>
          </div>
        </>
      ) : (
        <>
          {" "}
          <div className="Navbaritem">
            {" "}
            <Link className="navbarlink" to="/myorders">
              MY ORDERS
            </Link>
          </div>
          <div className="Navbaritem">
            {" "}
            <button
              style={{
                backgroundColor: "black",
                color: "rgb(189, 183, 183)",
                border: "0px",
              }}
              onClick={(e) => {
                localStorage.removeItem("loggedIn");
                localStorage.removeItem("mail")
                setLogin("false");
              }}
            >
              LOGOUT
            </button>
          </div>
        </>
      )}
      <div className="Navbaritem Navbaritem3">
        <button
          className="navbarbutton"
          onClick={(e) => {
            mode === "DARK" ? (
              <>
                {setMode("LIGHT")}
                {localStorage.setItem("mode", true)}
              </>
            ) : (
              <>
                {" "}
                {localStorage.removeItem("mode")}
                {setMode("DARK")}
              </>
            );
          }}
        >
          {" "}
          {mode === "DARK" ? "LIGHT" : "DARK"} MODE
        </button>
      </div>
    </div>
  );
};

export default Navbar;
