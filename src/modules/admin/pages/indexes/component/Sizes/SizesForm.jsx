import React, { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import {
  usePostSizes,
  useUpdateSizes,
} from "../../../../../../services/sizes/useSizes";

const SizesForm = ({ open, handleClose, initialValue = "" }) => {
  const [sizeValue, setSizeValue] = React.useState(initialValue);

  const addSize = usePostSizes();
  const updateSize = useUpdateSizes();

  useEffect(() => {
    setSizeValue(initialValue || "");
  }, [initialValue]);

  const handleSubmit = () => {
    if (!sizeValue.trim()) return alert("الرجاء إدخال المقاس");

    const payload = {
      name: {
        ar: sizeValue,
        en: sizeValue,
      },
    };

    handleClose();

    if (initialValue) {
      updateSize.mutate({ id: initialValue.id, data: payload });
    } else {
      addSize.mutate({ data: payload });
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} dir="rtl">
      <DialogTitle>{initialValue ? "تعديل المقاس" : "إضافة مقاس"}</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          autoFocus
          label="المقاس"
          value={sizeValue?.local_name}
          onChange={(e) => setSizeValue(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          إلغاء
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          {initialValue ? "حفظ" : "إضافة"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SizesForm;
