import "./subjects.scss";
import { useEffect, useState } from "react";
import { Col, Form, Collapse, Row, Table, Input, Button, Space } from "antd";
import api from "../../api/manage";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
const { Panel } = Collapse;
const Subject = () => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
  }, []);

  const columns = [
    
  ];
  return (
    <Row className="subject-default">
      <Col span={24} className="title">
        Quản lý môn học
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
                <Col span={5}>
                  <Form.Item label="Tên môn học">
                    <Input
                      placeholder="Tên môn học"
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
export default Subject;
