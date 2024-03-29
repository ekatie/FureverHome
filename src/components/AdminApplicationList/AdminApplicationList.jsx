import React from "react";
import "../AdminDogList/AdminDogList.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { fetchAdminApplicationsAsync } from "../../features/applicationSlice";

const AdminApplicationList = () => {
  const dispatch = useDispatch();
  const applications = useSelector((state) => state.application.applications);
  const status = useSelector((state) => state.application.status);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAdminApplicationsAsync());
  }, [dispatch]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }
  if (status === "failed") {
    return <div>Failed to load applications</div>;
  }

  return (
    <section className="admin-list">
      <div className="page-header">
        <ArrowBackIcon
          className="back-icon"
          onClick={() => navigate("/admin/dashboard")}
        />
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
                  <FileOpenIcon />
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
