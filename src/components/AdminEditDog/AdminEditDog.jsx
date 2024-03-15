import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const AdminEditDog = () => {
  const navigate = useNavigate();
  
  return (
    <div>
      <div className="page-header">
        <ArrowBackIcon
          className="back-icon"
          onClick={() => navigate("/admin/dogs")}
        />
        <h1 className="page-title">Admin Edit Dog</h1>
      </div>
    </div>
  );
};

export default AdminEditDog;
