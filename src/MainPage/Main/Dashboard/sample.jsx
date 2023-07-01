<table className="table table-nowrap custom-table mb-0">
<thead>
  <tr>
    <th style={{ borderBottom: '0px', borderTop: '0px' }}>S.No</th>
    <th style={{ borderBottom: '0px', borderTop: '0px' }}>Project Id</th>
    <th style={{ borderBottom: '0px', borderTop: '0px' }}>Logo</th>
    <th style={{ borderBottom: '0px', borderTop: '0px' }}>Name</th>
    <th style={{ borderBottom: '0px', borderTop: '0px' }}>Description</th>
    <th style={{ borderBottom: '0px', borderTop: '0px' }}>Total Fund Raise</th>

    <th style={{ borderBottom: '0px', borderTop: '0px' }}>Funds Raised Till Now</th>

    <th style={{ borderBottom: '0px', borderTop: '0px' }}>Rate Project</th>
    {/* <th className="text-right">Action</th> */}
  </tr>
</thead>
<tbody>
  <tr>
    <td>
      1
    </td>
    <td>#001</td>
    <td style={{ textAlign: 'center' }}><img src={designLogo2} alt="" width="20px" /></td>
    <td>
      TEST
    </td>
    <td>
      TEST
    </td>
    <td>
      1000 USD
    </td>
    <td>
      5000 USD
    </td>
    <td>
      {/* <Rating name="hover-feedback" readOnly /> */}
      <Rating
        style={{ color: 'red' }}
        emptySymbol="fa fa-star-o fa-mx"
        fullSymbol="fa fa-star fa-mx"
        readonly={true}
        initialRating={1}
      />
    </td>
  </tr>
  <tr>

    <td>
      2
    </td>
    <td>#002</td>
    <td style={{ textAlign: 'center' }}><img src={designLogo2} alt="" width="20px" /></td>
    <td>
      TEST
    </td>
    <td>
      TEST
    </td>
    <td>
      1000 USD
    </td>
    <td>
      5000 USD
    </td>
    <td>
      <Rating
        style={{ color: 'red' }}
        emptySymbol="fa fa-star-o fa-mx"
        fullSymbol="fa fa-star fa-mx"
        readonly={true}
        value={4}
        initialRating={2}
      />
    </td>
  </tr>
  <tr>

    <td>
      3
    </td>
    <td>#003</td>
    <td style={{ textAlign: 'center' }}><img src={designLogo2} alt="" width="20px" /></td>
    <td>
      TEST
    </td>
    <td>
      TEST
    </td>
    <td>
      1000 USD
    </td>
    <td>
      5000 USD
    </td>
    <td>
      <Rating
        style={{ color: 'red' }}
        emptySymbol="fa fa-star-o fa-mx"
        fullSymbol="fa fa-star fa-mx"
        readonly={true}
        initialRating={3}
        fi
      />
    </td>
  </tr>
  <tr>

    <td>
      4
    </td>
    <td>#004</td>
    <td style={{ textAlign: 'center' }}><img src={designLogo2} alt="" width="20px" /></td>
    <td>
      TEST
    </td>
    <td>
      TEST
    </td>
    <td>
      1000 USD
    </td>
    <td>
      5000 USD
    </td>
    <td>
      {/* fa-2x */}
      <Rating
        style={{ color: 'red' }}
        emptySymbol="fa fa-star-o fa-mx"
        fullSymbol="fa fa-star fa-mx"
        readonly={true}
        initialRating={5}

      />

    </td>
  </tr>

</tbody>
</table>



 {/* <div className="table-responsive">
                      <table className="table table-nowrap custom-table mb-0">
                        <thead>
                          <tr>
                            <th style={{ borderBottom: '0px', borderTop: '0px' }}>Sno</th>
                            <th style={{ borderBottom: '0px', borderTop: '0px' }}>Project id</th>
                            <th style={{ borderBottom: '0px', borderTop: '0px' }}>Logo</th>
                            <th style={{ borderBottom: '0px', borderTop: '0px' }}>Name</th>
                            <th style={{ borderBottom: '0px', borderTop: '0px' }}>Description</th>
                            <th style={{ borderBottom: '0px', borderTop: '0px' }}>Total Fund Raise</th>
                            <th style={{ borderBottom: '0px', borderTop: '0px' }}>Funds Raised Till Now</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1</td>
                            <td>#0001</td>

                            <td style={{ textAlign: 'center' }}><img src={designLogo2} alt="" width="20px" /></td>
                            <td>
                              <h2><a href="#">Global Technologies</a></h2>
                            </td>
                            <td>Test</td>
                            <td>1000 USD</td>
                            <td>5000 USD</td>

                          </tr>
                          <tr>
                            <td>2</td>
                            <td>#0002</td>

                            <td style={{ textAlign: 'center' }}><img src={designLogo2} alt="" width="20px" /></td>
                            <td>
                              <h2><a href="#">Delta Infotech</a></h2>
                            </td>
                            <td>Test</td>
                            <td>1000 USD</td>
                            <td>3000 USD</td>

                          </tr>
                          <tr>
                            <td>3</td>
                            <td>#0003</td>

                            <td style={{ textAlign: 'center' }}><img src={designLogo2} alt="" width="20px" /></td>
                            <td>
                              <h2><a href="#">Cream Inc</a></h2>
                            </td>
                            <td>Test</td>
                            <td>1000 USD</td>
                            <td>6000 USD</td>

                          </tr>
                        </tbody>
                      </table>
                    </div> */}





                    <div className="col-md-12 d-flex">
                <div className="card card-table flex-fill">
                  <div className="card-header" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 className="card-title mb-0">Live Projects</h3>
                    <Button variant="secondary" style={{ background: '#6345ED', color: 'white', border: '1px solid #6345ED', fontSize: '12px', borderRadius: '50px' }}>
                      View All
                    </Button>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <Table
                      
                          pagination={{
                                        total: projectDetailsData.length,
                                        showSizeChanger: true, onShowSizeChange: onShowSizeChange, itemRender: itemRender
                                    }
                                    }
                                    style={{ overflowX: 'auto' }}
                                    columns={columns}
                                    bordered
                                    dataSource={projectDetailsData}
                                    rowKey={record => record.id}
                                />

                    </div>
                  </div>

                </div>
              </div>








//////////////////////////////////
Live Projects

<div className='col-sm-4 col-md-4 col-lg-4 col-xl-4' style={{ marginBottom: '15px' }}>
<Card style={{ height: '100%', marginBottom: '0px' }}>
  <Card.Img variant="top" src={gamingImg} style={{
    height: '165px',
    borderTopLeftRadius: '15px',
    borderTopRightRadius: '15px'
  }} />
  <Card.Body>
    <Card.Title style={{ margin: '0px' }}>CrSquare Investor</Card.Title>
    <Card.Subtitle style={{ marginTop: '10px', marginBottom: '10px', fontSize: '16px' }} >
      <div className="cardText">
        <div>
          Project Id
        </div>
        <div style={{ color: '#6345ED', textDecoration: 'underline', textDecorationColor: '#6345ED' }}>
          123332
        </div>
      </div>

    </Card.Subtitle >
    <Card.Text style={{ fontSize: '16px' }} >
      <div>
        <div className="cardText">
          Description
        </div>
        <div className="cardText">
          Some quick example text to build on the card title and make up the bulk of
          the card's content.
        </div>
      </div>

    </Card.Text>
    <Card.Text>
      <div className="cardText">
        <div>
          Total Fund Raise
        </div>
        <div>
          10000 USD
        </div>
      </div>
    </Card.Text>
    <Card.Text>
      <div className="cardText">
        <div>
          Funds Raised Till Now
        </div>
        <div>
          10000 USD
        </div>
      </div>
    </Card.Text>
    <Card.Text>
      <div style={{ textAlign: 'center' }}>
        <Rating
          style={{ color: '#ff9800', fontSize: '25px' }}
          emptySymbol="fa fa-star-o fa-mx"
          fullSymbol="fa fa-star fa-mx"
          // readonly={true}
          initialRating={2}
        />
      </div>
    </Card.Text>
  </Card.Body>
</Card>
</div>
<div className='col-sm-4 col-md-4 col-lg-4 col-xl-4' style={{ marginBottom: '15px' }}>
<Card style={{ height: '100%', marginBottom: '0px' }}>
  <Card.Img variant="top" src={gamingImg} style={{
    height: '165px',
    borderTopLeftRadius: '15px',
    borderTopRightRadius: '15px'
  }} />
  <Card.Body>
    <Card.Title style={{ margin: '0px' }}>CrSquare Investor</Card.Title>
    <Card.Subtitle style={{ marginTop: '10px', marginBottom: '10px', fontSize: '16px' }} >
      <div className="cardText">
        <div>
          Project Id
        </div>
        <div style={{ color: '#6345ED', textDecoration: 'underline', textDecorationColor: '#6345ED' }}>
          123332
        </div>
      </div>

    </Card.Subtitle >
    <Card.Text style={{ fontSize: '16px' }} >
      <div>
        <div className="cardText">
          Description
        </div>
        <div className="cardText">
          Some quick example text to build on the card title and make up the bulk of
          the card's content.
        </div>
      </div>

    </Card.Text>
    <Card.Text>
      <div className="cardText">
        <div>
          Total Fund Raise
        </div>
        <div>
          10000 USD
        </div>
      </div>
    </Card.Text>
    <Card.Text>
      <div className="cardText">
        <div>
          Funds Raised Till Now
        </div>
        <div>
          10000 USD
        </div>
      </div>
    </Card.Text>
    <Card.Text>
      <div style={{ textAlign: 'center' }}>
        <Rating
          style={{ color: '#ff9800', fontSize: '25px' }}
          emptySymbol="fa fa-star-o fa-mx"
          fullSymbol="fa fa-star fa-mx"
          // readonly={true}
          initialRating={2}
        />
      </div>
    </Card.Text>
  </Card.Body>
</Card>
</div>
<div className='col-sm-4 col-md-4 col-lg-4 col-xl-4' style={{ marginBottom: '15px' }}>
<Card style={{ height: '100%', marginBottom: '0px' }}>
  <Card.Img variant="top" src={gamingImg} style={{
    height: '165px',
    borderTopLeftRadius: '15px',
    borderTopRightRadius: '15px'
  }} />
  <Card.Body>
    <Card.Title style={{ margin: '0px' }}>CrSquare Investor</Card.Title>
    <Card.Subtitle style={{ marginTop: '10px', marginBottom: '10px', fontSize: '16px' }} >
      <div className="cardText">
        <div>
          Project Id
        </div>
        <div style={{ color: '#6345ED', textDecoration: 'underline', textDecorationColor: '#6345ED' }}>
          123332
        </div>
      </div>

    </Card.Subtitle >
    <Card.Text style={{ fontSize: '16px' }} >
      <div>
        <div className="cardText">
          Description
        </div>
        <div className="cardText">
          Some quick example text to build on the card title and make up the bulk of
          the card's content.
        </div>
      </div>

    </Card.Text>
    <Card.Text>
      <div className="cardText">
        <div>
          Total Fund Raise
        </div>
        <div>
          10000 USD
        </div>
      </div>
    </Card.Text>
    <Card.Text>
      <div className="cardText">
        <div>
          Funds Raised Till Now
        </div>
        <div>
          10000 USD
        </div>
      </div>
    </Card.Text>
    <Card.Text>
      <div style={{ textAlign: 'center' }}>
        <Rating
          style={{ color: '#ff9800', fontSize: '25px' }}
          emptySymbol="fa fa-star-o fa-mx"
          fullSymbol="fa fa-star fa-mx"
          // readonly={true}
          initialRating={2}
        />
      </div>
    </Card.Text>
  </Card.Body>
</Card>
</div>




























<div className='col-sm-4 col-md-4 col-lg-4 col-xl-4' style={{ marginBottom: '15px' }}>
<Card style={{ height: '100%', marginBottom: '0px' }}>
  {/* <Card.Img variant="top" src={gamingImg} style={{
    height: '165px',
    borderTopLeftRadius: '15px',
    borderTopRightRadius: '15px'
  }} /> */}
  <Card.Body>

    <img src={i?.logo} alt="" width="20px" style={{ borderRadius: '50px' }} />
    <Card.Title style={{ margin: '0px', textAlign: 'center', height: '110px', overflow: 'auto' }}>{i?.project_name}</Card.Title>
    <Card.Subtitle style={{ marginTop: '10px', marginBottom: '10px', fontSize: '16px' }} >
      <div className="cardText">
        <div>
          Project Id
        </div>
        <div style={{ color: '#6345ED', textDecoration: 'underline', textDecorationColor: '#6345ED', cursor: 'pointer' }} onClick={() => sendDatatoProjectPage(i?._id)}>
          {i?.project_id}
        </div>
      </div>

    </Card.Subtitle >
    <Card.Text style={{ fontSize: '16px' }} >
      <div>
        <div className="cardText">
          Description
        </div>
        <div className="cardText" style={{ height: '150px', overflow: 'auto', alignItems: 'baseline' }}>

          {i?.project_description}
        </div>
      </div>

    </Card.Text>
    <Card.Text>
      <div className="cardText">
        <div>
          Total Fund Raise
        </div>
        <div>

          {/* total_fund_raised */}
          {i?.total_budget != null && i?.total_budget != undefined ? i?.total_budget : '0'}
        </div>
      </div>
    </Card.Text>
    <Card.Text>
      <div className="cardText">
        <div>
          Funds Raised Till Now
        </div>
        <div>

          {i?.fund_raised_till_now != null && i?.fund_raised_till_now != undefined ? i?.fund_raised_till_now : '0'}
        </div>
      </div>
    </Card.Text>
    <Card.Text>
      <div style={{ textAlign: 'center' }}>
        <Rating
          style={{ color: '#ff9800', fontSize: '25px' }}
          emptySymbol="fa fa-star-o fa-mx"
          fullSymbol="fa fa-star fa-mx"
          // readonly={true}
          initialRating={2}
        />
      </div>
    </Card.Text>

    {/* <Card.Text>
      <div style={{ textAlign: 'center' }}>
        {"->"}
      </div>
    </Card.Text> */}
  </Card.Body>
</Card>
</div>






<div className="row">
              <div className='col-sm-4 col-md-4 col-lg-4 col-xl-4' style={{ marginBottom: '15px' }}>
                {/* style={{ height: '100%', marginBottom: '0px',border:'2px solid #1890ff',boxShadow:' 0 5px 5px 0 rgba(0, 0, 0, 0.2)' }} */}
                <Card className='cardInDashboard' >
                  <Card.Img variant="top" src={fighterCover} style={{
                    height: '165px',
                    borderTopLeftRadius: '15px',
                    borderTopRightRadius: '15px'
                  }} />
                  <div className='cardFlexDiv'>

                    <div className='cardSubText'>
                      <span style={{ width: '100%', heigth: '100%' }}>
                        <img src={Cryptologo2} alt="" className='cardTextImage' />


                      </span>
                    </div>

                    <div className='cardparDiv'>
                      <p className='cardPar'>
                        End Date
                      </p>
                      <p className='cardPar'>
                        March 14, 2022
                      </p>
                    </div>
                  </div>
                  <Card.Body style={{ padding: '0px' }} className="cardBodyStyle">
                    <div className='gridBox'>
                      <div className='firstGrid'>
                        <div className='firstInnerGrid'>
                          <h2 className='firstGridH2'>
                            Founder First Project
                          </h2>
                          <p className='firstGridp' style={{ margin: '0px' }}>
                            NFTS,Ideation
                          </p>
                        </div>
                        <div className='secondInnerGrid'>
                          <div className='secondInnerGridInner'>
                            <img src={polygon} alt="" className='secondGridDivLogo' />
                          </div>
                        </div>
                      </div>
                      <p className='MaindescParagraph'>
                        <span className='descSpan'>
                          <span>A 3D Metaverse of Everything</span>
                        </span>
                      </p>
                    </div >

                    <div className='gridBox2'>
                      <div className='firstDivGridBOx2'>
                        <p className='firstDivPara' style={{ margin: '0px' }}>
                          Total Fund Raise
                        </p>
                        <hr className='firstDivHr' />
                        <p className='firstDivPara' style={{ margin: '0px' }}>
                          <span>
                            $300000
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className='gridBox2'>
                      <div className='firstDivGridBOx2'>
                        <p className='firstDivPara' style={{ margin: '0px' }}>
                          Funds Raised Till Now
                        </p>
                        <hr className='firstDivHr' />
                        <p className='firstDivPara' style={{ margin: '0px' }}>
                          <span>
                            3651
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className='gridBox2'>
                      <div className='firstDivGridBOx2' style={{ height: '25px' }}>
                        <p className='firstDivPara' style={{ margin: '0px' }}>
                          <span style={{ color: '#000000a1 ' }}>
                            #Amplifier
                          </span>
                        </p>

                      </div>
                    </div>

                    <div className='gridBox3'>

                      <div className="gridBox3IconDiv">
                        <FontAwesomeIcon icon={faGlobe} className='gridBox3Icons' />
                      </div>


                      <div className="gridBox3IconDiv">
                        <FontAwesomeIcon icon={faLinkedinIn} className='gridBox3Icons' />
                      </div>


                      <div className="gridBox3IconDiv">
                        <FontAwesomeIcon icon={faPaperPlane} className='gridBox3Icons' />
                      </div>

                    </div>
                    {/* <div className="CardiconDiv">
                      <FontAwesomeIcon icon={faLongArrowAltRight} className='CardIcon' />
                    </div> */}
                    {/* <Card.Title style={{ margin: '0px', textAlign: 'center', height: '110px', overflow: 'auto' }}>{i?.project_name}</Card.Title> */}

                  </Card.Body>

                  <Card.Footer className="CardFooterDiv">
                    <div className="CardiconDiv">
                      <div className='cardIconRatingDiv'>
                        <Rating
                          style={{ color: '#ff9800', fontSize: '25px' }}
                          emptySymbol="fa fa-star-o fa-mx"
                          fullSymbol="fa fa-star fa-mx"
                          // readonly={true}
                          initialRating={2}
                        />
                      </div>
                      <FontAwesomeIcon icon={faLongArrowAltRight} className='CardIcon' />
                    </div>
                  </Card.Footer>
                </Card>
              </div>
              <div className='col-sm-4 col-md-4 col-lg-4 col-xl-4' style={{ marginBottom: '15px' }}>
                {/* style={{ height: '100%', marginBottom: '0px',border:'2px solid #1890ff',boxShadow:' 0 5px 5px 0 rgba(0, 0, 0, 0.2)' }} */}
                <Card className='cardInDashboard' >
                  <Card.Img variant="top" src={cryptoCover2} style={{
                    height: '165px',
                    borderTopLeftRadius: '15px',
                    borderTopRightRadius: '15px'
                  }} />
                  <div className='cardFlexDiv'>

                    <div className='cardSubText' style={{ background: 'black' }}>
                      <span style={{ width: '100%', heigth: '100%' }}>
                        <img src={logoCrypto} alt="" className='cardTextImage' />


                      </span>
                    </div>

                    <div className='cardparDiv'>
                      <p className='cardPar'>
                        End Date
                      </p>
                      <p className='cardPar'>
                        March 14, 2022
                      </p>
                    </div>
                  </div>
                  <Card.Body style={{ padding: '0px' }} className="cardBodyStyle">
                    <div className='gridBox'>
                      <div className='firstGrid'>
                        <div className='firstInnerGrid'>
                          <h2 className='firstGridH2'>
                            Founder First Project
                          </h2>
                          <p className='firstGridp' style={{ margin: '0px' }}>
                            NFTS,Ideation
                          </p>
                        </div>
                        <div className='secondInnerGrid'>
                          <div className='secondInnerGridInner'>
                            <img src={polygon} alt="" className='secondGridDivLogo' />
                          </div>
                        </div>
                      </div>
                      <p className='MaindescParagraph'>
                        <span className='descSpan'>
                          <span>A 3D Metaverse of Everything</span>
                        </span>
                      </p>
                    </div >

                    <div className='gridBox2'>
                      <div className='firstDivGridBOx2'>
                        <p className='firstDivPara' style={{ margin: '0px' }}>
                          Total Fund Raise
                        </p>
                        <hr className='firstDivHr' />
                        <p className='firstDivPara' style={{ margin: '0px' }}>
                          <span>
                            $300000
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className='gridBox2'>
                      <div className='firstDivGridBOx2'>
                        <p className='firstDivPara' style={{ margin: '0px' }}>
                          Funds Raised Till Now
                        </p>
                        <hr className='firstDivHr' />
                        <p className='firstDivPara' style={{ margin: '0px' }}>
                          <span>
                            3651
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className='gridBox2'>
                      <div className='firstDivGridBOx2' style={{ height: '25px' }}>
                        <p className='firstDivPara' style={{ margin: '0px' }}>
                          <span style={{ color: '#000000a1 ' }}>
                            #Amplifier
                          </span>
                        </p>

                      </div>
                    </div>


                    <div className='gridBox3'>

                      <div className="gridBox3IconDiv">
                        <FontAwesomeIcon icon={faGlobe} className='gridBox3Icons' />
                      </div>


                      <div className="gridBox3IconDiv">
                        <FontAwesomeIcon icon={faLinkedinIn} className='gridBox3Icons' />
                      </div>


                      <div className="gridBox3IconDiv">
                        <FontAwesomeIcon icon={faPaperPlane} className='gridBox3Icons' />
                      </div>

                    </div>
                    {/* <Card.Title style={{ margin: '0px', textAlign: 'center', height: '110px', overflow: 'auto' }}>{i?.project_name}</Card.Title> */}

                    {/* <div className="CardiconDiv">
                      <FontAwesomeIcon icon={faLongArrowAltRight} className='CardIcon' />
                    </div> */}
                  </Card.Body>
                  <Card.Footer className="CardFooterDiv">
                    <div className="CardiconDiv">
                      <div className='cardIconRatingDiv'>
                        <Rating
                          style={{ color: '#ff9800', fontSize: '25px' }}
                          emptySymbol="fa fa-star-o fa-mx"
                          fullSymbol="fa fa-star fa-mx"
                          // readonly={true}
                          initialRating={2}
                        />
                      </div>
                      <FontAwesomeIcon icon={faLongArrowAltRight} className='CardIcon' />
                    </div>
                  </Card.Footer>
                </Card>
              </div>
              <div className='col-sm-4 col-md-4 col-lg-4 col-xl-4' style={{ marginBottom: '15px' }}>
                {/* style={{ , marginBottom: '0px',border:'2px solid #1890ff',boxShadow:' 0 5px 5px 0 rgba(0, 0, 0, 0.2)' }} */}
                <Card className='cardInDashboard' >
                  <Card.Img variant="top" src={cryptoCover3} style={{
                    height: '165px',
                    borderTopLeftRadius: '15px',
                    borderTopRightRadius: '15px'
                  }} />
                  <div className='cardFlexDiv'>

                    <div className='cardSubText' style={{ background: 'rgb(0 104 243)' }}>
                      <span style={{ width: '100%', heigth: '100%' }}>
                        <img src={Cryptologo3} alt="" className='cardTextImage' />


                      </span>
                    </div>

                    <div className='cardparDiv'>
                      <p className='cardPar'>
                        End Date
                      </p>
                      <p className='cardPar'>
                        March 14, 2022
                      </p>
                    </div>
                  </div>
                  <Card.Body style={{ padding: '0px' }} className="cardBodyStyle">
                    <div className='gridBox'>
                      <div className='firstGrid'>
                        <div className='firstInnerGrid'>
                          <h2 className='firstGridH2'>
                            Founder First Project
                          </h2>
                          <p className='firstGridp' style={{ margin: '0px' }}>
                            NFTS,Ideation
                          </p>
                        </div>
                        <div className='secondInnerGrid'>
                          <div className='secondInnerGridInner'>
                            <img src={polygon} alt="" className='secondGridDivLogo' />
                          </div>
                        </div>
                      </div>
                      <p className='MaindescParagraph'>
                        <span className='descSpan'>
                          <span>A 3D Metaverse of Everything</span>
                        </span>
                      </p>
                    </div >

                    <div className='gridBox2'>
                      <div className='firstDivGridBOx2'>
                        <p className='firstDivPara' style={{ margin: '0px' }}>
                          Total Fund Raise
                        </p>
                        <hr className='firstDivHr' />
                        <p className='firstDivPara' style={{ margin: '0px' }}>
                          <span>
                            $300000
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className='gridBox2'>
                      <div className='firstDivGridBOx2'>
                        <p className='firstDivPara' style={{ margin: '0px' }}>
                          Funds Raised Till Now
                        </p>
                        <hr className='firstDivHr' />
                        <p className='firstDivPara' style={{ margin: '0px' }}>
                          <span>
                            3651
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className='gridBox2'>
                      <div className='firstDivGridBOx2' style={{ height: '25px' }}>
                        <p className='firstDivPara' style={{ margin: '0px' }}>
                          <span style={{ color: '#000000a1 ' }}>
                            #Amplifier
                          </span>
                        </p>

                      </div>
                    </div>
                    <div className='gridBox3'>

                      <div className="gridBox3IconDiv">
                        <FontAwesomeIcon icon={faGlobe} className='gridBox3Icons' />
                      </div>


                      <div className="gridBox3IconDiv">
                        <FontAwesomeIcon icon={faLinkedinIn} className='gridBox3Icons' />
                      </div>


                      <div className="gridBox3IconDiv">
                        <FontAwesomeIcon icon={faPaperPlane} className='gridBox3Icons' />
                      </div>

                    </div>
                    {/* <Card.Title style={{ margin: '0px', textAlign: 'center', height: '110px', overflow: 'auto' }}>{i?.project_name}</Card.Title> */}

                    {/* <div className="CardiconDiv">
                      <FontAwesomeIcon icon={faLongArrowAltRight} className='CardIcon' />
                    </div> */}
                  </Card.Body>

                  <Card.Footer className="CardFooterDiv">
                    <div className="CardiconDiv">
                      <div className='cardIconRatingDiv'>
                        <Rating
                          style={{ color: '#ff9800', fontSize: '25px' }}
                          emptySymbol="fa fa-star-o fa-mx"
                          fullSymbol="fa fa-star fa-mx"
                          // readonly={true}
                          initialRating={2}
                        />
                      </div>
                      <FontAwesomeIcon icon={faLongArrowAltRight} className='CardIcon' />
                    </div>
                  </Card.Footer>
                </Card>
              </div>
            </div>


====////////  adminDashboard /////////////

const getProjectDetailsFunc = () => {
  try {

    var query =
      `
      query AllProjects($user: ID) {
        allProjects(user: $user) {
          _id
          user {
            _id
            email
            password
            role
            contact
            first_name
            last_name
            role_in_organization
            fund_description
            minimum_investment_size
            project_invested
            type_of_fund
            preferred_sectors {
              value
            }
            fund_name
            asset_under_management
            projected_invested_till_date
            fund_head_quarters
            team_size
            linkedin
            linkedin_link
            website_link
            twitter_link
            education
            experience
            industry
            experience_in_blockchain
            current_position
            past_organisation_tags
            current_organisation
            current_income
            wallet_address
            current_location
            nationality
            id_proof
            self_description
            id_number
            aum
            dummy
          }
          email_id
          first_name
          last_name
          linkedin_profile_link
          project_name
          project_description
          nature_of_project
          project_start_date
          project_tags
          project_stage
          website_link
          github_repository
          whitepaper
          one_pager_document
          pitch_deck
          number_of_founders
          team_size
          project_id
          project_status
          amount_released
          amount_invested
          amount_in_escrow
          project_end_date
          total_budget
          validator_score
          investor_score
          fund_raised_till_now
          total_fund_raised
          investment_date
          no_of_proposals
          fund_raised_target
          public_launch_price
          logo
          
          rating {
            value
            user_role
          }
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
        // debugger;
        //   console.log('ProjectGetFunctiondata', data?.data?.allProjects);
        if (data?.data?.allProjects != null && data?.data?.allProjects != undefined) {
          // setProjectDetalsData(data?.data?.allProjects)

          var arr = [];
          if (data?.data?.allProjects?.length > 0) {
            var main = 0
            var divide = 0
            for (var j = 0; j < data?.data?.allProjects?.length; j++) {
              if (data?.data?.allProjects[j]?.rating?.length > 0) {
                for (var i = 0; i < data?.data?.allProjects[j]?.rating?.length; i++) {
                  main = main + data?.data?.allProjects[j]?.rating[i].value

                }
                divide = (main / data?.data?.allProjects[j]?.rating?.length) / 2;
              } else {
                main = 0
                divide = 0
              }


              console.log(data?.data?.allProjects[j]?.project_end_date, "date1");
              var dashboardDate = data?.data?.allProjects[j]?.project_end_date
              dashboardDate = dashboardDate?.split('T')[0];


              console.log(divide, "divide");
              arr.push({
                _id: data?.data?.allProjects[j]?._id,

                linkedin_profile_link: data?.data?.allProjects[j]?.linkedin_profile_link,
                project_name: data?.data?.allProjects[j]?.project_name,
                project_description: data?.data?.allProjects[j]?.project_description,
                nature_of_project: data?.data?.allProjects[j]?.nature_of_project,
                project_tags: data?.data?.allProjects[j]?.project_tags,
                project_stage: data?.data?.allProjects[j]?.project_stage,
                website_link: data?.data?.allProjects[j]?.website_link,
                whitepaper: data?.data?.allProjects[j]?.whitepaper,
                project_id: data?.data?.allProjects[j]?.project_id,
                project_end_date: dashboardDate,
                total_budget: data?.data?.allProjects[j]?.total_budget,
                fund_raised_till_now: data?.data?.allProjects[j]?.fund_raised_till_now,
                total_fund_raised: data?.data?.allProjects[j]?.total_fund_raised,
                logo: data?.data?.allProjects[j]?.logo,
                ratingValue: divide


              })

            }
            setProjectDetalsData(arr)
          }

          //  console.log();
        }
      });

  } catch (error) {
    console.log(error, "ProjectGetFunctionError  in Dashboard in investors error");
  }
}

<div className="page-wrapper" style={{paddingTop:'60px'}}>

<div className="content container-fluid">
  <div >
    <div className="page-header">
      <div className="header-left">
        <div className="row">
          <div className="col-sm-12">
            <h3 className="page-title">Welcome  {userDetailsPageData.length > 0 && userDetailsPageData[0]?.first_name}!</h3>

          </div>
        </div>
      </div>

    </div>
    <div style={{ background: 'white', padding: '20px', borderRadius: '15px', boxShadow: '0px 10px 20px #C4C8D0' }}>

      <div className="row" >
        <div className="col-md-6 col-sm-6 col-lg-6">
          <div className="card dash-widget" style={{ borderRadius: '15px' }}>
            <div className="card-body">
              <span className="dash-widget-icon"><i className="fa fa-cubes" /></span>
              <div className="dash-widget-info">
                <h3>{totalInvestedbyUser} USD</h3>
                <span>Amount Invested</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-sm-6 col-lg-6 paddingDashboard" >
          <div className="card dash-widget" style={{ borderRadius: '15px' }}>
            <div className="card-body">
              <span className="dash-widget-icon"><i className="fa fa-usd" /></span>
              <div className="dash-widget-info">
                {/* <h3>44</h3> */}
                {projectperticularDetailsData.length > 0 ? <h3>{projectperticularDetailsData.length}</h3> : <h3>0</h3>}
                <span>Number of Projects</span>
              </div>
            </div>
          </div>
        </div>

      </div>
      <div className="row" >
        <div className="col-md-12">

          <h3 className="card-title">Invested Projects</h3>
          <div className="row">
            <div className="col-md-6 text-center">
              <div className="card" style={{ borderRadius: '15px', margin: '0px' }}>
                <div className="card-body">
                  <ResponsiveContainer width='100%' height={300} className="text-center">
                    <PieChart width='100%' height={300}  >
                      <Legend layout="vertical" verticalAlign="top" align="top" />

                      <Pie
                        // data={this.pieData}
                        data={data}
                        color="#000000"
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={120}
                        isAnimationActive={true}
                        animationBegin={400}
                        animationDuration={1500}
                        padding={{ left: '0px', right: '0px' }}
                        // fill="black"
                        //  dataKey="value"
                        // nameKey="name"
                        // cx="50%"
                        // cy="50%"
                        //  outerRadius={50} 
                        fill="#8884d8"

                      // label={renderCustomizedLabel}
                      // outerRadius={80}
                      // fill="#8884d8"
                      // dataKey="value"
                      >
                        {/* <Pie  data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#82ca9d" label > */}
                        {
                          data.map((entry, index) =>
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />

                          )
                        }
                      </Pie>

                      <Tooltip content={CustomTooltip} />
                      {/* <Legend /> */}
                    </PieChart>
                    {/* <PieChart margin={{ top: 0, left: 0, right: 0, bottom: 0 }} padding={{ left: '0px', right: '0px' }} width='50%'>
                      <Pie data={data} dataKey="students" nameKey="name" cx="50%" cy="50%" width='100%' outerRadius="100%" fill="#82ca9d"
                        isAnimationActive={true} animationBegin={400} animationDuration={1500} padding={{ left: '0px', right: '0px' }}
                      >
                        {
                          data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]} width='50%' padding={{ left: '0px', right: '0px' }} />)
                        }
                      </Pie>
                    </PieChart> */}
                  </ResponsiveContainer>

                </div>
              </div>
            </div>
            <div className="col-md-6 text-center paddingDashboardPiechart" >
              <div className="card" style={{ borderRadius: '15px', margin: '0px' }}>
                <div className="card-body">
                  <ResponsiveContainer width='100%' height={300} className="text-center">
                    <PieChart width='100%' height={300}  >
                      <Legend layout="vertical" verticalAlign="top" align="top" />

                      <Pie
                        // data={this.pieData}
                        data={data}
                        color="#000000"
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={120}
                        isAnimationActive={true}
                        animationBegin={400}
                        animationDuration={1500}
                        padding={{ left: '0px', right: '0px' }}
                        // fill="black"
                        //  dataKey="value"
                        // nameKey="name"
                        // cx="50%"
                        // cy="50%"
                        //  outerRadius={50} 
                        fill="#8884d8"

                      // label={renderCustomizedLabel}
                      // outerRadius={80}
                      // fill="#8884d8"
                      // dataKey="value"
                      >
                        {/* <Pie  data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#82ca9d" label > */}
                        {
                          data.map((entry, index) =>
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />

                          )
                        }
                      </Pie>

                      <Tooltip content={CustomTooltip} />
                      {/* <Legend /> */}
                    </PieChart>
                    {/* <PieChart margin={{ top: 0, left: 0, right: 0, bottom: 0 }} padding={{ left: '0px', right: '0px' }} width='50%'>
                      <Pie data={data} dataKey="students" nameKey="name" cx="50%" cy="50%" width='100%' outerRadius="100%" fill="#82ca9d"
                        isAnimationActive={true} animationBegin={400} animationDuration={1500} padding={{ left: '0px', right: '0px' }}
                      >
                        {
                          data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]} width='50%' padding={{ left: '0px', right: '0px' }} />)
                        }
                      </Pie>
                    </PieChart> */}
                  </ResponsiveContainer>

                  {/* <ResponsiveContainer width='100%' height={300}>
                    <PieChart margin={{ top: 0, left: 0, right: 0, bottom: 0 }} padding={{ left: '0px', right: '0px' }} width='50%'>
                      <Pie data={data} dataKey="students" nameKey="name" cx="40%" cy="50%" width='50%' outerRadius="80%" fill="#82ca9d"
                        isAnimationActive={true} animationBegin={400} animationDuration={1500} padding={{ left: '0px', right: '0px' }}
                      >
                        {
                          data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]} width='50%' padding={{ left: '0px', right: '0px' }} />)
                        }
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer> */}

                </div>
              </div>
            </div>


            <div className="col-md-12">
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

                <div style={{ width: '20px', height: '20px', background: 'orange', margin: '15px' }}></div>
                <h5 style={{ margin: '15px' }}>Completed</h5>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ width: '20px', height: '20px', background: 'gray', margin: '15px' }}></div>
                <h5 style={{ margin: '15px' }}>Pending</h5>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'end', alignItems: 'center' }}>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12 d-flex">
          <div className="card card-table flex-fill ">

            <div className="card-body">
              <div className="table-responsive">
                <Table

                  pagination={{
                    total: projectperticularDetailsData.length,
                    showSizeChanger: true, onShowSizeChange: onShowSizeChange, itemRender: itemRender
                  }
                  }
                  style={{ overflowX: 'auto' }}
                  columns={columns2}
                  bordered
                  dataSource={projectperticularDetailsData}
                  rowKey={record => record.id}
                />

              </div>

            </div>

          </div>
        </div>

      </div>

      <div className="row">
        <h3 className="card-title mb-0" style={{ padding: '15px' }}>Live Projects</h3>

      </div>
      <div>
        <div className="row">
          <div className='col-sm-4 col-md-4 col-lg-4 col-xl-4' style={{ marginBottom: '15px' }}>
            <Card className='cardInDashboard'  style={{cursor:'pointer'}}>
              <Card.Img variant="top" src={fighterCover} style={{
                // height: '155px',
                height: '130px',
                borderTopLeftRadius: '15px',
                borderTopRightRadius: '15px'
              }} />
              <div className='cardFlexDiv'>

                <div className='cardSubText'>
                  <span style={{ width: '100%', heigth: '100%' }}>
                    <img src={Cryptologo2} alt="" className='cardTextImage' />



                  </span>
                </div>

                <div className='cardparDiv'>
                  <p className='cardPar'>
                    End Date
                  </p>
                  <p className='cardPar'>
                    {/* March 14, 2022 */}
                    March 14, 2022
                  </p>
                </div>
              </div>
              <Card.Body style={{ padding: '0px' }} className="cardBodyStyle">
                <div className='gridBox'>
                  <div className='firstGrid'>
                    <div className='firstInnerGrid'>
                      <h2 className='firstGridH2'>
                        {/* Founder First Project */}
                        Founder First Project
                      </h2>
                      <p className='firstGridp' style={{ margin: '0px' }}>
                        {/* NFTS */}
                        NFTS,Ideation
                        {/* Level */}
                      </p>
                      {/* {i?.project_stage != null && i?.project_stage != undefined ?
                       <p className='firstGridp' style={{ margin: '0px' }}>
                       {i?.project_stage} Level
                     </p> : ''} */}

                    </div>
                    <div className='secondInnerGrid'>
                      <div className='secondInnerGridInner'>
                        <img src={polygon} alt="" className='secondGridDivLogo' />
                      </div>
                    </div>
                  </div>
                  <p className='MaindescParagraph'>
                    <span className='descSpan'>
                      <span>A 3D Metaverse of Everything</span>
                      {/* <span>A 3D Metaverse of Everything</span> */}
                    </span>
                  </p>
                </div >

                <div className='gridBox2'>
                  <div className='firstDivGridBOx2'>
                    <p className='firstDivPara' style={{ margin: '0px' }}>
                      Total Fund Raise
                    </p>
                    <hr className='firstDivHr' />
                    <p className='firstDivPara' style={{ margin: '0px' }}>
                      <span>
                        {/* $300000 */}

                        $300000 </span>
                    </p>
                  </div>
                </div>
                <div className='gridBox2'>
                  <div className='firstDivGridBOx2'>
                    <p className='firstDivPara' style={{ margin: '0px' }}>
                      Funds Raised Till Now
                    </p>
                    <hr className='firstDivHr' />
                    <p className='firstDivPara' style={{ margin: '0px' }}>
                    <span>
                      3651
                    </span>
                    </p>
                  </div>
                </div>


                {/* <div className='gridBox2'>
                  <div className='firstDivGridBOx2'>
                    <p className='firstDivPara' style={{ margin: '0px' }}>
                      Project Stage
                    </p>
                    <hr className='firstDivHr' />
                    <p className='firstDivPara' style={{ margin: '0px' }}>
                      <span>
                        {i?.project_stage != null && i?.project_stage != undefined ? i?.project_stage : ''}
                      </span>
                    </p>
                  </div>
                </div>  */}
                <div className='gridBox2'>
                  {/* height: '25px' */}
                  <div className='firstDivGridBOx2' style={{}}>
                    {/* <p className='firstDivPara' style={{ margin: '0px' }}>
                      Funds Raised Till Now
                    </p> */}
                    {/* <hr className='firstDivHr' #1890ff' /> */}
                    <p className='firstDivPara' style={{ margin: '0px' }}>
                    <span style={{ color: '#000000a1 ' }}>
                      #Amplifier
                    </span>
                    </p>
                  </div>
                </div>


                <div className='gridBox3'>
                  
                    <div className="gridBox3IconDiv">
                      <FontAwesomeIcon icon={faGlobe} className='gridBox3Icons' onClick={() => opennewWindow(i?.website_link)} />
                    </div>
                    
                    <div className="gridBox3IconDiv">
                      <FontAwesomeIcon icon={faLinkedinIn} className='gridBox3Icons' onClick={() => opennewWindow(i?.linkedin_profile_link)} />
                    </div>
                    
                  
                    <div className="gridBox3IconDiv">
                      <FontAwesomeIcon icon={faPaperPlane} className='gridBox3Icons' onClick={() => opennewWindow(i?.whitepaper)} />
                    </div>
                    
                </div>
                {/* <Card.Title style={{ margin: '0px', textAlign: 'center', height: '110px', overflow: 'auto' }}>{i?.project_name}</Card.Title> */}

                <div className="CardiconDiv">
                  <Rating
                    style={{ color: '#ff9800', fontSize: '23px' }}
                    emptySymbol="fa fa-star-o fa-mx"
                    fullSymbol="fa fa-star fa-mx"
                    readonly={true}
                    initialRating={2}
                  />
                </div>
              </Card.Body>
              {/* <Card.Footer className="CardFooterDiv">
                <div className="CardiconDiv">
                  <div className='cardIconRatingDiv'>
                    <Rating
                      style={{ color: '#ff9800', fontSize: '25px' }}
                      emptySymbol="fa fa-star-o fa-mx"
                      fullSymbol="fa fa-star fa-mx"
                      // readonly={true}
                      initialRating={2}
                    />
                  </div>
                  <FontAwesomeIcon icon={faLongArrowAltRight} className='CardIcon' onClick={() => sendDatatoProjectPage(i?._id)} />
                </div>
              </Card.Footer> */}
            </Card>
          </div>
          
          <div className='col-sm-4 col-md-4 col-lg-4 col-xl-4' style={{ marginBottom: '15px' }}>
            <Card className='cardInDashboard'  style={{cursor:'pointer'}}>
              <Card.Img variant="top" src={cryptoCover2} style={{
                // height: '155px',
                height: '130px',
                borderTopLeftRadius: '15px',
                borderTopRightRadius: '15px'
              }} />
              <div className='cardFlexDiv'>

                <div className='cardSubText'>
                  <span style={{ width: '100%', heigth: '100%' }}>
                    <img src={logoCrypto} alt="" className='cardTextImage' />



                  </span>
                </div>

                <div className='cardparDiv'>
                  <p className='cardPar'>
                    End Date
                  </p>
                  <p className='cardPar'>
                    {/* March 14, 2022 */}
                    March 14, 2022
                  </p>
                </div>
              </div>
              <Card.Body style={{ padding: '0px' }} className="cardBodyStyle">
                <div className='gridBox'>
                  <div className='firstGrid'>
                    <div className='firstInnerGrid'>
                      <h2 className='firstGridH2'>
                        {/* Founder First Project */}
                        Founder First Project
                      </h2>
                      <p className='firstGridp' style={{ margin: '0px' }}>
                        {/* NFTS */}
                        NFTS,Ideation
                        {/* Level */}
                      </p>
                      {/* {i?.project_stage != null && i?.project_stage != undefined ?
                       <p className='firstGridp' style={{ margin: '0px' }}>
                       {i?.project_stage} Level
                     </p> : ''} */}

                    </div>
                    <div className='secondInnerGrid'>
                      <div className='secondInnerGridInner'>
                        <img src={polygon} alt="" className='secondGridDivLogo' />
                      </div>
                    </div>
                  </div>
                  <p className='MaindescParagraph'>
                    <span className='descSpan'>
                      <span>A 3D Metaverse of Everything</span>
                      {/* <span>A 3D Metaverse of Everything</span> */}
                    </span>
                  </p>
                </div >

                <div className='gridBox2'>
                  <div className='firstDivGridBOx2'>
                    <p className='firstDivPara' style={{ margin: '0px' }}>
                      Total Fund Raise
                    </p>
                    <hr className='firstDivHr' />
                    <p className='firstDivPara' style={{ margin: '0px' }}>
                      <span>
                        {/* $300000 */}

                        $300000 </span>
                    </p>
                  </div>
                </div>
                <div className='gridBox2'>
                  <div className='firstDivGridBOx2'>
                    <p className='firstDivPara' style={{ margin: '0px' }}>
                      Funds Raised Till Now
                    </p>
                    <hr className='firstDivHr' />
                    <p className='firstDivPara' style={{ margin: '0px' }}>
                    <span>
                      3651
                    </span>
                    </p>
                  </div>
                </div>


                {/* <div className='gridBox2'>
                  <div className='firstDivGridBOx2'>
                    <p className='firstDivPara' style={{ margin: '0px' }}>
                      Project Stage
                    </p>
                    <hr className='firstDivHr' />
                    <p className='firstDivPara' style={{ margin: '0px' }}>
                      <span>
                        {i?.project_stage != null && i?.project_stage != undefined ? i?.project_stage : ''}
                      </span>
                    </p>
                  </div>
                </div>  */}
                <div className='gridBox2'>
                  {/* height: '25px' */}
                  <div className='firstDivGridBOx2' style={{}}>
                    {/* <p className='firstDivPara' style={{ margin: '0px' }}>
                      Funds Raised Till Now
                    </p> */}
                    {/* <hr className='firstDivHr' #1890ff' /> */}
                    <p className='firstDivPara' style={{ margin: '0px' }}>
                    <span style={{ color: '#000000a1 ' }}>
                      #Amplifier
                    </span>
                    </p>
                  </div>
                </div>


                <div className='gridBox3'>
                  
                    <div className="gridBox3IconDiv">
                      <FontAwesomeIcon icon={faGlobe} className='gridBox3Icons' onClick={() => opennewWindow(i?.website_link)} />
                    </div>
                    
                    <div className="gridBox3IconDiv">
                      <FontAwesomeIcon icon={faLinkedinIn} className='gridBox3Icons' onClick={() => opennewWindow(i?.linkedin_profile_link)} />
                    </div>
                    
                  
                    <div className="gridBox3IconDiv">
                      <FontAwesomeIcon icon={faPaperPlane} className='gridBox3Icons' onClick={() => opennewWindow(i?.whitepaper)} />
                    </div>
                    
                </div>
                {/* <Card.Title style={{ margin: '0px', textAlign: 'center', height: '110px', overflow: 'auto' }}>{i?.project_name}</Card.Title> */}

                <div className="CardiconDiv">
                  <Rating
                    style={{ color: '#ff9800', fontSize: '23px' }}
                    emptySymbol="fa fa-star-o fa-mx"
                    fullSymbol="fa fa-star fa-mx"
                    readonly={true}
                    initialRating={2}
                  />
                </div>
              </Card.Body>
              {/* <Card.Footer className="CardFooterDiv">
                <div className="CardiconDiv">
                  <div className='cardIconRatingDiv'>
                    <Rating
                      style={{ color: '#ff9800', fontSize: '25px' }}
                      emptySymbol="fa fa-star-o fa-mx"
                      fullSymbol="fa fa-star fa-mx"
                      // readonly={true}
                      initialRating={2}
                    />
                  </div>
                  <FontAwesomeIcon icon={faLongArrowAltRight} className='CardIcon' onClick={() => sendDatatoProjectPage(i?._id)} />
                </div>
              </Card.Footer> */}
            </Card>
          </div>
          
          <div className='col-sm-4 col-md-4 col-lg-4 col-xl-4' style={{ marginBottom: '15px' }}>
            <Card className='cardInDashboard'  style={{cursor:'pointer'}}>
              <Card.Img variant="top" src={cryptoCover3} style={{
                // height: '155px',
                height: '130px',
                borderTopLeftRadius: '15px',
                borderTopRightRadius: '15px'
              }} />
              <div className='cardFlexDiv'>

                <div className='cardSubText'>
                  <span style={{ width: '100%', heigth: '100%' }}>
                    <img src={Cryptologo3} alt="" className='cardTextImage' />



                  </span>
                </div>

                <div className='cardparDiv'>
                  <p className='cardPar'>
                    End Date
                  </p>
                  <p className='cardPar'>
                    {/* March 14, 2022 */}
                    March 14, 2022
                  </p>
                </div>
              </div>
              <Card.Body style={{ padding: '0px' }} className="cardBodyStyle">
                <div className='gridBox'>
                  <div className='firstGrid'>
                    <div className='firstInnerGrid'>
                      <h2 className='firstGridH2'>
                        {/* Founder First Project */}
                        Founder First Project
                      </h2>
                      <p className='firstGridp' style={{ margin: '0px' }}>
                        {/* NFTS */}
                        NFTS,Ideation
                        {/* Level */}
                      </p>
                      {/* {i?.project_stage != null && i?.project_stage != undefined ?
                       <p className='firstGridp' style={{ margin: '0px' }}>
                       {i?.project_stage} Level
                     </p> : ''} */}

                    </div>
                    <div className='secondInnerGrid'>
                      <div className='secondInnerGridInner'>
                        <img src={polygon} alt="" className='secondGridDivLogo' />
                      </div>
                    </div>
                  </div>
                  <p className='MaindescParagraph'>
                    <span className='descSpan'>
                      <span>A 3D Metaverse of Everything</span>
                      {/* <span>A 3D Metaverse of Everything</span> */}
                    </span>
                  </p>
                </div >

                <div className='gridBox2'>
                  <div className='firstDivGridBOx2'>
                    <p className='firstDivPara' style={{ margin: '0px' }}>
                      Total Fund Raise
                    </p>
                    <hr className='firstDivHr' />
                    <p className='firstDivPara' style={{ margin: '0px' }}>
                      <span>
                        {/* $300000 */}

                        $300000 </span>
                    </p>
                  </div>
                </div>
                <div className='gridBox2'>
                  <div className='firstDivGridBOx2'>
                    <p className='firstDivPara' style={{ margin: '0px' }}>
                      Funds Raised Till Now
                    </p>
                    <hr className='firstDivHr' />
                    <p className='firstDivPara' style={{ margin: '0px' }}>
                    <span>
                      3651
                    </span>
                    </p>
                  </div>
                </div>


                {/* <div className='gridBox2'>
                  <div className='firstDivGridBOx2'>
                    <p className='firstDivPara' style={{ margin: '0px' }}>
                      Project Stage
                    </p>
                    <hr className='firstDivHr' />
                    <p className='firstDivPara' style={{ margin: '0px' }}>
                      <span>
                        {i?.project_stage != null && i?.project_stage != undefined ? i?.project_stage : ''}
                      </span>
                    </p>
                  </div>
                </div>  */}
                <div className='gridBox2'>
                  {/* height: '25px' */}
                  <div className='firstDivGridBOx2' style={{}}>
                    {/* <p className='firstDivPara' style={{ margin: '0px' }}>
                      Funds Raised Till Now
                    </p> */}
                    {/* <hr className='firstDivHr' #1890ff' /> */}
                    <p className='firstDivPara' style={{ margin: '0px' }}>
                    <span style={{ color: '#000000a1 ' }}>
                      #Amplifier
                    </span>
                    </p>
                  </div>
                </div>


                <div className='gridBox3'>
                  
                    <div className="gridBox3IconDiv">
                      <FontAwesomeIcon icon={faGlobe} className='gridBox3Icons' onClick={() => opennewWindow(i?.website_link)} />
                    </div>
                    
                    <div className="gridBox3IconDiv">
                      <FontAwesomeIcon icon={faLinkedinIn} className='gridBox3Icons' onClick={() => opennewWindow(i?.linkedin_profile_link)} />
                    </div>
                    
                  
                    <div className="gridBox3IconDiv">
                      <FontAwesomeIcon icon={faPaperPlane} className='gridBox3Icons' onClick={() => opennewWindow(i?.whitepaper)} />
                    </div>
                    
                </div>
                {/* <Card.Title style={{ margin: '0px', textAlign: 'center', height: '110px', overflow: 'auto' }}>{i?.project_name}</Card.Title> */}

                <div className="CardiconDiv">
                  <Rating
                    style={{ color: '#ff9800', fontSize: '23px' }}
                    emptySymbol="fa fa-star-o fa-mx"
                    fullSymbol="fa fa-star fa-mx"
                    readonly={true}
                    initialRating={2}
                  />
                </div>
              </Card.Body>
              {/* <Card.Footer className="CardFooterDiv">
                <div className="CardiconDiv">
                  <div className='cardIconRatingDiv'>
                    <Rating
                      style={{ color: '#ff9800', fontSize: '25px' }}
                      emptySymbol="fa fa-star-o fa-mx"
                      fullSymbol="fa fa-star fa-mx"
                      // readonly={true}
                      initialRating={2}
                    />
                  </div>
                  <FontAwesomeIcon icon={faLongArrowAltRight} className='CardIcon' onClick={() => sendDatatoProjectPage(i?._id)} />
                </div>
              </Card.Footer> */}
            </Card>
          </div>
        </div>
      </div>
      

      <div className="row">
        {projectDetailsData.length > 0 && projectDetailsData.map((i) => (



          <div className='col-sm-4 col-md-4 col-lg-4 col-xl-4' style={{ marginBottom: '15px' }}>
            {/* style={{ , marginBottom: '0px',border:'2px solid #1890ff',boxShadow:' 0 5px 5px 0 rgba(0, 0, 0, 0.2)' }} */}
            <Card className='cardInDashboard' style={{cursor:'pointer'}}>
              <Card.Img variant="top" src={gamingImg} style={{
                // height: '155px',
                height: '130px',
                borderTopLeftRadius: '15px',
                borderTopRightRadius: '15px'
              }}
              onClick={() => sendDatatoProjectPage(i?._id)}
               />
              <div className='cardFlexDiv'>

                <div className='cardSubText'  onClick={() => sendDatatoProjectPage(i?._id)}>
                  <span style={{ width: '100%', heigth: '100%' }}>
                    {i.logo != null && i.logo != undefined ?

                      <img src={i?.logo} alt="" className='cardTextImage' />
                      :
                      ''
                    }


                  </span>
                </div>

                <div className='cardparDiv'  onClick={() => sendDatatoProjectPage(i?._id)}>
                  <p className='cardPar'>
                    End Date
                  </p>
                  <p className='cardPar'>
                    {/* March 14, 2022 */}
                    {i?.project_end_date}
                  </p>
                </div>
              </div>
              <Card.Body style={{ padding: '0px' }} className="cardBodyStyle">
                <div className='gridBox'  onClick={() => sendDatatoProjectPage(i?._id)}>
                  <div className='firstGrid'>
                    <div className='firstInnerGrid'>
                    <h2 className='firstGridH2'>
                        {/* Founder First Project */}
                          <span className='descSpan'>

                            {i?.project_name}
                          </span>

                      </h2>
                      <p className='firstGridp' style={{ margin: '0px' }}>
                        {/* NFTS */}
                        {i?.nature_of_project} ,{i?.project_stage != null && i?.project_stage != undefined ? `${i?.project_stage} ` : ''}
                        {/* Level */}
                      </p>
                      {/* {i?.project_stage != null && i?.project_stage != undefined ?
                       <p className='firstGridp' style={{ margin: '0px' }}>
                       {i?.project_stage} Level
                     </p> : ''} */}

                    </div>
                    <div className='secondInnerGrid'>
                      <div className='secondInnerGridInner'>
                        <img src={polygon} alt="" className='secondGridDivLogo' />
                      </div>
                    </div>
                  </div>
                  <p className='MaindescParagraph'>
                    <span className='descSpan'>
                      <span>{i?.project_description}</span>
                      {/* <span>A 3D Metaverse of Everything</span> */}
                    </span>
                  </p>
                </div >

                <div className='gridBox2'  onClick={() => sendDatatoProjectPage(i?._id)}>
                  <div className='firstDivGridBOx2'>
                    <p className='firstDivPara' style={{ margin: '0px' }}>
                      Total Fund Raise
                    </p>
                    <hr className='firstDivHr' />
                    <p className='firstDivPara' style={{ margin: '0px' }}>
                      <span>
                        {/* $300000 */}
                        {i?.total_budget != null && i?.total_budget != undefined ? i?.total_budget : '0'} USD
                      </span>
                    </p>
                  </div>
                </div>
                <div className='gridBox2'  onClick={() => sendDatatoProjectPage(i?._id)}>
                  <div className='firstDivGridBOx2'>
                    <p className='firstDivPara' style={{ margin: '0px' }}>
                      Funds Raised Till Now
                    </p>
                    <hr className='firstDivHr' />
                    <p className='firstDivPara' style={{ margin: '0px' }}>
                      <span>
                        {i?.fund_raised_till_now != null && i?.fund_raised_till_now != undefined ? i?.fund_raised_till_now : '0'} USD
                      </span>
                    </p>
                  </div>
                </div>


                {/* <div className='gridBox2'>
                  <div className='firstDivGridBOx2'>
                    <p className='firstDivPara' style={{ margin: '0px' }}>
                      Project Stage
                    </p>
                    <hr className='firstDivHr' />
                    <p className='firstDivPara' style={{ margin: '0px' }}>
                      <span>
                        {i?.project_stage != null && i?.project_stage != undefined ? i?.project_stage : ''}
                      </span>
                    </p>
                  </div>
                </div>  */}
                <div className='gridBox2'  onClick={() => sendDatatoProjectPage(i?._id)}>
                  {/* height: '25px' */}
                  <div className='firstDivGridBOx2' style={{}}>
                    {/* <p className='firstDivPara' style={{ margin: '0px' }}>
                      Funds Raised Till Now
                    </p> */}
                    {/* <hr className='firstDivHr' #1890ff' /> */}
                    <p className='firstDivPara' style={{ margin: '0px' }}>
                      <span style={{ color: '#000000a1 ', fontSize: '14px' }}>
                        {i?.project_tags != null && i?.project_tags != undefined ? i?.project_tags : ''}
                      </span>
                    </p>
                  </div>
                </div>


                <div className='gridBox3'>
                  {i?.website_link != '' && i?.website_link != null && i?.website_link != undefined ?

                    <div className="gridBox3IconDiv">
                      <FontAwesomeIcon icon={faGlobe} className='gridBox3Icons' onClick={() => opennewWindow(i?.website_link)} />
                    </div>
                    :
                    ''
                  }
                  {i?.linkedin_profile_link != '' && i?.linkedin_profile_link != null && i?.linkedin_profile_link != undefined ?

                    <div className="gridBox3IconDiv">
                      <FontAwesomeIcon icon={faLinkedinIn} className='gridBox3Icons' onClick={() => opennewWindow(i?.linkedin_profile_link)} />
                    </div>
                    :
                    ''
                  }
                  {i?.whitepaper != '' && i?.whitepaper != null && i?.whitepaper != undefined ?

                    <div className="gridBox3IconDiv">
                      <FontAwesomeIcon icon={faPaperPlane} className='gridBox3Icons' onClick={() => opennewWindow(i?.whitepaper)} />
                    </div>
                    :
                    ''
                  }
                </div>
                {/* <Card.Title style={{ margin: '0px', textAlign: 'center', height: '110px', overflow: 'auto' }}>{i?.project_name}</Card.Title> */}

                <div className="CardiconDiv"  onClick={() => sendDatatoProjectPage(i?._id)}>
                  <Rating
                    style={{ color: '#ff9800', fontSize: '23px' }}
                    emptySymbol="fa fa-star-o fa-mx"
                    fullSymbol="fa fa-star fa-mx"
                    readonly={true}
                    initialRating={i?.ratingValue}
                  />
                </div>
              </Card.Body>
              {/* <Card.Footer className="CardFooterDiv">
                <div className="CardiconDiv">
                  <div className='cardIconRatingDiv'>
                    <Rating
                      style={{ color: '#ff9800', fontSize: '25px' }}
                      emptySymbol="fa fa-star-o fa-mx"
                      fullSymbol="fa fa-star fa-mx"
                      // readonly={true}
                      initialRating={2}
                    />
                  </div>
                  <FontAwesomeIcon icon={faLongArrowAltRight} className='CardIcon' onClick={() => sendDatatoProjectPage(i?._id)} />
                </div>
              </Card.Footer> */}
            </Card>
          </div>

        ))}

      </div>

    </div>
  </div>

</div>
{/* /Page Content */}
</div>