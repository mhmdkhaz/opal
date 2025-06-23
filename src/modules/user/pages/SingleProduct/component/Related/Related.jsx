import React from "react";

// MUI
import { Typography, Grid, Box, Container } from "@mui/material";

// import style
import { Styles } from "./Related.styles";

// component shared
import CardProduct from "../../../../Shared/cardProduct/CardProduct";

// for the translation
import { useTranslation } from "react-i18next";

function Related({ data }) {
  const { t } = useTranslation();

  if (data?.data?.related_products.length === 0) {
    return <Box></Box>;
  }

  return (
    <Box sx={Styles.root}>
      <Container maxWidth="xl">
        <Typography variant="h4" sx={Styles.title}>
          {t("relatedProducts")}
        </Typography>

        <Grid container spacing={3} sx={{ mt: 2 }}>
          {data?.data?.related_products?.slice(0, 3).map((product, index) => (
            <Grid key={index} item xs={12} sm={6} md={4} lg={4} xl={3}>
              <CardProduct
                img={product.images_url}
                title={product.title}
                description={product.description}
                price={product.price}
                oldPrice={product.oldPrice}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default Related;
