import { useEffect, useState } from "react";
import { Col, Form, Collapse, Row, Table, Input, Button, Space, Select } from "antd";
import { DeleteOutlined, EditTwoTone, EyeOutlined } from "@ant-design/icons";
import "./users.scss";
import UserModal from "../../component/modal/userInfor";
import API from "../../api/manage";
import toast, { Toaster } from "react-hot-toast";
const { Panel } = Collapse;
const UserManager = () => {
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState({
    type: false,
    action: "create",
  });
  const [users, setUsers] = useState("");
  const { Option } = Select;

  const getListUser = async () => {
    let data = await API.getListUser();
    const listUser = data.result.filter((item) => item.status == true);
    setUsers(listUser);
  };

  const deleteUser = async (idUser) => {
    let data = await API.deleteUser(idUser);
    if (data.message === "SUCCESS") {
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
    getListUser();
  };

  useEffect(() => {
    getListUser();
  }, []);
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Account",
      dataIndex: "account",
      key: "account",
    },
    {
      title: "Password",
      dataIndex: "password",
      key: "password",
    },
    {
      title: "Mobile Phone",
      dataIndex: "mobilePhone",
      key: "mobilePhone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Create date",
      dataIndex: "createDate",
      key: "createDate",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Enable Notification",
      dataIndex: "enableNotification",
      key: "enableNotification",
    },

    {
      title: "Action",
      key: "action",
      render: (record) => (
        <Space size="middle">
          <a onClick={() => setIsVisible({ type: true, action: "edit", id: record.id })}>
            <EditTwoTone />
            Edit
          </a>
          <a onClick={() => deleteUser(record.id)}>
            <DeleteOutlined />
            Delete
          </a>
        </Space>
      ),
    },
  ];
  return (
    <>
      <Toaster toastOptions={{ position: "top-center" }} />
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
                      <Input placeholder="Full Name" onChange={(e) => { }} />
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
          <Button onClick={() => setIsVisible({ type: true, action: "create" })} type="primary ">
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
            dataSource={users}
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
      <UserModal
        getListUser={getListUser}
        users={users}
        setUsers={setUsers}
        setIsVisible={setIsVisible}
        isVisible={isVisible}
      />
    </>
  );
};
export default UserManager;
