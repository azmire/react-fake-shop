import { Button } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import StarRating from "../StarRating";
import "../../style/Comments.css";
import {
  doc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
  DocumentSnapshot,
  serverTimestamp,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useParams } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";

function RateSection() {
  const [inputValue, setInputValue] = useState("");
  const [reviews, setReviews] = useState<Array<{}>>([]);
  const { user } = useContext(AuthContext);
  const params = useParams();
  const itemId = params.id;
  console.log(itemId);

  //RETRIEVE DATA FROM DATABASE
  const getItemReviews = async () => {
    if (user && itemId) {
      try {
        const q = query(collection(db, "users" /* , user.uid, "review" */));

        const querySnapshot = await getDocs(q);

        const filteredQuery = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setReviews(filteredQuery);
        console.log("FILTEREDQUERY: ", filteredQuery);
      } catch (err) {
        console.error(err);
      }
    }
  };
  useEffect(() => {
    getItemReviews();
  }, []);

  //ADD REVIEWS TO DATA BASE
  const handleSubmit = async () => {
    if (user && itemId) {
      try {
        await setDoc(doc(db, "users", user.uid, "review", itemId), {
          itemReview: inputValue,
          timestamp: serverTimestamp(),
        });
        getItemReviews();
        console.log("Document written with ID: ", user.uid);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };
  return (
    <>
      {reviews.map((review) => {
        if (/* review.id == itemId */ true) {
          return (
            <div
              key={review.id}
              className="d-flex m-5 mt-0 comment-bg rounded p-1"
            >
              <div className="flex-shrink-0">
                <RxAvatar size={40} />
              </div>
              <div className="flex-grow-1 ms-3">
                <h5>
                  Jhon Carter
                  <small className="text-muted">
                    {/* <i>{review.timestamp}</i> */}
                  </small>
                </h5>
                <p>{review.itemReview}</p>
              </div>
            </div>
          );
        }
      })}
      <StarRating />
      <FloatingLabel
        className="w-50 m-5 mt-0"
        controlId="floatingTextarea2"
        label="Comment here..."
      >
        <Form.Control
          className="bg-light"
          as="textarea"
          placeholder="Leave a comment here"
          style={{ height: "100px" }}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button onClick={handleSubmit} className="mt-1" variant="dark">
          Submit
        </Button>
      </FloatingLabel>
    </>
  );
}

export default RateSection;
