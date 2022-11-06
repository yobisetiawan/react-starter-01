import { useQuery } from "@tanstack/react-query";
import { Button, Pane, TextInputField, toaster } from "evergreen-ui";
import { memo, useRef } from "react";
import { useForm } from "react-hook-form";

import { API, ManualFetchAPI } from "../../../configs/api";

import v from "../../../configs/validations";

const Page = () => {
  const formDt = useRef({
    old_password: "",
    password: "",
    password_confirmation: "",
  });

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm();

  const { refetch, isFetching } = useQuery(
    ["change-password"],
    () => API.userChangePassword(formDt.current),
    {
      ...ManualFetchAPI,
      onError(err: any) {
        v.setServerError(err, formDt.current, setError);
      },
      onSuccess(dt: any) {
        toaster.success("Passwordd successfully updated!");
        reset();
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
                label="Old Password"
                type={"password"}
                placeholder="Enter your password"
                {...register("old_password", v.required)}
                validationMessage={v.getMessage(errors, "old_password")}
              />
              <TextInputField
                label="New Password"
                type={"password"}
                placeholder="Enter your password"
                {...register("password", v.required)}
                validationMessage={v.getMessage(errors, "password")}
              />
              <TextInputField
                label="Confirm Password"
                type={"password"}
                placeholder="Enter your password"
                {...register("password_confirmation", v.required)}
                validationMessage={v.getMessage(errors, "password_confirmation")}
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
