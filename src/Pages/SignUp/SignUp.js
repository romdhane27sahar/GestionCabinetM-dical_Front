import React from 'react'
import "./SignUp.css"
import { Link } from 'react-router-dom';


function SignUp() {
    return (
        <div className="container">
            <div className="card o-hidden border-0 shadow-lg my-5">
                <div className="card-body p-0">
                    {/* Nested Row within Card Body */}
                    <div className="row">
                        
                        <div className="col-lg-6">
                            <div className="p-5">
                                <div className="text-center">
                                    <h1 className="h4 text-gray-900 mb-4">S'inscrire</h1>
                                </div>
                                <form className="user">
                                    <div className="form-group row">
                                        <div className="col-sm-6 mb-3 mb-sm-0">
                                            <input type="text" className="form-control form-control-user" id="exampleFirstName" placeholder="Nom" />
                                        </div>
                                        <div className="col-sm-6">
                                            <input type="text" className="form-control form-control-user" id="exampleLastName" placeholder="Prénom" />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <div className="form-group col-sm-6  mb-3 mb-sm-0">
                                            <input type="email" className="form-control form-control-user" id="exampleInputEmail" placeholder="Adresse " />
                                        </div>
                                        <div className="form-group col-sm-6 ">
                                            <input type="email" className="form-control form-control-user" id="exampleInputEmail" placeholder="Téléphone" />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <div className="col-sm-6 mb-3 mb-sm-0">
                                            <input type="password" className="form-control form-control-user" id="exampleInputPassword" placeholder="E-mail" />
                                        </div>
                                        <div className="col-sm-6">
                                            <input type="password" className="form-control form-control-user" id="exampleRepeatPassword" placeholder="Mot de passe " />
                                        </div>
                                    </div>
                                    <a href="login.html" className="btn btn-primary btn-user btn-block">
                                        Crée un compte
                                    </a>
                                   
                                </form>
                                <hr />
                                
                                <div className="text-center">
                                <label className="small" >Vous avez déjà un compte? </label>
                                <br></br>
     
                                <Link to ="/Login" className="small" >Se connecter!</Link>

                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 d-none d-lg-block registerImg" />
                    </div>
                </div>
            </div>
        </div>

    )
}

export default SignUp
