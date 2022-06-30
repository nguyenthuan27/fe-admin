import { useEffect, useState } from "react";
import { Button, Form, Input, Radio, Modal, Row, Col, Select } from "antd";
import API from "../../../api/manage";
import toast, { Toaster } from "react-hot-toast";
const { Option } = Select;
const ProductVariantModal = (props) => {
  const { isVisible, setIsVisible, variants, getListProductVariant } = props;
  const [form] = Form.useForm();
  const layout = {
    labelCol: { span: 20 },
    wrapperCol: { span: 24 },
  };
  const onFinish = (value) => {
    let data = {
      id: isVisible.id || "",
      status: value.status,
      quantity: value.quantity,
      price: value.price,
      skuId: value.skuId,
      productId: value.productId,
    };
    if (isVisible.action === "create") {
      console.log("vao");
      createOption(data);
    } else {
      updateOption(data);
    }
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

  const createOption = async (data) => {
    let create = await API.createProductVariant(data);
    if (create.message === "SUCCESS") {
      toast.success(create.message);
      getListProductVariant();
      setIsVisible({ type: false, action: isVisible.action });
    } else {
      toast.error(create.message);
    }
  };

  const updateOption = async (data) => {
    let update = await API.updateProductVariant(data);
    if (update.message === "SUCCESS") {
      toast.success(update.message);
      getListProductVariant();
      setIsVisible({ type: false, action: isVisible.action });
    } else {
      toast.error(update.message);
    }
  };

  useEffect(() => {
    let listData = variants || [];
    const variant = listData?.find((item) => item.id == isVisible?.id) || [];
    form.setFieldsValue({
      status: variant.status,
      quantity: variant.quantity,
      price: variant.price,
      skuId: variant.skuId,
      productId: variant.productId,
    });
  }, [isVisible.type]);

  return (
    <>
      <Toaster toastOptions={{ position: "top-center" }} />
      <Modal
        title="Thêm voucher"
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
              <Form.Item name="id" label="Id">
                <Input disabled />
              </Form.Item>
              <Form.Item
                name="skuId"
                label="skuId"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="productId"
                label="productId"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item
                name="quantity"
                label="quantity"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="price"
                label="price"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item label="Status" name="status">
                <Radio.Group>
                  <Radio value={true}> Active </Radio>
                  <Radio value={false}> Inactive </Radio>
                </Radio.Group>
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
export default ProductVariantModal;
