import { Link, Pane } from "evergreen-ui";
import React, { memo } from "react";
import { Link as RouteLink, Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <Pane>
      <Outlet />

      <hr className="m-0"></hr>
      <Pane className="text-center" padding={10}>
        <Link is={RouteLink} to="/" className="mx-1">
          Home
        </Link>
        <Link is={RouteLink} to="/about" className="mx-1">
          About
        </Link>
        <Link is={RouteLink} to="/dashboard" className="mx-1">
          Dashboard
        </Link>
        <Link is={RouteLink} to="/login" className="mx-1">
          Login
        </Link>
      </Pane>
    </Pane>
  );
};

export default memo(AppLayout);
