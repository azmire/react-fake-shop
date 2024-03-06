import { Rating, ProductItem } from "../@types/ItemTypes";
import { Col } from "react-bootstrap";
import ItemCard from "./ItemCard";
import { SearchContext } from "../contexts/SearchContext";
import { useContext } from "react";

type GridProps = {
  items: ProductItem[];
};

export default function Grid({ items }: GridProps) {
  const input = useContext(SearchContext);

  return (
    <>
      {items &&
        items
          .filter((item) => {
            return input.input.toLowerCase() === ""
              ? item
              : item.title.toLowerCase().includes(input.input);
          })
          .map((item) => {
            return (
              <Col
                className="d-flex justify-content-center pt-1 pb-4"
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
