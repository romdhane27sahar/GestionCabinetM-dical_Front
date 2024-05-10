import React, { useState, useEffect } from 'react'
import "./Login.css"
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { LoginUser, reset } from "../../Features/authSlice";

// import { useContext } from "react";
// import { RecoveryContext } from "../../App";
// import axios from "axios";



function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, isError, isSuccess, isLoading, message } = useSelector(
        (state) => state.auth
    );

    //related to reset password 
    // const { setEmail, setPage, email, setOTP, page } = useContext(RecoveryContext);

    // async function nagigateToOtp() {
    //     if (email) {
    //         const OTP = Math.floor(Math.random() * 9000 + 1000);
    //         console.log(OTP);
    //         setOTP(OTP);

    //         await axios.post("http://localhost:5000/send_recovery_email", {
    //             OTP,
    //             recipient_email: email,
    //         })

    //         setPage("otp")
    //         console.log("after setPage", page)



    //         return;
    //     }
    //     return alert("Please enter your email");
    // }


    useEffect(() => {
        if (user || isSuccess) { //isSuCCESS : A boolean flag indicating a successful authentication operation. 
            navigate("/acceuil");
        }
        dispatch(reset());
    }, [user, isSuccess, dispatch, navigate]);


    const Auth = (e) => {
        e.preventDefault();
        dispatch(LoginUser({ email, password }));
    };

    return (

        <div className="container">
            {/* Outer Row */}
            <div className="row justify-content-center">
                <div className="col-xl-10 col-lg-12 col-md-9">
                    <div className="card o-hidden border-0 shadow-lg my-5">
                        <div className="card-body p-0">
                            {/* Nested Row within Card Body */}
                            <div className="row">

                                <div className="col-lg-6">
                                    <div className="p-5">
                                        <div className="text-center">
                                            {isError && <p>{message}</p>}
                                            <h1 className="h4  mb-4 " style={{ color: '#07093E' }}>Se Connecter </h1>
                                        </div>

                                        <form onSubmit={Auth} className="user" >

                                            <div className="form-group">


                                                <label style={{ color: 'black' }}>E-mail</label>
                                                <input type="email"
                                                    className="form-control form-control-user"
                                                    id="exampleInputEmail" aria-describedby="emailHelp"
                                                     value={email}
                                                     onChange={(e) => setEmail(e.target.value)}
                                                    placeholder="Entrez votre adresse mail " />
                                            </div>
                                            <div className="form-group">
                                                <label style={{ color: 'black' }}>Mot de passe</label>
                                                <input type="password" className="form-control form-control-user" id="exampleInputPassword" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Entrer votre mot de passe" />
                                            </div>
                                            <div className="form-group">
                                                <div className="custom-control custom-checkbox small">
                                                    <input type="checkbox" className="custom-control-input" id="customCheck" />

                                                </div>
                                            </div>
                                            <button type='submit' className="btn btn-primary btn-user btn-block">
                                                {isLoading ? "Loading..." : "Se connecter"}
                                            </button>
{/* 
                                            <a

                                                onClick={() => nagigateToOtp()}
                                                className="text-gray-800"
                                            >
                                                Forgot password?
                                            </a> */}


                                        </form>

                                    </div>
                                </div>

                                <div className="col-lg-6 d-none d-lg-block loginImage" />

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Login
