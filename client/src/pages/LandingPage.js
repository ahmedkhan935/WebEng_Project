// LandingPage.js
import React from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/Navbar";

const LandingPage = () => {
  const landingPageStyles = {
    textAlign: "center",
    marginTop: "50px",
    fontFamily: "Franklin Gothic Medium, Arial Narrow, Arial, sans-serif",
    backgroundColor: "rgb(255, 255, 255)",
    boxShadow: "0 4px 8px rgba(102, 118, 239, 0.836)",
    borderRadius: "8px",
    padding: "20px",
    maxWidth: "300px",
    margin: "auto",
    marginTop: "100px",
  };

  return (
    <div>
      <NavBar></NavBar>
    </div>
  );
};

export default LandingPage;
