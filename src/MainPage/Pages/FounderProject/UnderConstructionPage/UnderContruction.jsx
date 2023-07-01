import React from 'react';
import { underConstructionImage } from '../../../../Entryfile/imagepath'

import { useHistory, useNavigate } from "react-router-dom";




const UnderContruction = () => {

    let history = useHistory()
    const goBackfunc = () => {

        history.push('/')
    }

    return (

        <>
            <div className="page-wrapper" style={{paddingTop:'60px'}}>

                <div className="content container-fluid">
                    <div className="tab-content" style={{ padding: '0px' }}>
                    {/* style={{paddingTop:"100px"}} */}
                        <div id="emp_profile" className="pro-overview tab-pane fade show active">
                            <div className="row2">
                                <div className="col-md-12">
                                    <div style={{ textAlign: 'center' }} className="mb-4">

                                        <img style={{width:"50%"}}src={underConstructionImage} alt='' />
                                    </div>
                                    <div style={{ textAlign: 'center' }} >
                                        <h3 className="mb-4">Hold tight,we're are making improvements to this feature </h3>
                                        <button style={{ background: '#1890ff', border: '2px solid #1890ff', color: 'white', fontSize: '14px', fontWeight: '600' ,borderRadius:"2px",width:"120px", height:"35px"}} onClick={() => goBackfunc()}>Go Back</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )

    
}


export default UnderContruction;
