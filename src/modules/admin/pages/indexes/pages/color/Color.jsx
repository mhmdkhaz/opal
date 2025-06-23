import React, { useState } from "react";
import { Box, Paper } from "@mui/material";
import ColorForm from "../../component/Color/colorForm/ColorForm";
import ColorTable from "../../component/Color/colorTable/ColorTable";
import DeleteDialog from "../../../../shared/DeleteDialog/DeleteDialog";
import {
  useDeleteColors,
  useGetColors,
} from "../../../../../../services/colors/useColors";

const ColorManager = () => {
  const [newColor, setNewColor] = useState({
    name: { ar: "", en: "" },
  });

  const [editingColor, setEditingColor] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [colorToDeleteId, setColorToDeleteId] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");

  const deleteColors = useDeleteColors();
  const { data: dataColors } = useGetColors("en");

  console.log(dataColors);

  const confirmDelete = (colorId) => {
    setColorToDeleteId(colorId);
    setOpenDeleteDialog(true);
  };

  const handleDelete = () => {
    deleteColors.mutate({ id: colorToDeleteId });
    setOpenDeleteDialog(false);
  };

  const filteredColors = dataColors?.data?.filter((color) =>
    color.local_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box
      dir="rtl"
      display="flex"
      flexDirection={{ xs: "column", md: "row" }}
      gap={4}
      p={4}
      component={Paper}
      elevation={3}
      sx={{
        backgroundColor: "#f8f9fa",
        borderRadius: 3,
        overflow: "hidden",
      }}
    >
      <ColorForm
        newColor={newColor}
        setNewColor={setNewColor}
        editingColor={editingColor}
        setEditingColor={setEditingColor}
      />

      <ColorTable
        filteredColors={filteredColors}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        startEditing={setEditingColor}
        confirmDelete={confirmDelete}
      />

      <DeleteDialog
        open={openDeleteDialog}
        setOpen={setOpenDeleteDialog}
        handleDelete={handleDelete}
      />
    </Box>
  );
};

export default ColorManager;
