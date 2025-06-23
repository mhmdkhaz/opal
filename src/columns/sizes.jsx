import { Box, IconButton, Tooltip, TextField, Typography } from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";

export const getColumnsSizes = ({ onDelete, onInputChange }) => {
  const columns = [
    {
      header: "القياس",
      render: (row) => (
        <Typography fontWeight="bold">
          {row.name?.ar || row.local_name || row.size}
        </Typography>
      ),
    },
    {
      header: "طول القطعة",
      render: (row) => (
        <TextField
          size="small"
          value={row.height || ""}
          onChange={(e) => onInputChange(row.id, "height", e.target.value)}
        />
      ),
    },
    {
      header: "قياس الصدر",
      render: (row) => (
        <TextField
          size="small"
          value={row.chest_size || ""}
          onChange={(e) => onInputChange(row.id, "chest_size", e.target.value)}
        />
      ),
    },
    {
      header: "الخيارات",
      render: (row) => (
        <Box display="flex" gap={1} justifyContent="center">
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
