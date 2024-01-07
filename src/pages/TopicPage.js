import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  Button,
  ButtonGroup,
  Form,
  ListGroup,
  Table,
} from "react-bootstrap";
import { Link, useParams, useSearchParams } from "react-router-dom";
import uImage from "../images/user.jpg";
import useUserStore from "../states/UserStore";

function TopicPage() {
  const { id } = useParams();
  const [topics, setTopics] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const userStore = useUserStore();

  const fetchComment = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/comments/getCommentByTopicID/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setComments(data);
        console.log(data);
      } else {
        console.error("Comment fetching failed:", response.status);
      }
    } catch (error) {
      console.error("Comment fetching failed:", error);
    }
  };

  const fetchTopic = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/topics/getTopic/${id}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("API Response:", data);
      setTopics(data);
      console.log(topics);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  const handleAddComment = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/comments/add/${localStorage.getItem(
          "username"
        )}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: commentText,
            topicID: id,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add comment");
      }

      console.log("Comment added successfully!");
      fetchComment();
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  useEffect(() => {
    fetchTopic();
    fetchComment();
  }, []);

  return (
    <div style={{ margin: "0 10%" }}>
      <Breadcrumb>
        <Breadcrumb.Item href="/" style={{ color: "black", fontSize: "13px" }}>
          Anasayfa
        </Breadcrumb.Item>
        <Breadcrumb.Item href="" style={{ color: "black", fontSize: "13px" }}>
          {topics.categoryName}
        </Breadcrumb.Item>
      </Breadcrumb>

      <ListGroup variant="flush">
        <ListGroup.Item
          style={{
            backgroundColor: "grey",
            color: "white",
            fontSize: "10px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {topics.topicCreationDate}
          <Link style={{ color: "white" }}>{topics.username}</Link>
        </ListGroup.Item>
        <ListGroup.Item style={{ backgroundColor: "black", color: "white" }}>
          {topics.title}
        </ListGroup.Item>

        <ListGroup.Item>{topics.content}</ListGroup.Item>

        <ListGroup.Item
          variant="light"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div className="report">
            <i class="fa-solid fa-bell"></i>{" "}
            <Link style={{ color: "gray" }}>Raporla</Link>
          </div>
          <div className="fav" style={{ display: "flex", gap: "7px" }}>
            <div>
              <i class="fa-solid fa-heart"></i>{" "}
              <Link style={{ color: "gray" }}>Beğen</Link>
            </div>
            <div>
              <i class="fa-solid fa-star"></i>{" "}
              <Link style={{ color: "gray" }}>Favoriye Ekle</Link>
            </div>
          </div>
        </ListGroup.Item>
      </ListGroup>

      {comments.map((comment, index) => (
        <Table key={index} style={{ border: "double", marginTop: "3%" }}>
          <thead>
            <tr>
              <th>
                <img
                  src={uImage}
                  style={{ width: "35%" }}
                  alt={`User ${index + 1}`}
                />
                <p>
                  {comment.username} | {comment.creationDate}
                </p>
              </th>
              <th>
                <Form.Control
                  type="text"
                  placeholder={comment.text}
                  disabled
                  style={{ height: "22vh", width: "35vw" }}
                />
              </th>
            </tr>
          </thead>
        </Table>
      ))}

      {userStore.isVerifyLogin ? (
        <div className="addTopic-Text">
          <Form.Label
            style={{ margin: "0 7%", marginTop: "5%", display: "flex" }}
          >
            Yeni Yorum
          </Form.Label>
          <Form.Group
            className="mb-3"
            controlId="exampleForm.ControlTextarea1"
            style={{ margin: "0% 7%", display: "flex", gap: "10px" }}
          >
            <Form.Control
              as="textarea"
              rows={3}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <Button variant="dark" onClick={handleAddComment}>
              Ekle
            </Button>
          </Form.Group>
        </div>
      ) : (
        <div>
          <p>
            Yorum yapmak için <Link to="/giris">giriş yapınız.</Link>
          </p>
        </div>
      )}
    </div>
  );
}

export default TopicPage;
