// src/pages/EventsPage.jsx

import React from "react";
import styles from "../styles/EventsPage.module.css";

const venues = [
  {
    name: "Grand Ballroom",
    capacity: "500 Guests",
    area: "600 m²",
    seating: "Theatre, Banquet, Classroom",
    image:
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Sapphire Conference Hall",
    capacity: "120 Guests",
    area: "200 m²",
    seating: "Conference, Theatre",
    image:
      "https://images.unsplash.com/photo-1590490359683-658d3d23f972?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Boardroom",
    capacity: "20 Guests",
    area: "60 m²",
    seating: "Boardroom Style",
    image:
      "https://images.unsplash.com/photo-1577412647305-991150c7d163?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Outdoor Garden Venue",
    capacity: "300 Guests",
    area: "800 m²",
    seating: "Outdoor Banquet, Wedding Setup",
    image:
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=80",
  },
];

const services = [
  { icon: "fa-utensils", name: "Catering" },
  { icon: "fa-gem", name: "Decoration" },
  { icon: "fa-microphone", name: "Audio Visual Setup" },
  { icon: "fa-calendar-check", name: "Event Planning" },
];

function EventsPage() {
  return (
    <div className={styles.eventsPage}>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Meetings & Events</h1>
          <p>
            Host unforgettable events with luxury venues and world-class
            hospitality at Le Méridien Ahmedabad.
          </p>
        </div>
      </section>

      {/* EVENT SPACES */}
      <section className={styles.venuesSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Event Spaces</h2>

          <div className={styles.venuesGrid}>
            {venues.map((venue, index) => (
              <div key={index} className={styles.venueCard}>
                <img src={venue.image} alt={venue.name} />

                <div className={styles.venueContent}>
                  <h3>{venue.name}</h3>

                  <p>
                    <i className="fas fa-users"></i> Capacity: {venue.capacity}
                  </p>

                  <p>
                    <i className="fas fa-ruler-combined"></i> Area: {venue.area}
                  </p>

                  <p>
                    <i className="fas fa-chair"></i> Seating: {venue.seating}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className={styles.servicesSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Event Services</h2>

          <div className={styles.servicesGrid}>
            {services.map((service, index) => (
              <div key={index} className={styles.serviceCard}>
                <i className={`fas ${service.icon}`}></i>
                <p>{service.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WEDDINGS */}
      <section className={styles.weddingSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>
            Luxury Wedding Celebrations
          </h2>

          <div className={styles.weddingGrid}>
            <img
              src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80"
              alt="Wedding Event"
            />

            <div className={styles.weddingContent}>
              <h3>Celebrate Your Dream Wedding</h3>

              <p>
                From elegant indoor ballrooms to breathtaking outdoor gardens,
                our venues provide the perfect setting for unforgettable
                wedding celebrations.
              </p>

              <p>
                Our expert planners ensure every detail is flawlessly
                executed, creating memories that last a lifetime.
              </p>

              <button className={styles.contactBtn}>
                Plan Your Event
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default EventsPage;