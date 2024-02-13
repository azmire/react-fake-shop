import { Root } from "../@types/ItemTypes";
import { Col } from "react-bootstrap";
import ItemCard from "./ItemCard";

type GridProps = {
  items: Root | null;
};

export default function Grid({ items }: GridProps) {
  return (
    <>
      {items &&
        items.map((item) => {
          return (
            <Col
              className="d-flex justify-content-center pt-1 pb-1"
              key={item.id}
            >
              <ItemCard
                title={item.title}
                price={item.price}
                image={item.image}
                id={item.id}
              />
            </Col>
          );
        })}
    </>
  );
}
