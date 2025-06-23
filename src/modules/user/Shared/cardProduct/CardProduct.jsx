import React from "react";

// start in style
import { Styles } from "./CardProduct.styles";

// star in MUI
import { Box, Card, Typography } from "@mui/material";

// start to get language
import useGetLanguage from "../../../../hooks/useGetLanguage";

// from zustand to set id
import { useSetId } from "../../../../store/useSetIdProduct";

// import react router dom
import { useNavigate } from "react-router-dom";

// Import Lazy Load Image Component
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import { useTranslation } from "react-i18next";

function CardProduct({ idProduct, title, description, price, discount, img }) {
  const language = useGetLanguage();
  const styles = Styles(language);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { addId } = useSetId(); // to set id to single product

  // calculate Discount
  function calculateDiscount(oldPrice, discountPrice) {
    if (oldPrice <= 0 || price < 0 || discountPrice > oldPrice) {
      return "البيانات غير صحيحة";
    }
    const discount = ((oldPrice - discountPrice) / oldPrice) * 100;
    return `${discount.toFixed(0)}%`;
  }

  // set id after click card
  const handleCart = () => {
    addId(idProduct);
    navigate("/product");
    window.scrollTo({ top: 0 });
  };

  return (
    <>
      <Card onClick={() => handleCart()} sx={styles.card}>
        <Box sx={styles.imageWrapper}>
          {/* Lazy Loading Image with Blur Effect */}
          <LazyLoadImage
            src={img[0] || ""}
            alt={title}
            width="100%"
            height="100%"
            effect="blur"
            style={{ objectFit: "fill" }}
          />
          {discount ? (
            <Box sx={styles.discountBadge}>
              {calculateDiscount(price, discount)}
            </Box>
          ) : (
            ""
          )}
        </Box>
        <Box sx={styles.cardBody}>
          <Typography sx={styles.title}>{title}</Typography>
          {/* <Typography sx={styles.desc}>{description}</Typography> */}
          <Typography sx={{ ...styles.price }}>
            {price}
            {t("syp")}
            {discount ? (
              <Typography component="span" sx={styles.oldPrice}>
                {discount}
                {t("syp")}
              </Typography>
            ) : (
              ""
            )}
          </Typography>
        </Box>
      </Card>
    </>
  );
}

export default CardProduct;
