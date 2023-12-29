import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { createCabin } from "../../services/apiCabins";
import FormRow from "../../ui/FormRow";

function CreateCabinForm() {
  const { register, handleSubmit, reset, getValues, formState } = useForm();

  const { errors } = formState;

  const queryClient = useQueryClient();

  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success("nova cabine criada com sucesso");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  function onSubmit(data) {
    mutate(data);
  }

  function onError(errors) {
    //console.log(errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Nome da cabine" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isCreating}
          {...register("name", {
            required: "Esse campo é obrigatório",
          })}
        />
      </FormRow>

      <FormRow label="Capacidade máxima" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isCreating}
          {...register("maxCapacity", {
            required: "Esse campo é obrigatório",
            min: {
              value: 1,
              message: "A cabine deve acomodar pelo menos 1 hóspede",
            },
          })}
        />
      </FormRow>

      <FormRow label="Preço regular" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isCreating}
          {...register("regularPrice", {
            required: "Esse campo é obrigatório",
          })}
        />
      </FormRow>

      <FormRow label="Desconto" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isCreating}
          defaultValue={0}
          {...register("discount", {
            required: "Esse campo é obrigatório",
            validate: (value) =>
              Number(value) <= Number(getValues().regularPrice) ||
              "O desconto não pode ser maior que o preço regular",
          })}
        />
      </FormRow>

      <FormRow
        label="Descrição"
        disabled={isCreating}
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          disabled={isCreating}
          defaultValue=""
          {...register("description", {
            required: "Esse campo é obrigatório",
          })}
        />
      </FormRow>

      <FormRow label="Foto da cabine">
        <FileInput id="image" accept="image/*" />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancelar
        </Button>
        <Button disabled={isCreating}>Adicionar cabine</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
