import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import img1 from "../images/a.jpg";
import img2 from "../images/b.jpg";
import img3 from "../images/c.jpg";

const Caruosal = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
   
    setIndex(selectedIndex);
  };
  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "40px",
        marginBottom: "40px",
        
        maxWidth: "80rem",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <Carousel  fade activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item>
          <img src={img1} alt="AKDIWJQE"></img>
          <Carousel.Caption>
            <h3>FRESH ORANGES</h3>
            <p>Fresh oranges directly to your home from farm</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img src={img2} alt="AKDIWJQE"></img>
          <Carousel.Caption>
            <h3>VEGETABLES</h3>
            <p>Fresh vegetables directly to your home from farm</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img src={img3} alt="AKDIWJQE"></img>
          <Carousel.Caption>
            <h3>FRESH WATERMELON</h3>
            <p>Fresh watermelon directly to your home from farm</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default Caruosal;
