import { Container, Row, Spinner } from "react-bootstrap";
import Grid from "../Components/Grid";
import useFetch from "../UseSearch/useFetch";

function Frontpage() {
  /* const [items, setItems] = useState<Root | null>(null); */
  const url = "https://fakestoreapi.com/products";
  const { items, loading } = useFetch(url);

  if (loading)
    return (
      <div className="d-flex justify-content-center ">
        <Spinner animation="border" />
      </div>
    );

  return (
    <>
      <Container className="mx-auto ms-auto pt-4">
        <Row>
          <Grid items={items} />
        </Row>
      </Container>
    </>
  );
}

export default Frontpage;
