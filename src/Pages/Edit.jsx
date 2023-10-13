import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import { format } from "date-fns";
import idLocale from "date-fns/locale/id";

const Edit = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [tanggalLahir, setTanggalLahir] = useState("");
  const [kotaAsal, setKotaAsal] = useState("");
  const [gender, setGender] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDataChanged, setIsDataChanged] = useState(false);

  useEffect(() => {
    if (location.state) {
      setName(location.state.name || "");
      setPhone(location.state.phone || "");
      setTanggalLahir(location.state.tanggalLahir || "");
      setKotaAsal(location.state.kotaAsal || "");
      setGender(location.state.gender || "");
    }
  }, [location.state]);

  useEffect(() => {
    const originalData = location.state || {};
    const hasDataChanged =
      name !== originalData.name ||
      phone !== originalData.phone ||
      tanggalLahir !== originalData.tanggalLahir ||
      kotaAsal !== originalData.kotaAsal ||
      gender !== originalData.gender;

    setIsDataChanged(hasDataChanged);
  }, [name, phone, tanggalLahir, kotaAsal, gender, location.state]);

  const goToHome = () => {
    navigate("/");
  };

  const handlePhoneChange = (e) => {
    const sanitizedPhone = e.target.value.replace(/\D/g, "");
    setPhone(sanitizedPhone);
  };

  const updateItem = () => {
    setIsLoading(true);

    if (!tanggalLahir) {
      console.error("Tanggal Lahir harus diisi");
      setIsLoading(false);
      return;
    }

    const updatedItem = {
      name,
      phone,
      tanggalLahir: format(new Date(tanggalLahir), "dd/MM/yyyy", {
        locale: idLocale,
      }),
      kotaAsal,
      gender,
      timestamp: format(new Date(), "dd MMMM yyyy HH:mm:ss", {
        locale: idLocale,
      }),
    };

    const storedItems = JSON.parse(localStorage.getItem("items")) || [];
    const updatedItems = [...storedItems];
    const indexToUpdate = location.pathname.split("/")[2];
    updatedItems[indexToUpdate] = updatedItem;
    localStorage.setItem("items", JSON.stringify(updatedItems));

    setTimeout(() => {
      setIsLoading(false);
      navigate("/");
    }, 1500);
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="bg-white p-4 shadow rounded w-75">
        <h1 className="text-center text-dark mb-4">
          SILAHKAN EDIT DATA DIRI ANDA!
        </h1>
        <div className="mb-3">
          <label className="form-label">Edit Nama Lengkap</label>
          <input
            type="text"
            className="form-control"
            placeholder="Masukkan nama"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Edit Nomor Telepon</label>
          <input
            type="text"
            className="form-control"
            placeholder="Masukkan nomor telepon"
            value={phone}
            onChange={handlePhoneChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Edit Tanggal Lahir</label>
          <input
            type="date"
            className="form-control"
            value={tanggalLahir}
            onChange={(e) => setTanggalLahir(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Edit Kota Asal</label>
          <select
            className="form-select"
            value={kotaAsal}
            onChange={(e) => setKotaAsal(e.target.value)}
          >
            <option value="Bantul">Bantul</option>
            <option value="Sleman">Sleman</option>
            <option value="Kulon Progo">Kulon Progo</option>
            <option value="Gunung Kidul">Gunung Kidul</option>
            <option value="Kota Madya">Kota Madya</option>
          </select>
        </div>

        {/* Dropdown untuk jenis kelamin */}
        <div className="mb-3">
          <label className="form-label">Jenis Kelamin</label>
          <select
            className="form-select"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="Laki-laki">Laki-laki</option>
            <option value="Perempuan">Perempuan</option>
          </select>
        </div>

        <div className="mt-4 d-flex justify-content-end">
          {isLoading ? (
            <Spinner animation="border" variant="success" />
          ) : (
            <button
              onClick={updateItem}
              className="btn btn-outline-success me-2"
              disabled={!isDataChanged}
            >
              Simpan
            </button>
          )}
          <button
            onClick={goToHome}
            className="btn btn-outline-secondary"
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  );
};

export default Edit;
