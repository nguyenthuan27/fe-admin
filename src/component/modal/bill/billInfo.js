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
import { useSelector, useDispatch } from "react-redux";
import { addItem, clear, removeItem } from "../../../redux/cart";

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
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.productCart.value);
  const onFinish = async (value) => {
    console.log("cartData", cartData);
    const listProduct = cartData.map((item) => {
      return {
        variant_id: item.variantId,
        amount: item.amount,
      };
    });
    let data = {
      bill: {
        id: isVisible.id,
        note: value.note,
        address: value.address,
        receiver_name: value.customer_name,
        email: value.email,
        ship_price: value.ship_price,
      },
      list_product_variant: listProduct,
    };
    let update = await API.updateBill(data);
    if (update.message === "SUCCESS") {
      toast.success(update.message);
      getListBill();
      setIsVisible({ type: false });
    } else {
      toast.error(update.message);
    }
  };
  useEffect(() => {
    dispatch(clear());
    const billItem = bills?.find((item) => item.bill_id == isVisible.id);
    const listProductInBill = billItem?.list_product_variant.map((result) => {
      return {
        sku_id: result.skuId,
        variantId: result.productVariantId,
        name: result.productName,
        price: result.price,
        amount: result.amount,
        totalPrice: result.price * result.amount,
        option: result.listOptionInfos,
      };
    });
    if (listProductInBill) {
      for (let i = 0; i < listProductInBill.length; i++) {
        dispatch(addItem(listProductInBill[i]));
      }
    }
    form.setFieldsValue({
      customer_name: billItem?.customer.customer_name,
      email: billItem?.email,
      address: billItem?.address,
      phone: billItem?.phone,
      voucher: "",
      note: billItem?.note,
    });
  }, [isVisible.type && isVisible.id]);

  useEffect(() => {
    let totalPrice = cartData.reduce((total, item) => {
      return total + item.totalPrice;
    }, 0);
    form.setFieldsValue({
      quantity: cartData.length,
      totalPrice: totalPrice,
    });
  }, [cartData]);
  const handleChange = async (value) => {
    const getProductVariant = await API_PRODUCT.getListProductVariantById(
      value
    );
    setDataProductVariant(getProductVariant.result);
  };

  const columns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Mã sản phẩm",
      dataIndex: "sku_id",
      key: "sku_id",
    },
    {
      title: "Giá sản phẩm",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Số lượng",
      dataIndex: "amount",
      key: "amount",
    },

    {
      title: "Đơn giá",
      dataIndex: "totalPrice",
      key: "totalPrice",
    },
    {
      title: "Thao tác",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => {
              dispatch(removeItem(record.variantId));
            }}
          >
            Xóa
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <>
      <Toaster toastOptions={{ position: "top-center" }} />
      <Modal
        title="Sửa thông tin hóa đơn"
        centered
        visible={isVisible.type}
        onCancel={() => setIsVisible({ type: false })}
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
                dataSource={cartData}
                bordered
                title={() => "Danh sách sản phẩm đã chọn"}
                footer={() =>
                  `Tổng tiền: ${cartData.reduce(
                    (total, item) => total + item.totalPrice,
                    0
                  )}`
                }
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
                // rules={[
                //   { required: true, message: "Please input your email!" },
                // ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Địa chỉ"
                name="address"
                rules={[
                  { required: true, message: "Please input your address!" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="SDT"
                name="phone"
                // rules={[
                //   { required: true, message: "Please input your phone!" },
                // ]}
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
                <Input disabled />
              </Form.Item>
              <Form.Item name="totalPrice" label="Tổng tiền">
                <InputNumber
                  disabled
                  style={{
                    width: "calc(100%)",
                  }}
                />
              </Form.Item>
              <Form.Item name="ship_price" label="Phí vận chuyển ">
                <InputNumber
                  disabled
                  style={{
                    width: "calc(100%)",
                  }}
                />
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
