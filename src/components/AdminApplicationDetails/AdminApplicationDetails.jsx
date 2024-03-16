import React, { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAdminApplicationAsync,
  submitApplicationAsync,
} from "../../features/applicationSlice";
import "./AdminApplicationDetails.scss";
import EditIcon from "@mui/icons-material/Edit";
import FlagIcon from "@mui/icons-material/Flag";

const AdminApplicationDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: applicationId } = useParams();
  const application = useSelector((state) => state.application.application);
  const [editMode, setEditMode] = useState(false);
  const [newStatus, setNewStatus] = useState(application.status);

  const statusOptions = [
    application.status,
    "Under Review",
    "Pending Interview Booking",
    "Pending Meet and Greet Booking",
    "Pending Adoption Date Booking",
    "Awaiting Payment",
    "Awaiting Contract Signature",
    "Adoption Complete",
    "Approved",
    "Rejected",
  ];

  const handleChange = (event) => {
    setNewStatus(event.target.value);
  };

  const handleSubmit = () => {
    dispatch(submitApplicationAsync({ id: applicationId, status: newStatus }));
    setEditMode(false);
  };

  useEffect(() => {
    dispatch(fetchAdminApplicationAsync(applicationId));
  }, [dispatch, applicationId]);

  if (!application || !application.user) {
    return <div>Loading...</div>;
  }

  function calculateAge(dateOfBirth) {
    const dob = new Date(dateOfBirth);
    const diff = Date.now() - dob.getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  return (
    <section className="application-details">
      <div className="page-header">
        <ArrowBackIcon className="back-icon" onClick={() => navigate(-1)} />
        <h1 className="page-title">Application Details</h1>
      </div>
      <div className="application">
        <div className="application-section">
          <h2>Application Information</h2>
          <div className="info-row">
            <p className="details-label">Dog Match: </p>
            <p>
              {application.dog ? application.dog.name : "None Selected"}{" "}
              {application.dog && application.read_profile ? (
                "(Read Profile)"
              ) : (
                <span>
                  (Did Not Read Profile) <FlagIcon className="red-flag" />
                </span>
              )}
            </p>
          </div>
          <div className="info-row">
            <p className="details-label">Created on: </p>
            <p>
              {" "}
              {new Date(application.created_at).toLocaleDateString("en-US", {
                month: "long",
                day: "2-digit",
                year: "numeric",
              })}
            </p>
          </div>
          <div className={`info-row ${editMode ? "edit-mode" : ""}`}>
            <p className="details-label">Status: </p>
            {editMode ? (
              <div className="edit-mode-container">
                <select
                  value={newStatus}
                  onChange={handleChange}
                  className="status-select"
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
                <button onClick={handleSubmit} className="save-btn">
                  Save
                </button>
                <button
                  onClick={() => setEditMode(false)}
                  className="cancel-btn"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <p>
                {application.status}
                <button
                  className="edit-button"
                  onClick={() => setEditMode(true)}
                >
                  <EditIcon />
                </button>
              </p>
            )}
          </div>
        </div>
        <div className="application-section">
          <h2>Applicant Information</h2>
          <div className="info-row">
            <p className="details-label">Applicant Name: </p>
            <p>{application.user.name}</p>
          </div>
          <div className="info-row">
            <p className="details-label">Age: </p>
            <p>{calculateAge(application.user.date_of_birth)}</p>
          </div>
          <div className="info-row">
            <p className="details-label">Email Address: </p>
            <p>{application.user.email}</p>
          </div>
          <div className="info-row">
            <p className="details-label">Phone Number: </p>
            <p>{application.user.phone}</p>
          </div>
          <div className="info-row">
            <p className="details-label">Address:</p>
            <p>
              {application.address}{" "}
              {application.residence_type === "Own" ? "(Owner)" : "(Rental - "}{" "}
              {application.residence_type === "Rent" && (
                <>
                  {application.landlord_permission
                    ? "With Permission)"
                    : "Without Permission)"}
                  {!application.landlord_permission && (
                    <FlagIcon className="red-flag" />
                  )}
                </>
              )}
            </p>
          </div>
          <div className="info-row">
            <p className="details-label">Occupation: </p>
            <p>{application.occupation}</p>
          </div>
        </div>
        <div className="application-section">
          <h2>Household Information</h2>

          <div className="info-row">
            <p className="details-label">Current Pets:</p>
            <p> {application.current_pets ? "Yes" : "No"}</p>
          </div>
          {application.current_pets && (
            <div className="info-row">
              <div className="details-content">
                <p className="details-label">Details: </p>
                <p>{application.current_pets_details}</p>
              </div>
            </div>
          )}

          <div className="info-row">
            <p className="details-label">
              Felony or Animal Cruelty Conviction?
            </p>
            <p>
              {application.felony_conviction
                ? "Yes" && <FlagIcon className="red-flag" />
                : "No"}
            </p>
          </div>
          {application.felony_conviction && (
            <div className="info-row">
              <div className="details-content">
                <p className="details-label">Details: </p>
                <p>{application.felony_details}</p>
              </div>
            </div>
          )}

          <div className="info-row">
            <p className="details-label">Prohibited from Animal Ownership?</p>
            <p>
              {application.pet_prohibition
                ? "Yes" && <FlagIcon className="red-flag" />
                : "No"}
            </p>
          </div>
          {application.pet_prohibition && (
            <div className="info-row">
              <div className="details-content">
                <p className="details-label">Details: </p>
                <p> {application.prohibition_details}</p>
              </div>
            </div>
          )}

          <div className="info-row">
            <p className="details-label">Household Allergies?</p>
            <p>
              {application.household_allergies
                ? "Yes" && <FlagIcon className="red-flag" />
                : "No"}
            </p>
          </div>
          <div className="info-row">
            <p className="details-label">
              Household Members Agree to Adoption?
            </p>
            <p>
              {application.household_agreement
                ? "Yes"
                : "No" && <FlagIcon className="red-flag" />}
            </p>
          </div>
          <div className="info-row">
            <p className="details-label">Children in Household?</p>
            <p>{application.children ? "Yes" : "No"}</p>
          </div>
        </div>
        <div className="application-section">
          <h2>Adoption Experience and Plans</h2>
          <div className="info-row">
            <p className="details-label">Previous Adoptions?</p>
            <p>{application.previous_adoption ? "Yes" : "No"}</p>
          </div>
          {application.previous_adoption && (
            <div className="info-row">
              <div className="details-content">
                <p className="details-label">Details: </p>
                <p>{application.adoption_details}</p>
              </div>
            </div>
          )}

          <div className="info-row">
            <p className="details-label">Reason for Adoption: </p>
            <p>{application.adoption_reason}</p>
          </div>
          <div className="info-row">
            <p className="details-label">Dog Experience: </p>
            <p>{application.dog_experience}</p>
          </div>
          <div className="info-row">
            <p className="details-label">
              Exercise and Mental Stimulation Plan:{" "}
            </p>
            <p>{application.stimulation_plan}</p>
          </div>
          <div className="info-row">
            <p className="details-label">Sleeping Arrangement: </p>
            <p>{application.sleeping_arrangement}</p>
          </div>
          <div className="info-row">
            <p className="details-label">Vet Frequency: </p>
            <p>{application.vet_frequency}</p>
          </div>
        </div>
        <div className="application-section">
          <h2>Dog Preferences</h2>
          <div className="info-row">
            <p className="details-label">Age: </p>
            <p>{application.dog_age.join(", ")}</p>
          </div>
          <div className="info-row">
            <p className="details-label">Size: </p>
            <p>{application.dog_size.join(", ")}</p>
          </div>
          <div className="info-row">
            <p className="details-label">Energy Level: </p>
            <p>{application.dog_energy_level}</p>
          </div>
          <div className="info-row">
            <p className="details-label">Medical Conditions: </p>
            <p>{application.dog_medical_conditions}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminApplicationDetails;
