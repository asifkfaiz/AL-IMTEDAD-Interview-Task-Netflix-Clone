import React from "react";
import { useNavigate } from "react-router-dom";

function ErrorPage({ message }) {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Oops! Something went wrong.</h1>
      <p>{message || "An unexpected error occurred."}</p>
      <button onClick={() => navigate("/")}>Go Home</button>
    </div>
  );
}

export default ErrorPage;
