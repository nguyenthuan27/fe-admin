import { useEffect, useState } from "react";
import { Button, Form, Input, InputNumber, Modal, Radio, DatePicker } from "antd";
const EditShiftStaff = (props) => {
    const { isVisible, setIsVisible } = props;
    const layout = {
        labelCol: { span: 7 },
        wrapperCol: { span: 16 },
    };
    const onFinish = () => {

    }

    const onChange = (value, dateString) => {
        console.log("Selected Time: ", value);
        console.log("Formatted Selected Time: ", dateString);
    };

    const onOk = (value) => {
        console.log("onOk: ", value);
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
    useEffect(() => { }, []);
    return (
        <>
            <Modal
                title="Edit shift staff"
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
                        name={["shift", "shift_id"]}
                        label="Shift"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name={["shift", "staff_id"]}
                        label="Staff"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name={["shift", "create_by"]}
                        label="Create by"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name={["shift", "create_date"]}
                        label="Create date"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name={["shift", "start_date"]}
                        label="Start date"
                        rules={[{ required: true }]}
                    >
                        <DatePicker showTime onChange={onChange}
                            style={{
                                width: '100%',
                            }} onOk={onOk} />
                    </Form.Item>

                    <Form.Item
                        name={["shift", "expire_date"]}
                        label="Expire date"
                        rules={[{ required: true }]}
                    >
                        <DatePicker showTime onChange={onChange}
                            style={{
                                width: '100%',
                            }} onOk={onOk} />
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
export default EditShiftStaff;
