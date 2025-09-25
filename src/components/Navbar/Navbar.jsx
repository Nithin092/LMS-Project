import { React, useState } from 'react'
import { useAuth } from '../../store/AuthContext'
import {
  MdMenuBook,
  MdOutlinePeople,
  MdTaskAlt,
  MdLocalLibrary,
  MdLogout,
} from "react-icons/md";
import { FaUserCircle, FaBookReader } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {

  const { user } = useAuth();
  const Navigate = useNavigate();
  // const [NavbarBtn, setNavbar] = useState("")
  const handleLogout = () => {
       window.location.href = '/';
  }

  return (
    <div className='NavBar col-2 text-white d-flex flex-column ' style={{
      backgroundColor: user?.user === "student" ? "#303179" : "#ED7966", minHeight: "100vh"
    }}>
      <div className=' d-flex  align-items-center gap-3 ms-3 '><FaBookReader size={41} style={{ color: '#fff' }} />
        <p className="pt-3 fw-bold fs-3" style={{ color: '#fff' }}>LMS</p></div>

      <div className='NavItems d-flex flex-column align-items-center flex-grow-1 '>

      
        {
          user?.user === 'student' && (
            <>
              <NavLink to="/mybooks"
              className={({ isActive }) =>
                `btn mt-4 navcomp navcomp1 d-flex align-items-center gap-3 ps-3 pt-2 pb-2 ${isActive ? " active " : "text-white "
                }`
              }
               >
                <FaBookReader size={20} />
                My Books
              </NavLink>
              <NavLink to="/allbooks"
              className={({ isActive }) =>
                `btn mt-4 navcomp navcomp1 d-flex align-items-center gap-3 ps-3 pt-2 pb-2 ${isActive ? " active " : "text-white "
                }`
              }
               >
                <MdMenuBook size={20} />
              All Books
              </NavLink>
            </>
          )
        }


        {user?.user === "admin" && (
          <>
            <NavLink
              to="/issuedbooks"
              className={({ isActive }) =>
                `btn mt-4 navcomp navcomp1 d-flex align-items-center gap-3 ps-3 pt-2 pb-2 ${isActive ? " active" : "text-white"
                }`
              }
            >
              <MdTaskAlt size={20} />
              Issued Books
            </NavLink>
            
              <NavLink
              to={user?.user ==='admin'?"/allbooks":"/allbooks"}
               className={({ isActive }) =>
                `btn mt-4 navcomp navcomp1 d-flex align-items-center gap-3 ps-3 pt-2 pb-2 ${isActive ? " active" : "text-white"
                }`
              }
            >
              <MdMenuBook size={20} />
              All Books
            </NavLink> 
          
            <NavLink
              to="/students"
              className={({ isActive }) =>
                `btn mt-4 navcomp navcomp1 d-flex align-items-center gap-3 ps-3 pt-2 pb-2 ${isActive ? " active" : "text-white"
                }`
              }
            >
              <MdOutlinePeople size={20} />
              Students
            </NavLink>
          </>
        )}

         
      </div>

      <div className='logout mb-5' >
        <div className=' d-flex align-items-center  justify-content-start gap-3 border-top pt-3 ms-3 me-3 cursor-pointer  ' onClick={handleLogout}>
          <FaUserCircle size={30} style={{ color: "white" }} />
          <div>
            {user?.user === "admin" && (
              <>
                <p className=' m-0 mb-0'>Admin</p>
                <p className=' m-0 mb-0'>admin@gmail.com</p>
              </>
            )}
            {user?.user === "student" && (
              <>
                <p className=' m-0 mb-0'>Ram</p>
                <p className=' m-0 mb-0'>Ram@gmail.com</p>
              </>
            )}
            
          </div>
        </div>
      </div>
    </div>
  )
}
