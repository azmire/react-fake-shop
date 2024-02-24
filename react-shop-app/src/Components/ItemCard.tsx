import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { NavLink } from "react-bootstrap";

type ItemCardProps = {
  title: string;
  price: number;
  image: string;
  id: number;
};

function ItemCard({ title, price, image, id }: ItemCardProps) {
  return (
    <>
      <Card className="h-100 shadow" style={{ width: "18rem" }}>
        <Card.Body className="d-flex flex-column-reverse">
          <NavLink title="Click to see more" as={Link} to={`/${id}`}>
            <Card.Img
              className="card-img-top"
              variant="top"
              style={{ height: "250px" }}
              src={image}
            />
            <Card.Title className="p-3 m-0 ">{title}</Card.Title>
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
