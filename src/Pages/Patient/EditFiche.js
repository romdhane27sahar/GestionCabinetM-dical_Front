import React from 'react'

import LogoutModal from '../../Components/Logout/LogoutModal'
import SideBar from '../../Components/Layout/SideBar'
import TopBar from '../../Components/Layout/TopBar'
import Footer from '../../Components/Layout/Footer'
import FormEditFiche from '../../Components/Patient/FormEditFiche'


function EditFiche() {
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
             <FormEditFiche></FormEditFiche>
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

export default EditFiche
