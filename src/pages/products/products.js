import { useEffect, useState } from "react";
import { Col, Form, Collapse, Row, Table, Input, Button, Space } from "antd";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import "./users.scss";
import CreateUser from "../../component/modal/products/create";
import EditUser from "../../component/modal/products/edit";
const { Panel } = Collapse;
const ProductsrManager = () => {
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {}, []);
  const columns = [{
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
},
{
    title: 'Group id',
    dataIndex: 'group_id',
    key: 'group_id',
},
{
    title: 'Product name',
    dataIndex: 'product_name',
    key: 'product_name',
},
{
    title: 'Create date',
    dataIndex: 'create_date',
    key: 'create_date',
},
{
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
},
{
    title: 'Quantity',
    dataIndex: 'quantity',
    key: 'quantity',
},
{
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
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
          Quản lý User
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
          <Button onClick={() => setIsVisible(true)} type="primary ">
            Thêm mới
          </Button>
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
      <CreateVoucher
                setIsVisible={setIsVisibleCreate}
                isVisible={isVisibleCreate}
            />
            <EditVoucher
                isVisible={isVisibleEdit}
                setIsVisible={setIsVisibleEdit}
            />
    </>
  );
};
export default ProductsrManager;
