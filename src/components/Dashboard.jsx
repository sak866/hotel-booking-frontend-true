import React from "react";
import { useNavigate } from "react-router-dom";
function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "80px" }}>
      <h1>Hotel Booking Dashboard</h1>
      <h2>Welcome {user?.name}</h2>
      <p>Email: {user?.email}</p>
      <p>Role: {user?.role}</p>
       <button onClick={() => navigate("/hotels")}>
    View Hotels
</button>
      
    </div>
  );
}

export default Dashboard;