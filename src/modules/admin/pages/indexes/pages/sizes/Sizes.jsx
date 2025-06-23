import React, { useState } from "react";
import { Box, Button, Typography, Paper } from "@mui/material";
import { ButtonMain } from "../../styled/StyledComponents";
import TableInfo from "../../../../shared/tableInfo/TableInfo";
// import { getColumnsSizes } from "../../../../../../columns/sizes";
import {
  useGetSizes,
  useDeleteSizes,
} from "../../../../../../services/sizes/useSizes";
import SizesForm from "../../component/Sizes/SizesForm";
import DeleteDialog from "../../../../shared/DeleteDialog/DeleteDialog";
import { getColumnsAllSizes } from "../../../../../../columns/allSize";

const SizeManager = () => {
  const { data: sizes, isLoading, refetch } = useGetSizes();
  const deleteSize = useDeleteSizes();

  const [open, setOpen] = useState(false);
  const [initialValue, setInitialValue] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(false);

  const handleOpen = (value = "") => {
    setInitialValue(value);
    setOpen(true);
  };

  const handelEditOpen = (value) => {
    setInitialValue(value);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setInitialValue("");
    setEditingId(null);
  };

  const openDialogDelete = (id) => {
    setDeleteDialogOpen(true);
    setDeleteId(id);
  };

  const handleDelete = () => {
    deleteSize.mutate({ id: deleteId });
    setDeleteDialogOpen(false);
  };

  const columns = getColumnsAllSizes({
    onEdit: (row) => handelEditOpen(row),
    onDelete: (row) => openDialogDelete(row),
  });

  return (
    <Box dir="rtl" p={4} component={Paper} elevation={4}>
      <Typography variant="h6" gutterBottom color="primary" mb={2}>
        الفهارس / المقاسات
      </Typography>

      <Box display="flex" justifyContent="space-between" mb={2}>
        <ButtonMain onClick={() => handleOpen()}>إضافة مقاس</ButtonMain>
      </Box>

      <TableInfo
        loading={isLoading}
        columns={columns}
        rows={sizes?.data || []}
      />

      <SizesForm
        open={open}
        handleClose={handleClose}
        initialValue={initialValue}
        editingId={editingId}
      />

      <DeleteDialog
        open={deleteDialogOpen}
        setOpen={setDeleteDialogOpen}
        handleDelete={handleDelete}
      />
    </Box>
  );
};

export default SizeManager;
