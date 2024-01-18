import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar"


function Layout() {

  return (
    <>
      <Navbar>
 

      </Navbar>
           <Outlet />   
   

  

    </>
  );
}

export default Layout;
