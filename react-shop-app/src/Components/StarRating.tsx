import { useState } from "react";
import { FaStar } from "react-icons/fa6";
import "../style/Stars.css";

const StarRating = () => {
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number | null>(null);

  return (
    <>
      <div className="star-rating">
        {[...Array(5)].map((star, index) => {
          const currentRating = index + 1;
          star;

          return (
            <label key={index}>
              <input
                type="radio"
                name="rating"
                value={currentRating}
                onClick={() => setRating(currentRating)}
              />

              <FaStar
                className="star"
                size={25}
                color={currentRating <= (hover || rating) ? "yellow" : "gray"}
                onMouseEnter={() => setHover(currentRating)}
                onMouseLeave={() => setHover(null)}
              />
            </label>
          );
        })}

        <div className="mt-3">
          <p>Your rating is {rating}.</p>
        </div>
      </div>
    </>
  );
};

export default StarRating;
