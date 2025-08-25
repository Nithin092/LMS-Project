import React, { useState } from "react";
import Navbar from '../../Navbar/Navbar';
import SearchIcon from '@mui/icons-material/Search';
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

export default function Students() {

  const [SearchStudent, setSearchStudent] = useState("");

  const handleAddStudent = () => {
    // Add logic for issuing a book here
  };

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
  );
}