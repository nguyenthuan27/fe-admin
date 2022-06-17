import { useEffect, useState } from "react";
import { Col, Form, Collapse, Row, Table, Input, Button, Space } from "antd";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import "./users.scss";
import CreateUser from "../../component/modal/user/create";
import EditUser from "../../component/modal/user/edit";
const { Panel } = Collapse;
const UserManager = () => {
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {}, []);
  const columns = [{
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
},
{
    title: 'Full Name',
    dataIndex: 'full_name',
    key: 'full_name',
},
{
    title: 'Account',
    dataIndex: 'account',
    key: 'account',
},
{
    title: 'Password',
    dataIndex: 'password',
    key: 'password',
},
{
    title: 'Mobile Phone',
    dataIndex: 'mobile_phone',
    key: 'mobile_phone',
},
{
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
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
    title: 'Gender',
    dataIndex: 'gender',
    key: 'gender',
},
{
    title: 'Enable Notification',
    dataIndex: 'enable_notification',
    key: 'enable_notification',
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
      id: '1',
      full_name: 'Cao Anh Quan',
      email: 'quancaoanh789@gmail.com',
      mobile_phone: '0392087387',
      create_date: '16-06-2022',
      tags: ['nice', 'developer'],
  },
];
  return (
    <>
      <Row className="subject-default">
        <Col span={24} className="title">
          Quản lý User
        </Col>
        <Col span={24} className="subject-search">
          <Form layout="vertical" autoComplete="off">
            <Collapse>
              <Panel header="Tìm" key="1">
                <Row span={24} className="subject-filter">
                  <Col span={5} className="filter">
                    <Form.Item label="Full Name" style={{ paddingRight: 20 }}>
                      <Input placeholder="Full Name" onChange={(e) => {}} />
                    </Form.Item>
                    <Form.Item label="Email">
                      <Input placeholder="Email" onChange={(e) => { }} />
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
export default UserManager;
