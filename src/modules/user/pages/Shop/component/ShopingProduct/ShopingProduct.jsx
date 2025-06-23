import React, { useEffect } from "react";

// start in MUI
import {
  Box,
  Grid,
  Pagination,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

// import icon MUI
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

// import component
import CardProduct from "../../../../Shared/cardProduct/CardProduct";
import LoadingPage from "../../../../../../components/shared/loadingPage/loadingPage";
import PaginationComponent from "../PaginationComponent/PaginationComponent";

// start in assets
import loadingVideo from "../../../../../../assets/shopLoading.gif";

// import language hooks
import { useGetLanguage } from "../../../../../../hooks/useGetLanguage";
import { useTranslation } from "react-i18next";

function ShopingProduct({ data, isLoading, refetch, setPage, page }) {
  const language = useGetLanguage(); // get language
  const { t } = useTranslation();
  const theme = useTheme();

  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));

  useEffect(() => {
    refetch();
  }, [language]);

  // If data is loading, show a loading spinner
  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          maxWidth: "100%",
          height: "90vh",
        }}
      >
        <img src={loadingVideo} alt="" />
      </Box>
    );
  }

  if (data.data.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          maxWidth: "100%",
          height: "90vh",
        }}
      >
        {/* <img src={loadingVideo} alt="" /> */}
        <Typography
          sx={{ fontSize: "45px", display: "flex", alignItems: "center" }}
        >
          {t("noData")}
          <SentimentVeryDissatisfiedIcon sx={{ fontSize: "45px" }} />
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <Grid
        container
        spacing={isLargeScreen ? 1 : 0}
        height="100%"
        width={"100%"}
      >
        {data?.data?.map((product, index) => (
          <Grid
            key={index}
            item
            xs={12}
            sm={6}
            md={4}
            lg={4}
            xl={3}
            mt={{ xs: 2, md: 0 }}
          >
            <CardProduct
              idProduct={product.id}
              title={product.name}
              description={product.description}
              price={product.price}
              discount={product.price_after_discount}
              img={product.images_url}
            />
          </Grid>
        ))}
      </Grid>

      {/*  Pagination */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <PaginationComponent
          data={data}
          count={5}
          page={page}
          setPage={setPage}
          language={language}
        />
      </Box>
    </>
  );
}

export default ShopingProduct;
