import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { appContext } from "../App";
import "./Home.css";
import Caruosal from "../components/Caruosal";
import Card from "../components/Card";

const Home = () => {
  const { mode, setMode } = useContext(appContext);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getdata = async () => {
      try {
        const url = "https://farm-to-home-website-backend.onrender.com";
        const res = await fetch(url);
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.log(error);
      }
    };

    getdata();
  }, []);
  return (
    <>
      <Navbar />
      <div className={`${mode}home`}>
        <div>
          <Caruosal />
        </div>
        <div style={{ marginBottom: "20px", textAlign: "center" }}>
          <input
            style={{
              minWidth: "70%",
              minHeight: "40px",
              border: "0px",
              padding: "15px",
              borderRadius: "20px",
            }}
            onChange={(e) => {
              setSearch(e.target.value);
              console.log("SEARCH", search);
            }}
            type="search"
            placeholder="SEARCH FOR ITEM YOU WANT TO ORDER"
          ></input>
        </div>
        <div style={{ marginLeft: "20px" }}>
          <Card search={search} data={data} />
    
        </div>
      </div>

    </>
  );
};

export default Home;
