import React, { useState } from "react";
import ShopHero from "../component/ShopHero/ShopHero";
import {
  Box,
  Container,
  Grid,
  Drawer,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import FilterSidebar from "../component/Filter/FilterSidebar";
import ShopingProduct from "../component/ShopingProduct/ShopingProduct";
import HeaderShopping from "../component/HeaderShopping/HeaderShopping";
// import { useGetAllProduct } from "../../../../../services/productShopping/productShopping.service";
import { useGetLanguage } from "../../../../../hooks/useGetLanguage";
import { useGetAllProduct } from "../../../../../services/product/useProducts";

function ShopIndex() {
  const language = useGetLanguage();
  const { data, isLoading, setPage, page, refetch } =
    useGetAllProduct(language);

  console.log(language);

  // console.log(data.data);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  // إعادة تحميل FilterSidebar عند فتح Drawer لأول مرة
  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  return (
    <Box sx={{ mb: 1, height: "100%", position: "relative" }}>
      <ShopHero />

      <Grid container sx={{ height: "100%", position: "relative" }}>
        {/* Drawer للشاشات الصغيرة */}
        <Drawer
          anchor={language === "en" ? "left" : "right"}
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        >
          <Box sx={{ width: 330 }}>
            <FilterSidebar
              data={data}
              refetch={refetch}
              setDrawerOpen={setDrawerOpen}
            />
          </Box>
        </Drawer>

        {/* Filter Sidebar (يظهر فقط في الشاشات الكبيرة) */}
        <Grid
          item
          xs={12}
          md={2}
          sx={{
            display: { xs: "none", md: "block" },
            position: "sticky",
            top: "0px",
            height: "100vh",
            paddingBottom: "20px",
          }}
        >
          <FilterSidebar data={data} refetch={refetch} />
        </Grid>

        <Grid item xs={12} md={10}>
          {isSmallScreen && <HeaderShopping setDrawerOpen={handleDrawerOpen} />}
          <Container maxWidth="xl">
            <ShopingProduct
              data={data}
              isLoading={isLoading}
              refetch={refetch}
              setPage={setPage}
              page={page}
            />
          </Container>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ShopIndex;
