import React from "react";

// start in component
import Hero from "../component/Hero/Hero";
import SaleSlider from "../component/SaleSlider/SaleSlider";
import Category from "../component/Category/Category";
import SaleCollection from "../component/SaleCollection/SaleCollection";
import CollectionImgSlide from "../component/CollectionImgSlide/CollectionImgSlide";
import BestSeller from "../component/BestSeller/BestSeller";
import Promo from "../component/Promo/Promo";

// start in translation
import { useTranslation } from "react-i18next";

// service loading data
import { useCategoriesClient } from "../../../../../services/categories/useCategories";
import { useGetSlidersOfferClient } from "../../../../../services/sliderOffer/useSliderOffer";
import { useBaseSeller } from "../../../../../services/product/useProducts";

// loading website
import LoadingPage from "../../../../../components/shared/loadingPage/loadingPage";

// MUI
import { Box } from "@mui/material";

// start in assets
import loadingVideo from "../../../../../assets/loading.gif";

function HomeIndex() {
  const { t } = useTranslation();

  // Fetching data with custom hooks
  const { isLoading: isCategoriesLoading, isError: isCategoriesError } =
    useCategoriesClient();
  const { isLoading: isSlidersLoading, isError: isSlidersError } =
    useGetSlidersOfferClient();
  const {
    data,
    isLoading: isBaseSellerLoading,
    isError: isBaseSellerError,
  } = useBaseSeller();

  // If data is loading, show a loading spinner
  if (isCategoriesLoading || isSlidersLoading || isBaseSellerLoading) {
    return (
      <Box sx={{ background: "#fff" }}>
        <LoadingPage video={loadingVideo} />
      </Box>
    );
  }

  return (
    <div>
      <Hero />
      <SaleSlider />
      <Category />
      <BestSeller title={t("bestSeller")} />

      <Promo />
      <SaleCollection title={t("discount")} />
    </div>
  );
}

export default HomeIndex;
{
  /* <CollectionImgSlide /> */
}
{
  /* <SaleCollection title={t("springCollection")} /> */
}
