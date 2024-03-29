import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ApplicationForm.scss";
import {
  updateApplicationAsync,
  fetchApplicationAsync,
  addApplicationAsync,
  fetchMatchesAsync,
  cancelApplicationAsync,
  downloadContractAsync,
} from "../../features/applicationSlice";
import { toast } from "react-toastify";
import { unwrapResult } from "@reduxjs/toolkit";
import DogMatches from "../DogMatches/DogMatches";
import { useNavigate } from "react-router-dom";
import Calendar from "../Calendar/Calendar";
import StripeContainer from "../StripeContainer/StripeContainer";

function ApplicationForm() {
  const [formState, setFormState] = useState({
    occupation: "",
    streetAddress: "",
    city: "",
    province: "",
    residence_type: "",
    landlord_permission: "",
    current_pets: "",
    current_pets_details: "",
    felony_conviction: "",
    felony_details: "",
    pet_prohibition: "",
    prohibition_details: "",
    household_allergies: "",
    household_agreement: "",
    household_children: "",
    previous_adoption: "",
    adoption_details: "",
    adoption_reason: "",
    dog_experience: "",
    stimulation_plan: "",
    sleeping_arrangement: "",
    vet_frequency: "",
    dog_size: [],
    dog_age: [],
    dog_energy_level: "",
    dog_medical_conditions: "",
  });
  const [selectedDogId, setSelectedDogId] = useState(null);

  const handleSelectDog = (dogId) => {
    setSelectedDogId(dogId);
  };

  const { user } = useSelector((state) => state.auth);
  const applicationState = useSelector(
    (state) => state.application.application
  );
  const applicationStatus = applicationState?.status || "Not Started";

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleStartApplication = () => {
    if (user?.id) {
      dispatch(addApplicationAsync(user.id));
    }
  };

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchApplicationAsync(user.id))
        .then(unwrapResult)
        .catch((error) => {
          console.error("Error fetching application:", error);
        });
    }
  }, [dispatch, user?.id]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    let finalValue = value;

    // Handle radio buttons for boolean values (true/false)
    if (type === "radio" && (value === "true" || value === "false")) {
      finalValue = value === "true";
    }
    // Handle radio buttons for string values
    else if (type === "radio") {
      finalValue = value;
    }

    setFormState((prevState) => ({
      ...prevState,
      [name]: finalValue,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    setFormState((prevState) => {
      // If the checkbox is checked, add its value to the array.
      // If unchecked, remove its value from the array.
      const newArray = checked
        ? [...prevState[name], value]
        : prevState[name].filter((val) => val !== value);

      return { ...prevState, [name]: newArray };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submissionData = {
      ...formState,
      address: `${formState.streetAddress}, ${formState.city}, ${formState.province}`,
      status: "Pending Dog Selection",
      id: applicationState.id,
      dog_id: selectedDogId,
    };

    // Remove temporary fields not needed for submission
    delete submissionData.streetAddress;
    delete submissionData.city;
    delete submissionData.province;

    // Await the dispatch call and check the result
    const actionResult = await dispatch(updateApplicationAsync(submissionData));
    const isSubmissionSuccessful = unwrapResult(actionResult);

    if (isSubmissionSuccessful) {
      toast.success("Your application has successfully been submitted!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.error("There was an error submitting your application.", {
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

  // Fetch matches if the application status is "pending dog selection"
  useEffect(() => {
    if (applicationStatus === "Pending Dog Selection" && applicationState.id) {
      dispatch(fetchMatchesAsync(applicationState.id));
    }
  }, [dispatch, applicationStatus, applicationState.id]);

  // Accessing the matches from the application state
  const matches = useSelector((state) => state.application.matches || []);

  const onMatchConfirmed = () => {
    if (user?.id) {
      dispatch(fetchApplicationAsync(user.id))
        .then(unwrapResult)
        .then(() => {
          navigate("/application");
        })
        .catch((error) => {
          console.error("Error fetching updated application:", error);
        });
    }
  };

  const handleSignContract = () => {
    navigate(`/adoption-contract/${applicationState.id}`);
  };

  const handleCancelApplication = () => {
    dispatch(cancelApplicationAsync({ applicationId: applicationState.id }))
      .then(unwrapResult)
      .then(() => {
        toast.success("Your application has been cancelled.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        navigate("/application");
      })
      .catch((error) => {
        toast.error("There was an error cancelling your application.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        console.error("Error cancelling application:", error);
      });
  };

  function getAppointmentType(status) {
    switch (status) {
      case "Pending Interview Booking":
      case "Interview Booked":
        return "Interview";
      case "Pending Meet and Greet Booking":
      case "Meet and Greet Booked":
        return "Meet and Greet";
      case "Pending Adoption Date Booking":
      case "Adoption Date Booked":
        return "Adoption Date";
      default:
        return "";
    }
  }

  function getAppointmentDate(status, application) {
    let dateStr = "";
    switch (status) {
      case "Interview Booked":
        dateStr = application.interview_date;
        break;
      case "Meet and Greet Booked":
        dateStr = application.meet_greet_date;
        break;
      case "Adoption Date Booked":
        dateStr = application.adoption_date;
        break;
      default:
        return "";
    }

    if (!dateStr) {
      return "";
    }

    const date = new Date(dateStr);
    if (isNaN(date.getTime())) {
      return "Invalid date";
    }

    return `${date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    })} at ${date.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })}`;
  }

  const formattedDate = getAppointmentDate(applicationStatus, applicationState);

  const handleDownloadContract = () => {
    dispatch(downloadContractAsync({ applicationId: applicationState.id }));
  };

  return (
    <main className="application-form">
      <h1 className="page-title">Adoption Application</h1>
      {applicationStatus === "Not Started" && (
        <div className="application-status-page">
          <img
            src="https://github.com/ekatie/FureverHome/blob/main/src/assets/running_2.png?raw=true"
            alt="running-dog"
          />
          <button className="application-btn" onClick={handleStartApplication}>
            Start Application
          </button>{" "}
        </div>
      )}
      {applicationStatus === "Pending" && (
        <form onSubmit={handleSubmit}>
          <section>
            <h2>Personal Information</h2>
            <div>
              <label htmlFor="occupation">
                1. What is your current occupation?
              </label>
              <input
                htmlFor="occupation"
                type="text"
                name="occupation"
                value={formState.occupation}
                onChange={handleChange}
              />
            </div>
            <div className="app-question">
              <p>2. What is your current address?</p>
              <div className="address-container">
                <label htmlFor="streetAddress">Street Address</label>
                <input
                  htmlFor="streetAddress"
                  type="text"
                  name="streetAddress"
                  value={formState.streetAddress}
                  onChange={handleChange}
                />

                <label htmlFor="city">City</label>
                <input
                  htmlFor="city"
                  type="text"
                  name="city"
                  value={formState.city}
                  onChange={handleChange}
                />

                <label htmlFor="province">Province</label>
                <select
                  htmlFor="province"
                  id="province"
                  name="province"
                  onChange={handleChange}
                >
                  <option value="AB">AB</option>
                  <option value="BC">BC</option>
                  <option value="MB">MB</option>
                  <option value="NB">NB</option>
                  <option value="NL">NL</option>
                  <option value="NS">NS</option>
                  <option value="NU">NU</option>
                  <option value="NT">NT</option>
                  <option value="ON">ON</option>
                  <option value="PE">PE</option>
                  <option value="QC">QC</option>
                  <option value="SK">SK</option>
                  <option value="YT">YT</option>
                </select>
              </div>
            </div>
            <div>
              <p>3. Do you rent or own your residence?</p>
            </div>
            <div>
              <input
                htmlFor="residence_type_rent"
                type="radio"
                name="residence_type"
                className="radio-btn"
                value="Rent"
                checked={formState.residence_type === "Rent"}
                onChange={handleChange}
              />
              <label htmlFor="residence_type_rent">Rent</label>
              <input
                htmlFor="residence_type_own"
                type="radio"
                name="residence_type"
                className="radio-btn"
                value="Own"
                checked={formState.residence_type === "Own"}
                onChange={handleChange}
              />
              <label htmlFor="residence_type_own">Own</label>
            </div>
            {/* if rent */}
            <div>
              <p className="part-b">
                If you rent, do you have landlord permission to have a pet?
              </p>
              <input
                htmlFor="landlord_permission_yes"
                type="radio"
                name="landlord_permission"
                className="radio-btn"
                value="true"
                checked={formState.landlord_permission === true}
                onChange={handleChange}
              />
              <label htmlFor="landlord_permission_yes">Yes</label>
              <input
                htmlFor="landlord_permission_no"
                type="radio"
                name="landlord_permission"
                className="radio-btn"
                value="false"
                checked={formState.landlord_permission === false}
                onChange={handleChange}
              />
              <label htmlFor="landlord_permission_no">No</label>
            </div>
          </section>
          <section>
            <h2>Household Information</h2>
            <div>
              <p>1. Do you currently have any pets at home?</p>
              <input
                htmlFor="current_pets_yes"
                type="radio"
                name="current_pets"
                className="radio-btn"
                value="true"
                checked={formState.current_pets === true}
                onChange={handleChange}
              />
              <label htmlFor="current_pets_yes">Yes</label>
              <input
                htmlFor="current_pets_no"
                type="radio"
                name="current_pets"
                className="radio-btn"
                value="false"
                checked={formState.current_pets === false}
                onChange={handleChange}
              />
              <label htmlFor="current_pets_no">No</label>
            </div>
            {/* if yes to current pets */}
            <div>
              <label htmlFor="current_pets_details" className="part-b">
                If yes, please list the type(s), breed(s), age(s), and other
                relevant information about your current pet(s).
              </label>
              <textarea
                htmlFor="current_pets_details"
                type="text"
                name="current_pets_details"
                value={formState.current_pets_details}
                onChange={handleChange}
              />
            </div>
            <div>
              <p>
                2. Have you or anyone in your household been convicted of a
                felony or animal cruelty?
              </p>
              <input
                htmlFor="felony_conviction_yes"
                type="radio"
                name="felony_conviction"
                className="radio-btn"
                value="true"
                checked={formState.felony_conviction === true}
                onChange={handleChange}
              />
              <label htmlFor="felony_conviction_yes">Yes</label>
              <input
                htmlFor="felony_conviction_no"
                type="radio"
                name="felony_conviction"
                className="radio-btn"
                value="false"
                checked={formState.felony_conviction === false}
                onChange={handleChange}
              />
              <label htmlFor="felony_conviction_no">No</label>
            </div>
            {/* if yes to felony conviction */}
            <div>
              <label htmlFor="felony_details" className="part-b">
                If yes, please explain the circumstances and the outcome of the
                conviction.
              </label>
              <textarea
                htmlFor="felony_details"
                type="text"
                name="felony_details"
                value={formState.felony_details}
                onChange={handleChange}
              />
            </div>
            <div>
              <p>
                3. Are you or anyone in your household prohibited from owning
                animals?
              </p>
              <input
                htmlFor="pet_prohibition_yes"
                type="radio"
                name="pet_prohibition"
                className="radio-btn"
                value="true"
                checked={formState.pet_prohibition === true}
                onChange={handleChange}
              />
              <label htmlFor="pet_prohibition_yes">Yes</label>
              <input
                htmlFor="pet_prohibition_no"
                type="radio"
                name="pet_prohibition"
                className="radio-btn"
                value="false"
                checked={formState.pet_prohibition === false}
                onChange={handleChange}
              />
              <label htmlFor="pet_prohibition_no">No</label>
            </div>
            {/* if yes to pet prohibition */}
            <div>
              <label htmlFor="prohibition_details" className="part-b">
                If yes, please explain the circumstances and the outcome of the
                prohibition.
              </label>
              <textarea
                htmlFor="prohibition_details"
                type="text"
                name="prohibition_details"
                value={formState.prohibition_details}
                onChange={handleChange}
              />
            </div>
            <div>
              <p>4. Do any members of your household have animal allergies?</p>
              <input
                htmlFor="household_allergies_yes"
                type="radio"
                name="household_allergies"
                className="radio-btn"
                value="true"
                checked={formState.household_allergies === true}
                onChange={handleChange}
              />
              <label htmlFor="household_allergies_yes">Yes</label>
              <input
                htmlFor="household_allergies_no"
                type="radio"
                name="household_allergies"
                className="radio-btn"
                value="false"
                checked={formState.household_allergies === false}
                onChange={handleChange}
              />
              <label htmlFor="household_allergies_no">No</label>
            </div>
            <div>
              <p>
                5. Are all members of your household in agreement with adopting
                a dog?
              </p>
              <input
                htmlFor="household_agreement_yes"
                type="radio"
                name="household_agreement"
                className="radio-btn"
                value="true"
                checked={formState.household_agreement === true}
                onChange={handleChange}
              />
              <label htmlFor="household_agreement_yes">Yes</label>
              <input
                htmlFor="household_agreement_no"
                type="radio"
                name="household_agreement"
                className="radio-btn"
                value="false"
                checked={formState.household_agreement === false}
                onChange={handleChange}
              />
              <label htmlFor="household_agreement_no">No</label>
            </div>
            <div>
              <p>6. Are there any children in your household?</p>
              <input
                htmlFor="household_children_yes"
                type="radio"
                name="household_children"
                className="radio-btn"
                value="true"
                checked={formState.household_children === true}
                onChange={handleChange}
              />
              <label htmlFor="household_children_yes">Yes</label>
              <input
                htmlFor="household_children_no"
                type="radio"
                name="household_children"
                className="radio-btn"
                value="false"
                checked={formState.household_children === false}
                onChange={handleChange}
              />
              <label htmlFor="household_children_no">No</label>
            </div>
          </section>
          <section>
            <h2>Adoption Experience and Plans</h2>
            <div>
              <p>1. Have you ever adopted an animal before?</p>
              <input
                htmlFor="previous_adoption_yes"
                type="radio"
                name="previous_adoption"
                className="radio-btn"
                value="true"
                checked={formState.previous_adoption === true}
                onChange={handleChange}
              />
              <label htmlFor="previous_adoption_yes">Yes</label>
              <input
                htmlFor="previous_adoption_no"
                type="radio"
                name="previous_adoption"
                className="radio-btn"
                value="false"
                checked={formState.previous_adoption === false}
                onChange={handleChange}
              />
              <label htmlFor="previous_adoption_no">No</label>
            </div>
            {/* if yes to previous adoption */}
            <div>
              <label htmlFor="adoption_details" className="part-b">
                If yes, please provide information about the animal(s) you have
                adopted (shelter/rescue organization, type of animal, outcome,
                etc.)
              </label>
              <textarea
                htmlFor="adoption_details"
                type="text"
                name="adoption_details"
                value={formState.adoption_details}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="adoption_reason">
                2. Why have you decided to get a dog?
              </label>
              <textarea
                htmlFor="adoption_reason"
                type="text"
                name="adoption_reason"
                value={formState.adoption_reason}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="dog_experience">
                3. What is your experience with dogs?
              </label>
              <textarea
                htmlFor="dog_experience"
                type="text"
                name="dog_experience"
                value={formState.dog_experience}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="stimulation_plan">
                4. How do you plan to exercise and provide mental stimulation
                for the dog?
              </label>
              <textarea
                htmlFor="stimulation_plan"
                type="text"
                name="stimulation_plan"
                value={formState.stimulation_plan}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="sleeping_arrangement">
                5. Where will the dog sleep at night?
              </label>
              <textarea
                htmlFor="sleeping_arrangement"
                type="text"
                name="sleeping_arrangement"
                value={formState.sleeping_arrangement}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="vet_frequency">
                6. How often do you plan to take your dog to the vet?
              </label>
              <textarea
                htmlFor="vet_frequency"
                type="text"
                name="vet_frequency"
                value={formState.vet_frequency}
                onChange={handleChange}
              />
            </div>
          </section>
          <section>
            <h2>Dog Preferences</h2>
            <div>
              <p>
                1. What size dog are you interested in adopting? Please select
                all that apply below:
              </p>
              <input
                htmlFor="tiny"
                type="checkbox"
                name="dog_size"
                value="Tiny"
                checked={formState.dog_size.includes("Tiny")}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="tiny">Tiny (under 20lbs)</label>
              <input
                htmlFor="small"
                type="checkbox"
                name="dog_size"
                value="Small"
                checked={formState.dog_size.includes("Small")}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="small">Small (20 to 29lbs)</label>
              <input
                htmlFor="medium"
                type="checkbox"
                name="dog_size"
                value="Medium"
                checked={formState.dog_size.includes("Medium")}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="medium">Medium (30 to 49lbs)</label>
              <input
                htmlFor="large"
                type="checkbox"
                name="dog_size"
                value="Large"
                checked={formState.dog_size.includes("Large")}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="large">Large (50 to 90lbs)</label>
              <input
                htmlFor="giant"
                type="checkbox"
                name="dog_size"
                value="Giant"
                checked={formState.dog_size.includes("Giant")}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="giant">Giant (over 90lbs)</label>
            </div>
            <div>
              <p>
                2. Do you have a preference for the age of the dog you wish to
                adopt? Please select all that apply.
              </p>
              <input
                htmlFor="Puppy"
                type="checkbox"
                name="dog_age"
                value="Puppy"
                checked={formState.dog_age.includes("Puppy")}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="Puppy">Puppy (under 1 year)</label>
              <input
                htmlFor="Young"
                type="checkbox"
                name="dog_age"
                value="Young"
                checked={formState.dog_age.includes("Young")}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="Young">Young (1 to 3 years)</label>
              <input
                htmlFor="Adult"
                type="checkbox"
                name="dog_age"
                value="Adult"
                checked={formState.dog_age.includes("Adult")}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="Adult">Adult (3 to 8 years)</label>
              <input
                htmlFor="Senior"
                type="checkbox"
                name="dog_age"
                value="Senior"
                checked={formState.dog_age.includes("Senior")}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="Senior">Senior (over 8 years)</label>
            </div>
            <div>
              <p>
                3. Every dog has a unique energy level. Which of the following
                best matches your lifestyle and preference?
              </p>
              <input
                htmlFor="dog_energy_level_low"
                type="radio"
                name="dog_energy_level"
                className="radio-btn"
                value="Low"
                checked={formState.dog_energy_level === "Low"}
                onChange={handleChange}
              />
              <label htmlFor="dog_energy_level_low">
                Low energy (prefers leisurely walks, more relaxed)
              </label>
              <br />
              <input
                htmlFor="dog_energy_level_medium"
                type="radio"
                name="dog_energy_level"
                className="radio-btn"
                value="Medium"
                checked={formState.dog_energy_level === "Medium"}
                onChange={handleChange}
              />
              <label htmlFor="dog_energy_level_medium">
                Medium energy (enjoys regular walks and some playtime)
              </label>
              <br />
              <input
                htmlFor="dog_energy_level_high"
                type="radio"
                name="dog_energy_level"
                className="radio-btn"
                value="High"
                checked={formState.dog_energy_level === "High"}
                onChange={handleChange}
              />
              <label htmlFor="dog_energy_level_high">
                High energy (loves lots of active playtime and exercise)
              </label>
              <br />
              <input
                htmlFor="dog_energy_level_very-high"
                type="radio"
                name="dog_energy_level"
                className="radio-btn"
                value="Very high"
                checked={formState.dog_energy_level === "Very high"}
                onChange={handleChange}
              />
              <label htmlFor="dog_energy_level_very-high">
                Very high energy (requires extensive daily exercise and mental
                stimulation)
              </label>
              <br />
              <input
                htmlFor="dog_energy_level_flexible"
                type="radio"
                name="dog_energy_level"
                className="radio-btn"
                value="Flexible"
                checked={formState.dog_energy_level === "Flexible"}
                onChange={handleChange}
              />
              <label htmlFor="dog_energy_level_flexible">
                I'm flexible and can accommodate any energy level
              </label>
            </div>
            <div>
              <p>
                4. Are you willing and able to care for a dog with medical
                conditions that may require special attention, medication, or
                frequent veterinary visits?
              </p>
              <input
                htmlFor="dog_medical_conditions_yes"
                type="radio"
                name="dog_medical_conditions"
                className="radio-btn"
                value="Yes"
                checked={formState.dog_medical_conditions === "Yes"}
                onChange={handleChange}
              />
              <label htmlFor="dog_medical_conditions_yes">
                Yes, I am prepared to care for a dog with medical needs.
              </label>
              <br />
              <input
                htmlFor="dog_medical_conditions_maybe"
                type="radio"
                name="dog_medical_conditions"
                className="radio-btn"
                value="Maybe"
                checked={formState.dog_medical_conditions === "Maybe"}
                onChange={handleChange}
              />
              <label htmlFor="dog_medical_conditions_maybe">
                I might be open to it, depending on the condition and required
                care.
              </label>
              <br />
              <input
                htmlFor="dog_medical_conditions_no"
                type="radio"
                name="dog_medical_conditions"
                className="radio-btn"
                value="No"
                checked={formState.dog_medical_conditions === "No"}
                onChange={handleChange}
              />
              <label htmlFor="dog_medical_conditions_no">
                I prefer a dog without known medical conditions.
              </label>
            </div>
          </section>
          <button type="submit">Submit</button>
        </form>
      )}
      {applicationStatus === "Pending Dog Selection" && (
        <DogMatches
          matches={matches}
          onSelectDog={handleSelectDog}
          applicationId={applicationState.id}
          onMatchConfirmed={onMatchConfirmed}
          onCancelApplication={handleCancelApplication}
        />
      )}
      {(applicationStatus === "Submitted" ||
        applicationStatus === "Under Review") && (
        <div className="application-status-page">
          <p>
            <span className="label-text">Application Status:</span>{" "}
            {applicationStatus}
            <p>Your application is being reviewed. Admin will be in touch with next steps soon!</p>
          </p>
          <img
            src="https://ekatie.github.io/FureverHome/src/assets/running_4.png"
            alt="dog-running"
          />
          <button className="cancel-btn" onClick={handleCancelApplication}>
            Cancel Application
          </button>
        </div>
      )}
      {(applicationStatus === "Pending Interview Booking" ||
        applicationStatus === "Pending Meet and Greet Booking" ||
        applicationStatus === "Pending Adoption Date Booking") && (
        <div className="booking-page">
          <p>
            Please book an appointment for your{" "}
            {getAppointmentType(applicationStatus)} below:
          </p>
          <Calendar
            applicationId={applicationState.id}
            onBookingComplete={() => dispatch(fetchApplicationAsync(user.id))}
          />
          <button className="cancel-btn" onClick={handleCancelApplication}>
            Cancel Application
          </button>
        </div>
      )}
      {(applicationStatus === "Interview Booked" ||
        applicationStatus === "Meet and Greet Booked" ||
        applicationStatus === "Adoption Date Booked") && (
        <div className="application-status-page">
          <p>
            <span className="label-text">Application Status:</span>{" "}
            {applicationStatus}
          </p>
          <p>
            <span className="label-text">
              {getAppointmentType(applicationStatus)} Appointment:{" "}
            </span>
            {formattedDate}
          </p>
          <img
            src="https://github.com/ekatie/FureverHome/blob/main/src/assets/running_3.png?raw=true"
            alt="dog-running"
          />
          <button className="cancel-btn" onClick={handleCancelApplication}>
            Cancel Application
          </button>
        </div>
      )}
      {applicationStatus === "Cancelled" && (
        <div className="application-status-page">
          <p>Your application has been cancelled!</p>
          <br />
        </div>
      )}
      {applicationStatus === "Awaiting Payment" && (
        <div className="application-status-page">
          <p>
            <span className="label-text">Application Status:</span>{" "}
            {applicationStatus}
          </p>
          <p className="adoption-fee">
            <span>Adoption Fee for {applicationState.dog.name}:</span> $
            {Math.round(applicationState.dog.adoption_fee)} CAD
          </p>
          <p>
            Are you in love yet? Make your match official by inputting your
            payment details below:
          </p>
          <StripeContainer applicationId={applicationState.id} />
        </div>
      )}
      {(applicationStatus === "Payment Received" ||
        applicationStatus === "Awaiting Contract Signature") && (
        <div className="application-status-page">
          <p>
            <span className="label-text">Application Status:</span>{" "}
            {applicationStatus}
          </p>
          <img
            src="https://github.com/ekatie/FureverHome/blob/main/src/assets/selfie_2.png?raw=true"
            alt="dog-selfie"
          />
          <p>Make it super official by completing your Adoption Contract:</p>
          <button onClick={() => handleSignContract()}>View Contract</button>
        </div>
      )}
      {applicationStatus === "Adoption Complete" && (
        <div className="application-status-page">
          <p>
            <span className="label-text">Application Status:</span>{" "}
            {applicationStatus}
          </p>
          <img
            src="https://img.freepik.com/free-photo/ai-generated-labrador-retriever-dog-picture_23-2150644908.jpg"
            alt="dog-selfie"
          />
          <p>
            Congratulations on your new furry friend! We're so excited for you
            both!
          </p>
          <button onClick={handleDownloadContract}>Download Contract</button>
        </div>
      )}
    </main>
  );
}

export default ApplicationForm;
