import React from "react";
import "./DogImage.scss";

const DogImage = ({ name, imageUrl }) => {
  return (
      <img  className="dog-image" src={imageUrl} alt={name} />
  );
};

export default DogImage;
