import React from "react";
import DogList from "../DogList/DogList";
import { Link } from "react-router-dom";
import "./Home.scss";

function Home() {
  return (
    <section className="home-page">
      <div className="hero-image">
        <div className="hero-content">
          <h1 className="page-title">Welcome to Furever Home</h1>
          <h2>
            You can't buy happiness, but you can rescue it.
            <p>Find your new best friend today!</p>
          </h2>
          <Link to="/dogs" className="hero-button">
            Start Here
          </Link>
        </div>
      </div>
      <DogList />
      <Link to="/dogs" className="lower-nav-link">
        View all dogs
      </Link>
    </section>
  );
}

export default Home;
