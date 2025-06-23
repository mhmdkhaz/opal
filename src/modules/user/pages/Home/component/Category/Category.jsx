import React, { useEffect } from "react";
import { Box, Stack, Typography, Avatar, Container } from "@mui/material";

// import style
import { Styles } from "./Category.styles";

import { useCategoriesClient } from "../../../../../../services/categories/useCategories";
import { useGetLanguage } from "../../../../../../hooks/useGetLanguage";

const CategoryCarousel = () => {
  const language = useGetLanguage();

  const { data, isLoading, isError, error, refetch } =
    useCategoriesClient(language);

  console.log(data);

  useEffect(() => {
    refetch();
  }, [language]);

  return (
    <>
      <Container maxWidth="xl">
        <Box sx={Styles.root}>
          {data?.map((category, index) => (
            <Box key={index}>
              <Stack alignItems="center" spacing={1} sx={Styles.stack}>
                <Box component="img" src={category.image} sx={Styles.avatar} />
              </Stack>
              <Typography variant="body2" sx={Styles.title}>
                {category.local_name}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </>
  );
};

export default CategoryCarousel;
