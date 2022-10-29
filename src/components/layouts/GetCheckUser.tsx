import { useQuery } from "@tanstack/react-query";
import { Spinner } from "evergreen-ui";
import { useAtom } from "jotai";
import React, { memo, useEffect } from "react";
import { API, ManualFetchAPI } from "../../configs/api";
import { authUserAtom } from "../../storage/auth";

interface Props {
  children: React.ReactNode;
}

const Component = ({ children }: Props) => {
  const [user, setUser] = useAtom(authUserAtom);

  const { isLoading, refetch } = useQuery(["user"], () => API.user(), {
    ...ManualFetchAPI,
    onSuccess(ress) {
      setUser(ress?.data?.data);
    },
  });

  useEffect(() => {
    if (user?.id === undefined) {
      refetch();
    }
  }, [refetch, user]);

  if (isLoading) {
    return (
      <div className="app-loading d-flex justify-content-center align-items-center">
        <div>
          <div className="d-flex justify-content-center align-items-center mb-2">
            <Spinner />
          </div>
        </div>
      </div>
    );
  }

  if (user?.id) {
    return <>{children}</>;
  }

  return <div>Loading...</div>;
};

export default memo(Component);
