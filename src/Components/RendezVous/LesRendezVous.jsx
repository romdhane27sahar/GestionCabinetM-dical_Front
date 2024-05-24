import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";

import "./FormAddRendezVous.css";
//import TimePicker from "react-bootstrap-time-picker";

function LesRendezVous() {
  const [rendezVous, setRendezVous] = useState([]);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [rendezVousIdToDelete, setRendezVousIdToDelete] = useState(null);
  const [deleteSuccessMessage, setDeleteSuccessMessage] = useState(null); // State for success message

  useEffect(() => {
    getRendezVous();
  }, []);

  const getRendezVous = async () => {
    const response = await axios.get("http://localhost:5000/rendezVousList");
    setRendezVous(response.data);
    const rendezVousList = response.data;
    
    console.log(rendezVousList);

    const rendezVousWithPatientDetails = await Promise.all(
      rendezVousList.map(async (rendezVous) => {
        try {
          const patientResponse = await axios.get(`http://localhost:5000/fichePatientt/${rendezVous.fichePatientId}`);
          const patient = patientResponse.data;
          console.log(`Détails du patient pour ID ${rendezVous.fichePatientId} :`, patient);
               
        // Check if prochainRendezVou exists and has the needed properties
        let prochainRendezVouDetails = {};

        if (rendezVous.prochainRendezVou) {
          prochainRendezVouDetails = {
            dateProchainRv: rendezVous.prochainRendezVou.dateProchainRv,
            heureProchainRv: rendezVous.prochainRendezVou.heureProchainRv,
          };
        }

        if (patient) {
          return {
            ...rendezVous,
            name: patient.name,
            lastname: patient.lastname,
            ...prochainRendezVouDetails,
          };
        } else {
          console.warn(`Pas de patient trouvé pour ID ${rendezVous.fichePatientId}`);
          return {
            ...rendezVous,
            name: "Unknown",
            lastname: "Unknown",
            ...prochainRendezVouDetails,
          };
        }
      } catch (error) {
        console.error(`Erreur lors de la récupération des détails du patient pour rendez-vous ID ${rendezVous.uuid}:`, error);
        return {
          ...rendezVous,
          name: "Unknown",
          lastname: "Unknown",
        };
      }
    })
  );

  setRendezVous(rendezVousWithPatientDetails);
  };

  const deleteRendezVous = async (rendezVousId) => {
    setRendezVousIdToDelete(rendezVousId); // Store the user ID to be deleted
    setShowConfirmationDialog(true); // Open confirmation dialog
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/rendezVous/${rendezVousIdToDelete}`);//delete method(controller) call
      setDeleteSuccessMessage("Supprimé avec succès !"); // Set success message
      getRendezVous();
      
      setTimeout(() => {
        setDeleteSuccessMessage(null); // Reset success message after 3 seconds
      }, 2000);
    } catch (error) {
      // Handle deletion error (optional)
      console.error("Erreur lors de suppression du rendez-vous:", error);
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
          <h1 className="h3 mb-2 text-gray-800">Liste des rendez-vous</h1>

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
                      <th className="text-center">N°</th>  
                      <th className="text-center">Nom</th>
                      <th className="text-center">Prénom</th>
                      <th className="text-center">Date rendez-vous</th>
                       <th className="text-center">Heure rendez-vous</th>
                       <th className="text-center">Date prochain rendez-vous</th>
                       <th className="text-center">Heure prochain rendez-vous</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {rendezVous.map((rendezVous, index) => (
                      <tr key={rendezVous.uuid}>
                        <td>{index + 1}</td>
                        <td>{rendezVous.name}</td>
                        <td>{rendezVous.lastname}</td>
                        <td>{rendezVous.dateRendezVous}</td>
                        <td>{rendezVous.heureRendezVous}</td>
                        <td>{rendezVous.dateProchainRv}</td>

                        {/* <td className="text-center">
                          <TimePicker start="7:00" end="21:00" step={30} />
                        </td> */}
                        <td>{rendezVous.heureProchainRv}</td>


                        <td>
                          <div style={{ display: "flex" }}>
                            <button
                              href="#"
                              class="btn btn-danger btn-circle btn-sm"
                              onClick={() => deleteRendezVous(rendezVous.uuid)}
                            >
                              <i class="fas fa-trash"></i>
                            </button>

                            <Link
                              to={`/rendezVous/edit`}
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

export default LesRendezVous;
