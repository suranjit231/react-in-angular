import React, { useEffect, useState } from "react";
import styles from "./Reviews.module.css";

export default function ReviewsComponent() {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: "John Doe",
      rating: 4.5,
      comment: "The product was amazing, and the delivery was quick!",
      avatar: "https://via.placeholder.com/50",
      likes: 12,
      dislikes: 2,
      replies: [],
    },
    {
      id: 2,
      name: "Jane Smith",
      rating: 5,
      comment: "Exceptional quality and outstanding customer service.",
      avatar: "https://via.placeholder.com/50",
      likes: 20,
      dislikes: 1,
      replies: [],
    },
    {
      id: 3,
      name: "Alex Johnson",
      rating: 4,
      comment: "Good product, but packaging could be improved.",
      avatar: "https://via.placeholder.com/50",
      likes: 8,
      dislikes: 3,
      replies: [],
    },
  ]);


//   ======== triggered events when reviews changed ============//
useEffect(()=>{
    window.dispatchEvent(new CustomEvent('reviewResult', {
        detail: { reviews: reviews }
      }));


},[reviews])

  const handleLike = (id) => {
    setReviews((prevReviews) =>
      prevReviews.map((review) =>
        review.id === id
          ? { ...review, likes: review.likes + 1 }
          : review
      )
    );
  };

  const handleDislike = (id) => {
    setReviews((prevReviews) =>
      prevReviews.map((review) =>
        review.id === id
          ? { ...review, dislikes: review.dislikes + 1 }
          : review
      )
    );
  };

  const handleReply = (id, replyText) => {
    setReviews((prevReviews) =>
      prevReviews.map((review) =>
        review.id === id
          ? {
              ...review,
              replies: [...review.replies, { text: replyText, id: Date.now() }],
            }
          : review
      )
    );
  };

  return (
    <div className={styles.reviewsContainer}>
      <h2 className={styles.heading}>Customer Reviews</h2>
      {reviews.map((review) => (
        <div key={review.id} className={styles.reviewCard}>
          <img
            src={review.avatar}
            alt={`${review.name}'s avatar`}
            className={styles.avatar}
          />
          <div className={styles.reviewContent}>
            <div className={styles.reviewHeader}>
              <h3 className={styles.name}>{review.name}</h3>
              <div className={styles.rating}>
                {"⭐".repeat(Math.floor(review.rating))}{" "}
                {review.rating % 1 !== 0 && "⭐"}
              </div>
            </div>
            <p className={styles.comment}>{review.comment}</p>
            <div className={styles.actions}>
              <button
                className={styles.likeButton}
                onClick={() => handleLike(review.id)}
              >
                👍 {review.likes}
              </button>
              <button
                className={styles.dislikeButton}
                onClick={() => handleDislike(review.id)}
              >
                👎 {review.dislikes}
              </button>
            </div>
            <div className={styles.replySection}>
              <input
                type="text"
                className={styles.replyInput}
                placeholder="Write a reply..."
                onKeyDown={(e) => {
                  if (e.key === "Enter" && e.target.value.trim() !== "") {
                    handleReply(review.id, e.target.value);
                    e.target.value = "";
                  }
                }}
              />
              <ul className={styles.repliesList}>
                {review.replies.map((reply) => (
                  <li key={reply.id} className={styles.reply}>
                    {reply.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
