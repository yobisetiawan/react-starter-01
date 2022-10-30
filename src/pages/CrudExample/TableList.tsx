import { UseQueryResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import {
  Button,
  DeleteIcon,
  EditIcon,
  EmptyState,
  IconButton,
  Pagination,
  SearchIcon,
  Table,
  TextInput,
} from "evergreen-ui";
import { memo } from "react";
import { useForm } from "react-hook-form";
import { ParamProps } from ".";

interface Props {
  listDt: UseQueryResult<AxiosResponse<any, any>, unknown>;
  params: React.MutableRefObject<ParamProps>;
  handleEdit: (item: any) => void;
  handleDelete: (item: any) => void;
  handleCreate: () => void;
}
const Component = ({
  listDt,
  params,
  handleEdit,
  handleDelete,
  handleCreate,
}: Props) => {
  const search = useForm();

  const onSearch = (data: any) => {
    console.log("onSearch");
    params.current = { ...params.current, q: data.q };
    listDt.refetch();
  };

  return (
    <div>
      <div className="mb-2 d-flex justify-content-between">
        <Button onClick={handleCreate}>Add New</Button>

        <form
          onSubmit={search.handleSubmit(onSearch)}
          className="app-search-input"
        >
          <TextInput placeholder="Search" {...search.register("q")} />
          <div className="app-search-btn">
            <SearchIcon color="muted"></SearchIcon>
          </div>
        </form>
      </div>

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
          {(listDt.data?.data?.data ?? []).length === 0 && (
            <EmptyState
              background="light"
              title="No Data"
              orientation="horizontal"
              icon={<SearchIcon color="#C1C4D6" />}
              iconBgColor="#EDEFF5"
              description="we can not find any data at the moment!"
              
            />
          )}
        </Table.Body>
      </Table>

      <Pagination
        page={listDt.data?.data?.meta?.current_page ?? 0}
        totalPages={listDt.data?.data?.meta?.last_page ?? 0}
        marginBottom={20}
        onPreviousPage={() => {
          params.current = { ...params.current, page: params.current.page - 1 };
          listDt.refetch();
        }}
        onNextPage={() => {
          params.current = { ...params.current, page: params.current.page + 1 };
          listDt.refetch();
        }}
        onPageChange={(page) => {
          params.current = { ...params.current, page: page };
          listDt.refetch();
        }}
      ></Pagination>
    </div>
  );
};

export default memo(Component);
