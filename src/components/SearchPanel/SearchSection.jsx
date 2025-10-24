import React from "react";
import styles from "./SearchPanel.module.scss";
import SearchIcon from "@mui/icons-material/Search";

const SearchSection = ({ value, onChange, handleSearch, onClick }) => {
  return (
    <div className={styles.section}>
      <input
        className={styles.input}
        type="text"
        placeholder="Search for goods"
        value={value}
        onKeyDown={handleSearch}
        onChange={onChange}
      />
      <button
        className={`${styles.button} ${styles.searchButton}`}
        onClick={onClick}
      >
        <SearchIcon />
      </button>
    </div>
  );
};

export default SearchSection;
