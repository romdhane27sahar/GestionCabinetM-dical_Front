import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";

function UserList() {
  const [users, setUsers] = useState([]);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [deleteSuccessMessage, setDeleteSuccessMessage] = useState(null); // State for success message

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await axios.get("http://localhost:5000/users");
    setUsers(response.data);
  };

  // const deleteUser = async (userId) => {
  //   await axios.delete(`http://localhost:5000/users/${userId}`);
  //   getUsers();
  // };

  const deleteUser = async (userId) => {
    setUserIdToDelete(userId); // Store the user ID to be deleted
    setShowConfirmationDialog(true); // Open confirmation dialog
  };

  // const handleConfirmDelete = async () => {
  //   await axios.delete(`http://localhost:5000/users/${userIdToDelete}`);
  //   getUsers();

  //   setShowConfirmationDialog(false); // Close confirmation dialog
  // };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/users/${userIdToDelete}`);//delete method(controller) call
      setDeleteSuccessMessage("Supprimé avec succès !"); // Set success message
      getUsers(); //re-envoi liste users
      setTimeout(() => {
        setDeleteSuccessMessage(null); // Reset success message after 3 seconds
      }, 2000);
    } catch (error) {
      // Handle deletion error (optional)
      console.error("Error deleting user:", error);
    } finally { // garantir que la boîte de dialogue de confirmation est toujours fermée après que la tentative de suppression d'un utilisateur ait été faite, qu'elle soit réussie ou non
      setShowConfirmationDialog(false); // Close confirmation dialog
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmationDialog(false); // Close confirmation dialog
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

          {/* Confirmation Dialog */}
          {showConfirmationDialog && (
            <div className="col md-6 d-flex justify-content-center">
              <div className="confirmation-dialog">
                <br />
                <p>Êtes-vous sûr de vouloir supprimer cet utilisateur ?</p>

                <div>
                  <button
                    style={{ backgroundColor: "#3da35d" }}
                    onClick={handleConfirmDelete}
                  >
                    Confirmer
                  </button>
                  <button
                    style={{ backgroundColor: "#b7b7a4" }}
                    onClick={handleCancelDelete}
                  >
                    Annuler
                  </button>
                </div>
              </div>
            </div>
          )}
          {/* End Confirmation Dialog */}

          {/* Add some space */}
          <span className="mr-3"></span>

          {/* Delete Success Message */}
          {deleteSuccessMessage && (
            <div className="d-flex justify-content-center">
              <div
                className=" text-center col-md-3 alert alert-success"
                role="alert"
              >
                {deleteSuccessMessage}
              </div>
            </div>
          )}
        {/* end Delete Success Message */}

          {/* DataTable Example */}
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
