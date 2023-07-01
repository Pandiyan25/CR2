import React, { useState } from 'react';
// import {uri} from '../../../../../.env'
import { Button, Modal, } from "react-bootstrap";
import MySelect from './MySelect';
import { colourOptions } from "./Data";

import { components } from "react-select";
function TokemomicsModal({
    changeNewData,
    tokenContactLink,
    settokenContactLink,
    arr,
    handleChangeName,
    handleChangeValue,
    addInput,
    show,
    handleClose,
    tokenTypeData,
    settokenTypeData,
    checkData,
    setcheckData,
    tokenTicker,
    settokenTicker,
    tokenType,
    settokenType,
    primaryNetwork,
    setprimaryNetwork,
    tokenStd,
    settokenStd,
    publicLaunchPrice,
    setpublicLaunchPrice,
    expTokenGenerationj,
    setexpTokenGenerationj,
    tokenSupply,
    settokenSupply,
    token_supply_breakup,
    settokenSupplyBreakup,
    createTokenFunc,
    updateTokenFunc,
    tokenContactAddress,
    settokenContactAddress,
    TokenMinted,
    setTokenMinted,
    setprimaryNet,
    primaryNet,
    setExternalPrimaryNetwork,
    ExternalPrimaryNetwork
}) {
    const [optionSelected, setoptionSelected] = useState(null)


    // console.log("process.env",process.env.uri);
    const Option = props => {
        return (
            <div>
                <components.Option {...props}>
                    <input
                        type="checkbox"
                        checked={props.isSelected}
                        onChange={() => null}
                    />{" "}
                    <label>{props.label}</label>
                </components.Option>
            </div>
        );
    };


    const MultiValue = props => (
        <components.MultiValue {...props}>
            <span>{props.data.label}</span>
        </components.MultiValue>
    );

    const handleChange = selected => {
        //  console.log(selected,"selected");s
        settokenType(selected)
        //  settokenType()
        // setoptionSelected()
        //   optionSelected: selected
        // });
    };

    const disablePastDate = () => {
        const today = new Date();
        const dd = String(today.getDate() + 1).padStart(2, "0");
        const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
        const yyyy = today.getFullYear();
        return yyyy + "-" + mm + "-" + dd;
    };

    // console.log(TokenMinted,"TokenMinted");

    const handlePrimaryNetwork = (e) => {
        if(e == "other")
        {
            console.log("othets triggered !!")
        setprimaryNet(false);
        }
        else{
            setprimaryNet(true);
            setprimaryNetwork(e)
        }
      }
      const handleCloseInputFunc = () =>{
        
        setprimaryNet(true)
    }
    const handleExternalNetwork = (e) =>{
        setExternalPrimaryNetwork(e)
        setprimaryNetwork(null)
    }

    return (
        <>


            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size="lg"
            >
                <Modal.Header closeButton style={{ borderBottom: '0px' }}>
                    <Modal.Title>Tokenomics - Edit</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>

                        <div className="row">
                            <div className="col-md-12">

                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Token Ticker <span className="text-danger">*</span></label>
                                            <input type="text" className="form-control" defaultValue={tokenTicker} onChange={(e) => settokenTicker(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Token Minted<span className="text-danger">*</span></label>

                                            <select className="form-control btn-block-height square-edges" value={TokenMinted} onChange={(e) => setTokenMinted(e.target.value)}>
                                                <option style={{ fontSize: '13px' }} value="">Select</option>
                                                <option style={{ fontSize: '13px' }} value={"true"}>Yes</option>
                                                <option style={{ fontSize: '13px' }} value={"false"}>No </option>
                                            </select>

                                        </div>
                                    </div>
                                    {
                                        TokenMinted == 'true' || TokenMinted == true ?
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>Token Contract  Address <span className="text-danger">*</span></label>
                                                    <input type="text" className="form-control" defaultValue={tokenContactAddress} onChange={(e) => settokenContactAddress(e.target.value)} />
                                                </div>
                                            </div>
                                            :
                                            <></>
                                    }
                                    {
                                        TokenMinted == 'true' || TokenMinted == true ?
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>Token Contract Link <span className="text-danger">*</span></label>
                                                    {/* defaultValue={tokenContactAddress} onChange={(e) => settokenContactAddress(e.target.value)}  */}
                                                    <input type="text" className="form-control" defaultValue={tokenContactLink} onChange={(e)=>settokenContactLink(e.target.value)} />
                                                </div>
                                            </div>
                                            :
                                            <></>
                                    }

                                    {/* <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Token Contract  Address <span className="text-danger">*</span></label>
                                            <input type="text" className="form-control" defaultValue={tokenContactAddress} onChange={(e) => settokenContactAddress(e.target.value)} />
                                        </div>
                                    </div> */}

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Token Type <span className="text-danger">*</span></label>
                                            {/* <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <div style={{ width: '35%' }} >
                                                    <select className="form-control btn-block-height square-edges" >
                                                        <option style={{ fontSize: '13px' }} value="">Select</option>
                                                        <option style={{ fontSize: '13px' }} value="1 ">1 </option>
                                                        <option style={{ fontSize: '13px' }} value="2 ">2 </option>
                                                        <option style={{ fontSize: '13px' }} value="3 ">3 </option>
                                                    </select>
                                                </div>

                                                <input type="text" className="form-control" style={{ width: '60%' }} />
                                            </div> */}
                                            <MySelect
                                                options={colourOptions}
                                                isMulti
                                                closeMenuOnSelect={false}
                                                hideSelectedOptions={false}
                                                components={{ Option, MultiValue }}
                                                onChange={handleChange}
                                                allowSelectAll={true}
                                                value={tokenType}
                                            />
                                        </div>
                                    </div>
                                    {/* <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Token Type:<span className="text-danger">*</span></label>
                                            <input type="text" className="form-control" />
                                        </div>
                                    </div> */}
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Primary Network <span className="text-danger">*</span></label>
                                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                               
                                               
                                                <div style={{ width: '95%' }} >
                                                {primaryNet == true? 
                                                                           <select className="form-control btn-block-height square-edges" value={primaryNetwork} onChange={(e) => handlePrimaryNetwork(e.target.value)}>
                                                                           <option style={{ fontSize: '13px' }} value="">Select</option>
                                                                           <option style={{ fontSize: '13px' }} value="Ethereum">Ethereum </option>
                                                                           <option style={{ fontSize: '13px' }} value="Polygon">Polygon </option>
                                                                           <option style={{ fontSize: '13px' }} value="Binance">Binance </option>
                   
                                                                           <option style={{ fontSize: '13px' }} value="Avalanche">Avalanche </option>
                   
                                                                           <option style={{ fontSize: '13px' }} value="AME">AME </option>
                                                                           <option style={{ fontSize: '13px' }} value="Fantom">Fantom </option>
                                                                           <option style={{ fontSize: '13px' }} value="other">other</option>
                                                                       </select>
                                                                                                      :<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

                                                                                                      {/*  */}
                                                                                                      <input type="text" className="form-control" style={{ width: '80%' }} value={ExternalPrimaryNetwork} onChange={(e) => handleExternalNetwork(e.target.value)} />
                                                                                                      <button style={{
                                                                                                          borderRadius: '0px 5px 5px 0px',
                                                                                                          fontSize: '22px',
                                                                                                          height: "44px", minWidth: '65px', fontWeight: '600'
                                              
                                                                                                      }} className="btn add-btn-search" onClick={handleCloseInputFunc}>X</button>
                                                                                                  </div>
                                                                                                  }
                                                                                        </div>



                                                {/* <input type="text" className="form-control" style={{ width: '60%' }} /> */}
                                            </div>

                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Token Standard </label>
                                            <div >
                                                <select className="form-control btn-block-height square-edges" defaultValue={tokenStd} onChange={(e) => settokenStd(e.target.value)} >
                                                    <option style={{ fontSize: '13px' }} value="">Select</option>
                                                    <option style={{ fontSize: '13px' }} value="ERC 20 ">ERC 20 </option>
                                                    <option style={{ fontSize: '13px' }} value="ERC 721">ERC 721</option>
                                                    <option style={{ fontSize: '13px' }} value="ERC 777">ERC 777 </option>
                                                    <option style={{ fontSize: '13px' }} value="ERC 1155">ERC 1155 </option>
                                                    <option style={{ fontSize: '13px' }} value="BEP 20">BEP 20 </option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Public Launch Price </label>
                                            <input type="number" className="form-control" defaultValue={publicLaunchPrice} onChange={(e) => setpublicLaunchPrice(e.target.value)} onWheel={(e) => e.target.blur()} />
                                            {/* <div >
                                                <select className="form-control btn-block-height square-edges">
                                                    <option style={{ fontSize: '13px' }} value="">Select</option>
                                                    <option style={{ fontSize: '13px' }} value="1 ">1 </option>
                                                    <option style={{ fontSize: '13px' }} value="2 ">2 </option>
                                                    <option style={{ fontSize: '13px' }} value="3 ">3 </option>
                                                </select>
                                            </div> */}
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Expected Token Generation Event <span className="text-danger">*</span></label>
                                            <input type="date" className="form-control" min={disablePastDate()} defaultValue={expTokenGenerationj} onChange={(e) => setexpTokenGenerationj(e.target.value)} />
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Total Token Supply <span className="text-danger">*</span></label>
                                            <input type="number" className="form-control" defaultValue={tokenSupply} onChange={(e) => settokenSupply(e.target.value)} onWheel={(e) => e.target.blur()} />
                                            {/* <div  >
                                                <select className="form-control btn-block-height square-edges">
                                                    <option style={{ fontSize: '13px' }} value="">Select</option>
                                                    <option style={{ fontSize: '13px' }} value="1 ">1 </option>
                                                    <option style={{ fontSize: '13px' }} value="2 ">2 </option>
                                                    <option style={{ fontSize: '13px' }} value="3 ">3 </option>
                                                </select>
                                            </div> */}
                                        </div>
                                    </div>
                                    {/* <div className="col-md-12">
                                        <div className="">
                                            <label>Token Supply Breakup:</label>
                                                 <div style={{ width: '35%' }} >
                                                    <select className="form-control btn-block-height square-edges"   >
                                                        <option style={{ fontSize: '13px' }} value="">Select</option>
                                                        <option style={{ fontSize: '13px' }} value="1 ">1 </option>
                                                        <option style={{ fontSize: '13px' }} value="2 ">2 </option>
                                                        <option style={{ fontSize: '13px' }} value="3 ">3 </option>
                                                    </select>
                                                </div> */}
                                    {/* {arr.map((item, i) => {
                                                    return (
                                                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                           
                                                        <input className="form-control"
                                                        onChange={(e)=>handleChangeName(e)}
                                                            value={item.category}
                                                            id={i}
                                                            type={item.type}
                                                            style={{width:'65%',margin:'10px'}}
                                                            size="40"
                                                        />
                                                        <div style={{ width: '35%' }} >
                                                        <select id={i} className="form-control btn-block-height square-edges" value={item.value} onChange={(e)=>handleChangeValue(e)} >
                                                            <option style={{ fontSize: '13px' }}  value="">Select</option>
                                                            <option style={{ fontSize: '13px' }} value="1">1</option>
                                                            <option style={{ fontSize: '13px' }} value="5">5</option>
                                                            <option style={{ fontSize: '13px' }} value="7">7</option>
                                                            <option style={{ fontSize: '13px' }} value="10">10</option>
                                                            <option style={{ fontSize: '13px' }} value="17 ">17 </option>
                                                            <option style={{ fontSize: '13px' }} value="25">25</option>
                                                        </select>
                                                    </div>
                                                    </div>
                                                    );
                                                })} */}

                                    {/* <input type="text" className="form-control" style={{ width: '35%'  }} />

                                                <input type="text" className="form-control" style={{ width: '60%' }} /> */}


                                    {/* </div>
                                    </div> */}



                                </div>
                            </div>
                        </div>

                    </form>
                </Modal.Body>
                <Modal.Footer style={{ borderTop: '0px', justifyContent: 'end' }}>
                    {/* <div className="submit-section">
                        <button className="btn  submit-btn" onClick={()=>addInput()} style={{ background: 'white', border: '1px solid #00c5fb', color: '#00c5fb' }}>Add Another Line</button>
                    </div> */}
                    <div className="submit-section">
                        <button className="btn  submit-btn" onClick={() => handleClose()} style={{ background: 'white', border:"1px solid rgb(41, 122, 255)", color:"rgb(41, 122, 255)" }}>CANCEL</button>
                    </div>
                    {checkData != null && checkData != undefined && checkData != '' ?
                        <div className="submit-section">
                            <button className="btn btn-primary submit-btn" onClick={() => updateTokenFunc()}>SAVE</button>
                        </div>
                         : 
                         <div className="submit-section">
                            <button className="btn btn-primary submit-btn" onClick={() => changeNewData()}>SAVE</button>
                        </div> 
                    } 


                </Modal.Footer>








            </Modal>
        </>
    );
}

export default TokemomicsModal;