import { Result, Root } from "../@types/ItemTypes";
import { Col } from "react-bootstrap";
import ItemCard from "./ItemCard";
import { useContext } from "react";
import { SearchContext } from "../contexts/SearchContext";

type GridProps = {
  items: Root | null;
  item: Result;
};

export default function Grid({ items }: GridProps) {
  const search = useContext(SearchContext);

  console.log(search);
  return (
    <>
      {items &&
        items
          .filter((item) => {
            return search.toLowerCase() === ""
              ? item
              : item.title.toLowerCase().includes(search);
          })
          .map((item) => {
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
