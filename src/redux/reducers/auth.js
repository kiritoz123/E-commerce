import * as actions from "../actions/actionTypes";
import {
  updateProfileCustomerCreator,
  addAddressCustomerCreator,
  updateProfileStoreCreator,
} from "../actions/auth";

const initialState = {
  user: {},
  errMsg: "",
  status: {},
  isLogin: false,
  isPending: false,
  isFulfilled: false,
  isRejected: false,

  statusUpdateCustomer: null,
  errorUpdateCustomer: undefined,
  isUpdateCustomerPending: false,
  isUpdateCustomerFulFilled: false,
  isUpdateCustomerRejected: false,

  statusAddAddress: null,
  errorAddAddress: undefined,
  isAddAddressPending: false,
  isAddAddressFulFilled: false,
  isAddAddressRejected: false,

  statusUpdateStore: null,
  errorUpdateStore: undefined,
  isUpdateStorePending: false,
  isUpdateStoreFulFilled: false,
  isUpdateStoreRejected: false,
};

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.AUTH_RESET_PASSWORD + actions.PENDING:
      return {
        ...state,
        isPending: true,
      };
    case actions.AUTH_RESET_PASSWORD + actions.REJECTED:
      return {
        ...state,
        isRejected: true,
        user: payload,
        isPending: false,
      };
    case actions.AUTH_RESET_PASSWORD + actions.FULFILLED:
      if (payload.data.success === false) {
        // console.log('kambing', payload.data.data)
        return {
          ...state,
          status: payload.data.status,
          errMsg: payload.data.error.msg,
        };
      } else {
        return {
          ...state,
          isFulfilled: true,
          isPending: false,
          user: payload.data.data,
          errMsg: "",
          status: payload.data.status,
          isRejected: false,
          isLogin: true,
        };
      }
    case actions.AUTH_RESET_FULLFILED + actions.PENDING:
      return {
        ...state,
        isPending: true,
      };
    case actions.AUTH_RESET_FULLFILED + actions.REJECTED:
      return {
        ...state,
        isRejected: true,
        user: payload,
        isPending: false,
      };
    case actions.AUTH_RESET_FULLFILED + actions.FULFILLED:
      if (payload.data.success === false) {
        // console.log('kambing', payload.data.data)
        return {
          ...state,
          status: payload.data.status,
          errMsg: payload.data.error.msg,
        };
      } else {
        return {
          ...state,
          isFulfilled: true,
          isPending: false,
          user: payload.data.data,
          errMsg: "",
          status: payload.data.status,
          isRejected: false,
          isLogin: true,
        };
      }

    case actions.AUTH_LOGIN_USER + actions.PENDING:
      return {
        ...state,
        isPending: true,
      };
    case actions.AUTH_LOGIN_USER + actions.REJECTED:
      return {
        ...state,
        isRejected: true,
        user: payload,
        isPending: false,
      };
    case actions.AUTH_LOGIN_USER + actions.FULFILLED:
      if (payload.data.success === false) {
        return {
          ...state,
          status: payload.data.status,
          errMsg: payload.data.error.msg,
        };
      }
      return {
        ...state,
        isFulfilled: true,
        isPending: false,
        user: payload.data.data,
        errMsg: "",
        status: payload.data.status,
        isRejected: false,
        isLogin: true,
      };
    case actions.AUTH_REGISTER_USER + actions.PENDING:
      return {
        ...state,
        isPending: true,
      };
    case actions.AUTH_REGISTER_USER + actions.REJECTED:
      return {
        ...state,
        isRejected: true,
        user: payload,
        isPending: false,
      };
    case actions.AUTH_REGISTER_USER + actions.FULFILLED:
      if (payload.data.success === false) {
        return {
          ...state,
          status: payload.data.status,
          errMsg: payload.data.error.msg,
        };
      }
      return {
        ...state,
        isFulfilled: true,
        isPending: false,
        user: payload.data.data,
        errMsg: "",
        status: payload.data.status,
        isRejected: false,
        isLogin: true,
      };
    case actions.AUTH_CLEAR_STATE:
      return {
        user: {},
        errMsg: "",
        status: {},
        isLogin: false,
        isPending: false,
        isFulfilled: false,
        isRejected: false,
      };
    case actions.AUTH_LOGOUT_USER:
      return {
        user: {},
        isLogin: false,
        isPending: false,
        isFulfilled: false,
        isRejected: false,
      };

    case String(updateProfileCustomerCreator.pending):
      return {
        ...state,
        isUpdateCustomerPending: true,
      };
    case String(updateProfileCustomerCreator.fulfilled): {
      let status;
      let err;
      if (payload.status === 200) {
        status = 200;
        err = undefined;
      } else {
        status = 500;
        err = payload.error;
      }
      return {
        ...state,
        user: { ...state.user, ...payload.data },
        statusUpdateCustomer: status,
        errorUpdateCustomer: err,
        isUpdateCustomerPending: false,
        isUpdateCustomerFulFilled: true,
        isUpdateCustomerRejected: false,
      };
    }
    case String(updateProfileCustomerCreator.rejected):
      return {
        ...state,
        statusUpdateCustomer: 500,
        errorUpdateCustomer: payload,
        isUpdateCustomerRejected: true,
        isUpdateCustomerPending: false,
        isUpdateCustomerFulFilled: false,
      };

    case String(addAddressCustomerCreator.pending):
      return {
        ...state,
        isAddAddressPending: true,
      };
    case String(addAddressCustomerCreator.fulfilled): {
      let status;
      let err;
      if (payload.status === 200) {
        status = 200;
        err = undefined;
      } else {
        status = 500;
        err = payload.error;
      }
      return {
        ...state,
        user: { ...state.user, ...payload.data },
        statusAddAddress: status,
        errorAddAddress: undefined,
        isAddAddressPending: false,
        isAddAddressFulFilled: true,
        isAddAddressRejected: false,
      };
    }
    case String(addAddressCustomerCreator.rejected):
      return {
        ...state,
        statusAddAddress: 500,
        errorAddAddress: payload,
        isAddAddressRejected: true,
        isAddAddressPending: false,
        isAddAddressFulFilled: false,
      };

    case String(updateProfileStoreCreator.pending):
      return {
        ...state,
        isUpdateStorePending: true,
      };
    case String(updateProfileStoreCreator.fulfilled): {
      let status;
      let err;
      if (payload.status === 200) {
        status = 200;
        err = undefined;
      } else {
        status = 500;
        err = payload.error;
      }
      return {
        ...state,
        user: { ...state.user, ...payload.data },
        statusUpdateStore: status,
        errorUpdateStore: err,
        isUpdateStorePending: false,
        isUpdateStoreFulFilled: true,
        isUpdateStoreRejected: false,
      };
    }
    case String(updateProfileStoreCreator.rejected):
      return {
        ...state,
        statusUpdateStore: 500,
        errorUpdateStore: payload,
        isUpdateStoreRejected: true,
        isUpdateStorePending: false,
        isUpdateStoreFulFilled: false,
      };
    case "RESET_STATUS_UPDATE":
      return {
        ...state,
        statusUpdateStore: null,
        statusUpdateCustomer: null,
        statusAddAddress: null,
      };
    default:
      return state;
  }
};

export default authReducer;
