import { useEffect, useState } from "react";
import { Button, Form, Input, Radio, Modal, Row, Col, Select } from "antd";
import API from "../../../api/manage";
import toast, { Toaster } from "react-hot-toast";
const { Option } = Select;
const OptionValueModal = (props) => {
  const { isVisible, setIsVisible, options, getListOptionProduct } = props;
  const [optionValueIds, setOptionValueIds] = useState([]);
  const [form] = Form.useForm();
  const layout = {
    labelCol: { span: 20 },
    wrapperCol: { span: 24 },
  };
  const onFinish = (value) => {
    let data;
    if (isVisible.action === "create") {
      data = {
        optionId: isVisible.id || "",
        optionValueName: value.optionValueName,
      };
      createOption(data);
    } else {
      data = {
        id: value.optionValueId || "",
        optionId: isVisible.id,
        optionValueName: value.optionValueName,
      };
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
    let create = await API.createOptionValueProduct(data);
    if (create.message === "SUCCESS") {
      toast.success(create.message);
      getListOptionProduct();
      setIsVisible({ type: false, action: isVisible.action });
    } else {
      toast.error(create.message);
    }
  };

  const updateOption = async (data) => {
    let update = await API.updateOptionValueProduct(data);
    if (update.message === "SUCCESS") {
      toast.success(update.message);
      getListOptionProduct();
      setIsVisible({ type: false, action: isVisible.action });
    } else {
      toast.error(update.message);
    }
  };

  useEffect(() => {
    let listDataOption = options || [];
    const option =
      listDataOption?.find((item) => item.id == isVisible?.id) || [];
    setOptionValueIds(option?.optionValueList || []);
    form.setFieldsValue({
      optionId: option.id,
      optionName: option.optionName,
    });
  }, [isVisible.type]);

  const handleChange = (e) => {
    let listDataOption = options || [];
    const option =
      listDataOption?.find((item) => item.id == isVisible?.id) || [];
    const itemOptionValue =
      option?.optionValueList?.find((item) => item.id == e) || {};
    form.setFieldsValue({
      optionValueId: e,
      optionValueName: itemOptionValue.optionValueName,
    });
  };
  useEffect(() => {
    handleChange(null);
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
              <Form.Item name="optionId" label="Option Id">
                <Input disabled />
              </Form.Item>
              {isVisible.action === "create" ? (
                <></>
              ) : (
                <>
                  <Form.Item
                    name="optionValueId"
                    label="Option Value Id"
                    rules={[{ required: true }]}
                  >
                    <Select
                      placeholder="Please select"
                      style={{
                        width: "calc(100%)",
                      }}
                      onChange={handleChange}
                    >
                      {optionValueIds.map((data, key) => {
                        return (
                          <Option key={key} value={data.id}>
                            {data.id}
                          </Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                </>
              )}
            </Col>
            <Col>
              <Form.Item
                name="optionName"
                label="Option name"
                rules={[{ required: true }]}
              >
                <Input disabled />
              </Form.Item>
              <Form.Item label="Option Value Name" name="optionValueName">
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
export default OptionValueModal;
