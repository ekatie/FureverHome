import React from "react";
import FavIcon from "../FavIcon/FavIcon";
import "./FavButton.scss";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { toggleFavouriteAsync } from "../../features/dogSlice";

const FavButton = ({ selected, dogId }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleToggleFavourite = () => {
    if (!user) {
      // If user is not logged in, display a toast message
      toast.warn("You must be logged in to favourite dogs.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      // If user is logged in, dispatch the action to toggle the favorite status
      dispatch(toggleFavouriteAsync({ dogId, userId: user.id }));
    }
  };

  return (
    <div className="fav-button" onClick={handleToggleFavourite}>
      <FavIcon selected={selected} />
    </div>
  );
};

export default FavButton;
