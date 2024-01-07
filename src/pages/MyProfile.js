import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Image } from "react-bootstrap";

export default function MyProfile() {
  const [topics, setTopics] = useState([]);
  const fetchMyTopics = async () => {
    try {
      // GET isteği yap
      const response = await fetch(
        `http://localhost:8080/topics/getMyTopics/${localStorage.getItem(
          "username"
        )}`
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
    fetchMyTopics();
  }, []);
  return (
    <div className="gradient-custom-2" style={{ backgroundColor: "#9de2ff" }}>
      <Container className="py-5 h-100">
        <Row className="justify-content-center align-items-center h-100">
          <Col lg="9" xl="7">
            <Card>
              <div
                className="rounded-top text-white d-flex flex-row"
                style={{ backgroundColor: "#000", height: "200px" }}
              >
                <div
                  className="ms-4 mt-5 d-flex flex-column"
                  style={{ width: "150px" }}
                >
                  <Image
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                    alt="Generic placeholder image"
                    className="mt-4 mb-2 img-thumbnail"
                    fluid
                    style={{ width: "150px", zIndex: "1" }}
                  />
                  <Button
                    variant="outline-dark"
                    style={{ height: "36px", overflow: "visible" }}
                  >
                    Edit profile
                  </Button>
                </div>
                <div className="ms-3" style={{ marginTop: "130px" }}>
                  <h5>{localStorage.getItem("username")}</h5>
                  <p>Sivas, Türkiye </p>
                </div>
              </div>
              <div
                className="p-4 text-black"
                style={{ backgroundColor: "#f8f9fa" }}
              >
                <div className="d-flex justify-content-end text-center py-1">
                  <div>
                    <p className="mb-1 h5">253</p>
                    <p className="small text-muted mb-0">Photos</p>
                  </div>
                  <div className="px-3">
                    <p className="mb-1 h5">1026</p>
                    <p className="small text-muted mb-0">Followers</p>
                  </div>
                  <div>
                    <p className="mb-1 h5">478</p>
                    <p className="small text-muted mb-0">Following</p>
                  </div>
                </div>
              </div>
              <Card.Body className="text-black p-4">
                <div className="mb-5">
                  <p className="lead fw-normal mb-1">Hakkımda</p>
                  <div className="p-4" style={{ backgroundColor: "#f8f9fa" }}>
                    <p className="font-italic mb-1">Web Developer</p>
                    <p className="font-italic mb-1">Lives in New York</p>
                    <p className="font-italic mb-0">Photographer</p>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <p className="lead fw-normal mb-0">Konularım</p>
                </div>
                <div className="my-topics">
                  {topics.map((topic, index) => (
                    <Card style={{ width: "18rem" }}>
                      <Card.Body>
                        <Card.Title>{topic.title}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">
                          {topic.categoryName}
                        </Card.Subtitle>
                        <Card.Text>{topic.content}</Card.Text>
                        <Card.Link href={`/konu/${topic.topicID}`}>
                          Konuya Git
                        </Card.Link>
                        <Card.Link href="#">Another Link</Card.Link>
                      </Card.Body>
                    </Card>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
