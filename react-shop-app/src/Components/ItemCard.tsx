import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import { Link } from "react-router-dom";
import { NavLink } from "react-bootstrap";
import ".././style/App.css";

type ItemCardProps = {
  title: string;
  price: number;
  image: string;
  id: string;
};

function ItemCard({ title, price, image, id }: ItemCardProps) {
  return (
    <>
      <Card className="h-100 shadow pb-2" style={{ width: "18rem" }}>
        <Card.Body className="d-flex flex-column-reverse">
          <NavLink title="Click to see more" as={Link} to={`/${id}`}>
            <div className="card-img-top" style={{ height: "300px" }}>
              <Card.Img style={{ height: "100%", width: "100%" }} src={image} />
            </div>
            <Card.Title className="text-overflow-clamp">{title}</Card.Title>
            <div className="d-flex justify-content-start fw-bolder fs-4">
              <p>{price} €</p>
            </div>
            <div className="d-flex justify-content-start text-secondary">
              <p>Free international shipping</p>
            </div>
          </NavLink>
        </Card.Body>
        <Card.Title className="d-flex justify-content-center ">
          <Button variant="dark">Add to cart</Button>
        </Card.Title>
      </Card>
    </>
  );
}

export default ItemCard;
