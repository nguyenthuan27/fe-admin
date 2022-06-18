import { useEffect, useState } from "react";
import { Col, Form, Collapse, Row, Table, Input, Button, Space, Select } from "antd";
import { DeleteOutlined, EyeOutlined, EditTwoTone } from "@ant-design/icons";
import "./shift.scss";
import CreateBill from "../../component/modal/shift_staff/create";
import EditBill from "../../component/modal/shift_staff/edit";
const { Panel } = Collapse;
const ShiftManager = () => {
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
            title: 'Shift',
            dataIndex: 'shift',
            key: 'shift',
        },
        {
            title: 'Staff',
            dataIndex: 'staff',
            key: 'staff',
        },
        {
            title: 'Create by',
            dataIndex: 'create_by',
            key: 'create_by',
        },
        {
            title: 'Create by',
            dataIndex: 'create_by',
            key: 'create_by',
        },
        {
            title: 'Start date',
            dataIndex: 'start_date',
            key: 'start_date',
        },
        {
            title: 'Expire date',
            dataIndex: 'expire_date',
            key: 'expire_date',
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
                    Manage shift staff
                </Col>
                <Col span={24} className="subject-search">
                    <Form layout="vertical" autoComplete="off">
                        <Collapse>
                            <Panel header="Tìm" key="1">
                                <Row span={24} className="subject-filter">
                                    <Col span={9} className="filter">
                                        <Form.Item label="Staff" style={{ paddingRight: 20 }}>
                                            <Input style={{ width: "100px" }} placeholder="Staff" onChange={(e) => { }} />
                                        </Form.Item>
                                        <Form.Item label="Shift" style={{ paddingRight: 20 }}>
                                            <Input style={{ width: "100px" }} placeholder="Shift" onChange={(e) => { }} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Panel>
                        </Collapse>
                    </Form>
                </Col>
                <Col span={24} className="btn-create">
                    <Button onClick={() => setIsVisibleCreate(true)} type="primary ">
                        Create
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
            <CreateBill
                setIsVisible={setIsVisibleCreate}
                isVisible={isVisibleCreate}
            />
            <EditBill
                isVisible={isVisibleEdit}
                setIsVisible={setIsVisibleEdit}
            />
        </>
    );
};
export default ShiftManager;