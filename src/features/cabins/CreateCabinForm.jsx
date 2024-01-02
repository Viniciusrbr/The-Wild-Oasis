import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

function CreateCabinForm({ cabinToEdit = {} }) {
  const { createCabin, isCreating } = useCreateCabin();
  const { editCabin, isEditing } = useEditCabin();
  const isWorking = isCreating || isEditing;

  const { id: editId, ...editValues } = cabinToEdit;

  // se o form tiver salvo o ID da cabine ele está em modo de edição,logo, os valores do form devem ser os valores da cabine.

  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const { errors } = formState;

  function onSubmit(data) {
    let image =
      typeof data.image === "object" && data.image.length > 0
        ? data.image[0]
        : cabinToEdit.image;

    if (isEditSession) {
      editCabin(
        { newCabinData: { ...data, image }, id: editId },
        {
          onSuccess: (data) => {
            reset();
          },
        }
      );
    } else {
      createCabin(
        { ...data, image: image },
        {
          onSuccess: (data) => {
            reset();
          },
        }
      );
    }
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
          disabled={isWorking}
          {...register("name", {
            required: "Esse campo é obrigatório",
          })}
        />
      </FormRow>

      <FormRow label="Capacidade máxima" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
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
          disabled={isWorking}
          {...register("regularPrice", {
            required: "Esse campo é obrigatório",
          })}
        />
      </FormRow>

      <FormRow label="Desconto" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isWorking}
          defaultValue={0}
          {...register("discount", {
            required: "Esse campo é obrigatório",
            validate: (value) =>
              Number(value) <= Number(getValues().regularPrice) ||
              "O desconto não pode ser maior que o preço regular",
          })}
        />
      </FormRow>

      <FormRow label="Descrição" error={errors?.description?.message}>
        <Textarea
          type="number"
          id="description"
          disabled={isWorking}
          defaultValue=""
          {...register("description", {
            required: "Esse campo é obrigatório",
          })}
        />
      </FormRow>

      <FormRow label="Foto da cabine">
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "Esse campo é obrigatório",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancelar
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "editar cabine" : "Adicionar cabine"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
