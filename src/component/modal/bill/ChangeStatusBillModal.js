import { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Radio,
  Row,
  Col,
  Select,
} from "antd";
import API from "../../../api/manage";
import toast, { Toaster } from "react-hot-toast";
const { Option } = Select;

const ChangeStatusBillModal = (props) => {
  const [loading, setLoading] = useState(false);
  const { getListBill, isVisible, setIsVisible } = props;
  const [form] = Form.useForm();
  const layout = {
    labelCol: { span: 20 },
    wrapperCol: { span: 24 },
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
  const onFinish = async (value) => {
    setLoading(true);
    const body = {};
    const res = await API.updateStatusBill(body);
    if (res.status === 200) {
      getListBill();
    }
    setLoading(false);
  };
  return (
    <>
      <Modal
        title="Thêm product"
        centered
        visible={isVisible.type}
        onCancel={() => setIsVisible({ type: false })}
        footer={null}
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
              lg: 59,
            }}
            justify="left"
          >
            <Col>
              <Form.Item
                name="productid"
                label="productid"
                // rules={[{ required: true }]}
              >
                <Input disabled />
              </Form.Item>
            </Col>

            <Col>
              <Form.Item name="note" label="note" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item label="Status" name="status">
                <Radio.Group defaultValue="true">
                  <Radio value="true"> Active </Radio>
                  <Radio value="false"> Inactive </Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 9 }}>
            <Button type="primary" htmlType="submit">
              Update
            </Button>
            <Button
              type="primary"
              onClick={() =>
                setIsVisible({
                  type: false,
                })
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
export default ChangeStatusBillModal;
