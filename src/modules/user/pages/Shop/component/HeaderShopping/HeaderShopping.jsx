import { Box, Grid, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import TuneIcon from "@mui/icons-material/Tune";
import React from "react";
import { useTranslation } from "react-i18next";

function HeaderShopping({ setDrawerOpen }) {
  const { t } = useTranslation();

  return (
    <Box sx={{ mb: 2, background: "#fff", p: 2, position: "relative" }}>
      <Grid container justifyContent="start" alignItems="center">
        <Grid item md={6}>
          <Typography sx={{ fontSize: "18px", fontWeight: 500 }}></Typography>
        </Grid>
        <Grid item md={6} sx={{ textAlign: "right" }}>
          {/* زر لفتح Drawer عند الشاشات الصغيرة */}
          <IconButton
            sx={{
              display: { xs: "flex", md: "none" }, // يظهر فقط في الشاشات الصغيرة
              gap: 1,
              alignItems: "center",
              justifyContent: "center",
              background: "transparent",
            }}
            onClick={() => setDrawerOpen(true)}
          >
            <TuneIcon /> {t("filter")}
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
}

export default HeaderShopping;
