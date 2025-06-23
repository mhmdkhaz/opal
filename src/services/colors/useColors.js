import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { _ColorsApi } from "./colors.services";
import { showToast } from "../../components/shared/Toast/ToastProvider";

export const useGetColors = ({ language }) => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["Colors", language],
    queryFn: () => _ColorsApi.getColors({ language }),
  });

  return { data, isLoading, isError, error, refetch };
};

export const usePostColors = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ data }) => _ColorsApi.postColors({ data }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["Colors"] });
      showToast("success", "تم الاضافة");
    },
    onError: (error) => {
      console.error("خطأ في إرسال الطلب:", error);
      showToast("error", "فشلت الاضافة");
    },
  });

  return mutation;
};

export const useUpdateColors = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id, data }) => _ColorsApi.updateColors({ id, data }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["Colors"] });
      showToast("success", "تم التعديل");
    },
    onError: (error) => {
      showToast("error", "فشل التعديل");
    },
  });

  return mutation;
};

export const useDeleteColors = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id }) => _ColorsApi.deleteColors({ id }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["Colors"] });
      showToast("success", "تم الحذف");
    },
    onError: (error) => {
      showToast("error", "فشل الحذف");
    },
  });

  return mutation;
};
