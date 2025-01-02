import React from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import "../../styles/Sidebar/Sidebar.scss";
import { image } from "../../assets/images.js";
import { sidebarItems } from "../../libs/GenrateSidebarItems.jsx";

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  // Function to check if the current route should show Users tab as active
  const isActiveRoute = (path) => {
    // Check if current path is users, user detail, or request list
    if (path === "/users") {
      return (
        currentPath === "/users" ||
        currentPath.startsWith("/users/") ||
        currentPath.startsWith("/requestlist/")
      );
    }
    return currentPath === path;
  };

  return (
    <div
      id="sidebar"
      className="sideBarScroll d-flex flex-column !w-inherit overflow-y-auto p-4 !scrollbar-none"
    >
      <div className="px-6 py-8 flex justify-center items-center">
        <img src={image.Logo} alt="Logo" className="h-[102px] w-[150px]" />
      </div>

      <div className="mynav">
        {sidebarItems.map((item) => (
          <div className="nav-item" key={item.name}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `nav-item-link ${isActiveRoute(item.path) ? "active-link" : ""}`
              }
            >
              <span className="nav-icon">
                {React.cloneElement(item.icon, {
                  className: "custom-icon"
                })}
              </span>
              {item.name}
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
