import { useQuery } from "@tanstack/react-query";
import { Button, FilePicker, Pane, toaster } from "evergreen-ui";
import { useAtom } from "jotai";
import { memo, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { API, ManualFetchAPI } from "../../../configs/api";

import v from "../../../configs/validations";
import { authUserAtom } from "../../../storage/auth";

const Page = () => {
  const [, setUser] = useAtom(authUserAtom);
  const [resetFileInput, setResetFileInput] = useState(false);
  const formDt = useRef({
    avatar: null,
  }) as any;

  const { handleSubmit, setError, setValue, clearErrors, reset } = useForm({
    defaultValues: formDt.current,
  });

  const { refetch, isFetching } = useQuery(
    ["login"],
    () => API.userChangeAvatar(formDt.current),
    {
      ...ManualFetchAPI,
      onError(err: any) {
        v.setServerError(err, { avatar: "" }, setError);
      },
      onSuccess(dt: any) {
        toaster.success("Avatar successfully updated!");
        setResetFileInput(true);
        reset();
        setUser(dt?.data?.data);
      },
    }
  );

  const onSubmit = (data: any) => {
    let dt = new FormData();

    dt.append("avatar", data.avatar ? data["avatar"][0] ?? null : null);
    dt.append("relations", "avatar");
    formDt.current = dt;
    refetch();
  };

  useEffect(() => {
    if (resetFileInput) {
      setResetFileInput(false);
    }
  }, [resetFileInput]);

  return (
    <div>
      <Pane>
        <div className="row">
          <div className="col-lg-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                {!resetFileInput && (
                  <FilePicker
                    name="avatar"
                    onChange={(files) => {
                      clearErrors("avatar");
                      setValue("avatar", files);
                    }}
                    placeholder="Select the file here!"
                  />
                )}
              </div>

              <Button
                type="submit"
                isLoading={isFetching}
                marginRight={16}
                appearance="primary"
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
