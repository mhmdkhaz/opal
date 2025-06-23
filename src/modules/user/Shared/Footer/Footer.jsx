import React from "react";
// start in MUI
import {
  Box,
  Typography,
  Grid,
  Link,
  Container,
  IconButton,
  useMediaQuery,
} from "@mui/material";

// import style
import { Styles } from "./Footer.styles";

// import icon
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";

// import assets image
import Logo from "../../../../assets/logoFooter.png";

// import language
import { useTranslation } from "react-i18next";
import useGetLanguage from "../../../../hooks/useGetLanguage";

const Footer = () => {
  const language = useGetLanguage(); // get language
  const styles = Styles(language); // the style pages
  const { t } = useTranslation(); // world translate
  const isMobile = useMediaQuery("(max-width:600px)"); // in mobile

  return (
    <Box sx={styles.container}>
      <Container maxWidth="xl">
        <Grid container rowSpacing={isMobile ? 4 : 0} justifyContent="center">
          {/* Address */}
          <Grid item xs={12} sm={6} md={3}>
            <Box component="img" src={Logo} />
            <Typography sx={styles.text}>{t("descFooter")}</Typography>
          </Grid>

          {/* Links */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography sx={styles.sectionTitle}>{t("mainPage")}</Typography>
            <Link href="/" sx={styles.link}>
              {t("Home")}
            </Link>
            <Link href="/shop" sx={styles.link}>
              {t("store")}
            </Link>
          </Grid>

          {/* Help */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography sx={styles.sectionTitle}>
              {t("PaymentMethod")}
            </Typography>
            <Typography sx={{ ...styles.payment, color: "white" }}>
              {t("cash")}
            </Typography>
            <Typography sx={styles.payment}>{t("mtn")}</Typography>
            <Typography sx={styles.payment}>{t("syr")}</Typography>
            <Typography sx={styles.payment}>{t("bank")}</Typography>
          </Grid>

          {/* language */}
          {/* <Grid item xs={12} sm={6} md={3}>
              <Typography sx={styles.sectionTitle}> {t("lang")}</Typography>
              <Link href="#" sx={styles.link}>
                عربي
              </Link>
              <Link href="#" sx={styles.link}>
                English
              </Link>
            </Grid> */}

          {/* Social Media */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography sx={styles.sectionTitle}>{t("socialMedia")}</Typography>
            <Box sx={styles.icons}>
              <Link
                href="https://www.instagram.com/opal.sy?igsh=MWg5d3VmMWllNnFvYg=="
                target="_blank"
              >
                <IconButton sx={styles.icon}>
                  <InstagramIcon />
                </IconButton>
              </Link>
              <Link
                href="https://www.facebook.com/share/1DWPtmD4WW/"
                target="_blank"
              >
                <IconButton sx={styles.icon}>
                  <FacebookIcon />
                </IconButton>
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
