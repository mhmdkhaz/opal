import React, { useState } from "react";

// start in mui
import {
  Box,
  Typography,
  IconButton,
  Button,
  ToggleButton,
} from "@mui/material";

// start in icon mui
import CloseIcon from "@mui/icons-material/Close";

// start in style
import { Styles } from "./shoppingCart.styles";

// start in assets
import iconCart from "../../../../assets/Product/cart.png";
import cartEmpty from "../../../../assets/cartEmpty.png";

// start in store
import useCartStore from "../../../../store/useSetItemToCart";

// import transition
import { useTranslation } from "react-i18next";

// import language
import { useGetLanguage } from "../../../../hooks/useGetLanguage";
import { showToast } from "../../../../components/shared/Toast/ToastProvider";
import PopupSendOrder from "../PopupSendOrder/PopupSendOrder";

export default function Cart({ closeCart }) {
  const { cartItems, removeFromCart, totalPrice } = useCartStore();
  const { t } = useTranslation();
  const language = useGetLanguage();

  // open and close modal
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box sx={Styles.root}>
      {/* Header with title and close button */}
      <Box sx={Styles.header}>
        <Typography variant="h6" fontWeight="bold">
          {t("shoppingCart")}
        </Typography>
        <Box component="img" src={iconCart} onClick={() => closeCart()} />
      </Box>

      {/* item product to shop */}
      <Box sx={Styles.containerItem}>
        {cartItems.length === 0 ? (
          <Box sx={Styles.cartEmpty}>
            <Box component="img" sx={Styles.imgCart} src={cartEmpty} />
            <Typography sx={Styles.textCart}>{t("emptyCart")}</Typography>
          </Box>
        ) : (
          <Box>
            {cartItems.map((item, index) => (
              <Box
                key={index}
                sx={{
                  ...Styles.itemRow,
                  borderBottom:
                    index === cartItems.length - 1
                      ? "none"
                      : "1px solid #D9D9D9",
                }}
              >
                <Box
                  component="img"
                  src={item.image}
                  alt={item.name}
                  sx={Styles.itemImage}
                />
                <Box sx={Styles.itemInfo}>
                  <Typography variant="body1">{item.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    sp. {item.price.toLocaleString("id-ID")}
                  </Typography>
                  <Box sx={Styles.sizeColor}>
                    <Typography variant="body1">
                      {t("size")}:
                      <Typography component="span" sx={Styles.span}>
                        {item?.size_id.size}
                      </Typography>
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      {t("color")}:
                      <svg
                        version="1.1"
                        id="ICON"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        viewBox="0 0 75.83 111.44"
                        xml:space="preserve"
                        style={{
                          color: item?.color_id.color,
                          width: "25px",
                          height: "20px",
                        }}
                      >
                        <path
                          id="O_LETTER"
                          fill="currentColor"
                          stroke={"#792A86"}
                          strokeWidth={"4"}
                          d="M0,19.84c0.4-2.8,1.5-5.6,3.8-7.3c3.5-2.6,7.6-3.4,11.6-4.4C19.7,7.14,24,6,28.2,5
    c0.854-0.239,1.689-0.54,2.5-0.9c1.891-0.618,3.606-1.681,5-3.1c1.117-1.268,3.05-1.391,4.319-0.274
    C40.046,0.75,40.073,0.775,40.1,0.8c1.695,1.647,3.749,2.879,6,3.6c2.6,0.9,5.3,1.6,8,2.3c3.9,1,7.9,1.8,11.8,2.8c1,0.2,2,0.7,3,1
    c4.5,1.7,6.5,5.2,6.9,9.9c0.1,1.3-0.1,70.7-0.4,72.8c-0.395,3.706-3.01,6.797-6.6,7.8c-4.4,1.5-9,2.4-13.4,3.7
    c-2.1,0.6-4.3,1-6.4,1.5c-3.226,0.647-6.227,2.13-8.7,4.3c-1.221,1.199-3.179,1.199-4.4,0c-2.2-2.3-5.2-3.3-8.3-4.1
    c-5.3-1.3-10.6-2.6-15.9-4c-2.007-0.523-3.951-1.261-5.8-2.2c-3.5-1.7-5.3-4.7-5.9-8.5L0,19.84z"
                        />
                        <path
                          id="CENTER"
                          fill="#fff"
                          d="M25.3,55.74v18.9c-0.017,0.901,0.017,1.803,0.1,2.7c0.5,4.3,2.1,7,6.2,8.1
    c4.23,1.1,8.67,1.1,12.9,0c3.5-0.9,5.3-3.3,5.6-6.8c0.2-1.927,0.3-3.863,0.3-5.8v-34.1c0-1.937-0.1-3.873-0.3-5.8
    c-0.4-4.1-2.5-6.4-6.5-7.3c-2.497-0.531-5.061-0.666-7.6-0.4c-1.729,0.105-3.44,0.407-5.1,0.9c-2.687,0.739-4.71,2.957-5.2,5.7
    c-0.32,1.479-0.487,2.987-0.5,4.5C25.3,42.84,25.3,49.24,25.3,55.74z"
                        />
                      </svg>
                    </Typography>
                  </Box>
                  <Typography variant="body1">
                    {t("quantity")}:
                    <Typography component="span" sx={Styles.span}>
                      {item.quantity}
                    </Typography>
                  </Typography>
                </Box>
                <IconButton
                  onClick={() => {
                    removeFromCart(
                      item?.product_id,
                      item?.other_fields?.color,
                      item?.other_fields?.size
                    ),
                      showToast("error", "تم الحذف");
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </Box>
            ))}
            <Box sx={Styles.divider}>
              <Box sx={Styles.totalRow}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {t("total")}:
                </Typography>
                <Typography variant="subtitle1" fontWeight="bold">
                  {totalPrice().toLocaleString("id-ID")}{" "}
                  {language === "en" ? "Sp" : "ل س"}
                </Typography>
              </Box>
              <Box sx={Styles.checkoutButton}>
                <Button className="btn" onClick={handleOpen}>
                  {t("checkout")}
                </Button>
              </Box>
            </Box>
          </Box>
        )}
      </Box>

      {/* modal to form send order and name and telephone */}
      <PopupSendOrder
        cartItems={cartItems}
        open={open}
        handleClose={handleClose}
        closeCart={closeCart}
      />
    </Box>
  );
}
