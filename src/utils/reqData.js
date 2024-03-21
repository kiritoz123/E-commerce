import Axios from "axios";
import { API_URL } from "./environment";

export const authLoginCustomer = (data) => {
  return Axios.post(`${API_URL}/auth/login/customer`, data);
};

export const authLoginSeller = (data) => {
  return Axios.post(`${API_URL}/auth/login/seller`, data);
};

export const authRegisterCustomer = (data) => {
  return Axios.post(`${API_URL}/auth/register/customer`, data);
};

export const authRegisterSeller = (data) => {
  return Axios.post(`${API_URL}/auth/register/seller`, data);
};

export const updateProfileCustomer = (id, body) => {
  return Axios.patch(`${API_URL}/user/customer/${id}`, body, {
    headers: {
      "content-type": "multipart/form-data",
      contentType: false,
      mimeType: "multipart/form-data",
      "cache-control": "no-cache",
      accept: "application/json",
    },
  });
};

export const addAddressCustomer = (id, data) => {
  return Axios.patch(`${API_URL}/user/customer-address/${id}`, data);
};

export const addProduct = (body) => {
  return Axios.post(`${API_URL}/product`, body, {
    headers: {
      "content-type": "multipart/form-data",
      contentType: false,
      mimeType: "multipart/form-data",
      "cache-control": "no-cache",
      accept: "application/json",
    },
  });
};

export const doTransaction = (data) => {
  return Axios.post(`${API_URL}/order`, data);
};

export const fetchAllProduct = (category, name) => {
  if (category && name) {
    return Axios.get(
      `${API_URL}/product?name=${name}&brand=&category=${category}&page=1&limit=15`
    );
  } else if (category) {
    return Axios.get(
      `${API_URL}/product?name=&brand=&category=${category}&page=1&limit=15`
    );
  } else if (name) {
    return Axios.get(
      `${API_URL}/product?name=${name}&brand=${name}&category=&page=1&limit=15`
    );
  } else {
    return Axios.get(
      `${API_URL}/product?name=&brand=&category=&page=1&limit=15`
    );
  }
};

export const getProductById = (id) => {
  return Axios.get(`${API_URL}/product/${id}`);
};

export const getProductBySellerId = (id) => {
  return Axios.get(`${API_URL}/product/seller/${id}`);
};

export const syncFromServer = (id) => {
  return Axios.get(`${API_URL}/chat/${id}`);
};

export const syncWithLocal = (data) => {
  return Axios.patch(`${API_URL}/chat/`, data);
};

export const sendEmailCustomer = (data) => {
  return Axios.post(`${API_URL}/auth/sendemailcustomer`, data);
};

export const sendEmailSeller = (data) => {
  return Axios.post(`http://localhost:8000/auth/sendemailseller`, data);
};

export const resetPasswordCustomer = (data) => {
  return Axios.post(`${API_URL}/auth/resetpasscustomer`, data);
};

export const updateProfileStore = (id, body) => {
  return Axios.patch(`${API_URL}/user/seller/${id}`, body, {
    headers: {
      "content-type": "multipart/form-data",
      contentType: false,
      mimeType: "multipart/form-data",
      "cache-control": "no-cache",
      accept: "application/json",
    },
  });
};
export const getOrderCustomer = (id) => {
  return Axios.get(`${API_URL}/order/customer/${id}`);
};
export const getOrderSeller = (id) => {
  return Axios.get(`${API_URL}/order/seller/${id}`);
};

export const resetPasswordSeller = (data) => {
  return Axios.post(`http://localhost:8000/auth/resetpassseller`, data);
};
