import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchDogs } from "../../features/dogSlice";

const DogsList = () => {
  const dispatch = useDispatch();
  const { dogs, status, error } = useSelector((state) => state.dogs);

  useEffect(() => {
    dispatch(fetchDogs());
  }, [dispatch]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Dog Details</h1>
      {/* {dogs.map((dog) => (
        <div key={dog.id}>
          <Link to={`/dogs/${dog.id}`}>
            <h3>{dog.name}</h3>
          </Link>
          <p>{dog.default_image}</p>
        </div>
      ))} */}
    </div>
  );
};

export default DogsList;
