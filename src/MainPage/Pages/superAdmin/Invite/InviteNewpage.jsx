import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { apiURI } from '../../../../config/config';
import { useSelector,useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'material-react-toastify';

import 'material-react-toastify/dist/ReactToastify.css';

const InviteNewPage = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [Role, setRole] = useState('')

    const loginId = useSelector((state) => state.constVar.loginId)
    const sendReq = () => {
        if (name != '' && email != '' && Role != '') {
            try {
                const query = `mutation Mutation($input: InviteMailInput) {
                        inviteFounder(input: $input)
                      }`;
                fetch(apiURI.URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                         'Accept': 'application/json',
          'x-power': process.env.POWER_KEY,
          'x-domain-agent': process.env.DOMAIN_AGENT,
          'x-strict-origin-name': process.env.ORIGIN_NAME,
          'x-range-name': process.env.RANGE_NAME
                    },
                    body: JSON.stringify({
                        query,
                        variables: {
                            input: {


                                "name": name,
                                "email": email,
                                "role": Role,
                                "user": loginId



                                // "email": email,
                                // "password": '123456',
                                // "role": Role,
                                // "first_name": name,
                            }
                        }

                    })
                })
                    .then((response) => {

                        const json = response.json();
                        return json;
                    })
                    .then(data => {
                        // alert('Mail has been sent to ' + data);
                        console.log(data.data?.inviteFounder,"data?.inviteFounder");
                        if (data.data?.inviteFounder == "Success") {

                            console.log(data.data?.inviteFounder,"data.data?.inviteFounder1");
                            // alert('Mail has been sent to ' + email);
                            toast.success('Mail has been sent to ' + email, {
                                position: "top-right",
                                autoClose: 3000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                            });
                        // }
                        
                    } else if (data?.data?.inviteFounder != null && data?.data?.inviteFounder != undefined && data?.data?.inviteFounder != '' && data?.data?.inviteFounder == 'Email_already_exists') {

                        toast.error(' The entered mail already exists. Please register using a different mail ID', {
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                        });
                    } else if (data?.data?.inviteFounder != null && data?.data?.inviteFounder != undefined && data?.data?.inviteFounder != '' && data?.data?.inviteFounder == 'Email_has_already_sent') {
                        alert('Mail has already sent to this account')
                        // 
                    } else {
                        toast.error(' The entered mail already exists. Please register using a different mail ID', {
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                        });
                    }
                    // else {

                    //         console.log(data.data?.inviteFounder,"data.data?.inviteFounder2");
                    //         toast.error(' The entered mail already exists. Please register using a different mail ID', {
                    //             position: "top-right",
                    //             autoClose: 3000,
                    //             hideProgressBar: false,
                    //             closeOnClick: true,
                    //             pauseOnHover: true,
                    //             draggable: true,
                    //         });
                    //     }

                    }
                    )
            } catch (error) {
                console.log(error, "");
            }
        } else {
            alert('Please fill all the Mandtory Fields')
        }


    }



    return (

        <div className="page-wrapper" style={{paddingTop:'60px'}}>

            {/* Page Content */}
            <div className="content container-fluid">
                {/* Page Header */}
                <div className="page-header">
                    <div className="header-left">
                        <div className="row">
                            <div className="col-sm-12">
                                <h3 className="page-title">Invite </h3>

                            </div>
                        </div>
                    </div>

                </div>
                <div style={{ background: 'white', padding: '20px', borderRadius: '15px', boxShadow: 'rgb(196 200 208) 0px 10px 20px' }}>

                    <div className="row">
                        <div className="col-md-12">
                            <div className="row">

                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label>Name<span className="text-danger">*</span></label>
                                        <div>
                                            <input type="text" className="form-control" onChange={(e) => setName(e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label>Email<span className="text-danger">*</span></label>
                                        <div>
                                            <input type="email" className="form-control" onChange={(e) => setEmail(e.target.value)} />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label>Role<span className="text-danger">*</span></label>
                                        {/* <input type="text" className="form-control"  /> */}
                                        <div>
                                            <select className="form-control btn-block-height square-edges" onChange={(e) => setRole(e.target.value)}>
                                                <option style={{ fontSize: '13px' }} value="">Select</option>
                                                <option style={{ fontSize: '13px' }} value="Investor">Investor</option>
                                                <option style={{ fontSize: '13px' }} value="Founder">Founder</option>
                                                <option style={{ fontSize: '13px' }} value="Validator">Validator</option>
                                            </select>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>
                        <div className="col-md-12" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

                            <div className="submit-section">
                                {/* <button className="btn buttonInProposal submit-btn" >BACK</button> */}
                            </div>
                            <div className="submit-section">
                                <button className="btn buttonInProposal1 submit-btn" onClick={() => sendReq()}>SEND REQUEST</button>
                            </div>
                        </div>

                    </div>
                </div>
        <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            </div>
        </div>

    );

}

export default withRouter(InviteNewPage);