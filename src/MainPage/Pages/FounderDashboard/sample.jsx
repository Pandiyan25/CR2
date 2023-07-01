const columns = [

    {
        title: 'Proposal No',
        // dataIndex: 'proposal_id',
        align: 'center',

        render: (text, record) => (
            <span onClick={() => perproposalFunc(text)}>$ {text.proposal_id}</span>
        ),
        // sorter: (a, b) => a.salary.length - b.salary.length,
        // key: 'proposal_id',

    },

    {
        title: 'Proposal Type',
        dataIndex: 'type',
        align: 'center',
    },

    {
        title: 'Funds Requested',
        dataIndex: 'funds_requested',
        align: 'center',
    }, {
        title: 'Funds Receipt Status',
        dataIndex: 'proposal_status',
        align: 'center',
    },
    , {
        title: 'Tokens Released',
        dataIndex: 'number_of_tokens',
        align: 'center',
    }, {
        title: 'No of Validations',
        // dataIndex: 'no_of_validators',
        align: 'center',
    }, {
        title: 'Validation Status',
        // dataIndex: 'validatorsStatus',
        align: 'center',
    }

]




    < div className = "row" >
    {
        projectDetailsData.length > 0 && projectDetailsData.map((i) => (

            <div className='col-sm-4 col-md-4 col-lg-4 col-xl-4' style={{ marginBottom: '15px', maxWidth: "385px", paddingLeft: '30px', paddingRight: '30px' }}>
                {/* style={{ , marginBottom: '0px',border:'2px solid #1890ff',boxShadow:'500px 0 5px 5px 0 rgba(0, 0, 0, 0.2)' }} */}
                {/* width: '100%',/ */}
                <Card className='cardInDashboard' style={{ cursor: 'pointer', width: '340px', height: '490px', margin: 'auto', gap: '6px' }}>
                    <Card.Img variant="top" src={gamingImg} style={{
                        // height: '155px',
                        height: '130px',
                        // borderTopLeftRadius: '15px',
                        // borderTopRightRadius: '15px'
                    }} onClick={() => sendDatatoProjectPage(i?._id)} />
                    <div className='cardFlexDiv' onClick={() => sendDatatoProjectPage(i?._id)} >

                        <div className='cardSubText'>
                            <span style={{ width: '100%', heigth: '100%' }}>
                                {i.logo != null && i.logo != undefined ?

                                    <img src={i?.logo} alt="" className='cardTextImage' />
                                    :
                                    <img src={''} alt="" className='cardTextImage' />

                                }



                            </span>
                        </div>

                        {/* <div className='cardparDiv'>
<p className='cardPar'>
End Date
</p>
<p className='cardPar'>
March 14, 2022
</p>
</div> */}
                    </div>
                    <Card.Body style={{ padding: '0px' }} className="cardBodyStyle">
                        <div className='gridBox'>
                            <div className='firstGrid'>
                                <div className='firstInnerGrid'>
                                    <h2 className='firstGridH2' style={{ width: '200px' }}>

                                        <span className='descSpan'>
                                            {i?.project_name}
                                            {/* {i?.project_name} */}
                                        </span>

                                        {/* Founder First Project */}
                                    </h2>

                                    <p className='MaindescParagraph'>
                                        <span className='descSpan'>
                                            <span>{i?.project_description}</span>
                                            {/* <span>A 3D Metaverse of Everything</span> */}
                                        </span>
                                    </p>


                                </div>
                                <div className='secondInnerGrid'>
                                    <div className='secondInnerGridInner'>

                                        <div style={{ width: '100px', height: '60px', overflow: 'hidden', marginTop: '-30px', position: 'absolute', right: '0px' }}>
                                            <CanvasJSChart options={options} height="80px" width="80px" showInLegend='false' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p className='MaindescParagraph'>
                                <span className='descSpan'>
                                    {/* <span>{i?.project_description}/</span> */}
                                </span>
                            </p>
                        </div >

                        <div className='gridBox2' >
                            <div className='firstDivGridBOx2'>
                                <p className='firstDivPara' style={{ margin: '0px' }}>
                                    Nature of Project
                                </p>
                                {/* <hr className='firstDivHr' /> */}
                                <p className='firstDivPararight' style={{ margin: '0px' }}>
                                    <span>
                                        {i?.nature_of_project}

                                        {/* {i?.total_budget != null && i?.total_budget != undefined ? i?.total_budget : '0'} */}
                                    </span>
                                </p>
                            </div>
                        </div>


                        <div className='gridBox2' >
                            <div className='firstDivGridBOx2'>
                                <p className='firstDivPara' style={{ margin: '0px' }}>
                                    Project Stage
                                </p>
                                {/* <hr className='firstDivHr' /> */}
                                <p className='firstDivPararight' style={{ margin: '0px' }}>
                                    <span>
                                        {i?.project_stage != null && i?.project_stage != undefined ? `${i?.project_stage} ` : ''}
                                        {/* {i?.total_budget != null && i?.total_budget != undefined ? i?.total_budget : '0'} */}
                                    </span>
                                </p>
                            </div>
                        </div>


                        <div className='gridBox3Main' >
                            <div className='firstDivGridBOxtag'>
                                <p className='firstDivPara' style={{ margin: '0px' }}>
                                    Tags
                                </p>
                                {/* <hr className='firstDivHr' /> */}
                                <p className='firstDivPara' style={{ margin: '0px' }}>
                                    <span>
                                        {i?.project_tags != null && i?.project_tags != undefined ? i?.project_tags : ''}
                                        {/* {i?.total_budget != null && i?.total_budget != undefined ? i?.total_budget : '0'} */}
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div className='gridBox3Main2'></div>

                        <div className='gridBox2' >
                            <div className='firstDivGridBOx2'>
                                <p className='firstDivPara' style={{ margin: '0px' }}>
                                    Stage of Funding
                                </p>
                                {/* <hr className='firstDivHr' /> */}
                                <p className='firstDivPararight' style={{ margin: '0px' }}>
                                    <span className='gridSpan'>
                                        {/* {i?.project_stage != null && i?.project_stage != undefined ? `${i?.project_stage} ` : ''} */}
                                        {/* {i?.total_budget != null && i?.total_budget != undefined ? i?.total_budget : '0'} */}
                                    </span>
                                </p>
                            </div>
                        </div>

                        <div className='gridBox2' >
                            <div className='firstDivGridBOx2'>
                                <p className='firstDivPara' style={{ margin: '0px' }}>
                                    Total Fund Raise
                                </p>
                                {/* <hr className='firstDivHr' /> */}
                                <p className='firstDivPararight' style={{ margin: '0px' }}>
                                    <span className='gridSpan'>
                                        $  {i?.total_budget != null && i?.total_budget != undefined ? i?.total_budget : '0'}
                                        {/* {i?.total_budget != null && i?.total_budget != undefined ? i?.total_budget : '0'} */}
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div className='gridBox2'  >
                            <div className='firstDivGridBOx2'>
                                <p className='firstDivPara' style={{ margin: '0px' }}>
                                    Funds Raised Till Now
                                </p>
                                {/* <hr className='firstDivHr' /> */}
                                <p className='firstDivPararight' style={{ margin: '0px' }}>
                                    <span className='gridSpan'>
                                        $ {i?.fund_raised_till_now != null && i?.fund_raised_till_now != undefined ? i?.fund_raised_till_now : '0'}
                                        {/* {i?.fund_raised_till_now != null && i?.fund_raised_till_now != undefined ? i?.fund_raised_till_now : '0'} */}
                                    </span>
                                </p>
                            </div>
                        </div>

                        <div className='gridBox2'  >
                            <div className='firstDivGridBOx2'>
                                <p className='firstDivPara' style={{ margin: '0px' }}>
                                    Lead Investor
                                </p>
                                <p className='firstDivPararight' style={{ margin: '0px' }}>
                                    <span className='gridSpan'>
                                        Sharma
                                    </span>
                                </p>
                            </div>
                        </div>


                        <div className='gridBox2'  >
                            <div className='firstDivGridBOx2' style={{ display: 'flex' }}>
                                <p className='firstDivPara' style={{ margin: '0px' }}>
                                    Expected Token Generation Event
                                </p>
                                <p className='firstDivPararight' style={{ margin: '0px' }}>
                                    <span className='gridSpan'>
                                        12/04/2022
                                    </span>
                                </p>
                            </div>
                        </div>




                        <div className='gridButtons'>

                            <div className='gridBox3Buttons'>
                                {i?.website_link != '' && i?.website_link != null && i?.website_link != undefined ?

                                    <div className="gridBox3IconDiv">
                                        <FontAwesomeIcon icon={faGlobe} className='gridBox3Icons' />
                                    </div>
                                    :
                                    ''
                                }
                                {i?.linkedin_profile_link != '' && i?.linkedin_profile_link != null && i?.linkedin_profile_link != undefined ?

                                    <div className="gridBox3IconDiv">
                                        <FontAwesomeIcon icon={faLinkedinIn} className='gridBox3Icons' />
                                    </div>
                                    :
                                    ''
                                }
                                {i?.whitepaper != '' && i?.whitepaper != null && i?.whitepaper != undefined ?

                                    <div className="gridBox3IconDiv">
                                        <FontAwesomeIcon icon={faPaperPlane} className='gridBox3Icons' />
                                    </div>
                                    :
                                    ''
                                }
                            </div>

                            <div className='gridBox3ButtonsMain'>
                                <div className='gridAlignItems'>
                                    <button className='gridbuttonClass'>
                                        Connect
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Card.Body>

                </Card>
            </div>
        ))
    }
</div >















///////////new
<div className='mainCardDivFounder'>
{/* style={{ , marginBottom: '0px',border:'2px solid #1890ff',boxShadow:'500px 0 5px 5px 0 rgba(0, 0, 0, 0.2)' }} */}
{/* width: '100%',/ */}
{/* style={{ cursor: 'pointer', width: '340px', height: '470px',width:'100%',margin: 'auto', gap: '6px' }} */}
<Card className='cardInDashboard' style={{ cursor: 'pointer', height: '470px', width: '100%', margin: 'auto', gap: '6px' }}>
    <Card.Img variant="top" src={gamingImg} style={{
        // height: '155px',
        height: '130px',
        // borderTopLeftRadius: '15px',
        // borderTopRightRadius: '15px'
    }} />
    <div className='cardFlexDiv' >

        <div className='cardSubText2'>
            <span style={{ width: '100%', heigth: '100%' }}>
                {/* {i.logo != null && i.logo != undefined ?

<img src={i?.logo} alt="" className='cardTextImage' />
:
<img src={''} alt="" className='cardTextImage' />

} */}
                <img src={''} alt="" className='cardTextImage' />


            </span>
        </div>
        <div className='cardparDiv21'>
            Fund Headquaters
        </div>
    </div>

    <Card.Body style={{ padding: '0px' }} className="cardBodyStyle">
        <div className='gridBox'>
            <div className='firstGrid'>
                <div className='firstInnerGrid'>
                    <h2 className='firstGridH2' style={{ width: '200px' }}>

                        <span className='descSpan'>
                            Fund Name
                            {/* {i?.project_name} */}
                        </span>

                        {/* Founder First Project */}
                    </h2>
                    <p className='MaindescParagraph'>
                        <span className='descSpan'>
                            {/* <span>{i?.project_description}</span> */}
                            <span>A 3D Metaverse of Everything</span>
                        </span>
                    </p>
                </div>
            </div>
        </div>

        <div className='gridBox2' style={{ minHeight: '80px' }}>
            <div className='firstDivGridBOx5'>
                <p className='firstDivPara' style={{ margin: '0px' }}>
                    Preffered Sectors
                </p>
                {/* <hr className='firstDivHr' /> */}
                <div className="gridClassPreffered" >
                    {/* <div style={{ display: "flex", justifyContent: "space-around" }}> */}
                    <button className="profile-bt-Preffered">
                        DEFI
                    </button>
                    {/* </div> */}
                    {/* 
                    <div style={{ display: "flex", justifyContent: "space-around" }}> */}
                    <button className="profile-bt-Preffered">
                        DAO
                    </button>
                    {/* </div> */}
                    {/* 
                    <div style={{ display: "flex", justifyContent: "space-around" }}> */}
                    <button className="profile-bt-Preffered">
                        Gaming
                    </button>
                    {/* </div> */}
                    {/* 
                    <div style={{ display: "flex", justifyContent: "space-around" }}> */}
                    <button className="profile-bt-Preffered">
                        Exchange
                    </button>
                    {/* </div> */}
                    {/* 
                    <div style={{ display: "flex", justifyContent: "space-around" }}> */}
                    <button className="profile-bt-Preffered">
                        NFT
                    </button>
                    {/* </div> */}
                    {/* 
                    <div style={{ display: "flex", justifyContent: "space-around" }}> */}
                    <button className="profile-bt-Preffered">
                        {"Layer 1&2"}
                    </button>
                    {/* </div> */}

                    {/* 
                    <div style={{ display: "flex", justifyContent: "space-around" }}> */}
                    <button className="profile-bt-Preffered">
                        Oracles
                    </button>
                    {/* </div> */}
                    {/* 
                    <div style={{ display: "flex", justifyContent: "space-around" }}> */}
                    <button className="profile-bt-Preffered">
                        Deep Tech
                    </button>
                    {/* </div> */}
                    {/* 
                    <div style={{ display: "flex", justifyContent: "space-around" }}> */}
                    <button className="profile-bt-Preffered">
                        Others
                    </button>
                    {/* </div> */}


                </div>
            </div>
        </div>
        <div className='gridBox2' >
            <div className='firstDivGridBOx2'>
                <p className='firstDivPara' style={{ margin: '0px' }}>
                    Projects Invested
                </p>
                {/* <hr className='firstDivHr' /> */}
                <p className='firstDivPararight' style={{ margin: '0px' }}>
                    <span>
                        # DEFI

                        {/* {i?.total_budget != null && i?.total_budget != undefined ? i?.total_budget : '0'} */}
                    </span>
                </p>
            </div>
        </div>
        <div className='gridBox2' >
            <div className='firstDivGridBOx2'>
                <p className='firstDivPara' style={{ margin: '0px' }}>
                    Stage Investments
                </p>
                <div style={{ textAlign: 'right' }} >
                    {/* <hr className='firstDivHr' /> */}
                    {/* <button className="profile-bt" style={{ marginRight: '0px' }}> */}

                    {/* <div style={{ display: "flex", justifyContent: "space-around" }}> */}
                    <button className="profile-bt-Preffered">
                        Seed
                    </button>
                </div>

            </div>
        </div>
        <div className='gridBox2' >
            <div className='firstDivGridBOx2'>
                <p className='firstDivPara' style={{ margin: '0px' }}>
                    Type of Fund
                </p>
                {/* <hr className='firstDivHr' /> */}
                <p className='firstDivPararight' style={{ margin: '0px' }}>
                    <span>
                        Decentralised VC

                        {/* {i?.total_budget != null && i?.total_budget != undefined ? i?.total_budget : '0'} */}
                    </span>
                </p>
                {/* <div style={{ display: "flex", justifyContent: "space-around" }}> */}


            </div>
        </div>
        <div className='gridBox2' >
            <div className='firstDivGridBOx2'>
                <p className='firstDivPara' style={{ margin: '0px' }}>
                    Assest under Management
                </p>
                {/* <hr className='firstDivHr' /> */}
                <p className='firstDivPararight' style={{ margin: '0px' }}>
                    <span>
                        $1,009

                        {/* {i?.total_budget != null && i?.total_budget != undefined ? i?.total_budget : '0'} */}
                    </span>
                </p>
            </div>
        </div>
        <div className='gridBox2' >
            <div className='firstDivGridBOx2'>
                <p className='firstDivPara' style={{ margin: '0px' }}>
                    Minimum Investment Size
                </p>
                {/* <hr className='firstDivHr' /> */}
                <p className='firstDivPararight' style={{ margin: '0px' }}>
                    <span>
                        $24

                        {/* {i?.total_budget != null && i?.total_budget != undefined ? i?.total_budget : '0'} */}
                    </span>
                </p>
            </div>
        </div>



        <div className='gridButtons'>

            <div className='gridBox3Buttons'>
                {/* {i?.website_link != '' && i?.website_link != null && i?.website_link != undefined ? */}

                <div className="gridBox3IconDiv">
                    <FontAwesomeIcon icon={faGlobe} className='gridBox3Icons' />
                </div>
                {/* //     :
                //     ''
                // }
                // {i?.linkedin_profile_link != '' && i?.linkedin_profile_link != null && i?.linkedin_profile_link != undefined ? */}

                <div className="gridBox3IconDiv">
                    <FontAwesomeIcon icon={faLinkedinIn} className='gridBox3Icons' />
                </div>
                {/* //     :
                //     ''
                // }
                {i?.whitepaper != '' && i?.whitepaper != null && i?.whitepaper != undefined ? */}

                <div className="gridBox3IconDiv">
                    <FontAwesomeIcon icon={faPaperPlane} className='gridBox3Icons' />
                </div>
                {/* :
                    ''
                } */}
            </div>

            <div className='gridBox3ButtonsMain'>
                <div className='gridAlignItems'>
                    <button className='gridbuttonClass'>
                        Connect
                    </button>
                </div>
            </div>
        </div>

    </Card.Body>

</Card>
</div>
<div className='mainCardDivFounder'>
{/* style={{ , marginBottom: '0px',border:'2px solid #1890ff',boxShadow:'500px 0 5px 5px 0 rgba(0, 0, 0, 0.2)' }} */}
{/* width: '100%',/ */}
{/* style={{ cursor: 'pointer', width: '340px', height: '470px', margin: 'auto', gap: '6px' }} */}
<Card className='cardInDashboard' style={{ cursor: 'pointer', height: '470px', width: '100%', margin: 'auto', gap: '6px' }}>
    <Card.Img variant="top" src={gamingImg} style={{
        // height: '155px',
        height: '130px',
        // borderTopLeftRadius: '15px',
        // borderTopRightRadius: '15px'
    }} />
    <div className='cardFlexDiv' >

        <div className='cardSubText2'>
            <span style={{ width: '100%', heigth: '100%' }}>
                {/* {i.logo != null && i.logo != undefined ?

<img src={i?.logo} alt="" className='cardTextImage' />
:
<img src={''} alt="" className='cardTextImage' />

} */}
                <img src={''} alt="" className='cardTextImage' />


            </span>
        </div>
        <div className='cardparDiv21'>
            Fund Headquaters
        </div>
    </div>

    <Card.Body style={{ padding: '0px' }} className="cardBodyStyle">
        <div className='gridBox'>
            <div className='firstGrid'>
                <div className='firstInnerGrid'>
                    <h2 className='firstGridH2' style={{ width: '200px' }}>

                        <span className='descSpan'>
                            Fund Name
                            {/* {i?.project_name} */}
                        </span>

                        {/* Founder First Project */}
                    </h2>
                    <p className='MaindescParagraph'>
                        <span className='descSpan'>
                            {/* <span>{i?.project_description}</span> */}
                            <span>A 3D Metaverse of Everything</span>
                        </span>
                    </p>
                </div>
            </div>
        </div>

        <div className='gridBox2' style={{ minHeight: '80px' }}>
            <div className='firstDivGridBOx5'>
                <p className='firstDivPara' style={{ margin: '0px' }}>
                    Preffered Sectors
                </p>
                {/* <hr className='firstDivHr' /> */}
                <div className="gridClassPreffered" >
                    {/* <div style={{ display: "flex", justifyContent: "space-around" }}> */}
                    <button className="profile-bt-Preffered">
                        DEFI
                    </button>
                    {/* </div> */}
                    {/* 
                    <div style={{ display: "flex", justifyContent: "space-around" }}> */}
                    <button className="profile-bt-Preffered">
                        DAO
                    </button>
                    {/* </div> */}
                    {/* 
                    <div style={{ display: "flex", justifyContent: "space-around" }}> */}
                    <button className="profile-bt-Preffered">
                        Gaming
                    </button>
                    {/* </div> */}
                    {/* 
                    <div style={{ display: "flex", justifyContent: "space-around" }}> */}
                    <button className="profile-bt-Preffered">
                        Exchange
                    </button>
                    {/* </div> */}
                    {/* 
                    <div style={{ display: "flex", justifyContent: "space-around" }}> */}
                    <button className="profile-bt-Preffered">
                        NFT
                    </button>
                    {/* </div> */}
                    {/* 
                    <div style={{ display: "flex", justifyContent: "space-around" }}> */}
                    <button className="profile-bt-Preffered">
                        {"Layer 1&2"}
                    </button>
                    {/* </div> */}

                    {/* 
                    <div style={{ display: "flex", justifyContent: "space-around" }}> */}
                    <button className="profile-bt-Preffered">
                        Oracles
                    </button>
                    {/* </div> */}
                    {/* 
                    <div style={{ display: "flex", justifyContent: "space-around" }}> */}
                    <button className="profile-bt-Preffered">
                        Deep Tech
                    </button>
                    {/* </div> */}
                    {/* 
                    <div style={{ display: "flex", justifyContent: "space-around" }}> */}
                    <button className="profile-bt-Preffered">
                        Others
                    </button>
                    {/* </div> */}


                </div>
            </div>
        </div>
        <div className='gridBox2' >
            <div className='firstDivGridBOx2'>
                <p className='firstDivPara' style={{ margin: '0px' }}>
                    Projects Invested
                </p>
                {/* <hr className='firstDivHr' /> */}
                <p className='firstDivPararight' style={{ margin: '0px' }}>
                    <span>
                        # DEFI

                        {/* {i?.total_budget != null && i?.total_budget != undefined ? i?.total_budget : '0'} */}
                    </span>
                </p>
            </div>
        </div>
        <div className='gridBox2' >
            <div className='firstDivGridBOx2'>
                <p className='firstDivPara' style={{ margin: '0px' }}>
                    Stage Investments
                </p>
                <div style={{ textAlign: 'right' }} >
                    {/* <hr className='firstDivHr' /> */}
                    {/* <button className="profile-bt" style={{ marginRight: '0px' }}> */}

                    {/* <div style={{ display: "flex", justifyContent: "space-around" }}> */}
                    <button className="profile-bt-Preffered">
                        Seed
                    </button>
                </div>

            </div>
        </div>
        <div className='gridBox2' >
            <div className='firstDivGridBOx2'>
                <p className='firstDivPara' style={{ margin: '0px' }}>
                    Type of Fund
                </p>
                {/* <hr className='firstDivHr' /> */}
                <p className='firstDivPararight' style={{ margin: '0px' }}>
                    <span>
                        Decentralised VC

                        {/* {i?.total_budget != null && i?.total_budget != undefined ? i?.total_budget : '0'} */}
                    </span>
                </p>
                {/* <div style={{ display: "flex", justifyContent: "space-around" }}> */}


            </div>
        </div>
        <div className='gridBox2' >
            <div className='firstDivGridBOx2'>
                <p className='firstDivPara' style={{ margin: '0px' }}>
                    Assest under Management
                </p>
                {/* <hr className='firstDivHr' /> */}
                <p className='firstDivPararight' style={{ margin: '0px' }}>
                    <span>
                        $1,009

                        {/* {i?.total_budget != null && i?.total_budget != undefined ? i?.total_budget : '0'} */}
                    </span>
                </p>
            </div>
        </div>
        <div className='gridBox2' >
            <div className='firstDivGridBOx2'>
                <p className='firstDivPara' style={{ margin: '0px' }}>
                    Minimum Investment Size
                </p>
                {/* <hr className='firstDivHr' /> */}
                <p className='firstDivPararight' style={{ margin: '0px' }}>
                    <span>
                        $24

                        {/* {i?.total_budget != null && i?.total_budget != undefined ? i?.total_budget : '0'} */}
                    </span>
                </p>
            </div>
        </div>



        <div className='gridButtons'>

            <div className='gridBox3Buttons'>
                {/* {i?.website_link != '' && i?.website_link != null && i?.website_link != undefined ? */}

                <div className="gridBox3IconDiv">
                    <FontAwesomeIcon icon={faGlobe} className='gridBox3Icons' />
                </div>
                {/* //     :
                //     ''
                // }
                // {i?.linkedin_profile_link != '' && i?.linkedin_profile_link != null && i?.linkedin_profile_link != undefined ? */}

                <div className="gridBox3IconDiv">
                    <FontAwesomeIcon icon={faLinkedinIn} className='gridBox3Icons' />
                </div>
                {/* //     :
                //     ''
                // }
                {i?.whitepaper != '' && i?.whitepaper != null && i?.whitepaper != undefined ? */}

                <div className="gridBox3IconDiv">
                    <FontAwesomeIcon icon={faPaperPlane} className='gridBox3Icons' />
                </div>
                {/* :
                    ''
                } */}
            </div>

            <div className='gridBox3ButtonsMain'>
                <div className='gridAlignItems'>
                    <button className='gridbuttonClass'>
                        Connect
                    </button>
                </div>
            </div>
        </div>

    </Card.Body>

</Card>
</div>


/////FounderNew dashboard



const columns2 = [

    {
        title: 'Proposal No',
        // dataIndex: 'proposal_id',
        align: 'center',

        render: (text, record) => (
            // style={{ color: '#6345ED', textDecoration: 'underline', textDecorationColor: '#6345ED', cursor: 'pointer' }} onClick={() => perproposalFunc(text)}
            <span >{text.proposal_id}</span>
        ),
        // sorter: (a, b) => a.salary.length - b.salary.length,
        // key: 'proposal_id',

    },

    {
        title: 'Proposal Type',
        dataIndex: 'type',
        align: 'center',
    },

    {
        title: 'Funds Requested',
        // dataIndex: 'funds_requested',

        render: (text, record) => (
            <div>

                {Number(text?.funds_requested).toLocaleString("en-US")}
            </div>
        ),
        align: 'center',
    }, {
        title: 'Funds Receipt Status',
        dataIndex: 'proposal_status',

        align: 'center',
    },
    , {
        title: ' Tokens Released',
        // dataIndex: 'token_release',

        render: (text, record) => (
            <div>

                {Number(text?.token_release).toLocaleString("en-US")}
            </div>
        ),
        align: 'center',
    }, {
        title: 'Number of Validations',

        render: (text, record) => (
            <div>

                {Number(text?.no_of_validators).toLocaleString("en-US")}
            </div>
        ),
        // dataIndex: 'no_of_validators',
        align: 'center',
    }, {
        title: 'Validation Status',
        // dataIndex: 'validatorsStatus',
        align: 'center',
    }

]

const options = {
    height: 100,
    animationEnabled: true,
    background: '#f8fbff',
    theme: "light2",
    label: '',
    toolTip: {
        enabled: false,
    },
    title: {
        fontSize: 20,
        // verticalAlign: "bottom",
        // dockInsidePlotArea: true
    },
    subtitles: [{
        text: "71% Positive",
        verticalAlign: "center",
        fontSize: 24,
        dockInsidePlotArea: true
    }],
    data: [{
        type: "doughnut",
        radius: "90%",  //change the radius here.
        showInLegend: true,
        // indexLabel: "{name}: {y}",
        // yValueFormatString: "#,###'%'",
        dataPoints: mydata2,
    }]
}

const options3 = {
    height: 120,
    animationEnabled: true,
    background: '#f8fbff',
    // theme: "light3",
    label: '',
    toolTip: {
        enabled: false,
    },
    title: {
        fontSize: 20,
        // verticalAlign: "bottom",
        // dockInsidePlotArea: true
    },
    // subtitles: [{
    //     text: "71% Positive",
    //     verticalAlign: "center",
    //     fontSize: 24,
    //     dockInsidePlotArea: true
    // }],
    data: [{
        type: "doughnut",
        radius: "50%",  //change the radius here.
        showInLegend: true,
        // indexLabel: "{name}: {y}",
        // yValueFormatString: "#,###'%'",
        dataPoints: mydata4,
    }]
}

const options4 = {
    height: 120,
    animationEnabled: true,
    background: '#f8fbff',
    // theme: "light3",
    label: '',
    toolTip: {
        enabled: false,
    },
    title: {
        fontSize: 20,
        // verticalAlign: "bottom",
        // dockInsidePlotArea: true
    },
    // subtitles: [{
    //     text: "71% Positive",
    //     verticalAlign: "center",
    //     fontSize: 24,
    //     dockInsidePlotArea: true
    // }],
    data: [{
        type: "doughnut",
        radius: "50%",
        showInLegend: false,
        // indexLabel: "{name}: {y}",
        // yValueFormatString: "#,###'%'",
        dataPoints: mydata2,
    }]
}


const options5 = {
    height: 120,
    animationEnabled: true,
    label: '',
    toolTip: {
        enabled: false,
    },
    title: {
        fontSize: 20,
    },
    data: [{
        type: "doughnut",
        radius: "50%",
        showInLegend: false,
        dataPoints: mydata3,
    }]
}


const sendDatatoProjectPage = (i) => {
    dispatch(fetchRoadMapProjectDetails(i))
    dispatch(fetchBudgetProjectDetails(i))

    dispatch(fetchProjectDetails(i))
    dispatch(projectId(i))
    dispatch(fetchFundingProjectDetails(i))
    dispatch(fetchTeamSize(i))
    dispatch(fetchTokenomicsDetails(i))
    dispatch(fetchSocialTeam(i))
    dispatch(fetchBudgetBannerDetails(i))
    history.push('/detail-projects')
}















<div className="" style={{ width: '100%', padding: '5px' }}>
    <table style={{ width: '100%', border: 'none' }}>
        <tbody>
            <tr>
                <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%', padding: '10px 0px' }} className="ft-weight">Token Type</td>
                <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} className="ft-weight">
                    {tokenType != null && tokenType != undefined && tokenType?.length > 0 ?
                        <div style={{ display: 'flex' }}>

                            {tokenType.map((i) =>
                                <div style={{ color: '#1890ff' }}>
                                    {i?.value},
                                </div>
                            )}
                        </div>
                        : ''
                    }</td>
            </tr>
            {
                TokenMinted == true ?
                    <tr>
                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%', padding: '10px 0px' }} className="ft-weight">Token Contract</td>
                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', color: '#1890ff' }} className="ft-weight" onClick={() => opennewWindow(tokenContactLink)}>{tokenContactAddress != null && tokenContactAddress != undefined && tokenContactAddress}</td>
                    </tr>
                    : <></>
            }
        </tbody>

    </table>
</div>



{/* 
                        <div className="row" style={{ marginTop: '20px', marginBottom: '20px' }}>

                            <div className="col-md-12">

                                <div  className='borderValueAll' style={{ border: '2px solid #E3E9EF', padding: '15px' }}>
                                     <div className="row">


                                        <div className="col-md-12" style={{ padding: '0px', marginBottom: '10px' }}>


                                            <div className="row align-items-center" style={{ width: '100%', margin: '0px' }}>
                                                <div className="col" style={{ padding: '0px' }}>
                                                    
                                                    <div className="search ">
                                                        <h3 className="card-title mb-0" >Proposals</h3>
                                                    </div>
                                                </div>
                                                <div className="col-auto float-right ml-auto">
                                                    <button className="btn add-btn2" style={{ margin: '0px', borderRadius: '2px', marginBottom: '0px', marginRight: '0px', width: '75px', padding: '5px' }}>View More</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div> 

                                    <div className="row">
                                        <div className="col-md-12 d-flex">
                                            <div className="card card-table flex-fill" style={{ border: 'none', marginBottom: '0px' }}>

                                                <div className="card-body">
                                                    <div className="table-responsive">
                                                        <Table

                                                            pagination={false}
                                                           

                                                            style={{ overflowX: 'auto' }}
                                                            columns={columns2}
                                                            bordered
                                                            dataSource={proposalDetalsData}
                                                            rowKey={record => record.id}
                                                        />

                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div> */}
{/* style={{ marginBottom: '15px', minWidth: "385px", paddingLeft: '30px', paddingRight: '30px' }} */ }
{/* style={{ marginBottom: '15px',  paddingLeft: '0px', paddingRight: '0px' }}
style={{ marginBottom: '15px',  paddingLeft: '0px', paddingRight: '0px' }}
style={{ marginBottom: '15px',  paddingLeft: '0px', paddingRight: '0px' }} */}
{/* <div className="row mb-2">

<div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
    <div style={{ marginTop: "20px"}}>
    <CardMain></CardMain>
    </div>
</div>
<div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
    <div style={{ marginTop: "20px"}}>
    <CardMain></CardMain>
    </div>
</div>
<div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
    <div style={{ marginTop: "20px"}}>
    <CardMain></CardMain>
    </div>
</div>
<div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
    <div style={{ marginTop: "20px"}}>
    <CardMain></CardMain>
    </div>
</div>


</div>
*/}


const currentTableDataClosedDeals = useMemo(() => {
    if (UsersDetailsData?.length > 0) {

        dispatch(InvestorsDataInFoundersDashboard({ currentPageClosedDeals, PageSizeClosedDeals, data: UsersDetailsData }))
        // setChangeBol(false)
    }
    // const firstPageIndex = (currentPageClosedDeals - 1) * PageSizeClosedDeals;
    // const lastPageIndex = firstPageIndex + PageSizeClosedDeals;
    // var data = []
    // data = UsersDetailsData
    // console.log(UsersDetailsData, "projectDetailsData in livea?.user?.fund_name");
    // console.log(data, "data in live");
    // if (data.length > 0) {
    //     gigdataRef = data.slice(firstPageIndex, lastPageIndex)
    //     return data.slice(firstPageIndex, lastPageIndex);
    // } else {
    //     gigdataRef = [];
    //     return data = [];
    // }
}, [currentPageClosedDeals, UsersDetailsData, changeBol]);


























<div className="col-lg-6 col-md-6 col-sm-12">
    <div style={{ marginBottom: '20px' }}>
        <div className='mainDivPie'>

            <div className="col mainPieCircle">
                <div style={{ height: '120px', width: '115px' }}>
                    {
                        OverallScore != null && OverallScore != undefined ?
                            <PieChart

                                animate
                                animationDuration={500}
                                animationEasing="ease-out"
                                // labelStyle={{
                                //     fontSize: "5px",
                                //     fill: "#000"
                                // }}
                                labelPosition={45}
                                lineWidth={40}
                                data={[
                                    { title: OverallScoreOpp, value: OverallScoreOpp, color: '#94B3E8' },
                                    { title: OverallScore, value: OverallScore, color: '#6345ED' },
                                    // { title: 'Three', value: 20, color: '#6A2135' },
                                ]}
                            // radius={30}

                            />
                            :
                            <PieChart
                                animate
                                animationDuration={500}
                                animationEasing="ease-out"
                                labelPosition={45}
                                lineWidth={40}
                                data={[
                                    { title: "10", value: 10, color: '#94B3E8' },
                                    { title: '0', value: 0, color: '#6345ED' },
                                ]}

                            />
                    }
                </div>

                {
                    OverallScore != null && OverallScore != undefined ?
                        <div className='marginTopCircleTxt' >{OverallScore}</div>
                        :
                        <div className='marginTopCircleTxt'  >{0}</div>
                }

                <div>

                    <h3 className="card-title mb-0" style={{ fontSize: '16px', marginTop: '10px' }}>Overall Score</h3>
                </div>
                {/* <div style={{ marginTop: '-85px',  fontSize: '20px', fontWeight: 'bold', position: 'absolute' }}>21</div> */}
            </div>
            <div className="col mainPieCircle">
                <div style={{ height: '120px', width: '115px' }}>
                    {
                        InvestorScore != null && InvestorScore != undefined ?
                            <PieChart
                                animate
                                animationDuration={500}
                                animationEasing="ease-out"
                                labelPosition={45}
                                lineWidth={40}
                                data={[
                                    { title: InvestorScoreOpp, value: InvestorScoreOpp, color: '#94B3E8' },
                                    { title: InvestorScore, value: InvestorScore, color: '#6345ED' },
                                ]}

                            />
                            :
                            <PieChart
                                animate
                                animationDuration={500}
                                animationEasing="ease-out"
                                labelPosition={45}
                                lineWidth={40}
                                data={[
                                    { title: '10', value: 10, color: '#94B3E8' },
                                    { title: '0', value: 0, color: '#6345ED' },
                                ]}

                            />
                    }

                </div>

                {
                    InvestorScore != null && InvestorScore != undefined ?
                        <div className='marginTopCircleTxt' >{InvestorScore}</div>
                        :
                        <div className='marginTopCircleTxt' >{0}</div>
                }

                <div>

                    <h3 className="card-title mb-0" style={{ fontSize: '16px', marginTop: '10px' }}>Investor Score</h3>
                </div>
            </div>
            <div className="col mainPieCircle">
                <div style={{ height: '120px', width: '115px' }}>
                    {
                        validatorScore != null && validatorScore != undefined ?

                            <PieChart
                                animate
                                animationDuration={500}
                                animationEasing="ease-out"
                                labelPosition={45}
                                lineWidth={40}
                                data={[
                                    { title: validatorScoreOpp, value: validatorScoreOpp, color: '#94B3E8' },
                                    { title: validatorScore, value: validatorScore, color: '#6345ED' },
                                ]}
                            />
                            :
                            <PieChart
                                animate
                                animationDuration={500}
                                animationEasing="ease-out"
                                labelPosition={45}
                                lineWidth={40}
                                data={[
                                    { title: '10', value: 10, color: '#94B3E8' },
                                    { title: '0', value: 0, color: '#6345ED' },
                                ]}
                            />
                    }


                </div>

                {
                    validatorScore != null && validatorScore != undefined ?
                        <div className='marginTopCircleTxt' >{validatorScore}</div>
                        :
                        <div className='marginTopCircleTxt' >{0}</div>
                }

                <div>

                    <h3 className="card-title mb-0" style={{ fontSize: '16px', marginTop: '10px' }}>Validator Score</h3>
                </div>
                {/* <div style={{ marginTop: '-85px',  fontSize: '20px', fontWeight: 'bold', position: 'absolute' }}>21</div> */}
            </div>
        </div>
    </div>
</div>
















//////////////////////


                            <div className="col-lg-6 col-md-6 col-sm-12" style={{ padding: '0px' }} >
                                <div className='borderValueAll' style={{ border: '2px solid #E3E9EF', padding: '15px', marginLeft: '10px', height: '100%' }}>

                                    <div className="row">

                                        <div className="col-md-12 " style={{ padding: '0px', marginBottom: '10px' }}>


                                            <div className="row align-items-center" style={{ width: '100%', margin: '0px' }}>
                                                <div className="col" style={{ padding: '0px' }}>
                                                    {/* mt-4 mb-2*/}
                                                    <div className="search ">
                                                        {/* style={{ padding: '10px' }} */}
                                                        <h3 className="card-title mb-0" >Project Score</h3>
                                                    </div>
                                                </div>
                                                <div className="col-auto float-right ml-auto">
                                                    <button className="btn add-btn2" style={{ margin: '0px', borderRadius: '2px', marginBottom: '0px', marginRight: '0px', width: '75px', padding: '5px' }}>View More</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* style={{ marginTop: '10%' }} */}
                                    <div className="row" style={{ height: '80%' }}>
                                        <div className="col" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                            <div style={{ height: '120px', width: '115px' }}>
                                                {
                                                    OverallScore != null && OverallScore != undefined ?
                                                        <PieChart

                                                            animate
                                                            animationDuration={500}
                                                            animationEasing="ease-out"
                                                            // labelStyle={{
                                                            //     fontSize: "5px",
                                                            //     fill: "#000"
                                                            // }}
                                                            labelPosition={45}
                                                            lineWidth={40}
                                                            data={[
                                                                { title: 'One', value: OverallScoreOpp, color: '#CBEDFF' },
                                                                { title: 'Two', value: OverallScore, color: '#6345ED' },
                                                                // { title: 'Three', value: 20, color: '#6A2135' },
                                                            ]}
                                                        // radius={30}

                                                        />
                                                        :
                                                        <PieChart
                                                            animate
                                                            animationDuration={500}
                                                            animationEasing="ease-out"
                                                            labelPosition={45}
                                                            lineWidth={40}
                                                            data={[
                                                                { title: 'One', value: 10, color: '#CBEDFF' },
                                                                { title: 'Two', value: 0, color: '#6345ED' },
                                                            ]}

                                                        />
                                                }
                                            </div>

                                            {
                                                OverallScore != null && OverallScore != undefined ?
                                                    <div style={{ marginTop: '-30px', width: '115px', textAlign: 'center', fontSize: '24px', fontWeight: '600', position: 'absolute' }}>{OverallScore}</div>
                                                    :
                                                    <div style={{ marginTop: '-30px', width: '115px', textAlign: 'center', fontSize: '24px', fontWeight: '600', position: 'absolute' }}>{0}</div>
                                            }

                                            <div style={{ width: '115px', textAlign: 'center' }}>

                                                <h3 className="card-title mb-0" style={{ padding: '5px', fontSize: '16px' }}>Overall Score</h3>
                                            </div>
                                            {/* <div style={{ marginTop: '-85px', width:'115px',textAlign:'center', fontSize: '20px', fontWeight: 'bold', position: 'absolute' }}>21</div> */}
                                        </div>
                                        <div className="col" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                            <div style={{ height: '120px', width: '115px' }}>
                                                {
                                                    InvestorScore != null && InvestorScore != undefined ?
                                                        <PieChart
                                                            animate
                                                            animationDuration={500}
                                                            animationEasing="ease-out"
                                                            labelPosition={45}

                                                            lineWidth={40}
                                                            data={[
                                                                { title: 'One', value: InvestorScoreOpp, color: '#CBEDFF' },
                                                                { title: 'Two', value: InvestorScore, color: '#6345ED' },
                                                            ]}

                                                        />
                                                        :
                                                        <PieChart
                                                            animate
                                                            animationDuration={500}
                                                            animationEasing="ease-out"
                                                            labelPosition={45}

                                                            lineWidth={40}
                                                            data={[
                                                                { title: 'One', value: 10, color: '#CBEDFF' },
                                                                { title: 'Two', value: 0, color: '#6345ED' },
                                                            ]}

                                                        />
                                                }

                                            </div>

                                            {
                                                InvestorScore != null && InvestorScore != undefined ?
                                                    <div style={{ marginTop: '-30px', width: '115px', textAlign: 'center', fontSize: '24px', fontWeight: '600', position: 'absolute' }}>{InvestorScore}</div>
                                                    :
                                                    <div style={{ marginTop: '-30px', width: '115px', textAlign: 'center', fontSize: '24px', fontWeight: '600', position: 'absolute' }}>{0}</div>
                                            }

                                            <div style={{ width: '115px', textAlign: 'center' }}>

                                                <h3 className="card-title mb-0" style={{ padding: '5px', fontSize: '16px' }}>Investor Score</h3>
                                            </div>
                                        </div>
                                        <div className="col" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                            <div style={{ height: '120px', width: '115px' }}>
                                                {
                                                    validatorScore != null && validatorScore != undefined ?

                                                        <PieChart
                                                            animate
                                                            animationDuration={500}
                                                            animationEasing="ease-out"
                                                            labelPosition={45}

                                                            lineWidth={40}
                                                            data={[
                                                                { title: 'One', value: validatorScoreOpp, color: '#CBEDFF' },
                                                                { title: 'Two', value: validatorScore, color: '#6345ED' },
                                                            ]}
                                                        />
                                                        :
                                                        <PieChart
                                                            animate
                                                            animationDuration={500}
                                                            animationEasing="ease-out"
                                                            labelPosition={45}

                                                            lineWidth={40}
                                                            data={[
                                                                { title: 'One', value: 10, color: '#CBEDFF' },
                                                                { title: 'Two', value: 0, color: '#6345ED' },
                                                            ]}
                                                        />
                                                }


                                            </div>

                                            {
                                                validatorScore != null && validatorScore != undefined ?
                                                    <div style={{ marginTop: '-30px', width: '115px', textAlign: 'center', fontSize: '24px', fontWeight: '600', position: 'absolute' }}>{validatorScore}</div>
                                                    :
                                                    <div style={{ marginTop: '-30px', width: '115px', textAlign: 'center', fontSize: '24px', fontWeight: '600', position: 'absolute' }}>{0}</div>
                                            }

                                            <div style={{ width: '115px', textAlign: 'center' }}>

                                                <h3 className="card-title mb-0" style={{ padding: '5px', fontSize: '16px' }}>Validator Score</h3>
                                            </div>
                                            {/* <div style={{ marginTop: '-85px', width:'115px',textAlign:'center', fontSize: '20px', fontWeight: 'bold', position: 'absolute' }}>21</div> */}
                                        </div>
                                    </div>
                                </div>

                            </div>