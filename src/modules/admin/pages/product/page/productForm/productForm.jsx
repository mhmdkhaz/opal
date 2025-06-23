import React, { useEffect } from "react";
import {
  Box,
  Typography,
  Divider,
  Button,
  CircularProgress,
  colors,
} from "@mui/material";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import ProductForm from "../../component/ProductForm/ProductForm";
import ColorSection from "../../component/ColorSection/ColorSection";
import SizeSection from "../../component/SizeSection/SizeSection";
import PriceSection from "../../component/PriceSection/PriceSection";
import MainImageUploader from "../../component/MainImageUploader/MainImageUploader";
import {
  usePostProduct,
  useUpdateProduct,
} from "../../../../../../services/product/useProducts";
import { useSingleProduct } from "../../../../../../services/product/useProducts";
import { productSchema } from "../../../../../../validation/productValidation";

export default function ProductFormPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const productId = searchParams.get("id");
  const isEditMode = Boolean(productId);

  const { data: productDataEn, isLoading: loadingEn } = useSingleProduct(
    productId,
    "en"
  );
  const { data: productDataAr, isLoading: loadingAr } = useSingleProduct(
    productId,
    "ar"
  );

  const postProduct = usePostProduct();
  const updateProduct = useUpdateProduct();

  const formik = useFormik({
    initialValues: {
      nameEn: "",
      nameAr: "",
      descriptionEn: "",
      descriptionAr: "",
      category: "",
      basePrice: "",
      discountPrice: "",
      mainImages: [],
      colors: [],
      sizes: [],
    },
    validationSchema: productSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  useEffect(() => {
    if (isEditMode && productDataEn) {
      const productEn = productDataEn?.data;
      const productAr = productDataAr?.data;

      console.log(productEn);

      formik.setValues({
        nameEn: productEn?.name || "",
        nameAr: productAr?.name || "",
        descriptionEn: productEn?.description || "",
        descriptionAr: productAr?.description || "",
        category: productEn.category?.id || "",
        basePrice: productEn.price || "",
        discountPrice: productEn.price_after_discount || "",
        sizes: productEn.sizes || [],
        colors: Array.isArray(productEn.colors) ? productEn.colors : [],
        mainImages: productEn.images_url || [],
      });
    }
  }, [productDataEn, isEditMode]);

  const handleSubmit = async (values) => {
    await formik.validateForm();

    if (Object.keys(formik.errors).length > 0) {
      formik.setTouched({
        nameEn: true,
        nameAr: true,
        descriptionEn: true,
        descriptionAr: true,
        category: true,
        basePrice: true,
        discountPrice: true,
        mainImages: true,
        colors: true,
        sizes: true,
      });
      return;
    }

    console.log(colors);

    const formData = new FormData();

    formData.append("category_id", values.category);
    formData.append("name[en]", values.nameEn);
    formData.append("name[ar]", values.nameAr);
    formData.append("description[en]", values.descriptionEn);
    formData.append("description[ar]", values.descriptionAr);
    formData.append("price", values.basePrice);
    formData.append("price_after_discount", values.discountPrice);
    formData.append("stock_id", 11);

    // معالجة الصور الرئيسية
    let hasMainImage = false;
    values.mainImages.forEach((img) => {
      if (img.file) {
        hasMainImage = true;
        formData.append("images[]", img.file);
      }
    });

    if (!hasMainImage && values.mainImages.length > 0) {
      values.mainImages.forEach((img, index) => {
        if (typeof img === "string") {
          formData.append(`images_url[${index}]`, img);
        }
      });
    } else if (values.mainImages.length === 0) {
      formData.append("images[]", "");
    }

    // معالجة الألوان
    values.colors.forEach((product, index) => {
      formData.append(
        `colors[${index}][id]`,
        product.color?.id || product.color_id
      );

      const imagesToUpload = product.images || [];
      const existingImages = product.images_url || [];

      let hasNewColorImage = false;

      imagesToUpload.forEach((image, imgIndex) => {
        if (image.file) {
          hasNewColorImage = true;
          formData.append(`colors[${index}][images][${imgIndex}]`, image.file);
        }
      });

      if (!hasNewColorImage && existingImages.length > 0) {
        existingImages.forEach((imageUrl, imgIndex) => {
          formData.append(
            `colors[${index}][images_url][${imgIndex}]`,
            imageUrl
          );
        });
      } else if (imagesToUpload.length === 0) {
        formData.append(`colors[${index}][images][0]`, "");
      }
    });

    // معالجة المقاسات
    values.sizes.forEach((size, index) => {
      formData.append(
        `sizes[${index}][id]`,
        isEditMode ? size.size_id : size.id
      );
      formData.append(`sizes[${index}][chest_size]`, size.chest_size || "");
      formData.append(`sizes[${index}][height]`, size.height || "");
    });

    if (isEditMode) {
      formData.append("_method", "put");
      updateProduct.mutate({ id: productId, formData });
    } else {
      postProduct.mutate(formData);
    }
  };

  if (isEditMode && loadingEn && loadingAr) {
    return (
      <Box flex justifyContent={"center"} alignItems={"center"}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={4} sx={{ background: "#fff" }} borderRadius={2}>
      <form onSubmit={formik.handleSubmit}>
        <Typography variant="h5" mb={3} color="primary">
          {isEditMode ? "تعديل المنتج" : "إضافة منتج جديد"}
        </Typography>

        <ProductForm
          nameEn={formik.values.nameEn}
          setNameEn={(value) => formik.setFieldValue("nameEn", value)}
          nameAr={formik.values.nameAr}
          setNameAr={(value) => formik.setFieldValue("nameAr", value)}
          descriptionEn={formik.values.descriptionEn}
          setDescriptionEn={(value) =>
            formik.setFieldValue("descriptionEn", value)
          }
          descriptionAr={formik.values.descriptionAr}
          setDescriptionAr={(value) =>
            formik.setFieldValue("descriptionAr", value)
          }
          category={formik.values.category}
          setCategory={(value) => formik.setFieldValue("category", value)}
          isEditMode={isEditMode}
          errors={formik.errors}
          touched={formik.touched}
        />

        <Divider sx={{ my: 4 }} />

        <MainImageUploader
          images={formik.values.mainImages}
          setImages={(images) => formik.setFieldValue("mainImages", images)}
          initialImages={isEditMode ? productDataEn?.data?.images_url : []}
          error={formik.touched.mainImages && formik.errors.mainImages}
        />

        <Divider sx={{ my: 4 }} />

        <ColorSection
          colors={formik.values.colors}
          setColors={(colors) => formik.setFieldValue("colors", colors)}
          initialColors={isEditMode ? productDataEn?.data?.colors : []}
          error={formik.touched.colors && formik.errors.colors}
        />

        <Divider sx={{ my: 4 }} />

        <SizeSection
          sizes={formik.values.sizes}
          setSizes={(sizes) => formik.setFieldValue("sizes", sizes)}
          initialSizes={isEditMode ? productDataEn?.data?.sizes : []}
          error={formik.touched.sizes && formik.errors.sizes}
        />

        <Divider sx={{ my: 4 }} />

        <PriceSection
          basePrice={formik.values.basePrice}
          setBasePrice={(value) => formik.setFieldValue("basePrice", value)}
          discountPrice={formik.values.discountPrice}
          setDiscountPrice={(value) =>
            formik.setFieldValue("discountPrice", value)
          }
          errors={{
            basePrice: formik.touched.basePrice && formik.errors.basePrice,
            discountPrice:
              formik.touched.discountPrice && formik.errors.discountPrice,
          }}
        />

        <Box mt={4} display="flex" gap={2}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ background: "#8A1A9B" }}
          >
            {isEditMode ? "حفظ التعديلات" : "إضافة المنتج"}
          </Button>
          <Button variant="outlined" onClick={() => navigate("/products")}>
            إلغاء
          </Button>
        </Box>
      </form>
    </Box>
  );
}
