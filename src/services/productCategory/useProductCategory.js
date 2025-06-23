import { useQuery } from "@tanstack/react-query";
import { _productCategoriesApi } from "./productCategories.service";

export const useProductCategories = (language) => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["productCategories", language],
    queryFn: () => _productCategoriesApi.index({ language }),
    refetchOnWindowFocus: false,
  });
  return { data, isLoading, isError, error, refetch };
};
