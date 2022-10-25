import {
  Button,
  Card,
  Heading,
  Link,
  Pane,
  TextInputField,
} from "evergreen-ui";
import { memo } from "react";
import { useForm } from "react-hook-form";
import { Link as RouteLink, useNavigate } from "react-router-dom";
import { styles } from "../../../configs/styles";
import v from "../../../configs/validations";

const Page = () => {
  const n = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
    n("/dashboard");
  };

  return (
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
                <Button type="submit" marginRight={16} appearance="primary">
                  Submit
                </Button>
              </form>
            </Card>

            <div className="mt-3">
              <Link is={RouteLink} to="/forgot-password" className="me-3">
                Forgot Password
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Pane>
  );
};

export default memo(Page);
