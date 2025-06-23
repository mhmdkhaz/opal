import React, { useState } from "react";
import {
  Grid,
  Button,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import TableInfo from "../../../../shared/tableInfo/TableInfo";
import { getColumnsSizes } from "../../../../../../columns/sizes";
import { useGetSizes } from "../../../../../../services/sizes/useSizes";

export default function SizeSection({ sizes, setSizes }) {
  const [selectedSize, setSelectedSize] = useState("");
  const { data, isLoading } = useGetSizes();

  const handleAddSize = () => {
    if (!selectedSize) return;
    const size = data?.data?.find((s) => s.id === selectedSize);
    if (size && !sizes.find((s) => s.id === size.id)) {
      setSizes([
        ...sizes,
        {
          ...size,
          chest_size: "",
          height: "",
        },
      ]);
      setSelectedSize("");
    }
  };

  const handleDelete = (id) => {
    setSizes(sizes.filter((s) => s.id !== id));
  };

  const handleInputChange = (id, field, value) => {
    setSizes((prev) =>
      prev.map((s) =>
        s.id === id
          ? {
              ...s,
              [field]: value,
            }
          : s
      )
    );
  };

  const columnsSizes = getColumnsSizes({
    onDelete: handleDelete,
    onInputChange: handleInputChange,
  });

  return (
    <>
      <Typography variant="h6" gutterBottom>
        القياس
      </Typography>

      <Grid container spacing={2} alignItems="center" mb={2}>
        <Grid item xs={8} md={4}>
          <FormControl fullWidth>
            <InputLabel>اختر القياس</InputLabel>
            <Select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              label="اختر القياس"
            >
              {data?.data?.map((size) => (
                <MenuItem key={size.id} value={size.id}>
                  {size.name.ar}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            onClick={handleAddSize}
            startIcon={<Add />}
            disabled={isLoading || !selectedSize}
          >
            إضافة
          </Button>
        </Grid>
      </Grid>

      <TableInfo columns={columnsSizes} rows={sizes} />
    </>
  );
}
