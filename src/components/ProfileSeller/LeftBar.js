import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./leftbar.module.css";
import userDefault from "../../assets/img/default.png";
import { Accordion, Card } from "react-bootstrap";
import {
  getProductBySellerIdCreator,
  getOrderSellerCreator,
} from "../../redux/actions/product";
import { API_URL } from "../../utils/environment";
import { authClearState } from "../../redux/actions/auth";

export default function LeftBar(props) {
  const [arrow, setArrow] = useState({
    store: true,
    product: false,
    order: false,
  });
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const {
    nav,
    setNav1,
    setNav2,
    setNav3,
    setNav4,
    setNav5,
    setEdit,
    onShow,
  } = props;
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

        <Accordion defaultActiveKey='0'>
          <Card
            style={{
              backgroundColor: "#ffffff",
              border: "none",
            }}>
            <Accordion.Toggle
              onClick={() => {
                setNav1();
                setArrow({
                  store: !arrow.store,
                  product: false,
                  order: false,
                });
              }}
              as={Card.Header}
              eventKey='0'
              style={{
                padding: 0,
                display: "flex",
                alignItems: "center",
                border: "none",
                backgroundColor: "#ffffff",
                cursor: "pointer",
                flexDirection: "row",
              }}>
              <span className='fa-stack fa-lg' style={{ flex: 1 }}>
                <i
                  className='fa fa-circle fa-stack-2x'
                  style={{ color: "#456BF3" }}></i>
                <i className='fa fa-home fa-stack-1x fa-inverse'></i>
              </span>
              <p
                style={{ flex: 5 }}
                className={
                  nav === "storeprofile" ? styles.active : styles.inactive
                }>
                Store
              </p>
              <p className={styles.containerArrow}>
                {arrow.store ? (
                  <i
                    className='fa fa-chevron-up'
                    style={{ color: "#222222" }}
                    aria-hidden='true'></i>
                ) : (
                  <i
                    className='fa fa-chevron-down'
                    style={{ color: "#9b9b9b" }}
                    aria-hidden='true'></i>
                )}
              </p>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey='0'>
              <Card.Body
                style={{
                  display: "flex",
                  flexDirection: "column",
                  paddingLeft: "40px",
                  paddingTop: 0,
                  paddingBottom: 0,
                  cursor: "pointer",
                }}>
                <p
                  onClick={setNav1}
                  className={
                    nav === "storeprofile" ? styles.active : styles.inactive
                  }>
                  Store profile
                </p>
              </Card.Body>
            </Accordion.Collapse>
          </Card>

          <Card
            style={{
              backgroundColor: "#ffffff",
              border: "none",
            }}>
            <Accordion.Toggle
              onClick={() => {
                setNav2();
                setArrow({
                  store: false,
                  product: !arrow.product,
                  order: false,
                });
                dispatch(getProductBySellerIdCreator(Number(user.id)));
              }}
              as={Card.Header}
              eventKey='1'
              style={{
                padding: 0,
                display: "flex",
                alignItems: "center",
                border: "none",
                backgroundColor: "#ffffff",
                cursor: "pointer",
                flexDirection: "row",
              }}>
              <span className='fa-stack fa-lg' style={{ flex: 1 }}>
                <i
                  className='fa fa-circle fa-stack-2x'
                  style={{ color: "#F36F45" }}></i>
                <i className='fa fa-cube fa-stack-1x fa-inverse'></i>
              </span>
              <p
                style={{ flex: 5 }}
                className={
                  nav === "myproduct" || nav === "selingproduct"
                    ? styles.active
                    : styles.inactive
                }>
                Product
              </p>
              <p className={styles.containerArrow}>
                {arrow.product ? (
                  <i
                    className='fa fa-chevron-up'
                    style={{ color: "#222222" }}
                    aria-hidden='true'></i>
                ) : (
                  <i
                    className='fa fa-chevron-down'
                    style={{ color: "#9b9b9b" }}
                    aria-hidden='true'></i>
                )}
              </p>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey='1'>
              <Card.Body
                style={{
                  display: "flex",
                  flexDirection: "column",
                  paddingLeft: "40px",
                  paddingTop: 0,
                  paddingBottom: 0,
                  cursor: "pointer",
                }}>
                <p
                  onClick={setNav2}
                  className={
                    nav === "myproduct" ? styles.active : styles.inactive
                  }>
                  My products
                </p>
                <p
                  onClick={setNav3}
                  className={
                    nav === "selingproduct" ? styles.active : styles.inactive
                  }>
                  Selling products
                </p>
              </Card.Body>
            </Accordion.Collapse>
          </Card>

          <Card
            style={{
              backgroundColor: "#ffffff",
              border: "none",
            }}>
            <Accordion.Toggle
              onClick={() => {
                setNav4();
                setArrow({
                  store: false,
                  product: false,
                  order: !arrow.order,
                });
                dispatch(getOrderSellerCreator(Number(user.id)));
              }}
              as={Card.Header}
              eventKey='2'
              style={{
                padding: 0,
                display: "flex",
                alignItems: "center",
                border: "none",
                backgroundColor: "#ffffff",
                cursor: "pointer",
                flexDirection: "row",
              }}>
              <span className='fa-stack fa-lg' style={{ flex: 1 }}>
                <i
                  className='fa fa-circle fa-stack-2x'
                  style={{ color: "#F3456F" }}></i>
                <i className='fa fa fa-shopping-cart fa-stack-1x fa-inverse'></i>
              </span>
              <p
                style={{ flex: 5 }}
                className={
                  nav === "myorder" || nav === "ordercancel"
                    ? styles.active
                    : styles.inactive
                }>
                Order
              </p>
              <p className={styles.containerArrow}>
                {arrow.order ? (
                  <i
                    className='fa fa-chevron-up'
                    style={{ color: "#222222" }}
                    aria-hidden='true'></i>
                ) : (
                  <i
                    className='fa fa-chevron-down'
                    style={{ color: "#9b9b9b" }}
                    aria-hidden='true'></i>
                )}
              </p>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey='2'>
              <Card.Body
                style={{
                  display: "flex",
                  flexDirection: "column",
                  paddingLeft: "40px",
                  paddingTop: 0,
                  paddingBottom: 0,
                  cursor: "pointer",
                }}>
                <p
                  onClick={setNav4}
                  className={
                    nav === "myorder" ? styles.active : styles.inactive
                  }>
                  My order
                </p>
                <p
                  onClick={setNav5}
                  className={
                    nav === "ordercancel" ? styles.active : styles.inactive
                  }>
                  Order cancel
                </p>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
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
