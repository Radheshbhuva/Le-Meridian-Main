// src/pages/BookNowPage.jsx

import React, { useState, useEffect } from "react";
import styles from "../styles/BookNowPage.module.css";
import { createBooking } from "../services/apiService"; // ✅ ADD THIS

const roomPrices = {
  "Deluxe Room": 8999,
  "Executive Suite": 15999,
  "Presidential Suite": 35999,
  "Club Room": 12999,
  "Family Suite": 19999,
  "Heritage Room": 10999
};



function BookNowPage() {

  const TAX_RATE = 0.18;

  const [formData, setFormData] = useState({
    checkin: "",
    checkout: "",
    adults: "2",
    children: "0",
    roomType: "Deluxe Room",
    requests: "",
    name: "",
    email: "",
    phone: "",
    country: "",
    paymentMethod: "credit-card",
    upiId: "",
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
    saveCard: false
  });

  const [totalNights, setTotalNights] = useState(0);
  const [total, setTotal] = useState(0);

  const [processingPayment, setProcessingPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState("");


  const calculateNights = (checkIn, checkOut) => {
    if (checkIn && checkOut) {
      const start = new Date(checkIn);
      const end = new Date(checkOut);
      const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      return diff > 0 ? diff : 0;
    }
    return 0;
  };

  useEffect(() => {
    const nights = calculateNights(formData.checkin, formData.checkout);
    setTotalNights(nights);

    const price = roomPrices[formData.roomType] || 8999;
    const sub = price * nights;
    const taxVal = sub * TAX_RATE;
    setTotal(sub + taxVal);
  }, [formData.checkin, formData.checkout, formData.roomType]);



  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!totalNights) return alert("Select dates");

    try {
      setProcessingPayment(true);

      const token = localStorage.getItem("token");
      if (!token) {
        setProcessingPayment(false);
        setPaymentError("Please Sign In or Create an Account first to complete your booking.");
        return;
      }

      // ✅ CREATE BOOKING (API CALL)
      await createBooking({
        roomType: formData.roomType,
        checkInDate: formData.checkin,
        checkOutDate: formData.checkout,
        totalPrice: total,
        name: formData.name,
        guestEmail: formData.email
      });

      setProcessingPayment(false);
      setPaymentSuccess(true);

      alert("Booking successful 🎉");

    } catch (error) {
      console.error("Booking Error:", error.response);
      setProcessingPayment(false);
      if (error.response?.status === 401) {
        setPaymentError("Unauthorized: Please Sign In again.");
      } else if (error.response?.data?.errors?.length > 0) {
        // Express-validator errors
        setPaymentError(`Validation Error: ${error.response.data.errors[0].msg}`);
      } else {
        setPaymentError(error.response?.data?.message || "Booking failed. Please try again.");
      }
    }
  };

  return (
    <div className={styles.bookingPage}>
      <div className={styles.container}>
        <h1 className={styles.pageTitle}>Book Your Stay</h1>

        {paymentSuccess && (
          <div className={styles.successMessage}>
            ✓ Booking successful
          </div>
        )}

        <div className={styles.bookingLayout}>

          <form className={styles.bookingForm} onSubmit={handleSubmit}>
            <h2>Reservation Details</h2>

            <div className={styles.formRow}>
              <input type="date" name="checkin" value={formData.checkin} onChange={handleChange} required />
              <input type="date" name="checkout" value={formData.checkout} onChange={handleChange} required />
            </div>

            <select name="roomType" value={formData.roomType} onChange={handleChange}>
              {Object.keys(roomPrices).map(r => (
                <option key={r}>{r}</option>
              ))}
            </select>

            <h2>Guest</h2>
            <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
            <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />

            {paymentError && <div className={styles.errorMessage}>{paymentError}</div>}

            <button type="submit" disabled={processingPayment}>
              {processingPayment ? "Processing..." : `Book Now ₹${Math.round(total)}`}
            </button>
          </form>

          <div className={styles.summary}>
            <h2>Summary</h2>
            <p>{formData.roomType}</p>
            <p>{totalNights} nights</p>
            <p>Total: ₹{Math.round(total)}</p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default BookNowPage;