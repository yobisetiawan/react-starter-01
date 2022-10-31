import { useQuery } from "@tanstack/react-query";
import { Dialog, Heading, Pane, toaster } from "evergreen-ui";

import { memo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import AppSidebar from "../../components/layouts/AppSidebar";
import { API, ManualFetchAPI } from "../../configs/api";
import { styles } from "../../configs/styles";
import v from "../../configs/validations";
import Form from "./Form";
import TableList from "./TableList";

export interface ParamProps {
  relations: string;
  page: number;
  type: string;
  q: string;
  sort_by: string;
  order_by: string;
}

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

  const listDt = useQuery(["list-sample-complex"], () =>
    API.exampleSampleList(params.current)
  );

  const onFormSuccess = (msg?: string) => {
    toaster.success(msg ?? "Data successfully saved!");
    form.reset(defaultForm);
    setModalForm(false);
    setModalDel(false);

    selectedItem.current = null;
    listDt.refetch();
  };

  const storeDt = useQuery(
    ["store-sample-complex"],
    () => API.exampleSamplePost(formDt.current),
    {
      ...ManualFetchAPI,
      onError(err: any) {
        v.setServerError(err, formDt.current, form.setError);
      },
      onSuccess(dt: any) {
        onFormSuccess();
      },
    }
  );

  const putDt = useQuery(
    ["put-sample-complex"],
    () => API.exampleSamplePut(selectedItem.current?.id, formDt.current),
    {
      ...ManualFetchAPI,
      onSuccess(dt: any) {
        onFormSuccess();
      },
    }
  );

  const onSubmit = (data: any) => {
    formDt.current = data;
    if (selectedItem.current?.id) {
      putDt.refetch();
    } else {
      storeDt.refetch();
    }
  };

  const destroyDt = useQuery(
    ["destroy-sample-complex"],
    () => API.exampleSampleDestroy(selectedItem.current?.id),
    {
      ...ManualFetchAPI,
      onSuccess(dt: any) {
        onFormSuccess("Data successfully deleted!");
      },
    }
  );

  const handleEdit = (item: any) => {
    selectedItem.current = item;
    form.reset({
      title: item.title,
      description: item.description,
    });
    setModalForm(true);
  };

  const handleDelete = (item: any) => {
    setModalDel(true);
    selectedItem.current = item;
  };

  const handleCreate = () => {
    form.reset(defaultForm);
    setModalForm(true);
  };

  return (
    <AppSidebar>
      <div className="p-3">
        <Heading is="h1" size={styles.fontSizeH1}>
          CRUD Complex Example
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
              destroyDt.refetch();
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
              isLoading={storeDt.isFetching || putDt.isFetching}
              onSubmit={onSubmit}
            />
          </Dialog>

          <TableList
            handleCreate={handleCreate}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            params={params}
            listDt={listDt}
          />
        </Pane>
      </div>
    </AppSidebar>
  );
};

export default memo(Page);
