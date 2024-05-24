import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
//validation imports
import * as yup from "yup"; // Import Yup
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "./FormNewFiche.css";

function FormEditFiche() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [msg, setMsg] = useState("");

  const [lastname, setLastname] = useState("");
  const [address, setAddress] = useState("");
  const [numSecuriteSoc, setNumSecuriteSoc] = useState("");
  const [sexe, setSexe] = useState("");
  const [telephone, setTelephone] = useState("");

  const [dateNaiss, setDateNaiss] = useState("");

  const navigate = useNavigate();

  //recupérer l'id de l'url
  const { id } = useParams(); //useParams est un hook de React Router qui permet de récupérer les paramètres de l'URL dans un composant React

  //Delete Success Message
  const [editSuccessMessage, seteditSuccessMessage] = useState("");

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

    dateNaiss: yup
      .date()
      .nullable()
      .transform((value, originalValue) =>
        originalValue === "" ? null : value
      ) //mesure de précauton (car onChange deja transforme le vide en null ) transforme la valeur vide en null avant la validation: spécifier explicitement à yup que si la valeur originale (originalValue) est une chaîne vide (""), elle doit être transformée en null
      .required("Veuillez choisir la date de naissance !"),

    sexe: yup
      .string()
      .oneOf(["Femme", "Homme"], "Veuillez selectionner le sexe !"),

    numSecuriteSoc: yup
      .string()
      .required("Veuillez entrer le numéro de la sécurité sociale !"),
  });

  //execute the schema validation to the form
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const getFicheById = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/fichePatient/${id}`
        );
        const {
          name,
          lastname,
          address,
          telephone,
          sexe,
          dateNaiss,
          email,
          numSecuriteSoc,
        } = response.data;
        //setValue de react form hook permet de définir les valeurs initiales des champs du formulaire sans avoir besoin de l'attribut value dans les éléments <input>. react-hook-form se charge de mettre à jour les états des champs en interne.
        setValue("lastname", lastname);
        setValue("telephone", telephone);

       setValue("name",name);
        setValue("email", email);
        setValue("sexe", sexe);
        setValue("numSecuriteSoc", numSecuriteSoc);
        setValue("dateNaiss", dateNaiss);
        setValue("address", address);
      } catch (error) {
        console.error(error.response ? error.response.data.msg : error.message);
      }
    };
    getFicheById();
  }, [id, setValue]);

  const updateFiche = async (data) => {
    try {
      await axios.patch(`http://localhost:5000/fichePatient/${id}`, data);
      seteditSuccessMessage("Modification effectuée avec succès");
      setTimeout(() => {
        navigate("/listFichesSec");
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
          <h1 className="h3 mb-2 text-gray-800">Modifier fiche patient</h1>
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

                {/* editSuccess Message */}
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
                {/* end edit Success Message */}
              </div>
              {/* end Add Success Message */}
              <br></br>

              {/* Add some space */}
              <span className="mr-3"></span>

              {/* Form */}
              <form className="user" onSubmit={handleSubmit(updateFiche)}>
                <div className="form-group row">
                  <div className="col-sm-6 mb-3 mb-sm-0">
                    <input
                      type="text"
                      className="form-control form-control-user"
                      id="exampleLastName"
                      placeholder="Nom"
                      name="lastname"
                      {...register("lastname", { required: true })}
                      // value={lastname}
                      // onChange={(e) => setLastname(e.target.value)}
                    />
                    {/* afficher le message d'erreur de valisation  */}
                    <p style={{ color: "red" }}>{errors.lastname?.message}</p>
                  </div>
                  <div className="form-group col-sm-6 ">
                    <input
                      type="text"
                      className="form-control form-control-user"
                      id="examplePhone"
                      placeholder="Téléphone"
                      {...register("telephone")}
                      // value={telephone}
                      // onChange={(e) => setTelephone(e.target.value)}
                    />
                    <p style={{ color: "red" }}>{errors.telephone?.message}</p>
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-sm-6">
                    <input
                      type="text"
                      className="form-control form-control-user"
                      id="exampleFirstName"
                      placeholder="Prénom"
                      name="name"
                      {...register("name")}
                      // value={name}
                      // onChange={(e) => setName(e.target.value)}
                    />
                    <p style={{ color: "red" }}>{errors.name?.message}</p>
                  </div>

                  <div className="col-sm-6 mb-3 mb-sm-0">
                    <input
                      type="email"
                      className="form-control form-control-user"
                      id="exampleMail"
                      placeholder="E-mail"
                      {...register("email")}
                      // value={email}
                      // onChange={(e) => setEmail(e.target.value)}
                    />
                    <p style={{ color: "red" }}>{errors.email?.message}</p>
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-sm-6">
                    <label>Sexe</label>

                    <Form.Select
                      className="form-control"
                      {...register("sexe", { required: true })}
                      // value={sexe}
                      // onChange={(e) => setSexe(e.target.value)}
                    >
                      <option value="">Select</option>
                      <option value="Femme">Femme</option>
                      <option value="Homme">Homme</option>
                    </Form.Select>
                    <p style={{ color: "red" }}>{errors.sexe?.message}</p>
                  </div>
                  <div className="col-sm-6 mb-3 mb-sm-0">
                    <input
                      type="text"
                      className="form-control form-control-user"
                      id="exampleNumSec"
                      placeholder=" Numero de sécurité sociale"
                      {...register("numSecuriteSoc")}
                      // value={numSecuriteSoc}
                      // onChange={(e) => setNumSecuriteSoc(e.target.value)}
                    />
                    <p style={{ color: "red" }}>
                      {errors.numSecuriteSoc?.message}
                    </p>
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-sm-6 mb-3 mb-sm-0">
                    {" "}
                    <label>Date naissance</label>
                    <input
                      type="date"
                      className="form-control form-control-user"
                      id="exampleDateNaiss"
                      placeholder="Date naissance "
                      {...register("dateNaiss")}
                      // value={dateNaiss || ""} //la chaîne vide ("") est utilisée comme valeur par défaut. Ainsi, lorsque dateNaiss est null (lorsque le champ est vide), la chaîne vide est utilisée pour afficher le champ de saisie de date
                      // onChange={(e) => setDateNaiss(e.target.value || null)} //s'assurer que lorsque le champ de saisie de date est vide, la valeur de dateNaiss est correctement définie sur null.
                    />
                    <p style={{ color: "red" }}>{errors.dateNaiss?.message}</p>
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-sm-6 mb-3 mb-sm-0">
                    <input
                      type="text"
                      className="form-control form-control-user"
                      id="exampleAdresse"
                      placeholder="Adresse"
                      {...register("address")}
                      // value={address}
                      // onChange={(e) => setAddress(e.target.value)}
                    />
                    <p style={{ color: "red" }}>{errors.address?.message}</p>
                  </div>
                </div>

                <div className="col-sm-3 mx-auto d-flex space ">
                  <button
                    type="submit"
                    className="btn btn-primary btn-user btn-block heightt "
                    style={{
                      marginRight: "15px",
                      marginTop: "20",
                      marginBottom: "30",
                      borderRadius: "15px",
                    }}
                  >
                    <Link to="/acceuil"></Link>
                    Modifier
                  </button>
                  <span> </span>
                  <span> </span>

                  <button
                    className="btn btn-light btn-user btn-block heightt anuller"
                    style={{
                      marginLeft: "10px",
                      marginTop: "20",
                      marginBottom: "30",
                      borderRadius: "10px",
                    }}
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

export default FormEditFiche;
