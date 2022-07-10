import { useEffect, useState } from "react";
import { Button, Form, Input, InputNumber, Modal, Space, Row, Col, Select } from "antd";
import { ApiFilled } from "@ant-design/icons";
import toast, { Toaster } from "react-hot-toast";
import API from "../../api/others";
const BillModal = (props) => {
  const { isVisible, setIsVisible, bills, getListBill } = props;
  const [form] = Form.useForm();
  const { Option } = Select;
  const layout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
  };
  const onFinish = (value) => {
    let data = {
      bill_id: isVisible.bill_id || "",
      amount: value.amount,
      total_price: value.total_price,
      address: value.address,
      bill_code: value.bill_code,
      staff: value.staff_name,
      voucher_code: value.voucher_code,
      type: value.type,
      payment_vi: value.payment_vi,
      state_vi: value.state_vi,
      phone: value.phone,
      payment: value.payment,
      state: value.state,
      point_receive: value.point_receive,
      email: value.email,
      type_vi: value.type_vi,
      customer: value.customer_name,
      create_date: value.create_date,
    };
    if (isVisible.action == "edit") {
      editBill(data);
    }
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

  const editBill = async (data) => {
    let update = await API.updateBill(data);
    if (update.message === "SUCCESS") {
      toast.message(data.message);
      getListBill();
      setIsVisible({ type: false, action: isVisible.action });
    } else {
      toast.error(update.message);
    }
  };
  useEffect(() => {
    let listDataBill = bills || [];
    const bill =
      listDataBill?.find((item) => item.bill_id == isVisible?.bill_id) || [];
    console.log(bill);
    form.setFieldsValue({
      bill_id: bill.bill_id,
      amount: bill.amount,
      total_price: bill.total_price,
      address: bill.address,
      bill_code: bill.bill_code,
      staff: bill.staff_name,
      voucher_code: bill.voucher_code,
      type: bill.type,
      payment_vi: bill.payment_vi,
      state_vi: bill.state_vi,
      phone: bill.phone,
      payment: bill.payment,
      state: bill.state,
      point_receive: bill.point_receive,
      email: bill.email,
      type_vi: bill.type_vi,
      customer: bill.customer_name,
      create_date: bill.create_date,
    });
  }, [isVisible.type]);
  return (
    <>
      <Toaster toastOptions={{ position: "top-center" }} />
      <Modal
        title="Sửa thông tin hóa đơn"
        centered
        visible={isVisible.type}
        onCancel={() => setIsVisible({ type: false, action: isVisible.action })}
        footer={null}
        width="55%"
      >
        <Form
          {...layout}
          form={form}
          name="nest-messages"
          onFinish={onFinish}
          layout="vertical"
          validateMessages={validateMessages}
        >
          <Row
            gutter={{
              xs: 8,
              sm: 16,
              md: 24,
              lg: 90,
            }}
            justify="left"
          >
            <Col>
              <Form.Item
                name="bill_code"
                label="Mã hóa đơn"
                rules={[{ required: true }]}
              >
                <Input style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item
                name=""
                label="Mã sản phẩm"
                rules={[{ required: true }]}
              >
                <Input style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item
                name="voucher_code"
                label="Mã voucher"
                rules={[{ required: true }]}
              >
                <Input style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item
                name="type"
                label="Màu sắc"
                rules={[{ required: true }]}
              >
                <Input style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item
                name="address"
                label="Size"
                rules={[{ required: true }]}
              >
                <Input style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item
                name="amount"
                label="Số lượng"
                rules={[{ required: true }]}
              >
                <Input style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item
                name="customer"
                label="Khách hàng"
                rules={[{ required: true }]}
              >
                <Input style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item
                name="create_date"
                label="Ngày mua"
                rules={[{ required: true }]}
              >
                <Input style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item
                name="staff"
                label="Người bán"
                rules={[{ required: true }]}
              >
                <Input style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item
                name="point_receive"
                label="Điểm tích lũy"
                rules={[{ required: true }]}
              >
                <Input style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item
                name="type_vi"
                label="Kênh bán hàng"
                rules={[{ required: true }]}
              >
                <Input style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item
                name="state_vi"
                label="Trạng thái đơn hàng"
                rules={[{ required: true }]}
              >
                <Input style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item
                name="state"
                label="Trạng thái"
                rules={[{ required: true }]}
              >
                <Input style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item
                name="payment"
                label="Phương thức thanh toán"
                rules={[{ required: true }]}
              >
                <Input style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item
                name="note"
                label="Ghi chú"
                rules={[{ required: true }]}
              >
                <Input style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 9 }}>
            {isVisible.action == "create" ? (
              <>
                <Button type="primary" htmlType="submit">Create</Button>
              </>
            ) : (
              <>
                <Button type="primary" htmlType="submit">Edit</Button>
              </>
            )}
            <Button
              type="primary"
              onClick={() => setIsVisible({ type: false, action: isVisible.action })
              }
              style={{ marginLeft: "5px" }}
            >
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default BillModal;
