<div className='col-sm-4 col-md-4 col-lg-4 col-xl-4' style={{ marginBottom: '15px' }}>
<Card style={{ height: '100%', marginBottom: '0px' }}>
  {/* <Card.Img variant="top" src={gamingImg} style={{
    height: '165px',
    borderTopLeftRadius: '15px',
    borderTopRightRadius: '15px'
  }} /> */}
  <Card.Body>
    <Card.Title style={{ margin: '0px' ,textAlign:'center',height: '110px',overflow:'auto'}}>{i?.project_name}</Card.Title>
    <img src={i?.logo} alt="" width="20px" style={{ borderRadius: '50px' }} />
   <Card.Subtitle style={{ marginTop: '10px', marginBottom: '10px', fontSize: '16px' }} >
      <div className="cardText">
        <div>
        Project Id
        </div>
        <div style={{ color: '#6345ED', textDecoration: 'underline', textDecorationColor: '#6345ED',cursor:'pointer' }} onClick={()=>sendDatatoProjectPage(i?._id)}>
        {i?.project_id}
        </div>
      </div>

    </Card.Subtitle >
    <Card.Text style={{ fontSize: '16px' }} >
      <div>
        <div className="cardText">
          Description
        </div>
        <div className="cardText" style={{height:'150px',overflow:'auto',alignItems:'baseline'}}>
          
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
        {/* {i?.total_fund_raised != null && i?.total_fund_raised != undefined ? i?.total_fund_raised:'0'} USD */}
        </div>
      </div>
    </Card.Text>
    <Card.Text>
      <div className="cardText">
        <div>
          Funds Raised Till Now
        </div>
        <div>
          
        {i?.fund_raised_till_now != null && i?.fund_raised_till_now != undefined ? i?.fund_raised_till_now:'0'}
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
))}