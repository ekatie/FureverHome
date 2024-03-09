import React from "react";
import "./About.scss";

function About() {
  return (
    <section className="about-page">
      <h1 className="page-title">About Us</h1>
      <div className="main-content">
        <div className="image-container">
          <img
            src="https://github.com/ekatie/FureverHome/blob/main/src/assets/selfie_1.png?raw=true"
            alt="dog-selfie"
          />
        </div>
        <p className="about-text">
          At Furever Home, we believe in the transformative power of the perfect
          match between a dog and their adopter. Our mission is not just about
          finding homes for dogs; it's about finding the right homes, filled
          with love, understanding, and companionship.
        </p>
        <p className="about-text">
          We understand that every dog is unique, with their own personality,
          needs, and quirks. That's why we take the time to get to know each dog
          in our care, so we can match them with the perfect family where they
          will truly thrive.
        </p>
        <div className="image-container">
          <img
            src="https://github.com/ekatie/FureverHome/blob/main/src/assets/running_2.png?raw=true"
            alt="running-dog"
          />
        </div>
        <div className="image-container">
          <img
            src="https://github.com/ekatie/FureverHome/blob/main/src/assets/selfie_2.png?raw=true"
            alt="dog-selfie"
          />
        </div>
        <p className="about-text">
          When you adopt from Furever Home, you're not just saving a life;
          you're gaining a loyal and loving companion who will bring endless joy
          and laughter into your home. There's something truly special about
          opening your heart and home to a rescue dog - the bond that forms is
          unlike any other.
        </p>
        <p className="about-text">
          Rescuing a dog is not just about giving them a second chance; it's
          also about the profound impact they have on our lives. Dogs have a
          remarkable ability to teach us about love, forgiveness, and
          resilience. They remind us to live in the moment and find joy in the
          simplest of pleasures.
        </p>
        <div className="image-container">
          <img
            src="https://github.com/ekatie/FureverHome/blob/main/src/assets/running_3.png?raw=true"
            alt="dog-running"
          />
        </div>
        <div className="image-container">
          <img
            src="https://raw.githubusercontent.com/ekatie/FureverHome/gh-pages/src/assets/selfie_3.png"
            alt="dog-selfie"
          />
        </div>
        <p className="about-text">
          By choosing to adopt from Furever Home, you're not only changing the
          life of a dog; you're also making a positive impact on the broader
          community. You're helping to alleviate the strain on overcrowded
          shelters, reduce the number of homeless pets, and promote responsible
          pet ownership.
        </p>
        <p className="about-text">
          The joy of having a dog in your life is immeasurable. From the wag of
          their tail to the warmth of their cuddles, dogs have a way of filling
          our lives with unconditional love and companionship. At Furever Home,
          we believe that every dog deserves to experience the love and security
          of a forever home - and we're dedicated to making that dream a
          reality, one adoption at a time.
        </p>
        <div className="image-container">
          <img
            src="https://ekatie.github.io/FureverHome/src/assets/running_4.png"
            alt="dog-running"
          />
        </div>
      </div>
    </section>
  );
}

export default About;
