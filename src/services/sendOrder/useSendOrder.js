import { useMutation, useQuery } from "@tanstack/react-query";
import { _sendOrder } from "./sendOrder.services";

export const useGetOrder = () => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["Orders"],
    queryFn: () => _sendOrder.getOrder(),
  });

  return { data, isLoading, isError, error, refetch };
};

export const useGetDetailsOrder = (id) => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["Orders"],
    queryFn: () => _sendOrder.getDetailsOrder(id),
  });

  return { data, isLoading, isError, error, refetch };
};

export const usePostOrder = () => {
  const mutation = useMutation({
    mutationFn: ({ name, phone, items }) =>
      _sendOrder.postOrder({ name, phone, items }),
    onSuccess: (data) => {
      console.log("نجاح في إرسال الطلب:", data);
    },
    onError: (error) => {
      console.error("خطأ في إرسال الطلب:", error);
    },
  });

  return mutation;
};

export const useDeleteOrder = () => {
  const mutation = useMutation({
    mutationFn: (id) => _sendOrder.postOrder(id),
    onSuccess: (data) => {
      console.log("نجاح في إرسال الطلب:", data);
    },
    onError: (error) => {
      console.error("خطأ في إرسال الطلب:", error);
    },
  });

  return mutation;
};
