import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchDogsAsync, toggleFavouriteAsync } from "../../features/dogSlice";
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
      <h1 className="page-title">Available Dogs</h1>
      <ul className="dog-list">
        {dogs.map((dog) => (
          <DogListItem
            key={dog.id}
            name={dog.name}
            imageUrl={dog.default_image_url}
            isFavourite={dog.isFavourite}
            onToggleFavourite={() =>
              dispatch(toggleFavouriteAsync({ dogId: dog.id }))
            }
          />
        ))}
      </ul>
    </div>
  );
};

export default DogList;

// <article key={dog.id} className="dog-list-item">
//   <Link to={`/dogs/${dog.id}`} className="dog-link">
//     {dog.name}
//   </Link>
//   <DogListItem
//     key={dog.id}
//     name={dog.name}
//     imageUrl={dog.default_image_url}
//   />
//   <FavButton
//     selected={dog.isFavourite}
//     onToggleFavourite={() =>
//       dispatch(toggleFavouriteAsync({ dogId: dog.id }))
//     }
//   />
// </article>
