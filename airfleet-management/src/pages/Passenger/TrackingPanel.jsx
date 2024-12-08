import React, { useState, useEffect } from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";  // Import useNavigate from react-router-dom

const stripePromise = loadStripe("pk_test_51QTcWCRpjA9U7v3sbSo1o6PwDB2IporQNxGlyxMUSljvjB9Nzi4c650vhzGp1JIJI7mm44dyO8QZq0JbvxodSXto00dzJreWgy");

const PaymentForm = ({ bookingData, setPaymentStatus }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();  // Initialize useNavigate hook

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    const cardElement = elements.getElement(CardElement);
    const { error, paymentIntent } = await stripe.confirmCardPayment(
      bookingData.clientSecret,
      {
        payment_method: {
          card: cardElement,
        },
      }
    );

    if (error) {
      console.error("Error confirming payment:", error);
      setLoading(false);
      alert(`Payment Error: ${error.message}`);
    } else if (paymentIntent.status === "succeeded") {
      
      // After successful payment, update the payment status on the backend
      await axios.put(`http://localhost:5000/api/bookings/bookings/${bookingData._id}/payment-status`, {
        paymentStatus: "Paid",
        status: "Confirmed",
      });
      setPaymentStatus("Payment Successful");
      alert("Payment Successful!");

      // Navigate to /passenger/flight-info after payment is successful
      navigate("/passenger/flight-info");  // Navigate to the flight info page
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="border-2 border-gray-600 rounded-lg p-4">
        <CardElement
          className="bg-white p-4 rounded-lg text-black placeholder-gray-400"
          style={{
            base: {
              color: "#000",
              fontSize: "16px",
              padding: "10px",
              fontFamily: "'Roboto', sans-serif",
              backgroundColor: "white", // Set background color to white
            },
            placeholder: {
              color: "#ccc",
            },
          }}
        />
      </div>
      <button
        type="submit"
        disabled={!stripe || loading}
        className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-3 px-6 rounded-lg w-full shadow-md transform transition-all hover:scale-105 hover:shadow-xl"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
};

const TrackingPanel = () => {
  const [bookingData, setBookingData] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        const passengerId = localStorage.getItem("PassID");
        if (passengerId) {
          const response = await axios.get(`http://localhost:5000/api/bookings/bookings/latest/${passengerId}`);
          setBookingData(response.data);

          // Create Payment Intent to get client secret
          const paymentResponse = await axios.post("http://localhost:5000/api/stripe/create-payment-intent", {
            amount: response.data.amountPaid,
          });
          setClientSecret(paymentResponse.data.clientSecret);
        } else {
          console.error("Passenger ID not found.");
        }
      } catch (err) {
        console.error("Error fetching booking data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookingData();
  }, []);

  return (
    <div className="tracking-panel min-h-screen bg-gradient-to-r from-gray-700 via-gray-800 to-black text-white p-8">
      <div className="max-w-4xl mx-auto bg-gray-700 p-8 rounded-xl shadow-lg space-y-8">
        <h2 className="text-4xl font-semibold text-center text-yellow-400 mb-6">Tracking Panel</h2>

        {loading ? (
          <p className="text-center text-xl">Loading booking details...</p>
        ) : bookingData ? (
          <div>
            <div className="booking-details mb-8">
              <h3 className="text-2xl font-semibold mb-4">Booking Details</h3>
              <p className="text-lg">Flight: {bookingData.flightId?.flightNumber || "Not Available"}</p>
              <p className="text-lg">Seat(s): {bookingData.seatNumbers?.join(", ") || "Not Selected"}</p>
              <p className="text-lg">Payment Status: {bookingData.paymentStatus}</p>
              <p className="text-lg">Amount Paid: ${bookingData.amountPaid}</p>
            </div>

            <div className="payment-section mb-8">
              <h3 className="text-2xl font-semibold mb-4">Payment</h3>
              <p className="text-lg mb-6">Status: {paymentStatus || "Awaiting Payment"}</p>
              {clientSecret ? (
                <Elements stripe={stripePromise}>
                  <PaymentForm
                    bookingData={{ ...bookingData, clientSecret }}
                    setPaymentStatus={setPaymentStatus}
                  />
                </Elements>
              ) : (
                <button className="bg-yellow-500 py-2 px-6 rounded-lg w-full" disabled>
                  Loading Payment Form...
                </button>
              )}
            </div>
          </div>
        ) : (
          <p className="text-center text-xl">No booking data found.</p>
        )}
      </div>
    </div>
  );
};

export default TrackingPanel;
