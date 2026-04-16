// src/components/BookingWidget.jsx

import React from "react";

function BookingWidget({
  user,

  rooms,
  setRooms,
  adults,
  setAdults,
  children,
  setChildren,

  rate,
  setRate,
  rateOptions,

  checkIn,
  setCheckIn,
  checkOut,
  setCheckOut,

  currentMonth,
  setCurrentMonth,

  showCalendar,
  setShowCalendar,

  showGuestPanel,
  setShowGuestPanel,
  showRatePanel,
  setShowRatePanel,
  showDatePanel,
  setShowDatePanel,

  roomsSummary,
  formatDate,
  generateCalendarDays,
  handleDateSelect,
  isDateDisabled,
  getNights
}) {
  return (
    <div className="booking-widget-container">
      <div className="container">
        <div className="booking-widget">

          <div className="booking-widget-header">
            <h3>Book Your Stay</h3>
            <p>Best rate guaranteed</p>

            {user && (
              <div className="member-badge">
                ✦ Member Exclusive Rates Available ✦
              </div>
            )}
          </div>

          <div className="booking-widget-content">

            {/* Dates Section */}
            <div className="booking-section">
              <div
                className="booking-header"
                onClick={() => setShowDatePanel(!showDatePanel)}
              >
                <div className="booking-header-icon">📅</div>

                <div className="booking-header-content">
                  <span className="booking-header-title">
                    Check-in - Check-out
                  </span>

                  <span className="booking-header-summary">
                    {formatDate(checkIn)} — {formatDate(checkOut)}

                    {checkIn && checkOut && (
                      <span className="booking-nights">
                        {getNights()} nights
                      </span>
                    )}
                  </span>
                </div>

                <span className={`booking-header-arrow ${showDatePanel ? "open" : ""}`}>
                  ▼
                </span>
              </div>

              <div className={`booking-panel ${showDatePanel ? "active" : ""}`}>

                <div className="date-selector">
                  <div className="date-input">
                    <label>Check-in</label>

                    <input
                      type="text"
                      value={formatDate(checkIn)}
                      readOnly
                      onClick={() => setShowCalendar(true)}
                    />
                  </div>

                  <div className="date-input">
                    <label>Check-out</label>

                    <input
                      type="text"
                      value={formatDate(checkOut)}
                      readOnly
                      onClick={() => setShowCalendar(true)}
                    />
                  </div>
                </div>

                {showCalendar && (
                  <div className="calendar-container">

                    <div className="month-nav">
                      <button
                        className="nav-btn"
                        onClick={() =>
                          setCurrentMonth(
                            new Date(
                              currentMonth.getFullYear(),
                              currentMonth.getMonth() - 1
                            )
                          )
                        }
                      >
                        ←
                      </button>

                      <span className="month-name">
                        {currentMonth.toLocaleDateString("en-US", {
                          month: "long",
                          year: "numeric"
                        })}
                      </span>

                      <button
                        className="nav-btn"
                        onClick={() =>
                          setCurrentMonth(
                            new Date(
                              currentMonth.getFullYear(),
                              currentMonth.getMonth() + 1
                            )
                          )
                        }
                      >
                        →
                      </button>
                    </div>

                    <table className="calendar">
                      <thead>
                        <tr>
                          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                            <th key={day}>{day}</th>
                          ))}
                        </tr>
                      </thead>

                      <tbody>
                        {Array.from({
                          length: Math.ceil(generateCalendarDays().length / 7)
                        }).map((_, weekIndex) => (
                          <tr key={weekIndex}>
                            {generateCalendarDays()
                              .slice(weekIndex * 7, (weekIndex + 1) * 7)
                              .map((date, dayIndex) => (
                                <td key={dayIndex}>
                                  {date && (
                                    <button
                                      className={`calendar-day
                                      ${
                                        checkIn &&
                                        date.toDateString() === checkIn.toDateString()
                                          ? "selected"
                                          : ""
                                      }
                                      ${
                                        checkOut &&
                                        date.toDateString() === checkOut.toDateString()
                                          ? "selected"
                                          : ""
                                      }
                                      ${isDateDisabled(date) ? "disabled" : ""}`}
                                      onClick={() =>
                                        !isDateDisabled(date) &&
                                        handleDateSelect(date)
                                      }
                                      disabled={isDateDisabled(date)}
                                    >
                                      {date.getDate()}
                                    </button>
                                  )}
                                </td>
                              ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <button
                      className="btn btn-secondary done-btn"
                      onClick={() => setShowCalendar(false)}
                    >
                      Done
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Rooms & Guests */}
            <div className="booking-section">

              <div
                className="booking-header"
                onClick={() => setShowGuestPanel(!showGuestPanel)}
              >
                <div className="booking-header-icon">👥</div>

                <div className="booking-header-content">
                  <span className="booking-header-title">
                    Rooms & Guests
                  </span>

                  <span className="booking-header-summary">
                    {roomsSummary()}
                  </span>
                </div>

                <span className={`booking-header-arrow ${showGuestPanel ? "open" : ""}`}>
                  ▼
                </span>
              </div>

              <div className={`booking-panel ${showGuestPanel ? "active" : ""}`}>
                <div className="counter-group">

                  <div className="counter">
                    <span className="counter-label">Rooms</span>

                    <div className="counter-controls">
                      <button
                        className="counter-btn"
                        onClick={() => rooms > 1 && setRooms(rooms - 1)}
                      >
                        −
                      </button>

                      <span className="counter-value">{rooms}</span>

                      <button
                        className="counter-btn"
                        onClick={() => setRooms(rooms + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="counter">
                    <span className="counter-label">Adults</span>

                    <div className="counter-controls">
                      <button
                        className="counter-btn"
                        onClick={() => adults > 1 && setAdults(adults - 1)}
                      >
                        −
                      </button>

                      <span className="counter-value">{adults}</span>

                      <button
                        className="counter-btn"
                        onClick={() => setAdults(adults + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="counter">
                    <span className="counter-label">Children</span>

                    <div className="counter-controls">
                      <button
                        className="counter-btn"
                        onClick={() => children > 0 && setChildren(children - 1)}
                      >
                        −
                      </button>

                      <span className="counter-value">{children}</span>

                      <button
                        className="counter-btn"
                        onClick={() => setChildren(children + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* Special Rates */}
            <div className="booking-section">

              <div
                className="booking-header"
                onClick={() => setShowRatePanel(!showRatePanel)}
              >
                <div className="booking-header-icon">🏷️</div>

                <div className="booking-header-content">
                  <span className="booking-header-title">
                    Special Rates
                  </span>

                  <span className="booking-header-summary">
                    {rate}
                  </span>
                </div>

                <span className={`booking-header-arrow ${showRatePanel ? "open" : ""}`}>
                  ▼
                </span>
              </div>

              <div className={`booking-panel ${showRatePanel ? "active" : ""}`}>
                <div className="rate-options">

                  {rateOptions.map((r) => (
                    <label key={r} className="rate-option">
                      <input
                        type="radio"
                        name="rate"
                        checked={rate === r}
                        onChange={() => setRate(r)}
                      />

                      <span className="rate-label">{r}</span>

                      {user && r === "Lowest Regular Rate" && (
                        <span className="member-badge-small">
                          Member Rate Available
                        </span>
                      )}
                    </label>
                  ))}

                </div>
              </div>
            </div>

            <button className="btn btn-primary btn-block check-btn">
              {user
                ? "Check Availability with Member Benefits"
                : "Check Availability"}
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingWidget;