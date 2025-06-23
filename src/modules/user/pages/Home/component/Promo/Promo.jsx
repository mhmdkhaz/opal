import React from "react";
// start in MUI
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Container,
  Box,
} from "@mui/material";
// import style
import { Styles } from "./Promo.styles";
// import translate
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

const CustomCards = () => {
  const { t } = useTranslation();

  return (
    <Box sx={Styles.root}>
      <Container maxWidth="xl">
        <Grid container spacing={2} justifyContent="center" sx={Styles.grid}>
          {/* First Card */}
          <Grid item xs={12} sm={6}>
            <Card sx={{ ...Styles.card, ...Styles.firstCard }}>
              <CardContent sx={Styles.content}>
                <Typography variant="h6" sx={Styles.title} gutterBottom>
                  {t("promo.titleOne")}
                </Typography>
                <Typography
                  variant="body2"
                  sx={Styles.description}
                  gutterBottom
                >
                  {t("promo.descOne")}
                </Typography>
                <NavLink
                  to="/shop"
                  onClick={() => {
                    window.scrollTo(0, 0);
                  }}
                >
                  <Button
                    variant="contained"
                    sx={{ ...Styles.button, ...Styles.firstButton }}
                  >
                    {t("shopNow")}
                  </Button>
                </NavLink>
              </CardContent>
            </Card>
          </Grid>

          {/* Second Card */}
          <Grid item xs={12} sm={6}>
            <Card sx={{ ...Styles.card, ...Styles.secondCard }}>
              <CardContent sx={Styles.content}>
                <Typography variant="h6" sx={Styles.title} gutterBottom>
                  {t("promo.titleTow")}
                </Typography>
                <Typography
                  variant="body2"
                  sx={Styles.description}
                  gutterBottom
                >
                  {t("promo.descTow")}
                </Typography>
                <NavLink
                  to="/shop"
                  onClick={() => {
                    window.scrollTo(0, 0);
                  }}
                >
                  <Button
                    variant="contained"
                    sx={{ ...Styles.button, ...Styles.secondButton }}
                  >
                    {t("shopNow")}
                  </Button>
                </NavLink>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CustomCards;
