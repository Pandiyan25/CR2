import React from 'react'
import './rating.css'

const RatingReview = ({type}) => {
  return (
    <div className="maindivRate">
        <div className='subdivRate' style={{textAlign:'center'}}>
            Reviewer Type: {type}
        </div>
       
        {/* <div className='subdivRate' style={{textAlign:'center'}}>
            Rating Address :0xB54CbA7c986401e3912b2B47C315C5aCE7BFcfF5
        </div> */}
        
        <div className='subdivRate' style={{textAlign:'center',}}>
            <span>Latest rating:</span> &nbsp; <span>24th September 2022, 5:35 PM</span> 
        </div>
    </div>
  )
}

export default RatingReview