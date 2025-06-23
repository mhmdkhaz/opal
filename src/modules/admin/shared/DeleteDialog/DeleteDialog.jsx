// import React from "react";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   Box,
//   Typography,
// } from "@mui/material";
// import { Delete as DeleteIcon } from "@mui/icons-material";
// import { Transition } from "../../pages/indexes/styled/StyledComponents";

// const DeleteDialog = ({ open, setOpen, handleDelete }) => {
//   return (
//     <Dialog
//       open={open}
//       TransitionComponent={Transition}
//       keepMounted
//       onClose={() => setOpen(false)}
//     >
//       <DialogTitle>
//         <Box display="flex" alignItems="center" gap={1}>
//           <DeleteIcon color="error" />
//           تأكيد الحذف
//         </Box>
//       </DialogTitle>
//       <DialogContent>
//         <Typography>هل أنت متأكد من أنك تريد الحذف</Typography>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={() => setOpen(false)}>إلغاء</Button>
//         <Button
//           onClick={handleDelete}
//           color="error"
//           variant="contained"
//           startIcon={<DeleteIcon />}
//         >
//           حذف
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default DeleteDialog;

import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  styled,
  keyframes,
  Paper,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Warning as WarningIcon,
} from "@mui/icons-material";

// Custom animations
const shake = keyframes`
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
  20%, 40%, 60%, 80% { transform: translateX(5px); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Styled components
const AnimatedDialog = styled(Dialog)({
  "& .MuiPaper-root": {
    borderRadius: "12px",
    overflow: "hidden",
    border: "2px solid #ffebee",
  },
});

const DangerIconWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "80px",
  height: "80px",
  borderRadius: "50%",
  backgroundColor: theme.palette.error.light,
  margin: "0 auto 16px",
  animation: `${pulse} 2s infinite`,
  "& svg": {
    fontSize: "48px",
    color: theme.palette.error.contrastText,
  },
}));

const StyledDialogTitle = styled(DialogTitle)({
  backgroundColor: "#ffebee",
  textAlign: "center",
  padding: "16px",
  marginBottom: "15px",
  "& .MuiTypography-root": {
    fontWeight: "bold",
    color: "#d32f2f",
  },
});

const StyledDialogActions = styled(DialogActions)({
  padding: "16px 24px",
  justifyContent: "space-between",
  borderTop: "1px solid #eeeeee",
});

const CancelButton = styled(Button)(({ theme }) => ({
  "&:hover": {
    backgroundColor: theme.palette.grey[100],
    animation: `${shake} 0.5s`,
  },
}));

const DeleteButton = styled(Button)(({ theme }) => ({
  boxShadow: `0 2px 4px ${theme.palette.error.light}`,
  "&:hover": {
    boxShadow: `0 4px 8px ${theme.palette.error.light}`,
  },
}));

const DeleteDialog = ({ open, setOpen, handleDelete, itemName }) => {
  return (
    <AnimatedDialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <StyledDialogTitle id="alert-dialog-title">
        <Typography variant="h6">تأكيد عملية الحذف</Typography>
      </StyledDialogTitle>

      <DialogContent sx={{ textAlign: "center", py: 4 }}>
        <DangerIconWrapper>
          <WarningIcon fontSize="inherit" />
        </DangerIconWrapper>

        <Typography variant="body1" gutterBottom>
          أنت على وشك حذف {itemName || "هذا العنصر"}
        </Typography>

        <Paper
          elevation={0}
          sx={{
            backgroundColor: "#fff8e1",
            padding: 2,
            borderRadius: 2,
            marginTop: 2,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            ⚠️ سيتم حذف هذا العنصر بشكل دائم ولن تتمكن من استعادته لاحقًا.
          </Typography>
        </Paper>
      </DialogContent>

      <StyledDialogActions>
        <CancelButton
          onClick={() => setOpen(false)}
          variant="outlined"
          color="inherit"
        >
          إلغاء
        </CancelButton>
        <DeleteButton
          onClick={() => {
            handleDelete();
            setOpen(false);
          }}
          color="error"
          variant="contained"
          startIcon={<DeleteIcon />}
        >
          تأكيد الحذف
        </DeleteButton>
      </StyledDialogActions>
    </AnimatedDialog>
  );
};

export default DeleteDialog;
