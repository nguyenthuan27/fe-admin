import { useEffect, useState } from "react";
import { Button, Form, Input, InputNumber, Modal, Radio } from "antd";
const CreateShift = (props) => {
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
  useEffect(() => { }, []);
  return (
    <>
      <Modal
        title="Create shift"
        centered
        visible={isVisible}
        onCancel={() => setIsVisible(false)}
        footer={null}
        style={{ textAlight: "left" }}
      >
        <Form
          {...layout}
          name="nest-messages"
          onFinish={onFinish}
          validateMessages={validateMessages}
        >
          <Form.Item
            name={["shift", "id"]}
            label="Id"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name={["shift", "name"]}
            label="Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name={["shift", "code"]}
            label="Code"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name={["shift", "day"]}
            label="Day"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name={["shift", "day_name"]}
            label="Day name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name={["shift", "work_start_time"]}
            label="Start time"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name={["shift", "work_end_time"]}
            label="End time"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name={["shift", "break_time_start"]}
            label="Break time start"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name={["shift", "break_time_end"]}
            label="Break time end"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="radio-group" label="Status">
            <Radio.Group>
              <Radio value="a">Status 1</Radio>
              <Radio value="b">Status 2</Radio>
              <Radio value="c">Status 3</Radio>
            </Radio.Group>
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
export default CreateShift;
