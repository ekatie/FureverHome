import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchDogAsync } from "../../features/dogSlice";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import "./DogDetails.scss";
import InstagramIcon from "@mui/icons-material/Instagram";
import FavButton from "../FavButton/FavButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDog } from "@fortawesome/free-solid-svg-icons";
import GaugeMeter from "./GaugeMeter";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { findDefaultImage } from "../../helpers/findDefaultImage";
import { toast } from "react-toastify";

function DogDetails() {
  const { id: dogId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dog = useSelector((state) =>
    state.dogs.dogs.find((dog) => dog.id.toString() === dogId)
  );
  const [expandedImg, setExpandedImg] = useState("");
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (!dog && dogId) {
      dispatch(fetchDogAsync(dogId));
    }
  }, [dogId, dispatch, dog]);

  useEffect(() => {
    if (
      dog &&
      dog.dog_images_attributes &&
      dog.dog_images_attributes.length > 0
    ) {
      setExpandedImg(findDefaultImage(dog));
    }
  }, [dog]);

  const handleImageClick = (imageUrl) => {
    setExpandedImg(imageUrl);
  };

  if (!dog) {
    return <div>Loading dog details...</div>;
  }

  const getSizeCategory = (size) => {
    if (size >= 0 && size <= 19) return 0; // Tiny
    if (size >= 20 && size <= 29) return 1; // Small
    if (size >= 30 && size <= 49) return 2; // Medium
    if (size >= 50 && size <= 90) return 3; // Large
    if (size >= 91) return 4; // Giant
    return -1; // Default, in case it doesn't fit any category
  };

  const dogSizeCategory = getSizeCategory(dog.size);

  const handleClickApply = () => {
    if (!user) {
      // If user is not logged in, display a toast message
      toast.warn("You must be logged in to apply for adoption.", {
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
      // If user is logged in, redirect to the application form
      navigate(`/application`);
    }
  };

  return (
    <article className="dog-details">
      <div className="page-header">
        <div className="header-flex-container">
          <ArrowBackIcon className="back-icon" onClick={() => navigate(-1)} />
          <div className="title-fav-container">
            <h1 className="page-title">{dog.name}</h1>
            <FavButton isFavourite={dog.is_favourite} dogId={dog.id} />
          </div>
          <button className="apply-button" onClick={() => handleClickApply()}>
            Apply
          </button>
        </div>
      </div>

      <div className="top-section">
        <div className="basic-info">
          <p className="detail-label">Age:</p>
          <p className="detail-text">{Math.floor(dog.age)} years</p>
          <p className="detail-label">Breed: </p>
          <p className="detail-text">{dog.breed}</p>
          <p className="detail-label">Sex:</p>
          <p className="detail-text">
            {dog.sex === "Female" ? (
              <FemaleIcon className="sex-icon" />
            ) : (
              <MaleIcon className="sex-icon" />
            )}{" "}
            {/* {dog.sex} */}
          </p>
          <p className="detail-label">Size: </p>
          <p className="detail-text">
            {[0, 1, 2, 3, 4].map((_, index) => (
              <FontAwesomeIcon
                key={index}
                icon={faDog}
                style={{
                  fontSize: `${1 + index * 0.2}em`,
                  marginRight: "10px",
                  color: index === dogSizeCategory ? "#f0a500" : "black",
                }}
              />
            ))}
            {dog.size} lbs
          </p>
          <p className="detail-label">Energy Level: </p>
          <div className="detail-text">
            <div className="dog-energy-level">
              <GaugeMeter level={dog.energy_level} />
            </div>
          </div>
          <p className="detail-label">Social Media: </p>
          <a href={dog.social_media_link} className="social-link">
            <InstagramIcon />
          </a>
        </div>

        <div className="container">
          <img src={expandedImg} alt="Expanded view" />
        </div>

        <div className="other-details">
          <p className="detail-label">Good With Dogs:</p>
          <p className="detail-text">{dog.good_with_dogs}</p>
          <p className="detail-label">Good With Cats:</p>
          <p className="detail-text">{dog.good_with_cats}</p>
          <p className="detail-label">Good With Children:</p>
          <p className="detail-text">{dog.good_with_kids}</p>
          <p className="detail-label">Medical Conditions:</p>
          <p className="detail-text">{dog.medical_conditions}</p>
          <p className="detail-label">Current Status: </p>
          <p className="detail-text">{dog.status}</p>
          <p className="detail-label">Foster Location:</p>
          <p className="detail-text">{dog.foster_location}</p>
          <p className="detail-label">Adoption Fee: </p>
          <p className="detail-text">${dog.adoption_fee}0</p>
        </div>
      </div>
      <div className="dog-photos">
        {dog.dog_images_attributes.map((image, index) => (
          <div
            className="column"
            key={index}
            onClick={() => handleImageClick(image.url)}
          >
            <img src={image.url} alt={`${dog.name} ${index + 1}`} />
          </div>
        ))}
      </div>
      <div className="description">
        {dog.description.split("\n\n").map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}

export default DogDetails;
