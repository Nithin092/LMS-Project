
import Navbar from '../Navbar/Navbar'
import React, { useState } from 'react'

import Form from "react-bootstrap/Form";
import SearchIcon from '@mui/icons-material/Search';
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

export default function MyBooks() {

  const [searchBook, setSearchBook] = useState("")
  
    const [showAddBook,setShowAddBook] =useState(false)
    const handleShowAddClick = () =>setShowAddBook(true)

  return (
    <div>
      <Navbar/>
      <div className='pages col-10' 
      >
        <div className='pg-container'>
          <p className='pt-5 login-p'>My Books</p>
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
              <div className="d-flex align-items-center gap-2 ">
                <span className="col-auto ">Sort by : </span>
                <Form.Select>
                  <option value="bookTitle">Newest</option>
                  <option value="author">Oldest</option>
                </Form.Select>
              </div>       
          </div>
          <div className='page2'>
            <div className='row border-bottom mt-3 ps-3 pe-2 pb-2'>
            <p className='col d-flex justify-content-start pg-headings'>Book title</p>
            <p className='col d-flex justify-content-center pg-headings'>Author</p>
            <p className='col d-flex justify-content-center pg-headings'>Issue Date</p>
            <p className='col d-flex justify-content-center pg-headings'>Due Date</p>
            <p className='col d-flex justify-content-center pg-headings'>Return Date</p>
            <p className='col d-flex justify-content-center pg-headings'>Fine <br />Fine (Rs.10 per day)</p>
            </div>

          </div>

        </div>
      </div>

    </div>
  )
}
