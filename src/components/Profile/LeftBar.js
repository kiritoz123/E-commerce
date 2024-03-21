import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./leftbar.module.css";
import userDefault from "../../assets/img/default.png";
import { API_URL } from "../../utils/environment";
import { getOrderCustomerCreator } from "../../redux/actions/product";
import { authClearState } from "../../redux/actions/auth";

export default function LeftBar(props) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { nav, setNav1, setNav2, setNav3, setEdit, onShow } = props;
  return (
    <div className={styles.container}>
      <div className={styles.infoitem}>
        <div className={styles.profile}>
          <div className={styles.containerimage}>
            <img
              className={styles.image}
              src={user.avatar ? `${API_URL}${user.avatar}` : userDefault}
              alt=''
            />
          </div>

          <div className={styles.nameinfo}>
            <p className={styles.name}>{user.name ? user.name : "Anonim"}</p>
            <p
              className={styles.edit}
              onClick={() => {
                setEdit();
                setNav1();
              }}>
              <i
                style={{ marginRight: "10px" }}
                className='fa fa-pencil'
                aria-hidden='true'></i>
              Change profile
            </p>
          </div>
        </div>

        <div className={styles.info} onClick={setNav1}>
          <span className='fa-stack fa-lg'>
            <i
              className='fa fa-circle fa-stack-2x'
              style={{ color: "#456BF3" }}></i>
            <i className='fa fa-user-o fa-stack-1x fa-inverse'></i>
          </span>
          <p className={nav === "myprofile" ? styles.active : styles.inactive}>
            My account
          </p>
        </div>

        <div className={styles.info} onClick={setNav2}>
          <span className='fa-stack fa-lg'>
            <i
              className='fa fa-circle fa-stack-2x'
              style={{ color: "#F36F45" }}></i>
            <i className='fa fa-map-marker fa-stack-1x fa-inverse'></i>
          </span>
          <p
            className={
              nav === "shippingaddress" ? styles.active : styles.inactive
            }>
            Shipping address
          </p>
        </div>

        <div
          className={styles.info}
          onClick={() => {
            setNav3();
            dispatch(getOrderCustomerCreator(Number(user.id)));
          }}>
          <span className='fa-stack fa-lg'>
            <i
              className='fa fa-circle fa-stack-2x'
              style={{ color: "#F3456F" }}></i>
            <i className='fa fa fa-square-o fa-stack-1x fa-inverse'></i>
          </span>
          <p className={nav === "myorder" ? styles.active : styles.inactive}>
            My order
          </p>
        </div>
      </div>
      <button
        onClick={() => {
          // dispatch(authClearState());
          onShow();
        }}
        className={styles.btnsave}>
        Logout
      </button>
    </div>
  );
}
