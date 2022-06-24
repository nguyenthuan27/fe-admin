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
import { DeleteOutlined, EyeOutlined, EditTwoTone } from "@ant-design/icons";
import "./voucher.scss";
import CreateVoucher from "../../component/modal/voucher/create";
import API from "../../api/manage";
import toast, { Toaster } from "react-hot-toast";
const { Panel } = Collapse;
const VoucherManager = () => {
  const [loading, setLoading] = useState(false);
  const [isVisibleCreate, setIsVisibleCreate] = useState({
    type: false,
    action: "create"
  });
  const [vouchers, setVouchers] = useState("");
  const { Option } = Select;

  const getListVoucher = async () => {
    let data = await API.getListVoucher();
    const listVoucher = data.result.filter((item) => item.status == true);
    setVouchers(listVoucher);
  };
  const deleteVoucher = async (idVoucher) => {
    let data = await API.deleteVoucher(idVoucher);
    if (data.message === "SUCCESS") {
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
    getListVoucher();
  };
  useEffect(() => {
    getListVoucher();
  }, []);
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Voucher name",
      dataIndex: "voucherName",
      key: "voucherName",
    },
    {
      title: "Voucher code",
      dataIndex: "voucherCode",
      key: "voucherCode",
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
      sorter: (a, b) => a.discount - b.discount,
    },
    {
      title: "Points to receive",
      dataIndex: "pointsToReceive",
      key: "pointsToReceive",
    },
    {
      title: "Maximum discount",
      dataIndex: "maximumDiscount",
      key: "maximumDiscount",
    },
    {
      title: "Payment type",
      dataIndex: "paymentType",
      key: "paymentType",
    },
    {
      title: "Minimum bill",
      dataIndex: "minimumBill",
      key: "minimumBill",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Note",
      dataIndex: "note",
      key: "note",
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
          <a
            onClick={() =>
              setIsVisibleCreate({ type: true, action: "edit", id: record.id })
            }
          >
            <EditTwoTone />
            Edit
          </a>
          <a onClick={() => deleteVoucher(record.id)}>
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
          Quản lý Voucher
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
            onClick={() => setIsVisibleCreate({ type: true, action: "create" })}
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
            dataSource={vouchers}
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
      <CreateVoucher
        getListVoucher={getListVoucher}
        vouchers={vouchers}
        setVouchers={setVouchers}
        setIsVisible={setIsVisibleCreate}
        isVisible={isVisibleCreate}
      />
    </>
  );
};
export default VoucherManager;
