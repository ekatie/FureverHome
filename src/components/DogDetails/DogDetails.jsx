import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchDogAsync } from "../../features/dogSlice";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import "./DogDetails.scss";

function DogDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const dog = useSelector((state) =>
    state.dogs.dogs.find((dog) => dog.id.toString() === id)
  );

  console.log(dog);

  useEffect(() => {
    if (!dog && id) {
      dispatch(fetchDogAsync(id));
    }
  }, [id, dispatch, dog]);

  if (!dog) {
    return <div>Loading dog details...</div>;
  }

  return (
    <article className="dog-details">
      <h1 className="page-title">{dog.name}</h1>
      <div>
        {dog.images.map((imageUrl, index) => (
          <img key={index} src={imageUrl} alt={`${dog.name} ${index + 1}`} />
        ))}
      </div>
      <p>Breed: {dog.breed}</p>
      <p>Age: {dog.age} years</p>
      <p>Size: {dog.size}</p>
      <p>
        {dog.sex === "Female" ? <FemaleIcon /> : <MaleIcon />} {dog.sex}
      </p>
    </article>
  );
}

export default DogDetails;
