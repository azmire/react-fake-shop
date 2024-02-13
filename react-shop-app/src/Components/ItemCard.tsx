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
      <Card className="h-100" style={{ width: "18rem" }}>
        <Card.Body>
          <NavLink as={Link} to={`/home/${id}`}>
            <Card.Img
              className="card-img-top"
              variant="top"
              style={{ height: "250px" }}
              src={image}
            />
            <Card.Title className="p-3 m-0">{title}</Card.Title>
            <Card.Title className="d-flex justify-content-center">
              {price} €
            </Card.Title>
          </NavLink>
          <Card.Title className="d-flex justify-content-center">
            <Button variant="dark">Add to cart</Button>
          </Card.Title>
        </Card.Body>
      </Card>
    </>
  );
  console.log(id);
}

export default ItemCard;
