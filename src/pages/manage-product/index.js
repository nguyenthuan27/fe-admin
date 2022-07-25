import { useEffect, useState } from "react";
import {
  Col,
  Form,
  Collapse,
  Row,
  Table,
  Input,
  Button,
  Space,
  Tabs,
} from "antd";
const { TabPane } = Tabs;
const ManageProduct = () => {
  const [currentTab, setCurrentTab] = useState(1);
  const handleChangeTab = () => {};
  return (
    <>
      <Tabs onChange={handleChangeTab} type="card">
        <TabPane tab="Tab 1" key="1">
          Content of Tab Pane 1
        </TabPane>
        <TabPane tab="Tab 2" key="2">
          Content of Tab Pane 2
        </TabPane>
        <TabPane tab="Tab 3" key="3">
          Content of Tab Pane 3
        </TabPane>
      </Tabs>
    </>
  );
};
export default ManageProduct;
