import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";

import logo from "../images/logo.png";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useUserStore from "../states/UserStore";
import { Dropdown } from "react-bootstrap";

function OffcanvasExample() {
  const [isFocused, setIsFocused] = useState(false);
  const userStore = useUserStore();
  const AddTopictoPath = userStore.isVerifyLogin ? "/soru-sor" : "/giris";
  const handleLogOutClicked = () => {
    localStorage.setItem("username", "");
    localStorage.setItem("isVerifyLogin", false);
    userStore.changeIsVerifyLogin(false);
    localStorage.setItem("accessToken", "");
  };

  return (
    <>
      <div
        className="fixedNavbar"
        style={{
          display: "flex",
          alignItems: "center",
          padding: "1% 3%",
          textAlign: "center",
          gap: "3%",
          backgroundColor: "black",
        }}
      >
        <div className="rules">
          <Link
            to={"/kurallar"}
            style={{ textDecoration: "none", color: "white" }}
          >
            <i
              class="fa-solid fa-scale-balanced"
              style={{
                cursor: "pointer",
                fontSize: "150%",
                display: "block",
                margin: "0 auto", // Yatayda ortala
                marginLeft: "0",
              }}
            ></i>
            <h5 style={{ cursor: "pointer", marginTop: "5px" }}>Kurallar</h5>
          </Link>
        </div>

        <div className="newTopics">
          <Link
            to={"/yeni-konular"}
            style={{ textDecoration: "none", color: "white" }}
          >
            <i
              className="fa-solid fa-bolt"
              style={{
                cursor: "pointer",
                fontSize: "150%",
                display: "block",
                margin: "0 auto", // Yatayda ortala
                marginLeft: "0",
              }}
            ></i>
            <h5 style={{ cursor: "pointer", marginTop: "5px" }}>Yeni</h5>
          </Link>
        </div>
        <div className="dictionary">
          <Link
            to={"/sozluk"}
            style={{ textDecoration: "none", color: "white" }}
          >
            <i
              class="fa-solid fa-book"
              style={{
                cursor: "pointer",
                fontSize: "150%",
                display: "block",
                margin: "0 auto", // Yatayda ortala
                marginLeft: "0",
              }}
            ></i>
            <h5 style={{ cursor: "pointer", marginTop: "5px" }}>Sözlük</h5>
          </Link>
        </div>
        <div className="users">
          <Link
            to={"/uyeler"}
            style={{ textDecoration: "none", color: "white" }}
          >
            <i
              class="fa-solid fa-users"
              style={{
                cursor: "pointer",
                fontSize: "150%",
                display: "block",
                margin: "0 auto", // Yatayda ortala
                marginLeft: "0",
              }}
            ></i>
            <h5 style={{ cursor: "pointer", marginTop: "5px" }}>
              Kullanıcılar
            </h5>
          </Link>
        </div>
        <div className="addTopic">
          <Link
            to={AddTopictoPath}
            style={{ textDecoration: "none", color: "red" }}
          >
            <i
              class="fa-solid fa-comments"
              style={{
                cursor: "pointer",
                fontSize: "150%",
                display: "block",
                margin: "0 auto", // Yatayda ortala
                marginLeft: "0",
                color: "#ff2400",
              }}
            ></i>
            <h5
              style={{ cursor: "pointer", marginTop: "5px", color: "#c4151c" }}
            >
              SORU SOR
            </h5>
          </Link>
        </div>
        {userStore.isVerifyLogin ? (
          <div style={{ display: "flex", marginLeft: "auto" }}>
            <Dropdown>
              <Dropdown.Toggle variant="dark" id="dropdown-basic">
                {localStorage.getItem("username")}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>Profilim</Dropdown.Item>
                <Dropdown.Item onClick={handleLogOutClicked}>
                  Çıkış yap
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        ) : (
          <div style={{ display: "flex", marginLeft: "auto" }}>
            <div
              className="signin"
              style={{ marginLeft: "auto", marginRight: "3vw" }}
            >
              <h6>
                <Link
                  to={"/giris"}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Giriş Yap
                </Link>
              </h6>
            </div>
            <div className="signup">
              <h6>
                <Link
                  to={"/kayit-ol"}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Kayıt Ol
                </Link>
              </h6>
            </div>
          </div>
        )}
      </div>

      {["sm"].map((expand) => (
        <Navbar
          key={expand}
          expand={expand}
          className="bg-body-tertiary mb-3"
          style={{ margin: "0 0", padding: "0 0" }}
        >
          <Container fluid style={{ backgroundColor: "#212529" }}>
            <Navbar.Brand style={{ marginLeft: "2%" }}>
              <Link to={"/"}>
                <img src={logo} style={{ width: "10%" }}></img>
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Offcanvas
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href="#action1" style={{ color: "white" }}>
                    Home
                  </Nav.Link>
                  <Nav.Link href="#action2" style={{ color: "white" }}>
                    Kategoriler
                  </Nav.Link>
                </Nav>
                <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="🔎 Konu Ara"
                    className="me-2"
                    aria-label="Search"
                    style={{
                      boxShadow: isFocused ? "0 0 10px red" : "none",
                      outline: "none",
                    }}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                  />
                  <Button
                    variant="outline-danger"
                    style={{
                      color: "c4151c",
                      marginRight: "6%",
                    }}
                  >
                    Ara
                  </Button>
                </Form>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default OffcanvasExample;
