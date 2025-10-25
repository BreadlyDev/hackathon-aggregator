import React, { useState } from "react";
import { motion } from "framer-motion";
import styles from "./SearchPanel.module.scss";

import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

import SearchSection from "./SearchSection";
import PriceSection from "./PriceSection";
import TextSection from "./TextSection";
import GenderSection from "./GenderSection";
import RadiusSection from "./RadiusSection";

import { getGoods } from "../../api/api";

export default function SearchPanel({ radius, setRadius, userPosition }) {
  const [isOpen, setIsOpen] = useState(true);
  const [searchFilter, setSearchFilter] = useState({
    title: "",
    minPrice: "",
    maxPrice: "",
    size: "",
    color: "",
    gender: "",
    shop: "",
  });

  const GENDERS = {
    male: 1,
    female: 0,
    diverse: 3,
  };

  const mapGetGoodsRequestParams = (searchFilter, radius, userPosition) => {
    if (!userPosition || userPosition.length < 2) {
      throw new Error("User position is required");
    }

    return {
      title: searchFilter.title || undefined,
      priceFrom: searchFilter.minPrice
        ? Number(searchFilter.minPrice)
        : undefined,
      priceTo: searchFilter.maxPrice
        ? Number(searchFilter.maxPrice)
        : undefined,
      size: searchFilter.size || undefined,
      color: searchFilter.color || undefined,
      sex: searchFilter.gender ? GENDERS[searchFilter.gender] : undefined,
      userLat: userPosition[0],
      userLon: userPosition[1],
      radius: radius ?? undefined,
    };
  };

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      try {
        const data = await getGoods(
          mapGetGoodsRequestParams(searchFilter, radius, userPosition)
        );
        console.log(data);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleClick = async () => {
    try {
      const data = await getGoods(
        mapGetGoodsRequestParams(searchFilter, radius, userPosition)
      );
      console.log(data);
    } catch (err) {
      console.error(err);
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

        <SearchSection
          value={searchFilter.title}
          onChange={(e) =>
            setSearchFilter({ ...searchFilter, title: e.target.value })
          }
          handleSearch={handleKeyDown}
          onClick={handleClick}
        />

        <PriceSection
          minPrice={searchFilter.minPrice}
          maxPrice={searchFilter.maxPrice}
          onChangeMinPrice={(e) =>
            setSearchFilter({ ...searchFilter, minPrice: e.target.value })
          }
          onChangeMaxPrice={(e) =>
            setSearchFilter({ ...searchFilter, maxPrice: e.target.value })
          }
        />

        <TextSection
          label="size"
          placeholder="M, L"
          value={searchFilter.size}
          onChange={(e) =>
            setSearchFilter({ ...searchFilter, size: e.target.value })
          }
        />

        <TextSection
          label="color"
          placeholder="red, blue"
          value={searchFilter.color}
          onChange={(e) =>
            setSearchFilter({ ...searchFilter, color: e.target.value })
          }
        />

        <GenderSection
          label="gender"
          placeholder="man, woman, diverse"
          value={searchFilter.gender}
          onChange={(e) =>
            setSearchFilter({ ...searchFilter, gender: e.target.value })
          }
        />

        <TextSection
          label="shop"
          placeholder="H&M, Zalando, Zara"
          value={searchFilter.shop}
          onChange={(e) =>
            setSearchFilter({ ...searchFilter, shop: e.target.value })
          }
        />

        <RadiusSection
          value={radius}
          onChange={(e) => setRadius(e.target.value)}
        />
      </motion.aside>
    </div>
  );
}
