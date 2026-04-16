// src/pages/GalleryPage.jsx

import React, { useState } from "react";
import styles from "../styles/GalleryPage.module.css";

const galleryImages = [
  { src: "https://images.unsplash.com/photo-1611892440504-42a792e24d32", category: "Rooms" },
  { src: "https://images.unsplash.com/photo-1590490360182-c33d57733427", category: "Rooms" },
  { src: "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d", category: "Rooms" },
  { src: "https://images.unsplash.com/photo-1582582621959-48d27397dc69", category: "Rooms" },

  { src: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c", category: "Dining" },
  { src: "https://images.unsplash.com/photo-1552566626-52f8b828add9", category: "Dining" },
  { src: "https://images.unsplash.com/photo-1600891964092-4316c288032e", category: "Dining" },
  { src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4", category: "Dining" },

  { src: "https://images.unsplash.com/photo-1540555700478-4be289fbecef", category: "Spa" },
  { src: "https://images.unsplash.com/photo-1519821172141-b5d8c0e40d64", category: "Spa" },
  { src: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881", category: "Spa" },
  { src: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2", category: "Spa" },

  { src: "https://images.unsplash.com/photo-1505236858219-8359eb29e329", category: "Events" },
  { src: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3", category: "Events" },
  { src: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3", category: "Events" },
  { src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed", category: "Events" },

  { src: "https://images.unsplash.com/photo-1566073771259-6a8506099945", category: "Hotel Exterior" },
  { src: "https://images.unsplash.com/photo-1501117716987-c8e1ecb21063", category: "Hotel Exterior" },
  { src: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85", category: "Hotel Exterior" },
  { src: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267", category: "Hotel Exterior" },
];

const filters = ["All", "Rooms", "Dining", "Spa", "Events"];

function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedImage, setSelectedImage] = useState(null);

  const filteredImages =
    activeFilter === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeFilter);

  return (
    <div className={styles.galleryPage}>
      {/* HERO */}
      <section className={styles.hero}>
        <h1>Hotel Gallery</h1>
        <p>Discover the elegance of Le Méridien Ahmedabad</p>
      </section>

      {/* FILTER BUTTONS */}
      <div className={styles.filters}>
        {filters.map((filter, index) => (
          <button
            key={index}
            className={activeFilter === filter ? styles.active : ""}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* IMAGE GRID */}
      <div className={styles.galleryGrid}>
        {filteredImages.map((image, index) => (
          <div
            key={index}
            className={styles.galleryItem}
            onClick={() => setSelectedImage(image.src)}
          >
            <img
              src={`${image.src}?auto=format&fit=crop&w=800&q=80`}
              alt=""
            />
          </div>
        ))}
      </div>

      {/* LIGHTBOX */}
      {selectedImage && (
        <div
          className={styles.lightbox}
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={`${selectedImage}?auto=format&fit=crop&w=1200&q=80`}
            alt=""
          />
        </div>
      )}
    </div>
  );
}

export default GalleryPage;