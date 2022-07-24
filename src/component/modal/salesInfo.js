import { useEffect, useState } from "react";
import { Button, Col, Form, Input, InputNumber, Modal, Radio } from "antd";
import toast, { Toaster } from "react-hot-toast";
import API from "../../api/manage";
const SalesModal = (props) => {
    const { isVisible, setIsVisible, setCustomer } = props;
    const [form] = Form.useForm();
    const layout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 16 },
    };
    const onFinish = (value) => {
        let data = {
            user: {
                fullName: value.fullName,
                mobilePhone: value.mobilePhone,
                email: value.email,
                gender: value.gender,
                status: true,
                enableNotification: true,
                password: "",
                account: "",
            },
            point: 0,
            address: value.address,
        };
        createCusomer(data);
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

    const createCusomer = async (data) => {
        console.log("hehe")
        let create = await API.createCusomer(data);
        if (create.message === "SUCCESS") {
            toast.success(create.message);
            setCustomer({fullName: create.result.user.fullName, id: create.result.id})
            setIsVisible(false);
        } else {
            toast.error(create.message);
        }
    };

    return (
        <>
            <Modal
                title="Quản lý User"
                centered
                visible={isVisible}
                onCancel={() => setIsVisible(false)}
                footer={null}
                width="60%"
            >
                <Col span={24}>

                </Col>
                <Col span={24}>
                    <Form
                        {...layout}
                        form={form}
                        name="nest-messages"
                        onFinish={onFinish}
                        validateMessages={validateMessages}
                    >
                        {/* <Form.Item
                            name={["user", ""]}
                            label="Mã khách hàng"
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item> */}
                        <Form.Item
                            name="fullName"
                            label="Tên khách hàng"
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="mobilePhone"
                            label="Số điện thoại"
                            // rules={[{ type: "number" }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[{ type: "email" }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item name="gender" label="Giới tính">
                            <Radio.Group>
                                <Radio value="1">Nam</Radio>
                                <Radio value="2">Nữ</Radio>
                            </Radio.Group>
                        </Form.Item>

                        <Form.Item name="note" label="Ghi chú">
                            <Input.TextArea />
                        </Form.Item>
                        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 16 }}>
                            <Button type="primary" htmlType="submit">
                                Cancel
                            </Button>
                            <Button
                                type="primary" htmlType="submit"
                            
                                style={{ marginLeft: "5px" }}
                            >
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Modal>
        </>
    );
};
export default SalesModal;