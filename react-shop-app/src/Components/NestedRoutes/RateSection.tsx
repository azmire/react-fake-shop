import { Button } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

function RateSection() {
  return (
    <>
      <FloatingLabel
        className="w-50 m-5"
        controlId="floatingTextarea2"
        label="Comments"
      >
        <Form.Control
          className="bg-light"
          as="textarea"
          placeholder="Leave a comment here"
          style={{ height: "100px" }}
        />
        <Button className="mt-1" variant="dark">
          Submit
        </Button>
      </FloatingLabel>
    </>
  );
}

export default RateSection;
