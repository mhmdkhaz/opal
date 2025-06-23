import React, { useState } from "react";
// start in MUI
import {
  Container,
  Grid,
  Card,
  Typography,
  Button,
  ToggleButton,
  IconButton,
  Box,
  ImageList,
  ImageListItem,
  useMediaQuery,
} from "@mui/material";

// start in MUI icon
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

// import style
import { Styles } from "./ProductDescription.styles";

// start in store
import useCartStore from "../../../../../../store/useSetItemToCart";

// import alert library
import { showToast } from "../../../../../../components/shared/Toast/ToastProvider";

// get the language
import { useTranslation } from "react-i18next";
import { LazyLoadImage } from "react-lazy-load-image-component";

// import imgTest from "../../../../../../assets/Shop/pr_1.jpg";
import imgTest from "../../../../../../assets/Shop/shopHero.jpeg";

const more = [
  imgTest,
  imgTest,
  imgTest,
  imgTest,
  imgTest,
  imgTest,
  imgTest,
  imgTest,
  imgTest,
  imgTest,
  imgTest,
  imgTest,
  imgTest,
];

const ProductDescription = ({ data, isLoading, isError, error, language }) => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery("(max-width:600px)");

  const [selectedChestSize, setSelectedChestSize] = useState(
    data?.data?.sizes[0]?.chest_size
  );
  const [selectedHeight, setSelectedHeight] = useState(
    data?.data?.sizes[0]?.height
  );
  const [selectedColor, setSelectedColor] = useState(
    data?.data?.colors[0]?.color
  );
  const [imageColor, setImageColor] = useState(
    data?.data?.colors[0]?.images_url
  );

  const [size, setSize] = useState(data?.data?.sizes[0]);
  const [colorData, setColorData] = useState(data?.data?.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(
    data?.data?.colors[0]?.images_url[0]
  );

  const styles = Styles(language); // For Style

  const { cartItems, addToCart } = useCartStore(); // zustand to Send Data To Cartssss

  const handleAddToCart = () => {
    const product = {
      product_id: data?.data?.id,
      name: data?.data?.name,
      quantity,
      price: data?.data.price_after_discount
        ? data?.data.price_after_discount
        : data?.data?.price,
      image: selectedImage,
      color_id: colorData,
      size_id: size,
    };

    // check if the Product existing in cart
    const existingProduct = cartItems.find(
      (item) =>
        item.product_id === product.product_id &&
        item.color_id.color === product.color_id.color &&
        item.size_id.size === product.size_id.size
    );

    if (existingProduct) {
      showToast("info", t("existing"));
    } else {
      addToCart(product);
      showToast("success", t("sendOrder"));
    }
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleSizeClick = (selectedSize) => {
    const selectedData = data?.data?.sizes.find(
      (s) => s.size === selectedSize.size
    );
    setSize(selectedSize);
    setSelectedChestSize(selectedData?.chest_size);
    setSelectedHeight(selectedData?.height);
  };

  const handleColorClick = (selectColor) => {
    setSelectedColor(selectColor.color);
    setImageColor(selectColor.images_url);
    setSelectedImage(selectColor.images_url[0]);
    setColorData(selectColor);
  };

  if (isLoading) return <Typography>جارٍ تحميل المنتج...</Typography>;
  if (isError)
    return <Typography color="error">خطأ: {error?.message}</Typography>;

  return (
    <Container maxWidth="lg" sx={styles.container}>
      <Grid container spacing={isMobile ? 0 : 4} width={"100%"}>
        {/* Right Side - Product Details */}
        <Grid item xs={12} md={6}>
          <Typography sx={styles.title} variant="h4" fontWeight="bold">
            {data?.data?.name || "اسم المنتج"}
          </Typography>
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            {data?.data?.price_after_discount ? (
              <Typography variant="h6" color="gray" sx={styles.price}>
                {data?.data?.price_after_discount || "السعر غير متوفر"} ل.س
              </Typography>
            ) : (
              ""
            )}

            <Typography
              variant="h6"
              color="gray"
              sx={{
                ...styles.price,
                textDecoration: data?.data?.price_after_discount
                  ? "line-through"
                  : "",
              }}
            >
              {data?.data?.price || "السعر غير متوفر"} ل.س
            </Typography>
          </Box>
          <Typography variant="body1" sx={styles.text}>
            {data?.data?.description}
          </Typography>

          {/* Size Selection */}
          <Box>
            <Typography variant="subtitle1" sx={{ mt: 3 }}>
              {t("size")}
            </Typography>
            <Box sx={styles.boxSize}>
              <Box sx={{ display: "flex", gap: 2 }}>
                {data?.data?.sizes.map((s, index) => (
                  <ToggleButton
                    key={index}
                    value={s.size}
                    selected={size && size?.size === s.size}
                    onClick={() => handleSizeClick(s)}
                    sx={styles.toggleSize}
                  >
                    {s?.size}
                  </ToggleButton>
                ))}
              </Box>

              {size && (
                <Box sx={{ display: "flex", gap: 3, marginTop: 2 }}>
                  <Typography variant="h6">
                    {t("chestSize")}:{" "}
                    <Typography variant="span" sx={{ color: "#792a86" }}>
                      {selectedChestSize}
                    </Typography>
                  </Typography>
                  <Typography variant="h6">
                    {t("height")}:{" "}
                    <Typography variant="span" sx={{ color: "#792a86" }}>
                      {selectedHeight}
                    </Typography>
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>

          {/* Color Selection */}
          <Box>
            <Typography variant="subtitle1" sx={{ mt: 3 }}>
              {t("color")}
            </Typography>
            <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
              {data?.data?.colors?.map((color, index) => (
                <Box
                  key={index}
                  onClick={() => handleColorClick(color)}
                  sx={{
                    cursor: "pointer",
                    borderRadius: "8px",
                    padding: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg
                    version="1.1"
                    id="ICON"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 75.83 111.44"
                    xml:space="preserve"
                    style={{
                      color: color.color,
                      width: "45px",
                      height: "30px",
                    }}
                  >
                    <path
                      id="O_LETTER"
                      fill="currentColor"
                      stroke={
                        color.color === selectedColor
                          ? "#792A86"
                          : "transparent"
                      }
                      strokeWidth={color.color === selectedColor ? "8" : "0"}
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
                </Box>
              ))}
            </Box>
          </Box>

          {/* Quantity Selector */}
          <Grid container alignItems="center" sx={{ mt: 3 }}>
            <Box sx={{ ...styles.quantity, flexDirection: "row-reverse" }}>
              <IconButton
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <RemoveIcon />
              </IconButton>

              <Typography variant="h6" sx={{ mx: 2 }}>
                {quantity}
              </Typography>

              <IconButton onClick={() => setQuantity(quantity + 1)}>
                <AddIcon />
              </IconButton>
            </Box>
          </Grid>

          {/* Add to Cart Button */}
          <Button
            size="large"
            sx={styles.buttonCart}
            onClick={() => {
              handleAddToCart();
            }}
          >
            {t("addToCart")}
          </Button>
        </Grid>

        {/* image product */}
        {/* <Grid item xs={12} md={6} width={100}>
          <Box sx={styles.contentImage}>
            <ImageList
              sx={styles.imagesList}
              variant="quilted"
              cols={4}
              rowHeight={121}
            >
              {imageColor.map((item, index) => (
                <ImageListItem
                  key={index}
                  cols={1}
                  rows={1}
                  onClick={() => handleImageClick(item)}
                  sx={{
                    cursor: "pointer",
                    borderRadius: "8px",
                    transition: "0.3s",
                    overflow: "hidden",
                    border:
                      selectedImage === item
                        ? "3px solid #1976d2"
                        : "3px solid transparent",
                    opacity: selectedImage === item ? 1 : 0.7,
                    "&:hover": {
                      opacity: 1,
                    },
                  }}
                >
                  <img
                    src={item}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    alt="Product"
                    loading="lazy"
                  />
                </ImageListItem>
              ))}
            </ImageList>

            <Card sx={styles.card}>
              <GlassMagnifier
                allowOverflow={true}
                magnifierSize="35%"
                shape="circle"
                borderSize={10}
                borderColor="rgba(255, 255, 255, 0.5)"
                imageSrc={selectedImage}
                imageAlt="Example"
                largeImageSrc={selectedImage} // High-resolution image for zoom
                // renderOverlay={() => (
                //   <LazyLoadImage
                //     src={selectedImage}
                //     alt="Example"
                //     effect="blur" // Lazy loading effect
                //     style={{
                //       width: "100%",
                //       height: "600px",
                //       objectFit: "cover",
                //     }}
                //   />
                // )}
              />
            </Card>
          </Box>
        </Grid> */}

        <Grid item xs={12} md={6} sx={{ pl: 0 }}>
          <Box sx={styles.contentImage}>
            <ImageList
              sx={styles.imagesList}
              cols={isMobile ? more.length : 1}
              rowHeight={120}
            >
              {/* {more.map((item, index) => ( */}
              {imageColor.map((item, index) => (
                <ImageListItem
                  key={index}
                  sx={{
                    ...styles.imageItem,
                    border:
                      selectedImage === item
                        ? "3px solid #1976d2"
                        : "3px solid transparent",
                    opacity: selectedImage === item ? 1 : 0.8,
                    "&:hover": { opacity: 1 },
                  }}
                  onClick={() => handleImageClick(item)}
                >
                  <LazyLoadImage
                    src={item}
                    effect="blur"
                    style={{
                      width: "100%",
                      height: "auto",
                      objectFit: "cover",
                      borderRadius: "5px",
                    }}
                    alt="Product"
                    loading="lazy"
                  />
                </ImageListItem>
              ))}
            </ImageList>

            <Box sx={styles.card}>
              <Box
                sx={{
                  width: { xs: "100%", sm: "400px" },
                  height: { xs: "400px", sm: "600px" },
                }}
              >
                <LazyLoadImage
                  src={selectedImage}
                  alt="Zoomed Product"
                  effect="blur"
                  height="100%"
                  width="100%"
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "10px",
                    filter: "brightness(0.8)",
                    objectFit: "cover",
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDescription;
