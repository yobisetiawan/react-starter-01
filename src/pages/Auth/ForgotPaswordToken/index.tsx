import { Button, Card, Heading, Pane, TextInputField } from "evergreen-ui";
import { memo } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CheckUser from "../../../components/layouts/CheckUser";

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
    n("/reset-password");
  };

  return (
    <CheckUser>
      <Pane>
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <Heading is="h1" marginBottom={20} size={styles.fontSizeH1}>
                Forgot Password Token
              </Heading>

              <Card elevation={1} padding={20}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <TextInputField
                    label="Token"
                    {...register("token", v.required)}
                    validationMessage={v.getMessage(errors, "token")}
                    placeholder="Enter your token"
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
    </CheckUser>
  );
};

export default memo(Page);
