import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminDogsAsync } from "../../features/dogSlice";
import { useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import "./AdminDogList.scss";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { findDefaultImage } from "../../helpers/findDefaultImage";

const AdminDogList = () => {
  const dispatch = useDispatch();
  const dogs = useSelector((state) => state.dogs.dogs);
  const status = useSelector((state) => state.dogs.status);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAdminDogsAsync());
  }, [dispatch]);

  const navigateToEdit = (dogId) => {
    navigate(`/admin/dogs/${dogId}`);
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }
  if (status === "failed") {
    return <div>Failed to load dogs</div>;
  }

  return (
    <section className="admin-list">
      <div className="page-header">
        <ArrowBackIcon className="back-icon" onClick={() => navigate('/admin/dashboard')} />
        <h1 className="page-title">Current Dogs</h1>
        <button className="add-btn" onClick={() => navigate("/admin/dogs/new")}>
          Add Dog
        </button>
      </div>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Photo</th>
            <th>Name</th>
            <th>Status</th>
            <th>Location</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {dogs.map((dog) => (
            <tr key={dog.id} className="admin-row">
              <td>
                <img
                  src={findDefaultImage(dog)}
                  alt={dog.name}
                  className="list-image"
                />
              </td>
              <td>{dog.name}</td>
              <td>{dog.status}</td>
              <td>{dog.foster_location}</td>
              <td>
                <button
                  className="edit-button"
                  onClick={() => navigateToEdit(dog.id)}
                >
                  <EditIcon />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default AdminDogList;
