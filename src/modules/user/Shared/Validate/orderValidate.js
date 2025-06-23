import * as Yup from "yup";

export const orderValidationSchema = (t) =>
  Yup.object().shape({
    name: Yup.string()
      .matches(/^[\p{L}\s]+$/u, t("validation.nameOnly"))
      .min(3, t("validation.nameMin"))
      .required(t("validation.nameRequired")),

    phone: Yup.string()
      .matches(/^[0-9]+$/, t("validation.phoneOnly"))
      .length(10, t("validation.phoneLength"))
      .required(t("validation.phoneRequired")),
  });
