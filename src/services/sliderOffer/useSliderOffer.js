import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { _sliderOfferApi } from "./sliderOffer.service";

export const useGetSlidersOfferClient = () => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["sliderOfferHome"],
    queryFn: _sliderOfferApi.indexClient,
    refetchOnWindowFocus: false,
  });
  return { data, isLoading, isError, error, refetch };
};

export const useGetSlidersOffer = () => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["sliderOfferHome"],
    queryFn: _sliderOfferApi.index,
    refetchOnWindowFocus: false,
  });
  return { data, isLoading, isError, error, refetch };
};

export const usePostSlider = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ data }) => _sliderOfferApi.postSlide({ data }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["sliderOfferHome"] });
      console.log("نجاح في إرسال الطلب:", data);
    },
    onError: (error) => {
      console.error("خطأ في إرسال الطلب:", error);
    },
  });

  return mutation;
};

export const useDeleteSlider = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id }) => _sliderOfferApi.deleteSlide({ id }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["sliderOfferHome"] });
      console.log("نجاح :", data);
    },
    onError: (error) => {
      console.error("خطأ :", error);
    },
  });

  return mutation;
};
