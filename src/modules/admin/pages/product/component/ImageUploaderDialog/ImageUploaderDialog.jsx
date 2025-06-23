import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  IconButton,
  LinearProgress,
  Stack,
} from "@mui/material";
import { Delete } from "@mui/icons-material";

export default function ImageUploaderDialog({
  open,
  onClose,
  onSubmit,
  images,
  setImages,
}) {
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      file,
      name: file.name,
      progress: Math.floor(Math.random() * 100),
      url: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...newImages]);
  };

  const handleDeleteImage = (name) => {
    setImages(images.filter((img) => img.name !== name));
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>رفع صور اللون</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <Button variant="contained" component="label">
            اختر صور
            <input hidden multiple type="file" onChange={handleFileChange} />
          </Button>

          {images.length === 0 && (
            <Typography color="text.secondary">
              لا توجد صور مرفوعة لهذا اللون بعد.
            </Typography>
          )}

          {images.map((img, index) => (
            <Box
              key={index}
              display="flex"
              alignItems="center"
              gap={2}
              border={"1px solid #ccc"}
              p={1}
              borderRadius={1}
            >
              <img
                src={img.url || URL.createObjectURL(img.file)}
                alt={img.name}
                width={60}
                height={60}
                style={{ objectFit: "cover", borderRadius: 4 }}
              />
              <Typography flex={1}>{img.name}</Typography>
              <LinearProgress
                variant="determinate"
                value={img.progress || 100}
                sx={{ flex: 1 }}
              />
              <IconButton onClick={() => handleDeleteImage(img.name)}>
                <Delete />
              </IconButton>
            </Box>
          ))}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>إلغاء</Button>
        <Button
          variant="contained"
          onClick={() => {
            onSubmit(images);
          }}
          disabled={images.length === 0}
        >
          حفظ الصور
        </Button>
      </DialogActions>
    </Dialog>
  );
}
