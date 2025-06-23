import * as React from "react";
import { useEffect } from "react";

// MUI
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";

// services to import data
import { usePostOrder } from "../../../../services/sendOrder/useSendOrder";

// import formik to validate
import { useFormik } from "formik";

// import component to validate
import { orderValidationSchema } from "../../Shared/Validate/orderValidate";

// import alert
import { showToast } from "../../../../components/shared/Toast/ToastProvider";

// import zustand store to cart
import useCartStore from "../../../../store/useSetItemToCart";

// import  translation
import { useTranslation } from "react-i18next";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: 350, sm: 400 },
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function PopupSendOrder({
  cartItems = [],
  open,
  handleClose,
  closeCart,
}) {
  const [itemsOrder, setItemsOrder] = React.useState([]);
  const { mutate: postOrder, isLoading } = usePostOrder();
  const { clearCart } = useCartStore();
  const { t } = useTranslation();

  // update data after changer order
  useEffect(() => {
    if (cartItems.length > 0) {
      const formattedItems = cartItems.map((item) => ({
        product_id: item.product_id,
        quantity: item.quantity || 1,
        // price: item.price,
        color_id: item?.color_id.id,
        size_id: item.size_id.id,
        other_fields: {},
      }));
      setItemsOrder(formattedItems);
    }
  }, [cartItems]);

  // ✅ import formik to validate
  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
    },
    validationSchema: orderValidationSchema(t), // validate
    onSubmit: (values) => {
      if (itemsOrder.length === 0) {
        alert("السلة فارغة ! أضف عناصر قبل تأكيد الطلب.");
        return;
      }

      // إزالة أول رقم من الهاتف
      const formattedPhone = values.phone.slice(1);

      postOrder(
        {
          name: values.name,
          phone: `+963${formattedPhone}`,
          items: itemsOrder,
        },
        {
          onSuccess: () => {
            setTimeout(() => {
              showToast("success", t("success"));
            }, 500);

            clearCart(); // clear all item from cart
            closeCart(false); // close cart after order
            handleClose(); // close drawer send order
          },
          onError: () => {
            showToast("error", t("errorCart"));
          },
        }
      );
    },
  });

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {t("EnterInformation")}
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label={t("name")}
              variant="outlined"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              margin="normal"
            />

            <TextField
              fullWidth
              label={t("telephone")}
              variant="outlined"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
              margin="normal"
            />
          </Box>

          <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              // disabled={isLoading || !formik.isValid || !formik.dirty}
            >
              {isLoading ? "جاري الإرسال..." : t("send")}
            </Button>
            <Button variant="outlined" color="error" onClick={handleClose}>
              {t("cancel")}
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}
