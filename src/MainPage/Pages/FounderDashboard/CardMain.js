
import React ,{ useState } from 'react';
import { Button, Card } from 'react-bootstrap';
// import '../../App.css'
import ProgressBar from 'react-bootstrap/ProgressBar';
// import { CanvasJSChart } from 'canvasjs-react-charts';
// import gamingImg from '../Assests/gamingImg.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './cardStyle.css'

// import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used

import { faLongArrowAltRight, faGlobe, faRetweet, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faLinkedinIn, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const CardPageMain = () => {
const now=60;
// const [mydata2, setMydata2] = useState([
//   { name: "satisfied", y: 5 },
//   { name: "Unsatisfied", y: 5 },
// ])

// const options = {
//   height: 100,
//   animationEnabled: true,
//   background: '#f8fbff',
//   theme: "light2",
//   label: '',
//   toolTip: {
//     enabled: false,
//   },
//   title: {
//     fontSize: 20,
//     // verticalAlign: "bottom",
//     // dockInsidePlotArea: true
//   },
//   subtitles: [{
//     text: "71% Positive",
//     verticalAlign: "center",
//     fontSize: 24,
//     dockInsidePlotArea: true
//   }],
//   data: [{
//     type: "doughnut",
//     radius: "90%",  //change the radius here.
//     showInLegend: true,
//     // indexLabel: "{name}: {y}",
//     // yValueFormatString: "#,###'%'",
//     dataPoints: mydata2,
//   }]


    return (
        
        <div>

          {/* <div className='col-sm-4 col-md-4 col-lg-4 col-xl-4' style={{ marginBottom: '15px', maxWidth: "330px" }}> */}
            <Card className='cardInDashboard' style={{ cursor: 'pointer', height: '670px', margin: 'auto', gap: '6px' }}>
              <Card.Img variant="top" style={{
                height: '130px',
              }}  />
              <div className='cardFlexDiv'  >

                <div className='cardSubText'>
                  <span style={{ width: '100%', heigth: '100%' }}>
                    
                      <img src={''} alt="" className='cardTextImage' />

                    



                  </span>
                </div>

              </div>
              <Card.Body style={{ padding: '0px' }} className="cardBodyStyle">
                <div className='gridBox'>
                  <div className='firstGrid'>
                    <div className='firstInnerGrid'>
                      <h2 className='firstGridH2'>

                        <span className='descSpan' style={{fontSize:"25px"}}>
                          {/* {i?.project_name} */}
                          Project Name
                        </span>

                        
                      </h2>

                      <p className='MaindescParagraph'>
                        <span className='descSpan' >
                          {/* <span>{i?.project_description}</span> */}
                          <span>A 3D Metaverse of Everything</span>
                          
                        </span>
                      </p>


                    </div>
                    <div className='secondInnerGrid'>
                      <div className='secondInnerGridInner'>

                        <div style={{ width: '100px', height: '60px', overflow: 'hidden', marginTop: '-30px', position: 'absolute', right: '0px' }}>
                          {/* <CanvasJSChart  height="80px" width="80px" showInLegend='false' /> */}
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
                    <p className='firstDivPara' style={{ margin: '0px' ,color:"#282828"}}>
                      Nature of Project
                    </p>
                    {/* <hr className='firstDivHr' /> */}
                    <p className='firstDivPararight' style={{ margin: '0px',fontWeight:"600"  }}>
                      <span>
                        {/* {i?.nature_of_project} */}
                        DEFI
                        {/* {i?.total_budget != null && i?.total_budget != undefined ? i?.total_budget : '0'} */}
                      </span>
                    </p>
                  </div>
                </div>


                <div className='gridBox2 mb-2' >
                  <div className='firstDivGridBOx2'>
                    <p className='firstDivPara' style={{ margin: '0px',color:"#282828"}}>
                      Project Stage
                    </p>
                    {/* <hr className='firstDivHr' /> */}
                    <p className='firstDivPararight' style={{ margin: '0px',fontWeight:"600" }}>
                      <span>
                      Ideation
                        {/* {i?.project_stage != null && i?.project_stage != undefined ? `${i?.project_stage} ` : ''} */}
                        {/* {i?.total_budget != null && i?.total_budget != undefined ? i?.total_budget : '0'} */}
                      </span>
                    </p>
                  </div>
                </div>


                <div className='gridBox3Main' >
                  <div className='firstDivGridBOxtag'>
                    <p className='firstDivPara' style={{ margin: '0px' }}>
                      {/* Tags */}
                    </p>
                    {/* <hr className='firstDivHr' /> */}
                    <p className='firstDivPara' style={{ margin: '0px' }}>
                      <span>
                      #Ideation #amechain
                        {/* {i?.project_tags != null && i?.project_tags != undefined ? i?.project_tags : ''} */}
                        {/* {i?.total_budget != null && i?.total_budget != undefined ? i?.total_budget : '0'} */}
                      </span>
                    </p>
                  </div>
                </div>
                {/* <div className='gridBox3Main2'></div> */}

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
                        Seed
                      </span>
                    </p>
                  </div>
                </div>

                <div className='gridBox2' >
                  <div className='firstDivGridBOx2'>
                    <p className='firstDivPara' style={{ margin: '0px' }}>
                      Total Fund Raise Target
                    </p>
                    {/* <hr className='firstDivHr' /> */}
                    <p className='firstDivPararight' style={{ margin: '0px' }}>
                      <span className='gridSpan'>
                        $1200
                        {/* $  {i?.total_budget != null && i?.total_budget != undefined ? i?.total_budget : '0'} */}
                        {/* {i?.total_budget != null && i?.total_budget != undefined ? i?.total_budget : '0'} */}
                      </span>
                    </p>
                  </div>
                </div>

                <div className='gridBox2'  >
                  <div className='firstDivGridBOx2'>
                    <p className='firstDivPara' style={{ margin: '0px' }}>
                      Lead Investor
                    </p>
                    {/* <hr className='firstDivHr' /> */}
                    <p className='firstDivPararight' style={{ margin: '0px' }}>
                      <span className='gridSpan'>
                        Sharma
                        {/* {i?.fund_raised_till_now != null && i?.fund_raised_till_now != undefined ? i?.fund_raised_till_now : '0'} */}
                      </span>
                    </p>
                  </div>
                </div>


                <div className='gridBox2 mb-2'  >
                  <div className='firstDivGridBOx2' style={{ display: 'flex' }}>
                    <p className='firstDivPara' style={{ margin: '0px' }}>
                      Expected TGE
                    </p>
                    {/* <hr className='firstDivHr' /> */}
                    <p className='firstDivPararight' style={{ margin: '0px' }}>
                      <span className='gridSpan'>
                        12/04/2022
                        {/* {i?.fund_raised_till_now != null && i?.fund_raised_till_now != undefined ? i?.fund_raised_till_now : '0'} */}
                      </span>
                    </p>
                  </div>
                </div>

                <h6 className='pl-4' style={{fontWeight:"600"}}>Deal</h6>

                <div className='gridBox2'  >
                  <div className='firstDivGridBOx2' style={{ display: 'flex' }}>
                    <p className='firstDivPara' style={{ margin: '0px' }}>
                      Funds Requested 
                    </p>
                    {/* <hr className='firstDivHr' /> */}
                    <p className='firstDivPararight' style={{ margin: '0px' }}>
                      <span className='gridSpan'>
                        1000 USD
                        {/* {i?.fund_raised_till_now != null && i?.fund_raised_till_now != undefined ? i?.fund_raised_till_now : '0'} */}
                      </span>
                    </p>
                  </div>
                </div>


                <div className='gridBox2'  >
                  <div className='firstDivGridBOx2' style={{ display: 'flex' }}>
                    <p className='firstDivPara' style={{ margin: '0px' }}>
                  Token ticker
                    </p>
                    {/* <hr className='firstDivHr' /> */}
                    <p className='firstDivPararight' style={{ margin: '0px' }}>
                      <span className='gridSpan'>
                 CR2
                        {/* {i?.fund_raised_till_now != null && i?.fund_raised_till_now != undefined ? i?.fund_raised_till_now : '0'} */}
                      </span>
                    </p>
                  </div>
                </div>
                <div className='gridBox2'  >
                  <div className='firstDivGridBOx2' style={{ display: 'flex' }}>
                    <p className='firstDivPara' style={{ margin: '0px' }}>
               Price per Token
                    </p>
                    {/* <hr className='firstDivHr' /> */}
                    <p className='firstDivPararight' style={{ margin: '0px' }}>
                      <span className='gridSpan'>
                0.002USD
                        {/* {i?.fund_raised_till_now != null && i?.fund_raised_till_now != undefined ? i?.fund_raised_till_now : '0'} */}
                      </span>
                    </p>
                  </div>
                </div>
                <div className='gridBox2'  >
                  <div className='firstDivGridBOx2' style={{ display: 'flex' }}>
                    <p className='firstDivPara' style={{ margin: '0px' }}>
              Stage
                    </p>
                    {/* <hr className='firstDivHr' /> */}
                    <p className='firstDivPararight' style={{ margin: '0px' }}>
                      <span className='gridSpan'>
                    pre-seed
                        {/* {i?.fund_raised_till_now != null && i?.fund_raised_till_now != undefined ? i?.fund_raised_till_now : '0'} */}
                      </span>
                    </p>
                  </div>
                </div>



                <div className='p-4' ><ProgressBar  now={now}/></div>


                <div className='gridButtons'>



           

                  <div className='gridBox3ButtonsMain mr-2'>
                    <div className='gridAlignItems' style={{display:"flex"}}>
                      <button className='gridbuttonClass'>
                        Project
                      </button>

                      <button className='gridbuttonClass ml-2'>
                        Invest
                      </button>
                    </div>
                  </div>

                  <div className='gridBox3Buttons'>

<div className="gridBox3IconDiv">
  
{/* <FontAwesomeIcon icon={solid('globe')} className='gridBox3Icons' /> */}
  <FontAwesomeIcon icon={faGlobe} className='gridBox3Icons' />
</div>


<div className="gridBox3IconDiv">
  <FontAwesomeIcon icon={faLinkedinIn} className='gridBox3Icons' />
</div>


<div className="gridBox3IconDiv">
  <FontAwesomeIcon icon={faPaperPlane} className='gridBox3Icons' />
</div>

</div>


                </div>

                {/* <div className="CardiconDiv"  >
                <Rating
                  style={{ color: '#ff9800', fontSize: '23px' }}
                  emptySymbol="fa fa-star-o fa-mx"
                  fullSymbol="fa fa-star fa-mx"
                  readonly={true}
                  initialRating={2}
                />
              </div> */}
              </Card.Body>

            </Card>
          {/* </div> */}
        
      </div>
    )
}

export default CardPageMain;
