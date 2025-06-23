// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { getColumn } from "../../../../../../columns/order";
// import DataTable from "../../../../../../components/shared/DataTable/DataTable";
// import { useGetOrder } from "../../../../../../services/sendOrder/useSendOrder";
// import DeleteDialog from "../../../../shared/DeleteDialog/DeleteDialog";
// // import DeleteDialog from "../../../../../../components/shared/DeleteDialog"; // adjust path as needed

// function TableOrder() {
//   const { data: dataOrder, isLoading, refetch } = useGetOrder();
//   const dataOrders = dataOrder?.data || [];
//   const navigate = useNavigate();

//   const [openDialog, setOpenDialog] = useState(false);
//   const [selectedId, setSelectedId] = useState(null);

//   const handleOpenDelete = (id) => {
//     setSelectedId(id);
//     setOpenDialog(true);
//   };

//   const handleDelete = async () => {
//     setOpenDialog(false);
//   };

//   const columns = getColumn(navigate, handleOpenDelete);

//   if (isLoading) return <div>جاري التحميل...</div>;

//   return (
//     <div>
//       <DataTable
//         columns={columns}
//         data={Array.isArray(dataOrders) ? dataOrders : []}
//       />

//       <DeleteDialog
//         open={openDialog}
//         setOpen={setOpenDialog}
//         handleDelete={handleDelete}
//       />
//     </div>
//   );
// }

// export default TableOrder;

import React, { useState } from "react";
import { useGetOrder } from "../../../../../../services/sendOrder/useSendOrder";
import { getColumn } from "../../../../../../columns/order";
import DataTable from "../../../../../../components/shared/DataTable/DataTable";
import DeleteDialog from "../../../../shared/DeleteDialog/DeleteDialog";
import { useNavigate } from "react-router-dom";

function TableOrder() {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const { data: dataOrder, isLoading, refetch } = useGetOrder(page);
  const dataOrders = dataOrder?.data || [];
  const paginationMeta = dataOrder?.meta || {};

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleOpenDelete = (id) => {
    setSelectedId(id);
    setOpenDialog(true);
  };

  const handleDelete = async () => {
    setOpenDialog(false);
    await refetch();
  };

  const columns = getColumn(navigate, handleOpenDelete);

  if (isLoading) return <div>جاري التحميل...</div>;

  return (
    <>
      <DataTable
        columns={columns}
        data={dataOrders}
        paginationMeta={paginationMeta}
        onPageChange={(newPage) => setPage(newPage)}
      />

      <DeleteDialog
        open={openDialog}
        setOpen={setOpenDialog}
        handleDelete={handleDelete}
      />
    </>
  );
}

export default TableOrder;
