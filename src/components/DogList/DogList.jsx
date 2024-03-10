import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchDogsAsync } from "../../features/dogSlice";
import DogListItem from "../DogListItem/DogListItem";
import "./DogList.scss";

const DogList = () => {
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

  return (
    <div>
      <h1 className="page-title">Adoptable Dogs</h1>
      <ul className="dog-list">
        {dogs.map((dog) => (
          <DogListItem
            key={dog.id}
            id={dog.id}
            name={dog.name}
            imageUrl={dog.default_image_url}
            isFavourite={dog.is_favourite}
          />
        ))}
      </ul>
    </div>
  );
};

export default DogList;
