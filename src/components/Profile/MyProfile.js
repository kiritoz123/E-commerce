import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./myprofile.module.css";
import "./myprofile.module.css";
import {
  updateProfileCustomerCreator,
  resetStatusUpdate,
} from "../../redux/actions/auth";
import userDefault from "../../assets/img/default.png";
import { API_URL } from "../../utils/environment";
import { ToastContainer, toast } from "react-toastify";

let date = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  11,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26,
  27,
  28,
  29,
  30,
  31,
];

export default function MyProfile(props) {
  const dispatch = useDispatch();
  const { user, isUpdateCustomerPending, statusUpdateCustomer } = useSelector(
    (state) => state.auth
  );
  const [biodata, setBiodata] = useState({
    name: user.name ? user.name : "",
    email: user.email ? user.email : "",
    phone: user.phone_number ? user.phone_number : "-",
    gender: user.gender ? user.gender : "",
    image: user.avatar ? user.avatar : "",
    imagePreviewUrl: "",
  });
  const [birthDate, setBirthDate] = useState({
    date: user.dob ? user.dob.split(" ")[0] : "1",
    month: user.dob ? user.dob.split(" ")[1] : "January",
    year: user.dob ? user.dob.split(" ")[2] : "1997",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, phone, gender, image } = biodata;
    const { date, month, year } = birthDate;
    let formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone_number", phone);
    formData.append("gender", gender);
    formData.append(
      "dob",
      `${birthDate.date} ${birthDate.month} ${birthDate.year}`
    );
    formData.append("avatar", image);
    console.log(...formData);
    dispatch(updateProfileCustomerCreator(Number(user.id), formData));
  };

  const inputRef = React.useRef();
  // console.log(inputRef);
  const handleChangeFile = (e) => {
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      setBiodata({
        ...biodata,
        image: file,
        imagePreviewUrl: reader.result,
      });
    };
    reader.readAsDataURL(file);
  };
  const notifyError = () =>
    toast.error("Error updating profile", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  const notifySuccess = () =>
    toast.success("Success updating profile", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  useEffect(() => {
    if (statusUpdateCustomer === 200) {
      notifySuccess();
      setTimeout(() => {
        dispatch(resetStatusUpdate());
      }, 2500);
    } else if (statusUpdateCustomer === 500) {
      notifyError();
      setTimeout(() => {
        dispatch(resetStatusUpdate());
      }, 2500);
    }
  }, [statusUpdateCustomer, dispatch]);
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
      <div className={styles.container}>
        <input
          onChange={(e) => handleChangeFile(e)}
          ref={inputRef}
          type='file'
          className={styles.hiddeninput}
        />
        {/* Header */}
        <div className={styles.header}>
          <h6 className={styles.title}>My Profile</h6>
          <p className={styles.subtitle}>Manage your profile information</p>
        </div>

        {/* FormContainer */}
        <div className={styles.formcontainer}>
          {/* Form */}
          <div className={styles.form}>
            <div className={styles.itemform}>
              <div className={styles.label}>Name</div>
              <div className={styles.inputcontainer}>
                <input
                  className={styles.input}
                  onChange={(e) => {
                    setBiodata({ ...biodata, name: e.target.value });
                    console.log(biodata.name);
                  }}
                  value={biodata.name}
                  placeholder=''
                />
              </div>
            </div>
            <div className={styles.itemform}>
              <div className={styles.label}>Email</div>
              <div className={styles.inputcontainer}>
                <input
                  className={styles.input}
                  onChange={(e) => {
                    setBiodata({ ...biodata, email: e.target.value });
                  }}
                  value={biodata.email}
                  placeholder=''
                />
              </div>
            </div>
            <div className={styles.itemform}>
              <div className={styles.label}>Phone Number</div>
              <div className={styles.inputcontainer}>
                <input
                  className={styles.input}
                  onChange={(e) => {
                    setBiodata({ ...biodata, phone: e.target.value });
                  }}
                  value={biodata.phone}
                  placeholder=''
                />
              </div>
            </div>
            <div className={styles.itemform}>
              <div className={styles.label}>Gender</div>
              <div className={styles.radioselectcontainer}>
                <input
                  style={{ outline: "none" }}
                  id='male'
                  value='male'
                  name='gender'
                  type='radio'
                  // className={styles.radioselect}
                  placeholder=''
                  onChange={(e) => {
                    setBiodata({ ...biodata, gender: e.target.value });
                  }}
                  sele
                  checked={biodata.gender === "male" ? true : false}
                />
                <label className={styles.labelradio} htmlfor='male'>
                  Male
                </label>

                <input
                  style={{ outline: "none" }}
                  id='female'
                  value='female'
                  name='gender'
                  type='radio'
                  // className={styles.radioselect}
                  placeholder=''
                  onChange={(e) => {
                    setBiodata({ ...biodata, gender: e.target.value });
                  }}
                  checked={biodata.gender === "female" ? true : false}
                />
                <label className={styles.labelradio} htmlfor='male'>
                  Female
                </label>
              </div>
            </div>
            <div className={styles.itemform}>
              <div className={styles.label}>Date of Birth</div>
              <div className={styles.inputcontainer}>
                <select
                  style={{ outline: "none" }}
                  className={styles.select}
                  name='date'
                  onChange={(e) => {
                    setBirthDate({ ...birthDate, date: e.target.value });
                  }}
                  defaultValue={Number(birthDate.date)}>
                  <optgroup label='Date...'>
                    {birthDate.month === "February"
                      ? date
                          .filter((item, index) => {
                            return index < 29;
                          })
                          .map((item, index) => (
                            <option value={item}>{item}</option>
                          ))
                      : birthDate.month === "April" ||
                        birthDate.month === "June" ||
                        birthDate.month === "September" ||
                        birthDate.month === "November"
                      ? date
                          .filter((item, index) => {
                            return index < 30;
                          })
                          .map((item, index) => (
                            <option value={item}>{item}</option>
                          ))
                      : date
                          .filter((item, index) => {
                            return index < 31;
                          })
                          .map((item, index) => (
                            <option value={item}>{item}</option>
                          ))}
                  </optgroup>
                </select>
                <select
                  style={{ outline: "none" }}
                  className={styles.select}
                  name='month'
                  onChange={(e) => {
                    setBirthDate({ ...birthDate, month: e.target.value });
                  }}
                  defaultValue={birthDate.month}>
                  <optgroup label='Month...'>
                    <option value='January'>January</option>
                    <option value='February'>February</option>
                    <option value='March'>March</option>
                    <option value='April'>April</option>
                    <option value='May'>May</option>
                    <option value='June'>June</option>
                    <option value='July'>July</option>
                    <option value='August'>August</option>
                    <option value='September'>September</option>
                    <option value='October'>October</option>
                    <option value='November'>November</option>
                    <option value='Desember'>Desember</option>
                  </optgroup>
                </select>
                <select
                  style={{ outline: "none" }}
                  className={styles.select}
                  name='year'
                  onChange={(e) => {
                    setBirthDate({ ...birthDate, year: e.target.value });
                  }}
                  defaultValue={birthDate.year}>
                  <optgroup label='Year...'>
                    <option value='2000'>2000</option>
                    <option value='1999'>1999</option>
                    <option value='1998'>1998</option>
                    <option value='1997'>1997</option>
                    <option value='1996'>1996</option>
                    <option value='1995'>1995</option>
                  </optgroup>
                </select>
              </div>
            </div>
            <div className={styles.itemform}>
              <div className={styles.label}>{""}</div>
              <div className={styles.inputcontainer}>
                {props.edit ? (
                  <button
                    onClick={(e) => {
                      handleSubmit(e);
                      // props.setEdit();
                    }}
                    className={styles.btnsave}>
                    {isUpdateCustomerPending ? (
                      <i className='fa fa-spinner fa-spin fa-2x fa-fw'></i>
                    ) : (
                      "Save"
                    )}
                  </button>
                ) : null}
              </div>
            </div>
          </div>
          {/* ImageProfile */}
          <div className={styles.imagecontainer}>
            <div className={styles.boximage}>
              <div className={styles.containerimage}>
                <img
                  className={styles.imageprofile}
                  src={
                    biodata.imagePreviewUrl
                      ? biodata.imagePreviewUrl
                      : user.avatar
                      ? `${API_URL}${user.avatar}`
                      : userDefault
                  }
                  alt=''
                />
              </div>
              {props.edit ? (
                <button
                  onClick={() => {
                    inputRef.current.click();
                  }}
                  className={styles.btnedit}>
                  Select image
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
