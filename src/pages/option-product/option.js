import { useEffect, useState } from "react";
import {
  Col,
  Form,
  Collapse,
  Row,
  Table,
  Input,
  Button,
  Space,
  Select,
} from "antd";
import {
  DeleteOutlined,
  EyeOutlined,
  EditTwoTone,
  PlusOutlined,
  ToolOutlined,
} from "@ant-design/icons";
import API from "../../api/manage";
import "./style.scss";
import toast, { Toaster } from "react-hot-toast";
import OptionModal from "../../component/modal/option/optionModal";
import OptionValueModal from "../../component/modal/option/optionValueModal";
const { Panel } = Collapse;
const { Option } = Select;
const OptionProduct = () => {
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState("");
  const [isVisibleModal, setIsVisibleModal] = useState({
    type: false,
    action: "create",
  });
  const [isOpenModal, setIsOpenModal] = useState({
    type: false,
    action: "create",
  });
  const getListOptionProduct = async () => {
    let data = await API.getListOptionProduct();
    const listOption = data.result.filter((item) => item.status == true);
    setOptions(listOption);
  };
  useEffect(() => {
    getListOptionProduct();
  }, []);
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Option name",
      dataIndex: "optionName",
      key: "optionName",
    },
    {
      title: "Option Value List",
      render: (text, record) => (
        <div className="d-flex align-items-center ">
          {record.optionValueList.map((item) => (
            <div
              className="d-flex align-items-center justify-content-center option-product"
              key={item.id}
              style={
                record.optionName === "Color"
                  ? { backgroundColor: item.optionValueName }
                  : {}
              }
            >
              <div>
                {record.optionName === "Color" ? (
                  <></>
                ) : (
                  <>{item.optionValueName}</>
                )}
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text, record) => (
        <div className="d-flex align-items-center">
          {record.status == true ? (
            <div className="d-flex align-items-center justify-content-center">
              <div className="status-active">
                <div className="status-active-text">Active</div>
              </div>
            </div>
          ) : (
            <div className="d-flex align-items-center justify-content-center">
              <div className="status-inactive">
                <div className="status-inactive-text">Inactive</div>
              </div>
            </div>
          )}
        </div>
      ),
    },
    {
      title: "Create date",
      dataIndex: "createDate",
      key: "createDate",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() =>
              setIsVisibleModal({
                type: true,
                action: "edit",
                id: record.id,
              })
            }
          >
            <EditTwoTone />
            Edit Option
          </Button>
          <Button
            type="primary"
            onClick={() =>
              setIsOpenModal({
                type: true,
                action: "create",
                id: record.id,
              })
            }
          >
            <PlusOutlined />
            Add Option Value
          </Button>
          <Button
            type="primary"
            onClick={() =>
              setIsOpenModal({
                type: true,
                action: "edit",
                id: record.id,
              })
            }
          >
            <ToolOutlined />
            Update Option Value
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <>
      <Toaster toastOptions={{ position: "top-center" }} />
      <Row className="subject-default">
        <Col span={24} className="title">
          Thuộc tính động
        </Col>
        <Col span={24} className="subject-search">
          <Form layout="vertical" autoComplete="off">
            <Collapse>
              <Panel header="Tìm" key="1">
                <Row span={24} className="subject-filter">
                  <Col span={9} className="filter">
                    <Form.Item
                      label="Voucher name"
                      style={{ paddingRight: 20 }}
                    >
                      <Input
                        style={{ width: "100px" }}
                        placeholder="Voucher name"
                        onChange={(e) => {}}
                      />
                    </Form.Item>
                    <Form.Item
                      label="Voucher code"
                      style={{ paddingRight: 20 }}
                    >
                      <Input
                        style={{ width: "100px" }}
                        placeholder="Voucher code"
                        onChange={(e) => {}}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Panel>
            </Collapse>
          </Form>
        </Col>
        <Col span={24} className="btn-create">
          <Button
            onClick={() => setIsVisibleModal({ type: true, action: "create" })}
            type="primary "
          >
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
            dataSource={options}
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
      <OptionModal
        getListOptionProduct={getListOptionProduct}
        options={options}
        setOptions={setOptions}
        setIsVisible={setIsVisibleModal}
        isVisible={isVisibleModal}
      />
      <OptionValueModal
        getListOptionProduct={getListOptionProduct}
        options={options}
        setOptions={setOptions}
        setIsVisible={setIsOpenModal}
        isVisible={isOpenModal}
      />
    </>
  );
};

export default OptionProduct;
