import React from "react";
import styles from "./main.module.css";
import MyProfile from "./MyProfile";
import AnotherAddress from "./AnotherAddress";
import MyOrder from "./MyOrder";
export default function Main(props) {
  const { nav, onShow, edit, setEdit } = props;
  return (
    <div className={styles.container}>
      {nav === "myprofile" ? <MyProfile edit={edit} setEdit={setEdit} /> : null}
      {nav === "shippingaddress" ? <AnotherAddress onShow={onShow} /> : null}
      {nav === "myorder" ? <MyOrder /> : null}
    </div>
  );
}
