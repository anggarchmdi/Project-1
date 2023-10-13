import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      localStorage.removeItem("authenticatedUser");
      navigate("/login");
    };

    handleLogout();
  }, [navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="Container w-96 h-auto bg-slate-200 mt-8 ml-8 border rounded-lg">
        <h1 className="pt-6 font-bold text-center text-2xl">Logging Out</h1>
      </div>
    </div>
  );
};

export default Logout;
