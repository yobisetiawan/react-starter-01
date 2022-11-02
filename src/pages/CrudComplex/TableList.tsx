import { UseQueryResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import {
  Button,
  DeleteIcon,
  EditIcon,
  EmptyState,
  IconButton,
  Pagination,
  Pane,
  SearchIcon,
  SelectField,
  Strong,
  Table,
  TextInput,
} from "evergreen-ui";
import { memo, useState } from "react";
import { useForm } from "react-hook-form";
import { ParamProps } from "../../configs/api";

interface Props {
  listDt: UseQueryResult<AxiosResponse<any, any>, unknown>;
  params: React.MutableRefObject<ParamProps>;
  handleForm: (item?: any) => void;
  handleDelete: (item: any) => void;
}
const Component = ({ listDt, params, handleForm, handleDelete }: Props) => {
  const [showFilter, setShowFilter] = useState(false);
  const search = useForm();
  const filter = useForm({
    defaultValues: {
      sort_by: "asc",
      order_by: "id",
    },
  });

  const onSearch = (data: any) => {
    params.current = { ...params.current, q: data.q };
    listDt.refetch();
  };

  const onFilter = (data: any) => {
    params.current = {
      ...params.current,
      sort_by: data.sort_by,
      order_by: data.order_by,
    };
    listDt.refetch();
  };

  return (
    <div>
      <div className="mb-2 d-flex justify-content-between">
        <Button onClick={handleForm}>Add New</Button>

        <div className="d-flex">
          <form
            onSubmit={search.handleSubmit(onSearch)}
            className="app-search-input me-2"
          >
            <TextInput placeholder="Search" {...search.register("q")} />
            <div className="app-search-btn">
              <SearchIcon
                color="muted"
                onClick={search.handleSubmit(onSearch)}
              ></SearchIcon>
            </div>
          </form>

          <Button
            onClick={() => {
              setShowFilter(!showFilter);
            }}
          >
            {showFilter ? "Hide Filter" : "Show Filter"}
          </Button>
        </div>
      </div>

      <div className="row justify-content-end">
        <div className="col-lg-12">
          <Pane
            border="default"
            padding={15}
            marginBottom={5}
            display={showFilter ? "block" : "none"}
          >
            <form onSubmit={filter.handleSubmit(onFilter)}>
              <div className="row g-2">
                <div className="col-lg-6">
                  <SelectField
                    label="Order By"
                    {...filter.register("order_by")}
                  >
                    <option value="id">Select</option>
                    <option value="title">Title</option>
                    <option value="description">Description</option>
                  </SelectField>
                </div>
                <div className="col-lg-6">
                  <SelectField label="Sort By" {...filter.register("sort_by")}>
                    <option value="asc">ASC</option>
                    <option value="desc">DESC</option>
                  </SelectField>
                </div>
              </div>
              <div className="d-flex justify-content-end">
                <Button type="submit" appearance="primary">
                  Apply Filter
                </Button>
              </div>
            </form>
          </Pane>
        </div>
      </div>

      <Table marginBottom={20}>
        <Table.Head>
          <Table.TextHeaderCell>Title</Table.TextHeaderCell>
          <Table.TextHeaderCell>Description</Table.TextHeaderCell>
          <Table.TextHeaderCell>Sample</Table.TextHeaderCell>
          <Table.TextHeaderCell flexBasis={100} flexShrink={0} flexGrow={0}>
            Actions
          </Table.TextHeaderCell>
        </Table.Head>
        <Table.Body>
          {(listDt.data?.data?.data ?? []).map((item: any) => (
            <Table.Row key={item.id}>
              <Table.TextCell>
                <Strong>{item.title}</Strong>
              </Table.TextCell>
              <Table.TextCell>{item.description}</Table.TextCell>
              <Table.TextCell>{item.sample?.title || "-"}</Table.TextCell>
              <Table.TextCell flexBasis={100} flexShrink={0} flexGrow={0}>
                <IconButton
                  icon={EditIcon}
                  marginRight={4}
                  onClick={() => {
                    handleForm(item);
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
              title="No Data Found"
              orientation="horizontal"
              icon={<SearchIcon color="#C1C4D6" />}
              iconBgColor="#EDEFF5"
              description="Table data is empty or try adjusting your filter!"
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
