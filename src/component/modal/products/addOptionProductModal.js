import { Button, Col, Modal, Row, Tree } from "antd";
import { useEffect, useState } from "react";
import "./style.scss";
import API from "../../../api/manage";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import toast, { Toaster } from "react-hot-toast";

const AddOptionProductModal = (props) => {
  const { isOpenModal, setIsOpenModal, listProduct } = props;
  const [loading, setLoading] = useState(false);
  const [listOptions, setListOptions] = useState([]);
  const [listProductOptions, setListProductOptions] = useState([]);
  const [listOptionTree, setListOptionTree] = useState([]);
  const [listProductOptionTree, setListProductOptionTree] = useState([]);
  const handleCancel = () => {
    setIsOpenModal({
      type: false,
    });
  };
  const handleOk = () => {
    setIsOpenModal({
      type: false,
    });
  };

  const getOptions = async () => {
    const data = await API.getListOptionProduct();
    setLoading(true);
    const listOption = data.result.filter((item) => item.status == true);
    setListOptions(listOption);
    const list = listOption.map((item) => {
      return {
        title: <div className="title-tree">{item.optionName}</div>,
        key: item.id,
        children: item.optionValueList.map((value, index) => {
          return {
            title: (
              <div className="tree-item" key={index}>
                <div className="tree-name">{`${value.optionValueName}`}</div>
                <div
                  style={
                    item.optionName === "Color"
                      ? {
                          background: `${value.optionValueName}`,
                          width: "30px",
                          height: "30px",
                          borderRadius: "50%",
                          border: "2px solid #ccc",
                        }
                      : {}
                  }
                ></div>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() =>
                    addItemForProduct(value.optionId + "-" + value.id)
                  }
                >
                  Chọn
                </Button>
              </div>
            ),
            key: value.optionId + "-" + value.id,
          };
        }),
      };
    });
    setListOptionTree(list);
    setLoading(false);
  };

  const getDetailProduct = (data) => {
    const product = listProduct.find(
      (item) => item.productid === isOpenModal.id
    );
    setListProductOptions(product?.list?.[0]?.data);
    let listOption = product?.list?.[0]?.data;
    if (data.length > 0) {
      listOption = data;
    }
    const optionProduct = listOption?.map((item) => {
      return {
        title: <div className="title-tree">{item.option_name}</div>,
        key: item.option_id,
        children: item?.datadetail?.map((value, index) => {
          return {
            title: (
              <div className="tree-item" key={index}>
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
                <Button
                  type="primary"
                  onClick={() =>
                    removeItemForProduct(
                      item.option_id + "-" + value.option_value_id,
                      data
                    )
                  }
                >
                  <DeleteOutlined />
                </Button>
              </div>
            ),
            key: value.option_value_id + "-" + item.option_id,
          };
        }),
      };
    });
    setListProductOptionTree(optionProduct);
  };

  const addItemForProduct = async (value) => {
    const product = listProduct.find(
      (item) => item.productid === isOpenModal.id
    );
    let listProductOption = product?.list?.[0]?.data || [];
    const data = await API.getListOptionProduct();
    const listOption = data.result.filter((item) => item.status == true);
    const option = listOption?.find((item) => item.id == value.slice(0, 1));
    const optionValue = option?.optionValueList?.find(
      (item) => item.id == value.slice(2, 8)
    );
    const optionHandle = listProductOption.find(
      (item) => item.option_id == value.slice(0, 1)
    );
    const optionActive = optionHandle?.datadetail?.find(
      (item) => item.option_value_id == optionValue.id
    );
    const optionActiveById = listProductOption?.find(
      (item) => item.option_id == value.slice(0, 1)
    );
    if (!optionHandle) {
      listProductOption.push({
        datadetail: [
          {
            option_value_id: Number(optionValue.id),
            option_value_name: optionValue.optionValueName,
          },
        ],
        option_id: Number(value.slice(0, 1)),
        option_name: option.optionName,
      });
      toast.success("Thêm thuộc tính sản phẩm thành công");
    }

    if (!optionActive && optionHandle) {
      optionActiveById.datadetail.push({
        option_value_id: optionValue.id,
        option_value_name: optionValue.optionValueName,
      });
      toast.success("Thêm thuộc tính sản phẩm thành công");
    } else if (optionHandle) {
      toast.error("Thuộc tính này đã tồn tại trong sản phẩm");
    }
    getDetailProduct(listProductOption);
  };

  const removeItemForProduct = (value, data) => {
    console.log(value, data);

    const product = listProduct.find(
      (item) => item.productid === isOpenModal.id
    );
    let listProductOption = product?.list?.[0]?.data || [];
    if (data.length > 0) {
      listProductOption = data;
    }
    const optionHandle = listProductOption.find(
      (item) => item.option_id == value.slice(0, 1)
    );

    const optionRemove = optionHandle?.datadetail?.find(
      (item) => item.option_value_id == value.slice(2, 8)
    );
    let options = listProductOption.find((item) => {
      return item.option_id == value.slice(0, 1);
    });
    listProductOption = listProductOption.filter(
      (item) => item.option_id != value.slice(0, 1)
    );
    console.log(options);
    let optionAfterRemove =
      optionHandle?.datadetail?.filter(
        (item) => item.option_value_id != optionRemove.option_value_id
      ) || [];
    listProductOption.push({
      datadetail: optionAfterRemove,
      option_id: options.option_id,
      option_name: options.option_name,
    });
    getDetailProduct(listProductOption);
    console.log("listProductOption", listProductOption);
  };
  useEffect(() => {
    let listOption = [];
    getOptions();
    getDetailProduct(listOption);
  }, [isOpenModal.id]);

  return (
    <>
      <Modal
        title="Thuộc tính cho sản phẩm"
        visible={isOpenModal.type}
        onOk={handleOk}
        onCancel={handleCancel}
        width={900}
      >
        <Row className="option-modal">
          <Col span={12} className="list-option">
            <div className="title">
              <span>Danh sách thuộc tính</span>
            </div>
            <div className="">
              <Tree
                loading={loading}
                showLine={true}
                // defaultExpandAll
                // onSelect={onSelect}
                treeData={listOptionTree}
              />
            </div>
          </Col>
          <Col span={12} className="current-option">
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
      </Modal>
    </>
  );
};
export default AddOptionProductModal;
