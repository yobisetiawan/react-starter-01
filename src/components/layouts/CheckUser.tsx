import { useAtom } from "jotai";
import React, { memo } from "react";
import { Navigate } from "react-router-dom";

import { authUserAtom } from "../../storage/auth";

interface Props {
  children: React.ReactNode;
}

const Component = ({ children }: Props) => {
  const [user] = useAtom(authUserAtom);

  if (user?.id) {
    return <Navigate to="/dashboard" replace={true} />;
  }

  return <>{children}</>;
};

export default memo(Component);
