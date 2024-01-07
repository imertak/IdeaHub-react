import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { Col, Container, Row, Card, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";

export default function UserProfile() {
  const { id } = useParams();
  const [user, setUser] = useState([]);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/users/${id}`);

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);
  return (
    <div className="vh-100" style={{ backgroundColor: "#9de2ff" }}>
      <Container>
        <Row className="justify-content-center">
          <Col md="9" lg="7" xl="5" className="mt-5">
            <Card style={{ borderRadius: "15px" }}>
              <Card.Body className="p-4">
                <div className="d-flex text-black">
                  <div className="flex-shrink-0">
                    <Card.Img
                      style={{ width: "180px", borderRadius: "10px" }}
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                      alt="Generic placeholder image"
                      fluid
                    />
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <Card.Title>{user.username}</Card.Title>
                    <Card.Text>IdeaHub Yazar</Card.Text>

                    <div
                      className="d-flex justify-content-start rounded-3 p-2 mb-2"
                      style={{ backgroundColor: "#efefef" }}
                    >
                      <div>
                        <p className="mb-0">
                          Katılma tarihi: {user.creationDate}
                        </p>
                      </div>

                      <div>
                        <p className="mb-0">Email: {user.email}</p>
                      </div>
                    </div>
                    <div className="d-flex pt-1">
                      <Button
                        variant="outline-secondary"
                        className="me-1 flex-grow-1"
                      >
                        Chat
                      </Button>
                      <Button variant="secondary" className="flex-grow-1">
                        Follow
                      </Button>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
