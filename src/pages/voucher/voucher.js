import { useEffect, useState } from "react";
import { Col, Form, Collapse, Row, Table, Input, Button, Space, Select } from "antd";
import { DeleteOutlined, EyeOutlined, EditTwoTone } from "@ant-design/icons";
import "./voucher.scss";
import CreateVoucher from "../../component/modal/voucher/create";
import EditVoucher from "../../component/modal/voucher/edit";
const { Panel } = Collapse;
const VoucherManager = () => {
    const [loading, setLoading] = useState(false);
    const [isVisibleCreate, setIsVisibleCreate] = useState(false);
    const [isVisibleEdit, setIsVisibleEdit] = useState(false);
    const { Option } = Select;
    useEffect(() => { }, []);
    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Release',
            dataIndex: 'release_id',
            key: 'release_id',
        },
        {
            title: 'Voucher name',
            dataIndex: 'voucher_name',
            key: 'voucher_name',
        },
        {
            title: 'Voucher code',
            dataIndex: 'voucher_code',
            key: 'voucher_code',
        },
        {
            title: 'Note',
            dataIndex: 'note',
            key: 'note',
        },
        {
            title: 'Discount',
            dataIndex: 'discount',
            key: 'discount',
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Points to receive',
            dataIndex: 'points_to_receive',
            key: 'points_to_receive',
        },
        {
            title: 'Maximum discount',
            dataIndex: 'maximum_discount',
            key: 'maximum_discount',
        },
        {
            title: 'Payment type',
            dataIndex: 'payment_type',
            key: 'payment_type',
        },
        {
            title: 'Minimum bill',
            dataIndex: 'minimum_bill',
            key: 'minimum_bill',
        },
        {
            title: 'Create date',
            dataIndex: 'create_date',
            key: 'create_date',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Action',
            key: 'action',
            render: () => (
                <Space size="middle">
                    <a onClick={() => setIsVisibleEdit(true)}>
                        <EditTwoTone />Edit
                    </a>
                    <a>
                        <DeleteOutlined />Delete</a>
                </Space>
            ),
        },
    ];
    return (
        <>
            <Row className="subject-default">
                <Col span={24} className="title">
                    Quản lý Voucher
                </Col>
                <Col span={24} className="subject-search">
                    <Form layout="vertical" autoComplete="off">
                        <Collapse>
                            <Panel header="Tìm" key="1">
                                <Row span={24} className="subject-filter">
                                    <Col span={9} className="filter">
                                        <Form.Item label="Voucher name" style={{ paddingRight: 20 }}>
                                            <Input style={{ width: "100px" }} placeholder="Voucher name" onChange={(e) => { }} />
                                        </Form.Item>
                                        <Form.Item label="Voucher code" style={{ paddingRight: 20 }}>
                                            <Input style={{ width: "100px" }} placeholder="Voucher code" onChange={(e) => { }} />
                                        </Form.Item>

                                    </Col>
                                </Row>
                            </Panel>
                        </Collapse>
                    </Form>
                </Col>
                <Col span={24} className="btn-create">
                    <Button onClick={() => setIsVisibleCreate(true)} type="primary ">
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
                        dataSource={""}
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
            <CreateVoucher
                setIsVisible={setIsVisibleCreate}
                isVisible={isVisibleCreate}
            />
            <EditVoucher
                isVisible={isVisibleEdit}
                setIsVisible={setIsVisibleEdit}
            />
        </>
    );
};
export default VoucherManager;
