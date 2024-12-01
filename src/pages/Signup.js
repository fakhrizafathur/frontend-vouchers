import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/styles.css";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [nama, setNama] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      username,
      email,
      nama,
      password,
    };

    try {
      const response = await fetch("http://fathur.pythonanywhere.com/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        // Redirect ke halaman login setelah signup berhasil
        navigate("/");
      } else {
        const error = await response.json();
        alert(error.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="text" placeholder="Nama" value={nama} onChange={(e) => setNama(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <input type="submit" value="Daftar" />
      </form>
      <a href="/">Sudah punya akun? Login sekarang</a>
    </div>
  );
}

export default Signup;
//   return (
//     <div>
//       <h2>Signup</h2>
//       <form onSubmit={handleSubmit}>
//         <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
//         <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//         <input type="text" placeholder="Nama" value={nama} onChange={(e) => setNama(e.target.value)} required />
//         <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
//         <button type="submit">Signup</button>
//       </form>
//     </div>
//   );
// }

// export default Signup;
