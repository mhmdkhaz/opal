import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Avatar,
  Paper,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import TableInfo from "../../../../shared/tableInfo/TableInfo";
import { getColumns } from "../../../../../../columns/categories";
import DeleteDialog from "../../../../shared/DeleteDialog/DeleteDialog";
import {
  useCategories,
  useDeleteCategory,
} from "../../../../../../services/categories/useCategories";
import CategoryFormDialog from "../../component/Category/categoryForm/CategoryForm";
import ButtonMain from "../../../../../../components/shared/ButtonMain/ButtonMain";

const CategoryManager = () => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const { data: categoriesData = [], isLoading, refetch } = useCategories("ar");
  const deleteCategory = useDeleteCategory();

  const openAddForm = () => {
    setEditingCategory(null);
    setFormOpen(true);
  };

  const openEditForm = (category) => {
    setEditingCategory(category);
    setFormOpen(true);
  };

  const openDeleteDialog = (category) => {
    setCategoryToDelete(category);
    setDeleteDialogOpen(true);
  };

  const handleDelete = () => {
    deleteCategory.mutate(categoryToDelete);
  };

  const columns = getColumns({
    onEdit: (id) => openEditForm(id),
    onDelete: (id) => openDeleteDialog(id),
  });

  return (
    <Box dir="rtl" p={4}>
      <Typography variant="h6" gutterBottom color="primary" mb={2}>
        الفهارس / الأصناف
      </Typography>

      {/* add new categories */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <ButtonMain onClick={openAddForm}>إضافة صنف</ButtonMain>
      </Box>

      {/* Table Data */}
      <TableInfo columns={columns} rows={categoriesData} />

      <CategoryFormDialog
        open={formOpen}
        onClose={() => setFormOpen(false)}
        initialData={editingCategory}
      />

      {/* confirm delete */}
      <DeleteDialog
        open={deleteDialogOpen}
        setOpen={setDeleteDialogOpen}
        handleDelete={handleDelete}
      />
    </Box>
  );
};

export default CategoryManager;
