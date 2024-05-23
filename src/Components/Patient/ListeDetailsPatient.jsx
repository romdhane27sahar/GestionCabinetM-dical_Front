import React from "react";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { BiSolidConversation } from "react-icons/bi";
import { FaFolderOpen } from "react-icons/fa";
import { MdInfo } from "react-icons/md";

function ListeDetailsPatient() {
  return (
    <div>
      {/* Main Content */}
      <div id="content">
        {/* Begin Page Content */}
        <div className="container-fluid">
          {/* Page Heading */}
          <h1 className="h3 mb-2 text-gray-800">Détails patient</h1>

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
                      <th className="text-center">N°</th>
                      <th className="text-center">Adresse</th>
                      <th className="text-center">Téléphone</th>
                      <th className="text-center">Email</th>
                      <th className="text-center">Numero sécurité sociale</th>
                      
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td className="text-center">1</td>
                      <td className="text-center">sousse</td>
                      <td className="text-center">20055618</td>
                      <td className="text-center">x@gmail.com</td>
                      <td className="text-center">123456789</td>
                      
                      
                      <td>
                        <div style={{ display: "flex",justifyContent: "center", alignItems: "center" }}>
                          <button
                            href="#"
                            class="btn btn-danger btn-circle btn-sm"
                          >
                            <i class="fas fa-trash"></i>
                          </button>
                          {/* Add some space */}

                          <Link
                            to={`/editDetailsPatMed`}
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

export default ListeDetailsPatient;
