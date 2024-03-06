import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
} from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import { CgShoppingCart } from "react-icons/cg";
import { db } from "../firebaseConfig";
import { AuthContext } from "../contexts/AuthContext";
import ".././style/App.css";
import { ProductItem } from "../@types/ItemTypes";

function ShoppingCart() {
  const [show, setShow] = useState(false);
  const { user, email } = useContext(AuthContext);
  const [items, setItems] = useState<ProductItem[]>([] as ProductItem[]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //RETRIEVE ITEMS FROM DB
  const getItems = async () => {
    if (email) {
      const reviewsRef = collection(db, "users", email, "cart");
      const reviewsForItemQuery = query(reviewsRef);
      const querySnapshot = await getDocs(reviewsForItemQuery);
      /*  const filteredQuery= querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      } as unknown as ProductItem)); */
      const filteredQuery = querySnapshot.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id,
        } as unknown as ProductItem;
      });

      console.log("filteredQuery :>> ", filteredQuery);
      setItems(filteredQuery);
    }
  };
  useEffect(() => {
    getItems();
  }, [user]);

  //DELETE ITEMS FROM THE CART

  const deleteItem = async (itemId: string) => {
    if (email) {
      const shoppingRef = doc(db, "users", email, "cart", itemId);

      await deleteDoc(shoppingRef);
      getItems();
    }
  };

  //UPDATE ITEM

  const decreaseItemNum = async (itemId: string, amount: number) => {
    console.log("itemId :>> ", itemId);
    if (email) {
      const newField = { amount: amount - 1 };
      const itemRef = doc(db, "users", email, "cart", itemId);

      await updateDoc(itemRef, newField);
      getItems();
    }
  };
  const increaseItemNum = async (itemId: string, amount: number) => {
    if (email) {
      const newField = { amount: amount + 1 };
      const itemRef = doc(db, "users", email, "cart", itemId);

      await updateDoc(itemRef, newField);
      getItems();
    }
  };

  return (
    <>
      <CgShoppingCart
        onClick={() => {
          handleShow(), getItems();
        }}
        className="m-3"
        size={30}
        title="Shopping Cart"
      ></CgShoppingCart>
      {name}

      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Your Shopping Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {items.map((item) => {
            return (
              <div
                key={item.id}
                className="d-flex m-4 mt-2 mb-3 bg-light shadow rounded p-1"
              >
                <div className="flex-shrink-0">
                  <img
                    src={item.image}
                    style={{ height: "80px", maxWidth: "80px" }}
                  ></img>
                </div>
                <div className="flex-grow-1 ms-3">
                  <h5 className="text-overflow-clamp ">
                    {item.title}
                    <small className="text-mute">
                      {/* <i>{review.timestamp}</i> */}
                    </small>
                  </h5>
                  <div className="row">
                    <div className="col">
                      <div className="fw-bold">
                        <p>{item.price}&nbsp;€</p>
                      </div>
                    </div>
                    <div className="p-0 col">
                      <button
                        onClick={() => decreaseItemNum(item.id, item.amount)}
                        className="m-1 btn-link"
                        style={{ textDecoration: "none", border: "none" }}
                      >
                        -----
                      </button>
                    </div>
                    <div className="col p-0">
                      <div className="text-secondary">
                        <p className="mb-0">{item.amount} pc</p>
                      </div>
                    </div>
                    <div className=" p-0 col">
                      <button
                        onClick={() => increaseItemNum(item.id, item.amount)}
                        className="m-1 btn-link"
                        style={{ textDecoration: "none", border: "none" }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <Button
                  onClick={() => deleteItem(item.id)}
                  className="my-auto mt-0 btn btn-link bg-transparent text-secondary text-decoration-none"
                  title="Delete"
                >
                  X
                </Button>
              </div>
            );
          })}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
export default ShoppingCart;
