import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./sellingproduct.module.css";
import "./myprofile.module.css";
import main from "../../assets/image/mainphoto.png";
import secondary from "../../assets/image/secondaryphoto.png";
import formattext from "../../assets/image/formattext.png";
import {
  addProductCreator,
  resetStatusProduct,
  fetchAllProduct,
} from "../../redux/actions/product";
import { ToastContainer, toast } from "react-toastify";

export default function SellingProduct(props) {
  const dispatch = useDispatch();
  const { isAddProdPending, statusAddProd } = useSelector(
    (state) => state.product
  );
  const [product, setProduct] = useState({
    name: "",
    price: "",
    qty: "",
    category_id: "",
    status: "",
    description: "",
    img: [],
  });
  const inputRef = React.useRef();
  const handleChangeFile = (e) => {
    let files = e.target.files;
    setProduct({
      ...product,
      img: [...product.img, ...files],
    });
  };
  const { user } = useSelector((state) => state.auth);
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, price, qty, category_id, status, description, img } = product;
    let formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("qty", qty);
    formData.append("category_id", category_id);
    formData.append("status", status);
    for (let i = 0; i < img.length; i++) {
      formData.append("img", img[i]);
    }
    formData.append("description", description);
    formData.append("seller_id", user.id);
    dispatch(addProductCreator(formData));
  };
  const notifyError = () =>
    toast.error("Error add product", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  const notifySuccess = () =>
    toast.success("Success add product", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  useEffect(() => {
    if (statusAddProd === 200) {
      notifySuccess();
      dispatch(fetchAllProduct());
      setProduct({
        name: "",
        price: "",
        qty: "",
        category_id: "",
        status: "",
        description: "",
        img: [],
      });
      setTimeout(() => {
        dispatch(resetStatusProduct());
      }, 2500);
    } else if (statusAddProd === 500) {
      notifyError();
      setTimeout(() => {
        dispatch(resetStatusProduct());
      }, 2500);
    }
  }, [statusAddProd, dispatch]);
  return (
    <>
      <ToastContainer
        position='bottom-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: 0,
          width: "100%",
        }}>
        <input
          multiple
          onChange={(e) => handleChangeFile(e)}
          ref={inputRef}
          type='file'
          multiple
          className={styles.hiddeninput}
        />
        {/* INVENTORY */}
        <div className={styles.container}>
          {/* Header */}
          <div className={styles.header}>
            <h6 className={styles.title}>Inventory</h6>
          </div>

          {/* FormContainer */}
          <div className={styles.formcontainer}>
            <div className={styles.form}>
              <label className={styles.label}>Name of goods</label>
              <input
                value={product.name}
                className={styles.input}
                onChange={(e) => {
                  setProduct({ ...product, name: e.target.value });
                }}
              />
            </div>
          </div>
        </div>

        {/* ITEM DETAILS */}
        <div className={styles.container}>
          {/* Header */}
          <div className={styles.header}>
            <h6 className={styles.title}>Item details</h6>
          </div>

          {/* FormContainer */}
          <div className={styles.formcontainer}>
            <div className={styles.form}>
              <label className={styles.label}>Unit price</label>
              <input
                value={product.price}
                className={styles.input}
                onChange={(e) => {
                  setProduct({ ...product, price: e.target.value });
                }}
              />
            </div>
            <div className={styles.form}>
              <label className={styles.label}>Stock</label>
              <input
                value={product.qty}
                className={styles.input}
                onChange={(e) => {
                  setProduct({ ...product, qty: e.target.value });
                }}
              />
            </div>
            <div className={styles.form}>
              <label className={styles.label}>Category Product</label>
              <select
                className={styles.input}
                name='category'
                onChange={(e) => {
                  setProduct({ ...product, category_id: e.target.value });
                }}
                value={product.category_id}
                defaultValue='1'>
                <optgroup label='Category...'>
                  <option value='1'>T-Shirts</option>
                  <option value='2'>Shorts</option>
                  <option value='3'>Jacket</option>
                  <option value='4'>Pants</option>
                  <option value='5'>Shoes</option>
                  <option value='6'>Cap</option>
                  <option value='7'>Wristwatch</option>
                  <option value='8'>Handbag</option>
                  <option value='9'>Backbag</option>
                  <option value='10'>Socks</option>
                  <option value='11'>Glasses</option>
                  <option value='12'>Tie</option>
                  <option value='13'>Dress</option>
                  <option value='14'>Formal Suit</option>
                  <option value='15'>Accessories</option>
                  <option value='16'>High Heels</option>
                </optgroup>
              </select>
            </div>
            <div className={styles.form}>
              <label className={styles.label}>Condition</label>
              <div className={styles.radioselect}>
                <input
                  type='radio'
                  value='Baru'
                  name='condition'
                  className={styles.selectNew}
                  onChange={(e) => {
                    setProduct({ ...product, status: e.target.value });
                  }}
                />
                <p className={styles.valueradio}>New</p>
                <input
                  className={styles.selectOld}
                  type='radio'
                  value='Bekas'
                  name='condition'
                  onChange={(e) => {
                    setProduct({ ...product, status: e.target.value });
                  }}
                />
                <p className={styles.valueradio}>Old</p>
              </div>
            </div>
          </div>
        </div>

        {/* PHOTO */}
        <div className={styles.container}>
          {/* Header */}
          <div className={styles.header}>
            <h6 className={styles.title}>Photo of goods</h6>
          </div>

          {/* FormContainer */}
          <div className={styles.formcontainer}>
            <div className={(styles.form, styles.formcontainer_img)}>
              <div className={styles.content_img}>
                <div className={styles.main_img}>
                  <div className={styles.containerMainImg}>
                    <img
                      className={styles.mainImg}
                      src={
                        product.img[0]
                          ? URL.createObjectURL(product.img[0])
                          : main
                      }
                      alt=''
                    />
                  </div>
                  <p className={styles.mainPhoto}>Foto utama</p>
                </div>
                <div className={styles.secondary_img}>
                  <img
                    className={styles.secondaryImg}
                    src={
                      product.img[1]
                        ? URL.createObjectURL(product.img[1])
                        : secondary
                    }
                    alt=''
                  />
                </div>
                <div className={styles.secondary_img}>
                  <img
                    className={styles.secondaryImg}
                    src={
                      product.img[2]
                        ? URL.createObjectURL(product.img[2])
                        : secondary
                    }
                    alt=''
                  />
                </div>
                <div className={styles.secondary_img}>
                  <img
                    className={styles.secondaryImg}
                    src={
                      product.img[3]
                        ? URL.createObjectURL(product.img[3])
                        : secondary
                    }
                    alt=''
                  />
                </div>
                <div className={styles.secondary_img}>
                  <img
                    className={styles.secondaryImg}
                    src={
                      product.img[4]
                        ? URL.createObjectURL(product.img[4])
                        : secondary
                    }
                    alt=''
                  />
                </div>
              </div>
              <div className={styles.edit_img}>
                <button
                  onClick={() => {
                    inputRef.current.click();
                  }}
                  className={styles.btnupload}>
                  Upload image
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* DESCRIPTION */}
        <div className={styles.container}>
          {/* Header */}
          <div className={styles.header}>
            <h6 className={styles.title}>Description</h6>
          </div>

          {/* FormContainer */}
          <div className={styles.formcontainer}>
            <div className={(styles.form, styles.formcontainer_description)}>
              <img src={formattext} alt='' />
              <textarea
                value={product.description}
                className={styles.content_description}
                onChange={(e) => {
                  setProduct({ ...product, description: e.target.value });
                }}
              />
            </div>
          </div>
        </div>
        <button
          className={styles.btnsell}
          onClick={(e) => {
            handleSubmit(e);
          }}>
          {isAddProdPending ? (
            <i className='fa fa-spinner fa-spin fa-2x fa-fw'></i>
          ) : (
            "Sell"
          )}
        </button>
      </div>
    </>
  );
}
