import React from "react";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <h1>ĐÂY LÀ TRANG DASHBOARD</h1>

      {/* Nút quay lại mainpage */}
      <button onClick={() => navigate("/")}>
        Quay lại Main Page
      </button>
    </div>
  );
}
