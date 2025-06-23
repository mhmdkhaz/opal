import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  Avatar,
} from "@mui/material";
import {
  usePostCategory,
  useUpdateCategory,
} from "../../../../../../../services/categories/useCategories";
import ButtonMain from "../../../../../../../components/shared/ButtonMain/ButtonMain";

const CategoryFormDialog = ({ open, onClose, initialData, refetch }) => {
  const [nameAr, setNameAr] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const addCategory = usePostCategory();
  const updateCategory = useUpdateCategory();

  useEffect(() => {
    if (initialData) {
      setNameAr(initialData.name?.ar || "");
      setNameEn(initialData.name?.en || "");
      setImage(null);
      setImagePreview(initialData.image || ""); // assuming initialData.image is URL
    } else {
      setNameAr("");
      setNameEn("");
      setImage(null);
      setImagePreview("");
    }
  }, [initialData]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    try {
      if (!nameAr || !nameEn) {
        alert("الرجاء ملء جميع الحقول");
        return;
      }

      const formData = new FormData();
      formData.append("name[ar]", nameAr);
      formData.append("name[en]", nameEn);
      formData.append("parent_id", 1);
      if (image) formData.append("image", image);

      if (initialData) {
        formData.append("_method", "put"); // in backend i should to send the method
        updateCategory.mutate({ id: initialData.id, data: formData });
      } else {
        addCategory.mutate(formData);
      }

      onClose();
    } catch (error) {
      console.error("فشل في إرسال النموذج:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" dir="rtl">
      <DialogTitle>{initialData ? "تعديل الصنف" : "إضافة صنف"}</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          <TextField
            label="الاسم بالعربي"
            value={nameAr}
            onChange={(e) => setNameAr(e.target.value)}
            fullWidth
          />
          <TextField
            label="الاسم بالإنجليزية"
            value={nameEn}
            onChange={(e) => setNameEn(e.target.value)}
            fullWidth
          />

          <Box>
            <Typography variant="subtitle1" mb={1}>
              صورة الصنف
            </Typography>
            <Button variant="outlined" component="label">
              {image ? "تغيير الصورة" : "اختيار صورة"}
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageChange}
              />
            </Button>

            {imagePreview && (
              <Box mt={2} display="flex" justifyContent="center">
                <Avatar
                  src={imagePreview}
                  variant="rounded"
                  sx={{ width: 120, height: 120, borderRadius: 2 }}
                />
              </Box>
            )}
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{ display: "flex", justifyContent: "flex-start" }}>
        <ButtonMain
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          fullWidth
        >
          حفظ
        </ButtonMain>
        <Button onClick={onClose}>إلغاء</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CategoryFormDialog;
