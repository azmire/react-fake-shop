import { Button } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import StarRating from "../StarRating";
import "../../style/Comments.css";
import {
  collection,
  query,
  getDocs,
  serverTimestamp,
  addDoc,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useParams } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";

function RateSection() {
  const [inputValue, setInputValue] = useState("");
  const [reviews, setReviews] = useState<Array<{}>>([]);
  const { user, email } = useContext(AuthContext);
  const params = useParams();
  const itemId = params.id;
  console.log("RATE SECTION: ", user);
  console.log("reviews :>> ", reviews);

  //RETRIEVE DATA FROM DATABASE
  const getItemReviews = async () => {
    if (itemId) {
      const reviewsRef = collection(db, "items", itemId, "reviews");
      const reviewsForItemQuery = query(reviewsRef);
      const querySnapshot = await getDocs(reviewsForItemQuery);
      const filteredQuery = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setReviews(filteredQuery);
    }
  };
  useEffect(() => {
    getItemReviews();
  }, []);

  //ADD REVIEWS TO DATA BASE
  const handleSubmit = async () => {
    if (email && itemId) {
      try {
        await addDoc(collection(db, "items", itemId, "reviews"), {
          userName: email,
          itemReview: inputValue,
          timestamp: serverTimestamp(),
        });
        getItemReviews();
        console.log("Document written with ID: ", email);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };
  return (
    <>
      {reviews.map((review) => {
        console.log("review :>> ", review);
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
                  {review.userName}
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
