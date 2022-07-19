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
  getListBill: async () => {
    const res = await customAxios({
      method: "get",
      url: `${serverEndpoint}/shoeswear/bill/list`,
    });
    return res.data;
  },
  updateBill: async (data) => {
    const res = await customAxios({
      method: "post",
      url: `${serverEndpoint}/shoeswear/bill/update`,
      data: data,
    });
    return res.data;
  },
  updateStatusBill: async (data) => {
    const res = await customAxios({
      method: "post",
      url: `${serverEndpoint}/shoeswear/bill/command`,
      data: data,
    });
    return res.data;
  },
  updateBillById: async (data) => {
    const res = await customAxios({
      method: "post",
      url: `${serverEndpoint}/shoeswear/bill/update`,
      data: data,
    });
    return res.data;
  },
};
