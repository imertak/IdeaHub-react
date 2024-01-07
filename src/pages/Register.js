import React, { useState } from "react";
import { Col, Form, Image } from "react-bootstrap";
import useUserStore from "../states/UserStore";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const userStore = useUserStore();

  // Kayıt Olma isteği start
  //
  const handleRegister = () => {
    console.log(username);
    console.log(email);
    console.log(password);
    fetch("http://localhost:8080/auth/register", {
      method: "POST",
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Register request failed");
        }
        return response.json();
      })
      .then((data) => {
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("username", username);
        userStore.changeIsVerifyLogin(true);
      })
      .catch((error) => {
        console.error("Register error:", error); // Hataları işle
      });
    console.log(localStorage.getItem("accessToken"));
  };
  // Kayıt Olma isteği end
  //

  return (
    <div className="container p-3 my-5 d-flex flex-column w-50" st>
      <label htmlFor="text" className="mb-4">
        Kullanıcı Adı
        <input
          type="text"
          id="username"
          className="form-control"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label htmlFor="email" className="mb-4">
        E-Mail
        <input
          type="text"
          id="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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

      <button className="btn btn-danger mb-4" onClick={handleRegister}>
        Kayıt Ol
      </button>
    </div>
  );
}

export default Register;
