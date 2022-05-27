import { useEffect, useState } from "react";
import { Col, Form, Collapse, Row, Table, Input, Button, Space } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import api from "../../api/approve";
import { getRole } from "../../utils/fpoly";
const { Panel } = Collapse;

const Posts = () => {
  const [loading, setLoading] = useState(false);
 
  useEffect(() => {
  }, []);
  const columns = [
    
  ];
  return (
    <Row className="subject-default">
      <Col span={24} className="title">
        Quản lý Post
      </Col>
      <Col span={24} className="subject-search">
        <Form layout="vertical" autoComplete="off">
          <Collapse>
            <Panel header="Tìm" key="1">
              <Row span={24} className="subject-filter">
                <Col span={5} className="filter">
                  <Form.Item label="Tên">
                    <Input
                      placeholder="Tên"
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
export default Posts;
