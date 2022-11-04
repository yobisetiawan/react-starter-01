import { useMutation, useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { Dialog, Heading, Pane, SideSheet, toaster } from "evergreen-ui";
import { memo, Suspense, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import AppSidebar from "../../components/layouts/AppSidebar";
import { API, ParamProps } from "../../configs/api";
import { styles } from "../../configs/styles";
import v from "../../configs/validations";

import Form from "./Form";
import TableList from "./TableList";

const Page = () => {
  const selectedItem = useRef<any>(null);
  const params = useRef<ParamProps>({
    relations: ["sample"].join(),
    page: 1,
    type: "pagination",
    q: "",
    sort_by: "",
    order_by: "",
  });

  const defaultForm = {
    title: "",
    description: "",
    sample_id: "",
    date: "",
    date_time: "",
  };

  const formDt = useRef(defaultForm);

  const [modalForm, setModalForm] = useState(false);
  const [modalDel, setModalDel] = useState(false);

  const form = useForm();

  const listDt = useQuery(
    ["list-sample-complex"],
    () => API.exampleSample2List(params.current),
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
    ["put-sample-complex"],
    () =>
      selectedItem.current?.id
        ? API.exampleSample2Put(selectedItem.current?.id, formDt.current)
        : API.exampleSample2Post(formDt.current),
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
    ["destroy-sample-complex"],
    () => API.exampleSample2Destroy(selectedItem.current?.id),
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
        date: item.date,
        date_time: item.date_time,
      });
    } else {
      selectedItem.current = null;
      form.reset(defaultForm);
    }
    setModalForm(true);
  };

  const onSubmit = (data: any) => {
    data.date_time = dayjs(data.date_time).format("YYYY-MM-DD HH:mm");
    formDt.current = data;
    saveDt.mutate();
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
              destroyDt.mutate();
            }}
          >
            Are you sure you want to delete this data?
          </Dialog>

          <SideSheet
            width={800}
            isShown={modalForm}
            onCloseComplete={() => {
              setModalForm(false);
              form.reset(defaultForm);
            }}
          >
            <Suspense>
              <Form
                form={form}
                isLoading={saveDt.isLoading}
                onSubmit={onSubmit}
              />
            </Suspense>
          </SideSheet>

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
