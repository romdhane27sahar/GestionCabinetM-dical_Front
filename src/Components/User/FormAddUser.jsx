import React, { useState } from "react";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./FormAddUser.css";

//validation imports

import * as yup from "yup"; // Import Yup
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

function FormAddUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [role, setRole] = useState("");
  const [msg, setMsg] = useState("");

  const [lastname, setLastname] = useState("");
  const [address, setAddress] = useState("");
  const [telephone, setTelephone] = useState("");

  const navigate = useNavigate();

  //confirmation dialog
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  //add success message state
  const [addSuccessMessage, setaddSuccessMessage] = useState(null); // State for success message

  // Define Yup schema for validation
  const schema = yup.object().shape({
    name: yup
      .string()
      .min(3, "Prénom contient minimum 3 lettres")
      .required("Prénom est obligatoire !")
      .test(
        "no-digits",
        "Le nom ne doit pas contenir de chiffres !",
        (value) => !/\d/.test(value)
      ),

    lastname: yup
      .string()
      .min(3, "Nom contient minimum 3 lettres")
      .required("Nom est obligatoire !")
      .test(
        "no-digits",
        "Le nom ne doit pas contenir de chiffres",
        (value) => !/\d/.test(value)
      ),

    address: yup.string().required("Adresse est obligatoire !"),

    email: yup
      .string()
      .email("Email invalide")
      .required("Email est obligatoire !")
      .matches(/^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,6}/, "Email invalide"),

    telephone: yup
      .string()
      .matches(/^\d{8}$/, "Numero téléphone doit est de 8 chiffres")
      .required("téléphone est un champs obligatoire"),

    password: yup
      .string()
      .min(8, "Mot de passe trop court (minimum 8 caractères)")
      .required("Mot de passe est obligatoire !")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Mot de passe doit contenir au moins un caractère spécial"
      )
      .matches(/[0-9]/, "Mot de passe doit contenir au moins un chiffre")
      .matches(
        /[A-Z]/,
        "Mot de passe doit contenir au moins une lettre majuscule "
      )
      .matches(
        /[a-z]/,
        "Mot de passe doit contenir au moins une lettre miniscule"
      ),

    confPassword: yup
      .string()
      .oneOf(
        [yup.ref("password"), null],
        "Les mots de passe doivent correspondre"
      )
      .required("Confirmer mot de passe est obligatoire !"),

    role: yup
      .string()

      .oneOf(
        ["admin", "secretaire", "medecin"],
        "Veuillez selectionner un role !"
      ),
  });

  //execute the schema validation to the form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  //add function
  const saveUser = async (e) => {
    //e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/users", {
        name: name,
        email: email,
        password: password,
        confPassword: confPassword,
        role: role,
        lastname: lastname,
        address: address,
        telephone: telephone,
      });
      //navigate("/users");

      //boite de dialogue
      if (response.status === 201) {
        setShowConfirmationDialog(true); // Show confirmation dialog

        setaddSuccessMessage("Utilisateur ajouté avec succès !"); // Set success message
        setTimeout(() => {
          setaddSuccessMessage(null); // Reset success message after 3 seconds
        }, 2500);
      } else {
        // Handle unsuccessful status codes (e.g., 400, 500)
        setMsg("Erreur lors de l'ajout de l'utilisateur"); // Set error message
      }
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  //boite de dialogue buttons functions to navigate
  const handleReturnToList = (e) => {
    // Redirect to users list
    e.preventDefault(); //on doit l'ajouter sinon l'ajout ne fonctionnera pas
    navigate("/users");
  };

  const handleContinueAdding = () => {
    setShowConfirmationDialog(false);
    // Continuer l'ajout
  };

  return (
    <div>
      {/* Main Content */}
      <div id="content">
        {/* Begin Page Content */}
        <div className="container-fluid">
          {/* Page Heading */}
          <h1 className="h3 mb-2 text-gray-800">Ajouter un utilisateur</h1>
          {/* Add some space */}
          <span className="mr-3"></span>

          <div className="card shadow mb-4">
            <div className="card-body">
              {/* Add some space */}
              <span className="mr-2"></span>

              <div>
                
              {msg && (
                  <div className="d-flex justify-content-center">
                    <div
                      className=" text-center col-md-3 alert alert-success"
                      role="alert"
                    >
                      {msg}
                    </div>
                  </div>
                )}

                {/* Add Success Message */}
                {addSuccessMessage && (
                  <div className="d-flex justify-content-center">
                    <div
                      className=" text-center col-md-3 alert alert-success"
                      role="alert"
                    >
                      {addSuccessMessage}
                    </div>
                  </div>
                )}
                {/* end Add Success Message */}

                {/* boite de dialogue */}
                {showConfirmationDialog && (
                  <div className="col md-6 d-flex justify-content-center">
                    <div className="confirmation-dialog">
                      <br></br>
                      <p>
                        Voulez-vous retourner à la liste des utilisateurs ou
                        continuer l'ajout ?
                      </p>
                      <br />

                      <div>
                        {/* <Link to="/users"> */}
                        <button
                          style={{ backgroundColor: "#648de5" }}
                          onClick={
                            handleReturnToList
                          } /**il faut un bouton et onClick pour naviguer à l'autre page suite à un clic sur bouton sinon link to ("/users")va retourner automatiquement sans clic sur bouton  , */
                        >
                          Retourner à la liste des utilisateurs
                        </button>
                        {/* </Link> */}

                        <button
                          style={{ backgroundColor: "#648de5" }}
                          onClick={handleContinueAdding}
                        >
                          Continuer l'ajout
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {/* end boite de dialogue */}
              <br></br>

              {/* fin boite de dialogue */}

              {/* Add some space */}
              <span className="mr-3"></span>

              {/* Form */}
              <form className="user" onSubmit={handleSubmit(saveUser)}>
                <div className="form-group row">
                  <div className="col-sm-6 mb-3 mb-sm-0">
                    <input
                      type="text"
                      className="form-control form-control-user"
                      id="exampleLastName"
                      placeholder="Nom"
                      //name="lastname"
                      value={lastname}
                      {...register("lastname")}
                      onChange={(e) => setLastname(e.target.value)}
                    />
                    {/* afficher le message d'erreur de valisation  */}
                    <p style={{ color: "red" }}>{errors.lastname?.message}</p>
                  </div>
                  <div className="col-sm-6">
                    <input
                      type="text"
                      className="form-control form-control-user"
                      id="exampleFirstName"
                      placeholder="Prénom"
                      {...register("name")}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <p style={{ color: "red" }}>{errors.name?.message}</p>
                  </div>
                </div>

                <div className="form-group row">
                  <div className="form-group col-sm-6  mb-3 mb-sm-0">
                    <input
                      type="text"
                      className="form-control form-control-user"
                      id="exampleAddress"
                      placeholder="Adresse "
                      {...register("address")}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                    <p style={{ color: "red" }}>{errors.address?.message}</p>
                  </div>
                  <div className="form-group col-sm-6 ">
                    <input
                      type="text"
                      className="form-control form-control-user"
                      id="examplePhone"
                      placeholder="Téléphone"
                      {...register("telephone")}
                      value={telephone}
                      onChange={(e) => setTelephone(e.target.value)}
                    />
                    <p style={{ color: "red" }}>{errors.telephone?.message}</p>
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-sm-6 mb-3 mb-sm-0">
                    <input
                      type="email"
                      className="form-control form-control-user"
                      id="exampleMail"
                      placeholder="E-mail"
                      {...register("email")}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <p style={{ color: "red" }}>{errors.email?.message}</p>
                  </div>
                  <div className="col-sm-6">
                    <input
                      type="password"
                      className="form-control form-control-user"
                      id="examplePassword"
                      placeholder="Mot de passe "
                      {...register("password")}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <p style={{ color: "red" }}>{errors.password?.message}</p>
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-sm-6 mb-3 mb-sm-0">
                    <input
                      type="password"
                      className="form-control form-control-user"
                      id="exampleConfPassword"
                      placeholder="Confirmer mot de passe"
                      {...register("confPassword")}
                      value={confPassword}
                      onChange={(e) => setConfPassword(e.target.value)}
                    />
                    <p style={{ color: "red" }}>
                      {errors.confPassword?.message}
                    </p>
                  </div>
                  <div className="col-sm-6">
                    <label>Role</label>

                    <Form.Select
                      className="form-control"
                      {...register("role", { required: true })}
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option>Open this select menu</option>
                      <option value="admin">admin</option>
                      <option value="secretaire">Secretaire</option>
                      <option value="medecin">Medecin</option>
                    </Form.Select>
                    <p style={{ color: "red" }}>{errors.role?.message}</p>
                  </div>
                </div>
                <div className="col-sm-3 mx-auto">
                  <button
                    type="submit"
                    className="btn btn-primary btn-user btn-block"
                  >
                    <Link to="/acceuil"></Link>
                    Ajouter Utilisateur
                  </button>
                </div>
              </form>
              <hr />
            </div>
          </div>
        </div>
        {/* /.container-fluid */}
      </div>
      {/* End of Main Content */}
    </div>
  );
}

export default FormAddUser;
