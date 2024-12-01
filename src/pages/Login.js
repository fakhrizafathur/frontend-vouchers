import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/styles.css";

function Login() {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      username_or_email: usernameOrEmail,
      password: password,
    };

    try {
      const response = await fetch("https://fathur.pythonanywhere.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        navigate("/home");
      } else {
        const error = await response.json();
        setErrorMessage(error.message);
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Terjadi kesalahan, coba lagi.");
    }
  };

  const handleSignupClick = () => {
    // Menavigasi ke halaman history (misalnya)
    navigate("/signup");
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username atau Email" value={usernameOrEmail} onChange={(e) => setUsernameOrEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <input type="submit" value="Login" />
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </form>
      <a onClick={handleSignupClick}>Belum punya akun? Daftar sekarang</a>
    </div>
  );
}

export default Login;
