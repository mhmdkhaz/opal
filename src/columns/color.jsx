import { Box, Chip, IconButton, Tooltip, Avatar, Stack } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { ColorSwatch } from "../modules/admin/pages/indexes/styled/StyledComponents";

export const getColumnsColor = ({ onDelete, onEdit, onDeleteImage }) => {
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
    },
    {
      header: "صور اللون",
      render: (row) => (
        <Stack
          direction="row"
          spacing={1}
          justifyContent="center"
          flexWrap="wrap"
        >
          {(row.images_url || row.images)?.map((img, index) => {
            const imgUrl =
              typeof img === "string"
                ? img
                : img.url || URL.createObjectURL(img.file);
            return (
              <Box key={index} position="relative">
                <Avatar
                  src={imgUrl}
                  variant="rounded"
                  sx={{ width: 48, height: 48 }}
                />
                <IconButton
                  size="small"
                  onClick={() => onDeleteImage(row.id, img.name || img)}
                  sx={{
                    position: "absolute",
                    top: -8,
                    right: -8,
                    bgcolor: "white",
                    border: "1px solid #ccc",
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            );
          })}
        </Stack>
      ),
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
