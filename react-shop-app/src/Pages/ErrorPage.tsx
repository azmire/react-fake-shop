import React from "react";
import { Button, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();

  return (
    <>
      <Container className="d-flex justify-content-center">
        <Row>
          <h2>an error has ocured</h2>
        </Row>
      </Container>
      <Container className="p-2">
        <Row className="d-flex justify-content-center">
          <Button
            className="m-2 w-25"
            variant="dark"
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
          <Button
            className="m-2 w-25"
            variant="dark"
            onClick={() => navigate("/")}
          >
            Home
          </Button>
        </Row>
      </Container>
    </>
  );
};

export default Error;
