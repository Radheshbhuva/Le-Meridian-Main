// src/pages/RoomsPage.jsx

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/RoomsPage.module.css";
import { getRooms } from "../services/apiService"; // ✅ FIXED

const amenities = [
  { icon: "fa-wifi", name: "Free WiFi" },
  { icon: "fa-swimming-pool", name: "Swimming Pool" },
  { icon: "fa-dumbbell", name: "Fitness Center" },
  { icon: "fa-concierge-bell", name: "Room Service" },
  { icon: "fa-plane", name: "Airport Pickup" },
];

function RoomsPage() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ FETCH ROOMS FROM BACKEND
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await getRooms();
        setRooms(res.data.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load rooms");
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  return (
    <div className={styles.roomsPage}>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Rooms & Suites</h1>
          <p>
            Experience comfort and elegance in our thoughtfully designed luxury
            accommodations.
          </p>
        </div>
      </section>

      {/* ROOMS GRID */}
      <section className={styles.roomsSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Our Accommodations</h2>

          {/* ✅ LOADING */}
          {loading && <p>Loading rooms...</p>}

          {/* ✅ ERROR */}
          {error && <p style={{ color: "red" }}>{error}</p>}

          <div className={styles.roomsGrid}>
            {rooms.map((room, index) => (
              <div key={index} className={styles.roomCard}>
                <img
                  src={
                    room.image ||
                    "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&q=80&w=1000"
                  }
                  alt={room.name}
                />

                <div className={styles.roomContent}>
                  <h3>{room.name}</h3>
                  <p>{room.description || "Luxury room"}</p>

                  <div className={styles.roomFeatures}>
                    <span>
                      <i className="fas fa-user"></i>{" "}
                      {room.guests || "2 Guests"}
                    </span>

                    <span>
                      <i className="fas fa-ruler-combined"></i>{" "}
                      {room.size || "40 m²"}
                    </span>

                    <span>
                      <i className="fas fa-bed"></i>{" "}
                      {room.bed || "King Bed"}
                    </span>
                  </div>

                  <div className={styles.roomFooter}>
                    <span className={styles.price}>
                      ₹{room.price}/night
                    </span>

                    <div className={styles.buttons}>
                      <button className={styles.viewBtn}>
                        View Details
                      </button>

                      <Link to="/book" className={styles.bookBtn}>
                        Book Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ✅ EMPTY STATE */}
          {!loading && rooms.length === 0 && (
            <p>No rooms available</p>
          )}
        </div>
      </section>

      {/* AMENITIES */}
      <section className={styles.amenitiesSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Hotel Amenities</h2>

          <div className={styles.amenitiesGrid}>
            {amenities.map((item, index) => (
              <div key={index} className={styles.amenityCard}>
                <i className={`fas ${item.icon}`}></i>
                <p>{item.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default RoomsPage;