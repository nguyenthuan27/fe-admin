import { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Col,
  Select,
} from "antd";
import API from "../../../api/manage";
import toast, { Toaster } from "react-hot-toast";
const { Option } = Select;
const CreateVoucher = (props) => {
  const { isVisible, setIsVisible, vouchers, getListVoucher } = props;
  const [listRelease, setListRelease] = useState([]);
  const [form] = Form.useForm();
  const layout = {
    labelCol: { span: 20 },
    wrapperCol: { span: 24 },
  };
  const onFinish = (value) => {
    let data = {
      id: isVisible.id || "",
      voucherName: value.voucherName,
      voucherCode: value.voucherCode,
      type: value.type,
      discount: value.discount,
      pointsToReceive: value.pointsToReceive,
      maximumDiscount: value.maximumDiscount,
      paymentType: value.paymentType,
      minimumBill: value.minimumBill,
      status: true,
      note: value.note,
      releaseId: value.releaseId,
    };
    if (isVisible.action == "create") {
      createVoucher(data);
    } else {
      editVoucher(data);
    }
  };
  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };

  const createVoucher = async (data) => {
    let create = await API.createVoucher(data);
    if (create.message === "SUCCESS") {
      toast.success(create.message);
      getListVoucher();
      setIsVisible({ type: false, action: isVisible.action });
    } else {
      toast.error(create.message);
    }
  };

  const editVoucher = async (data) => {
    let update = await API.updateVoucher(data);
    if (update.message === "SUCCESS") {
      toast.success(update.message);
      getListVoucher();
      setIsVisible({ type: false, action: isVisible.action });
    } else {
      toast.error(update.message);
    }
  };

  const getListVoucherRelease = async () => {
    let res = await API.getListVoucherRelease();
    const listId = res.result.map((item) => item.id);
    setListRelease(listId);
  };
  useEffect(() => {
    getListVoucherRelease();
    let listDataVoucher = vouchers || [];
    const voucher =
      listDataVoucher?.find((item) => item.id == isVisible?.id) || [];
    form.setFieldsValue({
      id: voucher.id,
      voucherName: voucher.voucherName,
      voucherCode: voucher.voucherCode,
      type: voucher.type,
      discount: voucher.discount,
      pointsToReceive: voucher.pointsToReceive,
      maximumDiscount: voucher.maximumDiscount,
      paymentType: voucher.paymentType,
      minimumBill: voucher.minimumBill,
      createDate: voucher.createDate,
      status: voucher.status,
      note: voucher.note,
      releaseId: voucher.releaseId,
    });
  }, [isVisible.type]);
  return (
    <>
      <Toaster toastOptions={{ position: "top-center" }} />
      <Modal
        title="Thêm voucher"
        centered
        visible={isVisible.type}
        onCancel={() => setIsVisible({ type: false, action: isVisible.action })}
        footer={null}
      >
        <Form
          {...layout}
          form={form}
          name="nest-messages"
          onFinish={onFinish}
          layout="vertical"
          validateMessages={validateMessages}
        >
          <Row
            gutter={{
              xs: 8,
              sm: 16,
              md: 24,
              lg: 59,
            }}
            justify="left"
          >
            <Col>
              <Form.Item name="id" label="Id">
                <Input disabled />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item
                name="releaseId"
                label="Release Id"
                rules={[{ required: true }]}
              >
                <Select
                  placeholder="Please select"
                  style={{
                    width: "calc(100%)",
                  }}
                >
                  {listRelease.map((data, key) => {
                    return (
                      <Option key={key} value={data}>
                        {data}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>

            <Col>
              <Form.Item
                name="voucherName"
                label="Voucher name"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item
                name="voucherCode"
                label="Voucher code"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item name="note" label="Note" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item
                name="discount"
                label="Discount"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item name="type" label="Type" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item
                name="pointsToReceive"
                label="Points to receive"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item
                name="maximumDiscount"
                label="Maximum discount"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item
                name="paymentType"
                label="Payment type"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item
                name="minimumBill"
                label="Minimum bill"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 9 }}>
            {isVisible.action == "create" ? (
              <>
                <Button type="primary" htmlType="submit">
                  Create
                </Button>
              </>
            ) : (
              <>
                <Button type="primary" htmlType="submit">
                  Edit
                </Button>
              </>
            )}
            <Button
              type="primary"
              onClick={() =>
                setIsVisible({ type: false, action: isVisible.action })
              }
              style={{ marginLeft: "5px" }}
            >
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default CreateVoucher;
