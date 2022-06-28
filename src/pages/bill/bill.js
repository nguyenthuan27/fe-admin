import { useEffect, useState } from "react";
import { Col, Form, Collapse, Row, Table, Input, Button, Space, Select } from "antd";
import { DeleteOutlined, EyeOutlined, EditTwoTone } from "@ant-design/icons";
import "./bill.scss";
import BillModal from "../../component/modal/billInfo";
const { Panel } = Collapse;
const BillManager = () => {
    const [loading, setLoading] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const { Option } = Select;
    useEffect(() => { }, []);
    const columns = [
        {
            title: 'Customer',
            dataIndex: 'customer_id',
            key: 'customer_id',
        },
        {
            title: 'Voucher',
            dataIndex: 'voucher_id',
            key: 'voucher_id',
        },
        {
            title: 'Staff',
            dataIndex: 'staff_id',
            key: 'staff_id',
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Ship price',
            dataIndex: 'ship_price',
            key: 'ship_price',
        },
        {
            title: 'Bill code',
            dataIndex: 'bill_code',
            key: 'bill_code',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
        },
        {
            title: 'Total price',
            dataIndex: 'total_price',
            key: 'total_price',
        },
        {
            title: 'Price after voucher',
            dataIndex: 'price_after_voucher',
            key: 'price_after_voucher',
        },
        {
            title: 'Create date',
            dataIndex: 'create_date',
            key: 'create_date',
        },
        {
            title: 'Update date',
            dataIndex: 'update_date',
            key: 'update_date',
        },
        {
            title: 'State',
            dataIndex: 'state',
            key: 'state',
        },
        {
            title: 'Action',
            key: 'action',
            render: () => (
                <Space size="middle">
                    <a onClick={() => setIsVisible(true)}>
                        <EditTwoTone />Edit
                    </a>
                    <a>
                        <DeleteOutlined />Delete</a>
                </Space>
            ),
        },
    ];
    const data = [
        {
            key: '1',
            customer_id: 'John1',
            lastName: 'Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            tags: ['nice', 'developer'],
        },
    ];
    return (
        <>
            <Row className="subject-default">
                <Col span={24} className="title">
                    Quản lý Bill
                </Col>
                <Col span={24} className="subject-search">
                    <Form layout="vertical" autoComplete="off">
                        <Collapse>
                            <Panel header="Tìm" key="1">
                                <Row span={24} className="subject-filter">
                                    <Col span={9} className="filter">
                                        <Form.Item label="Customer" style={{ paddingRight: 20 }}>
                                            <Input style={{ width: "100px" }} placeholder="Customer" onChange={(e) => { }} />
                                        </Form.Item>
                                        <Form.Item label="Staff" style={{ paddingRight: 20 }}>
                                            <Input style={{ width: "100px" }} placeholder="Staff" onChange={(e) => { }} />
                                        </Form.Item>
                                        <Form.Item label="Address" style={{ paddingRight: 20 }}>
                                            <Input style={{ width: "100px" }} placeholder="Address" onChange={(e) => { }} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Panel>
                        </Collapse>
                    </Form>
                </Col>
                <Col span={24} className="btn-create">
                    <Button onClick={() => setIsVisible(true)} type="primary ">
                        Thêm mới
                    </Button>
                    <Col span={24} className="sort-filter" style={{ textAlign: "right" }}>
                        <Select
                            defaultValue="Sort filter"
                            style={{
                                width: 100,
                            }}
                        >
                            <Option value="10">10</Option>
                            <Option value="15">15</Option>
                        </Select>
                    </Col>
                </Col>


                <Col span={24}>
                    <Table
                        dataSource={data}
                        columns={columns}
                        loading={loading}
                        pagination={{
                            pageSize: 10,
                            showTotal: (total, range) =>
                                `${range[0]}-${range[1]} of ${total} items`,
                        }}
                    />
                </Col>
            </Row>
            <BillModal
                setIsVisible={setIsVisible}
                isVisible={isVisible}
            />
        </>
    );
};
export default BillManager;
