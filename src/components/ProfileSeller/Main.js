import React from "react";
import styles from "./main.module.css";
import MyProfile from "./MyProfile";
import MyOrder from "./MyOrder";
import MyProduct from "./MyProduct";
import SellingProduct from "./SellingProduct";
import OrderCancel from "./OrderCancel";

export default function Main(props) {
  const { nav, edit, setEdit } = props;
  return (
    <div className={styles.container}>
      {nav === "storeprofile" ? (
        <MyProfile edit={edit} setEdit={setEdit} />
      ) : null}
      {nav === "myproduct" ? <MyProduct /> : null}
      {nav === "selingproduct" ? <SellingProduct /> : null}
      {nav === "myorder" ? <MyOrder /> : null}
      {nav === "ordercancel" ? <OrderCancel /> : null}
    </div>
  );
}
