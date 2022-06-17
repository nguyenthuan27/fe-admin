import { useEffect, useState } from "react";
import { Button, Form, Input, InputNumber, Modal } from "antd";
const EditUser = (props) => {
  const { isVisible, setIsVisible } = props;
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
          validateMessages={validateMessages}
        >
          <Row gutter={{
            xs: 8,
            sm: 16,
            md: 24,
            lg: 59
          }} justify="left">
            <Col>
          <Form.Item
            name={["user", "id"]}
            label="Id"
            rules={[{ required: true, type: "number"}]}
          >
            <Input />
          </Form.Item>
          </Col>
          <Col>
          <Form.Item
            name={["user", "full_name"]}
            label="full_name"
            rules={[{required: true }]}
          >
            <Input />
          </Form.Item>
          </Col>
          <Col>
          <Form.Item
            name={["user", "account"]}
            label="Account"
            rules={[{required: true}]}
          >
          </Form.Item>
          </Col>
          <Col>
          <Form.Item
            name={["user", "password"]}
            label="Password"
            rules={[{required: true}]}
          >
          </Form.Item>
          </Col>
          <Col>
          <Form.Item
            name={["user", "mobile_phone"]}
            label="Mobile Phone"
            rules={[{required: true, type: "number"}]}
          >
          </Form.Item>
          </Col>
          <Col>
          <Form.Item
            name={["user", "email"]}
            label="Email"
            rules={[{required: true}]}
          >
          </Form.Item>
          </Col>
          <Col>
          <Form.Item
            name={["user", "create_date"]}
            label="Create date"
            rules={[{required: true}]}
          >
          </Form.Item>
          </Col>
          <Col>
          <Form.Item
            name={["user", "status"]}
            label="Status"
            rules={[{required: true}]}
          >
          </Form.Item>
          </Col>
          <Col>
          <Form.Item
            name={["user", "gender"]}
            label="Gender"
            rules={[{required: true}]}
          >
          </Form.Item>
          </Col>
          <Col>
          <Form.Item
            name={["user", "enable_notification"]}
            label="Enable notification"
            rules={[{required: true}]}
          >
          </Form.Item>
          </Col>
          </Row>
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
export default EditUser;
