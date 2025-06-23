// import React from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   TablePagination,
//   TextField,
//   Box,
//   InputAdornment,
//   Typography,
// } from "@mui/material";
// import { Search } from "@mui/icons-material";

// export default function DataTable({ columns, data }) {
//   const [page, setPage] = React.useState(0);
//   const [rowsPerPage, setRowsPerPage] = React.useState(10);
//   const [searchText, setSearchText] = React.useState("");

//   const filteredData = data.filter((row) =>
//     columns.some((col) => {
//       const value = col.render ? col.render(row) : row[col.key];
//       return String(value).toLowerCase().includes(searchText.toLowerCase());
//     })
//   );

//   return (
//     <Paper elevation={3} sx={{ overflow: "hidden", borderRadius: 2 }}>
//       <Box sx={{ p: 2, backgroundColor: "#f9fafb" }}>
//         <TextField
//           fullWidth
//           variant="outlined"
//           size="small"
//           placeholder="ابحث..."
//           value={searchText}
//           onChange={(e) => setSearchText(e.target.value)}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <Search />
//               </InputAdornment>
//             ),
//           }}
//           sx={{
//             backgroundColor: "white",
//             borderRadius: 1,
//             boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
//           }}
//         />
//       </Box>

//       <TableContainer sx={{ maxHeight: 500 }}>
//         <Table stickyHeader>
//           <TableHead>
//             <TableRow>
//               {columns.map((col) => (
//                 <TableCell
//                   key={col.key}
//                   sx={{
//                     backgroundColor: "#ececec",
//                     fontWeight: "bold",
//                     fontSize: "14px",
//                   }}
//                 >
//                   {col.header}
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableHead>

//           <TableBody>
//             {filteredData.length === 0 ? (
//               <TableRow>
//                 <TableCell colSpan={columns.length}>
//                   <Typography
//                     variant="body2"
//                     align="center"
//                     sx={{ py: 4, color: "text.secondary" }}
//                   >
//                     لا توجد بيانات مطابقة لبحثك.
//                   </Typography>
//                 </TableCell>
//               </TableRow>
//             ) : (
//               filteredData
//                 .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                 .map((row, index) => (
//                   <TableRow key={index} hover>
//                     {columns.map((col) => (
//                       <TableCell key={col.key}>
//                         {col.render ? col.render(row) : row[col.key]}
//                       </TableCell>
//                     ))}
//                   </TableRow>
//                 ))
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "flex-end",
//           alignItems: "center",
//           px: 2,
//           py: 1,
//           backgroundColor: "#f9fafb",
//         }}
//       >
//         <TablePagination
//           rowsPerPageOptions={[5, 10, 25, 50]}
//           component="div"
//           count={filteredData.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           labelRowsPerPage="عدد الصفوف:"
//           labelDisplayedRows={({ from, to, count }) =>
//             `${from}-${to} من ${count !== -1 ? count : `أكثر من ${to}`}`
//           }
//           onPageChange={(_, newPage) => setPage(newPage)}
//           onRowsPerPageChange={(e) => {
//             setRowsPerPage(parseInt(e.target.value, 10));
//             setPage(0);
//           }}
//         />
//       </Box>

//       {/* <TableContainer sx={{ maxHeight: 500 }}>
//         <Table stickyHeader>
//           <TableHead>
//             <TableRow>
//               {columns.map((col) => (
//                 <TableCell
//                   key={col.key}
//                   sx={{
//                     backgroundColor: "#ececec",
//                     fontWeight: "bold",
//                     fontSize: "14px",
//                   }}
//                 >
//                   {col.header}
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableHead>

//           <TableBody>
//             {filteredData.length === 0 ? (
//               <TableRow>
//                 <TableCell colSpan={columns.length}>
//                   <Typography
//                     variant="body2"
//                     align="center"
//                     sx={{ py: 4, color: "text.secondary" }}
//                   >
//                     لا توجد بيانات مطابقة لبحثك.
//                   </Typography>
//                 </TableCell>
//               </TableRow>
//             ) : (
//               filteredData
//                 .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                 .map((row, index) => (
//                   <TableRow key={index} hover>
//                     {columns.map((col) => (
//                       <TableCell key={col.key}>
//                         {col.render ? col.render(row) : row[col.key]}
//                       </TableCell>
//                     ))}
//                   </TableRow>
//                 ))
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer> */}

//       {/* <Box
//         sx={{
//           display: "flex",
//           justifyContent: "flex-end",
//           alignItems: "center",
//           px: 2,
//           py: 1,
//           backgroundColor: "#f9fafb",
//         }}
//       >
//         <TablePagination
//           rowsPerPageOptions={[5, 10, 25]}
//           component="div"
//           count={filteredData.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={(_, newPage) => setPage(newPage)}
//           onRowsPerPageChange={(e) => {
//             setRowsPerPage(parseInt(e.target.value, 10));
//             setPage(0);
//           }}
//         />
//       </Box> */}
//     </Paper>
//   );
// }

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  InputAdornment,
  Pagination,
  Box,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function DataTable({
  columns = [],
  data = [],
  paginationMeta = {},
  onPageChange = () => {},
  showSearch = true,
}) {
  const [searchText, setSearchText] = useState("");

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const filteredData = data.filter((row) =>
    columns.some((col) => {
      const value = col.render ? col.render(row) : row[col.key];
      return value?.toString().toLowerCase().includes(searchText.toLowerCase());
    })
  );

  return (
    <Paper elevation={3} sx={{ overflow: "hidden", borderRadius: 2 }}>
      {showSearch && (
        <Box sx={{ p: 2, backgroundColor: "#f9fafb" }}>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            placeholder="ابحث..."
            value={searchText}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
      )}

      <TableContainer sx={{ maxHeight: 500 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell
                  key={col.key}
                  sx={{
                    backgroundColor: "#ececec",
                    fontWeight: "bold",
                    fontSize: "14px",
                  }}
                >
                  {col.header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length}>
                  <Typography
                    variant="body2"
                    align="center"
                    sx={{ py: 4, color: "text.secondary" }}
                  >
                    لا توجد بيانات مطابقة لبحثك.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              filteredData.map((row, index) => (
                <TableRow key={index} hover>
                  {columns.map((col) => (
                    <TableCell key={col.key}>
                      {col.render ? col.render(row) : row[col.key]}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* {paginationMeta?.total > paginationMeta?.per_page && ( */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          py: 2,
          direction: "ltr",
        }}
      >
        <Pagination
          count={Math.ceil(paginationMeta.total / paginationMeta.per_page)}
          page={paginationMeta.current_page}
          onChange={(event, value) => onPageChange(value)}
          color="primary"
        />
      </Box>
      {/* )} */}
    </Paper>
  );
}
