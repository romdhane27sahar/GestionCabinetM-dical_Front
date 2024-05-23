import React from 'react'
import SideBar from '../../Components/Layout/SideBar'
import Footer from '../../Components/Layout/Footer'
import TopBar from '../../Components/Layout/TopBar'
import LogoutModal from '../../Components/Logout/LogoutModal'
import ListPatients from '../../Components/Patient/ListPatients'
import FormAddRendezVous from '../../Components/RendezVous/FormAddRendezVous'


function AddRendezVous() {
  return (
  
        <div>
       
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
                <FormAddRendezVous></FormAddRendezVous>
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
          <LogoutModal></LogoutModal>
        </div>
        
        </div>
      )
    }

export default AddRendezVous
