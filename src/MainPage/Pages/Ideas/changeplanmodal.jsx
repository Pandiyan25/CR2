
import "./subscription.css"
import { Route, withRouter } from 'react-router-dom';

import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Changeplanmodal = ({show,handleClose}) => {
  const [termStarter, settermStarter] = useState("monthly")
  const [termPro, settermPro] = useState("monthly")


    return (
        <div>

       
<Modal


      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >

      <Modal.Body closeButton>
      <h2 className="mb-4" style={{ color: "#333333", fontWeight: "600" }}>Plans</h2>
   
      <div className="row">
                    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 ">
                        <div className="cardplanpopup">
                            <div style={{textAlignLast:"end"}}>
                                {/* <button >Monthly </button>
                                <button >Yearly</button> */}
                            </div>
                          <h2 className="planhead mt-2">Ultimate</h2>
                          <p className="plandet"><span className="high">$149</span></p>
                          <p className="plandet">One Time Payment</p>
                         

                          <button className="getstarted">Get Started</button>
                        </div>
                    </div>

                    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 ">
                        <div className="cardplanpopup">
                            <div style={{textAlignLast:"end"}}>
                 
                            <div style={{backgroundColor:"#f9ecff",width:"140px",borderRadius:"15px",margin:"auto"}}>


                              {termStarter == "monthly" ?                 
                              <div>
                              <button className="termactive" onClick={() => settermStarter("monthly")}>Monthly</button>
                            <button className="term" onClick={() => settermStarter("yearly")}>Yearly</button>
                              </div>:    <div>
                              <button className="term" onClick={() => settermStarter("monthly")}>Monthly</button>
                            <button className="termactive" onClick={() => settermStarter("yearly")}>Yearly</button>
                              </div>}
          
                 
                            
                            </div>
             
                            </div>
                          <h2 className="planhead mt-3">Elite</h2>

                          {
                          termStarter == "monthly" ?  
                          <p className="plandet"><span className="high">$49/Month</span></p>
                           : termStarter == "yearly" ?
                          <p className="plandet"><span className="high">$399/Year</span></p>:<></>
                        }

        
                          <button className="getstarted">Get Started</button>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 ">
                        <div className="cardplanpopup">
                            <div style={{textAlignLast:"end"}}>
                            <div style={{backgroundColor:"#f9ecff",width:"140px",borderRadius:"15px",margin:"auto"}}>

                            {termPro == "monthly" ?                 
                              <div>
                              <button className="termactive" onClick={() => settermPro("monthly")}>Monthly</button>
                            <button className="term" onClick={() => settermPro("yearly")}>Yearly</button>
                              </div>:    
                              <div>
                              <button className="term" onClick={() => settermPro("monthly")}>Monthly</button>
                            <button className="termactive" onClick={() => settermPro("yearly")}>Yearly</button>
                              </div>}
          
        


                            </div>
                            </div>
                          <h2 className="planhead mt-3">Master</h2>
                     {
                          termPro == "monthly" ?  
                          <>
                          <p className="plandet"><span className="high">$249/Month</span></p>
                          </>
                           : termPro == "yearly" ?
                           <>
                          <p className="plandet"><span className="high">$2499/Year</span></p>
                          </>
                          :<></>
                        } 
                         
                
                          <button className="getstarted">Get Started</button>
                        </div>
                    </div>

                </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => { handleClose() }}>Close</Button>
      </Modal.Footer>
    </Modal>
    </div>
  );
}


export default withRouter(Changeplanmodal);