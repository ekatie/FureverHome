import React from "react";

const DogImage = ({ name, imageUrl }) => {
  return (
    <div>
      <h2>{name}</h2>
      <img
        src={imageUrl}
        alt={name}
        style={{ width: "100%", height: "auto" }}
      />
    </div>
  );
};

export default DogImage;
