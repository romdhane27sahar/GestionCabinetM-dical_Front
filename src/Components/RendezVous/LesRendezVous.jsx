import React from "react";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";

import "./FormAddRendezVous.css"
import TimePicker from "react-bootstrap-time-picker";


function LesRendezVous() {
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
                  <th className="text-center" >Nom</th>
                  <th className="text-center">Prénom</th>
                  <th className="text-center">Date rendez-vous</th>
                  <th className="text-center">Heure rendez-vous</th>
                  <th className="text-center">Date prochain rendez-vous</th>
                  <th className="text-center">Heure prochain rendez-vous</th>

                 
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td className="text-center">1</td>
                  <td className="text-center">salhi</td>
                  <td  className="text-center">ali</td>
                  <td  className="text-center">27/04/2004</td>
                  <td  className="text-center">14:00</td>
                  <td  className="text-center">
                  <input type="date" className="form-control" />

                    </td>
                  <td  className="text-center">
                  <TimePicker start="7:00" end="21:00" step={30} />
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
                            to={`/rendezVous/edit`}
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

export default LesRendezVous;
