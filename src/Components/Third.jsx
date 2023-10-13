import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const Third = () => {
  const navigate = useNavigate();
  const authenticatedUser = JSON.parse(localStorage.getItem("authenticatedUser"));

  return (
    <Container>
      <Row className="justify-content-center align-items-center min-vh-100">
        <Col md={6}>
          <Card className="shadow p-4">
            <h4 className="text-center mb-4">Informasi Pengguna</h4>
            <p>Username: {authenticatedUser.username}</p>
            <Button variant="primary"onClick={() => navigate("/")} className="w-100 mt-3"> Kembali</Button>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Third;
