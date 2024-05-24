import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
// import { BiSolidConversation } from "react-icons/bi";
// import { FaFolderOpen } from "react-icons/fa";
// import { MdInfo } from "react-icons/md";

import "./ListPatients.css"

function FichesPatients() {

  const [fiches, setFiches] = useState([]);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [ficheIdToDelete, setFicheIdToDelete] = useState(null);
  const [deleteSuccessMessage, setDeleteSuccessMessage] = useState(null); // State for success message

  useEffect(() => {
    getFiches();
  }, []);

  const getFiches = async () => {
    const response = await axios.get("http://localhost:5000/fichePatient");
    setFiches(response.data);
  };

  
  const deleteFiche = async (ficheId) => {
    setFicheIdToDelete(ficheId); // Store the user ID to be deleted
    setShowConfirmationDialog(true); // Open confirmation dialog
  };

 

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/fichePatient/${ficheIdToDelete}`);//delete method(controller) call
      setDeleteSuccessMessage("Supprimée avec succès !"); // Set success message
      getFiches(); //re-envoi liste fiches
      setTimeout(() => {
        setDeleteSuccessMessage(null); // Reset success message after 3 seconds
      }, 2000);
    } catch (error) {
      // Handle deletion error (optional)
      console.error("Erreur lors de suppression de la fiche:", error);
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
        <h1 className="h3 mb-2 text-gray-800">Liste des patients</h1>

        {/* Add some space */}
        <span className="mr-3"></span>

{/* Confirmation Dialog */}
{showConfirmationDialog && (
            <div className="col md-6 d-flex justify-content-center">
              <div className="confirmation-dialog">
                <br />
                <p>Êtes-vous sûr de vouloir supprimer cette fiche ?</p>

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
                  <th>Nom</th>
                  <th>Prénom</th>
                  <th>Sexe</th>
                  <th>Date Naissance</th>
                  <th>Adresse</th>
                  <th>Téléphone</th>
                  <th>Email</th>
                  <th>Numéro sécurité sociale</th>

                 
                 
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
              {fiches.map((fiche, index) => (
                      <tr key={fiche.uuid}>
                           <td>{index + 1}</td>
                        <td>{fiche.name}</td>
                        <td>{fiche.lastname}</td>
                        <td>{fiche.sexe}</td>
                        <td>{fiche.dateNaiss}</td>
                        <td>{fiche.address}</td>
                        <td>{fiche.telephone}</td>
                        <td>{fiche.email}</td>
                        <td>{fiche.numSecuriteSoc}</td>
                     
                        <td >
                  <div style={{ display: 'flex' }}>
                          <button
                            href="#"
                            class="btn btn-danger btn-circle btn-sm"
                            onClick={() => deleteFiche(fiche.uuid)}
                           
                          >
                            <i class="fas fa-trash"></i>
                          </button>

                          <Link
                            to={`/fiches/edit/${fiche.uuid}`}
                            class="btn btn-primary btn-circle btn-sm"
                          >
                            <FaEdit />
                          </Link>
                          </div>
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

export default FichesPatients;
