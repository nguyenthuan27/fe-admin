import { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Space,
  Row,
  Col,
  Select,
} from "antd";
import API from "../../../api/manage";
import toast, { Toaster } from "react-hot-toast";
const { Option } = Select;

const ProductModal = (props) => {
  const { isVisible, setIsVisible, getProducts, listProduct } = props;
  const [form] = Form.useForm();
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

  const createOption = async (data) => {
    let create = await API.createOptionProduct(data);
    if (create.message === "SUCCESS") {
      toast.success(create.message);
      getProducts();
      setIsVisible({ type: false, action: isVisible.action });
    } else {
      toast.error(create.message);
    }
  };

  const updateOption = async (data) => {
    let update = await API.updateOptionProduct(data);
    if (update.message === "SUCCESS") {
      toast.success(update.message);
      getProducts();
      setIsVisible({ type: false, action: isVisible.action });
    } else {
      toast.error(update.message);
    }
  };

  useEffect(() => {
    let listData = listProduct || [];
    const product =
      listData?.find((item) => item.productid == isVisible?.id) || [];
    form.setFieldsValue({
      productid: product.productid,
      toprice: product.toprice,
      note: product.note,
      fromprice: product.fromprice,
      productname: product.productname,
    });
  }, [isVisible.type]);
  return (
    <>
      <Modal
        title="Thêm product"
        centered
        visible={isVisible.type}
        onCancel={() => setIsVisible({ type: false, action: isVisible.action })}
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
                rules={[{ required: true }]}
              >
                <Input disabled />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item
                name="productname"
                label="productname"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col>
              <Form.Item name="note" label="note" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item
                name="fromprice"
                label="fromprice"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col>
              <Form.Item
                name="toprice"
                label="toprice"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 9 }}>
            {isVisible.action == "create" ? (
              <>
                <Button type="primary" htmlType="submit">
                  Create
                </Button>
              </>
            ) : (
              <>
                <Button type="primary" htmlType="submit">
                  Edit
                </Button>
              </>
            )}
            <Button
              type="primary"
              onClick={() =>
                setIsVisible({ type: false, action: isVisible.action })
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
export default ProductModal;
