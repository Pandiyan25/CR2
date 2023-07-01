
        <div className="card card-table" style={{margin:'0px'}}>
            
        <div className="card-body" style={{ padding: '10px' }}>

            <div className="col-md-12" style={{ padding: '0px' }}>
                <div className="profile-view" style={{ margin: '10px' }}>


                    <h3 className="card-title">Funding</h3>
                    <div className="">
                        <table style={{ width: '100%' }}>
                            <tbody>
                                <tr>
                                    <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%', padding: '10px 0px' }}>Total Fund Raise Target:</td>
                                    <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0]?.total_fund_raise_target}</td>
                                </tr>
                                <tr>
                                    <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Fund Raised till Date:</td>
                                    <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0]?.fund_raised}</td>
                                </tr>
                                <tr>
                                    <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Number of Investors till date:</td>
                                    <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0]?.number_of_investors}</td>
                                </tr>
                                <tr>
                                    <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Lead Investor :</td>
                                    <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0]?.lead_investor}</td>
                                </tr>
                                <tr>
                                    <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Stage of Funding :</td>
                                    <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0]?.stage_of_funding}</td>
                                </tr>
                                <tr>
                                    <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Primary Funding wallet Address :</td>
                                    <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0]?.primary_funding_wallet_address}</td>
                                </tr>
                                <tr>
                                    <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Primary Funding Wallet Address Network :</td>
                                    <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0]?.primary_funding_wallet_address_network}</td>
                                </tr>
                                

                                <tr>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    
                </div>
            </div>
            

        </div>
    </div>