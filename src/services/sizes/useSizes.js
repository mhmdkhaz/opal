import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { _SizesApi } from "./sizes.services";
import { showToast } from "../../components/shared/Toast/ToastProvider";

export const useGetSizes = () => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["Sizes"],
    queryFn: () => _SizesApi.getSizes(),
  });

  return { data, isLoading, isError, error, refetch };
};

export const usePostSizes = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ data }) => _SizesApi.postSizes({ data }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["Sizes"] });
      showToast("success", "تم الاضافة");
    },
    onError: (error) => {
      showToast("error", "فشلت الاضافة");
    },
  });

  return mutation;
};

export const useUpdateSizes = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id, data }) => _SizesApi.updateSizes({ id, data }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["Sizes"] });
      showToast("success", "تم التعديل");
    },
    onError: (error) => {
      showToast("error", "فشل التعديل");
    },
  });

  return mutation;
};

export const useDeleteSizes = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id }) => _SizesApi.deleteSizes({ id }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["Sizes"] });
      showToast("success", "تم الحذف");
    },
    onError: (error) => {
      console.error("خطأ :", error);
      showToast("error", "فشل الحذف");
    },
  });

  return mutation;
};
