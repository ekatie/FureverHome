import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../features/userSlice";
import { useEffect, useState } from "react";
import API from "../../services/api";

// User to view form when profile incomplete or when user clicks "Edit"
// User to view "Save Changes" button when in edit mode
// User to view "Edit" button when not in edit mode
// User to view "Please complete your profile" message when profile incomplete
// User to view form fields disabled when not in edit mode
// User to view form fields enabled when in edit mode
// User to view form fields pre-populated with user data

function UserProfile() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const state = useSelector((state) => state);

  useEffect(() => {
    setFormData({
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
      dateOfBirth: user.date_of_birth || "",
    });
  }, [user]);

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dateOfBirth: "",
  });

  // Check if profile is complete
  const isProfileComplete = () => {
    return (
      formData.name && formData.email && formData.phone && formData.dateOfBirth
    );
  };

  // Handle form data change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Save profile changes
  const saveChanges = async () => {
    if (user && user.id) {
      try {
        const response = await API.patch(`/users/${user.id}`, formData);
        dispatch(updateUser(response.data));
        setEditMode(false); // Exit edit mode after saving changes
      } catch (error) {
        console.error(
          "Failed to update user profile:",
          error.response?.data || error.message
        );
      }
    }
  };

  if (!user) {
    return <h1>Not logged in</h1>;
  }

  return (
    <div>
      <h1>User Profile</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={!editMode}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={!editMode}
          />
        </div>
        <div>
          <label>Phone:</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            disabled={!editMode}
          />
        </div>
        <div>
          <label>Date of Birth:</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            disabled={!editMode}
          />
        </div>
        {!editMode ? (
          <button onClick={() => setEditMode(true)}>Edit</button>
        ) : (
          <button onClick={saveChanges}>Save Changes</button>
        )}
      </form>
      {!isProfileComplete() && <p>Please complete your profile.</p>}
    </div>
  );
}

export default UserProfile;
