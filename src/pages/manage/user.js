import { useEffect, useState } from "react";
import { Col, Form, Collapse, Row, Table, Input, Button, Space } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import api from "../../api/manage";
import { getRole } from "../../utils/fpoly";
const { Panel } = Collapse;

const Users = () => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
  }, []);
  const columns = [
    
  ];
  return (
    <Row className="subject-default">
      <Col span={24} className="title">
        Quản lý User
      </Col>
      <Col span={24}>
        <Button type="primary">
          <i class="bx bx-plus"></i>
          <span>Thêm mới</span>
        </Button>
      </Col>
      <Col span={24} className="subject-search">
        <Form layout="vertical" autoComplete="off">
          <Collapse>
            <Panel header="Tìm" key="1">
              <Row span={24} className="subject-filter">
                <Col span={5} className="filter">
                  <Form.Item label="Tên" style={{ paddingRight: 20 }}>
                    <Input
                      placeholder="Tên"
                      onChange={(e) => {
                       
                      }}
                    />
                  </Form.Item>
                  <Form.Item label="Email">
                    <Input
                      placeholder="Email"
                      onChange={(e) => {
                      }}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Panel>
          </Collapse>
        </Form>
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
  );
};
export default Users;
