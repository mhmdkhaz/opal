import React from "react";
import { Grid, TextField } from "@mui/material";

export default function PriceSection({
  basePrice,
  setBasePrice,
  discountPrice,
  setDiscountPrice,
  errors = {},
}) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="السعر الأساسي"
          value={basePrice}
          onChange={(e) => setBasePrice(e.target.value)}
          error={Boolean(errors.basePrice)}
          helperText={errors.basePrice}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="السعر المخفض"
          value={discountPrice}
          onChange={(e) => setDiscountPrice(e.target.value)}
        />
      </Grid>
    </Grid>
  );
}
