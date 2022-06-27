import { useEffect, useState } from "react";
import { Col, Form, Collapse, Row, Table, Input, Button, Space, Select } from "antd";
import { DeleteOutlined, EditTwoTone, EyeOutlined } from "@ant-design/icons";
import "./staff.scss";
import CreateStaff from "../../component/modal/staff/create";
import EditStaff from "../../component/modal/staff/edit";
const { Panel } = Collapse;
const StaffManager = () => {
  const [loading, setLoading] = useState(false);
  const [isVisibleCreate, setIsVisibleCreate] = useState(false);
  const [isVisibleEdit, setIsVisibleEdit] = useState(false);
  const { Option } = Select;
  useEffect(() => { }, []);
  const columns = [{
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'User id',
    dataIndex: 'user_id',
    key: 'user_id',
  },
  {
    title: 'Role',
    dataIndex: 'role',
    key: 'role',
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
      customer_id: 'John',
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
          Quản lý Staff
        </Col>
        <Col span={24} className="subject-search">
          <Form layout="vertical" autoComplete="off">
            <Collapse>
              <Panel header="Tìm" key="1">
                <Row span={24} className="subject-filter">
                  <Col span={5} className="filter">
                    <Form.Item label="User id" style={{ paddingRight: 20 }}>
                      <Input placeholder="User id" onChange={(e) => { }} />
                    </Form.Item>
                    <Form.Item label="Role">
                      <Input placeholder="Role" onChange={(e) => { }} />
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
      <CreateStaff
        setIsVisible={setIsVisibleCreate}
        isVisible={isVisibleCreate}
      />
      <EditStaff
        isVisible={isVisibleEdit}
        setIsVisible={setIsVisibleEdit}
      />
    </>
  );
};
export default StaffManager;