import { useQuery } from "@tanstack/react-query";
import { Button, Dialog, Pane } from "evergreen-ui";
import { useAtom } from "jotai";
import { memo, useState } from "react";

import { useNavigate } from "react-router-dom";
import { API, ManualFetchAPI } from "../../../configs/api";

import { authUserAtom } from "../../../storage/auth";

const Page = () => {
  const n = useNavigate();

  const [isShown, setIsShown] = useState(false);
  const [, setUser] = useAtom(authUserAtom);

  const { isFetching, refetch } = useQuery(
    ["delete-account"],
    () => API.userDeleteAccount(),
    {
      ...ManualFetchAPI,
      onSuccess(dt: any) {
        localStorage.removeItem("token");
        setUser(null);

        n("/login");
      },
    }
  );

  return (
    <div>
      <Pane>
        <div className="row">
          <div className="col-lg-6">
            <Dialog
              isShown={isShown}
              title="Dialog title"
              intent="danger"
              onCloseComplete={() => setIsShown(false)}
              confirmLabel="Delete"
              onConfirm={() => {
                refetch();
              }}
            >
              Are you sure you want to delete your account?
            </Dialog>
            <Button
              isLoading={isFetching}
              marginRight={16}
              appearance="primary"
              intent="danger"
              onClick={() => {
                setIsShown(true);
              }}
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
