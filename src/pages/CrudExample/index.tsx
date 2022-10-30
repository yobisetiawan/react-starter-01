import { useQuery } from "@tanstack/react-query";
import {
  Button,
  DeleteIcon,
  Dialog,
  EditIcon,
  Heading,
  IconButton,
  Pagination,
  Pane,
  Table,
  TextareaField,
  TextInputField,
  toaster,
} from "evergreen-ui";

import { memo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import AppSidebar from "../../components/layouts/AppSidebar";
import { API, ManualFetchAPI } from "../../configs/api";
import { styles } from "../../configs/styles";
import v from "../../configs/validations";

const Page = () => {
  const selectedItem = useRef(null) as any;
  const params = useRef({
    relations: "",
    page: 1,
    type: "pagination",
    q: "",
  });

  const defaultForm = {
    title: "",
    description: "",
  };

  const formDt = useRef(defaultForm);

  const [isShown, setIsShown] = useState(false);
  const [modalDel, setModalDel] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm();

  const listDt = useQuery(["list-sample"], () =>
    API.exampleSampleList(params.current)
  );

  const onFormSuccess = (msg?: string) => {
    toaster.success(msg ?? "Data successfully saved!");
    reset(defaultForm);
    setIsShown(false);
    setModalDel(false);

    selectedItem.current = null;
    listDt.refetch();
  };

  const storeDt = useQuery(
    ["store-sample"],
    () => API.exampleSamplePost(formDt.current),
    {
      ...ManualFetchAPI,
      onError(err: any) {
        v.setServerError(err, formDt.current, setError);
      },
      onSuccess(dt: any) {
        onFormSuccess();
      },
    }
  );

  const putDt = useQuery(
    ["put-sample"],
    () => API.exampleSamplePut(selectedItem.current?.id, formDt.current),
    {
      ...ManualFetchAPI,
      onSuccess(dt: any) {
        onFormSuccess();
      },
    }
  );

  const destroyDt = useQuery(
    ["destroy-sample"],
    () => API.exampleSampleDestroy(selectedItem.current?.id),
    {
      ...ManualFetchAPI,
      onSuccess(dt: any) {
        onFormSuccess("Data successfully deleted!");
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

  const handleEdit = (item: any) => {
    selectedItem.current = item;
    reset(item);
    setIsShown(true);
  };

  const handleDelete = (item: any) => {
    setModalDel(true);
    selectedItem.current = item;
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
              destroyDt.refetch();
            }}
          >
            Are you sure you want to delete this data?
          </Dialog>
          <Dialog
            isShown={isShown}
            title="Sample Form"
            onCloseComplete={() => {
              setIsShown(false);
              reset(defaultForm);
            }}
            hasFooter={false}
            confirmLabel="Save"
          >
            <form onSubmit={handleSubmit(onSubmit)} className={"pb-4"}>
              <TextInputField
                label="Title"
                placeholder="Title"
                {...register("title", v.required)}
                validationMessage={v.getMessage(errors, "title")}
              />
              <TextareaField
                label="Descriptionn"
                placeholder="Description"
                {...register("description", v.required)}
                validationMessage={v.getMessage(errors, "description")}
              />
              <Button
                type="submit"
                isLoading={storeDt.isFetching || putDt.isFetching}
                marginRight={16}
                appearance="primary"
              >
                Submit
              </Button>
            </form>
          </Dialog>

          <Button
            marginBottom={20}
            onClick={() => {
              reset(defaultForm);
              setIsShown(true);
            }}
          >
            Add New
          </Button>

          <Table marginBottom={20}>
            <Table.Head>
              <Table.TextHeaderCell>Title</Table.TextHeaderCell>
              <Table.TextHeaderCell>Descriptionn</Table.TextHeaderCell>
              <Table.TextHeaderCell flexBasis={100} flexShrink={0} flexGrow={0}>
                Actions
              </Table.TextHeaderCell>
            </Table.Head>
            <Table.Body>
              {(listDt.data?.data?.data ?? []).map((item: any) => (
                <Table.Row key={item.id}>
                  <Table.TextCell>{item.title}</Table.TextCell>
                  <Table.TextCell>{item.description}</Table.TextCell>
                  <Table.TextCell flexBasis={100} flexShrink={0} flexGrow={0}>
                    <IconButton
                      icon={EditIcon}
                      marginRight={4}
                      onClick={() => {
                        handleEdit(item);
                      }}
                    />
                    <IconButton
                      icon={DeleteIcon}
                      marginRight={4}
                      intent="danger"
                      onClick={() => {
                        handleDelete(item);
                      }}
                    />
                  </Table.TextCell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>

          <Pagination
            page={listDt.data?.data?.meta?.current_page ?? 1}
            totalPages={listDt.data?.data?.meta?.last_page ?? 0}
            marginBottom={20}
            onPageChange={(page) => {
              params.current = { ...params.current, page: page };
              listDt.refetch();
            }}
          ></Pagination>
        </Pane>
      </div>
    </AppSidebar>
  );
};

export default memo(Page);
