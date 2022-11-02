import { useMutation, useQuery } from "@tanstack/react-query";
import { Dialog, Heading, Pane, toaster } from "evergreen-ui";

import { memo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import AppSidebar from "../../components/layouts/AppSidebar";
import { API, ParamProps } from "../../configs/api";
import { styles } from "../../configs/styles";
import v from "../../configs/validations";
import Form from "./Form";
import TableList from "./TableList";

const Page = () => {
  const selectedItem = useRef(null) as any;
  const params = useRef<ParamProps>({
    relations: "",
    page: 1,
    type: "pagination",
    q: "",
    sort_by: "",
    order_by: "",
  });

  const defaultForm = {
    title: "",
    description: "",
  };

  const formDt = useRef(defaultForm);

  const [modalForm, setModalForm] = useState(false);
  const [modalDel, setModalDel] = useState(false);

  const form = useForm();

  const listDt = useQuery(
    ["list-sample"],
    () => API.exampleSampleList(params.current),
    { staleTime: Infinity }
  );

  const onFormSuccess = (msg?: string) => {
    toaster.success(msg ?? "Data successfully saved!");
    form.reset(defaultForm);
    setModalForm(false);
    setModalDel(false);

    selectedItem.current = null;
    listDt.refetch();
  };

  const saveDt = useMutation(
    ["put-sample"],
    () =>
      selectedItem.current?.id
        ? API.exampleSamplePut(selectedItem.current?.id, formDt.current)
        : API.exampleSamplePost(formDt.current),
    {
      onError(err: any) {
        v.setServerError(err, formDt.current, form.setError);
      },
      onSuccess(dt: any) {
        onFormSuccess();
      },
    }
  );

  const destroyDt = useMutation(
    ["destroy-sample"],
    () => API.exampleSampleDestroy(selectedItem.current?.id),
    {
      onSuccess(dt: any) {
        onFormSuccess("Data successfully deleted!");
      },
      onError(err: any) {
        v.setServerError(err);
      },
    }
  );

  const handleDelete = (item: any) => {
    setModalDel(true);
    selectedItem.current = item;
  };

  const handleForm = (item?: any) => {
    if (item) {
      selectedItem.current = item;
      form.reset({
        title: item.title,
        description: item.description,
        sample_id: item.sample?.id ?? "",
      });
    } else {
      selectedItem.current = null;
      form.reset(defaultForm);
    }
    setModalForm(true);
  };

  const onSubmit = (data: any) => {
    formDt.current = data;
    saveDt.mutate();
  };

  return (
    <AppSidebar>
      <div className="p-3">
        <Heading is="h1" size={styles.fontSizeH1}>
          CRUD Example
        </Heading>
        <hr />
        <Pane>
          <Dialog
            isShown={modalDel}
            title="Confirmation"
            intent="danger"
            onCloseComplete={() => setModalDel(false)}
            confirmLabel="Delete"
            onConfirm={() => {
              destroyDt.mutate();
            }}
          >
            Are you sure you want to delete this data?
          </Dialog>
          <Dialog
            isShown={modalForm}
            title="Sample Form"
            onCloseComplete={() => {
              setModalForm(false);
              form.reset(defaultForm);
            }}
            hasFooter={false}
            confirmLabel="Save"
          >
            <Form
              form={form}
              isLoading={saveDt.isLoading}
              onSubmit={onSubmit}
            />
          </Dialog>

          <TableList
            handleForm={handleForm}
            handleDelete={handleDelete}
            params={params}
            listDt={listDt}
          />
        </Pane>
      </div>
    </AppSidebar>
  );
};

export default memo(Page);
