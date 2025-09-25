
import Navbar from '../Navbar/Navbar'
import React, { useState,useContext } from 'react'

import Form from "react-bootstrap/Form";
import SearchIcon from '@mui/icons-material/Search';
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { IssueContext } from '../../store/IssueBookContext';
import { useAuth } from '../../store/AuthContext'
import { BookContext } from '../../store/BookContext';



export default function MyBooks() {
  const { books } = useContext(BookContext);
  const {issuedBooks} = useContext(IssueContext)
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('IssuedBooks');

  const [searchBook, setSearchBook] = useState("")

  const [showAddBook, setShowAddBook] = useState(false)
  const handleShowAddClick = () => setShowAddBook(true)

  const [sortBy,SetSortBy]=useState("newest")
  

 const myBooks = issuedBooks.filter(b =>b.studentEmail === user.email);
console.log("My Books:", myBooks);
console.log("Issued Books:", issuedBooks);
console.log("Logged in user:", user);


 const filteredBooks = issuedBooks.filter(ib => ib.studentName === user.name)
 .filter(ib=>{
 const book = books.find(b => b.id === ib.bookId) || {};
 return (
        book.title.toLowerCase().includes(searchBook.toLowerCase()) ||
        book.author.toLowerCase().includes(searchBook.toLowerCase())
      )

    }
  )
 
//  books.filter(
//     (book) => {
     
  const sortedBooks =[...filteredBooks].sort((a,b)=>{
  const bookA = books.find(bk=> bk.id === a.bookId || {})
  const bookB = books.find(bk=> bk.id === b.bookId || {})

   if(sortBy ==="newest"){
    return new Date(b.issueDate) - new Date(a.issueDate)
   } 
   if(sortBy ==="oldest"){
    return new Date(a.issueDate) - new Date(b.issueDate)
   } 

  })
 
  return (
    <div>
      <Navbar />
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
              <Form.Select value={sortBy} onChange={(e)=> SetSortBy(e.target.value)}>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
              </Form.Select>
            </div>
          </div>
          <div className="active-tab">
            <button type="button" className={activeTab === 'IssuedBooks' ? 'tab active' : 'tab'} 
            onClick={() => setActiveTab('IssuedBooks')} >Issued Books</button>

            <button type="button" className={activeTab === 'PendingReturn' ? 'tab active' : 'tab'}
             onClick={() => setActiveTab('PendingReturn')} >Pending to Return</button>

            <button type="button" className={activeTab === 'Returnedbooks' ? 'tab active' : 'tab'} 
            onClick={() => setActiveTab('Returnedbooks')} >Returned Books</button>
          </div>
          <div className='page2'>
            <div className='row border-bottom mt-3 ps-3 pe-2 pb-2'>
              <p className='col d-flex justify-content-start pg-headings'>Book title</p>
              <p className='col d-flex justify-content-center pg-headings'>Author</p>
              <p className='col d-flex justify-content-center pg-headings'>Issue Date</p>
              <p className='col d-flex justify-content-center pg-headings'>Due Date</p>
              <p className='col d-flex justify-content-center pg-headings'>Returnd Date</p>
              <p className='col d-flex justify-content-center pg-headings'>Fine <br />Fine (Rs.10 per day)</p>
            </div>
            
                {
                  sortedBooks // show only books for logged-in student
                      .map((ib) => {
                    const book = books.find(b => b.id === ib.bookId) || {};
                    return (
                      <div key={ib.id} className="row border-bottom mt-4 mb-4 pg-items"> 
                        <p className="col d-flex justify-content-start">{ ib.title || '-'}</p>
                        <p className="col d-flex justify-content-center">{book.author || '-'}</p>
                        <p className="col d-flex justify-content-center">{ib.issueDate || '-'}</p>
                        <p className="col d-flex justify-content-center">{ib.dueDate || '-'}</p>
                        <p className="col d-flex justify-content-center">{ib.returnDate || '-'}</p>
                        <p className="col d-flex justify-content-center">{ib.fine || '0'}</p>
                      </div>
                    );
                  })
                }

            

          </div>

        </div>
      </div>

    </div>
  )
}
