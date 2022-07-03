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
import API from "../../api/manage";
import ProductModal from "../../component/modal/products/productModal";
import AddOptionProductModal from "../../component/modal/products/addOptionProductModal";
const { Panel } = Collapse;

const ProductsrManager = () => {
  const [loading, setLoading] = useState(false);
  const [isVisibleModal, setIsVisibleModal] = useState({
    type: false,
    action: "create",
  });
  const [isOpenModal, setIsOpenModal] = useState({
    type: false,
  });

  const [listProduct, setListProduct] = useState([]);

  const { Option } = Select;
  const getProducts = async () => {
    const data = await API.getListProduct();
    setListProduct(data.result.listproductall);
  };
  useEffect(() => {
    getProducts();
  }, []);

  const columns = [
    {
      title: "productid",
      dataIndex: "productid",
      key: "productid",
    },
    {
      title: "Product name",
      dataIndex: "productname",
      key: "productname",
    },
    {
      title: "fromprice",
      dataIndex: "fromprice",
      key: "fromprice",
    },
    {
      title: "toprice",
      dataIndex: "toprice",
      key: "toprice",
    },
    {
      title: "Size",
      render: (text, record) => (
        <div className="d-flex align-items-center ">
          {record.list[0].data
            .find((item) => item.option_name === "Size")
            .datadetail.map((item) => (
              <div className="d-flex align-items-center justify-content-center option-product">
                <span>{item.option_value_name}</span>
              </div>
            ))}
        </div>
      ),
    },
    {
      title: "Color",
      render: (text, record) => (
        <div className="d-flex align-items-center ">
          {record.list[0].data
            .find((item) => item.option_name === "Color")
            .datadetail?.map((item) => (
              <div
                className="d-flex align-items-center justify-content-center option-product"
                style={{ backgroundColor: item.option_value_name }}
              ></div>
            ))}
        </div>
      ),
    },
    {
      title: "Material",
      render: (text, record) => (
        <div className="d-flex align-items-center ">
          {record.list[0].data
            ?.find((item) => item.option_name === "Material")
            ?.datadetail?.map((item) => (
              <div className="d-flex align-items-center justify-content-center option-product">
                <span>{item.option_value_name}</span>
              </div>
            ))}
        </div>
      ),
    },

    {
      title: "note",
      dataIndex: "note",
      key: "note",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <a
            onClick={() =>
              setIsVisibleModal({
                type: true,
                action: "edit",
                id: record.productid,
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
          <Button
            type="primary"
            onClick={() =>
              setIsOpenModal({
                type: true,
                id: record.productid,
              })
            }
          >
            Add Option
          </Button>
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
          <Button
            onClick={() => setIsVisibleModal({ type: true, action: "create" })}
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
            dataSource={listProduct}
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
      <ProductModal
        listProduct={listProduct}
        setIsVisible={setIsVisibleModal}
        isVisible={isVisibleModal}
        getProducts={getProducts}
      />
      <AddOptionProductModal
        listProduct={listProduct}
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
      />
    </>
  );
};
export default ProductsrManager;
