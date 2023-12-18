import React, { useState } from "react";
import { Col, Form, Image } from "react-bootstrap";
import useUserStore from "../states/UserStore";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const userStore = useUserStore();

  const handleProfileImage = (e) => {
    // Seçilen dosyayı state'e atama
    if (e.target.files.length > 0) {
      setProfileImage(e.target.files[0]);
    }
  };

  // Kayıt Olma isteği start
  //
  const handleRegister = () => {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("profileImage", profileImage);

    fetch("http://localhost:8080/auth/register", {
      method: "POST",
      body: formData,
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
        localStorage.setItem("isVerifyLogin", true);
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
      {profileImage != null && (
        <Col xs={6} md={4}>
          <Image
            src={URL.createObjectURL(profileImage)}
            roundedCircle
            style={{ width: "100%", height: "auto" }}
          />
        </Col>
      )}
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Kullanıcı Resmi</Form.Label>
        <Form.Control
          type="file"
          onChange={handleProfileImage}
          accept="image/*"
        />
      </Form.Group>
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
          type="email"
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
