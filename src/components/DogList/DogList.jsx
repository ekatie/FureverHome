import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchDogsAsync } from "../../features/dogSlice";
import { Link } from "react-router-dom";
import DogImage from "../DogImage/DogImage";

const DogsList = () => {
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
      {dogs.map((dog) => (
        <Link to={`/dogs/${dog.id}`}>
          <DogImage
            key={dog.id}
            name={dog.name}
            imageUrl={dog.defaultImageUrl}
          />
        </Link>
      ))}
    </div>
  );
};

export default DogsList;
