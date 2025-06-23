import { Box, IconButton, Tooltip } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";

export const getColumns = ({ onDelete, onEdit }) => {
  const columns = [
    {
      key: "name_ar",
      header: "الاسم بالعربي",
      render: (row) => row.name?.ar || "-",
    },
    {
      key: "name_en",
      header: "الاسم بالإنجليزي",
      render: (row) => row.name?.en || "-",
    },
    {
      key: "image",
      header: "الصورة",
      render: (row) => (
        <Box>
          {row.image ? (
            <Box
              component="img"
              src={row.image}
              alt="صورة"
              sx={{
                width: 50,
                height: 50,
                objectFit: "cover",
                borderRadius: 1,
              }}
            />
          ) : (
            "-"
          )}
        </Box>
      ),
    },
    {
      key: "actions",
      header: "الخيارات",
      render: (row) => (
        <Box display="flex" gap={1} justifyContent="center">
          <Tooltip title="تعديل">
            <IconButton color="primary" onClick={() => onEdit(row)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="حذف">
            <IconButton color="error" onClick={() => onDelete(row.id)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      ),
      align: "center",
    },
  ];

  return columns;
};
