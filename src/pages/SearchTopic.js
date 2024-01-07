import React, { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

function SearchTopic() {
  const { searchTopic } = useParams();
  const [topics, setTopics] = useState([]);
  const fetchSearchTopics = async () => {
    try {
      // GET isteği yap
      const response = await fetch(
        `http://localhost:8080/topics/getSearchTopics/${searchTopic}`
      );

      // Yanıtın başarılı olup olmadığını kontrol et
      if (!response.ok) {
        throw new Error("Sunucu yanıt vermedi");
      }

      // JSON formatında veriyi al
      const data = await response.json();

      // Veriyi state'e set et
      setTopics(data);
    } catch (error) {
      console.error("İstek sırasında bir hata oluştu:", error);
    }
  };

  useEffect(() => {
    fetchSearchTopics();
  }, []);
  return (
    <div>
      <ListGroup>
        <ListGroup.Item style={{ backgroundColor: "black", color: "white" }}>
          <i class="fa-solid fa-fire" style={{ color: "yellow" }}></i> Forumda
          neler oluyor?
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
  );
}

export default SearchTopic;
