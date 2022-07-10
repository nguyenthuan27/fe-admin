import { Button, Col, Modal, Row, Tree } from "antd";
import { useEffect, useState } from "react";
import "./style.scss";
import API from "../../../api/manage";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import toast, { Toaster } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { addItem, removeItem, clear, getItem } from "../../../redux/option";
import { store } from "../../../redux/store";

const AddOptionProductModal = (props) => {
  const {
    isOpenModal,
    setIsOpenModal,
    productId,
    listOptionValue,
    setListOptionValue,
    loadingOption,
  } = props;
  let listOptionModal = listOptionValue;
  const [loading, setLoading] = useState(false);
  const [listOptionTree, setListOptionTree] = useState([]);
  const [listProductOptionTree, setListProductOptionTree] = useState([]);
  const handleCancel = () => {
    setIsOpenModal({
      type: false,
    });
    setListOptionValue([]);
  };

  const getOptions = async () => {
    const data = await API.getListOptionProduct();
    setLoading(true);
    const listOption = data.result.filter((item) => item.status == true);
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

  const getDetailProduct = () => {
    const optionProduct = listOptionModal?.map((item, index) => {
      return {
        title: <div className="title-tree">{item.optionname}</div>,
        key: item.id,
        children: [
          {
            title: (
              <div className="tree-item" key={index}>
                <div className="tree-name">{`${item.optionvaluename}`}</div>
                <div
                  style={
                    item.optionName === "Color"
                      ? {
                          background: `${item.optionvaluename}`,
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
                      item.optionid + "-" + item.optionvalueid
                    )
                  }
                >
                  <DeleteOutlined />
                </Button>
              </div>
            ),
            key: item.optionid + "-" + item.optionvalueid,
          },
        ],
      };
    });
    setListProductOptionTree(optionProduct);
  };

  const addItemForProduct = async (value) => {
    const optionId = value.split("-");
    const data = await API.getListOptionProduct();
    const listOption = data.result.filter((item) => item.status == true);
    const option = listOption?.find((item) => item.id == optionId[0]);
    const optionValue = option?.optionValueList?.find(
      (item) => item.id == optionId[1]
    );
    const checkOption = listOptionModal?.find(
      (item) => item.optionid == optionId[0]
    );
    if (!checkOption) {
      listOptionModal.push({
        id: option.id,
        optionid: optionValue.optionId,
        optionname: option.optionName,
        optionvalueid: optionValue.id,
        optionvaluename: optionValue.optionValueName,
        productoptionid: 18,
        status: true,
        variantid: isOpenModal.variantId,
      });
      toast.success("Thêm thuộc tính sản phẩm thành công");
    } else {
      toast.error("Sản phẩm đã có thuộc tính này");
    }
    getDetailProduct();
  };

  const removeItemForProduct = (value) => {
    const optionHandle = value.split("-");
    listOptionModal = listOptionModal?.filter((item) => {
      return item.optionid != optionHandle[0];
    });
    getDetailProduct();
    toast.success("Bạn đã xóa thuộc tính của sản phẩm này");
  };

  const handleOk = async () => {
    const listVariantValue = listOptionModal?.map((item) => {
      return {
        optionId: item.optionid,
        optionValueId: item.optionvalueid,
      };
    });
    let body = {
      variantId: isOpenModal.variantId,
      listVariantValue: listVariantValue,
    };
    const updateOptionValue = await API.variantValueUpdateList(body);
    if (updateOptionValue.message === "SUCCESS") {
      toast.success(updateOptionValue.message);
    } else {
      toast.error(updateOptionValue.message);
    }
    setIsOpenModal({
      type: false,
    });
  };

  useEffect(() => {
    getDetailProduct(listOptionValue);
    getOptions();
  }, [listOptionValue]);

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
