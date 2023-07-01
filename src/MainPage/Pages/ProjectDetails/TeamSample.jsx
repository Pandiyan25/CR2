
    <div >
    <div className="page-header">
      <div className="header-left">
        <div className="row">
          <div className="col-sm-12">
            <h3 className="page-title">Team</h3>

          </div>
        </div>
      </div>

    </div>
    <div>

      <div className="row">
        {projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails.map((i) => (
          // <div className=" col-md-4 col-sm-4 col-lg-4 col-xl-4">
          //   <div className="cardHEight card dash-widget">
          //     <div className="card-body">
          //       <div className="mainTeamDiv">
          //         <h5>Name :</h5>
          //         <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{i.length > 0 && i[0]?.name}</td>
          //       </div>
          //       <div className="mainTeamDiv">
          //         <h5>Role :</h5>
          //         <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{i.length > 0 && i[0]?.role}</td>
          //       </div>
          //       <div className="mainTeamDiv">
          //         <h5>Profile Link :</h5>
          //         <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{i.length > 0 && i[0]?.profile_link}</td>
          //       </div>
          //     </div>
          //   </div>
          // </div>
           <div className='col-sm-4 col-md-4 col-lg-4 col-xl-4' style={{ marginBottom: '15px' }}>
           <Card style={{ height: '100%', marginBottom: '0px' }}>
             <Card.Img variant="top" src={gamingImg} style={{
               height: '165px',
               borderTopLeftRadius: '15px',
               borderTopRightRadius: '15px'
             }} />
             <Card.Body style={{padding:'15px'}}>
               <Card.Title style={{ margin: '0px' ,textAlign:'center'}}>{i.length > 0 && i[0]?.name}</Card.Title>
               <Card.Text style={{marginTop: '10px',marginBottom: '10px', fontSize: '16px'  }} >
                 <div className="cardText">
                 <h5 style={{fontSize:'20px',fontWeight:'normal'}}>Role :</h5>
                   
                 <h5 style={{fontSize:'20px',fontWeight:'normal'}}>{i.length > 0 && i[0]?.role}</h5>
                 </div>

               </Card.Text >
               
               <Card.Text>
                 <div className="cardText">
                   <div>
                   Profile Link
                   </div>
                   <div>
                   {i.length > 0 && i[0]?.profile_link} 
                   </div>
                 </div>
               </Card.Text>
               <Card.Text style={{marginTop: '10px',marginBottom: '10px', fontSize: '16px'  }} >
                 <div className="cardText2">
                   
                   <div style={{ color: '#6345ED', textDecoration: 'underline',textDecorationColor:'#6345ED',marginRight:'10px' }}>
                     #DEFI
                   </div>
                   
                   <div style={{ color: '#6345ED', textDecoration: 'underline',textDecorationColor:'#6345ED' }}>
                     #CRYPTO
                   </div>
                 </div>

               </Card.Text >
               
               <Card.Text>
                 <div className="cardText">
                   <div>
                   <FontAwesomeIcon icon={faTwitter} style={{fontSize:'20px'}} />
                   </div>
                   <div>
                   <FontAwesomeIcon icon={faFacebook} style={{fontSize:'20px'}} />
                   </div>
                   <div>
                   <FontAwesomeIcon icon={faInstagram} style={{fontSize:'20px'}} />
                   </div>
                   <div>
                   <FontAwesomeIcon icon={faLinkedin} style={{fontSize:'20px'}} />
                   </div>
                   <div>
                   <FontAwesomeIcon icon={faTelegram} style={{fontSize:'20px'}} />
                   </div>
                 </div>
               </Card.Text>

             </Card.Body>
           </Card>
         </div>
        ))}

        {/* respcard */}


      </div>


    </div>
  </div>