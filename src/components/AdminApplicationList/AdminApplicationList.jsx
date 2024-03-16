import React from "react";
import "../AdminDogList/AdminDogList.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { fetchAdminApplicationsAsync } from "../../features/applicationSlice";

const AdminApplicationList = () => {
  const dispatch = useDispatch();
  const applications = useSelector((state) =>
    [...state.application.applications].sort(
      (a, b) => new Date(a.created_at) - new Date(b.created_at)
    )
  );
  const navigate = useNavigate();

  console.log("applications", applications);

  useEffect(() => {
    dispatch(fetchAdminApplicationsAsync());
  }, [dispatch]);

  return (
    <section className="admin-list">
      <div className="page-header">
        <ArrowBackIcon className="back-icon" onClick={() => navigate(-1)} />
        <h1 className="page-title">Admin Application List</h1>
      </div>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Applicant</th>
            <th>Dog Match</th>
            <th>Status</th>
            <th>Created On</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr key={app.id} className="admin-row">
              <td>{app.user.name}</td>
              <td>{app.dog ? app.dog.name : "None Selected"}</td>
              <td>{app.status}</td>
              <td>
                {new Date(app.created_at).toLocaleDateString("en-US", {
                  month: "long",
                  day: "2-digit",
                  year: "numeric",
                })}
              </td>
              <td>
                <button
                  className="edit-button"
                  onClick={() => navigate(`/admin/applications/${app.id}`)}
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

export default AdminApplicationList;
