import React, { useContext, useState } from "react";
import Navbar from "../../Navbar/Navbar";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IssueModal from "../Modals/IssueModal";
import { IssueContext } from "../../../store/IssueBookContext";
import { MdOutlineAssignmentReturn } from "react-icons/md";
import ReturnBook from "../Modals/ReturnBook";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { StudentContext } from "../../../store/StudentContext";


export default function IssuedBooks() {
  const [searchBook, setSearchBook] = useState("");
  const [showIssuedBook, setShowIssuedBooks] = useState(false);

  const handleCloseIssuedBook = () => setShowIssuedBooks(false);

  const [showReturnBook, setShowReturnBook] = useState(false);
  const [selectedIssued, setSelectedIssued] = useState(null);

  // ✅ Get returnBook from IssueContext
  const { issuedBooks, returnBook } = useContext(IssueContext);

  const handleShowIssuedBooks = () => {
    setShowIssuedBooks(true);
  };

  const handleShowReturn = (ib) => {
    setSelectedIssued(ib); // store the full issued book object
    setShowReturnBook(true);
  };
  const  handleCloseReturnBook=()=>{
    setShowReturnBook(false);
    setSelectedIssued(null);
  }

  const handleConfirmReturn = () => {
    if (selectedIssued) {
      returnBook(selectedIssued.id); // ✅ remove issued record + increment book count
    }
    setShowReturnBook(false); // ✅ close modal
    setSelectedIssued(null); // reset state
  };

  const {students} = useContext(StudentContext)

const getStudentName = (id) => {
  const student = students.find((s) => String(s.id) === String(id));
  return student ? student.name : "Unknown";
};

  // search Book
  const filterIssuedBooks = issuedBooks.filter((ib)=>{
    const search = searchBook.toLowerCase();
    return(
       ib.title.toLowerCase().includes(search) 
       // || 
      // ib.studentId.toLowerCase().includes(search)
    )
  })

  return (
    <div>
      <Navbar />
      <div className="pages col-10">
        <div className="pg-container">
          <p className="pt-5 login-p">Issued Books</p>
          <hr />
          <div className="d-flex justify-content-between">
            <div className=" col-5">
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
              <button
                className="orangeBtn me-4 mt-2 "
                onClick={handleShowIssuedBooks}
              >
                Issue Book
              </button>
            </div>
          </div>

          <div className="page2">
            <div className="row border-bottom mt-3 ps-3 pe-2 pb-2">
              <p className="col d-flex justify-content-start pg-headings">
                Book title
              </p>
              <p className="col d-flex justify-content-center pg-headings">
                Student
              </p>
              <p className="col d-flex justify-content-center pg-headings">
                Issue Date
              </p>
              <p className="col d-flex justify-content-center pg-headings">
                Due Date
              </p>
              <p className="col d-flex justify-content-center pg-headings">
                Fine <br />
                (Rs. 10 per day)
              </p>
              <p className="col d-flex justify-content-center pg-headings">
                Actions
              </p>
            </div>
             {filterIssuedBooks.length > 0 ? (
              filterIssuedBooks.map((ib) => (
                <div
                  key={ib.id}
                  className="row border-bottom mt-4 mb-4 pg-items"
                >
                  <p className="col d-flex justify-content-start pg-items">
                    {ib.title}
                  </p>
                  <p className="col d-flex justify-content-center pg-items">
                    {getStudentName(ib.studentId)}
                  </p>
                  <p className="col d-flex justify-content-center pg-items" >
                    {ib.issueDate}
                  </p>
                  <p className="col d-flex justify-content-center pg-items">
                    {ib.dueDate}
                  </p>
                  <p className="col d-flex justify-content-center pg-items">
                    {ib.fine}
                  </p>
                  <p className="col d-flex justify-content-center gap-3">
                    {ib.returned ? (
                      <IoCheckmarkDoneCircle className="w-4 h-4 mr-2 text-green-600" />
                    ) : (
                      <MdOutlineAssignmentReturn
                        size={20}
                        onClick={() => handleShowReturn(ib)}
                        style={{ cursor: "pointer" }}
                      />
                    )}
                  </p>
                </div>
              ))
            ) : null}
          </div>
        </div>
      </div>

      {showIssuedBook && (
        <IssueModal show={showIssuedBook} handleClose={handleCloseIssuedBook} />
      )}

      {showReturnBook && (
        <ReturnBook
          show={showReturnBook}
          handleCloseReturn={handleCloseReturnBook}
          handleConfirm={handleConfirmReturn}
        />
      )}
    </div>
  );
}
