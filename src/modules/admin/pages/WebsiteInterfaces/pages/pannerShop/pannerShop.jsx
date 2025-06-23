import React, { useState, useRef } from "react";
import {
  Box,
  Button,
  CardContent,
  Divider,
  Stack,
  Typography,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Close, Save, AddPhotoAlternate } from "@mui/icons-material";

// استيراد التنسيقات من الملف الجديد
import { StyledCard, BannerPreview, ActionButton } from "./pannerEditor.styles";

const BannerEditor = () => {
  const [image, setImage] = useState(null);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [openTextDialog, setOpenTextDialog] = useState(false);
  const [bannerText, setBannerText] = useState("تعديل الصورة الرئيسية للمتجر");
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleReset = () => {
    setImage(null);
    setBrightness(100);
    setContrast(100);
  };

  return (
    <StyledCard>
      <CardContent>
        <Typography
          variant="h6"
          gutterBottom
          fontWeight="bold"
          color="textPrimary"
        >
          تعديل البانر الاساسي للمتجر
        </Typography>

        <Divider sx={{ my: 2 }} />

        <BannerPreview onClick={() => fileInputRef.current.click()}>
          {image ? (
            <img
              src={image}
              alt="Store Banner"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: `brightness(${brightness}%) contrast(${contrast}%)`,
              }}
            />
          ) : (
            <Stack alignItems="center" spacing={1}>
              <AddPhotoAlternate
                sx={{ fontSize: 48, color: "text.secondary" }}
              />
              <Typography color="text.secondary">اضغط لرفع صورة</Typography>
            </Stack>
          )}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            style={{ display: "none" }}
          />
        </BannerPreview>
      </CardContent>

      <Box p={2} display="flex" justifyContent="space-between">
        <ActionButton
          variant="outlined"
          color="error"
          startIcon={<Close />}
          onClick={handleReset}
        >
          الغاء
        </ActionButton>
        <ActionButton
          variant="contained"
          color="primary"
          startIcon={<Save />}
          disabled={!image}
          sx={{
            background: "linear-gradient(45deg, #1976d2 0%, #2196f3 100%)",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          }}
        >
          حفظ التغييرات
        </ActionButton>
      </Box>

      <Dialog open={openTextDialog} onClose={() => setOpenTextDialog(false)}>
        <DialogTitle>تعديل نص البانر</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            fullWidth
            variant="outlined"
            value={bannerText}
            onChange={(e) => setBannerText(e.target.value)}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenTextDialog(false)}>الغاء</Button>
          <Button onClick={() => setOpenTextDialog(false)} variant="contained">
            حفظ
          </Button>
        </DialogActions>
      </Dialog>
    </StyledCard>
  );
};

export default BannerEditor;
