import React, { useEffect, useState } from "react";
import { generateMenus } from "./actions";
import Icon from "@ant-design/icons";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Badge, Breadcrumb, Layout, Menu, Popover } from "antd";
import { withRouter } from "react-router-dom";
import { createStore } from "redux";
import reducers from "./reducers";
import "./App.scss";

const { Header, Sider, Content } = Layout;
const store = createStore(reducers);
const routes = store.getState().base;

const App = (props) => {
  let currentPaths = props.location.pathname.split("/").slice(1);
  currentPaths = currentPaths.map((i) =>
    i.replace(/^\S/, (s) => s.toUpperCase())
  );
  store.dispatch(generateMenus());
  const [collapsed, setCollapsed] = useState(false);
  const [openKeys, setOpenKeys] = useState(currentPaths);
  useEffect(
    () =>
      props.location.pathname === "/"
        ? props.history.push("/dashboard")
        : undefined,
    [props.history, props.location]
  );

  const handleLink = (item) => {
    const path = "/" + item.keyPath.reverse().join("/").toLowerCase();
    if (props.location.pathname === path) {
      return;
    }
    props.history.push(path);
  };

  const breadcrumbs = [];

  const genBreadcrumbItem = (routes) => {
    routes.forEach((route) => {
      if (route.hasOwnProperty("routes")) {
        currentPaths.includes(route.name) && breadcrumbs.push(route);
        genBreadcrumbItem(route.routes);
      } else {
        currentPaths.includes(route.name) && breadcrumbs.push(route);
      }
    });
  };

  genBreadcrumbItem(routes);

  const logout = () => {};

  return (
    <Layout className={"container"}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className={"logo"}>
          {collapsed ? "" : <span>Fpoly Admin</span>}
        </div>
        <Menu
          onClick={handleLink}
          theme="dark"
          mode="inline"
          selectedKeys={currentPaths.slice(-1)}
          onOpenChange={(val) => setOpenKeys(val)}
          openKeys={openKeys}
          defaultSelectedKeys={["Dashboard"]}
        >
          {store.getState().menus}
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: "#fff", padding: 0 }}>
          {/* <Icon
            className={"trigger"}
            type={collapsed ? "menu-unfold" : "menu-fold"}
            onClick={() => setCollapsed(!collapsed)}
          /> */}
          <i
            class="bx bx-menu"
            style={{
              fontSize: 25,
              paddingLeft: 20,
              cursor: "pointer",
              paddingTop: 15,
            }}
            onClick={() => setCollapsed(!collapsed)}
          ></i>
          <Breadcrumb>
            <Breadcrumb.Item key={"Home"}>
              <i class="bx bx-home-alt"></i>
              <span style={{ paddingLeft: 10 }}>Home</span>
            </Breadcrumb.Item>
            {breadcrumbs.map((item) => (
              <Breadcrumb.Item key={item.name}>
                <i class={item.meta.icon}></i>
                <span style={{ paddingLeft: 10 }}>{item.name}</span>
              </Breadcrumb.Item>
            ))}
          </Breadcrumb>
          <div className="header-right-wrapper">
            <Badge dot>
              <i class="bx bxs-bell"></i>
            </Badge>
            <Popover
              placement={"bottom"}
              content={<a onClick={logout}>Logout</a>}
              trigger="click"
            >
              <Avatar size="large" icon={<UserOutlined />} />
            </Popover>
          </div>
        </Header>
        <Content
          className="content"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          {props.children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default withRouter(App);
