import { UseQueryResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import {
  Button,
  DeleteIcon,
  EditIcon,
  IconButton,
  Pagination,
  Pane,
  SearchIcon,
  SelectField,
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

  const listDtRess = listDt.data?.data;

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

      <table className="app-table mb-3">
        <tr>
          <th>Title</th>
          <th>Description</th>

          <th style={{ width: 100 }}>Actions</th>
        </tr>
        {(listDtRess?.data ?? []).map((item: any) => (
          <tr>
            <td> {item.title}</td>
            <td> {item.description}</td>
            <td>
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
            </td>
          </tr>
        ))}
        {(listDtRess?.data ?? []).length === 0 && (
          <tr>
            <td colSpan={100}>No Data</td>
          </tr>
        )}
      </table>

      <Pagination
        page={listDtRess?.meta?.current_page ?? 0}
        totalPages={listDtRess?.meta?.last_page ?? 0}
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
          if (params.current.page !== page) {
            params.current = { ...params.current, page: page };
            listDt.refetch();
          }
        }}
      ></Pagination>
    </div>
  );
};

export default memo(Component);
