<tr >
                                                    <td style={{ textAlign: 'center', padding: '5px', paddingTop: '20px' }}>
                                                        {/* Milestone 1 */}
                                                        Complete 50% of the Target Fund Raise
                                                    </td>
                                                    <td style={{ textAlign: 'center', padding: '5px', paddingTop: '20px' }}>
                                                        2022-08-23
                                                    </td>
                                                    <td style={{ textAlign: 'center', padding: '5px', paddingTop: '20px' }}>
                                                        5%
                                                    </td>
                                                    <td style={{ width: '135px', textAlign: 'center', padding: '5px', paddingTop: '20px' }}>
                                                        <div style={{ border: '2px solid green', color: 'green', backgroundColor: 'white', width: '100%', padding: '2px', fontWeight: '700' }}>
                                                            Validated
                                                            {/* {i?.validation_status} */}
                                                        </div>


                                                    </td>
                                                    <td style={{ width: '135px', textAlign: 'center', padding: '5px', paddingTop: '20px' }}>

                                                        <div style={{ border: '2px solid green', color: 'green', backgroundColor: 'white', width: '100%', padding: '2px', fontWeight: '700' }}>
                                                            {/* {i?.milestone_status} */}
                                                            Completed
                                                        </div>

                                                    </td>
                                                    <td style={{ textAlign: 'center', padding: '5px', paddingTop: '20px' }}>
                                                        1000
                                                    </td>
                                                    <td style={{ textAlign: 'center', padding: '5px', paddingTop: '20px', width: '100px' }}>
                                                        <div style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                                                            <div className="" style={{ textAlign: 'center' }}>
                                                                <button className="btn btn-primary submit-btn-milestone" onClick={() => showPopup()}>Withdrawn</button>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>







var mainMileStone = []
for (var i = 0; i < data?.data?.getFundraise?.milestones.length; i++) {
    if (data?.data?.getFundraise?.milestones[i].target_date != '' && data?.data?.getFundraise?.milestones[i].target_date != undefined) {

        // if(data?.data?.getFundraise?.milestones[i].target_date )
        var mileStoneDate = data?.data?.getFundraise?.milestones[i].target_date
        mileStoneDate = mileStoneDate.split('T')[0]
        console.log(mileStoneDate, "mileStoneDate");

        mainMileStone.push({

            "choose": "set_MileStone",
            "target_date": mileStoneDate,
            "milestone": data?.data?.getFundraise?.milestones[i].milestone,
            "percentage": data?.data?.getFundraise?.milestones[i].percentage,

            validation_status: data?.data?.getFundraise?.milestones[i].validation_status,
            milestone_status: data?.data?.getFundraise?.milestones[i].milestone_status,
            funds: data?.data?.getFundraise?.milestones[i].funds,
            remarks: data?.data?.getFundraise?.milestones[i].remarks,
            estimated_target_date: data?.data?.getFundraise?.milestones[i].estimated_target_date
            // ...data?.data?.getFundraise?.milestones[i]
        }
        )
    } else {
        mainMileStone.push({

            "choose": "set_MileStone",
            "target_date": '',
            "milestone": data?.data?.getFundraise?.milestones[i].milestone,
            "percentage": data?.data?.getFundraise?.milestones[i].percentage,

            validation_status: data?.data?.getFundraise?.milestones[i].validation_status,
            milestone_status: data?.data?.getFundraise?.milestones[i].milestone_status,
            funds: data?.data?.getFundraise?.milestones[i].funds,
            remarks: data?.data?.getFundraise?.milestones[i].remarks,
            estimated_target_date: data?.data?.getFundraise?.milestones[i].estimated_target_date
            // ...data?.data?.getFundraise?.milestones[i]
        }
        )
    }


    console.log(mainMileStone, "MileStoneArrayDataMileStoneArrayData");



}










var mainMileStone = []
for (var i = 0; i < data?.data?.getFundraise?.milestones.length; i++) {
    var mileStoneDate = ''
    if (data?.data?.getFundraise?.milestones[i].target_date != '' && data?.data?.getFundraise?.milestones[i].target_date != undefined) {

        // if(data?.data?.getFundraise?.milestones[i].target_date )
        mileStoneDate = data?.data?.getFundraise?.milestones[i].target_date
        mileStoneDate = mileStoneDate.split('T')[0]
        console.log(mileStoneDate, "mileStoneDate");

    } else {
        mileStoneDate = ''
    }


    mainMileStone.push({

        "choose": "set_MileStone",
        "target_date": mileStoneDate,
        "milestone": data?.data?.getFundraise?.milestones[i].milestone,
        "percentage": data?.data?.getFundraise?.milestones[i].percentage,
        validation_status: data?.data?.getFundraise?.milestones[i].validation_status,
        milestone_status: data?.data?.getFundraise?.milestones[i].milestone_status,
        funds: data?.data?.getFundraise?.milestones[i].funds,
        remarks: data?.data?.getFundraise?.milestones[i].remarks,
        estimated_target_date: data?.data?.getFundraise?.milestones[i].estimated_target_date
        // ...data?.data?.getFundraise?.milestones[i]
    }
    )


}
// setMileStoneArrayData(mainMileStone)
// dispatch()
(dispatch(MileStonePrivateArray((mainMileStone))))




var mainMileStone = []
for (var i = 0; i < data?.data?.getFundraise?.milestones.length; i++) {
    var mileStoneDate = ''
    if (data?.data?.getFundraise?.milestones[i].target_date != '' && data?.data?.getFundraise?.milestones[i].target_date != undefined) {

        // if(data?.data?.getFundraise?.milestones[i].target_date )
        mileStoneDate = data?.data?.getFundraise?.milestones[i].target_date
        mileStoneDate = mileStoneDate.split('T')[0]
        console.log(mileStoneDate, "mileStoneDate");

    } else {
        mileStoneDate = ''
    }


    mainMileStone.push({

        "choose": "set_MileStone",
        "target_date": mileStoneDate,
        "milestone": data?.data?.getFundraise?.milestones[i].milestone,
        "percentage": data?.data?.getFundraise?.milestones[i].percentage,
        validation_status: data?.data?.getFundraise?.milestones[i].validation_status,
        milestone_status: data?.data?.getFundraise?.milestones[i].milestone_status,
        funds: data?.data?.getFundraise?.milestones[i].funds,
        remarks: data?.data?.getFundraise?.milestones[i].remarks,
        estimated_target_date: data?.data?.getFundraise?.milestones[i].estimated_target_date
        // ...data?.data?.getFundraise?.milestones[i]
    }
    )


}
// setMileStoneArrayData(mainMileStone)
// dispatch()
(dispatch(MileStonePrivateArray((mainMileStone))))



 // <Link to={DocsArray[0]?.file.name} target="_blank" download>
                                            // DownloadDocsArray[0]?.file.name
                                            // /Link> 
                                            DocsArray.map((main) => (
                                                
                                                <div onClick={() => opennewWindowForDoc(URL.createObjectURL(DocsArray[0].file))}>
                                                 {/* {main}   {uploadDocModal[0]?.filename}{main?.file.name} */}
                                                 {/* {(URL.createObjectURL( */}
                                                    {main.file}dddd
                                                    {/* // ))} */}
                                                 {/* {main?.file.name} */}
                                                </div>
                                                ))
                                                // </div>





















                                                <div className=" col-md-2 col-sm-2 col-lg-2 col-xl-2" style={{ flex: '0 0 20%', maxWidth: '20%', padding: '5px' }}>
                                                <div className="dash-wid" style={{ minHeight: '75px', padding: '5px' }}>
                                                    <div className="card-body" style={{ textAlign: 'left', padding: "10px" }}>
                            
                                                        <div className="widget-info-new">
                                                            {/* 112 */}
                                                            <h3 className="mainFontH5" style={{ marginBottom: '0px', fontFamily: "'Poppins', sans-serif ", fontSize: "25px", color: "#6345ED" }}>
                            
                            
                                                                <CountUp end={2500000}
                                                                    duration={1.5}
                                                                    separator=","
                                                                    prefix='$'
                                                                />
                            
                                                            </h3>
                            
                            
                                                        </div>
                                                        <span className="widget-box">Public Rounds</span>
                                                    </div>
                            
                                                    {/* <h3 className="mainFontH4">Info from budget page</h3> */}
                                                </div>
                                            </div>






<div className=" col-md-2 col-sm-2 col-lg-2 col-xl-2" style={{ flex: '0 0 20%', maxWidth: '20%', padding: '5px' }}>
<div className="dash-wid" style={{ minHeight: '75px', padding: '5px' }}>
    <div className="card-body" style={{ textAlign: 'left', padding: "10px" }}>

        <div className="widget-info-new">
            {/* 112 */}
            <h3 className="mainFontH5" style={{ marginBottom: '0px', fontFamily: "'Poppins', sans-serif ", fontSize: "25px", color: "#6345ED" }}>

                <CountUp end={2500000}
                    duration={1.5}
                    separator=","
                    prefix='$'
                />

            </h3>


        </div>
        <span className="widget-box">Private Rounds</span>
    </div>

    {/* <h3 className="mainFontH4">Info from budget page</h3> */}
</div>
</div>





<div className=" col-md-2 col-sm-2 col-lg-2 col-xl-2" style={{ flex: '0 0 20%', maxWidth: '20%', padding: '5px' }}>
<div className="dash-wid" style={{ minHeight: '75px', padding: '5px' }}>
    <div className="card-body" style={{ textAlign: 'left', padding: "10px" }}>

        <div className="widget-info-new">
            {/* 112 */}
            <h3 className="mainFontH5" style={{ marginBottom: '0px', fontFamily: "'Poppins', sans-serif ", fontSize: "25px", color: "#6345ED" }}>


                <CountUp end={2500000}
                    duration={1.5}
                    separator=","
                    prefix='$'
                />
            </h3>


        </div>
        <span className="widget-box">Amount in Escrow</span>
    </div>

    {/* <h3 className="mainFontH4">Info from budget page</h3> */}
</div>
</div>



<div className=" col-md-2 col-sm-2 col-lg-2 col-xl-2" style={{ flex: '0 0 20%', maxWidth: '20%', padding: '5px' }}>
<div className="dash-wid" style={{ minHeight: '75px', padding: '5px' }}>
    <div className="card-body" style={{ textAlign: 'left', padding: "10px" }}>

        <div className="widget-info-new">
            {/* 112 */}
            <h3 className="mainFontH5" style={{ marginBottom: '0px', fontFamily: "'Poppins', sans-serif ", fontSize: "25px", color: "#6345ED" }}>


                Sharma

            </h3>


        </div>
        <span className="widget-box">Lead Investor</span>
    </div>

    {/* <h3 className="mainFontH4">Info from budget page</h3> */}
</div>
</div>




<div className=" col-md-2 col-sm-2 col-lg-2 col-xl-2" style={{ flex: '0 0 20%', maxWidth: '20%', padding: '5px' }}>
<div className="dash-wid" style={{ minHeight: '75px', padding: '5px' }}>
    <div className="card-body" style={{ textAlign: 'left', padding: "10px" }}>

        <div className="widget-info-new">
            {/* 112 */}
            <h3 className="mainFontH5" style={{ marginBottom: '0px', fontFamily: "'Poppins', sans-serif ", fontSize: "25px", color: "#6345ED" }}>

                <CountUp end={5}
                    duration={1.5}
                    separator=","
                // prefix='$'
                />


            </h3>


        </div>
        <span className="widget-box">No of Private Investors</span>
    </div>

    {/* <h3 className="mainFontH4">Info from budget page</h3> */}
</div>
</div>



<div className=" col-md-2 col-sm-2 col-lg-2 col-xl-2" style={{ flex: '0 0 20%', maxWidth: '20%', padding: '5px' }}>
<div className="dash-wid" style={{ minHeight: '75px', padding: '5px' }}>
    <div className="card-body" style={{ textAlign: 'left', padding: "10px" }}>

        <div className="widget-info-new">
            {/* 112 */}
            <h3 className="mainFontH5" style={{ marginBottom: '0px', fontFamily: "'Poppins', sans-serif ", fontSize: "25px", color: "#6345ED" }}>

                <CountUp end={2121}
                    duration={1.5}
                    separator=','
                />


            </h3>


        </div>
        <span className="widget-box">No of Public Investors</span>
    </div>

    {/* <h3 className="mainFontH4">Info from budget page</h3> */}
</div>
</div>



<div className=" col-md-2 col-sm-2 col-lg-2 col-xl-2" style={{ flex: '0 0 20%', maxWidth: '20%', padding: '5px' }}>
<div className="dash-wid" style={{ minHeight: '75px', padding: '5px' }}>
    <div className="card-body" style={{ textAlign: 'left', padding: "10px" }}>

        <div className="widget-info-new">
            {/* 112 */}
            <h3 className="mainFontH5" style={{ marginBottom: '0px', fontFamily: "'Poppins', sans-serif ", fontSize: "25px", color: "#6345ED" }}>

                <CountUp end={3}
                    duration={1.5}
                    separator=','
                />


            </h3>


        </div>
        <span className="widget-box">Completed Rounds</span>
    </div>

</div>
</div>



<div className=" col-md-2 col-sm-2 col-lg-2 col-xl-2" style={{ flex: '0 0 20%', maxWidth: '20%', padding: '5px' }}>
<div className="dash-wid" style={{ minHeight: '75px', padding: '5px' }}>
    <div className="card-body" style={{ textAlign: 'left', padding: "10px" }}>

        <div className="widget-info-new">
             <h3 className="mainFontH5" style={{ marginBottom: '0px', fontFamily: "'Poppins', sans-serif ", fontSize: "25px", color: "#6345ED" }}>

              

                <CountUp end={1000000}
                    duration={1.5}
                    separator=","
                    prefix='$'
                />

            </h3>


        </div>
        <span className="widget-box">Escrow Unlocked</span>
    </div>

    {/* <h3 className="mainFontH4">Info from budget page</h3> */}
</div>
</div>




<div className=" col-md-2 col-sm-2 col-lg-2 col-xl-2" style={{ flex: '0 0 20%', maxWidth: '20%', padding: '5px' }}>
<div className="dash-wid" style={{ minHeight: '75px', padding: '5px' }}>
    <div className="card-body" style={{ textAlign: 'left', padding: "10px" }}>

        <div className="widget-info-new">
            {/* 112 */}
            <h3 className="mainFontH5" style={{ marginBottom: '0px', fontFamily: "'Poppins', sans-serif ", fontSize: "25px", color: "#6345ED" }}>

                <CountUp end={3}
                    duration={1.5}
                    separator=','
                />


            </h3>


        </div>
        <span className="widget-box">Rejected Private Rounds</span>
    </div>

    {/* <h3 className="mainFontH4">Info from budget page</h3> */}
</div>
</div>





{/* 
            <div className="row">

                <div className="col-md-12" style={{ padding: '5px' }}>


                    <div className="row align-items-center" style={{ width: '100%', margin: '0px' }}>
                        <div className="col" style={{ padding: '0px' }}>
                            <div className="search mb-2">

                                <h3 className="card-title mb-0" style={{ padding: '10px 0px 0px', paddingBottom: '0px' }}>Funding Rounds</h3>
                            </div>
                        </div>

                    </div>
                </div>
            </div> */
            



            const editDraftData = (text) => {
                try {
                    console.log(text, "text");
                    // var target_date = text?.target_date
        
        
                    if (text?.round == 'Private') {
        
                        var milestoneMaindata = []
                        // if (text?.milestones?.length > 0) {
                            // for (var i = 0; i < text?.milestones?.length; i++) {
        
                                // var dateTag = ''
                                // if (text?.milestones[i].target_date) {
                                //     dateTag = text?.milestones[i].target_date.split("T")[0]
                                // } else {
                                //     dateTag = ''
                                // }
                                // milestoneMaindata.push({
                                //     choose: "set_MileStone",
                                //     milestone: text.milestones[i].milestone,
                                //     target_date: dateTag,
                                //     percentage: text.milestones[i].percentage,
        
                                //     validation_status: text.milestones[i].validation_status,
                                //     milestone_status: text.milestones[i].milestone_status,
                                //     funds: text.milestones[i].funds,
                                //     remarks: text.milestones[i].remarks,
                                //     estimated_target_date: text.milestones[i].estimated_target_date
                                // })
                        //     }
                        // } else {
                        //     milestoneMaindata = []
                        // }
        
        
                        setShiftBtwPrivPub("Edit_Private")
                        // dispatch(MileStonePrivateArray(
                            // target_date,
                        //     milestoneMaindata
                        // ))
                    } else {
        
        
                        var milestoneMaindataPublic = []
                        if (text?.milestones?.length > 0) {
                            for (var i = 0; i < text?.milestones?.length; i++) {
        
                                var dateTag = ''
                                if (text?.milestones[i].target_date) {
                                    dateTag = text?.milestones[i].target_date.split("T")[0]
                                } else {
                                    dateTag = ''
                                }
                                milestoneMaindataPublic.push({
                                    choose: "set_MileStone",
                                    milestone: text.milestones[i].milestone,
                                    // placeHolder:'MileStone1',
                                    target_date: dateTag,
                                    percentage: text.milestones[i].percentage,
                                })
                            }
                        } else {
                            milestoneMaindataPublic = []
                        }
        
        
        
                        dispatch(MileStoneArray(
                            milestoneMaindataPublic
                        ))
                        setShiftBtwPrivPub("Edit_Public")
                    }
                    handleShow(text?.currency)
                    // 
                    setPublicId(text._id)
                } catch (error) {
        
                }
            }