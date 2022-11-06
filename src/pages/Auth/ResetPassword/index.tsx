import { useMutation } from "@tanstack/react-query";
import { Button, Card, Heading, Pane, TextInputField, toaster } from "evergreen-ui";
import { useAtom } from "jotai";
import { memo, useRef } from "react";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import CheckUser from "../../../components/layouts/CheckUser";
import { API } from "../../../configs/api";
import { styles } from "../../../configs/styles";
import v from "../../../configs/validations";
import { authForgotPasswordAtom } from "../../../storage/auth";

const Page = () => {
  const n = useNavigate();

  const [FP] = useAtom(authForgotPasswordAtom);

  const formDt = useRef({
    email: "",
    code: "",
    password: "",
    password_confirmation: "",
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ defaultValues: formDt.current });

  const { mutate, isLoading } = useMutation(
    ["forgot-password"],
    () => API.resetPassword(formDt.current),
    {
      onError(err: any) {
        v.setServerError(err, formDt.current, setError);
      },
      onSuccess(dt: any) {
        toaster.success("Your password successfully updated!");
        n("/login"); 
      },
    }
  );

  const onSubmit = (data: any) => {
    formDt.current = {
      ...data,
      email: FP.email,
    };
    mutate();
  };

  if (FP.email === "") {
    return <Navigate to="/forgot-password" replace />;
  }

  return (
    <CheckUser>
      <Pane>
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <Heading is="h1" marginBottom={20} size={styles.fontSizeH1}>
                Reset Password
              </Heading>

              <Card elevation={1} padding={20}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <TextInputField
                    label="Token"
                    placeholder="Enter your Code"
                    {...register("code", v.required)}
                    validationMessage={v.getMessage(errors, "code")}
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
                    validationMessage={v.getMessage(
                      errors,
                      "password_confirmation"
                    )}
                  />
                  <Button
                    type="submit"
                    isLoading={isLoading}
                    marginRight={16}
                    appearance="app_btn"
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
