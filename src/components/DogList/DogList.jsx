import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchDogsAsync } from "../../features/dogSlice";
import { Link } from "react-router-dom";
import DogImage from "../DogImage/DogImage";
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
      {/* filter dogs by size, age */}
      <h1 className="page-title">Available Dogs</h1>
      <section className="dog-list">
        {dogs.map((dog) => (
          <article key={dog.id} className="dog-list-item">
            <Link to={`/dogs/${dog.id}`} className="dog-link">
              {dog.name}
            </Link>
            <DogImage
              key={dog.id}
              name={dog.name}
              imageUrl={dog.default_image_url}
            />
          </article>
        ))}
      </section>
    </div>
  );
};

export default DogList;
