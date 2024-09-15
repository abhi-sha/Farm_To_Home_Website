import React, { useContext, useEffect, useState } from "react";
import { appContext } from "../App";
import Navbar from "../components/Navbar";
import "./Cart.css";
import { useNavigate } from "react-router-dom";
const Cart = () => {
  const { cart, setCart, mode } = useContext(appContext);
  const [carttotal, setcarttotal] = useState(0);
  const [itemtotal, setitemtotal] = useState(0);
  const [mail, setmail] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("TOTAL CHANGED");
    var carttot = 0;
    var itemtot = 0;
    for (let i in cart) {
      const obj = cart[i];
      carttot = carttot + obj["total"];
      itemtot = itemtot + obj["count"];
    }
    setcarttotal(carttot);
    setitemtotal(itemtot);
  }, [cart]);

  useEffect(() => {
    if (localStorage.getItem("mail") != null)
      setmail(localStorage.getItem("mail"));
    else setmail(null);
  }, [localStorage.mail]);

  const handlecheckout = (e) => {
    const checkout = async (mail) => {
      try {
        const res = await fetch("http://localhost:3001/api/createorder", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cart: cart, mail: mail }),
        });
        const json = await res.json();
        if (json.success == true) {
          setCart({});
          localStorage.setItem("cart", JSON.stringify({}));
          alert("ORDER PLACED");
        }
        console.log(json);
      } catch (error) {
        console.log(error);
      }
    };

    if (mail === null) {
      alert("LOG IN TO PLACE ORDER");
      navigate("/login");
    } else checkout(mail);
  };

  const handleremove = (e) => {
    const id = e.target.id;
    const temp = { ...cart };
    delete temp[`${id}`];

    setCart(temp);
    localStorage.setItem("cart", JSON.stringify(temp));
  };

  return (
    <div className={`${mode}cart`} style={{ minHeight: "100vh" }}>
      <Navbar></Navbar>
      {Object.keys(cart).length == 0 ? (
        <>
          <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h2>CART EMPTY</h2>
          </div>
        </>
      ) : (
        <>
          <h2 style={{ textAlign: "center", marginTop: "50px" }}>
            ORDER TABLE
          </h2>
          <div
            style={{
              textAlign: "left",
              border: "grey 1px solid",
              width: "70%",
              margin: "auto",

              padding: "30px",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", marginBottom: "20px" }}>
                <div style={{ width: "40%", borderBottom: "1px solid grey" }}>
                  <h4> NAME</h4>
                </div>
                <div style={{ width: "20%", borderBottom: "1px solid grey" }}>
                  <h4> PRICE</h4>
                </div>
                <div
                  style={{
                    width: "20%",
                    borderBottom: "1px solid grey",
                    borderBottom: "1px solid grey",
                  }}
                >
                  <h4> QUANTITIY</h4>
                </div>
                <div style={{ width: "20%", borderBottom: "1px solid grey" }}>
                  <h4>COST</h4>
                </div>
              </div>
              {Object.keys(cart).map((ind, count) => {
                const temp = cart[ind];
                return (
                  <>
                    <div style={{ display: "flex", marginBottom: "20px" }}>
                      <div
                        style={{ width: "40%", borderBottom: "1px solid grey" }}
                      >
                        <h4>
                          {" "}
                          {count + 1}.{temp["name"]}
                        </h4>
                      </div>
                      <div
                        style={{ width: "20%", borderBottom: "1px solid grey" }}
                      >
                        {" "}
                        <h4> {temp["price"]}</h4>
                      </div>
                      <div
                        style={{ width: "20%", borderBottom: "1px solid grey" }}
                      >
                        {" "}
                        <h4> {temp["count"]} KG</h4>
                      </div>
                      <div
                        style={{ width: "10%", borderBottom: "1px solid grey" }}
                      >
                        {" "}
                        <h4> {temp["total"]}</h4>
                      </div>
                      <div
                        style={{ width: "10%", borderBottom: "1px solid grey" }}
                      >
                        {" "}
                        <button
                          id={ind}
                          onClick={handleremove}
                          style={{
                            backgroundColor:
                              mode === "DARK" ? "	#383838" : "white",
                            color: mode === "DARK" ? "white" : "black",
                            textAlign: "center",
                            alignItems: "center",
                          }}
                        >
                          REMOVE X
                        </button>
                      </div>
                    </div>
                  </>
                );
              })}
              <div style={{ display: "flex" }}>
                <div
                  style={{ width: "40%", borderBottom: "1px solid grey" }}
                ></div>
                <div style={{ width: "20%", borderBottom: "1px solid grey" }}>
                  <h4> TOTAL:</h4>
                </div>
                <div
                  style={{
                    width: "20%",
                    borderBottom: "1px solid grey",
                    borderBottom: "1px solid grey",
                  }}
                >
                  <h4> {itemtotal} KG</h4>
                </div>
                <div style={{ width: "20%", borderBottom: "1px solid grey" }}>
                  <h4> {carttotal}</h4>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              textAlign: "right",
              width: "60%",
              margin: "auto",
              marginTop: "20px",
            }}
          >
            <button
              style={{
                backgroundColor: mode === "DARK" ? "	#383838" : "white",
                color: mode === "DARK" ? "white" : "black",
              }}
              onClick={handlecheckout}
            >
              CHECKOUT
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
