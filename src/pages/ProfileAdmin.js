import React, { useState } from "react";
import styles from "./profile.module.css";

import LeftBar from "../components/ProfileAdmin/LeftBar";
import Main from "../components/ProfileAdmin/Main";
import ModalSignOut from "../components/ProfileAdmin/ModalSignOut";

export default function ProfileAdmin() {
  const [nav, setNav] = useState("storeprofile");
  const [edit, setEdit] = useState(false);
  const [logout, setLogout] = useState(false);
  return (
    <>
      {/* <HeaderProfile /> */}
      <div className={styles.container}>
        <LeftBar
          nav={nav}
          setEdit={() => setEdit(!edit)}
          setNav3={() => setNav("AdminCustomer")}
          setNav5={() => setNav("AdminSeller")}
          setNav2={() => setNav("myproduct")}
          setNav4={() => setNav("myorder")}
          onShow={() => setLogout(true)}
        />
        <Main nav={nav} edit={edit} setEdit={() => setEdit(false)} />
        <ModalSignOut show={logout} onHide={() => setLogout(false)} />
      </div>
    </>
  );
}