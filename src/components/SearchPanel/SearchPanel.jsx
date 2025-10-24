import React, { useState } from "react";
import styles from "./SearchPanel.module.scss";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchPanel() {
  const [search, setSearch] = useState("");

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [gender, setGender] = useState("");

  const [distance, setDistance] = useState(10);

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      console.log("Search:", search);
      console.log("Price:", minPrice, "-", maxPrice);
      console.log("Size:", size);
      console.log("Color:", color);
      console.log("Gender:", gender);
      console.log("Distance:", distance, "km");
    }
  };

  const allowedKeys = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"];

  const validateNumber = (e) => {
    if (!/[0-9]/.test(e.key) && !allowedKeys.includes(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <aside className={styles.container}>
      <div className={styles.section}>
        <input
          className={styles.input}
          type="text"
          placeholder="Search for goods"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleSearchKeyDown}
        />
        <button className={styles.searchButton}>
          <SearchIcon />
        </button>
      </div>

      <div className={styles.columnSection}>
        <label className={styles.label}>Price (min - max):</label>
        <div className={styles.section}>
          <input
            className={styles.input}
            type="number"
            placeholder="min"
            value={minPrice}
            onKeyDown={validateNumber}
            onChange={(e) => {
              setMinPrice(e.target.value);
            }}
          />
          <input
            className={styles.input}
            type="number"
            placeholder="max"
            value={maxPrice}
            onKeyDown={validateNumber}
            onChange={(e) => {
              const value = Number(e.target.value);
              setMaxPrice(value < 0 ? null : value);
            }}
          />
        </div>
      </div>

      <div className={styles.columnSection}>
        <label className={styles.label}>Size:</label>
        <input
          className={styles.input}
          type="text"
          placeholder="For example: M, L"
          value={size}
          onChange={(e) => setSize(e.target.value)}
        />
      </div>

      <div className={styles.columnSection}>
        <label className={styles.label}>Color:</label>
        <input
          className={styles.input}
          type="text"
          placeholder="For example: red, blue"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
      </div>

      <div className={styles.columnSection}>
        <label className={styles.label}>Gender:</label>
        <input
          className={styles.input}
          type="text"
          placeholder="For example: male, female, diverse"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        />
      </div>

      <div className={styles.columnSection}>
        <label>Distance: {distance} km</label>
        <input
          className={`${styles.input} ${styles.range}`}
          type="range"
          min={0}
          max={50}
          value={distance}
          onChange={(e) => setDistance(Number(e.target.value))}
        />
      </div>
    </aside>
  );
}
