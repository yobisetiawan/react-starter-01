import { useMutation } from "@tanstack/react-query";
import {
  Button,
  Card,
  Heading,
  Link,
  Pane,
  TextInputField,
} from "evergreen-ui";
import { useAtom } from "jotai";
import { memo, useRef } from "react";
import { useForm } from "react-hook-form";
import { Link as RouteLink, useNavigate } from "react-router-dom";
import CheckUser from "../../../components/layouts/CheckUser";
import { API } from "../../../configs/api";
import { styles } from "../../../configs/styles";
import v from "../../../configs/validations";
import { authTokenAtom } from "../../../storage/auth";

const Page = () => {
  const n = useNavigate();

  const formDt = useRef({
    email: "",
    password: "",
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ defaultValues: formDt.current });

  const [, setToken] = useAtom(authTokenAtom);

  const { mutate, isLoading } = useMutation(
    ["login"],
    () => API.login(formDt.current),
    {
      onError(err: any) {
        v.setServerError(err, formDt.current, setError);
      },
      onSuccess(dt: any) {
        localStorage.setItem("token", dt?.data?.token);
        setToken(dt?.data?.token);
        n("/dashboard");
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
                Login
              </Heading>

              <Card elevation={1} padding={20}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <TextInputField
                    label="Email"
                    type={"email"}
                    placeholder="Enter your email"
                    {...register("email", v.required)}
                    validationMessage={v.getMessage(errors, "email")}
                  />
                  <TextInputField
                    label="Password"
                    type={"password"}
                    placeholder="Enter your password"
                    {...register("password", v.required)}
                    validationMessage={v.getMessage(errors, "password")}
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

              <div className="mt-3">
                <Link
                  is={RouteLink}
                  to="/forgot-password"
                  className="me-3 app-link"
                >
                  Forgot Password
                </Link>
                <Link is={RouteLink} to="/register" className="me-3 app-link">
                  Register
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Pane>
    </CheckUser>
  );
};

export default memo(Page);
