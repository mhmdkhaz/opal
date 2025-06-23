import { Box, Chip, IconButton, Tooltip, Avatar, Stack } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { ColorSwatch } from "../components/style/colorSwitch";
// import { ColorSwatch } from "../modules/admin/pages/indexes/styled/StyledComponents";

export const getColumnsAllColor = ({ onDelete, onEdit, onDeleteImage }) => {
  const columns = [
    {
      key: "local_name",
      header: "الاسم",
      render: (row) => (
        <Chip
          label={row.local_name || row.color}
          size="small"
          sx={{
            fontFamily: "monospace",
            backgroundColor: "rgba(0,0,0,0.05)",
          }}
        />
      ),
      align: "center",
    },
    {
      key: "color_preview",
      header: "معاينة اللون",
      render: (row) => (
        <ColorSwatch
          sx={{
            backgroundColor: row.color || "#ccc",
            borderRadius: "4px",
            width: "32px",
            height: "32px",
            border: "1px solid #ddd",
          }}
        />
      ),
      align: "center",
    },

    {
      header: "الخيارات",
      render: (row) => (
        <Box display="flex" gap={1} justifyContent="center">
          <Tooltip title="إضافة صور">
            <IconButton color="primary" onClick={() => onEdit(row)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="حذف اللون">
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
