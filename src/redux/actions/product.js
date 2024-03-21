import * as actions from "./actionTypes";
import * as api from "../../utils/reqData";
import { createAsyncAction } from "redux-promise-middleware-actions";

export const transaction = (data) => {
  return {
    type: actions.INSERT_TRANSACTION,
    payload: api.doTransaction(data),
  };
};

export const fetchAllProduct = (category, name) => {
  return {
    type: actions.FETCH_ALL_PRODUCT,
    payload: api.fetchAllProduct(category, name),
  };
};

export const getProductById = (id) => {
  return {
    type: actions.GET_PRODUCT_BY_ID,
    payload: api.getProductById(id),
  };
};

export const getProductBySellerIdCreator = createAsyncAction(
  "GETPRODUCT_BY_SELLER_ID",
  async (id) => {
    const res = await api.getProductBySellerId(id);
    return res.data;
  }
);
// export const addToCart = (id, name, brand, qty, price, images) => {
//    return {
//       type: actions.ADD_TO_CART,
//       payload: {
//          id, name, brand, qty, price, images
//       },
//    };
// };

export const addToCart = (data) => {
  return {
    type: actions.ADD_TO_CART,
    payload: data,
  };
};

// export const addToCheckout = (customer_id, seller_id, cart, address,) => {
//    return {
//       type: actions.ADD_TO_CHECKOUT,
//       payload: {
//          customer_id, seller_id, cart, address,
//       },
//    };
// };

export const addToCheckout = (data) => {
  return {
    type: actions.ADD_TO_CHECKOUT,
    payload: data.sendData,
  };
};

export const increaseQuantity = (id) => {
  return {
    type: actions.QUANTITY_INCREASED,
    payload: {
      id: id,
    },
  };
};

export const decreaseQuantity = (id) => {
  return {
    type: actions.QUANTITY_DECREASED,
    payload: {
      id: id,
    },
  };
};

export const clearCart = () => {
  return {
    type: actions.CLEAR_CART,
  };
};

export const clearCheckout = () => {
  return {
    type: actions.CLEAR_CHECKOUT,
  };
};

export const addPaymentMethod = (data) => {
  return {
    type: actions.ADD_PAYMENT_METHOD,
    payload: {
      data: data,
    },
  };
};

export const addProductCreator = createAsyncAction(
  "ADD_PRODUCT",
  async (body) => {
    const res = await api.addProduct(body);
    return res.data;
  }
);

export const getOrderCustomerCreator = createAsyncAction(
  "GET_ORDER_CUSTOMER",
  async (id) => {
    const res = await api.getOrderCustomer(id);
    return res.data;
  }
);

export const getOrderSellerCreator = createAsyncAction(
  "GET_ORDER_SELLER",
  async (id) => {
    const res = await api.getOrderSeller(id);
    return res.data;
  }
);

export const resetStatusProduct = () => {
  return {
    type: "RESET_STATUS_PRODUCT",
  };
};
