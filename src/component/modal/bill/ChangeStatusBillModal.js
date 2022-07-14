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
import API from "../../../api/others";
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
    const body = {
      bill_id: value.bill_id,
      state: value.status,
    };
    const res = await API.updateStatusBill(body);
    if (res.message === "SUCCESS") {
      toast.success(res.message);
      getListBill();
      setIsVisible({ type: false });
    } else {
      toast.error(res.message);
    }
    setLoading(false);
  };
  useEffect(() => {
    form.setFieldsValue({
      bill_id: isVisible.id,
      status: isVisible.status,
    });
  }, [isVisible.type]);
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
                name="bill_id"
                label="Bill Id"
                // rules={[{ required: true }]}
              >
                <Input disabled />
              </Form.Item>
            </Col>

            <Col>
              <Form.Item
                name="status"
                label="Status"
                rules={[{ required: true }]}
              >
                <Select
                  placeholder="Please select"
                  style={{
                    width: "calc(100%)",
                  }}
                >
                  <Option value="done">Hoàn thành</Option>
                  <Option value="approved">Đã duyệt</Option>
                  <Option value="refuse">Từ chối</Option>
                  <Option value="user_cancle">Người dùng huỷ</Option>
                  <Option value="return">Trả hàng</Option>
                  <Option value="wait"> Chờ xác nhận</Option>
                  <Option value="draft"> Nháp</Option>
                </Select>
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
