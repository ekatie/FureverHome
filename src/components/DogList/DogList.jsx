import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchDogsAsync } from "../../features/dogSlice";
import DogListItem from "../DogListItem/DogListItem";
import "./DogList.scss";
import { findDefaultImage } from "../../helpers/findDefaultImage";

const DogList = ({ limit, isHomePage }) => {
  const dispatch = useDispatch();
  const dogs = useSelector((state) => state.dogs.dogs);
  const status = useSelector((state) => state.dogs.status);

  useEffect(() => {
    dispatch(fetchDogsAsync());
  }, [dispatch]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }
  if (status === "failed") {
    return <div>Failed to load dogs</div>;
  }

  // Sort dogs alphabetically by name
  const sortedDogs = dogs.slice().sort((a, b) => a.name.localeCompare(b.name));
  const limitedDogs = limit ? sortedDogs.slice(0, limit) : sortedDogs;

  return (
    <div>
      <h1 className="page-title">Adoptable Dogs</h1>
      {!isHomePage && (
        <p className="adoptables">
          Welcome to our Adoptable Dogs page! Here, you'll find a heartwarming
          collection of furry friends eagerly waiting to become a loving
          addition to your family. Each of these dogs brings their own unique
          personality, story, and bundle of joy. Browse through, learn more
          about them, and perhaps you'll find your next loyal companion. Whether
          you're looking for a playful pup to bring energy into your home or a
          calm and comforting presence, your perfect match could be just a few
          clicks away. Let's embark on this beautiful journey together, one that
          leads to a furever home for these adorable canines.
        </p>
      )}
      <ul className="dog-list">
        {limitedDogs.map((dog) => (
          <DogListItem
            key={dog.id}
            id={dog.id}
            name={dog.name}
            imageUrl={findDefaultImage(dog)}
            isFavourite={dog.is_favourite}
          />
        ))}
      </ul>
    </div>
  );
};

export default DogList;
