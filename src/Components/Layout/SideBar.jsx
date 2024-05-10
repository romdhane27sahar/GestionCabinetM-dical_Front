import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../Features/authSlice";
import { FaHome } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { PiFiles } from "react-icons/pi";
import { MdOutlineEmail } from "react-icons/md";






function SideBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  return (
    <div>
      {/* Sidebar */}
      <ul
        className="navbar-nav bg-primary sidebar sidebar-dark accordion"
        id="accordionSidebar"
      >
        {/* Sidebar - Brand */}
        <a
          className="sidebar-brand d-flex align-items-center justify-content-center"
          href="index.html"
        >
          <div className="sidebar-brand-icon ">
            <img src="/../../../img/AppLogo.svg" alt="AppLogo" />
          </div>
          <div className="sidebar-brand-text mx-3">MedHelp </div>
        </a>
        {/* Divider */}
        <hr className="sidebar-divider my-0" />
        {/* Nav Item - Dashboard */}
        <li className="nav-item active">
          <Link to="/acceuil" className="nav-link">

            <FaHome />
            <span>   </span>
            <span>Acceuil</span>
          </Link>
        </li>
        {/* Divider */}
        <hr className="sidebar-divider" />

        {/* ADMIN */}
        {user && user.role === "admin" && (
          <li className="nav-item">
            <a
              className="nav-link collapsed"
              href="#"
              data-toggle="collapse"
              data-target="#collapseUser"
              aria-expanded="true"
              aria-controls="collapseTwo"
            >
              <FaUsers />
              <span>   </span>

              <span>Utilisateurs</span>
            </a>
            <div
              id="collapseUser"
              className="collapse"
              aria-labelledby="headingTwo"
              data-parent="#accordionSidebar"
            >
              <div className="bg-white py-2 collapse-inner rounded">
                <h6 className="collapse-header">Gérer Utilisateurs:</h6>
                <Link to={"/users"} className="collapse-item">
                  Consulter
                </Link>
                <Link to="/users/add" className="collapse-item">
                  Ajouter
                </Link>
              </div>
            </div>
            <hr className="sidebar-divider" />
          </li>
        )}

        {/* Heading */}
        {/* <div className="sidebar-heading">
                    Interface
                </div> */}
        {/* Nav Item - Pages Collapse Menu */}

        {user && user.role === "medecin" && (
         
          <div>
            <li className="nav-item active">
            <Link to ="/listPatientsMed" className="nav-link" >  
            <FaUser />
            <span>   </span>

               <span>Liste Patients</span>
          </Link>
            </li>
            <li className="nav-item">
              <a
                className="nav-link collapsed"
                href="#"
                data-toggle="collapse"
                data-target="#collapseTwo"
                aria-expanded="true"
                aria-controls="collapseTwo"
              >
                <PiFiles />

                <span>   </span>

                <span>Ordonnances</span>
              </a>
              <div
                id="collapseTwo"
                className="collapse"
                aria-labelledby="headingTwo"
                data-parent="#accordionSidebar"
              >
                <div className="bg-white py-2 collapse-inner rounded">
                  <h6 className="collapse-header">Gérer ordonnances:</h6>
                  <a className="collapse-item" href="buttons.html">
                    Consulter
                  </a>
                  <a className="collapse-item" href="cards.html">
                    Ajouter
                  </a>
                </div>
              </div>
            </li>
            {/* Nav Item - Utilities Collapse Menu */}
            <li className="nav-item">
              <a
                className="nav-link collapsed"
                href="#"
                data-toggle="collapse"
                data-target="#collapseUtilities"
                aria-expanded="true"
                aria-controls="collapseUtilities"
              >
<MdOutlineEmail />
<span>   </span>
                <span>Lettres</span>
              </a>
              <div
                id="collapseUtilities"
                className="collapse"
                aria-labelledby="headingUtilities"
                data-parent="#accordionSidebar"
              >
                <div className="bg-white py-2 collapse-inner rounded">
                  <h6 className="collapse-header">Gérer lettres:</h6>
                  <a className="collapse-item" href="utilities-color.html">
                    Consulter
                  </a>
                  <a className="collapse-item" href="utilities-border.html">
                    Ajouter lettre de laison
                  </a>
                  <a className="collapse-item" href="utilities-animation.html">
                    Ajouter lettre confidentielle
                  </a>
                </div>
              </div>
            </li>
            {/* Divider */}
            <hr className="sidebar-divider" />
          </div>
        )}

        {/* Heading */}
        {/* <div className="sidebar-heading">
                    Addons
                </div> */}
        {/* Nav Item - Pages Collapse Menu */}
        {/* <li className="nav-item">
                    <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePages" aria-expanded="true" aria-controls="collapsePages">
                        <i className="fas fa-fw fa-folder" />
                        <span>Pages</span>
                    </a>
                    <div id="collapsePages" className="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">
                            <h6 className="collapse-header">Login Screens:</h6>
                            <a className="collapse-item" href="login.html">Login</a>
                            <a className="collapse-item" href="register.html">Register</a>
                            <a className="collapse-item" href="forgot-password.html">Forgot Password</a>
                            <div className="collapse-divider" />
                            <h6 className="collapse-header">Other Pages:</h6>
                            <a className="collapse-item" href="404.html">404 Page</a>
                            <a className="collapse-item" href="blank.html">Blank Page</a>
                        </div>
                    </div>
                </li> */}
        {/* Nav Item - Charts */}
        {/* <li className="nav-item">
                    <a className="nav-link" href="charts.html">
                        <i className="fas fa-fw fa-chart-area" />
                        <span>Charts</span></a>
                </li> */}
        {/* Nav Item - Tables */}

        {/* Divider */}
        {/* <hr className="sidebar-divider d-none d-md-block" /> */}

        {/* Secretaire */}
        {user && user.role === "secretaire" && (
<div>
        <li className="nav-item">
          <a
            className="nav-link collapsed"
            href="#"
            data-toggle="collapse"
            data-target="#collapseFiche"
            aria-expanded="true"
            aria-controls="collapseTwo"
          >
            <i className="fas fa-fw fa-cog" />
            <span>Fiches Patients</span>
          </a>
          <div
            id="collapseFiche"
            className="collapse"
            aria-labelledby="headingTwo"
            data-parent="#accordionSidebar"
          >
            <div className="bg-white py-2 collapse-inner rounded">
              <h6 className="collapse-header">Gérer Fiches Patients:</h6>
              <a className="collapse-item" href="buttons.html">
                Consulter
              </a>
              <a className="collapse-item" href="cards.html">
                Ajouter
              </a>
            </div>
          </div>
        </li>

        <li className="nav-item">
          <a className="nav-link" href="tables.html">
            <i className="fas fa-fw fa-table" />
            <span>Rendez-vous</span>
          </a>
        </li>

        {/* Divider */}
        <hr className="sidebar-divider d-none d-md-block" />
        </div>
        )}

        {/* Sidebar Toggler (Sidebar) */}
        <div className="text-center d-none d-md-inline">
          <button className="rounded-circle border-0" id="sidebarToggle" />
        </div>
      </ul>
      {/* End of Sidebar */}
    </div>
  );
}

export default SideBar;
