import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { Box, Typography, Button, Container } from "@mui/material";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Styles } from "./CollectionImgSlide.styles";
import collection_1 from "../../../../../../assets/Home/collection/collection_1.jpeg";
import collection_2 from "../../../../../../assets/Home/collection/collection_1.jpeg";
import collection_3 from "../../../../../../assets/Home/collection/collection_1.jpeg";

const slides = [
  {
    id: 1,
    title: "Lorem Ipsum",
    description:
      "Our designer already made a lot of beautiful prototypes of rooms that inspire you",
    img: collection_1,
  },
  {
    id: 2,
    title: "Lorem Ipsum",
    description:
      "Explore our latest collection with elegant and stylish designs.",
    img: collection_2,
  },
  {
    id: 3,
    title: "Lorem Ipsum",
    description:
      "Find the perfect outfit for any occasion with our new arrivals.",
    img: collection_3,
  },
  {
    id: 3,
    title: "Lorem Ipsum",
    description:
      "Find the perfect outfit for any occasion with our new arrivals.",
    img: collection_3,
  },
];

const CollectionImgSlide = () => {
  return (
    <Box sx={Styles.root}>
      <Container maxWidth="xl">
        <Box sx={Styles.container}>
          <Box sx={Styles.textBox}>
            <Typography variant="h4" fontWeight="bold">
              LOREM IPUSEM
            </Typography>
            <Typography sx={Styles.description}>
              Our designer already made a lot of beautiful prototype of rooms
              that inspire you
            </Typography>
            <Button variant="contained" sx={Styles.button}>
              Explore More
            </Button>
          </Box>

          <Swiper
            modules={[Navigation, Pagination]}
            slidesPerView={3}
            spaceBetween={10}
            navigation
            pagination={{ clickable: true }}
            // breakpoints={{
            //   640: { slidesPerView: 1 },
            //   1024: { slidesPerView: 2 },
            // }}
          >
            {slides.map((slide) => (
              <SwiperSlide key={slide.id}>
                <Box sx={Styles.slide}>
                  <img src={slide.img} alt={slide.title} style={Styles.image} />
                  <Box sx={Styles.overlay}>
                    <Button variant="contained" sx={Styles.arrowButton}>
                      →
                    </Button>
                  </Box>
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      </Container>
    </Box>
  );
};

export default CollectionImgSlide;
