import React from "react";
import Card from "./shared/Card";
import Button from "./shared/Button";
import RatingSelect from "./RatingSelect";
import { useContext, useState, useEffect } from "react";
import FeedbackContext from "../context/FeedbackContext";

function FeedbackForm() {
  const { addFeedback, feedbackEdit, updateFeedback, setFeedbackEdit } =
    useContext(FeedbackContext);

  useEffect(() => {
    if (feedbackEdit.edit === true) {
      setBtnDisable(false);
      setText(feedbackEdit.item.text);
      setRating(feedbackEdit.item.rating);
    }
  }, [feedbackEdit]);

  const [text, setText] = useState("");
  const [rating, setRating] = useState(10);
  const [btnDisabled, setBtnDisable] = useState(true);
  const [message, setMessage] = useState("");

  const handleTextChange = (e) => {
    if (text === "") {
      setBtnDisable(true);
      setMessage(null);
    } else if (text !== "" && text.trim().length <= 10) {
      setBtnDisable(true);
      setMessage("Text must be at least 10 characters");
    } else {
      setBtnDisable(false);
      setMessage(null);
    }
    setText(e.target.value);
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    if (text.trim().length > 10) {
      const newFeedback = {
        text,
        rating,
      };

      console.log(feedbackEdit.edit);
      if (feedbackEdit.edit === true) {
        const item = feedbackEdit.item;
        setFeedbackEdit({item,edit:false});
        updateFeedback(feedbackEdit.item.id, newFeedback);
      }
      else addFeedback(newFeedback);

      setText("");
      setRating(0);
    }
  };
  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>How would you rate your service with us?</h2>
        <RatingSelect select={(rating) => setRating(rating)} />
        <div className="input-group">
          <input
            value={text}
            onChange={handleTextChange}
            type="text"
            placeholder="Write a review"
          ></input>
          <Button type="submit" isDisable={btnDisabled}>
            Send
          </Button>
        </div>
        {message && <div className="message">{message}</div>}
      </form>
    </Card>
  );
}

export default FeedbackForm;
