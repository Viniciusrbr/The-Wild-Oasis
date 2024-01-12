import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useUpdateUser } from "./useUpdateUser";

function UpdatePasswordForm() {
  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const { errors } = formState;

  const { updateUser, isUpdating } = useUpdateUser();

  function onSubmit({ password }) {
    updateUser({ password }, { onSuccess: reset });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        label="Nova senha (mín. 8 caracteres)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          disabled={isUpdating}
          {...register("password", {
            required: "Este campo é obrigatório",
            minLength: {
              value: 8,
              message: "A senha precisa de no mínimo 8 caracteres",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Confirme sua senha"
        error={errors?.passwordConfirm?.message}
      >
        <Input
          type="password"
          autoComplete="new-password"
          id="passwordConfirm"
          disabled={isUpdating}
          {...register("passwordConfirm", {
            required: "Este campo é obrigatório",
            validate: (value) =>
              getValues().password === value ||
              "As senhas precisam corresponder",
          })}
        />
      </FormRow>
      <FormRow>
        <Button onClick={reset} type="reset" variation="secondary">
          Cancelar
        </Button>
        <Button disabled={isUpdating}>Atualizar senha</Button>
      </FormRow>
    </Form>
  );
}

export default UpdatePasswordForm;
