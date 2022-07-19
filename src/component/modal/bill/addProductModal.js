import { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Radio,
  Row,
  Col,
  Select,
  Tree,
} from "antd";
import API from "../../../api/manage";
import toast, { Toaster } from "react-hot-toast";
import "./style.scss";
import { useSelector, useDispatch } from "react-redux";
import { addItem, clear } from "../../../redux/cart";
const AddProductModal = (props) => {
  const [loading, setLoading] = useState(false);
  const { isVisible, setIsVisible } = props;
  const [listProductOptionTree, setListProductOptionTree] = useState([]);
  const [form] = Form.useForm();
  const layout = {
    labelCol: { span: 20 },
    wrapperCol: { span: 24 },
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
  const dispatch = useDispatch();
  const onFinish = async (value) => {
    setLoading(true);
    const data = await API.getProductVariantById(isVisible.id);
    let result = data.result.listproductall[0];
    if (result.list[0].quantity < value.amount) {
      toast.error("Số lượng không đủ");
      setLoading(false);
      return;
    } else {
      const newItem = {
        sku_id: result.list[0].sku_id,
        variantId: isVisible.id,
        name: result.productname,
        price: result.toprice,
        amount: value.amount,
        totalPrice: result.toprice * value.amount,
        option: result.list[0].data,
      };
      dispatch(addItem(newItem));
      setLoading(false);
      toast.success("Thêm sản phẩm thành công");
    }
    setIsVisible({ type: false });
  };
  const getDetailProduct = async () => {
    if (!isVisible.id) return;
    const data = await API.getProductVariantById(isVisible.id);
    let result = data.result.listproductall[0];
    form.setFieldsValue({
      price: result.fromprice,
      productname: result.productname,
      quantity: result.list[0].quantity,
    });
    const listOptionModal = data.result.listproductall[0]?.list[0].data || [];
    const optionProduct = listOptionModal?.map((item, index) => {
      return {
        title: <div className="title-tree">{item.option_name}</div>,
        key: item.option_id,
        children: item.datadetail.map((value, index) => {
          return {
            title: (
              <div
                className="tree-item"
                key={value.option_value_id + item.option_id + index + 5}
              >
                <div className="tree-name">{`${value.option_value_name}`}</div>
                <div
                  style={
                    item.optionName === "Color"
                      ? {
                          background: `${value.option_value_name}`,
                          width: "30px",
                          height: "30px",
                          borderRadius: "50%",
                          border: "2px solid #ccc",
                        }
                      : {}
                  }
                ></div>
              </div>
            ),
            key: value.option_value_id + "-" + item.option_id,
          };
        }),
      };
    });
    setListProductOptionTree(optionProduct);
  };
  useEffect(() => {
    setListProductOptionTree([]);
    getDetailProduct();
  }, [isVisible.id]);
  return (
    <>
      <Modal
        title="Thông tin sản sản phẩm"
        centered
        visible={isVisible.type}
        onCancel={() => setIsVisible({ type: false })}
        footer={null}
        width="45%"
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
            <Col span={10}>
              <Form.Item
                name="productname"
                label="Tên sản phẩm"
                rules={[{ required: true }]}
              >
                <Input disabled />
              </Form.Item>
              <Form.Item name="price" label="Giá" rules={[{ required: true }]}>
                <Input disabled />
              </Form.Item>
              <Form.Item
                name="quantity"
                label="Số lượng còn lại"
                rules={[{ required: true }]}
              >
                <Input disabled />
              </Form.Item>
              <Form.Item
                name="amount"
                label="Mua với số lượng"
                rules={[{ required: true }]}
              >
                <InputNumber />
              </Form.Item>
            </Col>
            <Col span={14} className="current-option">
              <div className="title">
                <span>Thuộc tính đang chọn</span>
              </div>
              <div className="">
                <Tree
                  showLine={true}
                  defaultExpandAll
                  // onSelect={onSelect}
                  treeData={listProductOptionTree}
                />
              </div>
            </Col>
          </Row>

          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 9 }}>
            <>
              <Button
                loading={loading}
                type="primary"
                htmlType="submit"
                style={{ marginTop: "30px" }}
              >
                Thêm vào hóa đơn
              </Button>
            </>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default AddProductModal;
