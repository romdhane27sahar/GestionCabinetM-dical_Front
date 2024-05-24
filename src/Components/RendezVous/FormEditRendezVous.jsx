import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./FormAddRendezVous.css";
import TimePicker from "react-bootstrap-time-picker";

//validation imports

import * as yup from "yup"; // Import Yup
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

function FormEditRendezVous() {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [dateRendezVous, setDateRendezVous] = useState("");
  const [heureRendezVous, setHeureRendezVous] = useState("");
  const [msg, setMsg] = useState("");

  const [patients, setPatients] = useState([]);

  const navigate = useNavigate();
 //recupérer l'id de l'url
  const { id } = useParams(); 
 
  
  //edit Success Message
  const [editSuccessMessage, seteditSuccessMessage] = useState("");
  // Define Yup schema for validation
  const schema = yup.object().shape({
    name: yup.string().required("Prénom est obligatoire !"),

    lastname: yup.string().required("Nom est obligatoire !"),

    dateRendezVous: yup
      .date()
      // .nullable()
      .transform((value, originalValue) =>
        originalValue === "" ? null : value
      ) //mesure de précauton (car onChange deja transforme le vide en null ) transforme la valeur vide en null avant la validation: spécifier explicitement à yup que si la valeur originale (originalValue) est une chaîne vide (""), elle doit être transformée en null
      .required("Veuillez choisir la date du rendez-vous !"),

      // heureRendezVous: yup
      // .number()
      // .required("Veuillez choisir l'heure du rendez-vous !")
  
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
  const getPatients = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/fichePatient`);
      setPatients(response.data); // Stocker les données des patients dans l'état local
      //setValue de react form hook permet de définir les valeurs initiales des champs du formulaire sans avoir besoin de l'attribut value dans les éléments <input>. react-hook-form se charge de mettre à jour les états des champs en interne.
    } catch (error) {
      console.error(error.response ? error.response.data.msg : error.message);
    }
  };
  getPatients();
});

useEffect(() => {
  const getRendezVousById = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/rendezVous/${id}`
      );
      const {
        name: name,
        lastname: lastname,
        dateRendezVous: dateRendezVous,
        heureRendezVous: heureRendezVous
      } = response.data;
      console.log(response.data)
      //setValue de react form hook permet de définir les valeurs initiales des champs du formulaire sans avoir besoin de l'attribut value dans les éléments <input>. react-hook-form se charge de mettre à jour les états des champs en interne.
      setValue("lastname", lastname);
     setValue("name",name);
      setValue("dateRendezVous", dateRendezVous);
      setValue("heureRendezVous", heureRendezVous);
    } catch (error) {
      console.error(error.response ? error.response.data.msg : error.message);
    }
  };
  getRendezVousById()
}, [id, setValue]);


const updateRendezVous = async (data) => {
  try {
    await axios.patch(`http://localhost:5000/rendezVousUpdate/${id}`, data);
    seteditSuccessMessage("Modification effectuée avec succès");
    setTimeout(() => {
      navigate("/rendezVousList");
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
          <h1 className="h3 mb-2 text-gray-800">Modifier un rendez-vous</h1>
          {/* Add some space */}
          <span className="mr-3"></span>

          <div className="card shadow mb-4">
            <div className="card-body margin">
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
              <form className="user" onSubmit={handleSubmit(updateRendezVous)}>
                <div className="form-group row">
                  <div className="col-sm-10 mb-3 mb-sm-0">
                  <label>Prénom patient</label>
                    <Form.Select
                      className="form-control "
                      {...register("name", { required: true })}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    >
                   {patients.map((patient) => (
                        <option key={patient.id} value={patient.name}>
                          {patient.name}
                        </option>
                      ))}
                    </Form.Select>
                    {/* afficher le message d'erreur de valisation  */}
                    {/* <p style={{ color: "red" }}>{errors.lastname?.message}</p> */}
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-sm-10">
                  <label>Nom patient</label>
                    <Form.Select
                      className="form-control "
                      {...register("lastname", { required: true })}
                      value={lastname}
                      onChange={(e) => setLastname(e.target.value)}
                    >
                    
                      {patients.map((patient) => (
                        <option key={patient.id} value={patient.lastname}>
                          {patient.lastname}
                        </option>
                      ))}
                    </Form.Select>
                    {/* <p style={{ color: "red" }}>{errors.name?.message}</p> */}
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-sm-10 mb-3 mb-sm-0">
                    {" "}
                    <label>Date Rendez-vous</label>
                    <input
                      type="date"
                      className="form-control form-control-user"
                      id="exampleMail"
                      placeholder="Date rendez-vous "
                      {...register("dateRendezVous")}
                      value={dateRendezVous} // Use the state value for TimePicker
                      onChange={(value) => setDateRendezVous(value)}
                    />
                    {/* <p style={{ color: "red" }}>{errors.email?.message}</p> */}
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-sm-10 mb-3 mb-sm-0">
                    <label>Heure Rendez-vous</label>

                    <TimePicker
                      start="7:00"
                      end="21:00"
                      step={30}
                      {...register("heureRendezVous")}
                      value={heureRendezVous} // Use the state value for TimePicker
                      onChange={(value) => setHeureRendezVous(value)}
                    />

                    {/* <p style={{ color: "red" }}>{errors.email?.message}</p> */}
                  </div>
                </div>

                <div className="col-sm-3  d-flex space ">
                  <button
                    type="submit"
                    className="btn btn-primary btn-user btn-block heightt "
                    style={{
                      marginLeft: "150%",
                      marginRight: "5%",
                     
                      marginTop: "20",
                      marginBottom: "30",
                      borderRadius: "15px",
                      padding:"0px 50px"
                    
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
                      marginLeft: "10%",
                      marginRight: "15%",
                      marginTop: "20",
                      marginBottom: "30",
                      borderRadius: "10px",
                      padding:"0px 50px"
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

export default FormEditRendezVous;
