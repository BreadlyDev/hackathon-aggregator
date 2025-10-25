import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, FreeMode, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import classes from "./ItemsInfo.module.scss";

export default function ItemsInfo({ shopWithItems }) {
  const products = shopWithItems.items;
  if (!products.length) {
    return null;
  }

  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const activeProduct = products[activeIndex];

  return (
    <div className={classes.ItemsInfo}>
      <h2 className={classes.ItemsInfo__ShopName}>{shopWithItems.shopTitle}</h2>

      <Swiper
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className={classes.ItemInfoSwiper}
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
        className={classes.ItemInfoSwiper + "_thumbs"}
      >
        {products.map((item, index) => (
          <SwiperSlide key={index}>
            <img src={item.img_url} alt={item.title} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className={classes.ItemsInfo__Details}>
        <h4 className={classes.ItemsInfo__Details__Title}>Details:</h4>

        <div className={classes.ItemsInfo__Details_Row}>
          <span>Price:</span>
          <ul className={classes.ItemsInfo__Details_Color}>
            <li>{`${activeProduct.price} €`}</li>
          </ul>
        </div>

        <div className={classes.ItemsInfo__Details_Row}>
          <span>Size:</span>
          <ul className={classes.ItemsInfo__Details_Size}>
            {activeProduct.size.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>

        <div className={classes.ItemsInfo__Details_Row}>
          <span>Color:</span>
          <ul className={classes.ItemsInfo__Details_Color}>
            <li>{activeProduct.color}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
