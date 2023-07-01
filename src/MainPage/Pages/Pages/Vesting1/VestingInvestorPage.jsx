



import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import LockedTokens from './lockedTokens';
import ReleasedTokens from './ReleasedTokens';



const VestingInvestorpage = () => {
    const [showReleasedTokens, setShowReleasedTokens] = useState(true)


    const changeToGeneralfunc = () => {
        setShowReleasedTokens(true)

    }

    const changeTofunc = () => {
        setShowReleasedTokens(false)

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
                                        <h3 className="page-title">Vesting</h3>

                                    </div>
                                </div>
                            </div>

                        </div>
                        <div style={{ background: 'white', padding: '20px', borderRadius: '15px', boxShadow: '0px 10px 20px #C4C8D0' }}>

                            <div className="row" style={{ marginBottom: '20px' }}>
                                <div className="col-sm-12">
                                    {showReleasedTokens == true ?
                                        <div style={{ marginBottom: '15px' }} >
                                            <Button className="buttonTop3" style={{ width: '145px', height: '40px' }} onClick={() => changeTofunc()}>Locked Tokens</Button>

                                            <Button className="buttonTopColor3" style={{ width: '145px', height: '40px' }} onClick={() => changeToGeneralfunc()}>Released Tokens</Button>
                                        </div>
                                        :
                                        <div style={{ marginBottom: '15px' }}>
                                            <Button className="buttonTopColor3" style={{ width: '145px', height: '40px' }} onClick={() => changeTofunc()}>Locked Tokens</Button>

                                            <Button className="buttonTop3" style={{ width: '145px', height: '40px' }} onClick={() => changeToGeneralfunc()}>Released Tokens</Button>

                                        </div>


                                    }

                                    {showReleasedTokens == true ?
                                        <ReleasedTokens />
                                        :
                                        < LockedTokens />
                                    }


                                </div>


                            </div>


                        </div>

                    </div>
                </div>
            </div>
        </>
    );

}
export default VestingInvestorpage;
