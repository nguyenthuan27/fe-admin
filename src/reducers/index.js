import { Route } from "react-router-dom";
import React from "react";
import { Menu } from "antd";
import Icon from "@ant-design/icons";
import { GEN_MENUS, GEN_ROUTES } from "../actions";

const generateRoutes = (config, parentPath = "") => {
  if (config.hasOwnProperty("routes")) {
    parentPath = config.path;
    return (
      <Route key={config.name} path={config.path}>
        {config.routes.map((item) => generateRoutes(item, parentPath))}
      </Route>
    );
  } else {
    return (
      <Route
        key={config.name}
        path={parentPath + config.path}
        component={config.component}
      />
    );
  }
};

const generateMenuItem = (menu) => {
  if (menu.hasOwnProperty("routes")) {
    return (
      <Menu.SubMenu
        key={menu.name}
        title={
          <span>
            <i class={menu.meta.icon}></i>
            <span style={{ paddingLeft: 20 }}>{menu.name}</span>
          </span>
        }
      >
        {menu.routes.map((item) => generateMenuItem(item))}
      </Menu.SubMenu>
    );
  } else {
    return (
      <Menu.Item key={menu.name}>
        <i class={menu.meta.icon}></i>
        <span style={{ paddingLeft: 10 }}>{menu.name}</span>
      </Menu.Item>
    );
  }
};

export default (
  state = {
    base: [
      {
        name: "Dashboard",
        path: "/dashboard",
        component: require("../pages/dashboard/index").default,
        meta: {
          icon: "bx bxs-dashboard",
        },
      },
      {
        name: "User",
        path: "/user",
        meta: {
          icon: "bx bx-table",
        },
        routes: [
          {
            name: "User",
            path: "/user",
            component: require("../pages/user/user").default,
            meta: {
              icon: "bx bx-id-card",
            },
          },
          {
            name: "Report-Admin",
            path: "/report-admin",
            component: require("../pages/user/reportadmin").default,
            meta: {
              icon: "bx bxs-report",
            },
          },
          {
            name: "Report-Mod",
            path: "/report-mod",
            component: require("../pages/user/report-mod").default,
            meta: {
              icon: "bx bxs-report",
            },
          },
        ],
      },
      {
        name: "Manage",
        path: "/manage",
        meta: {
          icon: "bx bxs-file-blank",
        },
        routes: [
          {
            name: "Products",
            path: "/products",
            component: require("../pages/manage/products").default,
            meta: {
              icon: "bx bxs-file-plus",
            },
          },
          {
            name: "Sales",
            path: "/sales",
            component: require("../pages/manage/sales").default,
            meta: {
              icon: "bx bxs-edit-alt",
            },
          },
          {
            name: "User",
            path: "/user",
            component: require("../pages/manage/user").default,
            meta: {
              icon: "bx bxs-user-rectangle",
            },
          },
        ],
      },
      {
        name: "Option-Product",
        path: "/option-product",
        meta: {
          icon: "bx bxs-wrench",
        },
        routes: [
          {
            name: "Productvariant",
            path: "/productvariant",
            component: require("../pages/option-product/productvariant")
              .default,
            meta: {
              icon: "bx bx-book-bookmark",
            },
          },
          {
            name: "Option",
            path: "/option",
            component: require("../pages/option-product/option").default,
            meta: {
              icon: "bx bx-detail",
            },
          },
          {
            name: "Variant",
            path: "/variant",
            component: require("../pages/option-product/variant").default,
            meta: {
              icon: "bx bx-detail",
            },
          },
        ],
      },
      {
        name: "Products",
        path: "/products",
        component: require("../pages/products/products").default,
        meta: {
          icon: "bx bxs-edit-alt",
        },
      },
      {
        name: "VoucherLog",
        path: "/voucherLog",
        component: require("../pages/VoucherLog/voucherLog").default,
        meta: {
          icon: "bx bxs-edit-alt",
        },
      },
      {
        name: "Staff",
        path: "/staff",
        component: require("../pages/Staff/staff").default,
        meta: {
          icon: "bx bxs-edit-alt",
        },
      },
      {
        name: "Permission",
        path: "/permission",
        component: require("../pages/permission/index").default,
        meta: {
          icon: "bx bxs-group",
        },
      },
      {
        name: "Bill",
        path: "/bill",
        meta: {
          icon: "bx bx-receipt",
        },
        routes: [
          {
            name: "Bill",
            path: "/bill",
            component: require("../pages/bill/bill").default,
            meta: {
              icon: "bx bx-receipt",
            },
          },
        ],
      },
      {
        name: "Shift",
        path: "/shift",
        meta: {
          icon: "bx bx-receipt",
        },
        routes: [
          {
            name: "Shift",
            path: "/shift",
            component: require("../pages/shift/shift").default,
            meta: {
              icon: "bx bx-receipt",
            },
          },
          {
            name: "Shift-staff",
            path: "/shift-staff",
            component: require("../pages/shift/shift-staff").default,
            meta: {
              icon: "bx bx-receipt",
            },
          },
        ],
      },
      {
        name: "Voucher",
        path: "/voucher",
        component: require("../pages/voucher/voucher").default,
        meta: {
          icon: "bx bxs-discount",
        },
      },
    ],
    menus: null,
    routes: null,
  },
  action
) => {
  switch (action.type) {
    case GEN_MENUS:
      return (state = Object.assign(state, {
        menus: state.base.map((item) => generateMenuItem(item)),
      }));
    case GEN_ROUTES:
      return (state = Object.assign(state, {
        routes: state.base.map((item) => generateRoutes(item)),
      }));
    default:
      return state;
  }
};
