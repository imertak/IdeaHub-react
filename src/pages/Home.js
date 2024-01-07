import React, { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import useUserStore from "../states/UserStore";

function Home() {
  const [topics, setTopics] = useState([]);
  const [users, setUsers] = useState([]);
  const [statics, setStatics] = useState({});
  const userStore = useUserStore();
  const fetchStatics = async () => {
    try {
      const response = await fetch("http://localhost:8080/statics");

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("API Response:", data);
      setStatics(data);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };
  const fetchNewUsers = async () => {
    try {
      const response = await fetch("http://localhost:8080/users/getNewUsers");

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("API Response:", data);
      setUsers(data);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };
  const fetchNewTopics = async () => {
    try {
      const response = await fetch("http://localhost:8080/topics/getNewTopics");

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("API Response:", data);
      setTopics(data);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  const fetchTokenControl = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/auth/tokenControl/${localStorage.getItem(
          "accessToken"
        )}`
      );

      if (!response.ok) {
        userStore.changeIsVerifyLogin(false);
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Anlık AccessToken Geçerliliği:", data);
      {
        data == true
          ? userStore.changeIsVerifyLogin(true)
          : userStore.changeIsVerifyLogin(false);
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };
  useEffect(() => {
    fetchNewTopics();
    fetchNewUsers();
    fetchStatics();
    fetchTokenControl();
  }, []);
  return (
    <div className="homePage">
      <div
        className="youtubeVideo"
        style={{
          display: "flex",
          justifyContent: "center", // Yatayda ortala
          alignItems: "center",
          width: "100vw", // Sayfa genişliği kadar olacak şekilde ayarla
          // Sayfa yüksekliği kadar olacak şekilde ayarla (isteğe bağlı)
          textAlign: "center",
        }}
      >
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/bBfO0c7_bMg?si=92kQtVU0fBqIvtdO"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          style={{ paddingBottom: "1%" }}
        ></iframe>
      </div>
      <div
        className="topicList"
        style={{
          display: "flex",
          gap: "1%",
          width: "75%",
          margin: "0 auto",
          justifyContent: "center", // Yatayda ortala
        }}
      >
        <div className="left" style={{ width: "75%" }}>
          <ListGroup>
            <ListGroup.Item
              style={{ backgroundColor: "black", color: "white" }}
            >
              <i class="fa-solid fa-fire" style={{ color: "yellow" }}></i>{" "}
              Forumda neler oluyor?
            </ListGroup.Item>
            {topics.map((topic, index) => (
              <ListGroup.Item key={index}>
                <Link
                  to={`/konu/${topic.topicID}`}
                  style={{
                    textDecoration: "none",
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  {topic.title}
                </Link>
                <p style={{ fontSize: "10px" }}>
                  {topic.username} · {topic.topicCreationDate}
                </p>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
        <div className="right">
          <div className="newUsers" style={{ marginBottom: "4%" }}>
            <ListGroup>
              <ListGroup.Item
                style={{ backgroundColor: "black", color: "white" }}
              >
                <i class="fa-solid fa-user" style={{ color: "yellow" }}></i>{" "}
                Yeni Üyeler
              </ListGroup.Item>
              {users.map((user, index) => (
                <ListGroup.Item key={index}>
                  <Link
                    to={`/kullanici/${user.userID}`}
                    style={{
                      fontSize: "12px",
                      textDecoration: "none",
                      color: "black",
                      fontWeight: "bold",
                    }}
                  >
                    {user.username}
                  </Link>
                  <p style={{ fontSize: "8px" }}>
                    Katılım tarihi: {user.creationDate}
                  </p>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
          <div className="forumStatics" style={{ marginBottom: "4%" }}>
            <ListGroup>
              <ListGroup.Item
                style={{ backgroundColor: "black", color: "white" }}
              >
                <i
                  class="fa-solid fa-chart-pie"
                  style={{ color: "yellow" }}
                ></i>{" "}
                Forum İstatistikleri
              </ListGroup.Item>

              <ListGroup.Item>
                <p style={{ fontSize: "12px" }}>
                  Konular: {statics.countTopics}
                </p>
                <p style={{ fontSize: "12px" }}>
                  Yorumlar: {statics.countComment}
                </p>
                <p style={{ fontSize: "12px" }}>
                  Toplam Üye: {statics.countUsers}
                </p>
                <p style={{ fontSize: "12px" }}>Son Üye: {statics.lastUser}</p>
              </ListGroup.Item>
            </ListGroup>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
