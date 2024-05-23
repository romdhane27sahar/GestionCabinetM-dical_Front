import React, { useState } from "react";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./FormNewFiche.css";

//validation imports

import * as yup from "yup"; // Import Yup
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

function FormEditDetails() {
  //   const [name, setName] = useState("");
  //   const [email, setEmail] = useState("");
  //   const [password, setPassword] = useState("");
  //   const [confPassword, setConfPassword] = useState("");
  //   const [role, setRole] = useState("");
  //   const [msg, setMsg] = useState("");

  //   const [lastname, setLastname] = useState("");
  //   const [address, setAddress] = useState("");
  //   const [telephone, setTelephone] = useState("");

  //   const navigate = useNavigate();

  //   //confirmation dialog
  //   const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  //   //add success message state
  //   const [addSuccessMessage, setaddSuccessMessage] = useState(null); // State for success message

  //   // Define Yup schema for validation
  //   const schema = yup.object().shape({
  //     name: yup
  //       .string()
  //       .min(3, "Prénom contient minimum 3 lettres")
  //       .required("Prénom est obligatoire !")
  //       .test(
  //         "no-digits",
  //         "Le nom ne doit pas contenir de chiffres !",
  //         (value) => !/\d/.test(value)
  //       ),

  //     lastname: yup
  //       .string()
  //       .min(3, "Nom contient minimum 3 lettres")
  //       .required("Nom est obligatoire !")
  //       .test(
  //         "no-digits",
  //         "Le nom ne doit pas contenir de chiffres",
  //         (value) => !/\d/.test(value)
  //       ),

  //     address: yup.string().required("Adresse est obligatoire !"),

  //     email: yup
  //       .string()
  //       .email("Email invalide")
  //       .required("Email est obligatoire !")
  //       .matches(/^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,6}/, "Email invalide"),

  //     telephone: yup
  //       .string()
  //       .matches(/^\d{8}$/, "Numero téléphone doit est de 8 chiffres")
  //       .required("téléphone est un champs obligatoire"),

  //     password: yup
  //       .string()
  //       .min(8, "Mot de passe trop court (minimum 8 caractères)")
  //       .required("Mot de passe est obligatoire !")
  //       .matches(
  //         /[!@#$%^&*(),.?":{}|<>]/,
  //         "Mot de passe doit contenir au moins un caractère spécial"
  //       )
  //       .matches(/[0-9]/, "Mot de passe doit contenir au moins un chiffre")
  //       .matches(
  //         /[A-Z]/,
  //         "Mot de passe doit contenir au moins une lettre majuscule "
  //       )
  //       .matches(
  //         /[a-z]/,
  //         "Mot de passe doit contenir au moins une lettre miniscule"
  //       ),

  //     confPassword: yup
  //       .string()
  //       .oneOf(
  //         [yup.ref("password"), null],
  //         "Les mots de passe doivent correspondre"
  //       )
  //       .required("Confirmer mot de passe est obligatoire !"),

  //     role: yup
  //       .string()

  //       .oneOf(
  //         ["admin", "secretaire", "medecin"],
  //         "Veuillez selectionner un role !"
  //       ),
  //   });

  //   //execute the schema validation to the form
  //   const {
  //     register,
  //     handleSubmit,
  //     formState: { errors },
  //   } = useForm({
  //     resolver: yupResolver(schema),
  //   });

  //   //add function
  //   const saveUser = async (e) => {
  //     //e.preventDefault();

  //     try {
  //       const response = await axios.post("http://localhost:5000/users", {
  //         name: name,
  //         email: email,
  //         password: password,
  //         confPassword: confPassword,
  //         role: role,
  //         lastname: lastname,
  //         address: address,
  //         telephone: telephone,
  //       });
  //       //navigate("/users");

  //       //boite de dialogue
  //       if (response.status === 201) {
  //         setShowConfirmationDialog(true); // Show confirmation dialog

  //         setaddSuccessMessage("Utilisateur ajouté avec succès !"); // Set success message
  //         setTimeout(() => {
  //           setaddSuccessMessage(null); // Reset success message after 3 seconds
  //         }, 2500);
  //       } else {
  //         // Handle unsuccessful status codes (e.g., 400, 500)
  //         setMsg("Erreur lors de l'ajout de l'utilisateur"); // Set error message
  //       }
  //     } catch (error) {
  //       if (error.response) {
  //         setMsg(error.response.data.msg);
  //       }
  //     }
  //   };

  //   //boite de dialogue buttons functions to navigate
  //   const handleReturnToList = (e) => {
  //     // Redirect to users list
  //     e.preventDefault(); //on doit l'ajouter sinon l'ajout ne fonctionnera pas
  //     navigate("/users");
  //   };

  //   const handleContinueAdding = () => {
  //     setShowConfirmationDialog(false);
  //     // Continuer l'ajout
  //   };

  return (
    <div>
      {/* Main Content */}
      <div id="content">
        {/* Begin Page Content */}
        <div className="container-fluid">
          {/* Page Heading */}
          <h1 className="h3 mb-2 text-gray-800">Modifier détails patient</h1>
          {/* Add some space */}
          <span className="mr-3"></span>

          <div className="card shadow mb-4">
            <div className="card-body">
              {/* Add some space */}
              <span className="mr-2"></span>

              {/* Add some space */}
              <span className="mr-3"></span>

              {/* Form */}
              <form className="user">
                <div className="form-group row">
                  <div className="col-sm-6 mb-3 mb-sm-0">
                    <input
                      type="text"
                      className="form-control form-control-user"
                      id="exampleLastName"
                      placeholder="Adresse"
                      //name="lastname"
                      //   value={lastname}
                      //   {...register("lastname")}
                      //   onChange={(e) => setLastname(e.target.value)}
                    />
                    {/* afficher le message d'erreur de valisation  */}
                    {/* <p style={{ color: "red" }}>{errors.lastname?.message}</p> */}
                  </div>
                  <div className="form-group col-sm-6 ">
                    <input
                      type="text"
                      className="form-control form-control-user"
                      id="examplePhone"
                      placeholder="Téléphone"
                      //   {...register("telephone")}
                      //   value={telephone}
                      //   onChange={(e) => setTelephone(e.target.value)}
                    />
                    {/* <p style={{ color: "red" }}>{errors.telephone?.message}</p> */}
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-sm-6">
                    <input
                      type="email"
                      className="form-control form-control-user"
                      id="exampleFirstName"
                      placeholder="Email"
                      //   {...register("name")}
                      //   value={name}
                      //   onChange={(e) => setName(e.target.value)}
                    />
                    {/* <p style={{ color: "red" }}>{errors.name?.message}</p> */}
                  </div>

                  <div className="col-sm-6 mb-3 mb-sm-0">
                    <input
                      type="text"
                      className="form-control form-control-user"
                      id="exampleMail"
                      placeholder="numSecSociale"
                      //   {...register("email")}
                      //   value={email}
                      //   onChange={(e) => setEmail(e.target.value)}
                    />
                    {/* <p style={{ color: "red" }}>{errors.email?.message}</p> */}
                  </div>
                </div>


                


                <div className="col-sm-3 mx-auto d-flex space ">
                  <button
                    type="submit"
                    className="btn btn-primary btn-user btn-block heightt "
              
                    style={{ marginRight: '15px', marginTop:'20', marginBottom:'30',borderRadius: '15px',  }}

                  >
                    <Link to="/acceuil"></Link>
                    Modifier détails
                  </button>
                  <span> </span>
                  <span> </span>

                  <button
                    className="btn btn-light btn-user btn-block heightt anuller"
                    style={{ marginLeft: '10px',marginTop:'20',marginBottom:'30', borderRadius: '10px' }}

                    >
                        Annuller
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

export default FormEditDetails;
