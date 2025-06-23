import React from "react";
import ProductDescription from "../component/Product/ProductDescription";
import Related from "../component/Related/Related";

// use data product
import { useSingleProduct } from "../../../../../services/product/useProducts";

// component loading page
import LoadingPage from "../../../../../components/shared/loadingPage/loadingPage";

// start in assets
import loadingVideo from "../../../../../assets/shopLoading.gif";
import { useSetId } from "../../../../../store/useSetIdProduct";
import { useGetLanguage } from "../../../../../hooks/useGetLanguage";

import { Box } from "@mui/material";

function SingleProductIndex() {
  const { getIdProduct } = useSetId(); // get the id product
  const productId = getIdProduct();

  const language = useGetLanguage(); // get language
  const { data, isLoading, isError, error, refetch } = useSingleProduct(
    productId,
    language
  );

  // If data is loading, show a loading spinner
  if (isLoading) {
    return (
      <Box sx={{ background: "#fff" }}>
        <LoadingPage video={loadingVideo} />
      </Box>
    );
  }

  return (
    <>
      <ProductDescription
        data={data}
        isLoading={isLoading}
        isError={isError}
        error={error}
        language={language}
      />
      <Related data={data} />
    </>
  );
}

export default SingleProductIndex;
