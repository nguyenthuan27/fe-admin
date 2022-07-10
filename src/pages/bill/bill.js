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
import BillModal from "../../component/modal/billInfo";
import API from "../../api/others";
const { Panel } = Collapse;
const BillManager = () => {
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState({
    type: false,
    action: "create",
  });
  const [bills, setListBill] = useState("");
  const { Option } = Select;
  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };
  const getListBill = async () => {
    setLoading(true);
    const res = await API.getListBill();
    setListBill(res.result);
    setLoading(false);
  };

  useEffect(() => {
    getListBill();
  }, []);

  const columns = [
    {
      title: "",
      key: "",
      render: (text,) => (
        <Checkbox onChange={onChange}></Checkbox>
      ),
    },
    {
      title: "STT",
      dataIndex: "bill_id",
      key: "bill_id",
    },
    {
      title: "Mã đơn hàng",
      dataIndex: "bill_code",
      key: "bill_code",
    },
    {
      title: "Mã sản phẩm",
      key: "skuId",
      render: (text, record) => {
        return <div>{record.list_product_variant.map((datalistProduct, index) => {
          return (
            <div>
              {datalistProduct.listOptionInfos.map(data => {
                return <div >
                  {data.skuId != '' ? data.skuId + ' ' : {}}
                </div>;
              })
              }
            </div>
          )
        },
        )}
        </div>;
      },
    },
    {
      title: "Tổng tiền",
      key: "total_price",
      render: (text, record) => {
        return <span>{record.total_price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</span>;
      },
    },
    {
      title: "Mã voucher",
      dataIndex: "voucher_code",
      key: "voucher_code",
    },
    {
      title: "Màu sắc",
      key: "Color",
      render: (text, record) => (
        <div className="d-flex align-items-center ">
          {record.list_product_variant.map((items) => (
            <div>
              {items.listOptionInfos.map((item) => (
                <div>
                  {item.listOptionDetails.map((data) => (
                    (item.optionName) === "Color" ?
                      <>
                        <div
                          className="d-flex align-items-center justify-content-center option-product"
                          key={item.optionId}
                          style={
                            item.optionName === "Color"
                              ? { backgroundColor: data.optionValueName }
                              : {}
                          }
                        >
                        </div>
                      </>
                      :
                      <></>
                  ))
                  }
                </div>
              )
              )
              }
            </div>
          )
          )}
        </div>
      ),
    },
    {
      title: "Size",
      key: "Size",
      render: (text, record) => (
        <div className="d-flex align-items-center">
          {record.list_product_variant.map((items) => (
            <div>
              {items.listOptionInfos.map((item) => (
                <div>
                  {item.listOptionDetails.map((data) => (
                    (item.optionName === "Size") ?
                      <>
                        <div className="d-flex align-items-center justify-content-center option-product">
                          {item.optionName === "Size" ? data.optionValueName : ''}
                        </div>
                      </>
                      :
                      <></>
                  ))
                  }
                </div>
              )
              )
              }
            </div>
          )
          )}
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
        return <span>{record.customer.customer_name}</span>;
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
      title: "Điểm tích lũy",
      dataIndex: "point_receive",
      key: "point_receive",
    },
    {
      title: "Kênh bán hàng",
      dataIndex: "type_vi",
      key: "type_vi",
    },
    {
      title: "Trạng thái đơn hàng",
      dataIndex: "state_vi",
      key: "state_vi",
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
                action: "edit",
                id: record.bill_id,
              })
            }
          >
            <EditTwoTone />
            Edit
          </a>
          <a>
            <DeleteOutlined />
            Delete
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
            <Collapse >
              <Panel header="Tìm" key="2">
                <Row span={24} className="subject-filter" justify="space-around" align="middle">
                  <Col span={4} className="filter">
                    <Form.Item label="Mã đơn hàng" style={{ paddingRight: 20 }}>
                      <Input
                        style={{ width: "100%" }}
                        onChange={(e) => { }}
                      />
                    </Form.Item >
                  </Col>
                  <Col span={4} offset={2} className="filter">
                    <Form.Item label="Mã sản phẩm" style={{ paddingRight: 20 }}>
                      <Input
                        style={{ width: "100%" }}
                        onChange={(e) => { }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={4} offset={2} className="filter">
                    <Form.Item label="Mã voucher" style={{ paddingRight: 20 }}>
                      <Input
                        style={{ width: "100%" }}
                        onChange={(e) => { }}
                      />
                    </Form.Item >
                  </Col>
                  <Col span={4} offset={2} className="filter">
                    <Form.Item label="Màu sắc" style={{ paddingRight: 20 }}>
                      <Input
                        style={{ width: "100%" }}
                        onChange={(e) => { }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={4} className="filter">
                    <Form.Item label="Size" style={{ paddingRight: 20 }}>
                      <Input
                        style={{ width: "100%" }}
                        onChange={(e) => { }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={4} offset={2} className="filter">
                    <Form.Item label="Khách hàng" style={{ paddingRight: 20 }}>
                      <Input
                        style={{ width: "100%" }}
                        onChange={(e) => { }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={4} offset={2} className="filter">
                    <Form.Item label="Người bán" style={{ paddingRight: 20 }}>
                      <Input
                        style={{ width: "100%" }}
                        onChange={(e) => { }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={4} offset={2} className="filter">
                    <Form.Item label="Kênh bán hàng" style={{ paddingRight: 20 }}>
                      <Input
                        style={{ width: "100%" }}
                        onChange={(e) => { }}
                      />
                    </Form.Item>
                  </Col>
                </Row>
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
              onClick={() => setIsVisible({ type: false, action: "" })}
              className="btn"
              style={{ background: "green" }}
              type="primary"

            >
              Đơn hàng thành công
            </Button>
            <Button
              onClick={() => setIsVisible({ type: false, action: "" })}
              className="btn"
              type="primary"
            >
              Duyệt đơn hàng
            </Button>
            <Button
              onClick={() => setIsVisible({ type: false, action: "" })}
              className="btn"
              type="primary"
              danger
            >
              Từ chối đơn hàng
            </Button>
            <Button
              onClick={() => setIsVisible({ type: false, action: "" })}
              className="btn"
              style={{ background: "yellow", color: "black" }}
              type="primary"
            >
              Đơn hàng hoàn trả
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
              pageSize: 5,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} items`,
            }}
          />
        </Col>
      </Row >
      <BillModal
        setListBill={setListBill}
        bills={bills}
        setIsVisible={setIsVisible}
        isVisible={isVisible}
        getListBill={getListBill}
      />
    </>
  );
};
export default BillManager;
