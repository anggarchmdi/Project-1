import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LupaPassword = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleNext = () => {
    const usersData = JSON.parse(localStorage.getItem("users")) || [];
    const isUserValid = usersData.some((user) => user.username === username);

    if (isUserValid) {
      navigate("/reset");
    } else {
      alert("Username tidak valid. Pastikan username Anda sesuai dengan yang terdaftar.");
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-md-6">
          <div className="card shadow p-4">
            <h1 className="text-center mb-4">Lupa Password</h1>
            <p className="mb-2">Masukkan Username Anda:</p>
            <div className="input-group mb-3">
              <input
                type="text"
                placeholder="Username"
                value={username}
                className="form-control"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <button
              className="btn btn-outline-warning w-100 mb-2"
              onClick={handleNext}
            >
              Lanjutkan
            </button>
            <div className="text-center">
              <span className="text-sm">Kembali ke</span>
              <span
                className="text-sm text-primary cursor-pointer"
                onClick={() => navigate("/login")}
              >
                Login
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LupaPassword;
