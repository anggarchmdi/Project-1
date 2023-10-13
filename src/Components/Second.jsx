import React from "react";
import { useNavigate } from "react-router-dom";

const Second = () => {
  const navigate = useNavigate();
  return (
    <>
      <h1>Halaman Kedua</h1>
      <button onClick={() => navigate("/")}>Kembali ke Halaman Utama</button>
    </>
  );
};

export default Second;
