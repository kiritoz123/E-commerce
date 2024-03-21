import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import colors from '../../assets/colors.module.css';
import text from '../../assets/text.module.css';
import classname from '../../helpers/classJoiner';
import './ModalChooseAddress.css';

const ModalChooseAddress = (props) => {

   const stateAuth = useSelector(state => state.auth.user);
   const joinedAdrress = `${stateAuth.address}, ${stateAuth.city_of_subdistrict}, ${stateAuth.postal_code}, ${stateAuth.recipient_telp_number}`;

   return (
      <Modal
         {...props}
         size="lg"
         aria-labelledby="contained-modal-title-vcenter"
         centered
      >
         <Modal.Header closeButton className="no-border" />
         <Modal.Body className="no-border">
            <div className="container-modal">
               <div>
                  <h4 className="text-top">Choose another address</h4>
               </div>
               <div className="add-address" onClick={props.showAddAddress}>
                  <h4 className={classname(colors.grayText, "text-add-addres")}>Add new address</h4>
               </div>
               <div className="container-address-list">
                  <p className={classname(text.text, "text-title")}>{stateAuth.recipient_name}</p>
                  <p className="text-addres mb-4">{joinedAdrress}</p>
                  <a href="#" className={classname(colors.primaryText, text.text, "text-title")}>Change address</a>
               </div>
            </div>
         </Modal.Body>
      </Modal>
   )
}

export default ModalChooseAddress;
