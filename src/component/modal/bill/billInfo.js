import { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Space,
  Row,
  Col,
  Select,
  Table,
} from "antd";
import { ApiFilled } from "@ant-design/icons";
import toast, { Toaster } from "react-hot-toast";
import API from "../../../api/others";
import API_PRODUCT from "../../../api/manage";
import TableVariant from "./TableVariant";
const BillModal = (props) => {
  const { isVisible, setIsVisible, bills, getListBill } = props;
  const [listProduct, setListProduct] = useState([]);
  const [dataProductVariant, setDataProductVariant] = useState([]);
  const [form] = Form.useForm();
  const { Option } = Select;
  const layout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
  };
  const getListProduct = async () => {
    const data = await API_PRODUCT.getListProductStatusY();
    setListProduct(data.result);
  };

  useEffect(() => {
    getListProduct();
  }, []);
  const onFinish = (value) => {
    let data = {};
  };
  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };

  useEffect(() => {
    form.setFieldsValue({});
  }, [isVisible.type]);

  const handleChange = async (value) => {
    const getProductVariant = await API_PRODUCT.getListProductVariantById(
      value
    );
    setDataProductVariant(getProductVariant.result);
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Cash Assets",
      className: "column-money",
      dataIndex: "money",
      align: "right",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
  ];
  return (
    <>
      <Toaster toastOptions={{ position: "top-center" }} />
      <Modal
        title="Sửa thông tin hóa đơn"
        centered
        visible={isVisible}
        onCancel={() => setIsVisible({ type: false, action: isVisible.action })}
        footer={null}
        width="65%"
      >
        <Form
          {...layout}
          form={form}
          name="nest-messages"
          onFinish={onFinish}
          layout="vertical"
          validateMessages={validateMessages}
        >
          <Row className="d-flex flex-wrap justify-content-space-between">
            <Col span={12} style={{ padding: "20px" }}>
              <Select
                placeholder="Please select"
                style={{
                  width: "calc(80%)",
                  marginBottom: "20px",
                }}
                onChange={handleChange}
              >
                {listProduct.map((item) => (
                  <Option key={item.id} value={item.id}>
                    {item.productName}
                  </Option>
                ))}
              </Select>
              <TableVariant
                dataProductVariant={dataProductVariant}
                setDataProductVariant={setDataProductVariant}
              />
            </Col>
            <Col span={12} style={{ marginTop: "72px" }}>
              <Table
                columns={columns}
                dataSource=""
                bordered
                title={() => "Danh sách sản phẩm đã chọn"}
                footer={() => "Footer"}
                pagination={{
                  pageSize: 5,
                  showTotal: (total, range) =>
                    `${range[0]}-${range[1]} of ${total} items`,
                }}
              />
            </Col>
            <Col span={11}>
              <div
                style={{
                  fontSize: "20px",
                  fontWeight: "600",
                  paddingBottom: "20px",
                }}
              >
                Khách hàng
              </div>
              <Form.Item
                label="Tên khách hàng"
                name="customer_name"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Địa chỉ"
                name="address"
                rules={[
                  { required: true, message: "Please input your email!" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="SDT"
                name="phone"
                rules={[
                  { required: true, message: "Please input your phone!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={11}>
              <div
                style={{
                  fontSize: "20px",
                  fontWeight: "600",
                  paddingBottom: "20px",
                }}
              >
                Thanh toán
              </div>
              <Form.Item name="quantity" label="Số lượng sản phẩm">
                <Input />
              </Form.Item>
              <Form.Item name="totalPrice" label="Tổng tiền">
                <InputNumber />
              </Form.Item>
              <Form.Item name="voucher" label="Giảm giá">
                <Input />
              </Form.Item>
              <Form.Item name="note" label="Ghi chú">
                <Input.TextArea />
              </Form.Item>
              <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};
export default BillModal;
