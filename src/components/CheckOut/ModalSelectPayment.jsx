import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import colors from '../../assets/colors.module.css';
import text from '../../assets/text.module.css';
import classname from '../../helpers/classJoiner';
import './ModalSelectPayment.css';

import gopay from '../../assets/img/lg.png';
import pos from '../../assets/img/logo-pos.png';
import mastercard from '../../assets/img/logo-mastercard.png';

const ModalSelectPayment = (props) => {
   return (
      <Modal
         {...props}
         size="md"
         aria-labelledby="contained-modal-title-vcenter"
         centered
      >
         <Modal.Header closeButton className="shadow-sm">
            <Modal.Title className="text-top" id="contained-modal-title-vcenter">
               Payment
            </Modal.Title>
         </Modal.Header>
         <Modal.Body className="no-border modal-body-container">
            <div className="container-modal">
               <div className="row container-item-payment">
                  <h4 className={classname(colors.blackText, "text-title-head")}>Payment Method</h4>
               </div>
               <div className="row align-items-center container-item-payment">
                  <img src={gopay} alt="" />
                  <h4 className="text-item-payment">MoMo</h4>
                  <input type="radio" name="payment" id="gopay" value="gopay" onChange={props.handleSelectPayment} className="ml-auto" />
               </div>
               
               <div className="row align-items-center container-item-payment">
                  <img src={mastercard} alt="" />
                  <h4 className="text-item-payment">Mastercard</h4>
                  <input type="radio" name="payment" id="mastercard" onChange={props.handleSelectPayment} value="mastercard" className="ml-auto" />
               </div>
            </div>
         </Modal.Body>
         <Modal.Body className="no-border">
            <div className="container-modal">
               <div className="row container-item-payment">
                  <h4 className={classname(colors.blackText, "text-title-head")}>Shopping summary</h4>
               </div>
               <div className="row align-items-center container-item-summary">
                  <h4 className={classname(colors.grayText, text.text)}>Order</h4>
                  <h3 className="ml-auto text-price">{`${props.cart.reduce((total, item) => { return total + (item.price * item.qty) }, 0).toLocaleString('id-ID')}VND`}</h3>
               </div>
               <div className="row align-items-center container-item-summary">
                  <h4 className={classname(colors.grayText, text.text)}>Delivery</h4>
                  <h3 className="ml-auto text-price">5.000VND</h3>
               </div>
            </div>
         </Modal.Body>
         <Modal.Body className="shadow-lg">
            <div className="container-modal-footer">
               <div className="row">
                  <div className="col">
                     <h4 className={classname(colors.blackText, "text-title-head")}>Shopping summary</h4>
                     <h3 className={classname(colors.primaryText, "text-price")}>{`${props.cart.reduce((total, item) => { return total + (item.price * item.qty) }, 5000).toLocaleString('id-ID')}VND`}</h3>
                  </div>
                  <div className="col-5 align-self-center">
                     <button className={classname("btn btn-danger btn-buy", colors.primary)} onClick={props.onSubmit}>Buy</button>
                  </div>
               </div>
            </div>
         </Modal.Body>
      </Modal>
   )
}

export default ModalSelectPayment;
