import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import showPasswordImg from "../Assets/eye.png";
import hidePasswordImg from "../Assets/hide.png";

const Reset = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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

  const handleResetPassword = () => {
    if (password && password === confirmPassword) {
      if (isPasswordValid(password)) {
        alert("Password telah direset.");
        navigate("/login");
      } else {
        alert("Password harus terdiri minimal dari 8 karakter, 1 huruf besar, dan 1 angka.");
      }
    } else {
      alert("Pastikan password dan konfirmasi password sesuai.");
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-md-6">
          <div className="card shadow p-4">
            <h1 className="text-center mb-4">Reset Password</h1>
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
            <button
              className="btn btn-outline-danger w-100 mb-2"
              onClick={handleResetPassword}
            >
              Reset Password
            </button>
            <div className="text-center">
              <span className="font-mono float-left ml-2">Kembali ke Login</span>
              <span
                className="font-thin float-right mr-2 cursor-pointer text-primary"
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

export default Reset;
