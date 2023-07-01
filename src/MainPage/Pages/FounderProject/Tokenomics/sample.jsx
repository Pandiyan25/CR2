
                            <table style={{ width: '60%' }}>
                            <tbody>
                                <tr>
                                    <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '50%', padding: '10px 0px' }}>Token Ticker</td>
                                    <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{tokenTicker != null && tokenTicker != undefined && tokenTicker}</td>
                                </tr>

                                <tr>
                                    <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '50%' }}>Token Type</td>
                                    <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >
                                        {tokenType != null && tokenType != undefined && tokenType?.length > 0 ?
                                        <div style={{display:'flex'}}>

                                            {tokenType.map((i) =>
                                                <div>
                                                    {i?.value},
                                                </div>
                                            )}
                                        </div>
                                        : ''
                                    }
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '50%' }}>Primary Network</td>
                                    <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{primaryNetwork != null && primaryNetwork != undefined && primaryNetwork}</td>
                                </tr>
                                <tr>
                                    <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '50%' }}>Token Standard</td>
                                    <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{tokenStd != null && tokenStd != undefined && tokenStd}</td>
                                </tr>
                                <tr>
                                    <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '50%' }}>Public Launch Price</td>
                                    <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{publicLaunchPrice != null && publicLaunchPrice != undefined && publicLaunchPrice}</td>
                                </tr>
                                <tr>
                                    <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '50%' }}>Expected Token Generation Event </td>
                                    <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{expTokenGenerationj != null && expTokenGenerationj != undefined && expTokenGenerationj}</td>
                                </tr>
                                <tr>
                                    <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '50%' }}>Total Token Supply </td>
                                    <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{tokenSupply != null && tokenSupply != undefined && tokenSupply}</td>
                                </tr>
                                <tr>
                                    <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '50%' }}>Total Contract Address </td>
                                    <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{tokenContactAddress != null && tokenContactAddress != undefined && tokenContactAddress}</td>
                                </tr>
                                
                                {/* <tr>
                                    <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '50%' }}>Token Supply Breakup:</td>
                                    <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{tokenSupplyBreakup != null && tokenSupplyBreakup != undefined && tokenSupplyBreakup}</td>
                                </tr> */}


                                <tr>
                                </tr>
                            </tbody>
                        </table>











<div className="row" style={{ margin: '0px', marginBottom: '15px' }}>
<div className=" col-md-6 col-sm-6 col-lg-6 col-xl-3" style={{ width: '32%', maxWidth: '32%', padding: '5px' }}>
    <div className="cardHEight3 card dash-widget">
        <div className="card-body">
            <div className="">
                {/* dash-widget-info */}
                <h3 className="mainFontH4" style={{ textAlign: 'start', color: '#1890ff' }}>
                    {expTokenGenerationj != null && expTokenGenerationj != undefined && expTokenGenerationj}
                </h3>
                <span className="mainFontSpan2">Expected Token Generation Event</span>
            </div>
        </div>
    </div>
</div>

<div className=" col-md-6 col-sm-6 col-lg-6 col-xl-3" style={{ width: '32%', maxWidth: '32%', padding: '5px' }}>
    <div className="cardHEight3 card dash-widget">
        <div className="card-body">
            <div className="">
                {/* dash-widget-info */}
                <h3 className="mainFontH4" style={{ textAlign: 'start', color: '#1890ff' }}>
                    {tokenStd != null && tokenStd != undefined && tokenStd}
                </h3>
                <span className="mainFontSpan2">Token Standard</span>
            </div>
        </div>
    </div>
</div>

<div className=" col-md-6 col-sm-6 col-lg-6 col-xl-3" style={{ width: '32%', maxWidth: '32%', padding: '5px' }}>
    <div className="cardHEight3 card dash-widget">
        <div className="card-body">
            <div className="">
                {/* dash-widget-info */}
                <h3 className="mainFontH4" style={{ textAlign: 'start', color: '#1890ff' }}>
                    {primaryNetwork != null && primaryNetwork != undefined && primaryNetwork}
                </h3>
                <span className="mainFontSpan2">Primary Network</span>
            </div>
        </div>
    </div>
</div>
</div>










<div className=" col-md-6 col-sm-6 col-lg-6 col-xl-3" style={{ width: '32%', maxWidth: '32%', padding: '5px' }}>
<div className="cardHEight3 card dash-widget">
    <div className="card-body">
        <div className="">
            {/* dash-widget-info */}
            <h3 className="mainFontH4" style={{ textAlign: 'start', color: '#1890ff' }}>
                {tokenTicker != null && tokenTicker != undefined && tokenTicker}
            </h3>
            <span className="mainFontSpan2">Token Ticker</span>
        </div>
    </div>
</div>
</div>

<div className=" col-md-6 col-sm-6 col-lg-6 col-xl-3" style={{ width: '32%', maxWidth: '32%', padding: '5px' }}>
<div className="cardHEight3 card dash-widget">
    <div className="card-body">
        <div className="">
            {/* dash-widget-info */}
            <h3 className="mainFontH4" style={{ textAlign: 'start', color: '#1890ff' }}>
                {tokenSupply != null && tokenSupply != undefined && tokenSupply}
            </h3>
            <span className="mainFontSpan2">Total Token Supply</span>
        </div>
    </div>
</div>
</div>

<div className=" col-md-6 col-sm-6 col-lg-6 col-xl-3" style={{ width: '32%', maxWidth: '32%', padding: '5px' }}>
<div className="cardHEight3 card dash-widget">
    <div className="card-body">
        <div className="">
            {/* dash-widget-info */}
            <h3 className="mainFontH4" style={{ textAlign: 'start', color: '#1890ff' }}>
                {publicLaunchPrice != null && publicLaunchPrice != undefined && publicLaunchPrice}
            </h3>
            <span className="mainFontSpan2">Public Launch Price</span>
        </div>
    </div>
</div>
</div>