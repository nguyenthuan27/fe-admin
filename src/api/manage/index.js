import { customAxios } from "../../utils/custom-axios";
const serverEndpoint = process.env.REACT_APP_API_URL;

export const handleResponse = (res) => {
  const data = res?.data?.data;
  return data;
};

export const handleError = (err) => {
  console.error(err);
  throw err;
};

export default {
  getListVoucher: async () => {
    const res = await customAxios({
      method: "get",
      url: `${serverEndpoint}/shoeswear/voucher/list`,
    });
    return res.data;
  },
  createVoucher: async (data) => {
    /// Param example
    // data = {
    //   voucherName: "Sale 30%",
    //   voucherCode: "30%OFF",
    //   type: "default",
    //   discount: 30,
    //   pointsToReceive: "100",
    //   maximumDiscount: 50000,
    //   paymentType: "ALL",
    //   minimumBill: 300000,
    //   status: true,
    //   note: "voucher giảm giá 30%",
    //   releaseId: 22,
    // };
    const res = await customAxios({
      method: "post",
      data: data,
      url: `${serverEndpoint}/shoeswear/voucher/create`,
    });
    return res.data;
  },
  updateVoucher: async (data) => {
    const res = await customAxios({
      method: "post",
      url: `${serverEndpoint}/shoeswear/voucher/update`,
      data: data,
    });
    return res.data;
  },
  deleteVoucher: async (idVoucher) => {
    const res = await customAxios({
      method: "post",
      url: `${serverEndpoint}/shoeswear/voucher/delete?id=${idVoucher}`,
    });
    return res.data;
  },
  getListVoucherRelease: async () => {
    const res = await customAxios({
      method: "get",
      url: `${serverEndpoint}/shoeswear/voucherRelease/list`,
    });
    return res.data;
  },

  /// Product
  getListProduct: async () => {
    const res = await customAxios({
      method: "get",
      url: `${serverEndpoint}/shoeswear/product/getlistproductall`,
    });
    return res.data;
  },
  // Option Product
  getListOptionProduct: async () => {
    const res = await customAxios({
      method: "get",
      url: `${serverEndpoint}/shoeswear/option/get`,
    });
    return res.data;
  },

  createOptionProduct: async (data) => {
    const res = await customAxios({
      method: "post",
      url: `${serverEndpoint}/shoeswear/option/create`,
      data: data,
    });
    return res.data;
  },
  updateOptionProduct: async (data) => {
    const res = await customAxios({
      method: "put",
      url: `${serverEndpoint}/shoeswear/option/update`,
      data: data,
    });
    return res.data;
  },

  updateOptionValueProduct: async (data) => {
    const res = await customAxios({
      method: "put",
      url: `${serverEndpoint}/shoeswear/optionvalue/update`,
      data: data,
    });
    return res.data;
  },

  createOptionValueProduct: async (data) => {
    const res = await customAxios({
      method: "post",
      url: `${serverEndpoint}/shoeswear/optionvalue/create`,
      data: data,
    });
    return res.data;
  },
};
