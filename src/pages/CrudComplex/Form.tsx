import {
  Button,
  SelectField,
  TextareaField,
  TextInputField,
} from "evergreen-ui";
import { useAtom } from "jotai";

import { memo } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";
import v from "../../configs/validations";
import { SampleCollectionAtom } from "../../storage/collection";

interface Props {
  form: UseFormReturn<FieldValues, any>;
  onSubmit: (data: any) => void;
  isLoading: boolean;
}

const Component = ({ form, onSubmit, isLoading }: Props) => {
  const [listSample2] = useAtom(SampleCollectionAtom);
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className={"pb-4"}>
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
      <SelectField
        label="Sample"
        {...form.register("sample_id", v.required)}
        validationMessage={v.getMessage(form.formState.errors, "sample_id")}
      >
        <option value={""}>Select One</option>
        {listSample2.map((item: any) => (
          <option value={item.id} key={item.id}>
            {item.title}
          </option>
        ))}
      </SelectField>
      <Button
        type="submit"
        isLoading={isLoading}
        marginRight={16}
        appearance="primary"
      >
        Submit
      </Button>
    </form>
  );
};

export default memo(Component);
