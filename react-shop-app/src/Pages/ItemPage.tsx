import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { Result } from "../@types/ItemTypes";
import { useContext, useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Image,
  ListGroup,
  Row,
} from "react-bootstrap";

import { TbTruck, TbTruckReturn } from "react-icons/tb";

import { RiSecurePaymentFill } from "react-icons/ri";
import { AuthContext } from "../contexts/AuthContext";

const Item = () => {
  const params = useParams();
  const [products, setProducts] = useState<Result | null>(null);
  const id = params.id;
  const url = `https://fakestoreapi.com/products/${id}`;
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

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
  }, [user]);

  useEffect(() => {
    const { pathname } = location;
    if (pathname === `/${id}`) {
      navigate(`/${id}/ratings`);
    }
  }, [location]);

  return (
    <>
      <Container className="pt-5">
        <Row>
          <Col>
            <Image
              style={{ height: "500px", maxWidth: "480px" }}
              src={products?.image}
              rounded
            />
          </Col>
          <Col>
            <h1>{products?.title}</h1>
            <h3>{products?.price} €</h3>
            <p>{products?.description}</p>

            <div className="container">
              <div className="row">
                <div className="fw-bold p-0 col-md-4">
                  <p>Average ratig is {products?.rating.rate}</p>
                </div>
                <div className="text-secondary p-0 col-md-8">
                  <p>({products?.rating.count})</p>
                </div>
              </div>
            </div>

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
