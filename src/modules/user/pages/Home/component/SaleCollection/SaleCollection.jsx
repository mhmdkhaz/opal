import React from "react";
import { Box, Card, Typography, Grid, Container, Button } from "@mui/material";
import { Styles } from "./SaleCollection.styles";
import CardProduct from "../../../../Shared/cardProduct/CardProduct";
import { useTranslation } from "react-i18next";
import { useGetLanguage } from "../../../../../../hooks/useGetLanguage";
import { useHasDiscount } from "../../../../../../services/product/useProducts";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "../../../../../../components/style/swiperSlide.css";

import { Pagination, Navigation } from "swiper/modules";

const SaleCollection = ({ title }) => {
  const { t } = useTranslation();
  const language = useGetLanguage(); // get language

  const { data, isLoading, isError, setPage, page, error, refetch } =
    useHasDiscount(language);

  // if is dent have data dent showed
  if (data?.data?.length === 0) {
    return <Box></Box>;
  }

  return (
    <Box sx={Styles.root}>
      <Container maxWidth="xl">
        <Box>
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
          {/* <Button sx={Styles.showMore}>{t("showMore")}</Button> */}
        </Box>
      </Container>
    </Box>
  );
};

export default SaleCollection;
