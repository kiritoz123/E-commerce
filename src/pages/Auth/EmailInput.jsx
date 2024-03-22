import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
// import { Button, FormGroup, FormControl } from "react-bootstrap"
import corpName from "../../assets/img/logo.png";
import classname from "../../helpers/classJoiner";
import styles from "./styles.module.css";
import { useDispatch, useSelector } from "react-redux";
import { authClearState, authResetPasswordCustomer, authResetPasswordSeller } from "../../redux/actions/auth";

const EmailInput = () => {
    const dispatch = useDispatch()
    const [userType, setUserType] = useState(false);
    const [errMsg, setErrMsg] = useState(null)
    const email = useSelector((state) => state.auth.isFulfilled)
    // const resErrMsg = useSelector((state) => state.auth)

    // console.log(email)
    // const [errMsgSllr, setErrMsgSllr] = useState(null)


    const { handleSubmit, register, errors } = useForm();

    useEffect(() => {
        if (email === true) {
            setErrMsg('Email sent')
            dispatch(authClearState())
        }
        // if (email === null) {
        //     setErrMsg('Email not found')
        // }
    }, [email, dispatch]);

    const onSubmitCustomer = (data) => {
        dispatch(authResetPasswordCustomer(data))
    };

    const onSubmitSeller = (data) => {
        dispatch(authResetPasswordSeller(data))
    };

    return (
        <div className={classname(styles.body)}>
            {/* <p>FORM YANG INI PUNYA CUSTOMER</p> */}
            {userType === false ? (
                <div>
                    <form
                        className={classname(styles.login)}
                        onSubmit={handleSubmit(onSubmitCustomer)}
                    >
                        <img
                            alt="logo"
                            className={classname(styles.logo)}
                            src={corpName}
                        />
                        <p className={classname(styles.desc)}>
                            Reset password for customer
						</p>

                        <div className={classname(styles.userType)}>
                            {errMsg === null ? null : (<p className={classname(styles.errMsgRP)}>{errMsg}</p>)}

                            {userType === false ? (
                                <button
                                    className={classname(
                                        styles.userTypeBtnCustomerActive
                                    )}
                                >
                                    Customer
                                </button>
                            ) : (
                                    <button
                                        className={classname(
                                            styles.userTypeBtnCustomer
                                        )}
                                    >
                                        Customer
                                    </button>
                                )}
                            <button
                                className={classname(styles.userTypeBtnSeller)}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setUserType(true);
                                }}
                            >
                                Seller
							</button>
                        </div>

                        <form className={classname(styles.formContainer)}>
                            {/* <p className={classname(styles.errMsg)}> */}
                            
                            {/* </p> */}
                            <div>
                                <input
                                    className={classname(styles.registerInput)}
                                    id="emailCust"
                                    placeholder="Email"
                                    name="email"
                                    ref={register({
                                        required: "Required",
                                        pattern: {
                                            value: /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,
                                            message: "Wrong email format",
                                        },
                                    })}
                                    type="email"

                                />
                            </div>
                            <p style={{ fontSize: 16, color: 'red', marginTop: -16 }}>
                                {errors.email && errors.email.message}

                            </p>

                            <button
                                className={classname(styles.loginSubmit)}
                                type="submit"
                            >
                                Submit
							</button>
                        </form>
                    </form>
                    <div className={classname(styles.signUpBtn)}>
                        <p>
                            Don't have a Tokopedia account?{" "}
                            <span onClick={() => { }}>
                                <Link
                                    className={classname(styles.bla)}
                                    to="/RegisterCustomer"
                                >
                                    Register
								</Link>
                            </span>
                        </p>
                    </div>
                </div>
            ) : (
                    // <p>FORM DIBAWAH PUNYA SELLER, YANG ATAS PUNYA CUSTOMER</p>
                    <div>
                        <form
                            className={classname(styles.login)}
                            onSubmit={handleSubmit(onSubmitSeller)}
                        >
                            <img
                                alt="logo"
                                className={classname(styles.logo)}
                                src={corpName}
                            />
                            <p className={classname(styles.desc)}>
                                Reset password for seller
						</p>


                            <div className={classname(styles.userType)}>
                                {errMsg === null ? null : (<p className={classname(styles.errMsgRP)}>{errMsg}</p>)}

                                <button
                                    className={classname(
                                        styles.userTypeBtnCustomer
                                    )}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setUserType(false);
                                    }}
                                >
                                    Customer
							</button>
                                {userType === true ? (
                                    <button
                                        className={classname(
                                            styles.userTypeBtnSellerActive
                                        )}
                                    >
                                        Seller
                                    </button>
                                ) : (
                                        <button
                                            className={classname(
                                                styles.userTypeBtnSeller
                                            )}
                                        >
                                            Seller
                                        </button>
                                    )}
                            </div>

                            <form className={classname(styles.formContainer)}>
                                {/* <p className={classname(styles.errMsg)}> */}
                                
                                {/* </p> */}
                                <div>
                                    <input
                                        className={classname(styles.registerInput)}
                                        id="emailCust"
                                        placeholder="Email"
                                        name="email"
                                        ref={register({
                                            required: "Required",
                                            pattern: {
                                                value: /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,
                                                message: "Wrong email format",
                                            },
                                        })}
                                        type="email"

                                    />
                                </div>
                                <p style={{ fontSize: 16, color: 'red', marginTop: -16 }}>
                                    {errors.email && errors.email.message}

                                </p>
                                <button
                                    className={classname(styles.loginSubmit)}
                                    type="submit"
                                >
                                    Submit
							</button>
                            </form>
                        </form>
                        <div className={classname(styles.signUpBtn)}>
                            <p>
                                Don't have a Tokopedia account?{" "}
                                <span onClick={() => { }}>
                                    <Link
                                        className={classname(styles.bla)}
                                        to="/RegisterSeller"
                                    >
                                        Register
								</Link>
                                </span>
                            </p>
                        </div>
                    </div>
                )}
        </div>
    );
};

export default EmailInput;
