import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function FormEditUser() {
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
  const { id } = useParams();

  useEffect(() => {
    const getUserById = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/users/${id}`);
        setName(response.data.name);
        setLastname(response.data.lastname);
        setAddress(response.data.address);
        setTelephone(response.data.telephone);
        setEmail(response.data.email);
  
        setRole(response.data.role);
        console.log(response.data);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getUserById();
  }, [id]);
  const updateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/users/${id}`, {
        name: name,
        email: email,
        password: password,
        // confPassword: confPassword,
        role: role,
        lastname: lastname,
        address: address,
        telephone: telephone,
      });
      navigate("/users");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
    console.log(confPassword)
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

          <div className="card shadow mb-4">
            <div className="card-body">
              {/* Add some space */}
              <span className="mr-2"></span>
              {/* Form */}
              <form className="user" onSubmit={updateUser}>
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
                  {/* <div className="col-sm-6 mb-3 mb-sm-0">
                    <input
                      type="password"
                      className="form-control form-control-user"
                      id="exampleRepeatPassword"
                      placeholder="Confirmer mot de passe"
                      value={confPassword}
                      onChange={(e) => setConfPassword(e.target.value)}
                    />
                  </div> */}
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
