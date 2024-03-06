import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";

import { useContext, useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Image,
  InputGroup,
  ListGroup,
  Row,
} from "react-bootstrap";

import { TbTruck, TbTruckReturn } from "react-icons/tb";

import { RiSecurePaymentFill } from "react-icons/ri";
import { AuthContext } from "../contexts/AuthContext";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { serverTimestamp } from "firebase/database";
import { APIProduct } from "../@types/ItemTypes";

const Item = () => {
  const params = useParams();
  const [products, setProducts] = useState<APIProduct | null>(null);
  const [amount, setAmount] = useState(1);
  const id = params.id;
  const url = `https://fakestoreapi.com/products/${id}`;
  const location = useLocation();
  const navigate = useNavigate();
  const { user, email } = useContext(AuthContext);

  const GetItems = async () => {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const result = (await response.json()) as APIProduct;
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

  //ADD ITEMS TO CART
  const handleSubmit = async (
    itemImage: string,
    itemName: string,
    itemPrice: number,
    amount: number
  ) => {
    if (email && id) {
      try {
        await setDoc(doc(db, "users", email, "cart", id), {
          image: itemImage,
          title: itemName,
          price: itemPrice,
          amount: amount,
          timestamp: serverTimestamp(),
        });
      } catch (e) {
        console.error("Error adding item: ", e);
      }
    }
  };

  if (products) {
    return (
      <>
        <Container className="pt-5">
          <Row>
            <Col>
              <Image
                style={{ height: "500px", maxWidth: "480px" }}
                src={products.image}
                rounded
              />
            </Col>
            <Col>
              <h1>{products.title}</h1>
              <h3>{products.price} €</h3>
              <p>{products.description}</p>

              <div className="container">
                <div className="row">
                  <div className="fw-bold p-0 col-md-4">
                    <p>Average ratig is {products.rating.rate}</p>
                  </div>
                  <div className="text-secondary p-0 col-md-8">
                    <p>({products.rating.count})</p>
                  </div>
                </div>
              </div>

              <Button
                onClick={() =>
                  handleSubmit(
                    products.image,
                    products.title,
                    products.price,
                    amount
                  )
                }
                variant="outline-danger"
              >
                Add to cart
              </Button>
              <Button
                onClick={() => setAmount(amount <= 0 ? 0 : amount - 1)}
                className="m-1 ms-3"
                variant="danger"
              >
                -
              </Button>
              <input
                value={amount}
                onChange={() => console.log(amount)}
                type="number"
                min={1}
                style={{ maxWidth: "40px" }}
              ></input>
              <Button
                onClick={() => setAmount(amount + 1)}
                className="m-1"
                variant="danger"
              >
                +
              </Button>
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
                      <RiSecurePaymentFill size={30}></RiSecurePaymentFill>{" "}
                      Secure payment
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
  }
};
export default Item;
