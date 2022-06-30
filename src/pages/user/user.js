import { useEffect, useState } from "react";
import { Col, Form, Collapse, Row, Table, Input, Button, Space } from "antd";
import { ApiFilled, DeleteOutlined, EditTwoTone, EyeOutlined } from "@ant-design/icons";
import "./users.scss";
import UserModal from "../../component/modal/userInfor";
import API from "../../api/manage/user";
import toast, { Toaster } from "react-hot-toast";
const { Panel } = Collapse;
const UserManager = () => {
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState({
    type: false,
    action: "create",
  });

  const [user, setUser] = useState("");

  const getListUser = async () => {
    let data = await API.getListUser();
    const listUser = data.result.filter((item) => item.status == true);
    setUser(listUser);
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
      dataIndex: "enable_notification",
      key: "enable_notification",
    },

    {
      title: "Action",
      key: "action",
      render: (record) => (
        <Space size="middle">
          <a onClick={() => setIsVisible({
            type: true, action: "edit", id: record.id
          })
          }>
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
        </Col>

        <Col span={24}>
          <Table
            dataSource={user}
            columns={columns}
            loading={loading}
            pagination={{
              pageSize: 5,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} items`,
            }}
          />
        </Col>
      </Row>
      <UserModal
        getListUser={getListUser}
        user={user}
        setUser={setUser}
        setIsVisible={setIsVisible}
        isVisible={isVisible}
      />
    </>
  );
};
export default UserManager;
