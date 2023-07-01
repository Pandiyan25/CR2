import React from 'react'
import { Card } from 'react-bootstrap'
import { ld, locationPin, logoProj, twitterIcon, website } from '../../../Entryfile/imagepath'

const CardInFounder = ({ i, index, opennewWindow, investorConnectFunc }) => {
    // console.log(i,"okokokok");

    function getMultipleRandom(arr, num) {
        const shuffled = [...arr].sort(() => 0.5 - Math.random());

        return shuffled.slice(0, num);
    }


    return (
        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 mb-5" key={index}>

            <div className="swiper-slide">
                <div className="slider-item">
                    <div className="sc-product-item">
                        <div className="product-content">
                            <div className="product-author flex">
                                <div className="avatars mb-2">
                                    {
                                        i?.user?.fund_logo != null && i?.user?.fund_logo != undefined && i?.user?.fund_logo != '' ?
                                            <img src={i?.user?.fund_logo} alt="" />
                                            :
                                            <img src={logoProj} alt="" />
                                    }
                        
                                </div>
                            </div>
                            
                            <div className="product-price">
                                <div className="title mb-3" >
                                    
                                <h5 className="title-project mb-1" style={{fontSize:'16px'}}>{i?.user?.fund_name}</h5>
                                {i?.user?.fund_head_quarters != null && i?.user?.fund_head_quarters != undefined && i?.user?.fund_head_quarters != '' ?
                                        <div >
                                            <img src={locationPin} alt='' style={{ height: '14px', width: '14px' }} /> <span style={{ fontSize: "12px", fontWeight: "500" }}>{i?.user?.fund_head_quarters}</span>
                                        </div>
                                        :
                                        <>
                                        </>
                                    }
                                 
                                </div>
                                {/* <p className="para-guardian mb-10">{i?.user?.fund_description}</p> */}
                                <div className='mb-2'>
                                    <div className=''>
                                        <p className='foundercardlabel' style={{ margin: '0px' }}>
                                            Preffered Sectors
                                        </p>
                                    </div>
                                    <div className=''>
                                        <div>
                                            {
                                                i?.user?.preferred_sectors.length > 0 && getMultipleRandom(i?.user?.preferred_sectors, 3)?.map((main) => (
                                                    <button className="profile-bt-Preffered p-1 mr-1" style={{ borderRadius: "2px", width: "auto", margin: "0px 0px 1px 0px" }}>
                                                        {main?.value}
                                                    </button>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className='mb-2 mt-2'>
                                    <div className=''>
                                        <p className='foundercardlabel' style={{ margin: '0px' }}>
                                            Stage of Investment
                                        </p>
                                    </div>
                                    <div className=''>
                                        <p className='' style={{ margin: '0px'}}>
                                            {
                                                i?.user?.preferred_stage_of_investment?.length > 0 && getMultipleRandom(i?.user?.preferred_stage_of_investment, 3)?.map((main) => (
                                                    <span style={{ color: "rgb(0, 119, 255)", height: "40px",fontSize:"12px" }}>
                                                        {main?.value} , 
                                                    </span>
                                                ))
                                            }

                                        </p>
                                    </div>
                                </div>
                                <div className='mb-3 mt-2'>
                                    <div className=''>
                                        <p className='foundercardlabel' style={{ margin: '0px' }}>
                                            Type of Fund
                                        </p>
                                    </div>
                                    <div className=''>
                                        <p className='' style={{ margin: '0px' }}>
                                            <span style={{ color: "rgb(0, 119, 255)",fontSize:"12px",height: "40px" }}>
                                                {i?.user?.type_of_fund}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                                {
                                    (i?.request_status == "Connected" || i?.request_status == "Requested" || i?.request_status == "RequestSent") ?
                                        <button className="sc-button style letter style-2 btn-validate" ><span>{i?.request_status}</span>
                                        </button>
                                        :
                                        <button className="sc-button style letter style-2 btn-validate" onClick={() => investorConnectFunc(i?.user?._id)}><span>Connect</span>
                                        </button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardInFounder