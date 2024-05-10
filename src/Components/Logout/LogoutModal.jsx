import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LogOut, LoginUser, reset } from "../../Features/authSlice";

function LogoutModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };

  return (
    <div
      className="modal fade"
      id="logoutModal"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Voulez-vous quitter?
            </h5>
            <button
              className="close"
              type="button"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            Veuillez choisir "Déconnexion" pour quitter l'application
          </div>
          <div className="modal-footer">
          <button onClick={logout} className="btn btn-primary">
              Se déconnecter
            </button>
            
            <button
              className="btn btn-secondary"
              type="button"
              data-dismiss="modal"
            >
              Annuller
            </button>
          
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogoutModal;
