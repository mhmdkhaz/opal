import React, { useEffect, useRef, useState } from "react";

// MUI
import {
  Box,
  Typography,
  Slider,
  List,
  ListItem,
  ListItemText,
  Chip,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";

// MUI icon
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";

// zustand store
import { useFilterDataProduct } from "../../../../../../store/useFilterDataProduct";

// get api color and category and price
import { useAllColors } from "../../../../../../services/allColors/useAllColors";
import { useProductCategories } from "../../../../../../services/ProductCategory/useProductCategory";
import { useGetProductClient } from "../../../../../../services/product/useProducts";

// get language
import useGetLanguage from "../../../../../../hooks/useGetLanguage";
import { useTranslation } from "react-i18next";

// import style
import { styles } from "./FilterSidebar.styles"; // Import styles from the external file

// localstorage all filter
import { useFilters } from "../../../../../../hooks/useFilterStorage";

const FilterSidebar = ({ data, refetch, setDrawerOpen }) => {
  const language = useGetLanguage();
  const { t } = useTranslation();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const { data: dataColor } = useAllColors(language);
  const { data: dataPrice } = useGetProductClient(language);
  const { data: dataCategories } = useProductCategories(language);

  console.log(dataColor);
  console.log(dataPrice);
  console.log(dataCategories);

  const {
    selectedColor,
    selectedCategoryId,
    discounts,
    baseSellers,
    setSelectedColor,
    setSelectedCategoryId,
    setDiscounts,
    setBaseSellers,
  } = useFilters();

  const {
    setMaxPriceApi,
    setMinPriceApi,
    setColor,
    setCategoryId,
    setDiscountStore,
    setBaseSellerStore,
  } = useFilterDataProduct();

  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000000);

  const isDataLoaded = useRef(false);

  // Update minPrice and maxPrice only when data is first loaded
  useEffect(() => {
    if (dataPrice?.data?.length > 0 && !isDataLoaded.current) {
      const prices = dataPrice.data
        .map((item) => item.price)
        .filter((p) => p != null);

      if (prices.length > 0) {
        const newMinPrice = Math.min(...prices);
        const newMaxPrice = Math.max(...prices);

        setMinPrice(newMinPrice);
        setMaxPrice(newMaxPrice);
        setPriceRange([newMinPrice, newMaxPrice]);

        isDataLoaded.current = true;
      }
    }
  }, [dataPrice]);

  // Handle price change
  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  // When slider changes are committed, update the API values and refetch
  const handlePriceChangeCommitted = () => {
    setMinPriceApi(priceRange[0]);
    setMaxPriceApi(priceRange[1]);
    refetch();
  };

  // Handle color selection
  const handleColor = (colorSelected) => {
    setSelectedColor(colorSelected);
    setColor(colorSelected);
  };

  // Handle category selection
  const handleCategoryId = (categoryIdSelected) => {
    setSelectedCategoryId(categoryIdSelected);
    setCategoryId(categoryIdSelected);
  };

  // Handle discount filter selection
  const handleDiscounts = (selectedDiscount) => {
    setDiscounts(selectedDiscount);
    setDiscountStore(selectedDiscount);
  };

  // Handle base seller filter selection
  const handleBaseSeller = (selectedHasSeller) => {
    setBaseSellers(selectedHasSeller);
    setBaseSellerStore(selectedHasSeller);
  };

  return (
    <Box sx={styles.container}>
      <Box sx={styles.filterHeader}>
        <Typography variant="h6" sx={styles.title}>
          {t("filter")}
        </Typography>
        {isMobile && (
          <IconButton onClick={() => setDrawerOpen(false)}>
            <CloseIcon />
          </IconButton>
        )}
      </Box>

      {/* Category filter */}
      <Accordion sx={{ boxShadow: "none" }} defaultExpanded={true}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" fontWeight="bold">
            {t("Categories")}
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ height: "200px", overflow: "auto" }}>
          <List>
            <ListItem
              sx={{
                textAlign: language === "ar" ? "right" : "left",
                background: selectedCategoryId === "" ? "#eee" : "",
              }}
              onClick={() => handleCategoryId("")}
            >
              <ListItemText primary={t("all")} />
            </ListItem>
            <Divider component="li" />
            {dataCategories?.map((category, index) => (
              <React.Fragment key={index}>
                <ListItem
                  sx={{
                    textAlign: language === "ar" ? "right" : "left",
                    background:
                      selectedCategoryId === category.id ? "#eee" : "",
                  }}
                  onClick={() => handleCategoryId(category.id)}
                >
                  <ListItemText
                    primary={category.local_name}
                    // primaryTypographyProps={{
                    //   color: category.highlight ? "primary" : "inherit",
                    //   fontWeight: category.highlight ? "bold" : "normal",
                    // }}
                  />
                </ListItem>
                <Divider component="li" />
              </React.Fragment>
            ))}
          </List>
        </AccordionDetails>
      </Accordion>

      {/* Discount filter */}
      <Accordion sx={{ boxShadow: "none" }} defaultExpanded={true}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" fontWeight="bold">
            {t("Discounts")}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography
            variant="subtitle1"
            onClick={() => handleDiscounts("has_discount=1")}
            sx={{
              cursor: "pointer",
              mb: 1,
              background: discounts === "has_discount=1" ? "#eee" : "",
              p: 1,
            }}
          >
            {t("contains")}
          </Typography>
          <Divider />
          <Typography
            variant="subtitle1"
            onClick={() => handleDiscounts("null")}
            sx={{
              cursor: "pointer",
              background: discounts === "null" ? "#eee" : "",
              p: 1,
            }}
          >
            {t("notContains")}
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* Best seller filter */}
      <Accordion sx={{ boxShadow: "none" }} defaultExpanded={true}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" fontWeight="bold">
            {t("bestSeller")}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography
            variant="subtitle1"
            onClick={() => handleBaseSeller("base_seller=1")}
            sx={{
              cursor: "pointer",
              mb: 1,
              background: baseSellers === "base_seller=1" ? "#eee" : "",
              p: 1,
            }}
          >
            {t("TheMost")}
          </Typography>
          <Divider />
          <Typography
            variant="subtitle1"
            onClick={() => handleBaseSeller("null")}
            sx={{
              cursor: "pointer",
              background: baseSellers === "null" ? "#eee" : "",
              p: 1,
            }}
          >
            {t("all")}
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* Price filter */}
      <Typography variant="subtitle1" sx={styles.sectionTitle}>
        {t("Prices")}
      </Typography>

      {priceRange.length === 2 && (
        <Typography variant="body2" sx={{ mb: 1 }}>
          {/* Range:  */}
          {t("syp")} {priceRange[0]?.toFixed(2)} - {t("syp")}{" "}
          {priceRange[1]?.toFixed(2)}
        </Typography>
      )}
      <Slider
        value={priceRange}
        onChange={handlePriceChange}
        onChangeCommitted={handlePriceChangeCommitted}
        valueLabelDisplay="auto"
        min={minPrice}
        max={maxPrice}
        sx={styles.slider}
      />

      {/* Color filter */}
      <Typography variant="subtitle1" sx={styles.sectionTitle}>
        {t("Color")}
      </Typography>
      <Stack direction="row" gap={1.5} sx={{ mt: 1, mb: 2, flexWrap: "wrap" }}>
        {/* {dataColor?.data.map((color, index) => (
          <Chip
            key={index}
            sx={styles.colorChip(selectedColor, color)}
            onClick={() => handleColor(color)}
          />
        ))} */}

        {dataColor?.data.map((color, index) => (
          <svg
            key={index}
            version="1.1"
            id="ICON"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 75.83 111.44"
            xml:space="preserve"
            style={{
              color: color.local_name, // استخدام اللون من البيانات
              width: "27px",
              height: "25px",
              cursor: "pointer",
            }}
            onClick={() => handleColor(color.local_name)}
          >
            <path
              id="O_LETTER"
              fill="currentColor"
              stroke={
                selectedColor === color.local_name ? "#792A86" : "#1976d2"
              }
              strokeWidth="8"
              d="M0,19.84c0.4-2.8,1.5-5.6,3.8-7.3c3.5-2.6,7.6-3.4,11.6-4.4C19.7,7.14,24,6,28.2,5
        c0.854-0.239,1.689-0.54,2.5-0.9c1.891-0.618,3.606-1.681,5-3.1c1.117-1.268,3.05-1.391,4.319-0.274
        C40.046,0.75,40.073,0.775,40.1,0.8c1.695,1.647,3.749,2.879,6,3.6c2.6,0.9,5.3,1.6,8,2.3c3.9,1,7.9,1.8,11.8,2.8c1,0.2,2,0.7,3,1
        c4.5,1.7,6.5,5.2,6.9,9.9c0.1,1.3-0.1,70.7-0.4,72.8c-0.395,3.706-3.01,6.797-6.6,7.8c-4.4,1.5-9,2.4-13.4,3.7
        c-2.1,0.6-4.3,1-6.4,1.5c-3.226,0.647-6.227,2.13-8.7,4.3c-1.221,1.199-3.179,1.199-4.4,0c-2.2-2.3-5.2-3.3-8.3-4.1
        c-5.3-1.3-10.6-2.6-15.9-4c-2.007-0.523-3.951-1.261-5.8-2.2c-3.5-1.7-5.3-4.7-5.9-8.5L0,19.84z"
            />
            <path
              id="CENTER"
              fill="#f8f5f5"
              d="M25.3,55.74v18.9c-0.017,0.901,0.017,1.803,0.1,2.7c0.5,4.3,2.1,7,6.2,8.1
        c4.23,1.1,8.67,1.1,12.9,0c3.5-0.9,5.3-3.3,5.6-6.8c0.2-1.927,0.3-3.863,0.3-5.8v-34.1c0-1.937-0.1-3.873-0.3-5.8
        c-0.4-4.1-2.5-6.4-6.5-7.3c-2.497-0.531-5.061-0.666-7.6-0.4c-1.729,0.105-3.44,0.407-5.1,0.9c-2.687,0.739-4.71,2.957-5.2,5.7
        c-0.32,1.479-0.487,2.987-0.5,4.5C25.3,42.84,25.3,49.24,25.3,55.74z"
            />
          </svg>
        ))}
      </Stack>
    </Box>
  );
};

export default FilterSidebar;
