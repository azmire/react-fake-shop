import { useContext, useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { SearchContext } from "../contexts/SearchContext";
import Grid from "./Grid";
import { CgProfile, CgShoppingCart } from "react-icons/cg";
import { LuLogOut } from "react-icons/lu";
import CreateModal from "./Modal";

function NavScroll() {
  const [openModal, setOpenModal] = useState(true);
  const { logoutUser, user } = useContext(AuthContext);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  let navLabel;
  let navPath = "/signin";
  let direction = "";

  if (user) {
    navLabel = (
      <Button
        variant="link"
        className="text-dark mx-auto ms-auto"
        onClick={logoutUser}
        title="Log out"
      >
        <LuLogOut size={30}></LuLogOut>
      </Button>
    );
  } else {
    direction = navPath;
    navLabel = <CgProfile title="Log in" className="m-3" size={30}></CgProfile>;
  }

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);

  return (
    <>
      <SearchContext.Provider value={search}>
        <Grid />
      </SearchContext.Provider>
      <Navbar expand="lg" className="bg-body-tertiary pt-0">
        <Container fluid className="gx-0">
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Container
              className=" pb-3 "
              style={{ margin: "0px", maxWidth: "100vw" }}
            >
              <Row className="bg-white">
                <Col>
                  <Navbar
                    style={{
                      height: "12vh",
                      padding: "0",
                    }}
                    /* navbarScroll
                    as={Boolean} */
                  >
                    <Nav.Link as={Link} to={"/"} className="px-4">
                      <div className="mx-auto">
                        <img
                          alt="logo"
                          src="src/assets/Signum.png"
                          width="120"
                          height="40"
                          className="d-inline-block align-top "
                        />
                      </div>
                    </Nav.Link>
                  </Navbar>
                </Col>
                <Col>
                  <Navbar
                    style={{
                      height: "12vh",
                      padding: "0",
                    }}
                  >
                    <Form className="d-sm-flex w-auto">
                      <Form.Control
                        onChange={(e) => setSearch(e.target.value)}
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                      />
                      {/* <Button variant="dark">Search</Button> */}
                    </Form>
                  </Navbar>
                </Col>
                <Col>
                  <Navbar
                    style={{
                      height: "12vh",
                      padding: "0",
                    }}
                  >
                    {/* <Navbar.Text className="d-sm-flex mx-auto">
                      Signed in as: &nbsp;
                      <a href="#login">Mark Otto</a>
                    </Navbar.Text> */}
                    <Nav.Link as={Link} to={direction} className="ms-auto">
                      {navLabel}
                    </Nav.Link>
                    <Nav.Link>
                      <CgShoppingCart
                        className="m-3"
                        size={30}
                        title="Shopping Cart"
                      ></CgShoppingCart>
                    </Nav.Link>
                  </Navbar>
                </Col>
              </Row>
              <Row>
                <Navbar bg="dark" data-bs-theme="dark">
                  <Nav className="me-auto mx-auto">
                    <Nav.Link as={Link} to={"/"} className="px-4">
                      Home
                    </Nav.Link>
                    <Nav.Link as={Link} to={"/electronics"} className="px-4">
                      Electronics
                    </Nav.Link>
                    <Nav.Link as={Link} to={"/jewlery"} className="px-4">
                      Jewelery
                    </Nav.Link>
                    <Nav.Link as={Link} to={"/mensclothing"} className="px-4">
                      Men's clothing
                    </Nav.Link>
                    <Nav.Link as={Link} to={"/womensclothing"} className="px-4">
                      Women's clothing
                    </Nav.Link>
                  </Nav>
                </Navbar>
              </Row>
            </Container>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
      {openModal && <CreateModal closeModal={setOpenModal} />}
    </>
  );
}

export default NavScroll;
