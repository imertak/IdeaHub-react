import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import useUserStore from "../states/UserStore";
import { Link, useNavigate } from "react-router-dom";

function AddTopic() {
  const [show, setShow] = useState(false);
  const [categories, setCategories] = useState([]);
  const [topicName, setTopicName] = useState("");
  const [topicDescription, setTopicDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [topicId, setTopicID] = useState(0);
  const userStore = useUserStore();
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    fetch("http://localhost:8080/categories/getAll")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("API Response:", data);
        setCategories(data);
        // Veriyi kullanmak için burada işlem yapabilirsiniz
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, []);

  const handleCategoryChange = (e) => {
    console.log(e.target.value);
    const selectedIndex = e.target.value;
    setSelectedCategory(categories[selectedIndex]?.categoryName);
  };

  const handleAddTopic = async () => {
    try {
      const response = await fetch("http://localhost:8080/topics/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: topicName,
          content: topicDescription,
          username: localStorage.getItem("username"),
          categoryName: selectedCategory,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add topic");
      }
      const data = await response.json(); // Asenkron olarak bekleme
      setTopicID(data.topicID);
      console.log(selectedCategory);
      navigate(`/konu/${data.topicID}`);
      console.log("Topic added successfully!");
    } catch (error) {
      console.error("Error adding topic:", error);
    }
  };
  return (
    <div
      className="addTopic"
      style={{
        display: "block",
        alignItems: "center",
        justifyContent: "center",
        marginRight: "20%",
        marginLeft: "20%",
      }}
    >
      <Form.Label>Kategori Seçiniz</Form.Label>
      <Form.Select
        onChange={(event) => setSelectedCategory(event.target.value)}
      >
        <option>Bir kategori seçiniz</option>
        {categories.map((item, index) => (
          <option key={index} value={item.categoryName}>
            {item.categoryName}
          </option>
        ))}
      </Form.Select>

      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Konu Başlığı</Form.Label>
        <Form.Control
          type="text"
          onChange={(e) => setTopicName(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Konu açıklaması</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          onChange={(e) => setTopicDescription(e.target.value)}
        />
      </Form.Group>
      <Button variant="danger" onClick={handleShow}>
        <i class="fa-solid fa-pencil"></i> Ekle
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Konu Ekle</Modal.Title>
        </Modal.Header>
        <Modal.Body>"{topicName}" başlıklı konu ekliyorsunuz.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Kapat
          </Button>
          <Button variant="primary" onClick={handleAddTopic}>
            <Link style={{ textDecoration: "none", color: "white" }}>Ekle</Link>
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AddTopic;
