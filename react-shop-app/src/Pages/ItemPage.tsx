import { useParams } from "react-router-dom";
import { Result } from "../@types/ItemTypes";
import { useEffect, useState } from "react";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import StarRating from "../Components/StarRating";

const Item = () => {
  const params = useParams();
  const [products, setProducts] = useState<Result | null>(null);
  const id = params.id;
  const url = `https://fakestoreapi.com/products/${id}`;

  const GetItems = async () => {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const result = (await response.json()) as Result;
        setProducts(result);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    GetItems();
  }, []);

  type Product = {
    product: Result;
  };

  return (
    <>
      <Container>
        <Row>
          <Col>
            <Image style={{ height: "500px" }} src={products?.image} rounded />
          </Col>
          <Col>
            <h1>{products?.title}</h1>
            <h3>{products?.price} €</h3>
            <p>{products?.description}</p>
            <StarRating />
            <Button variant="outline-danger">Add to cart</Button>{" "}
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default Item;
