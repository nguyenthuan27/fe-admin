import { useEffect, useState } from "react";
import { Button, Form, Input, InputNumber, Modal } from "antd";
const EditBill = (props) => {
  const { isVisible, setIsVisible } = props;
  const layout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 16 },
  };
  const onFinish = () => {};
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
  useEffect(() => {}, []);
  return (
    <>
      <Modal
        title="Sửa Bill"
        centered
        visible={isVisible}
        onCancel={() => setIsVisible(false)}
        footer={null}
      >
        <Form
          {...layout}
          name="nest-messages"
          onFinish={onFinish}
          validateMessages={validateMessages}
        >
          <Form.Item
            name={["bill", "customer_id"]}
            label="Customer"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name={["bill", "voucher_id"]}
            label="Voucher"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name={["bill", "staff_id"]}
            label="Staff"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name={["bill", "type"]}
            label="Type"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name={["bill", "address"]}
            label="Address"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name={["bill", "ship_price"]}
            label="Ship price"
            rules={[{ required: true, type: "number" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name={["bill", "bill_code"]}
            label="Bill code"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name={["bill", "amount"]}
            label="Amount"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name={["bill", "total_price"]}
            label="Total price"
            rules={[{ required: true, type: "number" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name={["bill", "price_after_voucher"]}
            label="Price after voucher"
            rules={[{ required: true, type: "number" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name={["bill", "create_date"]}
            label="Create date"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name={["bill", "update_date"]}
            label="Update date"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name={["bill", "state"]}
            label="State"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button
              type="primary"
              onClick={() => setIsVisible(false)}
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
export default EditBill;
