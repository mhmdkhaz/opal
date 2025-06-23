import React, { useEffect, useRef, useState } from "react";
import {
  Typography,
  CardMedia,
  IconButton,
  Grid,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Close";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

import {
  ContainerBox,
  ImageCard,
  AddImageCard,
  DeleteButtonStyle,
} from "./pannerMain.styles";
import {
  useDeleteSlider,
  useGetSlidersOffer,
  usePostSlider,
} from "../../../../../../services/sliderOffer/useSliderOffer";
import DeleteDialog from "../../../../shared/DeleteDialog/DeleteDialog";

const CarouselEditor = () => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState();

  const { data: sliders, isLoading, refetch } = useGetSlidersOffer();
  const addSlider = usePostSlider();
  const deleteSlider = useDeleteSlider();

  const fileInputRef = useRef();

  const handleAdd = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    addSlider.mutate(
      { data: file },
      {
        onSuccess: () => {
          refetch();
        },
      }
    );
  };

  const handleOpenDelete = (id) => {
    setDeleteDialogOpen(true);
    setDeleteId(id);
  };

  const handleDelete = () => {
    deleteSlider.mutate({ id: deleteId }, { onSuccess: () => refetch() });
  };

  return (
    <ContainerBox>
      <Typography variant="h6" fontWeight="bold" mb={2}>
        تعديل صور الكاروسيل:
      </Typography>

      {isLoading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={2}>
          {sliders?.map((slide) => (
            <Grid item xs={6} sm={4} md={3} key={slide.id}>
              <ImageCard>
                <CardMedia
                  component="img"
                  image={slide.image}
                  alt={`carousel-${slide.id}`}
                  height="140"
                  sx={{ borderRadius: 2, width: "100%" }}
                />
                <IconButton
                  onClick={() => handleOpenDelete(slide.id)}
                  size="small"
                  sx={DeleteButtonStyle}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </ImageCard>
            </Grid>
          ))}

          <Grid item xs={6} sm={4} md={3}>
            <label htmlFor="upload-image">
              <AddImageCard>
                <AddPhotoAlternateIcon fontSize="large" color="action" />
                <Typography color="textSecondary">أضف صورة</Typography>
                <input
                  id="upload-image"
                  type="file"
                  hidden
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleAdd}
                />
              </AddImageCard>
            </label>
          </Grid>
        </Grid>
      )}

      <DeleteDialog
        open={deleteDialogOpen}
        setOpen={setDeleteDialogOpen}
        handleDelete={handleDelete}
      />
    </ContainerBox>
  );
};

export default CarouselEditor;
