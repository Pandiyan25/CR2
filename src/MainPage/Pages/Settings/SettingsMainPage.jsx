



import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import PaymentPage from './Payments/PaymentsPage';
import ProfilePage from './Profile/ProfilePage';
import UserRoleMainPage from './userRole/userRole';



const SettingsMainPage = () => {
    const [userProfile, setUserProfile] = useState(true)
    const [showPayments, setshowPayments] = useState(false)
    const [showExpense, setshowExpense] = useState(false)


    const changeToUserProfilefunc = () => {
        setUserProfile(true)
        setshowPayments(false)
        // setshowExpense(false)

    }

    const changeToProfilefunc = () => {

        setUserProfile(false)
        setshowPayments(true)
        // setshowExpense(false)
    }

    const changeToPaymentsfunc = () => {

        setUserProfile(false)
        setshowPayments(false)
        // setshowExpense(true)
    }

   

    return (
        <>

            <div className="page-wrapper" style={{paddingTop:'60px'}}>

                <div className="content container-fluid">
                    <div >
                        <div className="page-header">
                            <div className="header-left">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <h3 className="page-title">Settings</h3>

                                    </div>
                                </div>
                            </div>

                        </div>
                        <div style={{ background: 'white', padding: '20px', borderRadius: '2px', boxShadow: '0px 10px 20px #C4C8D0' }}>

                            <div className="row" style={{ marginBottom: '20px' }}>
                                <div className="col-sm-12">
                                    {/* {userProfile == true ?
                                        <div>
                                            <Button className="buttonTopColor3" onClick={() => changeToUserProfilefunc()}>User Profile</Button>
                                            <Button className="buttonTop3" onClick={() => changeToProfilefunc()}>Profile</Button>
                                            <Button className="buttonTop3" onClick={() => changeToPaymentsfunc()}>Payments</Button>
                                        </div>

                                        :
                                        showPayments == true ?
                                            <div>
                                                <Button className="buttonTop3" onClick={() => changeToUserProfilefunc()}>User Profile</Button>
                                                <Button className="buttonTopColor3" onClick={() => changeToProfilefunc()}>Profile</Button>
                                                <Button className="buttonTop3" onClick={() => changeToPaymentsfunc()}>Payments</Button>
                                            </div>
                                            :
                                                <div>

                                                    <Button className="buttonTop3" onClick={() => changeToUserProfilefunc()}>User Profile</Button>
                                                    <Button className="buttonTop3" onClick={() => changeToProfilefunc()}>Profile</Button>
                                                    <Button className="buttonTopColor3" onClick={() => changeToPaymentsfunc()}>Payments</Button>

                                                    </div>
                                               


                                    } */}
                                    {/* {
                                        userProfile == true ? */}
                                        {/* <UserRoleMainPage />
                                        :
                                        showPayments == true ?
                                        <ProfilePage />
                                        : */}
                                        <PaymentPage />
                                    {/* } */}



                                   
                                </div>


                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );

}
export default SettingsMainPage;
