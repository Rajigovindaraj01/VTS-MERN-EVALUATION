import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import './feedback.css'
import feed from '../assets/images/feed.png'
import { AuthContext } from "../context/AuthContext";

function Feedback() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [feedbacks, setFeedbacks] = useState([]);

  // Fetch existing feedback for this course
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/feedbacks/${courseId}`
        );
        setFeedbacks(res.data);
      } catch (err) {
        console.error("Error fetching feedbacks:", err);
      }
    };

    fetchFeedbacks();
  }, [courseId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!rating) {
      alert("Please provide a rating");
      return;
    }

    try {
      await axios.post(
        "http://localhost:8000/api/feedbacks",
        { courseId, rating, review },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Feedback submitted successfully!");
      navigate("/dashboard"); // Redirect to My Courses after feedback
    } catch (err) {
      console.error(err);
      alert(
        err.response?.data?.message || "Error submitting feedback. Try again."
      );
    }
  };

  return (
    <div>
      <div className="logo" style={{padding:"10px"}}>
        EDUTECH - <span>Online learning platform</span>
      </div>
    <div className="feedback-container" style={{ padding: "30px" }}>
      <div>
        <h2>Give Feedback</h2>
      <h3>"We are love to hear your feedback"</h3>

      <form onSubmit={handleSubmit} style={{ marginBottom: "30px" }}>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Rating:{" "}<br></br>
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
            >
              <option value={0}>Select Rating</option>
              <option value={1}>1 ⭐</option>
              <option value={2}>2 ⭐⭐</option>
              <option value={3}>3 ⭐⭐⭐</option>
              <option value={4}>4 ⭐⭐⭐⭐</option>
              <option value={5}>5 ⭐⭐⭐⭐⭐</option>
            </select>
          </label>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>
            Review: <br />
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              rows={4}
              cols={50}
              placeholder="Write your review here..."
            ></textarea>
          </label>
        </div>

        <button type="submit" style={{ padding: "8px 15px" }}>
          Submit Feedback
        </button>
      </form>

      <h3>All Feedbacks</h3>
      {feedbacks.length === 0 ? (
        <p>No feedback yet</p>
      ) : (
        feedbacks.map((f) => (
          <div
            key={f._id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "5px",
            }}

            className="feed"
          >
            <p>
              <b>{f.studentId.name}</b> rated: {f.rating} ⭐
            </p>
            <p>{f.review}</p>
          </div>
        ))
      )}
      </div>
      <div className="feedimage">
        <img src={feed}></img>
      </div>
    </div>
    </div>
  );
}

export default Feedback;
