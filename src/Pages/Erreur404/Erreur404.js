import React from 'react'
import Erreur404Content from '../../Components/Erreur404Content/Erreur404Content'
import TopBar from '../../Components/Layout/TopBar'
import Footer from '../../Components/Layout/Footer'
import SideBar from '../../Components/Layout/SideBar'

function Erreur404() {
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
            <Erreur404Content></Erreur404Content>
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
     
    </div>
  )
}

export default Erreur404
