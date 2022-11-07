import {
  Autocomplete,
  Button,
  Checkbox,
  Combobox,
  Heading,
  RadioGroup,
  SelectField,
  Switch,
  TagInput,
  TextareaField,
  TextInput,
  TextInputField,
} from "evergreen-ui";
import { useAtom } from "jotai";

import { memo, useState } from "react";
import { Controller, FieldValues, UseFormReturn } from "react-hook-form";
import ReactQuill from "react-quill";
import CustomField from "../../components/form/CustomField";
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

  const [options] = useState([
    { label: "Read-only", value: "read-only" },
    { label: "Write", value: "write" },
    { label: "Restricted", value: "restricted" },
  ]);

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
        {...form.register("date_time", v.required)}
        validationMessage={v.getMessage(form.formState.errors, "date_time")}
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

      <CustomField
        label="Checkbox"
        validationMessage={v.getMessage(form.formState.errors, "is_agree")}
      >
        <Controller
          name="is_agree"
          control={form.control}
          rules={v.required}
          render={({ field }) => (
            <Checkbox
              label="Aggre with anything"
              checked={field.value}
              onChange={(e) => {
                field.onChange(!field.value);
              }}
            />
          )}
        />
      </CustomField>

      <CustomField
        label="Switch"
        validationMessage={v.getMessage(form.formState.errors, "is_on")}
      >
        <Controller
          name="is_on"
          control={form.control}
          rules={v.required}
          render={({ field }) => (
            <Switch
              checked={field.value}
              onChange={(e) => {
                field.onChange(!field.value);
              }}
            />
          )}
        />
      </CustomField>

      <CustomField
        label="Tag Input"
        validationMessage={v.getMessage(form.formState.errors, "tags")}
      >
        <Controller
          name="tags"
          control={form.control}
          rules={v.required}
          render={({ field }) => (
            <TagInput
              inputProps={{ placeholder: "Add trees..." }}
              values={field.value}
              onChange={(values) => {
                field.onChange(values);
              }}
            />
          )}
        />
      </CustomField>

      <CustomField
        label="Combobox"
        validationMessage={v.getMessage(form.formState.errors, "fruit")}
      >
        <Controller
          name="fruit"
          control={form.control}
          rules={v.required}
          render={({ field }) => (
            <Combobox
              width="100%"
              items={["Banana", "Orange", "Apple", "Mango"]}
              onChange={(selected) => field.onChange(selected)}
              placeholder="Fruit"
              //selectedItem={fruit}
              initialSelectedItem={field.value}
              autocompleteProps={{
                popoverMinWidth: 300,
                // Used for the title in the autocomplete.
                title: "Fruit",
              }}
            />
          )}
        />
      </CustomField>

      <CustomField
        label="Combobox"
        validationMessage={v.getMessage(form.formState.errors, "procesor")}
      >
        <Controller
          name="procesor"
          control={form.control}
          rules={v.required}
          render={({ field }) => (
            <Autocomplete
              title="Autocomplete"
              onChange={(selected) => field.onChange(selected)}
              items={["M1", "Intel", "AMD"]}
              initialInputValue={field.value}
            >
              {(props) => {
                const { getInputProps, getRef, inputValue } = props;
                return (
                  <TextInput
                    placeholder="Procesors"
                    ref={getRef}
                    {...getInputProps()}
                    value={inputValue}
                  />
                );
              }}
            </Autocomplete>
          )}
        />
      </CustomField>

      <CustomField
        label="Permissions"
        validationMessage={v.getMessage(form.formState.errors, "permission")}
      >
        <Controller
          name="permission"
          control={form.control}
          rules={v.required}
          render={({ field }) => (
            <RadioGroup
              options={options}
              value={field.value}
              onChange={(event) => field.onChange(event.target.value)}
            />
          )}
        />
      </CustomField>

      <CustomField
        label="Text Editor"
        validationMessage={v.getMessage(form.formState.errors, "text_editor")}
      >
        <Controller
          name="text_editor"
          control={form.control}
          rules={v.required}
          render={({ field }) => (
            <ReactQuill
              theme="snow"
              value={field.value}
              onChange={(v) => {
                field.onChange(v);
              }}
            />
          )}
        />
      </CustomField>

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
