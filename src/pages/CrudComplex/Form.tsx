import {
  Button,
  Heading,
  SelectField,
  SelectMenu,
  TextareaField,
  TextInputField,
} from "evergreen-ui";
import { useAtom } from "jotai";

import { memo, useState } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { styles } from "../../configs/styles";
import v from "../../configs/validations";
import { SampleCollectionAtom } from "../../storage/collection";

interface Props {
  form: UseFormReturn<FieldValues, any>;
  onSubmit: (data: any) => void;
  isLoading: boolean;
}

const Component = ({ form, onSubmit, isLoading }: Props) => {
  const [listSample2] = useAtom(SampleCollectionAtom);
  const [selected, setSelected] = useState<any>(null);

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

      <TextInputField
        label="Date"
        placeholder="Date"
        type={"date"}
        {...form.register("date", v.required)}
        validationMessage={v.getMessage(form.formState.errors, "date")}
      />

      <TextInputField
        label="Date Time"
        placeholder="Date Time"
        type={"datetime-local"}
        {...form.register("date", v.required)}
        validationMessage={v.getMessage(form.formState.errors, "date")}
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

      <div className="mb-4">
        <SelectMenu
          title="Select name"
          options={listSample2.map((item: any) => ({
            label: item.title,
            value: item.id,
          }))}
          selected={selected?.value ?? ""}
          onSelect={(item) => setSelected(item)}
        >
          <TextInputField
            label="Sample Searchable"
            placeholder="Select One"
            value={selected?.label ?? ""}
            readOnly
            validationMessage={v.getMessage(form.formState.errors, "sample_id")}
          />
        </SelectMenu>
      </div>

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
