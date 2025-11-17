import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";

import { database } from "../../dtb/firebase";
import { ref, onValue } from "firebase/database";

export default function Dashboard() {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const historyRef = ref(database, "sensorHistory");

    const unsubscribe = onValue(historyRef, (snapshot) => {
      const obj = snapshot.val();
      if (!obj) {
        setHistory([]);
        return;
      }

      // convert object { "1": {...}, "2": {...} } → array [{id, ...}, ...]
      const arr = Object.entries(obj).map(([id, row]) => ({
        id,
        ...row,
      }));

      // sort theo id tăng dần (đảm bảo thứ tự thời gian)
      arr.sort((a, b) => Number(a.id) - Number(b.id));

      setHistory(arr);
    });

    // Realtime listener cleanup (optional)
    return () => unsubscribe();
  }, []);

  const latest = history.length > 0 ? history[history.length - 1] : null;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>IoT Dashboard</h1>
        <button className="back-btn" onClick={() => navigate("/")}>
          ⬅ Quay lại Main Page
        </button>
      </div>

      {/* Cards hiển thị giá trị hiện tại */}
      <div className="card-grid">
        <div className="card temperature">
          <h2>Nhiệt độ</h2>
          <p className="card-value">
            {latest ? `${latest.temperature} °C` : "--"}
          </p>
          <p className="card-sub">
            Cập nhật lúc: {latest ? latest.time : "N/A"}
          </p>
        </div>

        <div className="card humidity">
          <h2>Độ ẩm</h2>
          <p className="card-value">
            {latest ? `${latest.humidity} %` : "--"}
          </p>
          <p className="card-sub">
            Cập nhật lúc: {latest ? latest.time : "N/A"}
          </p>
        </div>

        <div className="card light">
          <h2>Ánh sáng</h2>
          <p className="card-value">
            {latest ? `${latest.light} lux` : "--"}
          </p>
          <p className="card-sub">
            Cập nhật lúc: {latest ? latest.time : "N/A"}
          </p>
        </div>
      </div>

      {/* Bảng lịch sử */}
      <div className="history-table-wrapper">
        <h2>Lịch sử đo (20 mẫu gần nhất)</h2>
        <table className="history-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Thời gian</th>
              <th>Nhiệt độ (°C)</th>
              <th>Độ ẩm (%)</th>
              <th>Ánh sáng (lux)</th>
            </tr>
          </thead>
          <tbody>
            {history.map((row, index) => (
              <tr key={row.id || index}>
                <td>{row.id}</td>
                <td>{row.time}</td>
                <td>{row.temperature}</td>
                <td>{row.humidity}</td>
                <td>{row.light}</td>
              </tr>
            ))}
            {history.length === 0 && (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  Chưa có dữ liệu sensorHistory trong Firebase.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}