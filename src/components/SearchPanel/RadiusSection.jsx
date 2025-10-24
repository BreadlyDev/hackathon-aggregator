import React from "react";

import styles from "./SearchPanel.module.scss";

// in kilometers
const minRadius = 0;
const maxRadius = 200;

const RadiusSection = ({ value, onChange }) => {
  return (
    <div className={styles.columnSection}>
      <label className={styles.label}>Distance (radius): {value} km</label>
      <input
        className={`${styles.input} ${styles.range}`}
        type="range"
        min={minRadius}
        max={maxRadius}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default RadiusSection;
