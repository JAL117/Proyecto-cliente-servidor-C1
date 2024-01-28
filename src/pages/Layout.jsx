import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar"
import Chat from '../components/Chat'

function Layout() {

  return (
    <>
      <Navbar>
 

      </Navbar>
          <Outlet>
            
           
            </Outlet>  
    <Chat/>

    </>
  );
}

export default Layout;
