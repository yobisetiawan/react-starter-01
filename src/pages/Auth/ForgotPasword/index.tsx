import { useMutation } from "@tanstack/react-query";
import { Button, Card, Heading, Pane, TextInputField } from "evergreen-ui";
import { useAtom } from "jotai";
import { memo, useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CheckUser from "../../../components/layouts/CheckUser";
import { API } from "../../../configs/api";

import { styles } from "../../../configs/styles";
import v from "../../../configs/validations";
import { authForgotPasswordAtom } from "../../../storage/auth";

const Page = () => {
  const n = useNavigate();

  const [, setFP] = useAtom(authForgotPasswordAtom);

  const formDt = useRef({
    email: "",
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ defaultValues: formDt.current });

  const { mutate, isLoading } = useMutation(
    ["forgot-password"],
    () => API.forgotPassword(formDt.current),
    {
      onError(err: any) {
        v.setServerError(err, formDt.current, setError);
      },
      onSuccess(dt: any) {
        setFP({
          token: "",
          email: formDt.current.email,
        });
        n("/reset-password");
      },
    }
  );

  const onSubmit = (data: any) => {
    formDt.current = data;
    mutate();
  };

  return (
    <CheckUser>
      <Pane>
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <Heading is="h1" marginBottom={20} size={styles.fontSizeH1}>
                Forgot Password
              </Heading>

              <Card elevation={1} padding={20}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <TextInputField
                    label="Email"
                    placeholder="Enter your email"
                    {...register("email", v.required)}
                    validationMessage={v.getMessage(errors, "email")}
                  />

                  <Button
                    marginRight={16}
                    isLoading={isLoading}
                    appearance="app_btn"
                    type="submit"
                  >
                    Submit
                  </Button>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </Pane>
    </CheckUser>
  );
};

export default memo(Page);
