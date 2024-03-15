import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const AdminApplicationDetails = () => {
  const navigate = useNavigate();

  return (
    <section>
      <div className="page-header">
        <ArrowBackIcon
          className="back-icon"
          onClick={() => navigate("/admin/applications")}
        />
        <h1 className="page-title">Admin Application Details</h1>
      </div>
    </section>
  );
};

export default AdminApplicationDetails;
