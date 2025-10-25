import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, FreeMode, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import styles from "./ItemsInfo.module.scss";
import { getShopItemsRequest } from "../../api/api";
import CloseIcon from "@mui/icons-material/Close";
import { motion, AnimatePresence } from "framer-motion";

export default function ItemsInfo({
  shopWithItems,
  setShopWithItems,
  searchFilter,
  radius,
  userPosition,
}) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [page, setPage] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => setShopWithItems(null), 300);
  };

  useEffect(() => {
    const nearEnd = activeIndex >= products.length - 2;
    if (!nearEnd) return;

    const loadMore = async () => {
      const nextPage = page + 1;
      try {
        const data = await getShopItemsRequest(
          shopWithItems.shopId,
          searchFilter,
          radius,
          userPosition,
          nextPage
        );
        if (data.items && data.items.length > 0) {
          setShopWithItems((prev) => ({
            ...prev,
            items: [...prev.items, ...data.items],
          }));
          setPage(nextPage);
        }
      } catch (e) {
        console.error("Error during loading data:", e);
      }
    };

    loadMore();
  }, [activeIndex]);

  const products = shopWithItems.items;
  if (!products.length) return null;
  const activeProduct = products[activeIndex];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={styles.itemInfo}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <button className={styles.itemInfoCloseButton} onClick={handleClose}>
            <CloseIcon className={styles.itemInfoCloseIcon} />
          </button>

          <h2 className={styles.itemInfoShopName}>{shopWithItems.shopTitle}</h2>

          <Swiper
            loop={true}
            spaceBetween={10}
            navigation={true}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs]}
            className={styles.itemInfoSwiper}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          >
            {products.map((item, index) => (
              <SwiperSlide key={index}>
                <a
                  href={item.ref_item}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={item.img_url} alt={item.title} />
                </a>
              </SwiperSlide>
            ))}
          </Swiper>

          <Swiper
            onSwiper={setThumbsSwiper}
            loop={true}
            spaceBetween={10}
            slidesPerView={5}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className={styles.ItemInfoSwiper + "_thumbs"}
          >
            {products.map((item, index) => (
              <SwiperSlide key={index}>
                <img src={item.img_url} alt={item.title} />
              </SwiperSlide>
            ))}
          </Swiper>

          <div className={styles.itemInfoDetails}>
            <h4 className={styles.itemInfoDetailsTitle}>Details:</h4>

            <div className={styles.itemInfoDetailsRow}>
              <span>Preis:</span>
              <ul className={styles.itemInfoDetailsPrice}>
                <li>{`${activeProduct.price} €`}</li>
              </ul>
            </div>

            <div className={styles.itemInfoDetailsRow}>
              <span>Größe:</span>
              <ul className={styles.itemInfoDetailsSize}>
                {activeProduct.size.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>

            <div className={styles.itemInfoDetailsRow}>
              <span>Farbe:</span>
              <ul className={styles.itemInfoDetailsColor}>
                <li>{activeProduct.color}</li>
              </ul>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
