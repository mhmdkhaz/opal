import React, { useRef, useState } from "react";

// import MUI
import { Box, Container } from "@mui/material";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./styles.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

// import get data
import { useGetSlidersOfferClient } from "../../../../../../services/sliderOffer/useSliderOffer";

function SaleSlider() {
  const { data, isLoading, isError, error, refetch } =
    useGetSlidersOfferClient();

  console.log(data);

  return (
    <>
      <Box
        sx={{ mt: 8, borderRadius: "10px", height: "600px", direction: "ltr" }}
      >
        {/* <Container maxWidth="xl"> */}
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          {data?.map((slide, index) => (
            <SwiperSlide key={index}>
              <Box component="img" src={slide.image} />
            </SwiperSlide>
          ))}
        </Swiper>
        {/* </Container> */}
      </Box>
    </>
  );
}

export default SaleSlider;

// SaleSlider
