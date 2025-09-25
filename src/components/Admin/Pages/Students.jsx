import React, { useContext, useState } from "react";
import Navbar from '../../Navbar/Navbar';
import SearchIcon from '@mui/icons-material/Search';
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { AddStudent } from "../Modals/AddStudent";
import {StudentContext} from "../../../store/StudentContext";
import { BiTrash } from "react-icons/bi";
import { HiOutlineEye } from "react-icons/hi";
import { MdEdit } from "react-icons/md";

export default function Students() {
  const { students, addStudent, removeStudent, updateStudent } = useContext(StudentContext);
  const [SearchStudent, setSearchStudent] = useState("");
  const [ShowAddStudent, setShowAddStudent] = useState(false);

   const [showEditStudent, setShowEditStudent] = useState(false);
   const [selecedStudent, setSelectedStudent]=useState(null)

  const handleCloseAddstudent =()=> {
    setShowAddStudent(false);
    
    }

  const handleAddStudent = () => { 
    setShowAddStudent(true)
  };

  const  handleDelete=(id)=>{
    removeStudent(id);
  }

  const handleEdit=(student)=>{
    setSelectedStudent(student)
    setShowEditStudent(true)

  }
const handleCloseEditStudent=()=>{
  setSelectedStudent(null)
  setShowEditStudent(false)
}

const filteredStudents = Array.isArray(students)?students.filter
  (student =>
    
      student.title?.toLowerCase().includes(SearchStudent.toLowerCase()) || 
      student.email?.toLowerCase().includes(SearchStudent.toLowerCase())
    
  ):[]
  
  return (
    <div>
      <Navbar />
      <div className='pages col-10' >
        <div className='pg-container'>
          <p className='pt-5 login-p'>Students</p>
          <hr />
          <div className='d-flex justify-content-between'>
            <div className=' col-5'>
              <TextField
                fullWidth
                variant="outlined"
                type="search"
                placeholder="Search book by name or email"
                value={SearchStudent}
                onChange={(e) => setSearchStudent(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                className="mt-3"
              />
            </div>

            <div className="d-flex align-items-center ">
              <button className='orangeBtn me-4 mt-2 ' onClick={handleAddStudent}>Add New Student</button>
            </div>
          </div>
          <div className='page2'>
            <div className='row border-bottom mt-3 ps-3 pe-2 pb-2'>
              <p className='col d-flex justify-content-center pg-headings'>Name</p>
              <p className='col d-flex justify-content-center pg-headings'>Email</p>
              <p className='col d-flex justify-content-center pg-headings'>Actions</p>
            </div>
                { filteredStudents.map((student)=>(
            <div key={student.id} className='row border-bottom mt-4  mb-4  pg-items'>
              <p className='col d-flex justify-content-center pg-items'>{student.name}</p>
              <p className='col d-flex justify-content-center pg-items '>{student.email}</p>
              <p className='col d-flex justify-content-center pg-items gap-4'><MdEdit style={{ cursor: "pointer"}} onClick={() => handleEdit(student)} /> <BiTrash style={{ cursor: "pointer", color: "red" }} onClick={() => handleDelete(student.id)}/><HiOutlineEye/></p>
            </div>
))}
          </div>
        </div>
      </div>
      
      {ShowAddStudent && (
        <AddStudent show={ShowAddStudent} handleClose={handleCloseAddstudent}  />
      )}
      {
        showEditStudent && selecedStudent && (
          <AddStudent show={showEditStudent} handleClose={handleCloseEditStudent}  initialData={selecedStudent} editingStudent={showEditStudent} isEdit={true} />
        )
      }
    </div>
  );
}