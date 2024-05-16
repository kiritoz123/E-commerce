
import * as actions from "../actions/actionTypes";
import {
  getSellerByAdminIdCreator,
  getCustomerByAdminIdCreator,
  getProductByAdminIdCreator,
  getProductBySellerIdCreator,
  addProductCreator,
  getOrderCustomerCreator,
  getOrderSellerCreator,
  getOrderAdminCreator,
} from "../actions/product";

// let invoice = Math.floor(Math.random() * 100001) + 1;
const initialState = {
  msg: "",
  status: "",
  product: [],
  carts: [],
  checkout: {
    id: "",
    customer_id: "",
    seller_id: "",
    amount: "",
    payment_method: "",
    address: "",
    products: [],
  },
  productDetail: {},
  isPending: false,
  isFulfilled: false,
  isRejected: false,

  statusGetProdBySelId: null,
  dataGetProdBySelId: null,
  errorGetProdBySelId: undefined,
  isGetProdBySelIdPending: false,
  isGetProdBySelIdFulFilled: false,
  isGetProdBySelIdRejected: false,

  statusGetProdByAdminId: null,
  dataGetProdByAdminId: null,
  errorGetProdByAdminId: undefined,
  isGetProdByAdminIdPending: false,
  isGetProdByAdminIdFulFilled: false,
  isGetProdByAdminIdRejected: false,

  statusGetCusByAdminId: null,
  dataGetCusByAdminId: null,
  errorGetCusByAdminId: undefined,
  isGetCusByAdminIdPending: false,
  isGetCusByAdminIdFulFilled: false,
  isGetCusByAdminIdRejected: false,

  statusGetSelByAdminId: null,
  dataGetSelByAdminId: null,
  errorGetSelByAdminId: undefined,
  isGetSelByAdminIdPending: false,
  isGetSelByAdminIdFulFilled: false,
  isGetSelByAdminIdRejected: false,

  statusAddProd: null,
  dataAddProd: null,
  errorAddProd: undefined,
  isAddProdPending: false,
  isAddProdFulFilled: false,
  isAddProdRejected: false,

  statusGetOrderCust: null,
  dataGetOrderCust: null,
  errorGetOrderCust: undefined,
  isGetOrderCustPending: false,
  isGetOrderCustFulFilled: false,
  isGetOrderCustRejected: false,

  statusGetOrderSell: null,
  dataGetOrderSell: null,
  errorGetOrderSell: undefined,
  isGetOrderSellPending: false,
  isGetOrderSellFulFilled: false,
  isGetOrderSellRejected: false,

  statusGetOrderAdmin: null,
  dataGetOrderAdmin: null,
  errorGetOrderAdmin: undefined,
  isGetOrderAdminPending: false,
  isGetOrderAdminFulFilled: false,
  isGetOrderAdminRejected: false,
};

const productReducer = (state = initialState, { type, payload }) => {
  let newCart = [...state.carts];
  switch (type) {
    case actions.GET_PRODUCT_BY_ID + actions.PENDING:
      return {
        ...state,
        isPending: true,
      };
    case actions.GET_PRODUCT_BY_ID + actions.REJECTED:
      return {
        ...state,
        isPending: false,
        isRejected: true,
        isFulfilled: false,
        status: payload.data.status,
        // msg: payload.data.data.msg,
      };
    case actions.GET_PRODUCT_BY_ID + actions.FULFILLED:
      return {
        ...state,
        productDetail: payload.data.data,
        isPending: false,
        isRejected: true,
        isFulfilled: true,
        // status: payload.data.data.msg,
      };
    case actions.FETCH_ALL_PRODUCT + actions.PENDING:
      return {
        ...state,
        isPending: true,
      };
    case actions.FETCH_ALL_PRODUCT + actions.REJECTED:
      return {
        ...state,
        isPending: false,
        isRejected: true,
        isFulfilled: false,
        status: payload.data.status,
        // msg: payload.data.data.msg,
      };
    case actions.FETCH_ALL_PRODUCT + actions.FULFILLED:
      if (payload.data.status === 200) {
        return {
          ...state,
          isPending: false,
          isFulfilled: true,
          product: payload.data.data,
          // status: payload.data.data.msg,
        };
      } else {
        return {
          ...state,
          isPending: false,
          isRejected: true,
          isFulfilled: true,
          // status: payload.data.data.msg,
        };
      }
    case actions.ADD_PAYMENT_METHOD:
      return {
        ...state,
        checkout: {
          ...state.checkout,
          payment_method: payload.data,
        },
      };
    case actions.ADD_TO_CART:
      return {
        ...state,
        carts: [...state.carts, payload],
      };
    case actions.CLEAR_CART:
      return {
        ...state,
        carts: [],
      };
    case actions.ADD_TO_CHECKOUT:
      return {
        ...state,
        checkout: {
          ...state.checkout,
          id: payload.id,
          customer_id: payload.customer_id,
          seller_id: payload.seller_id,
          amount: payload.amount,
          payment_method: "",
          address: payload.address,
          products: payload.products,
        },
      };
    case actions.CLEAR_CHECKOUT:
      return {
        ...state,
        checkout: {
          id: "",
          customer_id: "",
          seller_id: "",
          amount: "",
          payment_method: "",
          address: "",
          products: [],
        },
      };
    case actions.QUANTITY_INCREASED:
      const indexQtyInc = state.carts.findIndex((item) => {
        return payload.id === item.id;
      });
      newCart[indexQtyInc] = {
        ...newCart[indexQtyInc],
        qty: state.carts[indexQtyInc].qty + 1,
      };
      return {
        ...state,
        carts: newCart,
      };
    case actions.QUANTITY_DECREASED:
      const indexQtyDec = state.carts.findIndex((item) => {
        return payload.id === item.id;
      });
      newCart[indexQtyDec] = {
        ...newCart[indexQtyDec],
        qty: state.carts[indexQtyDec].qty - 1,
      };
      if (newCart[indexQtyDec].qty === 0) {
        state.carts.splice(indexQtyDec, 1); //hapus data pada array
        return {
          ...state,
          carts: state.carts,
        };
      } else {
        return {
          ...state,
          carts: newCart,
        };
      }

    case actions.INSERT_TRANSACTION + actions.PENDING:
      return {
        ...state,
        isPending: true,
      };
    case actions.INSERT_TRANSACTION + actions.REJECTED:
      return {
        ...state,
        isPending: false,
        isRejected: true,
        isFulfilled: false,
        status: payload.data.status,
        msg: payload.data.data.msg,
      };
    case actions.INSERT_TRANSACTION + actions.FULFILLED:
      if (payload.data.status === 200) {
        return {
          ...state,
          isPending: false,
          isFulfilled: true,
          // status: payload.data.data.msg,
        };
      } else {
        return {
          ...state,
          isPending: false,
          isRejected: true,
          isFulfilled: true,
          // status: payload.data.data.msg,
        };
      }

    case String(getProductBySellerIdCreator.pending):
      return {
        ...state,
        isGetProdBySelIdPending: true,
      };
    case String(getProductBySellerIdCreator.fulfilled): {
      let status;
      let err;
      let data;
      if (payload.status === 200) {
        status = 200;
        err = undefined;
        data = payload.data;
      } else {
        status = 500;
        err = payload.error;
        data = [];
      }
      return {
        ...state,
        statusGetProdBySelId: status,
        dataGetProdBySelId: data,
        errorGetProdBySelId: err,
        isGetProdBySelIdPending: false,
        isGetProdBySelIdFulFilled: true,
        isGetProdBySelIdRejected: false,
      };
    }
    case String(getProductBySellerIdCreator.rejected):
      return {
        ...state,
        statusGetProdBySelId: 500,
        errorGetProdBySelId: payload,
        isGetProdBySelIdRejected: true,
        isGetProdBySelIdPending: false,
        isGetProdBySelIdFulFilled: false,
      };
    case String(getProductByAdminIdCreator.pending):
        return {
          ...state,
          isGetProdByAdminIdPending: true,
        };
    case String(getProductByAdminIdCreator.fulfilled): {
        let status;
        let err;
        let data;
        if (payload.status === 200) {
          status = 200;
          err = undefined;
          data = payload.data;
        } else {
          status = 500;
          err = payload.error;
          data = [];
        }
        return {
          ...state,
          statusGetProdByAdminId: status,
          dataGetProdByAdminId: data,
          errorGetProdByAdminId: err,
          isGetProdByAdminIdPending: false,
          isGetProdByAdminIdFulFilled: true,
          isGetProdByAdminIdRejected: false,
        };
      }
    case String(getProductByAdminIdCreator.rejected):
        return {
          ...state,
          statusGetProdByAdminId: 500,
          errorGetProdByAdminId: payload,
          isGetProdByAdminIdRejected: true,
          isGetProdByAdminIdPending: false,
          isGetProdByAdminIdFulFilled: false,
        };
    case String(getCustomerByAdminIdCreator.pending):
          return {
            ...state,
            isGetCusByAdminIdPending: true,
          };
   case String(getCustomerByAdminIdCreator.fulfilled): {
          let status;
          let err;
          let data;
          if (payload.status === 200) {
            status = 200;
            err = undefined;
            data = payload.data;
          } else {
            status = 500;
            err = payload.error;
            data = [];
          }
          return {
            ...state,
            statusGetCusByAdminId: status,
            dataGetCusByAdminId: data,
            errorGetCusByAdminId: err,
            isGetCusByAdminIdPending: false,
            isGetCusByAdminIdFulFilled: true,
            isGetCusByAdminIdRejected: false,
          };
        }
      case String(getCustomerByAdminIdCreator.rejected):
          return {
            ...state,
            statusGetCusByAdminId: 500,
            errorGetCusByAdminId: payload,
            isGetCusByAdminIdRejected: true,
            isGetCusByAdminIdPending: false,
            isGetCusByAdminIdFulFilled: false,
          };
          case String(getSellerByAdminIdCreator.pending):
          return {
            ...state,
            isGetSelByAdminIdPending: true,
          };
   case String(getSellerByAdminIdCreator.fulfilled): {
          let status;
          let err;
          let data;
          if (payload.status === 200) {
            status = 200;
            err = undefined;
            data = payload.data;
          } else {
            status = 500;
            err = payload.error;
            data = [];
          }
          return {
            ...state,
            statusGetSelByAdminId: status,
            dataGetSelByAdminId: data,
            errorGetSelByAdminId: err,
            isGetSelByAdminIdPending: false,
            isGetSelByAdminIdFulFilled: true,
            isGetSelByAdminIdRejected: false,
          };
        }
      case String(getSellerByAdminIdCreator.rejected):
          return {
            ...state,
            statusGetSelByAdminId: 500,
            errorGetSelByAdminId: payload,
            isGetSelByAdminIdRejected: true,
            isGetSelByAdminIdPending: false,
            isGetSelByAdminIdFulFilled: false,
          };
    case String(addProductCreator.pending):
      return {
        ...state,
        isAddProdPending: true,
      };
    case String(addProductCreator.fulfilled): {
      let status;
      let err;
      let data;
      if (payload.status === 200) {
        status = 200;
        err = undefined;
        data = payload.data;
      } else {
        status = 500;
        err = payload.error;
        data = [];
      }
      return {
        ...state,
        dataGetProdBySelId: [...state.dataGetProdBySelId, data],
        statusAddProd: status,
        dataAddProd: data,
        errorAddProd: err,
        isAddProdPending: false,
        isAddProdFulFilled: true,
        isAddProdRejected: false,
      };
    }
    case String(addProductCreator.rejected):
      return {
        ...state,
        statusAddProd: 500,
        errorAddProd: payload,
        isAddProdRejected: true,
        isAddProdPending: false,
        isAddProdFulFilled: false,
      };

    case String(getOrderCustomerCreator.pending):
      return {
        ...state,
        isGetOrderCustPending: true,
      };
    case String(getOrderCustomerCreator.fulfilled): {
      let status;
      let err;
      let data;
      if (payload.status === 200) {
        status = 200;
        err = undefined;
        data = payload.data;
      } else {
        status = 500;
        err = payload.error;
        data = null;
      }
      return {
        ...state,
        statusGetOrderCust: status,
        dataGetOrderCust: data,
        errorGetOrderCust: err,
        isGetOrderCustPending: false,
        isGetOrderCustFulFilled: true,
        isGetOrderCustRejected: false,
      };
    }
    case String(getOrderCustomerCreator.rejected):
      return {
        ...state,
        statusGetOrderCust: 500,
        errorGetOrderCust: payload,
        isGetOrderCustRejected: true,
        isGetOrderCustPending: false,
        isGetOrderCustFulFilled: false,
      };

    case String(getOrderSellerCreator.pending):
      return {
        ...state,
        isGetOrderSellPending: true,
      };
    case String(getOrderSellerCreator.fulfilled): {
      let status;
      let err;
      let data;
      if (payload.status === 200) {
        status = 200;
        err = undefined;
        data = payload.data;
      } else {
        status = 500;
        err = payload.error;
        data = null;
      }
      return {
        ...state,
        statusGetOrderSell: status,
        dataGetOrderSell: data,
        errorGetOrderSell: err,
        isGetOrderSellPending: false,
        isGetOrderSellFulFilled: true,
        isGetOrderSellRejected: false,
      };
    }
    case String(getOrderAdminCreator.pending):
      return {
        ...state,
        isGetOrderAdminPending: true,
      };
    case String(getOrderAdminCreator.fulfilled): {
      let status;
      let err;
      let data;
      if (payload.status === 200) {
        status = 200;
        err = undefined;
        data = payload.data;
      } else {
        status = 500;
        err = payload.error;
        data = null;
      }
      return {
        ...state,
        statusGetOrderAdmin: status,
        dataGetOrderAdmin: data,
        errorGetOrderAdmin: err,
        isGetOrderAdminPending: false,
        isGetOrderAdminFulFilled: true,
        isGetOrderAdminRejected: false,
      };
    }
    case String(getOrderSellerCreator.rejected):
      return {
        ...state,
        statusGetOrderAdmin: 500,
        errorGetOrderAdmin: payload,
        isGetOrderAdminRejected: true,
        isGetOrderAdminPending: false,
        isGetOrderAdminFulFilled: false,
      };
    case String(getOrderAdminCreator.rejected):
      return {
        ...state,
        statusGetOrderAdmin: 500,
        errorGetOrderAdmin: payload,
        isGetOrderAdminRejected: true,
        isGetOrderAdminPending: false,
        isGetOrderAdminFulFilled: false,
      };
    case "RESET_STATUS_PRODUCT":
      return {
        ...state,
        statusAddProd: null,
      };
    default:
      return state;
  }
};

export default productReducer;