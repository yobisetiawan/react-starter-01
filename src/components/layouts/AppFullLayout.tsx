import { Link, Pane } from "evergreen-ui";
import React, { memo } from "react";
import { Link as RouteLink } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

const AppFullLayout = ({ children }: Props) => {
  return (
    <div className="">
      {children}
      <hr className="m-0"></hr>
      <Pane className="text-center" padding={10}>
        <Link is={RouteLink} to="/" className="mx-1 app-link">
          Home
        </Link>
        <Link is={RouteLink} to="/about" className="mx-1 app-link">
          About
        </Link>
        <Link is={RouteLink} to="/dashboard" className="mx-1 app-link">
          Dashboard
        </Link>
        <Link is={RouteLink} to="/login" className="mx-1 app-link">
          Login
        </Link>
      </Pane>
    </div>
  );
};

export default memo(AppFullLayout);
