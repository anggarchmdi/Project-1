import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import showPasswordImg from "../Assets/eye.png";
import hidePasswordImg from "../Assets/hide.png";

const Ganti = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const authenticatedUser = JSON.parse(localStorage.getItem("authenticatedUser"));

  const toggleShowOldPassword = () => {
    setShowOldPassword(!showOldPassword);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const isPasswordValid = (password) => {
    const passwordPattern = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordPattern.test(password);
  };

  const handleGantiPassword = () => {
    const authenticatedUser = localStorage.getItem("authenticatedUser");
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const userToUpdate = existingUsers.find((user) => user.username === authenticatedUser);
  
    if (userToUpdate) { // Periksa apakah pengguna ditemukan
      if (userToUpdate.password === oldPassword) { // Periksa password lama
        if (password && password === confirmPassword) {
          if (isPasswordValid(password)) {
            userToUpdate.password = password;
            const updatedUsers = existingUsers.map((user) =>
              user.username === authenticatedUser ? userToUpdate : user
            );
            localStorage.setItem("users", JSON.stringify(updatedUsers));
            alert("Password telah diGanti.");
            navigate("/");
          } else {
            alert("Password harus terdiri minimal dari 8 karakter, 1 huruf besar, dan 1 angka.");
          }
        } else {
          alert("Pastikan password dan konfirmasi password sesuai.");
        }
      } else {
        alert("Password lama salah. Pastikan Anda memasukkan password lama yang benar.");
      }
    } else {
      alert("Pengguna tidak ditemukan. Silakan login kembali.");
      navigate("/login");
    }
  };

  const handleBatal = () => {
    navigate("/");
  };

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-md-6">
          <div className="card shadow p-4">
            <h1 className="text-center mb-4">Ganti Password</h1>

            <p className="text-center">Selamat datang, {authenticatedUser.username}</p>
            <div className="mb-2">
              <label className="form-label">Masukkan Password Lama Anda</label>
              <div className="input-group">
                <input
                  type={showOldPassword ? "text" : "password"}
                  placeholder="Password Lama"
                  value={oldPassword}
                  className="form-control"
                  onChange={(e) => setOldPassword(e.target.value)}
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={toggleShowOldPassword}
                >
                  <img
                    src={showOldPassword ? hidePasswordImg : showPasswordImg}
                    alt={showOldPassword ? "Hide" : "Show"}
                    style={{ width: "24px", height: "24px" }}
                  />
                </button>
              </div>
            </div>
            <div className="mb-2">
              <label className="form-label">Masukkan Password Baru Anda</label>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password Baru"
                  value={password}
                  className="form-control"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={toggleShowPassword}
                >
                  <img
                    src={showPassword ? hidePasswordImg : showPasswordImg}
                    alt={showPassword ? "Hide" : "Show"}
                    style={{ width: "24px", height: "24px" }}
                  />
                </button>
              </div>
            </div>
            <div className="mb-2">
              <label className="form-label">Konfirmasi Password Baru Anda</label>
              <div className="input-group">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Konfirmasi Password Baru"
                  value={confirmPassword}
                  className="form-control"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={toggleShowConfirmPassword}
                >
                  <img
                    src={showConfirmPassword ? hidePasswordImg : showPasswordImg}
                    alt={showConfirmPassword ? "Hide" : "Show"}
                    style={{ width: "24px", height: "24px" }}
                  />
                </button>
              </div>
            </div>
            <button className="btn btn-outline-danger w-100 mb-2" onClick={handleGantiPassword}>Ganti Password</button>
            <button className="btn btn-outline-secondary w-100"onClick={handleBatal}>Batal</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ganti;
