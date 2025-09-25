import Navbar from '../../Navbar/Navbar'
import React, { useState, useContext } from 'react'
import { useAuth } from '../../../store/AuthContext'
import Form from "react-bootstrap/Form";
import SearchIcon from '@mui/icons-material/Search';
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import AddBookModal from '../Modals/AddBookModal';
import { HiOutlineEye } from "react-icons/hi";
import { MdEdit } from "react-icons/md";
import { BiTrash } from "react-icons/bi";
import { BookContext } from '../../../store/BookContext';
import { IssueContext } from '../../../store/IssueBookContext';


// import InputGroup from "react-bootstrap/InputGroup";


export default function AllBook() {
  const { user } = useAuth();
  const [searchBook, setSearchBook] = useState("")
  const { books, deleteBook } = useContext(BookContext);
  const { deleteIssuedByBookId } = useContext(IssueContext);


  const [showEditBook, setShowEditBook] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const [showAddBook, setShowAddBook] = useState(false)
  const handleCloseAddBook = () => setShowAddBook(false)
  const handleShowAddClick = () => setShowAddBook(true)

  const [sortBy,SetSortBy]=useState("bookTitle")

  

  const handleDelete = (bookId) => {
    console.log("Requesting delete for bookId:", bookId);
    deleteBook(bookId);
    console.log("Called deleteBook()", bookId);
    deleteIssuedByBookId(bookId);
    console.log("Called deleteIssuedByBookId()", bookId);

    // check localStorage values right after (for quick dev check)
    console.log("localStorage books:", JSON.parse(localStorage.getItem("books") || "[]"));
    console.log("localStorage issuedBooks:", JSON.parse(localStorage.getItem("issuedBooks") || "[]"));
  };

  const handleShowEditBook = (book) => {
    setSelectedBook(book);
    setShowEditBook(true);
  };
  const handleCloseEditBook = () => {
    setSelectedBook(null);
    setShowEditBook(false);
  };
  const filteredBooks = books.filter(
    (book) => {
      return (
        book.title.toLowerCase().includes(searchBook.toLowerCase()) ||
        book.author.toLowerCase().includes(searchBook.toLowerCase())
      )

    } 
  )
  const sortedBooks =[...filteredBooks].sort((a,b)=>{
    if(sortBy === "bookTitile"){
      return a.title.localeCompare(b.title)
    }
    if(sortBy === "author"){
      return a.title.localeCompare(b.author)
    }
  })


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
                <Form.Select value={sortBy} onChange={(e)=>{SetSortBy(e.target.value)}}>
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

            {sortedBooks.map((book) => (

              <div key={book.id} className='row border-bottom mt-4  mb-4  pg-items'>
                <p className='col d-flex justify-content-start pg-items'>{book.title}</p>
                <p className='col d-flex justify-content-center pg-items'>{book.author}</p>
                <p className='col d-flex justify-content-center pg-items'>{book.language}</p>
                <p className='col d-flex justify-content-center pg-items'>{book.totalCopies}</p>
                <p className='col d-flex justify-content-center pg-items'>{book.remainingCopies}</p>
                <p className='col d-flex justify-content-center gap-3'>
                  {user?.user === 'student' ? (
                    <HiOutlineEye />
                  ) : (
                    <>
                      <MdEdit onClick={() => handleShowEditBook(book)} style={{ cursor: "pointer" }} />
                      <BiTrash style={{ cursor: "pointer", color: "red" }} onClick={() => handleDelete(book.id)} />
                    </>
                  )}
                </p>
              </div>
            ))

            }

          </div>

        </div>
      </div>
      {showAddBook && (
        <AddBookModal
          showAddBook={showAddBook}
          handleCloseAddBook={handleCloseAddBook}

        //  handleAddBook= { handleAddBook}
        />
      )}
      {showEditBook && selectedBook && (
        <AddBookModal showAddBook={showEditBook}
          handleCloseAddBook={handleCloseEditBook}
          initialData={selectedBook} // pre-fill the form
          isEdit={true} />
      )

      }
    </div>

  )
}
