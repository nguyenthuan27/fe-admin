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
const AddProductModal = (props) => {
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
  const onFinish = (value) => {
    
  };
  const getDetailProduct = async () => {
    if (!isVisible.id) return;
    const data = await API.getProductVariantById(isVisible.id);
    let result = data.result.listproductall[0];
    form.setFieldsValue({
      price: result.fromprice,
      productname: result.productname,
    });
    const listOptionModal = data.result.listproductall[0]?.list[0].data || [];
    console.log(listOptionModal);
    const optionProduct = listOptionModal?.map((item, index) => {
      return {
        title: <div className="title-tree">{item.option_name}</div>,
        key: item.option_id,
        children: item.datadetail.map((value, index) => {
          return {
            title: (
              <div
                className="tree-item"
                key={value.option_value_id + item.option_id}
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
            key: value.optionId + "-" + value.id,
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
        title="Thêm product"
        centered
        visible={isVisible.type}
        onCancel={() => setIsVisible({ type: false, action: isVisible.action })}
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
                label="productname"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="price"
                label="price"
                rules={[{ required: true }]}
              >
                <Input />
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
