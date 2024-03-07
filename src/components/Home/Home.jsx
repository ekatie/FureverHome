import React from "react";
import DogList from "../DogList/DogList";
import { Link } from "react-router-dom";
import "./Home.scss";

function Home() {
  return (
    <section className="home-page">
      <div className="hero-section">
        <h1 className="page-title">Welcome to Furever Home</h1>
      </div>
      <DogList />
      <Link to="/dogs" className="lower-nav-link">
        View all dogs
      </Link>
    </section>
  );
}

export default Home;
