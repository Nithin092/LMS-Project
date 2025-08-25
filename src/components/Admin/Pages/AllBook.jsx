import Navbar from '../../Navbar/Navbar'
import React, { useState } from 'react'
import { useAuth } from '../../../store/AuthContext'
import Form from "react-bootstrap/Form";
import SearchIcon from '@mui/icons-material/Search';
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import AddBookModal from '../Modals/AddBookModal';
// import InputGroup from "react-bootstrap/InputGroup";


export default function AllBook() {
  const { user } = useAuth();
  const [searchBook, setSearchBook] = useState("")

  const [showAddBook,setShowAddBook] = useState(false)
  const handleCloseAddBook = () => setShowAddBook(false)
  const handleShowAddClick = () => setShowAddBook(true)

  return (
    <div>
      <Navbar />
      <div className='pages col-10' style={{
        backgroundColor: user?.user === "student" ? "#fbfbff" : "#fffbfa",
      }}>
        <div className='pg-container'>
          <p className='pt-5 login-p'>All Books</p>
          <hr />
          <div className='d-flex justify-content-between'>
            <div className=' col-5'>
              <TextField
                fullWidth
                variant="outlined"
                type="search"
                placeholder="Search book by title or author"
                value={searchBook}
                onChange={(e) => setSearchBook(e.target.value)}
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
            {user?.user === 'student' && (
              <div className="d-flex align-items-center gap-2 ">
                <span className="col-auto ">Sort by : </span>
                <Form.Select>
                  <option value="bookTitle">Book Title</option>
                  <option value="author">Author</option>
                </Form.Select>
              </div>

            )}
            {user?.user === 'admin' && (
              <div className="d-flex align-items-center ">
                <button className='orangeBtn me-4 mt-2 ' onClick={handleShowAddClick}>Add New Book</button>
              </div>

            )}
          </div>
          <div className='page2'>
            <div className='row border-bottom mt-3 ps-3 pe-2 pb-2'>
            <p className='col d-flex justify-content-start pg-headings'>Book title</p>
            <p className='col d-flex justify-content-center pg-headings'>Author</p>
            <p className='col d-flex justify-content-center pg-headings'>Language</p>
            <p className='col d-flex justify-content-center pg-headings'>Total Copies</p>
            <p className='col d-flex justify-content-center pg-headings'>Remaining</p>
            <p className='col d-flex justify-content-center pg-headings'>Actions</p>
            </div>

          </div>

        </div>
      </div>
       {showAddBook && (
      <AddBookModal
        showAddBook={showAddBook}
        handleCloseAddBook={handleCloseAddBook}
      />
    )}
    </div>
   
  )
}
