import { useQuery } from "@tanstack/react-query";
import { Button, Pane } from "evergreen-ui";
import { memo } from "react";

//import { useNavigate } from "react-router-dom";
import { API, ManualFetchAPI } from "../../../configs/api";

import v from "../../../configs/validations";

const Page = () => {
  //const n = useNavigate();

  const { isFetching } = useQuery(["login"], () => API.userDeleteAccount(), {
    ...ManualFetchAPI,
    onError(err: any) {
      v.setServerError(err, {});
    },
    onSuccess(dt: any) {},
  });

  return (
    <div>
      <Pane>
        <div className="row">
          <div className="col-lg-6">
            <Button
              isLoading={isFetching}
              marginRight={16}
              appearance="primary"
              intent="danger"
            >
              Delete Account
            </Button>
          </div>
        </div>
      </Pane>
    </div>
  );
};

export default memo(Page);
