import React from "react";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { BiSolidConversation } from "react-icons/bi";
import { FaFolderOpen } from "react-icons/fa";
import { MdInfo } from "react-icons/md";
import "./ListPatients.css"

function ListPatients() {
  
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
                  <th>Rendez-vous</th>
                  <th>Prochain Rendez-vous</th>

                  <th>Consultations</th>
                  <th>Dossier Medical</th>
                  <th>Détails Patient</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td className="text-center">1</td>
                  <td className="text-center">salhi</td>
                  <td className="text-center">ali</td>
                  <td className="text-center">Homme</td>
                  <td className="text-center">27/04/2000</td>
                  <td className="text-center">5/05/2024</td>
                  <td className="text-center" >
                  <input type="date" className="form-control" />
                  </td>
                  <td className="text-center col-md-2">
                    <BiSolidConversation />
                  </td>
                  <td className="text-center col-md-2">
                    <FaFolderOpen />
                  </td>
                  <td className="text-center col-md-2">
                    
                  <Link
                            to={"/detailsPatientMed"}
                            class=" btn "
                          >
                    <MdInfo />
                    </Link>
                  </td>

                  <td >
                  <div style={{ display: 'flex' }}>
                          <button
                            href="#"
                            class="btn btn-danger btn-circle btn-sm"
                           
                          >
                            <i class="fas fa-trash"></i>
                          </button>
                          {/* Add some space */}

                          <Link
                            to={`/fiches/edit`}
                            class="btn btn-primary btn-circle btn-sm"
                          >
                            <FaEdit />
                          </Link>
                          </div>
                    </td>
                </tr>
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

export default ListPatients;
