import React, { useContext, useState } from 'react'
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { BookContext } from '../../../store/BookContext';
import { useEffect } from 'react';
import { IssueContext } from '../../../store/IssueBookContext';
import { StudentContext } from '../../../store/StudentContext';
import IssuedBooks from '../Pages/IssuedBooks';



function IssueModal({ show, handleClose }) {
      

     const { books } = useContext(BookContext);
      const { issueBook } = useContext(IssueContext)
      const {students} = useContext(StudentContext)

    const [formData,setFormData] = useState({
        bookId: "",
        studentId:"",
        issueDate:"",
        dueDate:""
    }) 
      // helper to format date -> "YYYY-MM-DD" for input[type="date"]
  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    

    setFormData((prev) => ({
      ...prev,
      [name]: name==="bookId" ? Number(value) : value
    }));
  };

 const onSubmit = (e) => {
  e.preventDefault();
  console.log(students)
  

  const selectedBook = books.find(b => b.id === Number(formData.bookId));
  if (!selectedBook) {
    alert("Please select a book!");
    return;
  }

  issueBook({
    id: selectedBook.id,         // internal book id
    bookId: selectedBook.id,      // track issued record
    title: selectedBook.title,    // store title for display
     author : selectedBook.author,
    studentId: formData.studentId,
    issueDate: formData.issueDate,
    dueDate: formData.dueDate,
    remainingCopies: selectedBook.remainingCopies
  });

  handleClose();
};

    // Auto-calc dueDate whenever issueDate changes
    useEffect(() => {
    if (formData.issueDate) {
      const issue = new Date(formData.issueDate);
      const due = new Date(issue);
      due.setDate(issue.getDate() + 7); // add 7 days
      setFormData((prev) => ({
        ...prev,
        dueDate: formatDate(due)
      }));
    }
  }, [formData.issueDate]);
    

  return (
     <div>
      <div
        className="modal show"
        style={{ display: 'block', position: 'initial' }}
      >
        <Modal
          show={show}
          onHide={() => {
            handleClose();
          }}
          centered   // ✅ centers modal vertically
          backdropClassName="custom-backdrop" // ✅ lets us style the backdrop
          dialogClassName="glass-modal"
          backdrop="static"
        >
          <Modal.Header closeButton>
            <Modal.Title>Issue Book</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Book</Form.Label>
                <Form.Select  name='bookId' placeholder='Select Book'  value={formData.bookId || ""}
  onChange={handleChange} >
                  <option value="">-- Select Book --</option>
                  {books.map((book)=>(
                    <option key={book.id} value={book.id}>{book.title}</option>
                  ))

                  }
                 </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                <Form.Label>Student</Form.Label>
                <Form.Select type="text" name='studentId' placeholder='Select Student' value={formData.studentId} onChange={handleChange} >
                 <option value="">-- Select Student --</option>
                    {students.map((student)=>(
                      <option key={student.id} value={student.id}>{student.name}</option>
                    ))}
                   </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                <Form.Label>Issue Date</Form.Label>
                <Form.Control type="date" name='issueDate' value={formData.issueDate} onChange={handleChange} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                <Form.Label>Due Date</Form.Label>
                <Form.Control type="date" name='dueDate' value={formData.dueDate} readOnly onChange={handleChange} />
              </Form.Group>


            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button className="orangeBtn" onClick={onSubmit}>Issue Book</Button>
          </Modal.Footer>
        </Modal>

      </div>

    </div>
  )
}
export default IssueModal