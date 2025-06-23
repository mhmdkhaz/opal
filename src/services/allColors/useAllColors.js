import { useQuery, useMutation } from "@tanstack/react-query";
import { _allColorApi } from "./allColors.services";

export const useAllColors = (language) => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["allColors", language],
    queryFn: () => _allColorApi.index({ language }),
    refetchOnWindowFocus: false,
  });
  return { data, isLoading, isError, error, refetch };
};
