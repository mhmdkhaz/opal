import React from "react";
// start in MUI
import { Box, Grid, Typography, Button, Container } from "@mui/material";

// Import styles
import { Styles } from "./Hero.styles";

// start in assets img
import HeroImg from "../../../../../../assets/Home/Hero.png";
import Rectangle from "../../../../../../assets/Home/Rectangle.svg";

import { NavLink } from "react-router-dom";

// start in MUI icon
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useGetLanguage } from "../../../../../../hooks/useGetLanguage";
import { useTranslation } from "react-i18next";

const RamadanBanner = () => {
  const language = useGetLanguage();
  const styles = Styles(language);
  const { t } = useTranslation();

  return (
    <>
      <Grid container sx={styles.bannerContainer}>
        <Grid item xs={12} md={6}>
          <Box component="img" src={Rectangle} sx={styles.image} />
          <Box sx={styles.boxHero}>
            <Typography variant="h4" sx={styles.title}>
              {t("titleHero")}
            </Typography>
            <Typography sx={styles.description}>{t("dexHero")}</Typography>
            <NavLink to="/shop">
              <Button variant="contained" sx={styles.button}>
                <AddShoppingCartIcon /> {t("shopNow")}
              </Button>
            </NavLink>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src={HeroImg}
            sx={{ ...styles.imageHero, display: { xs: "none", md: "flex" } }}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default RamadanBanner;
