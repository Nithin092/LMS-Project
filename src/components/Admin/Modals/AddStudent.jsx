import React, { useContext, useState, useEffect } from 'react'
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import {StudentContext }from '../../../store/StudentContext';



export const AddStudent = ({ show, handleClose, initialData ,isEdit}) => {

  const { addStudent } = useContext(StudentContext)

  const [formData, SetFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: ""
  })

  useEffect(() => {
   if(isEdit && initialData){
    SetFormData({ name: initialData.name, email: initialData.email })
   }
  }, [isEdit, initialData])
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    SetFormData((prev) => ({ ...prev, [name]: value }))
  }
  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmpassword) {
      alert("Passwords do not match ❌");
      return
    }
    //hardcodedpassword
    if (formData.password !== "nithi") {
      alert("Invalid admin password ❌");
      return;
    }
    addStudent({name:formData.name, email: formData.email})
    alert("Student added successfully ✅");
    SetFormData({ name: "", email: "", password: "", confirmpassword: "" });
    handleClose();
    console.log("Form Data:", formData);
  };
  return (
    <div>
      <div
        className="modal show"
        style={{ display: 'block', position: 'initial' }}
      >
        <Modal
          show={show}
          onHide={handleClose}
          centered   // ✅ centers modal vertically
          backdropClassName="custom-backdrop" // ✅ lets us style the backdrop
          dialogClassName="glass-modal"
          backdrop="static"
        >
          <Modal.Header closeButton>
            <Modal.Title>{isEdit?"Edit Student":"Add Student"}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form >
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" name='name' value={formData.name ?? ""} onChange={handleChange} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                <Form.Label>Email</Form.Label>
                <Form.Control type="text" name='email' value={formData.email ?? ""} onChange={handleChange} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" value={formData.password ?? ""} onChange={handleChange} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" name="confirmpassword" value={formData.confirmpassword ?? "" } onChange={handleChange} />
              </Form.Group>

               <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button> 
            <Button className="orangeBtn" type='submit' onClick={handleSubmit} >{isEdit ? "Update Student" : "Add Student"}</Button>
          </Modal.Footer>
            </Form>
          </Modal.Body>
         
        </Modal>

      </div>

    </div>
  )
}