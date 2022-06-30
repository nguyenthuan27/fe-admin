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
import API from "../../api/manage";
import toast, { Toaster } from "react-hot-toast";
import ProductVariantModal from "../../component/modal/product-variant";
const { Panel } = Collapse;
const ProductVariant = () => {
  const [loading, setLoading] = useState(false);
  const [isVisibleCreate, setIsVisibleCreate] = useState({
    type: false,
    action: "create",
  });
  const [variants, setVariants] = useState("");
  const { Option } = Select;

  const getListProductVariant = async () => {
    let data = await API.getListProductVariant();
    setVariants(data.result);
  };
  useEffect(() => {
    getListProductVariant();
  }, []);

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "skuId",
      dataIndex: "skuId",
      key: "skuId",
    },
    {
      title: "productId",
      dataIndex: "productId",
      key: "productId",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      sorter: (a, b) => a.quantity - b.quantity,
    },
    {
      title: "price",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text, record) => (
        <div className="d-flex align-items-center">
          {record.status == true ? (
            <div className="d-flex align-items-center justify-content-center">
              <div className="status-active">
                <div className="status-active-text">Active</div>
              </div>
            </div>
          ) : (
            <div className="d-flex align-items-center justify-content-center">
              <div className="status-inactive">
                <div className="status-inactive-text">Inactive</div>
              </div>
            </div>
          )}
        </div>
      ),
    },
    {
      title: "Create date",
      dataIndex: "createDate",
      key: "createDate",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <a
            onClick={() =>
              setIsVisibleCreate({ type: true, action: "edit", id: record.id })
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
      <Toaster toastOptions={{ position: "top-center" }} />
      <Row className="subject-default">
        <Col span={24} className="title">
          Quản lý Voucher
        </Col>
        <Col span={24} className="subject-search">
          <Form layout="vertical" autoComplete="off">
            <Collapse>
              <Panel header="Tìm" key="1">
                <Row span={24} className="subject-filter">
                  <Col span={9} className="filter">
                    <Form.Item
                      label="Voucher name"
                      style={{ paddingRight: 20 }}
                    >
                      <Input
                        style={{ width: "100px" }}
                        placeholder="Voucher name"
                        onChange={(e) => {}}
                      />
                    </Form.Item>
                    <Form.Item
                      label="Voucher code"
                      style={{ paddingRight: 20 }}
                    >
                      <Input
                        style={{ width: "100px" }}
                        placeholder="Voucher code"
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
            onClick={() => setIsVisibleCreate({ type: true, action: "create" })}
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
            dataSource={variants}
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
      <ProductVariantModal
        getListProductVariant={getListProductVariant}
        variants={variants}
        setVariants={setVariants}
        setIsVisible={setIsVisibleCreate}
        isVisible={isVisibleCreate}
      />
    </>
  );
};
export default ProductVariant;
