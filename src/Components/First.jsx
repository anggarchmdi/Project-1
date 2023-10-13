import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import setting from "../Assets/setting.png";
import deleteImg from "../Assets/delete.png";
import editImg from "../Assets/edit.png";
import detailImg from "../Assets/detail.png";
import addImg from "../Assets/add.png";
import gantiPasswordImg from "../Assets/reset-password.png";
import logoutImg from "../Assets/logout.png";
import searchImg from "../Assets/search.png";
import ChartImg from "../Assets/pie-chart.png";
import Pagination from 'react-bootstrap/Pagination';
import { PieChart, Pie, Cell } from 'recharts';

const First = () => {
  const navigate = useNavigate();
  const [editedData, setEditedData] = useState([]);
  const [isSettingHovered, setIsSettingHovered] = useState(false);
  const dropdownRef = useRef(null);
  const [searchText, setSearchText] = useState("");
  const [isChartVisible, setIsChartVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(editedData.length / itemsPerPage);
  const [genderData, setGenderData] = useState([]);
  const [addressData, setAddressData] = useState([]);
  const [selectedChart, setSelectedChart] = useState("gender"); // State to track the selected chart

  const COLORS = ['#FFCD4B', '#ff6b81', '#4ea5d9', '#84c0e1', '#1f7a66'];
  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("items")) || [];
    setEditedData(storedItems);
    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  const handleDocumentClick = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsSettingHovered(false);
    }
  };

  useEffect(() => {
    // Menghitung data jenis kelamin dan kotaAsal
    const genders = {};
    const addresses = {};

    editedData.forEach((item) => {
      // Menghitung jumlah jenis kelamin
      if (genders[item.gender]) {
        genders[item.gender]++;
      } else {
        genders[item.gender] = 1;
      }

      // Menghitung jumlah kotaAsal
      if (addresses[item.kotaAsal]) {
        addresses[item.kotaAsal]++;
      } else {
        addresses[item.kotaAsal] = 1;
      }
    });

    // Mengonversi objek menjadi array
    const genderArray = Object.keys(genders).map((gender) => ({
      gender,
      count: genders[gender],
    }));
    const addressArray = Object.keys(addresses).map((kotaAsal) => ({
      kotaAsal,
      count: addresses[kotaAsal],
    }));

    // Menyimpan data ke dalam state
    setGenderData(genderArray);
    setAddressData(addressArray);
  }, [editedData]);

  const handleDelete = (index) => {
    const confirmDelete = window.confirm(
      "Apakah Anda yakin ingin menghapus item ini?"
    );
    if (!confirmDelete) {
      return;
    }

    const updatedItems = [...editedData];
    updatedItems.splice(index, 1);
    setEditedData(updatedItems);
    localStorage.setItem("items", JSON.stringify(updatedItems));
  };

  const handleEdit = (index) => {
    const itemToEdit = editedData[index];
    navigate(`/Edit/${index}`, { state: itemToEdit });
  };

  const handleDetail = (index) => {
    const itemDetail = editedData[index];
    navigate(`/Detail/${index}`, { state: itemDetail });
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/logout");
  };

  const handleGantiPasswordClick = () => {
    navigate("/Ganti");
  };

  const handleSettingClick = () => {
    setIsSettingHovered(!isSettingHovered);
  };

  const handleChartIconClick = () => {
    setIsChartVisible(!isChartVisible);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const filteredData = editedData.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const getCurrentItemNumber = (index) => {
    return index + 1 + (currentPage - 1) * itemsPerPage;
  };

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    } else if (pageNumber < 1) {
      setCurrentPage(totalPages);
    } else if (pageNumber > totalPages) {
      setCurrentPage(1);
    }
  };

  const renderPagination = () => {
    const paginationItems = [];

    if (totalPages <= 1) {
      return paginationItems;
    }

    if (currentPage > 1) {
      paginationItems.push(
        <Pagination.Prev
          key="prev"
          onClick={() => paginate(currentPage - 1)}
        />
      );
    }

    if (startPage > 1) {
      paginationItems.push(
        <Pagination.First key="first" onClick={() => paginate(1)} />
      );
      if (startPage > 2) {
        paginationItems.push(<Pagination.Ellipsis key="startEllipsis" />);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      paginationItems.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => paginate(i)}
        >
          {i}
        </Pagination.Item>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        paginationItems.push(<Pagination.Ellipsis key="endEllipsis" />);
      }
      paginationItems.push(
        <Pagination.Last
          key="last"
          onClick={() => paginate(totalPages)}
        />
      );
    }

    if (currentPage < totalPages) {
      paginationItems.push(
        <Pagination.Next
          key="next"
          onClick={() => paginate(currentPage + 1)}
        />
      );
    }

    return paginationItems;
  };

  const groupSize = 3;
  const groupNumber = Math.ceil(currentPage / groupSize);
  const startPage = (groupNumber - 1) * groupSize + 1;
  const endPage = Math.min(startPage + groupSize - 1, totalPages);

  return (
    <div className="bg-light min-vh-100">
      <nav className="h-16 navbar navbar-expand-lg navbar-dark bg-gradient-to-r from-blue-700 via-blue-700 to-blue-500">
        <div className="container">
          <Link to="/" className="navbar-brand">
            Home
          </Link>
          <Link to="/Contact" className="navbar-brand">
            Contact
          </Link>
          <div className="ml-auto">
            <div className="btn-group" ref={dropdownRef}>
              <button
                type="button"
                onClick={handleSettingClick}
                className="btn dropdown-toggle"
              >
                <img
                  src={setting}
                  alt="Setting"
                  className="w-8 h-8"
                  title="Setting"
                />
              </button>
              <div className={`dropdown-menu ${isSettingHovered ? "show" : ""}`}>
                <button className="dropdown-item" onClick={handleGantiPasswordClick}>
                  <div>
                    <img
                      src={gantiPasswordImg}
                      alt="Ganti"
                      className="w-6 h-6 float-left"
                    />
                    <span className="ml-4 float-right">Ganti Psswd</span>
                  </div>
                </button>
                <button className="dropdown-item" onClick={handleLogout}>
                  <div>
                    <img src={logoutImg} alt="Logout" className="w-6 h- float-left" />
                    <span className="ml-2 float-right">Log out</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="container mt-4">
        <h1 className="text-black mb-3">Daftar Data Diri Anda!</h1>

        {/* Search */}
        <div className="mb-12 input-group w-6 h-6" title="Search">
          <input
            type="text"
            className={`form-control "d-none"}`}
            placeholder="Cari berdasarkan nama"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <div className="input-group-append">
            <span className="input-group-text">
              <img
                src={searchImg}
                alt="Search"
                className="w-10 h-10"
              />
            </span>
          </div>
        </div>

        {/* Tambah data */}
        <div className="d-flex justify-content-between align-items-center mt-2 mb-4">
          <button
            onClick={() => navigate("/Add")}
            className="btn btn-outline-primary"
          >
            <img
              src={addImg}
              alt="Add"
              className="w-6 h-6 mr-2"
              title="Add"
            />
            <span>Tambah Data</span>
          </button>

          {/* Chart icon */}
          <button
            onClick={handleChartIconClick}
            className="btn btn-link"
          >
            <img
              src={ChartImg}
              alt="Chart"
              className="w-6 h-6"
              title="Chart"
            />
          </button>
        </div>

        {/* Chart section */}
        {isChartVisible && (
          <div className="chart-section">
            <div>
              <h2>{selectedChart === "gender" ? "Chart Jenis Kelamin" : "Chart Kota Asal"}</h2>
              {selectedChart === "gender" ? (
                <PieChart width={400} height={300}>
                  <Pie
                    dataKey="count"
                    isAnimationActive={false}
                    data={genderData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label={(entry) => entry.gender}
                  >
                    {genderData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              ) : (
                <PieChart width={400} height={300}>
                  <Pie
                    dataKey="count"
                    isAnimationActive={false}
                    data={addressData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#82ca9d"
                    label={(entry) => entry.kotaAsal}
                  >
                    {addressData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              )}
            </div>
            <div>
              <div className="d-flex">
                <button
                  className={`btn btn-sm btn-${selectedChart === "gender" ? "primary" : "outline-primary"}`}
                  onClick={() => setSelectedChart("gender")}
                >
                  Gender
                </button>
                <button
                  className={`btn btn-sm btn-${selectedChart === "address" ? "primary" : "outline-primary"}`}
                  onClick={() => setSelectedChart("address")}
                >
                  Kota Asal
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Table */}
        <table className="table table-bordered table-hover text-center mt-4">
          <thead className="thead-dark">
            <tr>
              <th scope="col">No</th>
              <th scope="col">Nama Lengkap</th>
              <th scope="col">Nomor Telepon</th>
              <th scope="col">Tanggal Lahir</th>
              <th scope="col">Kota Asal</th>
              <th scope="col">Jenis Kelamin</th>
              <th scope="col">Waktu Input</th>
              <th scope="col">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr key={index}>
                <td>{getCurrentItemNumber(index)}</td>
                <td>{item.name}</td>
                <td>{item.phone}</td>
                <td>{item.tanggalLahir}</td>
                <td>{item.kotaAsal}</td>
                <td>{item.gender}</td>
                <td>{item.timestamp}</td>
                <td>
                  <button
                    onClick={() => handleEdit(indexOfFirstItem + index)}
                    className="btn btn-sm"
                    title="Edit"
                  >
                    <img src={editImg} alt="Edit" className="w-4 h-4 mr-2" />
                  </button>
                  <button
                    onClick={() => handleDelete(indexOfFirstItem + index)}
                    className="btn btn-sm ml-2"
                    title="Delete"
                  >
                    <img src={deleteImg} alt="Delete" className="w-4 h-4 mr-2" />
                  </button>
                  <button
                    onClick={() => handleDetail(indexOfFirstItem + index)}
                    className="btn btn-sm ml-2"
                    title="Detail"
                  >
                    <img src={detailImg} alt="Detail" className="w-4 h-4 mr-2" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Pagination className="justify-content-center">
          {renderPagination()}
        </Pagination>
      </div>
    </div>
  );
};

export default First;
