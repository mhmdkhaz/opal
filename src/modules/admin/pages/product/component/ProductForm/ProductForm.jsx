import React from "react";
import { Grid, TextField, Select, MenuItem } from "@mui/material";
import { useCategories } from "../../../../../../services/categories/useCategories";
// import { useCategories } from "../../../../../../services/categories/useCategories";

export default function ProductForm({
  // nameEn,
  // setNameEn,
  // nameAr,
  // setNameAr,
  // descriptionEn,
  // setDescriptionEn,
  // descriptionAr,
  // setDescriptionAr,
  // category,
  // setCategory,
  nameEn,
  setNameEn,
  nameAr,
  setNameAr,
  descriptionEn,
  setDescriptionEn,
  descriptionAr,
  setDescriptionAr,
  category,
  setCategory,
  errors = {},
  touched = {},
}) {
  const { data, isLoading } = useCategories("ar");

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label=" اسم المنتج بالانكليزي "
          value={nameEn}
          onChange={(e) => setNameEn(e.target.value)}
          error={touched.nameEn && Boolean(errors.nameEn)}
          helperText={touched.nameEn && errors.nameEn}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label=" اسم المنتج بالعربي"
          value={nameAr}
          onChange={(e) => setNameAr(e.target.value)}
          error={touched.nameAr && Boolean(errors.nameAr)}
          helperText={touched.nameAr && errors.nameAr}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="الوصف بالانكليزي"
          multiline
          rows={4}
          value={descriptionEn}
          onChange={(e) => setDescriptionEn(e.target.value)}
          error={touched.descriptionEn && Boolean(errors.descriptionEn)}
          helperText={touched.descriptionEn && errors.descriptionEn}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label=" الوصف بالعربي"
          multiline
          rows={4}
          value={descriptionAr}
          onChange={(e) => setDescriptionAr(e.target.value)}
          error={touched.descriptionAr && Boolean(errors.descriptionAr)}
          helperText={touched.descriptionAr && errors.descriptionAr}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <Select
          fullWidth
          value={category}
          displayEmpty
          onChange={(e) => setCategory(e.target.value)}
          error={touched.category && Boolean(errors.category)}
          helperText={touched.category && errors.category}
        >
          <MenuItem value="" disabled>
            {isLoading ? "جاري التحميل..." : "اختر التصنيف"}
          </MenuItem>

          {data?.map((cat) => (
            <MenuItem key={cat.id} value={cat.id}>
              {cat.name?.ar || cat.name}
            </MenuItem>
          ))}
        </Select>
      </Grid>
    </Grid>
  );
}
