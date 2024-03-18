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

  const [uploadedImages, setUploadedImages] = useState([]);
  const [defaultImageId, setDefaultImageId] = useState(null);
  const [dog, setDog] = useState({
    name: "",
    breed: "",
    age: 0,
    size: 0,
    description: "",
    status: "Available",
    energy_level: "Low",
    foster_location: "",
    medical_conditions: "",
    adoption_fee: 0,
    good_with_cats: "",
    good_with_dogs: "",
    good_with_kids: "",
    social_media_link: "",
    dog_images_attributes: [],
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
      setDog((prevDog) => ({
        ...prevDog,
        ...dogDetails,
        dog_images_attributes: dogDetails.dog_images_attributes || [],
      }));

      // Set default image id
      const currentDefaultImage = dogDetails.dog_images_attributes?.find(
        (image) => image.is_default
      );
      if (currentDefaultImage) {
        setDefaultImageId(currentDefaultImage.id);
      }

      // Initialize uploadedImages with existing dog images
      const existingImages =
        dogDetails.dog_images_attributes?.map((image) => ({
          id: image.id,
          url: image.url,
          is_default: image.is_default,
          _destroy: false,
        })) || [];
      setUploadedImages(existingImages);
    }
  }, [dogDetails]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setDog((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  useEffect(() => {
    // Load the Cloudinary script
    const script = document.createElement("script");
    script.src = "https://upload-widget.cloudinary.com/global/all.js";
    script.async = true;

    document.body.appendChild(script);

    // Cleanup to remove the script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const setDefaultImage = (imageId) => {
    setDefaultImageId(imageId);
    setUploadedImages((prev) =>
      prev.map((image) => ({
        ...image,
        is_default: image.id === imageId,
      }))
    );
  };

  const handleUploadImages = () => {
    window.cloudinary.openUploadWidget(
      {
        cloudName: "dh9t1ookl",
        uploadPreset: "dogphotos",
        sources: ["local", "url", "camera"],
        multiple: true,
        maxFiles: 10,
      },
      (error, result) => {
        if (error) {
          toast.error("Failed to upload images. Please try again.", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          return;
        }

        if (result.event === "queues-end") {
          const newImages = result.info.files.map((file, index) => ({
            id: `temp-${Date.now()}-${index}`, // Temporary ID
            url: file.uploadInfo.secure_url,
            is_default: false,
          }));
          console.log("newImages", newImages);
          setDog((prev) => ({
            ...prev,
            dog_images_attributes: [
              ...prev.dog_images_attributes,
              ...newImages,
            ],
          }));
          setUploadedImages((prev) => [...prev, ...newImages]);
          toast.success("Images uploaded successfully!", {
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
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      id: omittedId,
      is_favourite: ommittedStatus,
      ...dogDataWithoutId
    } = dog;

    const dogData = {
      ...dogDataWithoutId,
      age: parseFloat(dog.age),
      adoption_fee: parseFloat(dog.adoption_fee),
      dog_images_attributes: uploadedImages.map((image) => {
        // Check if `id` is a string and starts with "temp-"; otherwise, include it as is
        const shouldOmitId =
          typeof image.id === "string" && image.id.startsWith("temp-");
        return {
          url: image.url,
          is_default: image.id === defaultImageId,
          ...(shouldOmitId ? {} : { id: image.id }),
        };
      }),
    };

    console.log("dogData", dogData);

    let actionResult;
    if (dogId) {
      // Update dog
      actionResult = dispatch(updateDogAsync({ id: dogId, dog: dogData }));
    } else {
      // Add new dog
      actionResult = dispatch(addDogAsync({ dog: dogData }));
    }
    console.log("actionResult", actionResult);
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
        console.log("error", error);
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

  return (
    <section className="admin-edit-dog">
      <div className="page-header">
        <ArrowBackIcon
          className="back-icon"
          onClick={() => navigate("/admin/dogs")}
        />
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
              name="good_with_dogs"
              className="radio-btn"
              value="No"
              checked={dog.good_with_dogs === "No"}
              onChange={handleChange}
            />
            <label htmlFor="good_with_dogs_no">No</label>
            <input
              htmlFor="good_with_dogs_untested"
              type="radio"
              name="good_with_dogs"
              className="radio-btn"
              value="Untested"
              checked={dog.good_with_dogs === "Untested"}
              onChange={handleChange}
            />
            <label htmlFor="good_with_dogs_untested">Untested</label>
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
              name="good_with_cats"
              className="radio-btn"
              value="No"
              checked={dog.good_with_cats === "No"}
              onChange={handleChange}
            />
            <label htmlFor="good_with_cats_no">No</label>
            <input
              htmlFor="good_with_cats_untested"
              type="radio"
              name="good_with_cats"
              className="radio-btn"
              value="Untested"
              checked={dog.good_with_cats === "Untested"}
              onChange={handleChange}
            />
            <label htmlFor="good_with_cats_untested">Untested</label>
          </div>
        </div>
        <div className="form-group">
          <p>Good with Kids:</p>
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
              name="good_with_kids"
              className="radio-btn"
              value="No"
              checked={dog.good_with_kids === "No"}
              onChange={handleChange}
            />
            <label htmlFor="good_with_kids_no">No</label>
            <input
              htmlFor="good_with_kids_untested"
              type="radio"
              name="good_with_kids"
              className="radio-btn"
              value="Untested"
              checked={dog.good_with_kids === "Untested"}
              onChange={handleChange}
            />
            <label htmlFor="good_with_kids_untested">Untested</label>
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
        <div>
          <div className="form-group">
            <button
              className="image-upload-btn"
              type="button"
              onClick={handleUploadImages}
            >
              Upload Images
            </button>
            {uploadedImages.length > 0 && !defaultImageId && (
              <p className="default-prompt">Please select a default image:</p>
            )}
          </div>
          <div className="form-group images">
            {uploadedImages.map((image, index) => (
              <div
                key={index}
                className={`image-item ${image.is_default ? "default" : ""}`}
                onClick={() => setDefaultImage(image.id)}
              >
                <img src={image.url} alt={`Dog ${index + 1}`} />
                {image.is_default && (
                  <div className="default-badge">Default</div>
                )}
              </div>
            ))}
          </div>
        </div>
        <button type="submit" onClick={handleSubmit}>
          {dogId ? "Save Changes" : "Add Dog"}
        </button>
      </form>
    </section>
  );
};

export default AdminEditDog;
