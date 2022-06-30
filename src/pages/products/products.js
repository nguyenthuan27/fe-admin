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
import "./products.scss";
const { Panel } = Collapse;
const ProductsrManager = () => {
  const [loading, setLoading] = useState(false);
  const { Option } = Select;
  useEffect(() => {}, []);
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Group id",
      dataIndex: "group_id",
      key: "group_id",
    },
    {
      title: "Product name",
      dataIndex: "product_name",
      key: "product_name",
    },
    {
      title: "Create date",
      dataIndex: "create_date",
      key: "create_date",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },

    {
      title: "Action",
      key: "action",
      render: () => (
        <Space size="middle">
          <a >
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
          Quản lý Sản phẩm
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
          <Button type="primary ">
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
    </>
  );
};
export default ProductsrManager;
