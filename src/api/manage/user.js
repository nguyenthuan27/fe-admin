import { customAxios } from '../../utils/custom-axios';
const serverEndpoint = process.env.REACT_APP_API_URL;

// export const handleResponse = (res) => {
//     const data = res?.data?.data;
//     return data;
// };
export const handleResponse = (res) => {
    const data = res?.data?.data;
    return data;
};

export const handleError = (err) => {
    console.error(err);
    throw err;
};

export default {
    getListUser: async () => {
        const res = await customAxios({
            method: "get",
            url: `${serverEndpoint}/shoeswear/user/list`,
        });
        return res.data;
    },
    createUser: async (data) => {
        const res = await customAxios({
            method: "post",
            data: data,
            url: `${serverEndpoint}/shoeswear/user/create`,
        });
        return res.data;
    },
    updateUser: async (data) => {
        const res = await customAxios({
            method: "post",
            data: data,
            url: `${serverEndpoint}/shoeswear/user/update`,
        });
        return res.data;
    },
    deleteUser: async (idUser) => {
        const res = await customAxios({
            method: "post",
            url: `${serverEndpoint}/shoeswear/user/delete?id=${idUser}`
        })
        return res.data;
    },
};