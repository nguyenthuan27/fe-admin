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
  Checkbox,
  Select,
} from "antd";
import { DeleteOutlined, EyeOutlined, EditTwoTone } from "@ant-design/icons";
import "./bill.scss";
import BillModal from "../../component/modal/bill/billInfo";
import API from "../../api/others";
import { getColorStatusBill } from "../../utils/fpoly";
import ChangeStatusBillModal from "../../component/modal/bill/ChangeStatusBillModal";

const { Panel } = Collapse;
const BillManager = () => {
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState({
    type: false,
  });
  const [openModal, setOpenModal] = useState({
    type: false,
  });

  const [bills, setListBill] = useState([]);
  const getListBill = async () => {
    setLoading(true);
    const res = await API.getListBill();
    setListBill(res.result);
    setLoading(false);
  };

  const filterBill = async (value) => {
    setLoading(true);
    const res = await API.getListBill();
    const dataFilter = res.result.filter((item) => item.state === value);
    setListBill(dataFilter);
    setLoading(false);
  };

  useEffect(() => {
    getListBill();
  }, []);

  const columns = [
    {
      title: "Mã đơn hàng",
      dataIndex: "bill_code",
      key: "bill_code",
    },
    {
      title: "Mã sản phẩm",
      key: "skuId",
      render: (text, record) => {
        return (
          <div>
            {record.list_product_variant.map((data, index) => {
              return (
                <div>
                  <div>{data.skuId}</div>
                </div>
              );
            })}
          </div>
        );
      },
    },
    {
      title: "Tổng tiền",
      key: "total_price",
      render: (text, record) => {
        return (
          <span>
            {record.total_price.toLocaleString("it-IT", {
              style: "currency",
              currency: "VND",
            })}
          </span>
        );
      },
    },
    {
      title: "Mã voucher",
      dataIndex: "voucher_code",
      key: "voucher_code",
    },
    {
      title: "Size",
      key: "Size",
      render: (text, record) => (
        <div className="d-flex align-items-center">
          {record.list_product_variant.map((items) => (
            <div>
              {items.data.map((item) => (
                <div>
                  {item.datadetail.map((data) =>
                    item.optionName === "Size" ? (
                      <>
                        <div className="d-flex align-items-center justify-content-center option-product">
                          {item.optionName === "Size"
                            ? data.optionValueName
                            : ""}
                        </div>
                      </>
                    ) : (
                      <></>
                    )
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      ),
    },
    {
      title: "Số lượng",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Khách hàng",
      key: "customer_name",
      render: (text, record) => {
        return <span>{record.receiver_name}</span>;
      },
    },
    {
      title: "Ngày mua",
      dataIndex: "create_date",
      key: "create_date",
    },
    {
      title: "Người bán",
      key: "staff_name",
      render: (text, record) => {
        return <span>{record.staff.staff_name}</span>;
      },
    },
    {
      title: "Kênh bán hàng",
      dataIndex: "type_vi",
      key: "type_vi",
    },
    {
      title: "Trạng thái đơn hàng",
      key: "state_vi",
      render: (text, record) => (
        <span
          onClick={() =>
            setOpenModal({
              type: true,
              id: record.bill_id,
              status: record.state,
            })
          }
          style={{
            color: `${getColorStatusBill(text.state)}`,
            fontWeight: "bolder",
          }}
        >
          {text.state_vi}
        </span>
      ),
    },
    {
      title: "Phương thức thanh toán",
      dataIndex: "payment_vi",
      key: "payment_vi",
    },
    {
      title: "Thao tác",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <a
            onClick={() =>
              setIsVisible({
                type: true,
                id: record.bill_id,
              })
            }
          >
            <EditTwoTone />
            Edit
          </a>
        </Space>
      ),
    },
  ];
  return (
    <>
      <Row className="subject-default">
        <Col span={24} className="title">
          Quản lý đơn hàng
        </Col>
        <Col span={24} className="subject-search">
          <Form layout="vertical" autoComplete="off">
            <Collapse>
              <Panel header="Tìm" key="2">
                <Row span={24}>
                  <Col span={12} offset={12}>
                    <Button
                      onClick={() => setIsVisible({ type: true, action: "" })}
                      className="btn-submit"
                      style={{ background: "Orange", color: "black" }}
                      type="primary"
                    >
                      Tra cứu
                    </Button>
                  </Col>
                </Row>
              </Panel>
            </Collapse>
          </Form>
        </Col>
        <Col span={24} className="sort-filter" style={{ textAlign: "right" }}>
          <Space size="middle">
            <Button
              onClick={() => filterBill("done")}
              className="btn"
              style={{ background: "green" }}
              type="primary"
            >
              Hoàn thành
            </Button>
            <Button
              onClick={() => filterBill("approved")}
              style={{ background: "blue" }}
              className="btn"
            >
              Đã duyệt
            </Button>
            <Button
              onClick={() => filterBill("refuse")}
              className="btn"
              style={{ background: "red" }}
            >
              Từ chối
            </Button>
            <Button
              onClick={() => filterBill("user_cancle")}
              className="btn"
              style={{ background: "yellow", color: "black" }}
              type="primary"
            >
              Người dùng huỷ
            </Button>
            <Button
              onClick={() => filterBill("return")}
              className="btn"
              style={{ background: "pink", color: "black" }}
              type="primary"
            >
              Trả hàng
            </Button>
            <Button
              onClick={() => filterBill("wait")}
              className="btn"
              style={{ background: "purple", color: "black" }}
              type="primary"
            >
              Chờ xác nhận
            </Button>
            <Button
              onClick={() => filterBill("draft")}
              className="btn"
              style={{ background: "lime", color: "black" }}
              type="primary"
            >
              Nháp
            </Button>
          </Space>
        </Col>
        <br />
        <Col span={24}>
          <Table
            dataSource={bills}
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
      <BillModal
        setListBill={setListBill}
        bills={bills}
        setIsVisible={setIsVisible}
        isVisible={isVisible}
        getListBill={getListBill}
      />

      <ChangeStatusBillModal
        isVisible={openModal}
        setIsVisible={setOpenModal}
        getListBill={getListBill}
      />
    </>
  );
};
export default BillManager;
