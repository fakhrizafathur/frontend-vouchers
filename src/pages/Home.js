import React, { useEffect, useState } from "react";

function Home() {
  const [vouchers, setVouchers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredVouchers, setFilteredVouchers] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Ambil token JWT dari localStorage atau sesi untuk memastikan pengguna login
  const token = localStorage.getItem("token");
  // Mengambil data voucher dan kategori
  useEffect(() => {
    if (!token) {
      // Jika token tidak ada, arahkan pengguna ke halaman login
      window.location.href = "/";
    }
    fetch("http://fathur.pythonanywhere.com/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(["All", ...data]));

    fetch("http://fathur.pythonanywhere.com/api/vouchers")
      .then((res) => res.json())
      .then((data) => {
        setVouchers(data);
        setFilteredVouchers(data);
      });
  }, []);

  // Memfilter voucher berdasarkan kategori yang dipilih

  const handleCategoryClick = (category) => {
    if (category === "All") {
      // Jika kategori "All" dipilih, tampilkan semua voucher
      setFilteredVouchers(vouchers);
    } else {
      // Filter voucher berdasarkan kategori
      const filtered = vouchers.filter((voucher) => voucher.kategori === category);
      setFilteredVouchers(filtered);
    }
  };

  const handleClaimClick = (id_voucher) => {
    fetch(`http://fathur.pythonanywhere.com/api/claim/${id_voucher}`, {
      method: "POST",
    })
      .then((response) => {
        if (response.ok) {
          // Perbarui daftar vouchers
          setVouchers((prevVouchers) => {
            const updatedVouchers = prevVouchers.filter((voucher) => voucher.id_voucher !== id_voucher);
            // Perbarui filteredVouchers berdasarkan kategori yang dipilih
            const currentCategory = categories.find((cat) => cat.selected)?.name || "all";
            const updatedFiltered = currentCategory === "all" ? updatedVouchers : updatedVouchers.filter((voucher) => voucher.kategori === currentCategory);

            setFilteredVouchers(updatedFiltered);
            return updatedVouchers;
          });

          alert("Voucher berhasil diklaim!");
        } else {
          alert("Gagal mengklaim voucher.");
        }
      })
      .catch((error) => console.error("Error claiming voucher:", error));
  };

  const handleHistoryClick = () => {
    // Menavigasi ke halaman history (misalnya)
    window.location.href = "/history"; // Sesuaikan dengan routing aplikasi React
  };

  const handleLogout = () => {
    // Menghapus token JWT dari localStorage
    localStorage.removeItem("token");
    // Redirect ke halaman login
    window.location.href = "/";
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="header">
        <button className="hamburger" onClick={toggleSidebar}>
          &#9776;
        </button>
        <div className="logo">MyVoucherApp</div>
        <div className="title">Voucher System</div>
        <button className="btn-history" onClick={handleHistoryClick}>
          History
        </button>
      </header>

      {/* Main content - Sidebar and Body */}
      <div className="main-content">
        {/* Sidebar */}
        <div className={`sidebar ${isSidebarOpen ? "active" : ""}`}>
          <button className="hamburger" onClick={toggleSidebar}>
            &#9776;
          </button>
          <h3>Kategori Voucher</h3>
          <ul>
            {categories.map((category, index) => (
              <li key={index} onClick={() => handleCategoryClick(category)}>
                {category}
              </li>
            ))}
          </ul>
          <button class="logout" onClick={handleLogout}>
            Logout
          </button>
        </div>

        {/* Body - Voucher Grid */}
        <div className="body">
          <div className="voucher-list">
            {filteredVouchers.map((voucher) => (
              <div className="voucher-grid-item" key={voucher.id_voucher}>
                <div className="voucher-item">
                  <img src={`http://fathur.pythonanywhere.com/static/${voucher.foto}`} alt={voucher.nama} />
                  <h4>{voucher.nama}</h4>
                  <button onClick={() => handleClaimClick(voucher.id_voucher)}>Claim</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
