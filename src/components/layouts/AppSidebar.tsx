import { useAtom } from "jotai";
import React, { memo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../../configs/api";
import { authUserAtom } from "../../storage/auth";
import GetCheckUser from "./GetCheckUser";

interface Props {
  children: React.ReactNode;
}

const AppSidebar = ({ children }: Props) => {
  const n = useNavigate();
  const [user, setUser] = useAtom(authUserAtom);

  const onLogout = (e: React.MouseEvent) => {
    e.preventDefault();

    API.logout();
    localStorage.removeItem("token");
    setUser(null);

    n("/login");
  };

  return (
    <GetCheckUser>
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
              <Link to="/crud-example">CRUD Complex</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          </ul>

          <div className="mt-5">
            <div>{user?.name}</div>
            <div>
              <a href="/logout" onClick={onLogout}>
                Logout
              </a>
            </div>
          </div>
        </div>
        <div className="app-main-content">{children}</div>
      </div>
    </GetCheckUser>
  );
};

export default memo(AppSidebar);
