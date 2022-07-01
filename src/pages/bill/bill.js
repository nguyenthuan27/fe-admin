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
  Select,
} from "antd";
import { DeleteOutlined, EyeOutlined, EditTwoTone } from "@ant-design/icons";
import "./bill.scss";
import BillModal from "../../component/modal/billInfo";
import API from "../../api/others";
const { Panel } = Collapse;
const BillManager = () => {
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState({
    type: false,
    action: "create",
  });
  const [listBill, setListBill] = useState([]);
  const { Option } = Select;
  const getListBill = async () => {
    setLoading(true);
    const res = await API.getListBill();
    setListBill(res.result);
    setLoading(false);
  };

  useEffect(() => {
    getListBill();
  }, []);

  const columns = [
    {
      title: "Bill code",
      dataIndex: "bill_code",
      key: "bill_code",
    },
    {
      title: "Customer",
      render: (text, record) => {
        return <span>{record.customer.customer_name}</span>;
      },
    },
    {
      title: "payment_vi",
      dataIndex: "payment_vi",
      key: "payment_vi",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Ship price",
      dataIndex: "ship_price",
      key: "ship_price",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Total price",
      dataIndex: "total_price",
      key: "total_price",
    },
    {
      title: "Price after voucher",
      dataIndex: "price_after_voucher",
      key: "price_after_voucher",
    },
    {
      title: "Create date",
      dataIndex: "create_date",
      key: "create_date",
    },
    {
      title: "State",
      dataIndex: "state",
      key: "state",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <a
            onClick={() =>
              setIsVisible({
                type: true,
                action: "edit",
                id: record.bill_id,
              })
            }
          >
            <EditTwoTone />
            Edit
          </a>
          <a>
            <DeleteOutlined />
            Delete
          </a>
        </Space>
      ),
    },
  ];
  return (
    <>
      <Row className="subject-default">
        <Col span={24} className="title">
          Quản lý Bill
        </Col>
        <Col span={24} className="subject-search">
          <Form layout="vertical" autoComplete="off">
            <Collapse>
              <Panel header="Tìm" key="1">
                <Row span={24} className="subject-filter">
                  <Col span={9} className="filter">
                    <Form.Item label="Customer" style={{ paddingRight: 20 }}>
                      <Input
                        style={{ width: "100px" }}
                        placeholder="Customer"
                        onChange={(e) => {}}
                      />
                    </Form.Item>
                    <Form.Item label="Staff" style={{ paddingRight: 20 }}>
                      <Input
                        style={{ width: "100px" }}
                        placeholder="Staff"
                        onChange={(e) => {}}
                      />
                    </Form.Item>
                    <Form.Item label="Address" style={{ paddingRight: 20 }}>
                      <Input
                        style={{ width: "100px" }}
                        placeholder="Address"
                        onChange={(e) => {}}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Panel>
            </Collapse>
          </Form>
        </Col>
        <Col span={24} className="btn-create">
          <Button
            onClick={() => setIsVisible({ type: true, action: "create" })}
            type="primary "
          >
            Thêm mới
          </Button>
          <Col span={24} className="sort-filter" style={{ textAlign: "right" }}>
            <Select
              defaultValue="Sort filter"
              style={{
                width: 100,
              }}
            >
              <Option value="10">10</Option>
              <Option value="15">15</Option>
            </Select>
          </Col>
        </Col>

        <Col span={24}>
          <Table
            dataSource={listBill}
            columns={columns}
            loading={loading}
            pagination={{
              pageSize: 5,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} items`,
            }}
          />
        </Col>
      </Row>
      <BillModal
        listBill={listBill}
        setIsVisible={setIsVisible}
        isVisible={isVisible}
        getListBill={getListBill}
      />
    </>
  );
};
export default BillManager;
