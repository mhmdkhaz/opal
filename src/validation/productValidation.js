import * as yup from "yup";

export const productSchema = yup.object().shape({
  nameEn: yup.string().required("اسم المنتج بالإنجليزية مطلوب"),
  nameAr: yup.string().required("اسم المنتج بالعربية مطلوب"),
  descriptionEn: yup.string().required("الوصف بالإنجليزية مطلوب"),
  descriptionAr: yup.string().required("الوصف بالعربية مطلوب"),
  category: yup.string().required("التصنيف مطلوب"),
  basePrice: yup
    .number()
    .typeError("يجب أن يكون السعر رقماً")
    .positive("يجب أن يكون السعر موجباً")
    .required("السعر الأساسي مطلوب"),
  discountPrice: yup
    .number()
    .typeError("يجب أن يكون السعر رقماً")
    .positive("يجب أن يكون السعر موجباً")
    .max(yup.ref("basePrice"), "السعر المخفض يجب أن يكون أقل من السعر الأساسي"),
  mainImages: yup
    .array()
    .min(1, "يجب إضافة صورة رئيسية واحدة على الأقل")
    .required("الصور الرئيسية مطلوبة"),
  colors: yup
    .array()
    .min(1, "يجب إضافة لون واحد على الأقل")
    .test(
      "color-images",
      "يجب إضافة صورة واحدة على الأقل لكل لون",
      (colors) => {
        return colors.every((color) => color.images && color.images.length > 0);
      }
    ),
  sizes: yup.array().min(1, "يجب إضافة قياس واحد على الأقل"),
});
