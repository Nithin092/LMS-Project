import React, { useContext, useState } from 'react'
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { BookContext } from '../../../store/BookContext';
import { useEffect } from 'react';

export default function AddBookModal({
  showAddBook,
   handleCloseAddBook,
   initialData = null,
   isEdit = false
  
}) {

  const { addBook, updateBook } = useContext(BookContext);

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    language: "",
    totalCopies: "",
    remainingCopies: ""
  })

  useEffect(() => {
    if(initialData){
      setFormData(initialData)
    }
  }, [initialData])
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
   if(isEdit && initialData) {
    updateBook(initialData.id, formData);
    alert("Book Updated Successfully")
   }else{
    addBook(formData)
    alert("Book Added Successfully");
  }
   setFormData({
      title: "",
      author: "",
      language: "",
      totalCopies: "",
      remainingCopies: ""
    })

    handleCloseAddBook();

   }
   
    

  return (
    <div>
      <div
        className="modal show"
        style={{ display: 'block', position: 'initial' }}
      >
        <Modal
          show={showAddBook}
          onHide={() => {
            handleCloseAddBook();
          }}
          centered   // ✅ centers modal vertically
          backdropClassName="custom-backdrop" // ✅ lets us style the backdrop
          dialogClassName="glass-modal"
          backdrop="static"
        >
          <Modal.Header closeButton>
            <Modal.Title>{isEdit ?"Edit Book" :"Add Book"}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" name='title' value={formData.title} onChange={handleChange} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                <Form.Label>Author</Form.Label>
                <Form.Control type="text" name='author' value={formData.author} onChange={handleChange} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="sortSelect">
                <Form.Label>Language</Form.Label>
                <Form.Select name="language"
                  value={formData.language}
                  onChange={handleChange}>
                  <option value="">Select Language</option>
                  <option value="English">English</option>
                  <option value="Malayalam">Malayalam</option>
                </Form.Select>
              </Form.Group>
              <div className='d-flex justify-content-between'>

                <Form.Group className="mb-3 col-5" controlId="exampleForm.ControlInput3">
                  <Form.Label>Total Copies</Form.Label>
                  <Form.Control type="number" name="totalCopies" value={formData.totalCopies}
                    onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3 col-5" controlId="exampleForm.ControlInput2">
                  <Form.Label>Remaining Copies</Form.Label>
                  <Form.Control type="number" name="remainingCopies" value={formData.remainingCopies}
                    onChange={handleChange}
                  />
                </Form.Group>
              </div>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseAddBook}>
              Cancel
            </Button>
            <Button className="orangeBtn" onClick={onSubmit}>{isEdit ? "Update Book" : "Add Book"}</Button>
          </Modal.Footer>
        </Modal>

      </div>

    </div>
  )
}
