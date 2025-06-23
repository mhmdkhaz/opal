import { Avatar, Box, Chip, IconButton, Tooltip } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";

export const getColumns = ({ onDelete, onEdit }) => {
  const columns = [
    {
      key: "images_url",
      header: "صورة",
      render: (row) => (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Avatar
            src={row.images_url?.[0]}
            alt={row.name}
            sx={{ width: 56, height: 56 }}
            variant="rounded"
          />
        </Box>
      ),
      width: "80px",
    },
    {
      key: "name",
      header: "الاسم",
    },
    {
      key: "description",
      header: "الوصف",
    },
    {
      key: "price",
      header: "السعر",
      render: (row) => `$${row.price.toFixed(2)}`,
    },
    {
      key: "price_after_discount",
      header: "السعر بعد الخصم",
      render: (row) => `$${row.price_after_discount?.toFixed(2) || "-"}`,
    },
    {
      key: "actions",
      header: "الخيارات",
      render: (row) => (
        <Box>
          <IconButton color="primary" onClick={() => onEdit(row.id)}>
            <EditIcon />
          </IconButton>
          <IconButton color="error" onClick={() => onDelete(row.id)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
      align: "center",
    },
  ];

  return columns;
};
