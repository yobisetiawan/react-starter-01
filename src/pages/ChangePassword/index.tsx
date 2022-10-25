import { Button, Heading, Pane, TextInputField } from "evergreen-ui";
import { memo } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import AppSidebar from "../../components/layouts/AppSidebar";
import { styles } from "../../configs/styles";
import v from "../../configs/validations";

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
    <AppSidebar>
      <div className="p-3">
        <Heading is="h1" size={styles.fontSizeH1}>
          Change Password
        </Heading>
        <hr />
        <Pane>
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
              {...register("confirm_password", v.required)}
              validationMessage={v.getMessage(errors, "confirm_password")}
            />
            <Button type="submit" marginRight={16} appearance="primary">
              Submit
            </Button>
          </form>
        </Pane>
      </div>
    </AppSidebar>
  );
};

export default memo(Page);
