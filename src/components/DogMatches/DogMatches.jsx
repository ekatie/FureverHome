import React from "react";
import "./DogMatches.scss";
import FavIcon from "../FavIcon/FavIcon";
import { useState } from "react";
import { confirmMatchAsync } from "../../features/applicationSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

const DogMatches = ({ matches, onSelectDog, applicationId }) => {
  const [selectedDogId, setSelectedDogId] = useState(null);
  const [hasReadProfile, setHasReadProfile] = useState(false);
  const dispatch = useDispatch();

  const handleSelectDog = (dogId) => {
    setSelectedDogId(dogId);
    onSelectDog(dogId);
    setHasReadProfile(false);
  };

  const sortedAndFilteredMatches = matches
    .filter((dog) => dog.match_percentage >= 50) // Filter dogs with at least 50% match
    .sort((a, b) => {
      // Sort by is_favourite descending
      if (a.is_favourite && !b.is_favourite) return -1;
      if (!a.is_favourite && b.is_favourite) return 1;

      // Sort by match_percentage descending
      return b.match_percentage - a.match_percentage;
    });

  const confirmMatch = () => {
    if (selectedDogId && applicationId) {
      dispatch(
        confirmMatchAsync({
          applicationId,
          dogId: selectedDogId,
          readProfile: hasReadProfile,
        })
      )
        .then(unwrapResult)
        .then((response) => {
          toast.success("Match confirmed!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        })
        .catch((error) => {
          console.error("Confirm match error:", error);
        });
    } else {
      toast.error("No dog selected.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <section className="dog-matches">
      <h2>Dog Matches</h2>
      <p>
        Please select a dog from your matches below to complete your adoption
        application.
      </p>
      <ul>
        {sortedAndFilteredMatches.map((dog) => (
          <li
            className={`dog-match-item ${dog.id === selectedDogId ? "selected" : ""}`}
            key={dog.id}
            onClick={() => handleSelectDog(dog.id)}
          >
            <img src={dog.default_image_url} alt={dog.name} />
            <div className="dog-info">
              <h3>{dog.name}</h3>
              {dog.is_favourite && <FavIcon selected={dog.is_favourite} />}
            </div>
            <div className="match-percent">
              <p className="match-value">{dog.match_percentage}%</p>
              <p className="match-text">Match</p>
            </div>
            {/* Additional dog details can be listed here */}
          </li>
        ))}
      </ul>
      {selectedDogId && (
        <div className="app-question">
          <p>Have you read the selected dog's adoption profile in full?</p>
          <div className="radio-group">
            <input
              id="read_profile_yes"
              type="radio"
              name="read_profile"
              onChange={() => setHasReadProfile(true)}
              checked={hasReadProfile === true}
            />
            <label htmlFor="read_profile_yes">Yes</label>
            <input
              id="read_profile_no"
              type="radio"
              name="read_profile"
              onChange={() => setHasReadProfile(false)}
              checked={hasReadProfile === false}
            />
            <label htmlFor="read_profile_no">No</label>
          </div>
        </div>
      )}
      <button className="application-btn" onClick={confirmMatch}>
        Confirm Match
      </button>
    </section>
  );
};

export default DogMatches;
