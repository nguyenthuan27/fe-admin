import { Button, Form, Input, InputNumber, Table } from "antd";
import React, { useContext, useEffect, useRef, useState } from "react";
import AddProductModal from "./addProductModal";
const EditableContext = React.createContext(null);

const TableVariant = (props) => {
  const { dataProductVariant, setDataProductVariant } = props;
  const [isVisible, setIsVisible] = useState({
    type: false,
  });
  const defaultColumns = [
    {
      title: "Mã sản phẩm",
      dataIndex: "skuId",
    },
    {
      title: "Sản phẩm",
      dataIndex: "name",
    },
    {
      title: "Số lượng còn lại",
      dataIndex: "quantity",
    },
    {
      title: "Giá",
      dataIndex: "price",
    },
    {
      title: "Action",
      render: (text, record) => {
        return (
          <Button
            type="primary"
            onClick={() =>
              setIsVisible({
                type: true,
                id: record.id,
              })
            }
          >
            View
          </Button>
        );
      },
    },
  ];

  return (
    <div>
      <Table
        pagination={{
          pageSize: 5,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
        }}
        bordered
        dataSource={dataProductVariant}
        columns={defaultColumns}
        title={() => "Sản phẩm"}
        footer={() => "Footer"}
      />
      <AddProductModal setIsVisible={setIsVisible} isVisible={isVisible} />
    </div>
  );
};

export default TableVariant;
