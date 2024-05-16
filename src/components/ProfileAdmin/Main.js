
import React from "react";
import styles from "./main.module.css";
import MyOrder from "./MyOrder";
import MyProduct from "./MyProduct";
import AdminCustomer from "./AdminCustomer";
import AdminSeller from "./AdminSeller";

export default function Main(props) {
  const { nav, edit, setEdit } = props;
  return (
    <div className={styles.container}>
      {nav === "AdminCustomer" ? <AdminCustomer /> : null}
      {nav === "AdminSeller" ? <AdminSeller /> : null}
      {nav === "myproduct" ? <MyProduct /> : null}
      {nav === "myorder" ? <MyOrder /> : null}
    </div>
  );
}