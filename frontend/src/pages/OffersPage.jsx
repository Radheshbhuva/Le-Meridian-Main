// src/pages/OffersPage.jsx

import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/OffersPage.module.css";

const offers = [
  {
    title: "Weekend Escape",
    discount: "25% OFF",
    validity: "Valid till 31 Dec 2026",
    description:
      "Enjoy a relaxing weekend getaway with complimentary breakfast and late checkout.",
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Honeymoon Package",
    discount: "30% OFF",
    validity: "Valid till 30 Nov 2026",
    description:
      "Celebrate romance with luxury room décor, candlelight dinner, and spa treatment.",
    image:
      "https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Family Vacation Deal",
    discount: "20% OFF",
    validity: "Valid till 15 Jan 2027",
    description:
      "Perfect family stay including kids activities and complimentary meals for children.",
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Business Traveler Offer",
    discount: "18% OFF",
    validity: "Valid till 31 Oct 2026",
    description:
      "Special corporate rates with high-speed WiFi and executive lounge access.",
    image:
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Festival Special",
    discount: "22% OFF",
    validity: "Valid till 30 Dec 2026",
    description:
      "Celebrate festive moments with exclusive discounts and festive dining.",
    image:
      "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Long Stay Discount",
    discount: "28% OFF",
    validity: "Valid till 31 Mar 2027",
    description:
      "Stay longer and save more with exclusive discounts on extended stays.",
    image:
      "https://images.unsplash.com/photo-1505692794403-35c71b30b64b?auto=format&fit=crop&w=1200&q=80",
  },
];

function OffersPage() {
  return (
    <div className={styles.offersPage}>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Special Offers</h1>
          <p>Exclusive deals crafted for unforgettable stays</p>
        </div>
      </section>

      {/* HIGHLIGHT BANNER */}
      <div className={styles.highlightBanner}>
        <h2>Up to 30% Off Luxury Stays</h2>
        <p>Limited-time offers on premium rooms and suites</p>
      </div>

      {/* OFFERS GRID */}
      <section className={styles.offersSection}>
        <div className={styles.container}>
          <div className={styles.offersGrid}>
            {offers.map((offer, index) => (
              <div key={index} className={styles.offerCard}>
                <img src={offer.image} alt={offer.title} />

                <div className={styles.offerContent}>
                  <span className={styles.discount}>{offer.discount}</span>

                  <h3>{offer.title}</h3>

                  <p>{offer.description}</p>

                  <p className={styles.validity}>{offer.validity}</p>

                  <Link to="/book" className={styles.bookBtn}>
                    Book Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default OffersPage;