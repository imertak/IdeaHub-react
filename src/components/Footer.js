import React from "react";
import { Button, Form } from "react-bootstrap";

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "#212529",
        color: "white",
        padding: "20px ",
        marginTop: "2vh",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <div>
          <h5>Bağlantılarımız</h5>
          <div style={{ display: "flex", gap: "10px" }}>
            <a href="#!" style={{ color: "#ff2400" }}>
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#!" style={{ color: "#ff2400" }}>
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#!" style={{ color: "#ff2400" }}>
              <i className="fab fa-google"></i>
            </a>
            <a href="#!" style={{ color: "#ff2400" }}>
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#!" style={{ color: "#ff2400" }}>
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="#!" style={{ color: "#ff2400" }}>
              <i className="fab fa-github"></i>
            </a>
          </div>
        </div>

        <div>
          <h5>Yeni gelişmelerden haberdar ol!</h5>
          <form style={{ display: "flex", alignItems: "center" }}>
            <Form.Control
              type="email"
              placeholder="E-Mail"
              style={{
                marginRight: "10px",
                padding: "5px",
              }}
            />
            <Button
              type="submit"
              style={{
                padding: "5px",
                backgroundColor: "#ff2400",
                color: "white",
                border: "none",
                width: "42%",
              }}
            >
              Abone Ol
            </Button>
          </form>
        </div>
      </div>

      <div
        style={{
          textAlign: "center",
          backgroundColor: "rgba(0, 0, 0, 0.2)",
          padding: "1%",
          marginTop: "2%",
        }}
      >
        © 2023 IdeaHub
      </div>
    </footer>
  );
};

export default Footer;
