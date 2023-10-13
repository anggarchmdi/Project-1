import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import { format } from "date-fns";
import idLocale from "date-fns/locale/id";

const Five = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [tanggalLahir, setTanggalLahir] = useState("");
  const [kotaAsal, setKotaAsal] = useState("Bantul");
  const [gender, setGender] = useState("Laki-laki");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handlePhoneChange = (e) => {
    const sanitizedPhone = e.target.value.replace(/\D/g, "");
    setPhone(sanitizedPhone);
  }
  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const addItem = () => {
    if (name.trim() === "" || phone.trim() === "" || kotaAsal.trim() === "") {
      alert("Harap isi data Anda dengan benar!");
      return;
    }

    setIsLoading(true);

    const existingItems = JSON.parse(localStorage.getItem("items")) || [];
    const newItem = {
      name,
      phone,
      kotaAsal,
      gender,
      tanggalLahir: format(new Date(tanggalLahir), "dd/MM/yyyy", {
        locale: idLocale,
      }),
      timestamp: format(new Date(), "dd MMMM yyyy HH:mm:ss", {
        locale: idLocale,
      }),
    };

    existingItems.push(newItem);
    localStorage.setItem("items", JSON.stringify(existingItems));
    setName("");
    setPhone("");
    setKotaAsal("Bantul");
    setGender("Laki-laki");
    setTanggalLahir("");

    setTimeout(() => {
      setIsLoading(false);
      navigate("/");
    }, 1500);
  };

  const goToHome = () => {
    navigate("/");
  };

  return (
    <div className="container-sm">
      <h4 className="text-4xl d-flex justify-content-center mt-4 py-10 font-bold text-center text-black">
        SILAHKAN ISI DATA DIRI ANDA!
      </h4>
      <div className="min-vh-100 justify-content-center align-items-center">
        <div className="bg-white p-4 rounded-lg shadow">
          <h1 className="text-3xl font-weight-light">Masukkan Nama Lengkap</h1>
          <input
            type="text"
            className="form-control mt-4"
            placeholder="Masukkan nama"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <h1 className="text-3xl mt-4 mb-2 font-weight-light">
            Masukkan Tanggal Lahir
          </h1>
          <input
            type="date"
            className="form-control mt-3"
            value={tanggalLahir}
            onChange={(e) => setTanggalLahir(e.target.value)}
          />

          <h1 className="text-3xl mt-4 mb-2 font-weight-light">
            Masukkan Nomer Telephone
          </h1>
          <input
            type="text"
            className="form-control mt-3"
            placeholder="Masukkan nomor telepon"
            value={phone}
            onChange={handlePhoneChange}
          />
          <h1 className="text-3xl mt-4 mb-2 font-weight-light">
            Pilih Jenis Kelamin
          </h1>
          <select
            className="form-select mt-3"
            value={gender}
            onChange={handleGenderChange}
          >
            <option value="Laki-laki">Laki-laki</option>
            <option value="Perempuan">Perempuan</option>
          </select>
          <h1 className="text-3xl mt-4 mb-2 font-weight-light">
            Pilih Kota Asal
          </h1>
          <select
            className="form-select mt-3"
            value={kotaAsal}
            onChange={(e) => setKotaAsal(e.target.value)}
          >
            <option value="Bantul">Bantul</option>
            <option value="Sleman">Sleman</option>
            <option value="Kulon Progo">Kulon Progo</option>
            <option value="Gunung Kidul">Gunung Kidul</option>
            <option value="Kota Madya">Kota Madya</option>
          </select>
          <div className="mt-4 d-flex justify-content-end">
            {isLoading ? (
              <Spinner animation="border" variant="success" />
            ) : (
              <button
                onClick={addItem}
                className="btn btn-outline-success me-2"
              >
                Tambah
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
    </div>
  );
};

export default Five;
