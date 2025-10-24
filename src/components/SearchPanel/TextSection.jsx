import React from "react";

import styles from "./SearchPanel.module.scss";

function capitalize(val) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

const TextSection = ({ label, placeholder, value, onChange }) => {
  return (
    <div className={styles.columnSection}>
      <label className={styles.label}>{`${capitalize(label)}:`}</label>
      <input
        className={styles.input}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default TextSection;
