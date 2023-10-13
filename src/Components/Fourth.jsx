import React from "react";
import { useNavigate } from "react-router-dom";

const Fourth = () => {
  const navigate = useNavigate();
  return (
    <>
      <h1>Halaman Edit</h1>
      <button onClick={() => navigate("/")}>Kembali ke Halaman Utama</button>
    </>
  );
};

export default Fourth;
