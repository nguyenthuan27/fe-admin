import { useEffect, useState } from "react";
import { Button, Form, Input, InputNumber, Modal, Space, Row, Col } from "antd";
const EditBill = (props) => {
    const { isVisible, setIsVisible } = props;
    const layout = {
        labelCol: { span: 20 },
        wrapperCol: { span: 24 },
    };
    const onFinish = () => { };
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
                title="Sửa Bill"
                centered
                visible={isVisible}
                onCancel={() => setIsVisible(false)}
                footer={null}
            >
                <Form
                    {...layout}
                    name="nest-messages"
                    onFinish={onFinish}
                    layout="vertical"
                    validateMessages={validateMessages}
                >
                    <Row gutter={{
                        xs: 8,
                        sm: 16,
                        md: 24,
                        lg: 59
                    }} justify="left">
                        <Space>
                            <Col>
                                <Form.Item
                                    name={["bill", "customer_id"]}
                                    label="Customer"
                                    rules={[{ required: true }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col>
                                <Form.Item
                                    name={["bill", "voucher_id"]}
                                    label="Voucher"
                                    rules={[{ required: true }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Space>

                        <Space>
                            <Col>
                                <Form.Item
                                    name={["bill", "staff_id"]}
                                    label="Staff"
                                    rules={[{ required: true }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col>
                                <Form.Item
                                    name={["bill", "type"]}
                                    label="Type"
                                    rules={[{ required: true }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Space>

                        <Space>
                            <Col>
                                <Form.Item
                                    name={["bill", "address"]}
                                    label="Address"
                                    rules={[{ required: true }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col>
                                <Form.Item
                                    name={["bill", "ship_price"]}
                                    label="Ship price"
                                    rules={[{ required: true, type: "number" }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Space>

                        <Space>
                            <Col>
                                <Form.Item
                                    name={["bill", "bill_code"]}
                                    label="Bill code"
                                    rules={[{ required: true }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col>
                                <Form.Item
                                    name={["bill", "amount"]}
                                    label="Amount"
                                    rules={[{ required: true }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Space>

                        <Space>
                            <Col>
                                <Form.Item
                                    name={["bill", "total_price"]}
                                    label="Total price"
                                    rules={[{ required: true, type: "number" }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col>
                                <Form.Item
                                    name={["bill", "price_after_voucher"]}
                                    label="Price after voucher"
                                    rules={[{ required: true, type: "number" }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Space>

                        <Space>
                            <Col>
                                <Form.Item
                                    name={["bill", "create_date"]}
                                    label="Create date"
                                    rules={[{ required: true }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col>
                                <Form.Item
                                    name={["bill", "update_date"]}
                                    label="Update date"
                                    rules={[{ required: true }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Space>

                        <Space>
                            <Col>
                                <Form.Item
                                    name={["bill", "state"]}
                                    label="State"
                                    rules={[{ required: true }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Space>
                    </Row>

                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 9 }}>
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
            </Modal >
        </>
    );
};
export default EditBill;
