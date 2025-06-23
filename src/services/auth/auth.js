import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { _AuthApi } from "./Auth.service";
import { useAuthStore } from "../../store/useAuthStore";
import { loginValidationSchema } from "../../validation/login.validation";

export const useLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginValidationSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate, isPending, error } = useMutation({
    mutationFn: async (input) => {
      const res = await _AuthApi.login(input);
      return res;
    },
    onSuccess: (data) => {
      login(data.data?.token);
      navigate("/admin/main");
      console.log(data.data.token);
    },
    onError: (error) => {
      console.error("Error logging in:", error);
    },
  });

  const onSubmit = (input) => {
    mutate(input);
  };

  return {
    errors,
    isPending,
    error,
    onSubmit,
    register,
    handleSubmit,
  };
};
