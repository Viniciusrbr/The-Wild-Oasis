import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import { toast } from "react-hot-toast";

export function useSignup() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signupApi,
    onSuccess: (user) => {
      toast.success(
        "Conta criada com sucesso! Verifique a nova conta no endereço de e-mail do usuário."
      );
    },
  });

  return { signup, isLoading };
}
