import React , { useEffect }from 'react'
import "./Acceuil.css"
import SideBar from '../../Components/Layout/SideBar'
import TopBar from '../../Components/Layout/TopBar'
import Footer from '../../Components/Layout/Footer'
import LogoutModal from '../../Components/Logout/LogoutModal'
import AcceuilContent from '../../Components/AcceuilContent/AcceuilContent'
import {useDispatch ,useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {getMe} from "../../Features/authSlice";


function Acceuil() {
  const dispatch =useDispatch();
  const navigate = useNavigate();
  const{isError}= useSelector((state => state.auth));
  
  //dispatch
  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  //validate
  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);


  return (
    <div>
      {/* Page Wrapper */}
      <div id="wrapper">
        <SideBar></SideBar>
        {/* Content Wrapper */}
        <div id="content-wrapper" className="d-flex flex-column">
          {/* Main Content */}
          <div id="content">

            {/* Topbar */}
            <TopBar></TopBar>
            {/* End of Topbar */}

            {/* Begin Page Content */}
            <AcceuilContent></AcceuilContent>
          </div>
          {/* End of Main Content */}
          {/* Footer */}
          <Footer></Footer>

          {/* End of Footer */}
        </div>
        {/* End of Content Wrapper */}
      </div>
      {/* End of Page Wrapper */}
      {/* Scroll to Top Button*/}
      <a className="scroll-to-top rounded" href="#page-top">
        <i className="fas fa-angle-up" />
      </a>
      {/* Logout Modal*/}
      <LogoutModal></LogoutModal>
    </div>

  )
}

export default Acceuil
