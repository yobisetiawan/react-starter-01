import { useQuery } from "@tanstack/react-query";
import { Link, Spinner, Text } from "evergreen-ui";
import { useAtom } from "jotai";
import React, { memo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API, ManualFetchAPI } from "../../configs/api";
import { authUserAtom } from "../../storage/auth";

interface Props {
  children: React.ReactNode;
}

const Component = ({ children }: Props) => {
  const n = useNavigate();
  const [user, setUser] = useAtom(authUserAtom);

  const { isFetching, refetch } = useQuery(["user"], () => API.user(), {
    ...ManualFetchAPI,
    onSuccess(ress) {
      setUser(ress?.data?.data);
    },
    onError(err: any) {
      if (err?.response?.status === 401) {
        n("/login");
      }
    },
  });

  useEffect(() => {
    if (user?.id === undefined) {
      refetch();
    }
  }, [refetch, user]);

  if (isFetching) {
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

  return (
    <div className="app-loading d-flex justify-content-center align-items-center">
      <div>
        <div>
          <Text>Unable to load user data!</Text>
        </div>
        <div>
          <Link
            href="#"
            onClick={() => {
              localStorage.removeItem("token");
              n("/login");
            }}
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default memo(Component);
