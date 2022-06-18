import { useEffect, useState } from "react";
import { Col, Form, Collapse, Row, Table, Input, Button, Space, Select } from "antd";
import { DeleteOutlined, EyeOutlined, EditTwoTone } from "@ant-design/icons";
import "./shift.scss";
import CreateBill from "../../component/modal/shift/create";
import EditBill from "../../component/modal/shift/edit";
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
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Code',
            dataIndex: 'code',
            key: 'code',
        },
        {
            title: 'Day',
            dataIndex: 'day',
            key: 'day',
        },
        {
            title: 'Day name',
            dataIndex: 'day_name',
            key: 'day_name',
        },
        {
            title: 'Start time',
            dataIndex: 'work_start_time',
            key: 'work_start_time',
        },
        {
            title: 'End time',
            dataIndex: 'work_end_time',
            key: 'work_end_time',
        },
        {
            title: 'Break time start',
            dataIndex: 'break_time_start',
            key: 'break_time_start',
        },
        {
            title: 'Break time start',
            dataIndex: 'break_time_start',
            key: 'break_time_start',
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
                    Manage shift
                </Col>
                <Col span={24} className="subject-search">
                    <Form layout="vertical" autoComplete="off">
                        <Collapse>
                            <Panel header="Tìm" key="1">
                                <Row span={24} className="subject-filter">
                                    <Col span={9} className="filter">
                                        <Form.Item label="Name" style={{ paddingRight: 20 }}>
                                            <Input style={{ width: "100px" }} placeholder="Name" onChange={(e) => { }} />
                                        </Form.Item>
                                        <Form.Item label="Code" style={{ paddingRight: 20 }}>
                                            <Input style={{ width: "100px" }} placeholder="Code" onChange={(e) => { }} />
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
