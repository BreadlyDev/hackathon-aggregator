import React, { useState } from "react";
import { motion } from "framer-motion";
import styles from "./SearchPanel.module.scss";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

export default function SearchPanel() {
  const [isOpen, setIsOpen] = useState(true);

  const [searchFilter, setSearchFilter] = useState({
    search: "",
    minPrice: "",
    maxPrice: "",
    size: "",
    color: "",
    gender: "",
    shop: "",
    distance: 10,
  });

  const allowedKeys = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"];
  const validateNumber = (e) => {
    if (!/[0-9]/.test(e.key) && !allowedKeys.includes(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <div className={styles.wrapper}>
      <motion.aside
        className={styles.container}
        animate={{ x: isOpen ? 0 : "-105%" }}
        transition={{ type: "spring", stiffness: 90, damping: 18 }}
      >
        <button
          className={`${styles.button} ${styles.toggleButton}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <KeyboardArrowLeftIcon /> : <KeyboardArrowRightIcon />}
        </button>

        <div className={styles.section}>
          <input
            className={styles.input}
            type="text"
            placeholder="Search for goods"
            value={searchFilter.search}
            onChange={(e) =>
              setSearchFilter({ ...searchFilter, search: e.target.value })
            }
          />
          <button className={`${styles.button} ${styles.searchButton}`}>
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
              value={searchFilter.minPrice}
              onKeyDown={validateNumber}
              onChange={(e) =>
                setSearchFilter({ ...searchFilter, minPrice: e.target.value })
              }
            />
            <input
              className={styles.input}
              type="number"
              placeholder="max"
              value={searchFilter.maxPrice}
              onKeyDown={validateNumber}
              onChange={(e) =>
                setSearchFilter({ ...searchFilter, maxPrice: e.target.value })
              }
            />
          </div>
        </div>

        <div className={styles.columnSection}>
          <label className={styles.label}>Size:</label>
          <input
            className={styles.input}
            type="text"
            placeholder="M, L"
            value={searchFilter.size}
            onChange={(e) =>
              setSearchFilter({ ...searchFilter, size: e.target.value })
            }
          />
        </div>

        <div className={styles.columnSection}>
          <label className={styles.label}>Color:</label>
          <input
            className={styles.input}
            type="text"
            placeholder="red, blue"
            value={searchFilter.color}
            onChange={(e) =>
              setSearchFilter({ ...searchFilter, color: e.target.value })
            }
          />
        </div>

        <div className={styles.columnSection}>
          <label className={styles.label}>Gender:</label>
          <input
            className={styles.input}
            type="text"
            placeholder="male, female, diverse"
            value={searchFilter.gender}
            onChange={(e) =>
              setSearchFilter({ ...searchFilter, gender: e.target.value })
            }
          />
        </div>

        <div className={styles.columnSection}>
          <label>Distance: {searchFilter.distance} km</label>
          <input
            className={`${styles.input} ${styles.range}`}
            type="range"
            min={0}
            max={50}
            value={searchFilter.distance}
            onChange={(e) =>
              setSearchFilter({ ...searchFilter, distance: e.target.value })
            }
          />
        </div>
      </motion.aside>
    </div>
  );
}
