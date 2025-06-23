import { Button, Stack, IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";

export const getColumn = (navigate, handleOpenDelete) => {
  const columns = [
    { key: "order_number", header: "رقم الطلب" },
    { key: "name", header: "اسم الزبون" },
    { key: "phone", header: "رقم الهاتف" },
    { key: "total", header: "مجموع الفاتورة" },
    { key: "local_status", header: "حالة الطلب" },
    {
      key: "created_at",
      header: "تاريخ الطلب",
      render: (row) => {
        const date = new Date(row.created_at);
        return `${date.toLocaleDateString("en")} - ${date.toLocaleTimeString(
          "en",
          { hour: "2-digit", minute: "2-digit" }
        )}`;
      },
    },
    {
      header: "الإجراءات",
      render: (row) => (
        <Stack direction="row" gap={2} flex justifyContent={"flex-end"}>
          <IconButton
            sx={{ background: "#792A86", color: "#fff" }}
            onClick={() => navigate(`/admin/detailsOrder/${row.id}`)}
          >
            <VisibilityIcon />
          </IconButton>
          <IconButton
            sx={{ background: "#792A86", color: "#fff" }}
            onClick={() => handleOpenDelete(row.id)}
          >
            <DeleteIcon />
          </IconButton>
        </Stack>
      ),
    },
  ];

  return columns;
};
