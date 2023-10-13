import React from "react";
import { useNavigate } from "react-router-dom";

const Five = () => {
  const navigate = useNavigate();
  return (
    <>
      <h1>Halaman Tambah</h1>
      <button onClick={() => navigate("/")}>Kembali ke Halaman Utama</button>
    </>
  );
};

export default Five;
