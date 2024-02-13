import { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { Root } from "../@types/ItemTypes";
import Grid from "../Components/Grid";

function Frontpage() {
  const [items, setItems] = useState<Root | null>(null);
  const url = "https://fakestoreapi.com/products";

  const GetItems = async () => {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const result = (await response.json()) as Root;
        setItems(result);
        console.log(result);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    GetItems();
  }, []);

  return (
    <>
      <Container className="mx-auto ms-auto">
        <Row>
          <Grid items={items} />
        </Row>
      </Container>
    </>
  );
}

export default Frontpage;
