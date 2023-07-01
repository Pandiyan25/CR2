



import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

import { useSelector } from 'react-redux';
import { Table } from 'antd';
import 'antd/dist/antd.css';
import { itemRender, onShowSizeChange } from '../../../paginationfunction';
import { apiURI } from '../../../../config/config';
import UserRoleModalPage from './UserRoleModel';


const UserRoleMainPage = () => {
    const [ShowGeneral, setShowGeneral] = useState(true)
    const [showBudget, setshowBudget] = useState(false)
    const [showExpense, setshowExpense] = useState(false)
    const [createInitialProp, setcreateInitialProp] = useState(false)
    const [createSubseqPropProp, setcreateSubseqPropProp] = useState(false)
    const [name,setName] = useState('')
    const [emailId,setEmailID] = useState('')
    const [RoleData,setRoleData] = useState('')
    const [mainId,setmainId] = useState('')
    const [showPopup, setsetShowPopup] = useState(false)
    
  const projectNumber = useSelector((state) => state.constVar.projectId)
    const [nameEdit,setNameEdit] = useState('')
    const [emailIdEdit,setEmailIDEdit] = useState('')
    const [RoleDataEdit,setRoleDataEdit] = useState('')
    const [mainData,setmainData] = useState([])

    const loginId = useSelector((state) => state.constVar.loginId)
    const COLORS = ["orange", "gray"];
    
    const [emailId2, setEmailId2] = useState(false)
    const [emailId1, setEmailId1] = useState(false)
    const data = [
        { name: 'Supporters', students: 400, color: 'green' },
        { name: 'Opposer', students: 400, color: 'red' },
        // {name: 'Opposers', students: 700},
        // {name: 'Geek-i-knack', students: 200},
        // {name: 'Geek-o-mania', students: 1000}
    ];

    const [tableData, settableData] = useState([
        {
            Name: 'test',
            emailId: 'test',
            Role: 'test',


        },
        {

            Name: 'test',
            emailId: 'test',
            Role: 'test',
        },

    ])

    const columns = [

        {
            title: 'Name',
            dataIndex: 'name',
            align: 'center',

        },

        {
            title: 'Email ID',
            dataIndex: 'email_id',
            align: 'center',
        },

        {
            title: 'Role',
            dataIndex: 'role',
            align: 'center',
        }, {
            title: 'Action',
            // dataIndex: 'fundsStatus',
            align: 'center',
            width: '20px',
            render: (text, record) => (
                // <strong>{text}</strong>
                <div style={{display:'flex',flexDirection:'row',width:'140px',justifyContent:'space-between'}}>
                    <Button style={{padding:'0px ',fontSize:'17px',height:'30px',borderRadius:'15px ',width:'60px'}} onClick={()=>showMainDataPopup(text)}><i className="fa fa-pencil" /></Button>
                    <Button style={{padding:'0px ',fontSize:'17px',height:'30px',borderRadius:'15px ',width:'60px'}} onClick={()=>deleteFunc(text._id)}><i className="fa fa-trash"></i></Button>
                
                </div>
            ),
        },


    ]

    const showMainDataPopup = (i) =>{
        setmainId(i._id)
        setShowPopup(true)
        setEmailIDEdit(i.email_id)
        setNameEdit(i.name)
        setRoleDataEdit(i.role)
    }
    const handleClosePopup = () =>{
        setShowPopup(false)

    }

   

    const createinitialfunc = () => {
        setcreateInitialProp(true)
    }
    const createSubseqPropfunc = () => {
        setcreateSubseqPropProp(true)
    }
    const handleClose = () => {
        setcreateInitialProp(false)
    }

    const handleCloseSubSequent = () => {
        setcreateSubseqPropProp(false)
    }
    useEffect(()=>{
        if(loginId != ''){
            getUserDetailsFunc()
        }
        
    },[loginId])

    const getUserDetailsFunc = () => {

        try {


            var query = `
            query AllUserRole($user: ID) {
                allUserRole(user: $user) {
                  _id
                  name
                  email_id
                  role
                 
                }
              }
        `;

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
                        "user": loginId
                    }

                })
            })
                .then((response) => {

                    const json = response.json();
                    return json;
                })
                .then(data => {
                    console.log(data?.data?.allUserRole,"data?.data?.allUserRole");
                    if (data?.data?.allUserRole != null && data?.data?.allUserRole != undefined && data?.data?.allUserRole?._id != null) {
                        setmainData([data?.data?.allUserRole])
                    } else {
                        setmainData([])
                    }

                })
        }
        catch (error) {
            console.log(error, "error in Founder Project");
        }
    }

    const sendReqfun = () =>{

        try {


            var query = `
            mutation Mutation($input: UserRoleInput) {
                createUserRole(input: $input) {
                  _id
                  name
                  email_id
                  role
                }
              }
        `;

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
                        "input": {
                          "name": name,
                          "email_id": emailId,
                          "role": RoleData,
                          "user": loginId
                        }
                      }

                })
            })
                .then((response) => {

                    const json = response.json();
                    return json;
                })
                .then(data => {
                    if (data?.data?.createUserRole != null && data?.data?.createUserRole != undefined) {
                        getUserDetailsFunc()
                    }else{
                        setEmailId1(true)
                        alert('please check the details')
                    }

                })
        }
        catch (error) {
            console.log(error, "error in Founder Project");
        }
    }


    const sendhandleMailfunc = () => {
        try {
            var query = `
            mutation InviteFounder($input: InviteMailInput) {
                inviteFounder(input: $input)
              }
            `;
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
                        "input": {
                            "name": name,
                            "email": emailId,
                            "project": projectNumber,
                            "role": "Co-Founder",
                            "user": loginId
                        }
                    }

                })
            })
                .then((response) => {

                    const json = response.json();
                    return json;
                })
                .then(data => {
                    console.log(data, "data in Team");
                    if (data?.data?.inviteFounder != null && data?.data?.inviteFounder != undefined && data?.data?.inviteFounder != '' && data?.data?.inviteFounder == 'Success') {
                        setName('')
                        setEmailID('')
                        getUserDetailsFunc()
                        setEmailId1(false)
                        setEmailId2(false)
                    // } else {
                    //     alert("Email Id already Exist")
                    //     setEmailId2(true)
                    // }

                    
                } else if (data?.data?.inviteFounder != null && data?.data?.inviteFounder != undefined && data?.data?.inviteFounder != '' && data?.data?.inviteFounder == 'Email_already_exists') {

                    alert('User Already exist')
                    setEmailId2(true)
                } else if (data?.data?.inviteFounder != null && data?.data?.inviteFounder != undefined && data?.data?.inviteFounder != '' && data?.data?.inviteFounder == 'Email_has_already_sent') {
                    alert('Mail has already sent to this account')
                    // 
                } else {
                    setEmailId2(true)
                }

                    // getSocialMediaDataFunc()
                })


        } catch (error) {
            console.log("adding new Team member error");
        }
    }

    const sendReqMail = () => {
        let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const result = pattern.test(emailId);
        if (result == true) {
            sendhandleMailfunc()
            setEmailId1(false)
        } else {
            setEmailId1(true)

        }
    }

    const deleteFunc = (i) =>{

        try {


            var query = `
            mutation DeleteUserRole($id: ID) {
                deleteUserRole(_id: $id)
              }
        `;

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
                        "id": i
                      }

                })
            })
                .then((response) => {

                    const json = response.json();
                    return json;
                })
                .then(data => {
                    if (data?.data?.deleteUserRole != null && data?.data?.deleteUserRole != undefined) {
                        getUserDetailsFunc()
                    }else{
                        alert('please check the details')
                    }

                })
        }
        catch (error) {
            console.log(error, "error in Founder Project");
        }
    }
    return (
        <>

            <div >
                <div className="page-header">
                    <div className="header-left">
                        <div className="row">
                            <div className="col-sm-12">
                                <h3 className="page-title">User Roles</h3>

                            </div>
                        </div>
                    </div>

                </div>


                <div >
                    <div>

                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>

                                    <label style={{ width: '25%', fontSize: '20px', fontWeight: '500' }}> Name </label>
                                    <input type="text" className="form-control" style={{ width: '40%' }}  onChange={(e)=>setName(e.target.value)}/>




                                </div>
                                <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>

                                    <label style={{ width: '25%', fontSize: '20px', fontWeight: '500' }}> Email ID </label>
                                    <input type="email" className="form-control" style={{ width: '40%' }}   onChange={(e)=>setEmailID(e.target.value)}/>
                                    {emailId1 == false && emailId2 == false ? '' :
                                    emailId2 == true ?
                                    <div style={{ color: 'red', fontSize: '12px' }}>Enter Email Id Already Exists</div>


                                    :
                                    <div style={{ color: 'red', fontSize: '12px' }}>Please Enter Valid Email Id</div>}




                                </div>
                                {/* <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>

                                    <label style={{ width: '25%', fontSize: '20px', fontWeight: '500' }}>Role :</label>
                                    <div style={{ width: '40%' }}>
                                        <select className="css-1s2u09g-control"   onChange={(e)=>setRoleData(e.target.value)}>
                                            <option style={{ fontSize: '13px' }}>Select</option>
                                            <option style={{ fontSize: '13px' }} value="SuperUser ">SuperUser </option>
                                            <option style={{ fontSize: '13px' }} value="Admin">Admin</option>
                                            <option style={{ fontSize: '13px' }} value="Operations">Operations</option>
                                            <option style={{ fontSize: '13px' }} value="Finance">Finance</option>
                                            <option style={{ fontSize: '13px' }} value="User">User</option>
                                        </select>
                                    </div>




                                </div> */}

                                <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>

                                    <div>
                                        <button style={{height:'40px',width:'145px',fontSize:'13px',fontWeight:'500',border:'2px solid #6345ED',borderRadius:'50px',background:'#6345ED',color:'white'}} onClick={()=>sendReqMail()}>Send Request</button>
                                    </div>




                                </div>
                            </div>

                        </div>
                        <div className="row">
                            <div className="col-md-12 d-flex">

                                <div className="card card-table flex-fill">

                                    <div className="card-body">
                                        <div className="table-responsive">
                                            <Table
                                                pagination={{
                                                    total: mainData?.length,
                                                    showSizeChanger: true, onShowSizeChange: onShowSizeChange, itemRender: itemRender
                                                }
                                                }
                                                style={{ overflowX: 'auto' }}
                                                columns={columns}
                                                bordered
                                                dataSource={mainData}
                                                rowKey={record => record.id}
                                            // onChange={this.handleTableChange}
                                            />

                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>

                    </div>
                </div>
                <UserRoleModalPage 
                show={showPopup} 
                handleClose={handleClosePopup} 
                nameEdit={nameEdit}
                emailIdEdit={emailIdEdit}
                RoleDataEdit={RoleDataEdit}
                setNameEdit={setNameEdit}
                setEmailIDEdit={setEmailIDEdit}
                setRoleDataEdit={setRoleDataEdit}
                mainId={mainId}
                getUserDetailsFunc={getUserDetailsFunc}
                />
                {/* <RecordExpenseModal show={recordExpense} handleClose={handleClose} />
                                        <AddVendorModal show={addVendor} handleClose={handleCloseaddVendor} /> */}

            </div>

        </>
    );

}
export default UserRoleMainPage;
