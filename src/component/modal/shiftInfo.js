import { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Radio,
  DatePicker,
  TimePicker,
} from "antd";
const ShiftModal = (props) => {
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

  const onChange = (value, dateString) => {
    console.log("Selected Time: ", value);
    console.log("Formatted Selected Time: ", dateString);
  };

  const onOk = (value) => {
    console.log("onOk: ", value);
  };
  useEffect(() => {}, []);
  return (
    <>
      <Modal
        title="Create shift"
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
            <DatePicker
              picker="week"
              onChange={onChange}
              onOk={onOk}
              style={{
                width: "100%",
              }}
            />
          </Form.Item>

          <Form.Item
            name={["shift", "day_name"]}
            label="Day name"
            rules={[{ required: true }]}
          >
            <DatePicker
              onChange={onChange}
              style={{
                width: "100%",
              }}
              onOk={onOk}
            />
          </Form.Item>

          <Form.Item
            name={["shift", "work_start_time"]}
            label="Start time"
            rules={[{ required: true }]}
          >
            <TimePicker
              style={{
                width: "100%",
              }}
            />
          </Form.Item>

          <Form.Item
            name={["shift", "work_end_time"]}
            label="End time"
            rules={[{ required: true }]}
          >
            <TimePicker
              style={{
                width: "100%",
              }}
            />
          </Form.Item>

          <Form.Item
            name={["shift", "break_time_start"]}
            label="Break time start"
            rules={[{ required: true }]}
          >
            <TimePicker
              style={{
                width: "100%",
              }}
            />
          </Form.Item>

          <Form.Item
            name={["shift", "break_time_end"]}
            label="Break time end"
            rules={[{ required: true }]}
          >
            <TimePicker
              style={{
                width: "100%",
              }}
            />
          </Form.Item>

          <Form.Item name="radio-group" label="Status">
            <Radio.Group>
              <Radio value="1">Status 1</Radio>
              <Radio value="2">Status 2</Radio>
              <Radio value="3">Status 3</Radio>
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
export default ShiftModal;
