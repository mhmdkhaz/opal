// TableInfo.jsx
import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Chip,
  IconButton,
  Tooltip,
  Box,
  Button,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Palette as PaletteIcon,
} from "@mui/icons-material";
import { Zoom } from "@mui/material";
import {
  ColorSwatch,
  GradientHeader,
} from "../../pages/indexes/styled/StyledComponents";
// import { ColorSwatch, GradientHeader } from "../../../styled/";

const TableInfo = ({ columns, rows }) => {
  return (
    <Paper elevation={2} sx={{ overflow: "hidden" }}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((col, idx) => (
              <GradientHeader key={idx} align={col.align || "left"}>
                {col.header}
              </GradientHeader>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.length > 0 ? (
            rows.map((row, rowIndex) => (
              <Zoom in={true} key={row.id || rowIndex}>
                <TableRow
                  hover
                  sx={{
                    "&:nth-of-type(odd)": {
                      backgroundColor: "action.hover",
                    },
                  }}
                >
                  {columns.map((col, colIndex) => (
                    <TableCell key={colIndex} align={col.align || "left"}>
                      {col.render ? col.render(row) : row[col.key]}
                    </TableCell>
                  ))}
                </TableRow>
              </Zoom>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} align="center" sx={{ py: 4 }}>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  gap={1}
                >
                  <PaletteIcon
                    fontSize="large"
                    sx={{ color: "text.disabled" }}
                  />
                  <Typography color="text.secondary">لا توجد عناصر</Typography>
                </Box>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default TableInfo;
