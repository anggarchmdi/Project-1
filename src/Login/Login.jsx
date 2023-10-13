import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import showPasswordImg from "../Assets/eye.png";
import hidePasswordImg from "../Assets/hide.png";
import "bootstrap/dist/css/bootstrap.min.css";
import Spinner from "react-bootstrap/Spinner";

const Login = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    if (username && password) {
      setIsLoading(true);
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const authenticatedUser = users.find(
        (user) => user.username === username && user.password === password
      );

      if (authenticatedUser) {
        setIsAuthenticated(true);
        localStorage.setItem("authenticatedUser", JSON.stringify({ username }));
        setTimeout(() => {
          setIsLoading(false);
          navigate("/");
        }, 2000);
      } else {
        setIsLoading(false);
        alert("Gagal login: Username atau password salah.");
      }
    } else {
      alert("Gagal login: Pastikan semua input diisi.");
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-md-6">
          <div className="card shadow p-4">
            <h1 className="text-center mb-4">Selamat Datang!</h1>
            <form>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username:
                </label>
                <input
                  type="text"
                  id="username"
                  placeholder="Masukkan Username Anda"
                  value={username}
                  className="form-control"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password:
                </label>
                <div className="input-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="Masukkan Password Anda"
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
              {isLoading ? (
                <div className="overlay">
                  <Spinner animation="border" variant="primary" />
                </div>
              ) : (
                <button
                  className="btn btn-outline-primary w-100"
                  onClick={handleLogin}
                >
                  Login
                </button>
              )}
              <div className="mt-3 text-center">
                <span className="text-sm">Belum Punya Akun?</span>
                <span
                  className="text-sm text-primary cursor-pointer"
                  onClick={() => navigate("/registrasi")}
                >
                  Daftar Sekarang!
                </span>
              </div>
              <div className="mt-2 text-center">
                <span
                  className="text-sm text-primary cursor-pointer"
                  onClick={() => navigate("/LupaPassword")}
                >
                  Lupa Password?
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
