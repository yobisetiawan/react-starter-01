import React, { memo } from "react";
import { Link, useNavigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

const AppSidebar = ({ children }: Props) => {
  const n = useNavigate();
  const onLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log("/logout");

    n("/login");
  };

  return (
    <div className="app-layout-sidebar">
      <div className="app-sidebar">
        <h3>App Logo</h3>
        <ul className="app-sidebar-main-nav">
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/crud-example">CRUD Example</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/change-password">Change Password</Link>
          </li>
          <li>
            <a href="/logout" onClick={onLogout}>
              Logout
            </a>
          </li>
        </ul>
      </div>
      <div className="app-main-content">{children}</div>
    </div>
  );
};

export default memo(AppSidebar);
