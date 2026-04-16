import { useState } from "react";
import "../styles/style.css";

/* Components */
import Hero from "../components/Hero";
import BookingWidget from "../components/BookingWidget";
import ExperienceSection from "../components/ExperienceSection";
import RoomsSection from "../components/RoomsSection";
import Testimonials from "../components/Testimonials";
import Offers from "../components/Offers";
import Newsletter from "../components/NewsLetter";

export default function HomePage({ user }) {
  /* ---------- BOOKING STATE ---------- */
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  const [showGuestPanel, setShowGuestPanel] = useState(false);
  const [showRatePanel, setShowRatePanel] = useState(false);
  const [showDatePanel, setShowDatePanel] = useState(false);

  /* ---------- RATE ---------- */
  const [rate, setRate] = useState("Lowest Regular Rate");
  const rateOptions = [
    "Lowest Regular Rate",
    "Senior Discount",
    "AAA/CAA",
    "Government & Military",
    "Corporate Rate"
  ];

  /* ---------- DATE ---------- */
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  /* ---------- HELPERS ---------- */
  const roomsSummary = () => {
    let text = `${rooms} Room${rooms > 1 ? "s" : ""}, ${adults} Adult${adults > 1 ? "s" : ""}`;
    if (children > 0) {
      text += `, ${children} Child${children > 1 ? "ren" : ""}`;
    }
    return text;
  };

  const formatDate = (date) => {
    if (!date) return "Select dates";
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  const getNights = () => {
    if (checkIn && checkOut) {
      const diffTime = Math.abs(checkOut - checkIn);
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
    return 0;
  };

  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const handleDateSelect = (date) => {
    if (!checkIn || (checkIn && checkOut)) {
      setCheckIn(date);
      setCheckOut(null);
    } else if (date > checkIn) {
      setCheckOut(date);
      setShowCalendar(false);
    } else {
      setCheckIn(date);
      setCheckOut(null);
    }
  };

  const isDateDisabled = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  return (
    <div className="homepage">

      {/* HERO */}
      <Hero />

      {/* BOOKING WIDGET */}
      <BookingWidget
        user={user}
        rooms={rooms}
        setRooms={setRooms}
        adults={adults}
        setAdults={setAdults}
        children={children}
        setChildren={setChildren}
        rate={rate}
        setRate={setRate}
        rateOptions={rateOptions}
        checkIn={checkIn}
        setCheckIn={setCheckIn}
        checkOut={checkOut}
        setCheckOut={setCheckOut}
        currentMonth={currentMonth}
        setCurrentMonth={setCurrentMonth}
        showCalendar={showCalendar}
        setShowCalendar={setShowCalendar}
        showGuestPanel={showGuestPanel}
        setShowGuestPanel={setShowGuestPanel}
        showRatePanel={showRatePanel}
        setShowRatePanel={setShowRatePanel}
        showDatePanel={showDatePanel}
        setShowDatePanel={setShowDatePanel}
        roomsSummary={roomsSummary}
        formatDate={formatDate}
        generateCalendarDays={generateCalendarDays}
        handleDateSelect={handleDateSelect}
        isDateDisabled={isDateDisabled}
        getNights={getNights}
      />

      {/* EXPERIENCE */}
      <ExperienceSection />

      {/* ROOMS */}
      <RoomsSection />

      {/* AMENITIES */}
      <section className="section amenities-section">
        <div className="container">
          <div className="amenities-grid">
            <div className="amenity-item">
              <div className="amenity-icon">🏊</div>
              <h4>Infinity Pool</h4>
              <p>Seasonal outdoor pool with city views</p>
            </div>
            <div className="amenity-item">
              <div className="amenity-icon">💪</div>
              <h4>Fitness Center</h4>
              <p>24/7 state-of-the-art equipment</p>
            </div>
            <div className="amenity-item">
              <div className="amenity-icon">🍽️</div>
              <h4>Fine Dining</h4>
              <p>3 restaurants & 2 bars</p>
            </div>
            <div className="amenity-item">
              <div className="amenity-icon">💆</div>
              <h4>Spa</h4>
              <p>Full-service wellness retreat</p>
            </div>
            <div className="amenity-item">
              <div className="amenity-icon">🚗</div>
              <h4>Valet Parking</h4>
              <p>Complimentary for guests</p>
            </div>
            <div className="amenity-item">
              <div className="amenity-icon">📶</div>
              <h4>High-Speed WiFi</h4>
              <p>Complimentary throughout</p>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <Testimonials />

      {/* OFFERS */}
      <Offers />

      {/* NEWSLETTER */}
      <Newsletter />

    </div>
  );
}