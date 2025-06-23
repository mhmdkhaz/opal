import React from "react";
import { Box, Typography, TextField, Button, Chip } from "@mui/material";
import { Palette as PaletteIcon, Add as AddIcon } from "@mui/icons-material";
import TableInfo from "../../../../../shared/tableInfo/TableInfo";
import { getColumnsAllColor } from "../../../../../../../columns/allColor";

const ColorTable = ({
  filteredColors,
  searchTerm,
  setSearchTerm,
  startEditing,
  confirmDelete,
}) => {
  const columns = getColumnsAllColor({
    onEdit: (row) => startEditing(row),
    onDelete: (id) => confirmDelete(id),
  });

  return (
    <Box flexGrow={1}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography
          variant="h5"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            color: "text.primary",
          }}
        >
          <PaletteIcon fontSize="medium" />
          مكتبة الألوان
        </Typography>
        <TextField
          size="small"
          placeholder="بحث..."
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: 250 }}
        />
      </Box>

      {/* Table Data */}
      <TableInfo columns={columns} rows={filteredColors} />
    </Box>
  );
};

export default ColorTable;
