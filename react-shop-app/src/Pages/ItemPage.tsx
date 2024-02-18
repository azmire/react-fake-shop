import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { Result } from "../@types/ItemTypes";
import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Image,
  ListGroup,
  Row,
} from "react-bootstrap";
import StarRating from "../Components/StarRating";

import { TbTruck, TbTruckReturn } from "react-icons/tb";

import { RiSecurePaymentFill } from "react-icons/ri";

const Item = () => {
  const params = useParams();
  const [products, setProducts] = useState<Result | null>(null);
  const id = params.id;
  const url = `https://fakestoreapi.com/products/${id}`;
  const location = useLocation();
  const navigate = useNavigate();

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

  useEffect(() => {
    const { pathname } = location;
    if (pathname === `/${id}`) {
      navigate(`/${id}/ratings`);
    }
  }, [location]);

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
            <Button variant="outline-danger">Add to cart</Button>
            <Card className="mt-5" style={{ width: "25rem" }}>
              <ListGroup variant="flush">
                <ListGroup.Item className="bg-light">
                  <h6>
                    <TbTruck size={30}></TbTruck> Free Shipping
                  </h6>
                </ListGroup.Item>
                <ListGroup.Item className="bg-light">
                  <h6>
                    <TbTruckReturn size={30}></TbTruckReturn> Free Returns
                  </h6>
                </ListGroup.Item>
                <ListGroup.Item className="bg-light">
                  <h6>
                    <RiSecurePaymentFill size={30}></RiSecurePaymentFill> Secure
                    payment
                  </h6>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>
      <div className="m-5">
        <h2>Customers Reviews</h2>
      </div>
      <Outlet />
    </>
  );
};
export default Item;
