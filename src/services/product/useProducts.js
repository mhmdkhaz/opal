import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { _productsApi } from "./product.service";
import { useState } from "react";
import { useFilterDataProduct } from "../../store/useFilterDataProduct";
import { showToast } from "../../components/shared/Toast/ToastProvider";
import { useNavigate } from "react-router-dom";

export const useGetAllProduct = (language) => {
  const [page, setPage] = useState(1);
  const {
    getMax,
    getMin,
    getColor,
    getCategoryId,
    getDiscountStore,
    getBaseSellerStore,
  } = useFilterDataProduct();

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: [
      "Product",
      language,
      page,
      getMax(),
      getMin(),
      getColor(),
      getCategoryId(),
      getDiscountStore(),
      getBaseSellerStore(),
    ],
    queryFn: () =>
      _productsApi.index({
        language,
        page,
        getMax,
        getMin,
        getColor,
        getCategoryId,
        getDiscountStore,
        getBaseSellerStore,
      }),
  });

  return { data, isLoading, isError, setPage, page, error, refetch };
};

export const useBaseSeller = (language) => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["BestSellerProduct", language],
    queryFn: () => _productsApi.bestSellerProduct({ language }),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });

  return { data, isLoading, isError, error, refetch };
};

export const useGetProductClient = (language) => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["Product", language],
    queryFn: () =>
      _productsApi.getAllProductClient({
        language,
      }),
  });

  return { data, isLoading, isError, error, refetch };
};

export const useGetProduct = (language) => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["Product", language],
    queryFn: () =>
      _productsApi.getAllProduct({
        language,
      }),
  });

  return { data, isLoading, isError, error, refetch };
};

export const useHasDiscount = (language) => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["DiscountedProducts", language],
    queryFn: () => _productsApi.productDiscount({ language }),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });

  return { data, isLoading, isError, error, refetch };
};

export const useSingleProduct = (id, language) => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["Product", id, language],
    queryFn: () => _productsApi.getInfoSingleProduct({ id, language }),
    enabled: !!id && !!language,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });

  return { data, isLoading, isError, error, refetch };
};

export const usePostProduct = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (formData) => _productsApi.postProduct(formData),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["Product"] });
      showToast("success", "تم الاضافة");
      navigate("/admin/product");
    },
    onError: (error) => {
      showToast("error", "فشلت الاضافة");
    },
  });

  return mutation;
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: ({ id, formData }) =>
      _productsApi.updateProduct({ id, formData }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["Product"] });
      showToast("success", "تم التعديل");
      navigate("/admin/product");
    },
    onError: (error) => {
      showToast("error", "فشل التعديل");
    },
  });

  return mutation;
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id) => _productsApi.deleteProduct(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["Product"] });
      showToast("success", "تم الحذف");
    },
    onError: (error) => {
      showToast("error", "فشل الحذف");
    },
  });

  return mutation;
};
