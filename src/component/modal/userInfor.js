import { useEffect, useState } from "react";
import { Button, Form, Input, InputNumber, Modal, Space, Row, Col } from "antd";
import API from "../../api/manage";
import toast, { Toaster } from "react-hot-toast";
const UserModal = (props) => {
  const { isVisible, setIsVisible, users, getListUser } = props;
  const [form] = Form.useForm();
  const layout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 14 }
  };

  const onFinish = (value) => {
    let data = {
      id: isVisible.id || "",
      fullName: value.fullName,
      account: value.account,
      password: value.password,
      mobilePhone: value.mobilePhone,
      email: value.email,
      status: true,
      gender: value.gender,
      enableNotification: true,
    };
    if (isVisible.action == "create") {
      createUser(data);
    } else {
      editUser(data);
    }
  };

  const createUser = async (data) => {
    let create = await API.createUser(data);
    if (create.message === "SUCCESS") {
      toast.success(create.message);
      getListUser();
      setIsVisible({ type: false, action: isVisible.action });
    } else {
      toast.error(create.message);
    }
  };

  const editUser = async (data) => {
    let update = await API.updateUser(data);
    if (update.message == "SUCCESS") {
      toast.success(update.message);
      getListUser();
      setIsVisible({ type: false, action: isVisible.action });
    } else {
      toast.error(update.message);
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
  useEffect(() => {
    let listDataUser = users || [];
    const user = listDataUser?.find((item) => item.id == isVisible?.id) || [];
    form.setFieldsValue({
      id: user.id,
      fullName: user.fullName,
      account: user.account,
      password: user.password,
      mobilePhone: user.mobilePhone,
      email: user.email,
      createDate: user.createDate,
      status: user.status,
      gender: user.gender,
      enableNotification: user.enableNotification,
    })
  }, [isVisible.type]);
  return (
    <>
      <Modal
        title="User"
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
          validateMessages={validateMessages}
        >

          <Col>
            <Form.Item
              name="id"
              label="Id"
            >
              <Input disabled />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              name="fullName"
              label="Full name"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col>
            <Form.Item
              name="account"
              label="Account"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col>
            <Form.Item
              name="mobilePhone"
              label="Mobile phone"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, type: "email" }]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col>
            <Form.Item
              name="gender"
              label="Gender"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>

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
              onClick={() => setIsVisible({ type: false, action: isVisible.action })}
              style={{ marginLeft: "5px" }}
            >
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal >
    </>
  );
};
export default UserModal;