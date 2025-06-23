import { Box, IconButton, Tooltip, TextField, Typography } from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";

export const getColumnsAllSizes = ({ onDelete, onInputChange }) => {
  const columns = [
    {
      header: "القياس",
      render: (row) => (
        <Typography fontWeight="bold">
          {row.name?.ar || row.local_name || row.size}
        </Typography>
      ),
      align: "center",
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
