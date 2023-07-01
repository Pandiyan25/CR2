import "./subscription.css"
import { Route, withRouter } from 'react-router-dom';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const addnewcardmodal = ({showCard,handleCloseShowCard}) => {



    return (
        <div>

       
<Modal
      show={showCard}
      onHide={handleCloseShowCard}
      backdrop="static"
      keyboard={false}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >

      <Modal.Body closeButton style={{padding:"30px"}}>
      <h2 className="mb-4" style={{ color: "#333333", fontWeight: "600" }}>Add New Card</h2>
   
      <form>
      <div className="form-group mb-4">
        <label for="inputAddress">Card Number</label>
        <input type="text" className="form-control" id="inputAddress" placeholder=""></input>
    </div>
    <div className="form-row mb-4">
        <div className="form-group col-md-6">
            <label for="inputEmail4">Expiry Date</label>
            <input type="text" className="form-control" id="inputEmail4" placeholder="MM/YY"></input>
        </div>
        <div className="form-group col-md-6">
            <label for="inputPassword4">CVV/CVC</label>
            <input type="text" className="form-control"></input>
        </div>
    </div>

    <div className="form-group mb-4">
        <label for="inputAddress2">Card Holder Name</label>
        <input type="text" className="form-control"></input>
    </div>

    <div className="form-group">
        <div className="form-check pl-0">
            <div className="custom-control custom-checkbox checkbox-info">
                <input type="checkbox" className="custom-control-input" id="gridCheck"></input>
                <label className="custom-control-label" for="gridCheck">Save Card</label>
            </div>
        </div>
    </div>
    <button className="getstarted">Add Card</button>


</form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => { handleCloseShowCard() }}>Close</Button>
      </Modal.Footer>
    </Modal>
    </div>
  );
}


export default withRouter(addnewcardmodal);