import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import styles from "./modal.module.css";
import { authClearState } from "../../redux/actions/auth";

export default function ModalSignOut(props) {
  const dispatch = useDispatch();
  return (
    <Modal
      {...props}
      // size=''
      size='sm'
      aria-labelledby='contained-modal-title-vcenter'
      centered>
      <Modal.Header closeButton style={{ border: "none" }}>
        <Modal.Title id='contained-modal-title-vcenter'></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
          <h6 style={{ fontSize: "15px", marginBottom: "15px" }}>
            Are you sure to log out?
          </h6>
          <button
            onClick={() => {
              dispatch(authClearState());
              props.onHide();
            }}
            style={{ alignSelf: "flex-end", marginTop: "20px" }}
            className={styles.btnsave}>
            Logout
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
