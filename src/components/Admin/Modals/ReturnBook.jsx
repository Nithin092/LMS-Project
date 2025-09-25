import React, { useContext, useState } from 'react'
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { BookContext } from '../../../store/BookContext';
import { useEffect } from 'react';

export default function ReturnBook({ show,handleCloseReturn, handleConfirm }) {
   

  return (
    <Modal
      show={show}
      onHide={handleCloseReturn}
      centered
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title>Mark as returned?</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Are you sure you want to mark this book as returned?</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="outline-secondary" onClick={handleCloseReturn}>
          No
        </Button>
        <Button className="orangeBtn" onClick={handleConfirm}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}