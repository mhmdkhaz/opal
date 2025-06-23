import React from "react";
import { Box, TextField, Typography } from "@mui/material";
import { Add as AddIcon, Palette as PaletteIcon } from "@mui/icons-material";
import { ButtonMain } from "../../../styled/StyledComponents";
import {
  usePostColors,
  useUpdateColors,
} from "../../../../../../../services/colors/useColors";

const ColorForm = ({
  newColor,
  setNewColor,
  editingColor,
  setEditingColor,
}) => {
  const postColorMutation = usePostColors();
  const updateColorMutation = useUpdateColors();

  const isEditing = Boolean(editingColor);
  const colorData = isEditing ? editingColor : newColor;
  const idColor = editingColor?.id;

  const handleInputChange = (e) => {
    const value = e.target.value;
    const updatedName = {
      ar: value,
      en: value,
    };

    if (isEditing) {
      setEditingColor((prev) => ({
        ...prev,
        name: updatedName,
      }));
    } else {
      setNewColor((prev) => ({
        ...prev,
        name: updatedName,
      }));
    }
  };

  const handleSubmit = () => {
    const data = { name: colorData.name };
    console.log(idColor);

    isEditing
      ? updateColorMutation.mutate({ id: idColor, data })
      : postColorMutation.mutate({ data });

    if (!isEditing) {
      setNewColor({ name: { ar: "", en: "" } });
    } else {
      setEditingColor(null);
    }
  };

  return (
    <Box
      minWidth={300}
      sx={{
        backgroundColor: "#fff",
        borderRadius: 2,
        p: 3,
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          color: "primary.main",
        }}
      >
        <PaletteIcon fontSize="medium" />
        {isEditing ? "تعديل اللون" : "إضافة لون جديد"}
      </Typography>

      <TextField
        fullWidth
        label="اسم اللون"
        variant="outlined"
        size="medium"
        value={colorData?.name?.ar || ""}
        onChange={handleInputChange}
        sx={{ mb: 3 }}
      />

      <ButtonMain
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        fullWidth
        onClick={handleSubmit}
        disabled={!colorData?.name?.ar?.trim()}
        sx={{ height: 45, fontSize: "1rem" }}
      >
        {isEditing ? "حفظ التعديل" : "إضافة اللون"}
      </ButtonMain>
    </Box>
  );
};

export default ColorForm;
