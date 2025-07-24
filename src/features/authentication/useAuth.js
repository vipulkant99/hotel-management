import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, login, logout, signup } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignUp() {
  const { mutate, isPending } = useMutation({
    mutationFn: signup,
    onSuccess: (user) => {
      toast.success(
        "Account successfully created. Please verify the new account from user's email address."
      );
    },
  });

  return { mutate, isPending };
}

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: ({ email, password }) => login({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.user);
      navigate("/dashboard", { replace: true });
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error("Provided email and password are incorrect");
    },
  });

  return { mutate, isPending };
}

export function useUser() {
  const { isPending, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  return { isPending, user, isAuthenticated: user?.role === "authenticated" };
}

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.removeQueries();
      navigate("/login", { replace: true });
    },
  });

  return { mutate, isPending };
}
