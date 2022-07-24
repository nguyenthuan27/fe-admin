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
import SalesModal from "../../component/modal/salesInfo";
import API from "../../api/manage";
import { SearchOutlined, PlusSquareOutlined } from "@ant-design/icons";
const { Panel } = Collapse;
const { Option } = Select;
const { TabPane } = Tabs;
const { TextArea } = Input;
const Sales = () => {
  const initialPanes = [
    { title: "Đơn hàng  1", content: "Content of Tab 1", key: "1" },
  ];

  const [activeKey, setActiveKey] = useState(initialPanes[0].key);
  const [panes, setPanes] = useState(initialPanes);
  const [listProductVariant, setListProductVariant] = useState();
  const [productVariant, setProductVariant] = useState();
  const [customer, setCustomer] = useState({
    fullName: "",
    id: "",
  });
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
    labelCol: {
      span: 12,
    },
  };
  const [isVisible, setIsVisible] = useState(false);

  const onFinish = () => {
    
  };

  const onChanges = (value) => {
    setProductVariant(value);
  };

  const onSearch = (value) => {
    console.log("search:", value);
  };

  const getListProductVariant = async () => {
    let data = await API.getListProductVariantForBill();
    const listProductVariant = data.result;
    setListProductVariant(listProductVariant);
    console.log(listProductVariant);
  };

  const createBillOff = async () => {
    let data = await API.createBillOff();
    const listProductVariant = data.result;
  };

  useEffect(() => {
    getListProductVariant();
  }, []);
  return (
    <>
      <Row className="subject-default">
        <Col span={24} className="title">
          Bán hàng tại quầy
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
          <Select
            showSearch
            placeholder="Chọn sản phẩm để thêm vào hóa đơn"
            optionFilterProp="children"
            onChange={onChanges}
            value={productVariant}
            onSearch={onSearch}
          >
            {listProductVariant?.map((data) => {
              return (
                <Option key={data.variant_id} value={data.variant_id}>
                  <div>
                    <img src={data?.listimg[0]} height="70px"></img>
                  </div>
                </Option>
              );
            })}
          </Select>
          <Row className="d-flex justify-content-space-between ">
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
            <Col span={9} className="payment">
              <Col span={18} className="title">
                <Form {...layout} name="nest-messages" onFinish={onFinish}>
                  <Form.Item
                    name="gender"
                    label=""
                    labelAlign="left"
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
                    label=""
                    rules={[{ required: true }]}
                  >
                    <div
                      className="select-user"
                      style={{
                        width: "calc(60%)",
                      }}
                    >
                      <Input placeholder="input text above" value={customer.fullName}/>
                      <div className="search">
                        <SearchOutlined />
                      </div>
                      <div className="create-user">
                        <PlusSquareOutlined
                          onClick={() => setIsVisible(true)}
                        />
                      </div>
                    </div>
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
                  <Form.Item
                    name="amount"
                    label="Tổng tiền cần thanh toán"
                  ></Form.Item>
                  <Form.Item name="amount" label="Khách thanh toán">
                    <Input
                      style={{
                        width: "calc(60%)",
                      }}
                    />
                  </Form.Item>
                  <Form.Item name="text-arena">
                    <TextArea rows={3} style={{ width: "calc(140%)" }} />
                  </Form.Item>
                  <br />
                  <br />
                  <Form.Item name="radio-group" label="">
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
            </Col>
          </Row>
        </Col>
      </Row>
      <SalesModal setIsVisible={setIsVisible} isVisible={isVisible} setCustomer={setCustomer}/>
    </>
  );
};
export default Sales;
