import React, { useState } from "react";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./FormAddUser.css"

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

  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [isAddingUser, setIsAddingUser] = useState(false);


  const saveUser = async (e) => {
    e.preventDefault();
    try {
      const response=await axios.post("http://localhost:5000/users", {
        name: name,
        email: email,
        password: password,
        confPassword: confPassword,
        role: role,
        lastname: lastname,
        address: address,
        telephone: telephone,
      });
      navigate("/users");

      //boite de dialogue

      if (response.status === 201) {
        setShowConfirmationDialog(true); // Show confirmation dialog
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
              {/* Form */}
              <form className="user" onSubmit={saveUser}>
                <div className="form-group row">
                  <div className="col-sm-6 mb-3 mb-sm-0">
                    <input
                      type="text"
                      className="form-control form-control-user"
                      id="exampleFirstName"
                      placeholder="Nom"
                      value={lastname}
                      onChange={(e) => setLastname(e.target.value)}
                    />
                  </div>
                  <div className="col-sm-6">
                    <input
                      type="text"
                      className="form-control form-control-user"
                      id="exampleLastName"
                      placeholder="Prénom"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <div className="form-group col-sm-6  mb-3 mb-sm-0">
                    <input
                      type="text"
                      className="form-control form-control-user"
                      id="exampleInputEmail"
                      placeholder="Adresse "
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                  <div className="form-group col-sm-6 ">
                    <input
                      type="text"
                      className="form-control form-control-user"
                      id="exampleInputEmail"
                      placeholder="Téléphone"
                      value={telephone}
                      onChange={(e) => setTelephone(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-sm-6 mb-3 mb-sm-0">
                    <input
                      type="email"
                      className="form-control form-control-user"
                      id="exampleInputPassword"
                      placeholder="E-mail"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="col-sm-6">
                    <input
                      type="password"
                      className="form-control form-control-user"
                      id="exampleInputPassword"
                      placeholder="Mot de passe "
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-sm-6 mb-3 mb-sm-0">
                    <input
                      type="password"
                      className="form-control form-control-user"
                      id="exampleRepeatPassword"
                      placeholder="Confirmer mot de passe"
                      value={confPassword}
                      onChange={(e) => setConfPassword(e.target.value)}
                    />
                  </div>
                  <div className="col-sm-6">
                    <label>Role</label>

                    <Form.Select
                      className="form-control"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    >
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
                    Ajouter Utilisateur
                  </button>

{/* 
                  {showConfirmationDialog && (
  <div className="confirmation-dialog modal-dialog" >
    <p>Utilisateur ajouté avec succès. Voulez-vous retourner à la liste des utilisateurs ?</p>
    <button onClick={() => window.location.href = '/users'}>Retourner à la liste des utilisateurs </button>
    <button onClick={() => setShowConfirmationDialog(false)}>Continuer l'ajout</button>
  </div>
)} */}
                
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
