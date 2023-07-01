



import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import BudgetPage from '../../FounderProject/Budget/BudgetPage';
import ExpensePage from './Expense/ExpensePage';
import GeneralStatus from './General/GeneralPage';
import VendorsPage from './Vendors/VendorsPage'; 



const ExpenseManagement = () => {
    const [ShowGeneral, setShowGeneral] = useState(true)
    const [showBudget, setshowBudget] = useState(false)
    const [showExpense, setshowExpense] = useState(false)


    const changeToGeneralfunc = () => {
        setShowGeneral(true)
        setshowBudget(false)
        setshowExpense(false)

    }

    const changeToBudgetfunc = () => {

        setShowGeneral(false)
        setshowBudget(true)
        setshowExpense(false)
    }

    const changeToExpensefunc = () => {

        setShowGeneral(false)
        setshowBudget(false)
        setshowExpense(true)
    }

    const changeToVendorfunc = () => {

        setShowGeneral(false)
        setshowBudget(false)
        setshowExpense(false)
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
                                        <h3 className="page-title">Expense Management</h3>

                                    </div>
                                </div>
                            </div>

                        </div>
                        <div style={{ background: 'white', padding: '20px', borderRadius: '2px', boxShadow: '0px 10px 20px #C4C8D0' }}>

                            <div className="row" style={{ marginBottom: '0px' }}>
                                <div className="col-sm-12">
                                    {ShowGeneral == true ?
                                        <div  style={{ marginBottom: '15px' }}>
                                            <Button className="buttonTopColor3" onClick={() => changeToGeneralfunc()}>General</Button>
                                            <Button className="buttonTop3" onClick={() => changeToBudgetfunc()}>Budget</Button>
                                            <Button className="buttonTop3" onClick={() => changeToExpensefunc()}>Expense</Button>
                                            <Button className="buttonTop3" onClick={() => changeToVendorfunc()}>Vendor</Button>
                                        </div>

                                        :
                                        showBudget == true ?
                                            <div  style={{ marginBottom: '15px' }}>
                                                <Button className="buttonTop3" onClick={() => changeToGeneralfunc()}>General</Button>
                                                <Button className="buttonTopColor3" onClick={() => changeToBudgetfunc()}>Budget</Button>
                                                <Button className="buttonTop3" onClick={() => changeToExpensefunc()}>Expense</Button>
                                                <Button className="buttonTop3" onClick={() => changeToVendorfunc()}>Vendor</Button>
                                            </div>
                                            :
                                            showExpense == true ?
                                                <div  style={{ marginBottom: '15px' }}>

                                                    <Button className="buttonTop3" onClick={() => changeToGeneralfunc()}>General</Button>
                                                    <Button className="buttonTop3" onClick={() => changeToBudgetfunc()}>Budget</Button>
                                                    <Button className="buttonTopColor3" onClick={() => changeToExpensefunc()}>Expense</Button>
                                                    <Button className="buttonTop3" onClick={() => changeToVendorfunc()}>Vendor</Button>


                                                </div>
                                                :
                                                <div  style={{ marginBottom: '15px' }}>
                                                    <Button className="buttonTop3" onClick={() => changeToGeneralfunc()}>General</Button>
                                                    <Button className="buttonTop3" onClick={() => changeToBudgetfunc()}>Budget</Button>
                                                    <Button className="buttonTop3" onClick={() => changeToExpensefunc()}>Expense</Button>
                                                    <Button className="buttonTopColor3" onClick={() => changeToVendorfunc()}>Vendor</Button>

                                                </div>


                                    }

                                    {ShowGeneral == true ?
                                        <GeneralStatus />
                                        

                                        :
                                        showBudget == true ?
                                        <BudgetPage />
                                        :
                                        showExpense == true ?
                                        <ExpensePage />
                                        :
                                        <VendorsPage />
                                    }
                                    {/* {ShowGeneral == true ?
                                        <div>
                                            <ProjectPage />
                                        </div>
                                        :
                                        showBudget == true ?
                                            <div>
                                                <RoadMapPage />
                                            </div>

                                            :
                                            showExpense == true ?
                                                <div>
                                                    <FounderFunding />
                                                </div>

                                                :
                                                showTokenomics == true ?
                                                    <div>
                                                        <Tokenomics />
                                                    </div>
                                                    :
                                                    showKYC == true ?
                                                        <div>
                                                            <KYCPage />
                                                        </div>
                                                        : <SocialPage />
                                    } */}

                                </div>


                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );

}
export default ExpenseManagement;
