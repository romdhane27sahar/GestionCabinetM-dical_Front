import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await axios.get("http://localhost:5000/users");
    setUsers(response.data);
  };

  const deleteUser = async (userId) => {
    await axios.delete(`http://localhost:5000/users/${userId}`);
    getUsers();
  };

  return (
    <div>
      {/* Main Content */}
      <div id="content">
        {/* Begin Page Content */}
        <div className="container-fluid">
          {/* Page Heading */}
          <h1 className="h3 mb-2 text-gray-800">Liste des utilisateurs</h1>

          {/* Add some space */}
          <span className="mr-3"></span>

          {/* DataTales Example */}
          <div className="card shadow mb-4">
            <div className="card-body">
              <div className="table-responsive">
                <table
                  className="table table-bordered"
                  id="dataTable"
                  width="100%"
                  cellSpacing={0}
                >
                  <thead>
                    <tr>
                      <th>N°</th>
                      <th>Prénom</th>
                      <th>Nom</th>
                      <th>Adresse</th>
                      <th>Téléphone</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {users.map((user, index) => (
                      <tr key={user.uuid}>
                        <td>{index + 1}</td>
                        <td>{user.name}</td>
                        <td>{user.lastname}</td>
                        <td>{user.address}</td>
                        <td>{user.telephone}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td className="text-center">
                          <button
                            href="#"
                            class="btn btn-danger btn-circle btn-sm"
                            onClick={() => deleteUser(user.uuid)}
                          >
                            <i class="fas fa-trash"></i>
                          </button>
                          {/* Add some space */}
                          <span className="mr-2"></span>

                          <Link
                            to={`/users/edit/${user.uuid}`}
                            class="btn btn-primary btn-circle btn-sm"
                          >
                            <FaEdit />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {/* /.container-fluid */}
      </div>
      {/* End of Main Content */}
    </div>
  );
}

export default UserList;
