import { useState } from "react";
import { FaStar } from "react-icons/fa6";
import "../style/Stars.css";

const StarRating = () => {
  const [rating, setRating] = useState<number | null>(null);
  const [hover, setHover] = useState<number | null>(null);
  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        const currentRating = index + 1;
        return (
          <label>
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
      <p>Your rating is {rating}.</p>
    </div>
  );
};

export default StarRating;
