import * as actions from "./actionTypes";
import { createAsyncAction } from "redux-promise-middleware-actions";
import {
  authLoginCustomer,
  authLoginSeller,
  authRegisterCustomer,
  authRegisterSeller,
  updateProfileCustomer,
  addAddressCustomer,
  resetPasswordCustomer,
  sendEmailCustomer,
  updateProfileStore,
  resetPasswordSeller,
  sendEmailSeller,
} from "../../utils/reqData";

export const authLoginCustomerCreator = (data) => {
  return {
    type: actions.AUTH_LOGIN_USER,
    payload: authLoginCustomer(data),
  };
};
export const authLoginSellerCreator = (data) => {
  return {
    type: actions.AUTH_LOGIN_USER,
    payload: authLoginSeller(data),
  };
};
export const authRegisterCustomerCreator = (data) => {
  return {
    type: actions.AUTH_REGISTER_USER,
    payload: authRegisterCustomer(data),
  };
};
export const authRegisterSellerCreator = (data) => {
  return {
    type: actions.AUTH_REGISTER_USER,
    payload: authRegisterSeller(data),
  };
};

export const authResetPasswordCustomer = (data) => {
  return {
    type: actions.AUTH_RESET_PASSWORD,
    payload: sendEmailCustomer(data),
  };
};

export const authResetPasswordSeller = (data) => {
  return {
    type: actions.AUTH_RESET_PASSWORD,
    payload: sendEmailSeller(data),
  };
};

export const authResetPasswordCustomerFullf = (data) => {
  return {
    type: actions.AUTH_RESET_FULLFILED,
    payload: resetPasswordCustomer(data),
  };
};

export const authResetPasswordSellerFullf = (data) => {
  return {
    type: actions.AUTH_RESET_FULLFILED,
    payload: resetPasswordSeller(data),
  };
};

export const authClearState = () => {
  return {
    type: actions.AUTH_CLEAR_STATE,
  };
};

export const updateProfileCustomerCreator = createAsyncAction(
  "UPDATECUSTOMER",
  async (id, body) => {
    const res = await updateProfileCustomer(id, body);
    return res.data;
  }
);
export const updateProfileStoreCreator = createAsyncAction(
  "UPDATESTORE",
  async (id, body) => {
    const res = await updateProfileStore(id, body);
    return res.data;
  }
);
export const addAddressCustomerCreator = createAsyncAction(
  "ADDADDRESS",
  async (id, body) => {
    const res = await addAddressCustomer(id, body);
    return res.data;
  }
);

export const resetStatusUpdate = () => {
  return {
    type: "RESET_STATUS_UPDATE",
  };
};
