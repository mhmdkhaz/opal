import React, { useMemo, useState } from "react";
import {
  Grid,
  Button,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import TableInfo from "../../../../shared/tableInfo/TableInfo";
import { getColumnsColor } from "../../../../../../columns/color";
import { useGetColors } from "../../../../../../services/colors/useColors";
import ImageUploaderDialog from "../ImageUploaderDialog/ImageUploaderDialog";

export default function ColorSection({ colors, setColors }) {
  const [selectedColor, setSelectedColor] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [activeColorId, setActiveColorId] = useState(null);
  const { data, isLoading } = useGetColors({ language: "ar" });
  const [tempImages, setTempImages] = useState([]);

  const handleAddColor = () => {
    if (!selectedColor) return;
    const color = data?.data?.find((c) => c.id === selectedColor);
    if (color) {
      setColors([...colors, { color, images: [] }]);

      setSelectedColor("");
    }
  };

  const handleDelete = (id) => {
    setColors(colors.filter((c) => c.color.id !== id));
  };

  // console.log(activeColorId);

  const handleOpenDialog = (colorId) => {
    setActiveColorId(colorId.id);
    setTempImages(colorId.images || []);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setActiveColorId(null);
  };

  // const handleSubmitImages = (images) => {
  //   setColors((prevColors) =>
  //     prevColors.map((entry) =>
  //       entry.color.id === activeColorId ? { ...entry, images } : entry
  //     )
  //   );
  //   handleCloseDialog();
  // };

  // const handleSubmitImages = (images) => {
  //   setColors((prevColors) =>
  //     prevColors.map((entry) =>
  //       entry.color.id === activeColorId
  //         ? {
  //             ...entry,
  //             images: [...entry.images, ...images],
  //             images_url: [
  //               ...(entry.images_url || []),
  //               ...images.map(
  //                 (img) => img.url || URL.createObjectURL(img.file)
  //               ),
  //             ],
  //           }
  //         : entry
  //     )
  //   );
  //   handleCloseDialog();
  // };
  // const handleSubmitImages = (images) => {
  //   const newImages = tempImages.filter((img) => img.file);

  //   setColors((prevColors) =>
  //     prevColors.map((entry) =>
  //       entry.color.id === activeColorId
  //         ? { ...entry, images: [...entry.images, ...newImages] }
  //         : entry
  //     )
  //   );

  //   handleCloseDialog();
  // };

  const handleSubmitImages = (newImages) => {
    if (!Array.isArray(colors)) {
      console.error("Colors is not an array:", colors);
      return;
    }

    if (!activeColorId) {
      console.error("No active color selected");
      return;
    }

    const updatedColors = colors.map((entry) =>
      entry.color?.id === activeColorId
        ? {
            ...entry,
            images: newImages.filter((img) => img.file),
            images_url: newImages.map(
              (img) => img.url || URL.createObjectURL(img.file)
            ),
          }
        : entry
    );

    console.log("Updated colors:", updatedColors);
    setColors(updatedColors);
    handleCloseDialog();
  };

  const handleDeleteImage = (colorId, imageName) => {
    setColors((prevColors) =>
      prevColors.map((entry) =>
        entry.color.id === colorId
          ? {
              ...entry,
              images: entry.images.filter((img) => img.name !== imageName),
            }
          : entry
      )
    );
  };

  // const selectedImages = useMemo(() => {
  //   return colors.find((c) => c.color.id === activeColorId)?.images || [];
  // }, [colors, activeColorId]);

  const columnsColor = getColumnsColor({
    onEdit: handleOpenDialog,
    onDelete: handleDelete,
    onDeleteImage: handleDeleteImage,
  });

  return (
    <>
      <Typography variant="h6" gutterBottom>
        الألوان
      </Typography>

      <Grid container spacing={2} alignItems="center" mb={2}>
        <Grid item xs={8} md={4}>
          <FormControl fullWidth>
            <InputLabel>اختر اللون</InputLabel>
            <Select
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              label="اختر اللون"
            >
              {data?.data?.map((color) => (
                <MenuItem key={color.id} value={color.id}>
                  {color.name.ar}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            onClick={handleAddColor}
            startIcon={<Add />}
            disabled={isLoading || !selectedColor}
          >
            إضافة
          </Button>
        </Grid>
      </Grid>

      <TableInfo
        columns={columnsColor}
        rows={colors.map((c) => ({
          ...c.color,
          id: c.color?.id || c.id,
          local_name: c.color?.name?.ar || c.color,
          images: c.images || c.images_url || [],
          images_url:
            c.images_url || c.images?.map((img) => img.url || img) || [],
        }))}
      />

      {/* <ImageUploaderDialog
        open={openDialog}
        onClose={handleCloseDialog}
        onSubmit={() => handleSubmitImages(selectedImages)}
        images={selectedImages}
        setImages={(newImages) => {
          setColors((prevColors) =>
            prevColors.map((entry) =>
              entry.color.id === activeColorId
                ? { ...entry, images: newImages }
                : entry
            )
          );
        }}
      /> */}

      <ImageUploaderDialog
        open={openDialog}
        onClose={handleCloseDialog}
        onSubmit={(images) => {
          if (!Array.isArray(images)) {
            console.error(images);
            return;
          }
          handleSubmitImages(images);
        }}
        images={tempImages || []}
        setImages={setTempImages}
      />
    </>
  );
}
