import { _axios } from "../../interceptor/http-config";

export const _AuthApi = {
  login: async (data) => {
    const response = await _axios.post("login", data);
    return response.data;
  },
};
