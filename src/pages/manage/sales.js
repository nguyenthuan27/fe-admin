import "./subjects.scss";
import { useEffect, useRef, useState } from "react";
import {
  Col,
  Form,
  Collapse,
  Row,
  Radio,
  Input,
  Button,
  Select,
  Tabs,
} from "antd";
import { SearchOutlined, PlusSquareOutlined } from "@ant-design/icons";
const { Panel } = Collapse;
const { Option } = Select;
const { TabPane } = Tabs;
const Sales = () => {
  const initialPanes = [
    { title: "Đơn hàng  1", content: "Content of Tab 1", key: "1" },
  ];
  const [activeKey, setActiveKey] = useState(initialPanes[0].key);
  const [panes, setPanes] = useState(initialPanes);
  const newTabIndex = useRef(0);
  const onChange = (newActiveKey) => {
    setActiveKey(newActiveKey);
  };
  const add = () => {
    const newActiveKey = `newTab${newTabIndex.current++}`;
    const newPanes = [...panes];
    newPanes.push({
      title: "Đơn hàng " + (Number(newTabIndex.current) + 1),
      content: "Content of new Tab",
      key: newActiveKey,
    });
    setPanes(newPanes);
    setActiveKey(newActiveKey);
  };

  const remove = (targetKey) => {
    let newActiveKey = activeKey;
    let lastIndex = -1;
    panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newPanes = panes.filter((pane) => pane.key !== targetKey);
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key;
      } else {
        newActiveKey = newPanes[0].key;
      }
    }
    setPanes(newPanes);
    setActiveKey(newActiveKey);
  };
  const onEdit = (targetKey, action) => {
    if (action === "add") {
      add();
    } else {
      remove(targetKey);
    }
  };
  const layout = {
    labelCol: { span: 8 },
  };
  const onFinish = () => {};
  return (
    <Row className="subject-default">
      <Col span={24} className="title">
        Bán hàng tại quầy
      </Col>
      <Col span={24}>
        <Button type="primary">
          <i class="bx bx-plus"></i>
          <span>Thêm mới</span>
        </Button>
      </Col>
      <Col span={24} className="subject-search">
        <Form layout="vertical" autoComplete="off">
          <Collapse>
            <Panel header="Tìm" key="1">
              <Row span={24} className="subject-filter">
                <Col span={5}>
                  <Form.Item label="Tên môn học">
                    <Input placeholder="Tên môn học" onChange={(e) => {}} />
                  </Form.Item>
                </Col>
              </Row>
            </Panel>
          </Collapse>
        </Form>
      </Col>
      <Col span={24}>
        <Row className="d-flex justify-content-space-between ">
          <Col span={14} className="action-order">
            <Tabs
              type="editable-card"
              onChange={onChange}
              activeKey={activeKey}
              onEdit={onEdit}
            >
              {panes.map((pane) => (
                <TabPane
                  tab={pane.title}
                  key={pane.key}
                  closable={pane.closable}
                >
                  {pane.content}
                </TabPane>
              ))}
            </Tabs>
          </Col>
          <Col span={9} className="payment">
            <Form {...layout} name="nest-messages" onFinish={onFinish}>
              <Form.Item
                name="gender"
                label="Nhân viên"
                rules={[{ required: true }]}
              >
                <Select
                  style={{
                    width: "calc(38%)",
                  }}
                  placeholder="Select a option and change input text above"
                  // onChange={onGenderChange}
                  allowClear
                >
                  <Option value="1">thuan</Option>
                  <Option value="2">ngo</Option>
                  <Option value="3">binh</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="gender"
                label="Khách hàng"
                rules={[{ required: true }]}
              >
                <div
                  className="select-user"
                  style={{
                    width: "calc(60%)",
                  }}
                >
                  <Input placeholder="input text above" />
                  <div className="search">
                    <SearchOutlined />
                  </div>
                  <div className="create-user">
                    <PlusSquareOutlined />
                  </div>
                </div>
              </Form.Item>
              <Form.Item name="amount" label="Số lượng sản phẩm">
                <Input
                  style={{
                    width: "calc(60%)",
                  }}
                />
              </Form.Item>
              <Form.Item name="amount" label="Tổng tiền hàng">
                <Input
                  style={{
                    width: "calc(60%)",
                  }}
                />
              </Form.Item>
              <Form.Item name="amount" label="Giảm giá">
                <Input
                  style={{
                    width: "calc(60%)",
                  }}
                />
              </Form.Item>
              <Form.Item name="amount" label="Tổng tiền cần thanh toán">
                <Input
                  style={{
                    width: "calc(60%)",
                  }}
                />
              </Form.Item>
              <Form.Item name="amount" label="Số tiền khách trả">
                <Input
                  style={{
                    width: "calc(60%)",
                  }}
                />
              </Form.Item>
              <Form.Item name="amount" label="Số tiền trả lại cho khách">
                <Input
                  style={{
                    width: "calc(60%)",
                  }}
                />
              </Form.Item>
              <Form.Item name="radio-group" label="Phương thức thanh toán">
                <Radio.Group>
                  <Radio value="a">Tiền mặt</Radio>
                  <Radio value="b">Chuyển khoản</Radio>
                  <Radio value="c">Thẻ</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item>
                <div className="btn-pay">
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
export default Sales;
