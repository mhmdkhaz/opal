import React, { useState } from "react";
import { Box, Typography, Paper } from "@mui/material";
import { getColumns } from "../../../../../../columns/product";
import TableInfo from "../../../../shared/tableInfo/TableInfo";
import {
  useDeleteProduct,
  useGetProduct,
} from "../../../../../../services/product/useProducts";
import DeleteDialog from "../../../../shared/DeleteDialog/DeleteDialog";
import { useNavigate } from "react-router-dom";

const ProductManager = () => {
  const navigate = useNavigate();

  const { data: dataAllProduct } = useGetProduct();
  const products = dataAllProduct?.data || [];

  const deleteProduct = useDeleteProduct();

  const [pagination, setPagination] = useState({
    rowsPerPage: 10,
    currentPage: 0,
  });

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const handleDeleteClick = (id) => {
    setSelectedProductId(id);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    deleteProduct.mutate(selectedProductId);
    setDeleteDialogOpen(false);
    setSelectedProductId(null);
  };

  const handleEdit = (id) => {
    navigate(`/admin/product/add?id=${id}`);
  };

  const columns = getColumns({
    onEdit: handleEdit,
    onDelete: handleDeleteClick,
  });

  return (
    <Box dir="rtl" p={3}>
      <Typography variant="h4" gutterBottom>
        المنتجات
      </Typography>

      <Paper elevation={2} sx={{ mb: 3 }}>
        <TableInfo columns={columns} rows={products} />
      </Paper>

      <DeleteDialog
        open={deleteDialogOpen}
        setOpen={setDeleteDialogOpen}
        handleDelete={handleConfirmDelete}
      />
    </Box>
  );
};

export default ProductManager;
