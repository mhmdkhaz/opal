import React from "react";
import { Pagination, Stack } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

function PaginationComponent({ data, page, setPage, language }) {
  const isRTL = language === "ar"; // تحديد الاتجاه بناءً على اللغة

  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={2}
      sx={{
        mt: 4,
        direction: isRTL ? "ltr" : "ltr",
      }}
    >
      <Pagination
        count={data?.meta?.last_page || 1}
        page={page}
        onChange={(event, value) => setPage(value)}
        color="primary"
        siblingCount={1}
        boundaryCount={1}
        shape="rounded"
        showFirstButton
        showLastButton
        sx={{
          "& .MuiPaginationItem-root": {
            fontSize: "16px",
            fontWeight: "bold",
            borderRadius: "8px",
          },
          "& .Mui-selected": {
            backgroundColor: "#1976d2 !important",
            color: "white",
          },
        }}
      />
    </Stack>
  );
}

export default PaginationComponent;
