import React from "react";
import "./DogListItem.scss";
import FavButton from "../FavButton/FavButton";
import { Link } from "react-router-dom";

const DogListItem = ({
  id,
  name,
  imageUrl,
  isFavourite,
  onToggleFavourite,
}) => {
  return (
    <li className="dog-list-item">
      <Link to={`/dogs/${id}`} className="dog-link">
        {name}
      </Link>
      <div className="dog-image-container">
        <img className="dog-image" src={imageUrl} alt={name} />
        <FavButton selected={isFavourite} dogId={id} />
      </div>
    </li>
  );
};

export default DogListItem;
