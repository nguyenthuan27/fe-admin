import { useEffect, useState } from "react";
import { Button, Form, Input, InputNumber, Modal, Radio, DatePicker, TimePicker } from "antd";
const EditVoucherLog = (props) => {
  const { isVisible, setIsVisible } = props;
  const layout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 16 },
  };
  const onFinish = () => {

  }
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

  const onChange = (value, dateString) => {
    console.log("Selected Time: ", value);
    console.log("Formatted Selected Time: ", dateString);
  };

  const onOk = (value) => {
    console.log("onOk: ", value);
  };
  useEffect(() => { }, []);
  return (
    <>
      <Modal
        title="Create staff"
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
            name={["voucher_log", "id"]}
            label="Id"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name={["voucher_log", "bill_id"]}
            label="Bill id"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name={["voucher_log", "voucher_id"]}
            label="Voucher id"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["voucher_log", "before price"]}
            label="Before price"
            rules={[{ required: true, type: "number" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["voucher_log", "after_price"]}
            label="After price"
            rules={[{ required: true, type: "number" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["voucher_log", "discount _price"]}
            label="Discount price"
            rules={[{ required: true, type: "number" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["voucher_log", "create_date"]}
            label="Create date"
            rules={[{ required: true, type: "number" }]}
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
export default EditVoucherLog;
