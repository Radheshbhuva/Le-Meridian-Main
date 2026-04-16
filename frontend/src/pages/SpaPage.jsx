// src/pages/SpaPage.jsx

import React from "react";
import styles from "../styles/SpaPage.module.css";

const services = [
  {
    name: "Aromatherapy Massage",
    duration: "60 mins",
    price: "₹4,500",
    description: "Relaxing massage using aromatic essential oils.",
    image:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Deep Tissue Massage",
    duration: "75 mins",
    price: "₹5,000",
    description: "Therapeutic massage targeting deeper muscle layers.",
    image:
      "https://images.unsplash.com/photo-1556228724-4b7e6d4d6d5b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Ayurvedic Therapy",
    duration: "90 mins",
    price: "₹5,500",
    description: "Traditional Ayurvedic healing treatment.",
    image:
      "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Facial Treatment",
    duration: "45 mins",
    price: "₹3,000",
    description: "Rejuvenating facial treatment for radiant skin.",
    image:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Couples Spa Package",
    duration: "90 mins",
    price: "₹9,000",
    description: "Relax together with our luxury couples spa experience.",
    image:
      "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Detox Therapy",
    duration: "60 mins",
    price: "₹4,000",
    description: "Body detox treatment for revitalizing energy.",
    image:
      "https://images.unsplash.com/photo-1519821172141-b5d8c0e40d64?auto=format&fit=crop&w=1200&q=80",
  },
];

const facilities = [
  { icon: "fa-hot-tub", name: "Steam Room" },
  { icon: "fa-fire", name: "Sauna" },
  { icon: "fa-spa", name: "Yoga Studio" },
  { icon: "fa-leaf", name: "Meditation Garden" },
];

const packages = [
  {
    name: "Relaxation Package",
    price: "₹6,500",
    description: "Aromatherapy massage + facial treatment.",
  },
  {
    name: "Wellness Retreat",
    price: "₹9,000",
    description: "Ayurvedic therapy + detox treatment.",
  },
  {
    name: "Couples Retreat",
    price: "₹12,500",
    description: "Couples massage + spa access + refreshments.",
  },
];

function SpaPage() {
  return (
    <div className={styles.spaPage}>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Explore Spa & Wellness</h1>
          <p>
            Rejuvenate your mind and body with our luxurious spa therapies.
          </p>
        </div>
      </section>

      {/* SERVICES */}
      <section className={styles.servicesSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Spa Services</h2>

          <div className={styles.servicesGrid}>
            {services.map((service, index) => (
              <div key={index} className={styles.serviceCard}>
                <img src={service.image} alt={service.name} />

                <div className={styles.serviceContent}>
                  <h3>{service.name}</h3>

                  <p className={styles.meta}>
                    <span>
                      <i className="fas fa-clock"></i> {service.duration}
                    </span>

                    <span>
                      <i className="fas fa-tag"></i> {service.price}
                    </span>
                  </p>

                  <p>{service.description}</p>

                  <button className={styles.bookBtn}>
                    Book Treatment
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FACILITIES */}
      <section className={styles.facilitiesSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Spa Facilities</h2>

          <div className={styles.facilitiesGrid}>
            {facilities.map((facility, index) => (
              <div key={index} className={styles.facilityCard}>
                <i className={`fas ${facility.icon}`}></i>
                <p>{facility.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PACKAGES */}
      <section className={styles.packagesSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Wellness Packages</h2>

          <div className={styles.packagesGrid}>
            {packages.map((pkg, index) => (
              <div key={index} className={styles.packageCard}>
                <h3>{pkg.name}</h3>

                <p className={styles.packagePrice}>{pkg.price}</p>

                <p>{pkg.description}</p>

                <button className={styles.bookBtn}>
                  Book Package
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default SpaPage;