import { useEffect, useState } from "react";
import { Button, Col, Form, Input, InputNumber, Modal, Radio } from "antd";
const SalesModal = (props) => {
    const { isVisible, setIsVisible, setCustomer } = props;
    const layout = {
        labelCol: { span: 5 },
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
   
  return (
    <>
      <Modal
        title="Quản lý User"
        centered
        visible={isVisible}
        onCancel={() => setIsVisible(false)}
        footer={null}
        width="60%"
      >
        <Col span={24}></Col>
        <Col span={24}>
          <Form
            {...layout}
            name="nest-messages"
            onFinish={onFinish}
            validateMessages={validateMessages}
          >
            <Form.Item
              name={["user", ""]}
              label="Mã khách hàng"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={["user", ""]}
              label="Tên khách hàng"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={["user", ""]}
              label="Số điện thoại"
              rules={[{ type: "number" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name={["user", ""]}
              label="Email"
              rules={[{ type: "number" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item name="radio-group" label="Giới tính">
              <Radio.Group>
                <Radio value="1">Nam</Radio>
                <Radio value="2">Nữ</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item name={["user", ""]} label="Ghi chú">
              <Input.TextArea />
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 16 }}>
              <Button type="primary" htmlType="submit">
                Cancel
              </Button>
              <Button
                type="primary"
                onClick={() => setIsVisible(false)}
                style={{ marginLeft: "5px" }}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Modal>
    </>
  );
};
export default SalesModal;
