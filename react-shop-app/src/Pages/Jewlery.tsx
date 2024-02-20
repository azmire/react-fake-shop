import useFetch from "../UseSearch/useFetch";
import { Container, Row, Spinner } from "react-bootstrap";
import Grid from "../Components/Grid";
function Jewlery() {
  const url = "https://fakestoreapi.com/products/category/jewelery";
  const { items, loading } = useFetch(url);

  if (loading)
    return (
      <div className="d-flex justify-content-center ">
        <Spinner animation="border" />
      </div>
    );
  return (
    <>
      <Container className="mx-auto ms-auto">
        <Row className="d-flex">
          <Grid items={items} />
        </Row>
      </Container>
    </>
  );
}

export default Jewlery;
