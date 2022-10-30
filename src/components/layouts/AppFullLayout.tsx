import { Link, Pane } from "evergreen-ui";
import React, { memo } from "react";
import { Link as RouteLink } from "react-router-dom";
import GetCheckUser from "./GetCheckUser";

interface Props {
  children: React.ReactNode;
}

const AppFullLayout = ({ children }: Props) => {
  return (
    <GetCheckUser>
      <div className="">
        {children}
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
      </div>
    </GetCheckUser>
  );
};

export default memo(AppFullLayout);
