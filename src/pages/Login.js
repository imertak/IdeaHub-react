import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useUserStore from "../states/UserStore";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const userStore = useUserStore();
  const navigate = useNavigate();

  // Giriş Olma isteği start
  //
  const handleLogin = () => {
    console.log("Giriş işlemi");
    fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Login request failed");
        }
        return response.json();
      })
      .then((data) => {
        localStorage.setItem("accessToken", `${data.accessToken}`);
        localStorage.setItem("username", `${username}`);
        userStore.changeIsVerifyLogin(true);
        navigate("/profilim");
      })
      .catch((error) => {
        console.error("Login error:", error); // Handle errors
      });
    console.log(localStorage.getItem("accessToken"));
  };
  // Giriş Olma isteği end
  //

  return (
    <div className="container p-3 my-5 d-flex flex-column w-50">
      <label htmlFor="email" className="mb-4">
        Kullanıcı Adı
        <input
          type="email"
          id="email"
          className="form-control"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>

      <label htmlFor="password" className="mb-4">
        Şifre
        <input
          type="password"
          id="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>

      <button className="btn btn-danger mb-4" onClick={handleLogin}>
        Giriş Yap
      </button>

      <div className="text-center">
        <p>
          Kayıtlı değil misin? <Link to={"/kayit-ol"}>Kayıt Ol</Link>
        </p>

        <div
          className="d-flex justify-content-between mx-auto"
          style={{ width: "40%" }}
        >
          {/* Sosyal medya ikonları buraya eklenebilir */}
        </div>
      </div>
    </div>
  );
}

export default Login;
