import { ActionType } from "redux-promise-middleware";

export const AUTH_LOGIN_USER = 'authLoginUser'
export const AUTH_REGISTER_USER = 'authRegisterUser'
export const AUTH_LOGOUT_USER = 'authLogoutUser'
export const AUTH_RESET_PASSWORD = 'authResetPassword'
export const AUTH_RESET_FULLFILED = 'authResetFullfiled'
export const AUTH_CLEAR_STATE = 'authClearState'

export const FETCH_ALL_PRODUCT = "fetchAllProduct";
export const GET_PRODUCT_BY_ID = "getProductById";
export const GET_PRODUCT_BY_SELLER_ID = "getProductBySellerId";

export const INSERT_TRANSACTION = "insertTransaction";

export const ADD_TO_CART = "addToCart";
export const ADD_TO_CHECKOUT = "addToCheckout";
export const QUANTITY_INCREASED = "increase_quantity";
export const QUANTITY_DECREASED = "decrease_quantity";
export const CLEAR_CART = "clear_cart";
export const CLEAR_CHECKOUT = "clear_checkout";

export const ADD_PAYMENT_METHOD = "addPaymentMethod";

export const FETCHING_CHAT_DATA = "FETCHING_CHAT_DATA";
export const SYNC_CHAT_TO_SERVER = "SYNC_CHAT_TO_SERVER";

export const PENDING = `_${ActionType.Pending}`;
export const FULFILLED = `_${ActionType.Fulfilled}`;
export const REJECTED = `_${ActionType.Rejected}`;
