import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import Card from '../screens/Card';
export default function Pop() {

    const [show, setShow] = useState(false);

  return (
    <>
      <div onClick={() => setShow(true)}>
        Cart
      </div>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Custom Modal Styling
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
    <Table striped bordered hover>
      <Card/>
    </Table>
        </Modal.Body>
      </Modal>
    </>
  );
}

