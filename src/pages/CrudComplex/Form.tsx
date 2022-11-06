import {
  Autocomplete,
  Button,
  Checkbox,
  Combobox,
  Heading,
  RadioGroup,
  SelectField,
  SelectMenu,
  Strong,
  Switch,
  TagInput,
  TextareaField,
  TextInput,
  TextInputField,
} from "evergreen-ui";
import { useAtom } from "jotai";

import { memo, useState } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";
import ReactQuill from "react-quill";
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
  const [values, setValues] = useState<string[]>([]);
  const [rt, setRT] = useState("");

  const [options] = useState([
    { label: "Read-only", value: "read-only" },
    { label: "Write", value: "write" },
    { label: "Restricted", value: "restricted" },
  ]);

  const [r, setR] = useState("restricted");

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

      <div className="mb-4">
        <div className="mb-2">
          <Strong>Tag Input</Strong>
        </div>
        <TagInput
          inputProps={{ placeholder: "Add trees..." }}
          values={values}
          onChange={(values) => {
            setValues(values);
          }}
        />
      </div>

      <div className="mb-4">
        <Combobox
          width="100%"
          items={["Banana", "Orange", "Apple", "Mango"]}
          onChange={(selected) => console.log(selected)}
          placeholder="Fruit"
          selectedItem={"Banana"}
          autocompleteProps={{
            popoverMinWidth: 300,
            // Used for the title in the autocomplete.
            title: "Fruit",
          }}
        />
      </div>

      <Autocomplete
        title="Fruits"
        onChange={(changedItem) => console.log(changedItem)}
        items={["Apple", "Apricot", "Banana", "Cherry", "Cucumber"]}
      >
        {(props) => {
          const { getInputProps, getRef, inputValue } = props;
          return (
            <TextInput
              placeholder="Fruits"
              ref={getRef}
              {...getInputProps()}
              value={inputValue}
            />
          );
        }}
      </Autocomplete>

      <div className="mb-4">
        <Checkbox label="Aggre with anything" checked={true} />
      </div>

      <div className="mb-4">
        <Switch />
      </div>

      <div
        className="mb-4"
        style={{ position: "relative", overflow: "hidden" }}
      >
        <RadioGroup
          label="Permissions"
          value={r}
          options={options}
          onChange={(event) => setR(event.target.value)}
        />
      </div>

      <div className="mb-4">
        <ReactQuill theme="snow" value={rt} onChange={setRT} />
      </div>

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
