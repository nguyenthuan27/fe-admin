import { useEffect, useState } from "react";
import { Col, Form, Collapse, Row, Table, Input, Button, Space, Select } from "antd";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import "./users.scss";
import CreateVoucherLog from "../../component/modal/voucherLog/create";
import EditVoucherLog from "../../component/modal/voucherLog/edit";
const { Panel } = Collapse;
const VoucherLogrManager = () => {
  const [loading, setLoading] = useState(false);
  const [isVisibleCreate, setIsVisibleCreate] = useState(false);
  const [isVisibleEdit, setIsVisibleEdit] = useState(false);
  const { Option } = Select;
  useEffect(() => {}, []);
  const columns = [{
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
},
{
    title: 'Bill id',
    dataIndex: 'bill_id',
    key: 'bill_id',
},
{
    title: 'Voucher id',
    dataIndex: 'voucher_id',
    key: 'voucher_id',
},
{
    title: 'Customer id',
    dataIndex: 'customer_id',
    key: 'customer_id',
},
{
    title: 'Before price',
    dataIndex: 'before_price',
    key: 'before_price',
},
{
    title: 'After price',
    dataIndex: 'after_price',
    key: 'after_price',
},
{
    title: 'Discount price',
    dataIndex: 'discount_price',
    key: 'discount_price',
},
{
    title: 'Create date',
    dataIndex: 'create_date',
    key: 'create_date',
},

{
    title: 'Action',
    key: 'action',
    render: () => (
        <Space size="middle">
            <a onClick={() => setIsVisibleEdit(true)}>
                <EditTwoTone />Edit
            </a>
            <a>
                <DeleteOutlined />Delete</a>
        </Space>
    ),
},
];
const data = [
  {
      key: '1',
      group_id: '1',
      group_name: 'Quan',
      create_date: '16-06-2022',
      status: 'Bình Thường',
      quantity: 15,
      price: '100,000',
      tags: ['nice', 'developer'],
  },
];

  return (
    <>
      <Row className="subject-default">
        <Col span={24} className="title">
          Quản lý Voucher Log
        </Col>
        <Col span={24} className="subject-search">
          <Form layout="vertical" autoComplete="off">
            <Collapse>
              <Panel header="Tìm" key="1">
                <Row span={24} className="subject-filter">
                  <Col span={5} className="filter">
                    <Form.Item label="Full Name" style={{ paddingRight: 20 }}>
                      <Input placeholder="Full Name" onChange={(e) => {}} />
                    </Form.Item>
                    <Form.Item label="Email">
                      <Input placeholder="Email" onChange={(e) => {}} />
                    </Form.Item>
                  </Col>
                </Row>
              </Panel>
            </Collapse>
          </Form>
        </Col>
        <Col span={24} className="btn-create">
                    <Button onClick={() => setIsVisibleCreate(true)} type="primary ">
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
            dataSource={""}
            columns={columns}
            loading={loading}
            pagination={{
              pageSize: 10,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} items`,
            }}
          />
        </Col>
      </Row>
      <CreateVoucherLog
                setIsVisible={setIsVisibleCreate}
                isVisible={isVisibleCreate}
            />
            <EditVoucherLog
                isVisible={isVisibleEdit}
                setIsVisible={setIsVisibleEdit}
            />
    </>
  );
};
export default VoucherLogManager;
