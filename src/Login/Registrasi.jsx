import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import showPasswordImg from "../Assets/eye.png";
import hidePasswordImg from "../Assets/hide.png";

const Registrasi = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [konfirmasi, setKonfirmasi] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

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

  const handleRegistration = () => {
    if (username && password && konfirmasi) {
      if (password === konfirmasi) {
        if (isPasswordValid(password)) {
          const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
          const isExistingUser = existingUsers.some((user) => user.username === username);

          if (isExistingUser) {
            alert("Username sudah digunakan. Silakan pilih username lain.");
          } else {
            const newUser = {
              username,
              password,
            };
            existingUsers.push(newUser);
            localStorage.setItem("users", JSON.stringify(existingUsers));

            navigate("/login");
          }
        } else {
          alert("Password harus terdiri minimal dari 8 karakter, 1 huruf besar, dan 1 angka.");
        }
      } else {
        alert("Pastikan password dan konfirmasi password sesuai.");
      }
    } else {
      alert("Pastikan semua input diisi.");
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-md-6">
          <div className="card shadow p-4">
            <h1 className="text-center mb-4">Halaman Pendaftaran!</h1>
            <div className="mb-2">
              <label className="form-label">Masukkan Username Anda:</label>
              <input
                type="text"
                placeholder="Username"
                value={username}
                className="form-control"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label className="form-label">Masukkan Password Anda</label>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
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
                    className="w-6 h-6"
                    src={showPassword ? hidePasswordImg : showPasswordImg}
                    alt={showPassword ? "Hide" : "Show"}
                  />
                </button>
              </div>
            </div>
            <div className="mb-2">
              <label className="form-label">Konfirmasi Password Anda</label>
              <div className="input-group">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Konfirmasi Password"
                  value={konfirmasi}
                  className="form-control"
                  onChange={(e) => setKonfirmasi(e.target.value)}
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={toggleShowConfirmPassword}
                >
                  <img
                    className="w-6 h-6"
                    src={showConfirmPassword ? hidePasswordImg : showPasswordImg}
                    alt={showConfirmPassword ? "Hide" : "Show"}
                  />
                </button>
              </div>
            </div>
            <button
              className="btn btn-outline-primary w-100 mb-2"
              onClick={handleRegistration}
            >
              Daftar Sekarang
            </button>
            <div className="text-center">
              <span className="text-sm">Sudah Punya Akun?</span>
              <span
                className="text-sm text-primary cursor-pointer"
                onClick={() => navigate("/login")}
              >
                Login Sekarang!
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registrasi;
