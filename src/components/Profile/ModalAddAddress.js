import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import styles from "./modal.module.css";
import { addAddressCustomerCreator } from "../../redux/actions/auth";

export default function ModalAddAddress(props) {
  const [myaddress, setAddress] = useState({
    address_as: "",
    name: "",
    phone: "",
    address: "",
    post: "",
    city: "",
    primary: "",
  });
  const { user, statusAddAddress, isAddAddressPending } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    const { address_as, name, phone, address, post, city } = myaddress;
    let body = {
      save_address: address_as,
      recipient_name: name,
      address: address,
      city_of_subdistrict: city,
      recipient_telp_number: phone,
      postal_code: post,
    };
    let formData = new FormData();
    formData.append("save_address", address_as);
    formData.append("recipient_name", name);
    formData.append("address", address);
    formData.append("city_of_subdistrict", city);
    formData.append("recipient_telp_number", phone);
    formData.append("postal_code", post);
    dispatch(addAddressCustomerCreator(Number(user.id), body));
  };
  useEffect(() => {
    if (statusAddAddress === 200) {
      props.onHide();
    } else if (statusAddAddress === 500) {
      props.onHide();
    }
  }, [statusAddAddress, dispatch]);
  return (
    <Modal
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered>
      <Modal.Header closeButton style={{ border: "none" }}>
        <Modal.Title id='contained-modal-title-vcenter'></Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.container}>
        <h4 className={styles.title}>Add new address</h4>
        <div className={styles.content}>
          <div className={styles.iteminput}>
            <div className={styles.contentinput}>
              <label className={styles.label} for='address'>
                Save address as (ex : home address, office address)
              </label>
              <input
                id='address'
                className={styles.input}
                onChange={(e) => {
                  setAddress({ ...myaddress, address_as: e.target.value });
                }}
              />
            </div>
          </div>

          <div className={styles.iteminput}>
            <div className={styles.contentinput}>
              <label className={styles.label} for='recipients'>
                Recipient’s name
              </label>
              <input
                id='recipients'
                className={styles.input}
                onChange={(e) => {
                  setAddress({ ...myaddress, name: e.target.value });
                }}
              />
            </div>
            <div className={styles.space}></div>
            <div className={styles.contentinput}>
              <label className={styles.label} for='tlp'>
                Recipient's telephone number
              </label>
              <input
                id='tlp'
                className={styles.input}
                onChange={(e) => {
                  setAddress({ ...myaddress, phone: e.target.value });
                }}
              />
            </div>
          </div>

          <div className={styles.iteminput}>
            <div className={styles.contentinput}>
              <label className={styles.label} for='address'>
                Address
              </label>
              <input
                id='address'
                className={styles.input}
                onChange={(e) => {
                  setAddress({ ...myaddress, address: e.target.value });
                }}
              />
            </div>
            <div className={styles.space}></div>
            <div className={styles.contentinput}>
              <label className={styles.label} for='postal'>
                Postal code
              </label>
              <input
                id='postal'
                className={styles.input}
                onChange={(e) => {
                  setAddress({ ...myaddress, post: e.target.value });
                }}
              />
            </div>
          </div>

          <div className={styles.iteminput}>
            <div className={styles.contentinput}>
              <label className={styles.label} for='city'>
                City or subdistrict
              </label>
              <input
                id='city'
                className={styles.input}
                onChange={(e) => {
                  setAddress({ ...myaddress, city: e.target.value });
                }}
              />
            </div>
            <div className={styles.space}></div>
            <div className={styles.contentinput}></div>
          </div>

          <div className={styles.iteminput}>
            <input
              className={styles.itemcheckbox}
              type='checkbox'
              id='primary'
              value='1'
              onChange={(e) => {
                setAddress({ ...myaddress, primary: e.target.value });
              }}
            />
            <label className={styles.label} for='primary'>
              Make it primary addres
            </label>
          </div>
          <div className={styles.iteminput}>
            <div className={styles.contentinput}></div>
            <div className={styles.space}></div>
            <div className={styles.contentbtn}>
              <button onClick={props.onHide} className={styles.btncancel}>
                Cancel
              </button>
              <button
                onClick={(e) => handleSubmit(e)}
                className={styles.btnsave}>
                {isAddAddressPending ? (
                  <i className='fa fa-spinner fa-spin fa-2x fa-fw'></i>
                ) : (
                  "Save"
                )}
              </button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
