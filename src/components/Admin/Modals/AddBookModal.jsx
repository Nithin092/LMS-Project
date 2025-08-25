import React from 'react'
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

export default function AddBookModal({
    showAddBook,
    handleCloseAddBook,
}) {
    
   
  return (
    <div>
        <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
     <Modal
  show={showAddBook}
  onHide={()=>{
    handleCloseAddBook();
  }}
  centered   // ✅ centers modal vertically
  backdropClassName="custom-backdrop" // ✅ lets us style the backdrop
  dialogClassName="glass-modal"
   backdrop="static" 
>
  <Modal.Header closeButton>
    <Modal.Title>Add Book</Modal.Title>
  </Modal.Header>

  <Modal.Body>
    <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
        <Form.Label>Author</Form.Label>
        <Form.Control type="text" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="sortSelect">
        <Form.Label>Language</Form.Label>
        <Form.Select>
          <option value="">Select Language</option>
          <option value="English">English</option>
          <option value="Malayalam">Malayalam</option>
        </Form.Select>
      </Form.Group>
      <div className='d-flex justify-content-between'>

    <Form.Group className="mb-3 col-5" controlId="exampleForm.ControlInput3">
       <Form.Label>Total Copies</Form.Label>
      <Form.Control type="text" />
      </Form.Group>
       <Form.Group className="mb-3 col-5" controlId="exampleForm.ControlInput2">
      <Form.Label>Remaining Copies</Form.Label>
      <Form.Control type="text" />
      </Form.Group>
      </div>
    </Form>
  </Modal.Body>

  <Modal.Footer>
    <Button variant="secondary" onClick={handleCloseAddBook}>
      Cancel
    </Button>
    <Button className="orangeBtn">Add Book</Button>
  </Modal.Footer>
</Modal>

    </div>
      
    </div>
  )
}
