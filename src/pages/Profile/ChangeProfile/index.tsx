import { useQuery } from "@tanstack/react-query";
import { Button, Pane, TextInputField, toaster } from "evergreen-ui";
import { useAtom } from "jotai";
import { memo, useRef } from "react";
import { useForm } from "react-hook-form";

import { API, ManualFetchAPI } from "../../../configs/api";

import v from "../../../configs/validations";
import { authUserAtom } from "../../../storage/auth";

const Page = () => {
  const [user, setUser] = useAtom(authUserAtom);

  const formDt = useRef({
    name: user?.name ?? "",
    relations: "avatar"
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ defaultValues: formDt.current });

  const { refetch, isFetching } = useQuery(
    ["change-profile"],
    () => API.userChangeProfile(formDt.current),
    {
      ...ManualFetchAPI,
      onError(err: any) {
        v.setServerError(err, formDt.current, setError);
      },
      onSuccess(dt: any) {
        toaster.success("Profile successfully saved!");
        setUser(dt?.data?.data);
      },
    }
  );

  const onSubmit = (data: any) => {
    formDt.current = data;
    refetch();
  };

  return (
    <div>
      <Pane>
        <div className="row">
          <div className="col-lg-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextInputField
                label="Name"
                placeholder="Enter your password"
                {...register("name", v.required)}
                validationMessage={v.getMessage(errors, "name")}
              />

              <Button
                type="submit"
                isLoading={isFetching}
                marginRight={16}
                appearance="app_btn"
              >
                Submit
              </Button>
            </form>
          </div>
        </div>
      </Pane>
    </div>
  );
};

export default memo(Page);
