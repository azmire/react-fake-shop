import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { Root } from "../@types/ItemTypes";

function Electronics() {
  const [items, setItems] = useState<Root | null>(null);

  return (
    <>
      <Container className="mx-auto ms-auto">
        <Row>
          <p>electronics</p>
        </Row>
      </Container>
    </>
  );
}

export default Electronics;
