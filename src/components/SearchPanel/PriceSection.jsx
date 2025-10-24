import React from "react";
import styles from "./SearchPanel.module.scss";

const allowedKeys = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"];

const validateNumber = (e) => {
  if (!/[0-9]/.test(e.key) && !allowedKeys.includes(e.key)) {
    e.preventDefault();
  }
};

const PriceSection = ({
  minPrice,
  maxPrice,
  onChangeMinPrice,
  onChangeMaxPrice,
}) => {
  return (
    <div className={styles.columnSection}>
      <label className={styles.label}>Price (min - max):</label>
      <div className={styles.section}>
        <div className={styles.priceInput}>
          <input
            className={`${styles.input}`}
            type="number"
            placeholder="min"
            value={minPrice}
            onKeyDown={validateNumber}
            onChange={onChangeMinPrice}
          />
        </div>
        <div className={styles.priceInput}>
          <input
            className={styles.input}
            type="number"
            placeholder="max"
            value={maxPrice}
            onKeyDown={validateNumber}
            onChange={onChangeMaxPrice}
          />
        </div>
      </div>
    </div>
  );
};

export default PriceSection;
