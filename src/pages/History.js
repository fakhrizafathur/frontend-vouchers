import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function History() {
  const [history, setHistory] = useState([]);
  const [categorySummary, setCategorySummary] = useState({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchHistory();
    fetchCategorySummary();
  }, []);

  const fetchHistory = () => {
    // fetch("http://localhost:5000/api/history")
    fetch("https://fathur.pythonanywhere.com/api/history")
      .then((res) => res.json())
      .then((data) => setHistory(data));
  };

  const fetchCategorySummary = () => {
    fetch("https://fathur.pythonanywhere.com/api/history/summary")
      .then((res) => res.json())
      .then((data) => setCategorySummary(data));
  };

  const handleRemoveClick = (id_voucher) => {
    fetch(`https://fathur.pythonanywhere.com/api/history/remove/${id_voucher}`, {
      method: "DELETE",
    }).then(() => {
      fetchHistory(); // Refresh list setelah dihapus
      fetchCategorySummary(); // Perbarui ringkasan kategori
    });
  };

  const handleHomeClick = () => {
    // Menavigasi ke halaman history (misalnya)
    navigate("/home"); // Sesuaikan dengan routing aplikasi React
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="history-page">
      <header className="header">
        <button className="hamburger" onClick={toggleSidebar}>
          &#9776;
        </button>
        <div className="title">History</div>
        <button className="home-button" onClick={handleHomeClick}>
          Home
        </button>
      </header>

      <div className="history-content">
        <div className="history-body">
          <h3>Voucher yang Sudah Diklik</h3>
          <table>
            <thead>
              <tr>
                <th>Nama Voucher</th>
                <th>Kategori</th>
                <th>Tanggal Klaim</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item, index) => (
                <tr key={index}>
                  <td>{item.nama}</td>
                  <td>{item.kategori}</td>
                  <td>{item.tanggal_claim}</td>
                  <td>
                    <button className="btn-remove" onClick={() => handleRemoveClick(item.id_voucher)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={`history-sidebar ${isSidebarOpen ? "active" : ""}`}>
          <button className="hamburger" onClick={toggleSidebar}>
            &#9776;
          </button>
          <h3>Ringkasan Kategori</h3>
          <ul>
            {Object.entries(categorySummary).map(([category, count]) => (
              <li key={category}>
                {category}: {count} voucher
              </li>
            ))}
          </ul>
          <hr />
          <p>
            <strong>Total Voucher:</strong> {Object.values(categorySummary).reduce((a, b) => a + b, 0)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default History;
