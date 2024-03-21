import React, { useEffect, useState } from 'react';
import colors from '../../assets/colors.module.css';
import text from '../../assets/text.module.css';
import classname from '../../helpers/classJoiner';
import ModalChooseAddress from "../../components/CheckOut/ModalChooseAddress";
import ModalAddAddress from "../../components/Profile/ModalAddAddress";
import ModalSelectPayment from "../../components/CheckOut/ModalSelectPayment";
import { useDispatch, useSelector } from "react-redux";
import { transaction, addPaymentMethod, clearCart, clearCheckout } from "../../redux/actions/product";
import { API_URL } from "../../utils/environment";
import './Checkout.css';

const CheckOut = (props) => {
   const [user] = useState({
      id: 1,
      address: "Perumahan Sapphire Mediterania, Wiradadi, Kec. Sokaraja, Kabupaten Banyumas, Jawa Tengah, 53181 [Tokopedia Note: blok c 16] Sokaraja, Kab. Banyumas, 53181",

   });
   const [cart, setCart] = useState([
      {
         id: 22,
         name: "Men's formal suit - Black",
         seller: "Zalora Cloth",
         qty: 1,
         price: 20.0,
         selected: true,
         img: "https://s3-alpha-sig.figma.com/img/464a/22c1/4934cf1d9102bfc8ca226895c16fe510?Expires=1603065600&Signature=L2Go8ufnFXRu499YQ0SVJEFU8cW1i62rws4oM3PBc-WW3sCqbVw0AWsTnmqAMhltn5TMjdbR3EQjYS1QtRoZLSkt2Mh-AEfzKwMThJEAMb7oAI5dw1nCy1PVoEp9LQeco~tzGD5SJ9h8OzJgkoVGQ0YY1soJMVaC472GJxxHVZDfVctr2MEsi6EaHG-SqeNBVNHCcKM8EVDVhlTRT36AqDLeOSD10qWLtwInozO-8QW1w6hsZ2TmGRRXq4WjOaDU~8gLUUnxINBWB4m-FOwMs2DGjhpkQZQHe3B1fu0gIbL84W50DSX9X-w4PvTsTNFSgxsImCcSNvUX6Hsx5AavAg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
      },
      {
         id: 23,
         name: "Men's Jacket jeans",
         seller: "Zalora Cloth",
         qty: 1,
         price: 20.0,
         selected: true,
         img: "https://s3-alpha-sig.figma.com/img/d373/227e/1b077d067cc7eed45f8733fd75f5e570?Expires=1603065600&Signature=d40ckFqK4v2u2r8FCajf9MOpyiz7NQhmacmlyXyfsLXRPWu-5MQ8RndW9wtuCOVRc~kbqsGaqwrfcjB4AgWVrtxYHETotH8XBuP5~rKUpUYxq1jUSWz5fo2WcHZvYKWFaF05tyYRfWOQWF7JB-q~69HXXeWfK6S~KA4wHmlMEVwMY66Q6nSvHxAqrXejnpENTskeO1Bp5zeypr~kd7N8c5oWsC8UQUV0M6ff1hcyhjT2YbgIDcAp6Y3fOXdKH4Iefow8ChLuq~jnAAfvE8Y8JWAXwZ713jAVTUpYVV2gpP-f-IZWypkWsoVUSB~GSmuYZjQX6xZ8c98qewV0Qj38Ow__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
      },
   ]);

   const stateAuth = useSelector(state => state.auth.user);
   const stateCarts = useSelector(state => state.product.carts);
   const dataTransaction = useSelector(state => state.product.checkout);
   const dispatch = useDispatch();

   const joinedAdrress = `${stateAuth.address}, ${stateAuth.city_of_subdistrict}, ${stateAuth.postal_code}, ${stateAuth.recipient_telp_number}`;

   

   useEffect(() => {
      document.title = "Checkout | Blanja";
   }, []);

   // const { data } = props.location;
   const [showChooseAddress, setShowChooseAddress] = useState(false);
   const [showAddAddress, setShowAddAddress] = useState(false);
   const [showPayment, setShowPayment] = useState(false);

   const handleSubmit = () => {
      if (dataTransaction.payment_method === "") {
         alert("Please select a payment method..!")
      } else {
         dispatch(transaction(dataTransaction));
         alert("Transaction success");
         dispatch(clearCart());
         dispatch(clearCheckout());
         setShowPayment(false);
      }
   };

   const handleSelectPayment = (evt) => {
      // setDataTransaction({ ...dataTransaction, payment_method: evt.currentTarget.value })
      dispatch(addPaymentMethod(evt.currentTarget.value))
   };

   return (
      <div className="container-main">
         <div className="container-title">
            <h1 className={classname(text.headline, "headline")}>Checkout</h1>
         </div>
         {stateCarts.filter(item => item.selected === true).length ? (
            <div className="row">
               {/* left item */}
               <div className="col-lg-7">
                  <h4 className={classname(text.text, "text-title")}>Shipping Adress</h4>
                  <div className="row no-gutters shadow align-content-center container-select-all">
                     <div className="col">
                        <p className={classname(text.text, "text-title")}>{stateAuth.recipient_name}</p>
                        <p className="text-addres mb-4">{joinedAdrress}</p>
                        <button type="button" className={classname(colors.grayText, "btn btn-outline-secondary btn-choose-address")} onClick={() => setShowChooseAddress(true)}>Choose another address</button>
                     </div>
                  </div>

                  {/* list item */}
                  {stateCarts.filter(item => item.selected === true).map(item => {
                     return (
                        <div className="row no-gutters shadow align-items-center container-items" key={item.id}>
                           <div className="col-2">
                              <img src={`${API_URL}${item.images}`} alt="" />
                           </div>
                           <div className="col">
                              <p className={classname(text.text, "text-title")}>{item.name}</p>
                              <p className={classname(colors.grayText, "text-seller")}>{item.brand}</p>
                           </div>
                           <div className="col-2">
                              <p href="#" className={classname(text.text, colors.blackText, "text-title text-right")}>
                                 {`${(item.price * item.qty).toLocaleString('id-ID')}VND`}
                              </p>
                           </div>
                        </div>
                     )
                  })}

               </div>
               {/* right item */}
               <div className="col-lg-4 shadow container-summary ml-lg-auto">
                  <div>
                     <p className={classname(text.text, "text-title mb-5")}>Shopping summary</p>
                     <div className="row no-gutters mb-4 align-items-center order-deliv">
                        <div className="col">
                           <p className={classname(text.text, colors.grayText, "text-title")}>Order</p>
                           <p className={classname(text.text, colors.grayText, "text-title")}>Delivery</p>
                        </div>
                        <div className="col">
                           <p className={classname(text.headline3, "text-title text-right")}>{`${stateCarts.filter(item => item.selected === true).reduce((total, item) => { return total + (item.price * item.qty) }, 0).toLocaleString('id-ID')}VND`}</p>
                           <p className={classname(text.headline3, "text-title text-right")}>5.000VND</p>
                        </div>
                     </div>
                     <div className="row">
                        <div className="col">
                           <p className={classname(text.text, "text-title mb-5")}>Shopping summary</p>
                        </div>
                        <div className="col">
                           <p className={classname(text.headline3, colors.primaryText, "text-title text-right")}>{`${stateCarts.filter(item => item.selected === true).reduce((total, item) => { return total + (item.price * item.qty) }, 5000).toLocaleString('id-ID')}VND`}</p>
                        </div>
                     </div>
                     <button className={classname("btn btn-danger btn-buy", colors.primary)} onClick={() => setShowPayment(true)}>Select payment</button>
                  </div>
               </div>
            </div>
         ) : (
               <h1 className={classname(text.headline, colors.grayText, "text-empty-cart")}>(Checkout item is empty)</h1>
            )}

         <ModalChooseAddress
            show={showChooseAddress}
            onHide={() => setShowChooseAddress(false)}
            showAddAddress={() => setShowAddAddress(true)}
         />
         <ModalSelectPayment
            show={showPayment}
            onHide={() => setShowPayment(false)}
            showAddAddress={() => setShowAddAddress(true)}
            cart={stateCarts.filter(item => item.selected === true)}
            onSubmit={() => handleSubmit()}
            handleSelectPayment={(evt) => handleSelectPayment(evt)}
         />
         <ModalAddAddress
            show={showAddAddress}
            onHide={() => setShowAddAddress(false)}
         />
      </div >
   )
}

export default CheckOut;