import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
// import { Button, FormGroup, FormControl } from "react-bootstrap"
import corpName from "../../assets/img/logo.png";
import classname from "../../helpers/classJoiner";
import styles from "./styles.module.css";
import { useDispatch, useSelector } from "react-redux";
import { authClearState, authResetPasswordCustomerFullf } from '../../redux/actions/auth'

const ResetPasswordCustomer = ({ location, history }) => {
    const dispatch = useDispatch()
    const msg = useSelector((state) => state.auth.user.msg);
    const [errMsg, setErrMsg] = useState(null);


    const { handleSubmit, register, errors } = useForm();

    const getIdUser = () => {
        const str = location.search
        const id = str.split('=')
        return id[1]
    }

    useEffect(() => {
        if (msg === "change password success") {
            history.push("/login");
            dispatch(authClearState())
        }

    }, [msg])

    const onSubmit = (data) => {
        const newData = {
            id: getIdUser(),
            password: data.password
        }
        if (data.password !== data.passwordRepeat) {
            setErrMsg(`Password doesn't match`)
        } else {
            // console.log(newData)
            // console.log(data.password)
            // console.log(data.passwordRepeat)
            dispatch(authResetPasswordCustomerFullf(newData))
        }


    };

    return (
        <div className={classname(styles.body)}>
            {/* <p>FORM YANG INI PUNYA CUSTOMER</p> */}
            <div>
                <form
                    className={classname(styles.login)}
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <img
                        alt="logo"
                        className={classname(styles.logo)}
                        src={corpName}
                        
                    />
                    <p className={classname(styles.desc)}>
                        Reset password for customer
						</p>
                    {errMsg === null ? null : (
                        <p className={classname(styles.errMsg)} style={{ marginTop: 125 }}>
                            {errMsg}
                        </p>
                    )}
                    <form className={classname(styles.formContainer)} style={{ marginTop: 150 }}>

                        <div>
                            <input
                                className={classname(styles.loginInput)}
                                id="passwordNew"
                                placeholder="Password"
                                name="password"
                                type='password'

                                ref={register({
                                    required: "Required",
                                    pattern: {
                                        value: /^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{8,}$/,
                                        message: "Password must contain at least 1 number, an uppercase letter and more than 8 characters",
                                    },
                                    validate: (value) =>
                                        value !== "admin" || "Nice try!",
                                })}
                            />
                        </div>
                        <p style={{ fontSize: 16, color: 'red', width: 400 }}>

                            {errors.password && errors.password.message}
                        </p>

                        <div>
                            <input
                                className={classname(styles.loginInput)}
                                id="passwordNewRepeat"
                                placeholder="Confirm new password"
                                name="passwordRepeat"
                                type='password'

                                ref={register({
                                    required: "Required",
                                    pattern: {
                                        value: /^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{8,}$/,
                                        message: "Password must contain at least 1 number, an uppercase letter and more than 8 characters",
                                    },
                                    validate: (value) =>
                                        value !== "admin" || "Nice try!",
                                })}
                            />
                        </div>
                        <p style={{ fontSize: 16, color: 'red', width: 400 }}>

                            {errors.passwordRepeat && errors.passwordRepeat.message}
                        </p>
                        <button
                            style={{ marginTop: 20 }}
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

        </div>
    );
};

export default ResetPasswordCustomer;
