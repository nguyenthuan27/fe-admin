import { useEffect, useState } from "react";
import { Button, Form, Input, InputNumber, Modal, Space, Row, Col } from "antd";
const EditUser = (props) => {
  const { isVisible, setIsVisible } = props;
  const layout = {
    labelCol: { span: 20 },
    wrapperCol: { span: 24 },
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
        title="Sửa User"
        centered
        visible={isVisible}
        onCancel={() => setIsVisible(false)}
        footer={null}
      >
        <Form
          {...layout}
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
              lg: 59,
            }}
            justify="left"
          >
            <Space>
              <Col>
                <Form.Item
                  name={["user", "id"]}
                  label="Id"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col>
                <Form.Item
                  name={["user", "full_name"]}
                  label="Full name"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col>
                <Form.Item
                  name={["user", "account"]}
                  label="Account"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col>
                <Form.Item
                  name={["user", "password"]}
                  label="Password"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col>
                <Form.Item
                  name={["user", "mobile_phone"]}
                  label="Mobile phone"
                  rules={[{ required: true, type: "number" }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col>
                <Form.Item
                  name={["user", "email"]}
                  label="Email"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col>
                <Form.Item
                  name={["user", "create_date"]}
                  label="Create date"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col>
                <Form.Item
                  name={["user", "status"]}
                  label="Status"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col>
                <Form.Item
                  name={["user", "gender"]}
                  label="Gender"
                  rules={[{ required: true, type: "number" }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col>
                <Form.Item
                  name={["user", "enable_notification"]}
                  label="Enable notificatioin"
                  rules={[{ required: true, type: "number" }]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Space>
          </Row>

          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 9 }}>
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
export default EditUser;
