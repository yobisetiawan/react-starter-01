import { Button, Card, Heading, Pane, TextInputField } from "evergreen-ui";
import { memo } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
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
    n("/login");
  };
  return (
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
                  {...register("confirm_password", v.required)}
                  validationMessage={v.getMessage(errors, "confirm_password")}
                />
                <Button type="submit" marginRight={16} appearance="primary">
                  Submit
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </Pane>
  );
};

export default memo(Page);
