import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
//validation imports
import * as yup from "yup"; // Import Yup
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

function FormEditUser() {

  const navigate = useNavigate();

  //recupérer l'id de l'url 
  const { id } = useParams();//useParams est un hook de React Router qui permet de récupérer les paramètres de l'URL dans un composant React

//Delete Success Message 
  const [editSuccessMessage, seteditSuccessMessage] = useState("");

  // Define Yup schema for validation
  const editSchema = yup.object().shape({
    name: yup
      .string()
      .min(3, "Prénom contient minimum 3 lettres")
      .test(
        "no-digits",
        "Le nom ne doit pas contenir de chiffres !",
        (value) => !/\d/.test(value)
      ),
    lastname: yup
      .string()
      .min(3, "Nom contient minimum 3 lettres")
      .test(
        "no-digits",
        "Le nom ne doit pas contenir de chiffres",
        (value) => !/\d/.test(value)
      ),
    address: yup.string().required("Adresse est obligatoire !"),
    email: yup
      .string()
      .email("Email invalide")
      .matches(/^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,6}/, "Email invalide"),
    telephone: yup
      .string()
      .matches(/^\d{8}$/, "Numero téléphone doit est de 8 chiffres"),
    password: yup
      .string()
      .nullable() //nullable + not required : si je n'ai pas modifié le mot de passe et je l'ai laissé vide , il l'accepte comme champs vide et effectue la modification juste du nom par exple
      .notRequired()
      .test(
        "password-valid",//nom du test 
        "Mot de passe doit etre au minimum de longueur 8 et comporter au moins 1 lettre majuscule, 1 lettre miniscule, 1 caractère spécial et des chiffres",
        (value) => {
          if (!value) return true; // Si le champ de mot de passe est vide, la validation réussit ,il est considéré comme valide lorsqu'il est vide.
          return (//&& equivaut and ici 
            value.length >= 8 &&
            /[!@#$%^&*(),.?":{}|<>]/.test(value) &&
            /[0-9]/.test(value) &&
            /[A-Z]/.test(value) &&
            /[a-z]/.test(value)
          );
        }
      ),
    role: yup
      .string()
      .oneOf(
        ["admin", "secretaire", "medecin"],
        "Veuillez selectionner un role !"
      ),
  });

  const {
    register,
    //utilisé pour connecter chaque champ du formulaire à react-hook-form. Cela permet à react-hook-form de suivre les valeurs de ces champs et de les inclure dans la soumission du formulaire.
    handleSubmit,
    //handleSubmit est une méthode fournie par react-hook-form pour gérer la soumission du formulaire. Elle prend en charge la validation des données du formulaire avant de les transmettre à la fonction spécifiée (updateUser dans ce cas).
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(editSchema),
    //yupResolver est utilisé pour faire en sorte que react-hook-form utilise le schéma de validation défini par yup.
  });

  useEffect(() => {
    const getUserById = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/users/${id}`);
        const { name, lastname, address, telephone, email, role } = response.data;
        setValue("name", name);     //setValue de react form hook permet de définir les valeurs initiales des champs du formulaire sans avoir besoin de l'attribut value dans les éléments <input>. react-hook-form se charge de mettre à jour les états des champs en interne.
        setValue("lastname", lastname);
        setValue("address", address);
        setValue("telephone", telephone);
        setValue("email", email);
        setValue("role", role);
      } catch (error) {
        console.error(error.response ? error.response.data.msg : error.message);
      }
    };
    getUserById();
  }, [id, setValue]);

  const updateUser = async (data) => {
    try {
      await axios.patch(`http://localhost:5000/users/${id}`, data);
      seteditSuccessMessage("Modification effectuée avec succès");
      setTimeout(() => {
        navigate("/users");
      }, 2000);
    } catch (error) {
      console.error(error.response ? error.response.data.msg : error.message);
    }
  };

  return (
    <div>
      {/* Main Content */}
      <div id="content">
        {/* Begin Page Content */}
        <div className="container-fluid">
          {/* Page Heading */}
          <h1 className="h3 mb-2 text-gray-800">Modifier un utilisateur</h1>
          {/* Add some space */}
          <span className="mr-3"></span>

          {/* Delete Success Message */}
          {editSuccessMessage && (
            <div className="d-flex justify-content-center">
              <div
                className=" text-center col-md-3 alert alert-success"
                role="alert"
              >
                {editSuccessMessage}
              </div>
            </div>
          )}
         {/* end Delete Success Message */}

          <div className="card shadow mb-4">
            <div className="card-body">
              {/* Add some space */}
              <span className="mr-2"></span>
              {/* Form */}
              <form className="user" onSubmit={handleSubmit(updateUser)}>
                <div className="form-group row">
                  <div className="col-sm-6 mb-3 mb-sm-0">
                    <input
                      type="text"
                      className="form-control form-control-user"
                      id="exampleLastName"
                      placeholder="Nom"
                      name="lastname"
                      {...register("lastname")}
                    />
                    <p style={{ color: "red" }}>{errors.lastname?.message}</p>
                  </div>
                  <div className="col-sm-6">
                    <input
                      type="text"
                      className="form-control form-control-user"
                      id="exampleName"
                      placeholder="Prénom"
                      name="name"
                      {...register("name")}
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
                      placeholder="Adresse"
                      name="address"
                      {...register("address")}
                    />
                    <p style={{ color: "red" }}>{errors.address?.message}</p>
                  </div>
                  <div className="form-group col-sm-6">
                    <input
                      type="text"
                      className="form-control form-control-user"
                      id="examplePhone"
                      placeholder="Téléphone"
                      name="telephone"
                      {...register("telephone")}
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
                      name="email"
                      {...register("email")}
                    />
                    <p style={{ color: "red" }}>{errors.email?.message}</p>
                  </div>
                  <div className="col-sm-6">
                    <input
                      type="password"
                      className="form-control form-control-user"
                      id="exampleInputPassword"
                      placeholder="Mot de passe"
                      name="password"
                      {...register("password")}
                    />
                    <p style={{ color: "red" }}>{errors.password?.message}</p>
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-sm-6">
                    <label>Role</label>
                    <Form.Select className="form-control" {...register("role")}>
                      <option>Open this select menu</option>
                      <option value="admin">admin</option>
                      <option value="secretaire">Secretaire</option>
                      <option value="medecin">Medecin</option>
                    </Form.Select>
                  </div>
                </div>
                <div className="col-sm-3 mx-auto">
                  <button
                    type="submit"
                    className="btn btn-primary btn-user btn-block"
                  >
                    <Link to="/acceuil"></Link>
                    Modifier Utilisateur
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

export default FormEditUser;

/**1.des le lancement du component FormEditUser : requete getById pour recuperer les donnees  + les afficher dans les inputs grace à setValue(connait le champs grace à register)
 * 2/modification et clic sur btn modifier --> handlesubmit va faire la validation de chaque champs selon la schema (register lui permet de faire la correspondance
 * 3/si validation réussie --> handleSubmit appelle updateUser avec les donnees validées (dans l'ojet data) .une requete d'update prend place )
 */
