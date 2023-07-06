"use client";
import ConfigProvider from "antd/es/config-provider";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetLoading } from "@/redux/loadersSlice";
import { setCurrentUser } from "@/redux/usersSlice";
import axios from "axios";
import { message } from "antd";
import Loader from "./Loader";

function LayoutProvider({ children }: { children: React.ReactNode }) {
  const { currentUser } = useSelector((state: any) => state.users);
  const { loading } = useSelector((state: any) => state.loaders);
  const dispatch = useDispatch();
  const router = useRouter();
  const [showSidebar, setShowSidebar] = useState(true);
  const pathname = usePathname();
  const [menuItems, setMenuItems] = useState([
    {
      name: "Home",
      path: "/",
      icon: "ri-home-7-line",
    },
    {
      name: "Profile",
      path: "/profile",
      icon: "ri-shield-user-line",
    },
    {
      name: "Applications",
      path: "/applications",
      icon: "ri-file-list-2-line",
    },
    {
      name: "Settings",
      path: "/settings",
      icon: "ri-settings-2-line",
    },
    {
      name: "Saved",
      path: "/saved",
      icon: "ri-save-line",
    },
  ]);

  const getCurrentUser = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await axios.get("/api/users/currentuser");
      const isEmployer = response.data.data.userType === "employeer";

      if (isEmployer) {
        const tempMenuItems: any = menuItems;
        tempMenuItems[2].name = "Posted Jobs";
        tempMenuItems[2].path = "/jobs";
        setMenuItems(tempMenuItems);
      }

      dispatch(setCurrentUser(response.data.data));
    } catch (error: any) {
      message.error(error.response.data.message || "Something went wrong");
      message.error("Please clear your cookies and try again");
    } finally {
      dispatch(SetLoading(false));
    }
  };

  useEffect(() => {
    if (pathname !== "/login" && pathname !== "/register" && !currentUser) {
      getCurrentUser();
    }
  }, [pathname]);

  const onLogout = async () => {
    try {
      dispatch(SetLoading(true));
      await axios.post("/api/users/logout");
      message.success("Logged out successfully");
      dispatch(setCurrentUser(null));
      router.push("/login");
    } catch (error: any) {
      message.error(error.response.data.message || "Something went wrong");
    } finally {
      dispatch(SetLoading(false));
    }
  };

  return (
    <html lang="en">
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@3.2.0/fonts/remixicon.css"
          rel="stylesheet"
        />
      </head>
      <body>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#2f5086",
            },
          }}
        >
          {loading && <Loader />}

          {pathname === "/login" || pathname === "/register" ? (
            <div>{children}</div>
          ) : (
            currentUser && (
              <div className="layout-parent">
                <div className="sidebar">
                  <div className="logo">
                    {showSidebar ? (
                      <>
                        <h1>Job App</h1>{" "}
                        <i
                          className="ri-close-line"
                          onClick={() => setShowSidebar(!showSidebar)}
                        />
                      </>
                    ) : (
                      <i
                        className="ri-menu-2-line"
                        onClick={() => setShowSidebar(!showSidebar)}
                      />
                    )}
                  </div>

                  <div className="menu-items">
                    {menuItems.map((item) => {
                      const isActive = pathname === item.path;
                      return (
                        <div
                          className={`menu-item ${
                            isActive ? "active-menu-item" : ""
                          }`}
                          key={item.name}
                          onClick={() => router.push(item.path)}
                        >
                          <i className={item.icon} />
                          {showSidebar && <span>{item.name}</span>}
                        </div>
                      );
                    })}
                  </div>

                  <div className="user-info flex justify-between items-center">
                    {showSidebar && (
                      <div className="flex flex-col">
                        <span>{currentUser?.name}</span>
                        <span>{currentUser?.email}</span>
                      </div>
                    )}
                    <i
                      className="ri-logout-box-r-line"
                      style={{ cursor: "pointer" }}
                      onClick={onLogout}
                    />
                  </div>
                </div>
                <div className="body">{children}</div>
              </div>
            )
          )}
        </ConfigProvider>
      </body>
    </html>
  );
}

export default LayoutProvider;
