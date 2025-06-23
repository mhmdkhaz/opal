import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "../../../../../../components/style/swiperSlide.css";

// import required modules
import { Pagination, Navigation } from "swiper/modules";
import { Box, Container, Typography } from "@mui/material";

// import the component
import CardProduct from "../../../../Shared/cardProduct/CardProduct";

// import the language
import { useGetLanguage } from "../../../../../../hooks/useGetLanguage";

// import data from services
import { useBaseSeller } from "../../../../../../services/product/useProducts";

function BestSeller({ title }) {
  const language = useGetLanguage(); // get language

  const { data, isLoading, isError, setPage, page, error, refetch } =
    useBaseSeller(language);

  console.log(data);

  // if is dent have data dent showed
  if (data?.data?.length === 0) {
    return <Box></Box>;
  }

  return (
    <Box sx={{ mt: 10 }}>
      <Container maxWidth="xl">
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ textAlign: "center", mb: 4 }}
        >
          {title}
        </Typography>
        <Swiper
          slidesPerView={4}
          spaceBetween={30}
          loop={true}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper"
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            600: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
        >
          {data?.data?.map((product, index) => (
            <SwiperSlide key={index} sx={{ width: "100%" }}>
              <CardProduct
                idProduct={product.id}
                title={product.name}
                description={product.description}
                price={product.price}
                discount={product.price_after_discount}
                img={product.images_url}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </Box>
  );
}

export default BestSeller;
