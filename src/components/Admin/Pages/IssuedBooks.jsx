import React, { useState } from 'react'
import Navbar from '../../Navbar/Navbar'
import SearchIcon from '@mui/icons-material/Search';
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

export default function IssuedBooks() {

  const [searchBook,setSearchBook] = useState("");

  const handleShowIssuedBooks=()=>{
    
  }
  

  return (
    <div>
      <Navbar/>
      <div className='pages col-10' >
        <div className='pg-container'>
          <p className='pt-5 login-p'>Issued Books</p>
          <hr />
          <div className='d-flex justify-content-between'>
            <div className=' col-5'>
              <TextField
                fullWidth
                variant="outlined"
                type="search"
                placeholder="Search book by title or Student"
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
            
              <div className="d-flex align-items-center ">
                <button className='orangeBtn me-4 mt-2 ' onClick={handleShowIssuedBooks}>Issue Book</button>
              </div>

            
          </div>
          <div className='page2'>
            <div className='row border-bottom mt-3 ps-3 pe-2 pb-2'>
            <p className='col d-flex justify-content-start pg-headings'>Book title</p>
            <p className='col d-flex justify-content-center pg-headings'>Student</p>
            <p className='col d-flex justify-content-center pg-headings'>Issue Date</p>
            <p className='col d-flex justify-content-center pg-headings'>Fine <br />Fine 
(Rs. 10 per day) </p>
            <p className='col d-flex justify-content-center pg-headings'>Actions</p>
            </div>

          </div>

        </div>
      </div>

    </div>
  )
}
