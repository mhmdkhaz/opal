import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { _categoriesApi } from "./categories.service";
import { showToast } from "../../components/shared/Toast/ToastProvider";

export const useCategoriesClient = (language) => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["Categories", language],
    queryFn: () => _categoriesApi.indexClient({ language }),
    refetchOnWindowFocus: false,
  });
  return { data, isLoading, isError, error, refetch };
};

export const useCategories = (language) => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["Categories", language],
    queryFn: () => _categoriesApi.index({ language }),
    refetchOnWindowFocus: false,
  });
  return { data, isLoading, isError, error, refetch };
};

export const usePostCategory = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (formData) => _categoriesApi.postCategory(formData),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["Categories"] });
      showToast("success", "تم الاضافة");
    },
    onError: (error) => {
      console.error("خطأ في إرسال الطلب:", error);
      showToast("error", "فشلت الاضافة");
    },
  });

  return mutation;
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id, data }) => _categoriesApi.updateCategory({ id, data }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["Categories"] });
      showToast("success", "تم التعديل");
    },
    onError: (error) => {
      showToast("error", "فشل التعديل");
    },
  });

  return mutation;
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id) => _categoriesApi.deleteCategory(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["Categories"] });
      showToast("success", "تم الحذف");
    },
    onError: (error) => {
      showToast("error", "فشل الحذف");
    },
  });

  return mutation;
};
