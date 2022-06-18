import { useEffect, useState } from "react";
import { Button, Form, Input, InputNumber, Modal, Row, Col } from "antd";
const EditVoucher = (props) => {

    const { isVisible, setIsVisible } = props;
    const layout = {
        labelCol: { span: 20 },
        wrapperCol: { span: 24 },
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
                title="Sửa voucher"
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
                        <Col>
                            <Form.Item
                                name={["bill", "id"]}
                                label="Id"
                                rules={[{ required: true, type: "number" }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col>
                            <Form.Item
                                name={["bill", "release_id"]}
                                label="Release"
                                rules={[{ required: true }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col>
                            <Form.Item
                                name={["bill", "voucher_name"]}
                                label="Voucher name"
                                rules={[{ required: true }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col>
                            <Form.Item
                                name={["bill", "voucher_code"]}
                                label="Voucher code"
                                rules={[{ required: true }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col>
                            <Form.Item
                                name={["bill", "note"]}
                                label="Note"
                                rules={[{ required: true }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col>
                            <Form.Item
                                name={["bill", "discount"]}
                                label="Discount"
                                rules={[{ required: true, type: "number" }]}
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
                        <Col>
                            <Form.Item
                                name={["bill", "points_to_receive"]}
                                label="Points to receive"
                                rules={[{ required: true }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col>
                            <Form.Item
                                name={["bill", "maximum_discount"]}
                                label="Maximum discount"
                                rules={[{ required: true, type: "number" }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col>
                            <Form.Item
                                name={["bill", "payment_type"]}
                                label="Payment type"
                                rules={[{ required: true, type: "number" }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col>
                            <Form.Item
                                name={["bill", "minimum_bill"]}
                                label="Minimum bill"
                                rules={[{ required: true, type: "number" }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
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
                                name={["bill", "status"]}
                                label="Status"
                                rules={[{ required: true }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
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
            </Modal>
        </>
    );
};
export default EditVoucher;
