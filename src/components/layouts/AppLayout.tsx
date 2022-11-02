import { Pane } from "evergreen-ui";
import React, { memo } from "react";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <Pane>
      <Outlet />
    </Pane>
  );
};

export default memo(AppLayout);
