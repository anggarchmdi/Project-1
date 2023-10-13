import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Detail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const itemDetail = location.state;

  useEffect(() => {
    if (!itemDetail) {
      navigate("/");
    }
  }, [itemDetail, navigate]);

  return (
    <div className="bg-light min-vh-100 d-flex flex-column justify-content-center align-items-center p-4">
      <h2 className="text-dark text-bold text-center mb-4 display-4">
        Detail Data Diri Anda
      </h2>
      <div className="bg-white p-4 rounded shadow-lg w-50 mt-4">
        {itemDetail && (
          <table className="table table-striped">
            <tbody>
              <tr>
                <th>Nama Lengkap:</th>
                <td>{itemDetail.name}</td>
              </tr>
              <tr>
                <th>Tanggal Lahir:</th>
                <td>{itemDetail.tanggalLahir}</td>
              </tr>
              <tr>
                <th>Jenis Kelamin:</th>
                <td>{itemDetail.gender}</td>
              </tr>
              <tr>
                <th>Nomor Telepon:</th>
                <td>{itemDetail.phone}</td>
              </tr>
              <tr>
                <th>Kota Asal:</th>
                <td>{itemDetail.kotaAsal}</td>
              </tr>
            </tbody>
          </table>
        )}
        <button onClick={() => navigate("/")} className="btn btn-outline-danger mt-4">
          Kembali
        </button>
      </div>
    </div>
  );
};

export default Detail;
