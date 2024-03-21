import React, { useState } from "react";
import styles from "./profile.module.css";

import LeftBar from "../components/Profile/LeftBar";
import Main from "../components/Profile/Main";
import ModalAddAddress from "../components/Profile/ModalAddAddress";
import ModalSignOut from "../components/Profile/ModalSignOut";

export default function Profile() {
  const [nav, setNav] = useState("myprofile");
  const [modalShow, setModalShow] = React.useState(false);
  const [edit, setEdit] = useState(false);
  const [logout, setLogout] = useState(false);
  return (
    <>
      {/* <HeaderProfile /> */}
      <div className={styles.container}>
        <LeftBar
          nav={nav}
          setEdit={() => setEdit(!edit)}
          setNav1={() => setNav("myprofile")}
          setNav2={() => setNav("shippingaddress")}
          setNav3={() => setNav("myorder")}
          onShow={() => setLogout(true)}
        />
        <Main
          setEdit={() => setEdit(false)}
          edit={edit}
          nav={nav}
          onShow={() => setModalShow(true)}
        />
        <ModalAddAddress show={modalShow} onHide={() => setModalShow(false)} />
        <ModalSignOut show={logout} onHide={() => setLogout(false)} />
      </div>
    </>
  );
}
