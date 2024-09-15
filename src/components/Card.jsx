import React, { useState, useEffect, useContext } from "react";
import img1 from "../images/a.jpg";
import "./Card.css";
import { appContext } from "../App";
const Card = (props) => {
  const [count, setCount] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const [quantities, setQuantities] = useState({}); // State to manage quantities
  const [added, setadded] = useState({});
  const [fooditem, setFooditem] = useState([]);
  const [foodcategory, setFoodcategory] = useState([]);
  const [search, setSearch] = useState("");
  const { mode, setMode, cart, setCart } = useContext(appContext);
  const [temp, setTemp] = useState(0);

  useEffect(() => {
    // Initialize quantities with default values
    const initialQuantities = {};

    if (props?.data["fooditem"]) {
      props.data["fooditem"].forEach((item) => {
        initialQuantities[item["_id"]] = 1; // Default quantity
      });
      setSearch(props.search);

      setFooditem(props.data["fooditem"]);
      setFoodcategory(props.data["category"]);

      setQuantities(initialQuantities);
    }
  }, [props]);

  const handleQuantityChange = (id, quantity) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: quantity,
    }));
  };

  useEffect(() => {
    let temp = 0;

    for (let i in cart) {
      const obj = cart[i];

      temp = temp + obj["count"];
    }

    setTemp(temp);

    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handeladdtocart = (e, id, computedPrice, name, price) => {
    e.preventDefault();

    if (id in cart) {
      const obj = cart[id];
      setCart((prevcart) => ({
        ...prevcart,
        [id]: {
          name: name,
          count: obj["count"] + quantities[id],
          price: price,
          total: obj["total"] + computedPrice,
        },
      }));
    } else {
      setCart((prevcart) => ({
        ...prevcart,
        [id]: {
          name: name,
          count: quantities[id],
          total: computedPrice,
          price: price,
        },
      }));
    }
    console.log("ADEED CHANGE FOR ", id);
    setadded({ [id]: true });
    setQuantities((quant) => ({ ...quant, [id]: 1 }));
  };

  useEffect(() => {
    setTimeout(() => {
      setadded({});
    }, 2000);
  }, [added]);

  return (
    <>
      {foodcategory.map((dataone) => {
        return (
          <>
            <h1 className={`${mode}heading`} style={{ textAlign: "center" }}>
              {dataone["categroyname"]}
            </h1>
            <div
              style={{
                display: "grid",

                gridTemplateColumns: "repeat(3,1fr)",
                gap: "60px",
                padding: "40px",
              }}
            >
              {fooditem.map((data) => {
                const quantity = quantities[data["_id"]] || 1; // Get the quantity for this item
                const computedPrice = data["price"] * quantity;

                return (
                  <>
                    {data["category"] === dataone["categroyname"] &&
                    data["name"]
                      .toLowerCase()
                      .includes(search.toLowerCase()) ? (
                      <>
                        <div
                          className={`${mode}card`}
                          key={data["_id"]}
                          style={{
                            border: "1px solid grey",
                            maxWidth: "25rem",
                            minHeight: "26rem",
                            display: "flex",
                            flexDirection: "column",
                            textAlign: "center",
                          }}
                        >
                          <img
                            src={data["img"]}
                            alt={data["name"]}
                            style={{
                              minWidth: "24.8rem",
                              maxWidth: "24.8rem",
                              minHeight: "15rem",
                              maxHeight: "15rem",
                              objectFit: "cover",
                            }}
                          />
                          <div>
                            <h4>{data["name"]}</h4>
                          </div>
                          <div>
                            <p>{data["desc"]}</p>
                          </div>
                          <div
                            style={{ display: "flex", marginBottom: "10px" }}
                          >
                            <div style={{ flex: 1 }}>
                              QUANTITY{" "}
                              <select
                                value={quantity}
                                onChange={(e) =>
                                  handleQuantityChange(
                                    data["_id"],
                                    parseInt(e.target.value)
                                  )
                                }
                                id={`${data["_id"]}select`}
                                style={{
                                  borderRadius: "5px",
                                  marginRight: "10px",
                                }}
                              >
                                {count.map((val) => (
                                  <option key={val} value={val}>
                                    {val}
                                  </option>
                                ))}
                              </select>
                              {"KG"}
                            </div>
                            <div style={{ flex: 1 }}>
                              PRICE {"  - "}
                              <span id={`${data["_id"]}price`}>
                                {computedPrice}
                              </span>
                            </div>
                          </div>
                          <div>
                            <button
                              style={{
                                borderRadius: "15px",
                                backgroundColor:
                                  mode === "DARK" ? "	#383838" : "white",
                                color: mode === "DARK" ? "white" : "black",

                                border: "0px",
                              }}
                              onClick={(e) => {
                                handeladdtocart(
                                  e,
                                  data["_id"],
                                  computedPrice,
                                  data["name"],
                                  data["price"]
                                );
                              }}
                            >
                              ADD TO CART
                            </button>
                          </div>
                          <span
                            style={{
                              display:
                                added[data["_id"]] === true ? "block" : "none",
                              color: "red",
                            }}
                          >
                            ADDED TO CART
                          </span>
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                );
              })}
            </div>
          </>
        );
      })}
    </>
  );
};

export default Card;
