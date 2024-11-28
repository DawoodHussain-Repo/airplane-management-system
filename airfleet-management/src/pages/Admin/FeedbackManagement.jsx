import React, { useState } from "react";
import { Star } from "lucide-react";

const initialFeedbacks = [
  { id: 1, flightNo: "AF100", rating: 4, comments: "Great flight, very comfortable!" },
  { id: 2, flightNo: "AF200", rating: 3, comments: "Decent flight, but food could be better." },
  { id: 3, flightNo: "AF300", rating: 5, comments: "Excellent experience, loved the service!" },
];

const FeedbackManagement = () => {
  const [feedbacks, setFeedbacks] = useState(initialFeedbacks);
  const [newFeedback, setNewFeedback] = useState({ flightNo: "", rating: 0, comments: "" });
  const [averageRating, setAverageRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitFeedback = () => {
    if (!newFeedback.flightNo || !newFeedback.comments || newFeedback.rating === 0) {
      alert("Please fill in all fields before submitting.");
      return;
    }
    const newFeedbackObj = { ...newFeedback, id: Date.now() };
    setFeedbacks((prevFeedbacks) => [...prevFeedbacks, newFeedbackObj]);
    setIsSubmitting(false);
    resetForm();
    calculateAverageRating();
  };

  const calculateAverageRating = () => {
    const totalRating = feedbacks.reduce((sum, feedback) => sum + feedback.rating, 0);
    setAverageRating(totalRating / feedbacks.length);
  };

  const resetForm = () => {
    setNewFeedback({ flightNo: "", rating: 0, comments: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFeedback({ ...newFeedback, [name]: value });
  };

  const handleRatingClick = (rating) => {
    setNewFeedback({ ...newFeedback, rating });
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`cursor-pointer w-8 h-8 ${i <= newFeedback.rating ? "text-[#f39c12]" : "text-gray-300"}`}
          onClick={() => handleRatingClick(i)}
        />
      );
    }
    return stars;
  };

  // Function to determine background color based on rating
  const getFeedbackColor = (rating) => {
    if (rating >= 4) return "bg-green-500 text-white"; // Excellent (green)
    if (rating === 3) return "bg-yellow-500 text-white"; // Average (yellow)
    return "bg-red-500 text-white"; // Poor (red)
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen flex flex-col md:flex-row gap-6 text-white">
      {/* Feedback Form */}
      <div className="w-full md:w-1/2 lg:w-2/5 bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Submit Your Feedback</h2>
        <div className="space-y-6">
          <input
            type="text"
            name="flightNo"
            value={newFeedback.flightNo}
            onChange={handleInputChange}
            placeholder="Flight No."
            className="w-full p-3 border border-gray-700 rounded-md text-lg bg-gray-700 text-white"
          />
          <div className="flex items-center mr-1">
            <span className="text-lg mr-0">Rating:</span>
            <div className="flex space-x-2">{renderStars()}</div>
          </div>
          <textarea
            name="comments"
            value={newFeedback.comments}
            onChange={handleInputChange}
            placeholder="Write your feedback here..."
            className="w-full p-3 border border-gray-700 rounded-md text-lg bg-gray-700 text-white"
          />
          <button
            onClick={handleSubmitFeedback}
            className="w-full bg-yellow-500 text-white p-3 rounded-md hover:bg-yellow-600 transition-colors duration-300 text-lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Feedback"}
          </button>
        </div>
      </div>

      {/* Feedback Report Section */}
      <div className="w-full md:w-2/3 bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Feedback Reports</h2>
        <div className="space-y-4">
          <div className="text-lg">
            <strong>Average Rating:</strong> {averageRating.toFixed(2)} / 5
          </div>
          <div>
            <strong>Feedback Breakdown:</strong>
            <div className="space-y-2">
              {[1, 2, 3, 4, 5].map((rating) => {
                const count = feedbacks.filter((feedback) => feedback.rating === rating).length;
                return (
                  <div key={rating} className="flex justify-between">
                    <span>Rating {rating}:</span>
                    <span>{count} feedback(s)</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="overflow-y-auto max-h-80 mt-6">
            <h3 className="text-xl font-semibold">Recent Feedbacks</h3>
            <ul className="space-y-4">
              {feedbacks.map((feedback) => (
                <li key={feedback.id} className="border-b pb-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">{feedback.flightNo}</span>
                    <div className="flex items-center">
                      <Star className="mr-1 text-[#f39c12]" />
                      {feedback.rating}
                    </div>
                  </div>
                  <p className={`${getFeedbackColor(feedback.rating)} p-3 rounded-md`}>
                    {feedback.comments}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackManagement;
