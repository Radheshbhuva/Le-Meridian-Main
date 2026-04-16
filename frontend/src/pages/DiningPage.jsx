// src/pages/DiningPage.jsx

import React from "react";
import styles from "../styles/DiningPage.module.css";

const restaurants = [
  {
    name: "Via Milano",
    cuisine: "Italian Cuisine",
    hours: "12:00 PM – 11:00 PM",
    description:
      "Experience authentic Italian flavors crafted with fresh ingredients and traditional recipes.",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Gujarat Spice",
    cuisine: "Gujarati Fine Dining",
    hours: "7:00 AM – 10:30 PM",
    description:
      "Enjoy the rich flavors of Gujarat with traditional recipes prepared by expert chefs.",
    image:
      "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Latitude Café",
    cuisine: "International Buffet",
    hours: "6:30 AM – 10:30 PM",
    description:
      "A vibrant café offering a global buffet with fresh, seasonal ingredients.",
    image:
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Sky Lounge",
    cuisine: "Rooftop Bar",
    hours: "5:00 PM – 1:00 AM",
    description:
      "Enjoy handcrafted cocktails and panoramic city views at our luxurious rooftop lounge.",
    image:
      "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=80",
  },
];

function DiningPage() {
  return (
    <div className={styles.diningPage}>
      {/* HERO SECTION */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Dining Experiences</h1>
          <p>
            Discover exquisite flavors and curated culinary journeys at
            Le Méridien Ahmedabad.
          </p>
        </div>
      </section>

      {/* RESTAURANTS SECTION */}
      <section className={styles.restaurantsSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Our Restaurants</h2>

          <div className={styles.restaurantGrid}>
            {restaurants.map((restaurant, index) => (
              <div key={index} className={styles.restaurantCard}>
                <img src={restaurant.image} alt={restaurant.name} />

                <div className={styles.restaurantContent}>
                  <h3>{restaurant.name}</h3>
                  <p className={styles.cuisine}>{restaurant.cuisine}</p>

                  <p className={styles.hours}>
                    <i className="fas fa-clock"></i> {restaurant.hours}
                  </p>

                  <p>{restaurant.description}</p>

                  <button className={styles.menuBtn}>
                    View Menu
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CHEF SECTION */}
      <section className={styles.chefSection}>
        <div className={styles.container}>
          <div className={styles.chefGrid}>
            <img
              src="https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=800&q=80"
              alt="Executive Chef"
            />

            <div className={styles.chefContent}>
              <h2>Meet Our Executive Chef</h2>

              <p className={styles.chefQuote}>
                “Cooking is an art that blends culture, passion, and creativity.
                At Le Méridien Ahmedabad, every dish tells a story.”
              </p>

              <p>
                Our executive chef combines international culinary techniques
                with local flavors to create unforgettable dining experiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* DINING EXPERIENCE SECTION */}
      <section className={styles.experienceSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Dining Experiences</h2>

          <div className={styles.experienceGrid}>
            <div className={styles.expCard}>
              <i className="fas fa-fire"></i>
              <h3>Live Cooking Stations</h3>
              <p>
                Enjoy interactive dining with chefs preparing dishes right
                before your eyes.
              </p>
            </div>

            <div className={styles.expCard}>
              <i className="fas fa-utensils"></i>
              <h3>Private Dining</h3>
              <p>
                Host intimate dinners and celebrations in our exclusive
                private dining spaces.
              </p>
            </div>

            <div className={styles.expCard}>
              <i className="fas fa-wine-glass-alt"></i>
              <h3>Wine Collection</h3>
              <p>
                Discover an exceptional selection of international wines
                curated by our sommeliers.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default DiningPage;