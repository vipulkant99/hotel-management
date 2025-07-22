import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

function CreateCabinForm({ cabinToEdit = {}, onClose }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEdit = Boolean(editId);
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEdit ? editValues : {},
  });
  const { errors } = formState;

  const { isCreating, creatingCabin } = useCreateCabin();
  const { editCabin, isEditing } = useEditCabin();

  const isWorking = isEditing || isCreating;

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEdit)
      editCabin(
        { newCabinData: { ...data, image }, id: editId },
        {
          onSuccess: () => {
            reset();
            onClose?.();
          },
        }
      );
    else
      creatingCabin(
        { ...data, image: image },
        {
          onSuccess: () => {
            reset();
            onClose?.();
          },
        }
      );
  }

  function onError(errors) {
    //console.log(errors);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onClose ? "modal" : "regular"}
    >
      <FormRow label="Cabin Name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Max Capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be atleast 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular Price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register("regularPrice", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Price should be atleast 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isWorking}
          defaultValue={0}
          {...register("discount", {
            //required: "This field is required",
            validate: (value) =>
              value <= getValues().regularPrice ||
              "Discount should be less than regular price",
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          disabled={isWorking}
          defaultValue=""
          {...register("description", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Cabin Photo">
        <FileInput
          id="image"
          accept="image/*"
          type="file"
          {...register("image", {
            required: isEdit ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variations="secondary" type="reset" onClick={() => onClose?.()}>
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEdit ? "Edit cabin" : "Add cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
