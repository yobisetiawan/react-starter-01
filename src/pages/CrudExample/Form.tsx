import { Button, Heading, TextareaField, TextInputField } from "evergreen-ui";
import { memo } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { styles } from "../../configs/styles";
import v from "../../configs/validations";

interface Props {
  form: UseFormReturn<FieldValues, any>;
  onSubmit: (data: any) => void;
  isLoading: boolean;
}

const Component = ({ form, onSubmit, isLoading }: Props) => {
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className={"p-4"}>
      <Heading is="h2" size={styles.fontSizeH2}>
        Sample Form
      </Heading>
      <hr />

      <TextInputField
        label="Title"
        placeholder="Title"
        {...form.register("title", v.required)}
        validationMessage={v.getMessage(form.formState.errors, "title")}
      />
      <TextareaField
        label="Descriptionn"
        placeholder="Description"
        {...form.register("description", v.required)}
        validationMessage={v.getMessage(form.formState.errors, "description")}
      />
      <Button
        type="submit"
        isLoading={isLoading}
        marginRight={16}
        appearance="app_btn"
      >
        Submit
      </Button>
    </form>
  );
};

export default memo(Component);
