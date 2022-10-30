import { Link, Pane } from "evergreen-ui";
import React, { memo } from "react";
import { Link as RouteLink, Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <Pane>
      <Outlet />
    </Pane>
  );
};

export default memo(AppLayout);
