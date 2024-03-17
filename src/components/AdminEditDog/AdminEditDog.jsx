import React, { useState, useEffect } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAdminDogAsync,
  addDogAsync,
  updateDogAsync,
} from "../../features/dogSlice";
import { toast } from "react-toastify";
import "./AdminEditDog.scss";

const AdminEditDog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dogId = parseInt(id);
  const dogDetails = useSelector((state) =>
    state.dogs.dogs.find((dog) => dog.id === dogId)
  );

  const [dog, setDog] = useState({
    name: "",
    breed: "",
    age: 0,
    size: 0,
    description: "",
    status: "",
    energy_level: "",
    foster_location: "",
    medical_conditions: "",
    adoption_fee: 0,
    good_with_cats: false,
    good_with_dogs: false,
    good_with_kids: false,
    social_media_link: "",
  });

  // On component mount, if editing, fetch dog details
  useEffect(() => {
    if (dogId) {
      dispatch(fetchAdminDogAsync(dogId));
    }
  }, [dispatch, dogId]);

  // Update form fields when editing
  useEffect(() => {
    if (dogDetails) {
      setDog(dogDetails);
    }
  }, [dogDetails]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setDog((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { is_favourite, default_image_url, ...dogData } = dog;

    let actionResult;
    if (dogId) {
      // Update dog
      actionResult = dispatch(updateDogAsync({ id: dogId, dog: dogData }));
    } else {
      // Add new dog
      actionResult = dispatch(addDogAsync({ dog: dogData }));
    }

    actionResult
      .then(() => {
        const toastMessage = dogId
          ? "Dog changes have been saved!"
          : "New dog has been added!";
        toast.success(toastMessage, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        navigate("/admin/dogs");
      })
      .catch((error) => {
        // Error handling here
        toast.error("Failed to save changes. Please try again.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };

  if (!dogDetails) {
    return <div>Loading...</div>;
  }

  return (
    <section className="admin-edit-dog">
      <div className="page-header">
        <ArrowBackIcon className="back-icon" onClick={() => navigate(-1)} />
        <h1 className="page-title">{dogId ? "Edit Dog" : "Add New Dog"}</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name: </label>
          <input
            htmlFor="name"
            type="text"
            name="name"
            value={dog.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="age">Age: </label>
          <input
            htmlFor="age"
            type="number"
            name="age"
            value={dog.age}
            onChange={handleChange}
          />{" "}
          years
        </div>
        <div className="form-group">
          <label htmlFor="size">Size: </label>
          <input
            htmlFor="size"
            type="number"
            name="size"
            value={dog.size}
            onChange={handleChange}
          />{" "}
          lbs
        </div>
        <div className="form-group">
          <p>Sex:</p>
          <div className="radio-group">
            <input
              htmlFor="sex_male"
              type="radio"
              name="sex"
              className="radio-btn"
              value="Male"
              checked={dog.sex === "Male"}
              onChange={handleChange}
            />
            <label htmlFor="sex_male">Male</label>
            <input
              htmlFor="sex_female"
              type="radio"
              name="sex"
              className="radio-btn"
              value="Female"
              checked={dog.sex === "Female"}
              onChange={handleChange}
            />
            <label htmlFor="sex_female">Female</label>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="breed">Breed: </label>
          <input
            htmlFor="breed"
            type="text"
            name="breed"
            value={dog.breed}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="status">Status: </label>
          <select
            htmlFor="status"
            name="status"
            value={dog.status}
            onChange={handleChange}
          >
            <option value="Available">Available</option>
            <option value="Applications Being Reviewed">
              Applications Being Reviewed
            </option>
            <option value="Pending Adoption">Pending Adoption</option>
            <option value="Adopted">Adopted</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="energy_level">Energy Level: </label>
          <select
            htmlFor="energy_level"
            name="energy_level"
            value={dog.energy_level}
            onChange={handleChange}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Very High">Very High</option>
          </select>
        </div>
        <div className="form-group">
          <p>Good with Dogs:</p>
          <div className="radio-group">
            <input
              htmlFor="good_with_dogs_yes"
              type="radio"
              name="good_with_dogs"
              className="radio-btn"
              value="Yes"
              checked={dog.good_with_dogs === "Yes"}
              onChange={handleChange}
            />
            <label htmlFor="good_with_dogs_yes">Yes</label>
            <input
              htmlFor="good_with_dogs_sometimes"
              type="radio"
              name="good_with_dogs"
              className="radio-btn"
              value="Sometimes"
              checked={dog.good_with_dogs === "Sometimes"}
              onChange={handleChange}
            />
            <label htmlFor="good_with_dogs_sometimes">Sometimes</label>
            <input
              htmlFor="good_with_dogs_no"
              type="radio"
              name="sex"
              className="radio-btn"
              value="No"
              checked={dog.good_with_dogs === "No"}
              onChange={handleChange}
            />
            <label htmlFor="good_with_dogs_no">No</label>
          </div>
        </div>
        <div className="form-group">
          <p>Good with Cats:</p>
          <div className="radio-group">
            <input
              htmlFor="good_with_cats_yes"
              type="radio"
              name="good_with_cats"
              className="radio-btn"
              value="Yes"
              checked={dog.good_with_cats === "Yes"}
              onChange={handleChange}
            />
            <label htmlFor="good_with_cats_yes">Yes</label>
            <input
              htmlFor="good_with_cats_sometimes"
              type="radio"
              name="good_with_cats"
              className="radio-btn"
              value="Sometimes"
              checked={dog.good_with_cats === "Sometimes"}
              onChange={handleChange}
            />
            <label htmlFor="good_with_cats_sometimes">Sometimes</label>
            <input
              htmlFor="good_with_cats_no"
              type="radio"
              name="sex"
              className="radio-btn"
              value="No"
              checked={dog.good_with_cats === "No"}
              onChange={handleChange}
            />
            <label htmlFor="good_with_cats_no">No</label>
          </div>
        </div>
        <div className="form-group">
          <p>Good with kids:</p>
          <div className="radio-group">
            <input
              htmlFor="good_with_kids_yes"
              type="radio"
              name="good_with_kids"
              className="radio-btn"
              value="Yes"
              checked={dog.good_with_kids === "Yes"}
              onChange={handleChange}
            />
            <label htmlFor="good_with_kids_yes">Yes</label>
            <input
              htmlFor="good_with_kids_sometimes"
              type="radio"
              name="good_with_kids"
              className="radio-btn"
              value="Sometimes"
              checked={dog.good_with_kids === "Sometimes"}
              onChange={handleChange}
            />
            <label htmlFor="good_with_kids_sometimes">Sometimes</label>
            <input
              htmlFor="good_with_kids_no"
              type="radio"
              name="sex"
              className="radio-btn"
              value="No"
              checked={dog.good_with_kids === "No"}
              onChange={handleChange}
            />
            <label htmlFor="good_with_kids_no">No</label>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="medical_conditions">Medical Conditions: </label>
          <input
            htmlFor="medical_conditions"
            type="text"
            name="medical_conditions"
            value={dog.medical_conditions}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="social_media_link">Social Media Link: </label>
          <input
            htmlFor="social_media_link"
            type="text"
            name="social_media_link"
            value={dog.social_media_link}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="adoption_fee">Adoption Fee: </label>
          <input
            htmlFor="adoption_fee"
            type="number"
            name="adoption_fee"
            value={dog.adoption_fee}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="foster_location">Foster Location: </label>
          <input
            htmlFor="foster_location"
            type="text"
            name="foster_location"
            value={dog.foster_location}
            onChange={handleChange}
          />
        </div>
        <div className="form-group description">
          <label htmlFor="description">Description: </label>
          <textarea
            htmlFor="description"
            name="description"
            value={dog.description}
            onChange={handleChange}
          />
        </div>
        {/* <div className="form-group images">
          <label htmlFor="image">Image: </label>
          <input htmlFor="image" type="file" name="image" />
        </div> */}
        <button type="submit" onClick={handleSubmit}>
          {dogId ? "Save Changes" : "Add Dog"}
        </button>
      </form>
    </section>
  );
};

export default AdminEditDog;
