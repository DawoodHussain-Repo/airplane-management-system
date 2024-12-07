import React, { useState, useEffect } from "react";
import { Star } from "lucide-react";
import userimg from "../../assets/images/user.png";
const FeedbackManagement = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [averageRating, setAverageRating] = useState(0);

  // Fetch all feedbacks when the component mounts
  useEffect(() => {
    fetchFeedbacks();
  }, []);

  // Fetch feedbacks from API
  const fetchFeedbacks = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/feedbacks");
      const data = await response.json();
      setFeedbacks(data);
      calculateAverageRating(data);
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
    }
  };

  // Calculate average rating
  const calculateAverageRating = (feedbacksList) => {
    const totalRating = feedbacksList.reduce((sum, feedback) => sum + feedback.rating, 0);
    setAverageRating(totalRating / feedbacksList.length);
  };

  // Calculate the total number of feedbacks
  const totalFeedbacks = feedbacks.length;

  // Get the count for each rating
  const getRatingCount = (rating) => feedbacks.filter((feedback) => feedback.rating === rating).length;

  // Function to determine background color based on rating
  const getFeedbackColor = (rating) => {
    if (rating >= 4) return "bg-green-500 text-white"; // Excellent (green)
    if (rating === 3) return "bg-yellow-500 text-white"; // Average (yellow)
    return "bg-red-500 text-white"; // Poor (red)
  };

  return (
    <div>
      <div className="flex items-center justify-between px-6 py-4 bg-secondary">
        <h1 className="text-xl font-bold text-white">Feedback</h1>
      </div>
      <div className="p-0 bg-gray-00 min-h-screen flex flex-col gap-6 text-black">
        {/* Feedback Report Section */}
        <div className="w-full bg-white p-6 shadow-lg">
          {/* Overall Rating */}
          <div className="mb-6 p-6 bg-gray-200 rounded-lg text-black flex items-center justify-between">
            <span className="text-xl">Average Rating:</span>
            <div className="flex items-center space-x-3">
              <Star className="text-yellow-500 w-7 h-7" />
              <span className="text-3xl font-bold">{averageRating.toFixed(2)} / 5</span>
            </div>
          </div>

          {/* Feedback Breakdown */}
          <div className="space-y-6 bg-gray-200 p-10 rounded-lg">
            <div>
              <strong className="text-xl">Feedback Breakdown:</strong>
              <div className="space-y-4 mt-4">
                {[1, 2, 3, 4, 5].map((rating) => {
                  const count = getRatingCount(rating);
                  const percentage = totalFeedbacks ? (count / totalFeedbacks) * 100 : 0;
                  return (
                    <div key={rating} className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-lg">Rating {rating}:</span>
                        <span className="text-lg">{count} feedback(s)</span>
                      </div>
                      <div className="w-full bg-gray-300 rounded-full h-2">
                        <div
                          className="bg-yellow-500 h-2 rounded-full"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Recent Feedbacks */}
          <div className="overflow-y-auto max-h-80 mt-6 bg-gray-200 p-5 scrollbar-thin scrollbar-thumb-secondary rounded-lg">
            <h3 className="text-xl font-semibold">Recent Feedbacks</h3>
            <ul className="space-y-6">
              {feedbacks.map((feedback) => (
                <li key={feedback._id} className="border-b pb-4">
                  <div className="flex items-center space-x-4">
                    {/* User Image */}
                    <img
                      src= {userimg}
                      alt="User"
                      className="w-12 my-2 h-12 rounded-full object-cover"
                    />
                    <div className="flex justify-between w-full items-center">
                      <span className="font-semibold">{feedback.passengerId.email}</span>
                      <div className="flex items-center">
                        <Star className="mr-2 text-[#f39c12]" />
                        {feedback.rating}
                      </div>
                    </div>
                  </div>
                  <p className={`${getFeedbackColor(feedback.rating)} p-3 rounded-lg`}>
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
