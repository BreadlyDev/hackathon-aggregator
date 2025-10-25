import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, FreeMode, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import styles from "./ItemsInfo.module.scss";
import { getShopItemsRequest } from "../../api/api";

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

  useEffect(() => {
    const nearEnd = activeIndex >= products.length - 2;

    if (!nearEnd) {
      return;
    }

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
        console.error("Ошибка при подгрузке:", e);
      }
    };

    loadMore();
  }, [activeIndex]);

  const products = shopWithItems.items;
  if (!products.length) {
    return null;
  }

  const activeProduct = products[activeIndex];

  return (
    <div className={styles.itemsInfo}>
      <h2 className={styles.itemsInfoShopName}>{shopWithItems.shopTitle}</h2>

      <Swiper
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className={styles.ItemInfoSwiper}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      >
        {products.map((item, index) => (
          <SwiperSlide key={index}>
            <a href={item.ref_item} target="_blank" rel="noopener noreferrer">
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

      <div className={styles.itemsInfoDetails}>
        <h4 className={styles.itemsInfoDetailsTitle}>Details:</h4>

        <div className={styles.itemsInfoDetailsRow}>
          <span>Price:</span>
          <ul className={styles.itemsInfoDetailsColor}>
            <li>{`${activeProduct.price} €`}</li>
          </ul>
        </div>

        <div className={styles.itemsInfoDetailsRow}>
          <span>Size:</span>
          <ul className={styles.itemsInfoDetailsSize}>
            {activeProduct.size.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>

        <div className={styles.itemsInfoDetailsRow}>
          <span>Color:</span>
          <ul className={styles.itemsInfoDetailsColor}>
            <li>{activeProduct.color}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
