import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignup } from "./useSignup";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { signup, isLoading } = useSignup();
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;

  function onSubmit({ fullName, email, password }) {
    signup({ fullName, email, password }, { onSettled: reset });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Nome completo" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          disabled={isLoading}
          {...register("fullName", { required: "Este campo é obrigatório" })}
        />
      </FormRow>

      <FormRow label="Endereço de email" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isLoading}
          {...register("email", {
            required: "Este campo é obrigatório",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Por favor, insira um email válido",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Senha (mín. 8 caracteres)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          disabled={isLoading}
          {...register("password", {
            required: "Este campo é obrigatório",
            minLength: {
              value: 8,
              message: "A senha deve ter no mínimo 8 caracteres",
            },
          })}
        />
      </FormRow>

      <FormRow label="Repita a senha" error={errors?.passwordConfirm?.message}>
        <Input
          type="password"
          id="passwordConfirm"
          disabled={isLoading}
          {...register("passwordConfirm", {
            required: "Este campo é obrigatório",
            validate: (value) =>
              value === getValues("password") || "As senhas devem ser iguais",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" disabled={isLoading}>
          Cancelar
        </Button>
        <Button disabled={isLoading}>Criar novo usuário</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
