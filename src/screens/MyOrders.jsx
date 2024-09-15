import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { appContext } from "../App";
import "./MyOrder.css";
import { Link } from "react-router-dom";
const MyOrders = () => {
  const { mode } = useContext(appContext);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const getorderdata = async (mail) => {
      try {
        const res = await fetch(
          `https://farm-to-home-website-backend.onrender.com/api/myorders?mail=${mail}`
        );
        const json = await res.json();
        const data = json;

        data.reverse();
        setOrders(data);
      } catch (error) {
        console.log(error);
      }
    };
    getorderdata(localStorage.getItem("mail"));
  }, [localStorage.getItem("mail")]);
  return (
    <div className={`${mode}order`} style={{ minHeight: "100vh" }}>
      <Navbar> </Navbar>
      <div
        style={{
          textAlign: "center",
          marginTop: "30px",
        }}
      >
        {orders.length > 0 ? (
          <>
            <h5> YOUR ORDERS</h5>
            <div
              style={{ border: "1px solid grey", width: "70%", margin: "auto" }}
            >
              {orders.map((name) => {
                console.log(name);
                let date = name.date.split("GMT+0530 (India Standard Time)")[0];
                let data = name.data;
                return (
                  <>
                    <div
                      style={{
                        borderBottom: "1px solid grey",
                        width: "90%",
                        margin: "auto",
                        padding: "5px",
                        marginBottom: "10px",
                      }}
                    >
                      <div style={{ marginTop: "10px" }}>
                        {" "}
                        <h5>{date}</h5>
                      </div>
                      {Object.keys(data).map((items) => {
                        console.log("ITEMS", items);
                        return (
                          <>
                            <div
                              style={{ marginBottom: "10px", padding: "5px" }}
                            >
                              {" "}
                              <h5>
                                {data[items]["name"]} * {data[items]["count"]} =
                                Rs {data[items]["total"]}{" "}
                              </h5>
                            </div>
                          </>
                        );
                      })}
                    </div>
                  </>
                );
              })}
            </div>
          </>
        ) : (
          <>
            <h4 style={{ marginBottom: "20px" }}> NO ORDERS PLACED</h4>
            <button className={`${mode}button`}><Link style={{textDecoration:'none',color:mode=="DARK"?"white":"black"}}  to="/"> FIRST ORDER ?</Link></button>
          </>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
