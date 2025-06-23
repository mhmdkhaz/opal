import React, { useState, useEffect } from "react";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

const MainImageUploader = ({
  images,
  setImages,
  initialImages = [],
  error,
}) => {
  const [previewUrls, setPreviewUrls] = useState([]);

  useEffect(() => {
    if (initialImages && initialImages.length > 0) {
      setPreviewUrls(initialImages);
    }
  }, [initialImages]);

  // const handleImageChange = (e) => {
  //   const files = Array.from(e.target.files);
  //   const newImages = files.map((file) => ({
  //     file,
  //     preview: URL.createObjectURL(file),
  //   }));

  //   setImages([...images, ...newImages]);
  //   setPreviewUrls([...previewUrls, ...newImages.map((img) => img.preview)]);
  // };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const newImage = {
      file,
      preview: URL.createObjectURL(file),
    };

    setImages([newImage]); // نحتفظ بصورة واحدة فقط
    setPreviewUrls([newImage.preview]);
  };

  const handleRemoveImage = (index) => {
    const newImages = [...images];
    const newPreviews = [...previewUrls];

    newImages.splice(index, 1);
    newPreviews.splice(index, 1);

    setImages(newImages);
    setPreviewUrls(newPreviews);
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        الصور الرئيسية
      </Typography>
      {error && (
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      )}
      <Grid container spacing={2}>
        {previewUrls.map((url, index) => (
          <Grid item xs={4} key={index}>
            <Box position="relative">
              <img
                src={url}
                alt={`preview-${index}`}
                style={{ width: "100%", height: "150px", objectFit: "cover" }}
              />
              <IconButton
                onClick={() => handleRemoveImage(index)}
                style={{ position: "absolute", top: 0, right: 0, color: "red" }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </Grid>
        ))}
        <Grid item xs={4}>
          <label htmlFor="main-image-upload">
            <Box
              sx={{
                width: "100%",
                height: "150px",
                border: "2px dashed #ccc",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                "&:hover": {
                  borderColor: "primary.main",
                },
              }}
            >
              <AddPhotoAlternateIcon fontSize="large" color="action" />
            </Box>
          </label>
          <input
            id="main-image-upload"
            type="file"
            accept="image/*"
            // multiple
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default MainImageUploader;
