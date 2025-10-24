import React from "react";

import styles from "./SearchPanel.module.scss";

const GenderSection = ({ value, onChange }) => {
  return (
    <div className={styles.columnSection}>
      <label className={styles.label} htmlFor="selectGender">
        Gender:
      </label>
      <select
        id="selectGender"
        name="gender"
        className={styles.input}
        value={value}
        onChange={onChange}
      >
        <option value="" disabled>
          select gender
        </option>
        <option value="male">male</option>
        <option value="female">female</option>
        <option value="diverse">diverse</option>
      </select>
    </div>
  );
};

export default GenderSection;
