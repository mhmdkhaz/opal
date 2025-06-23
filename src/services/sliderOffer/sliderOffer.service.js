import { _axios, _axiosF } from "../../interceptor/http-config";

export const _sliderOfferApi = {
  indexClient: async () => {
    const response = await _axiosF.get("/sliders");
    return response.data.data;
  },

  index: async () => {
    const response = await _axios.get("/sliders");
    return response.data.data;
  },

  postSlide: async ({ data }) => {
    const formData = new FormData();
    formData.append("image", data);

    const response = await _axios.post("/sliders", formData);
    return response.data.data;
  },

  deleteSlide: async ({ id }) => {
    const response = await _axios.delete(`/sliders/${id}`);
    return response.data.data;
  },
};
