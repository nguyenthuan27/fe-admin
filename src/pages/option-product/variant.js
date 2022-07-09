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
import AddOptionProductModal from "../../component/modal/products/addOptionProductModal";
import axios from "axios";
const { Panel } = Collapse;
const { Option } = Select;

const Variant = () => {
  const [loading, setLoading] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState({
    type: false,
  });
  const [loadingOption, setLoadingOption] = useState(false);
  const [productId, setProductId] = useState("2");
  const [listOptionValue, setListOptionValue] = useState([]);
  const [dataVariant, setDataVariant] = useState([]);
  const [listProduct, setListProduct] = useState([]);
  const getListProduct = async () => {
    const res = await API.getListProduct();
    console.log(res.result?.listproductall);
    setListProduct(res.result?.listproductall);
  };
  const getProductVariant = async () => {
    setLoading(true);
    const res = await API.getListProductVariantById(productId);
    console.log(res.result);
    setDataVariant(res.result);
    setLoading(false);
  };
  useEffect(() => {
    getListProduct();
  }, []);

  useEffect(() => {
    getProductVariant();
  }, [productId]);
  const onChange = (e) => {
    setProductId(e);
  };
  const onSearch = (e) => {
    console.log(e);
  };

  useEffect(() => {
    (async () => {
      if (isOpenModal.variantId) {
        setLoadingOption(true);
        const res = await API.getVariantValueProductById(
          isOpenModal?.variantId
        );
        setListOptionValue(res.result.listproductall);
        setLoadingOption(false);
      }
    })();
  }, [isOpenModal.variantId]);

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
              setIsOpenModal({
                type: true,
                variantId: record.id,
              })
            }
          >
            <EditTwoTone />
            Edit
          </a>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Row className="subject-default">
        <Col span={24} className="title">
          Quản lý thuộc tính sản phẩm
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
        <Col span={24} className="subject-action">
          <Select
            showSearch
            placeholder="Select a person"
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
          >
            {listProduct?.map((item) => (
              <Option key={item.productid} value={item.productid}>
                {item.productname}
              </Option>
            ))}
          </Select>
        </Col>
        <Col span={24}>
          <Table
            dataSource={dataVariant}
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
      <AddOptionProductModal
        loadingOption={loadingOption}
        setListOptionValue={setListOptionValue}
        listOptionValue={listOptionValue}
        productId={productId}
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
      />
    </>
  );
};
export default Variant;
