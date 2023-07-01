<button className="btn btn-primary submit-btn"
style={{
    minWidth: '44px',
    fontSize: '30px',
    padding: '5px',
    height: '35px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bolder',
    marginRight: '10px',
    marginLeft: '20px'
}} onClick={() => dleteColumnMileStone(index)}>-</button>
{/* </div>
<div className="" style={{ textAlign: 'center', marginRight: '15px' }}> */}
<button className="btn btn-primary submit-btn" style={{
minWidth: '44px',
fontSize: '30px',
padding: '5px',
height: '35px',
display: 'flex',
alignItems: 'center',
justifyContent: 'center',
fontWeight: 'bolder'
}} onClick={() => addColumnMileStone(index)}>+</button>











var mainMileStone = []
for (var i = 0; i < data?.data?.getFundraise?.milestones.length; i++) {
    if (data?.data?.getFundraise?.milestones[i].target_date != '' && data?.data?.getFundraise?.milestones[i].target_date != undefined) {

        // if(data?.data?.getFundraise?.milestones[i].target_date )
        var mileStoneDate = data?.data?.getFundraise?.milestones[i].target_date
        mileStoneDate = mileStoneDate.split('T')[0]
        console.log(mileStoneDate, "mileStoneDate");
        mainMileStone.push({

            "choose": "set_MileStone",
            "TargetDate": mileStoneDate,
            "ValueForChoose": data?.data?.getFundraise?.milestones[i].milestone,
            "percentage": data?.data?.getFundraise?.milestones[i].percentage
            // ...data?.data?.getFundraise?.milestones[i]
        })

    } else {
        mainMileStone.push({

            "choose": "set_MileStone",
            "TargetDate": '',
            "ValueForChoose": data?.data?.getFundraise?.milestones[i].milestone,
            "percentage": data?.data?.getFundraise?.milestones[i].percentage
            // ...data?.data?.getFundraise?.milestones[i]
        })
    }




    console.log(mainMileStone, "mainMileStone");

}
(dispatch(MileStoneInvestorPrivateArray((mainMileStone))))




for (var i = 0; i < data?.data?.getFundraise?.milestones?.length; i++) {
    if (data?.data?.getFundraise?.milestones[i].target_date != '' && data?.data?.getFundraise?.milestones[i].target_date != undefined) {

        // if(data?.data?.getFundraise?.milestones[i].target_date )
        var mileStoneDate = data?.data?.getFundraise?.milestones[i].target_date
        mileStoneDate = mileStoneDate.split('T')[0]
        console.log(mileStoneDate, "mileStoneDate");
        mainMileStone.push({

            "choose": "set_MileStone",
            "TargetDate": mileStoneDate,
            "ValueForChoose": data?.data?.getFundraise?.milestones[i].milestone,
            "percentage": data?.data?.getFundraise?.milestones[i].percentage
            // ...data?.data?.getFundraise?.milestones[i]
        })

    } else {
        mainMileStone.push({

            "choose": "set_MileStone",
            "TargetDate": '',
            "ValueForChoose": data?.data?.getFundraise?.milestones[i].milestone,
            "percentage": data?.data?.getFundraise?.milestones[i].percentage
            // ...data?.data?.getFundraise?.milestones[i]
        })
    }




    console.log(mainMileStone, "mainMileStone");

}
(dispatch(MileStoneInvestorPrivateArray((mainMileStone))))





<div className="col-md-12" style={{ padding: '0px' }}>


<div className="row align-items-center" style={{ width: '100%', margin: '0px' }}>
    <div className="col" style={{ padding: '0px' }}>
        <div className="search mt-2 mb-2">
            <input
                placeholder="Search"
                style={{ width: '300px', borderRadius: '2px', border: '2px solid #e1dfdf', boxShadow: 'rgb(196, 200, 208) 0px 2px 11px' }}
            //   value={value}
            //   onChange={e => setValue(e.target.value)}
            />
        </div>
    </div>
    <div className="col-auto float-right ml-auto mb-2" style={{ padding: '0px' }}>
        <button className="btn add-btn2" style={{ margin: '10px', borderRadius: '2px', marginBottom: '0px', marginRight: '0px' }} onClick={() => setToPrivateFunc()} >+ PRIVATE ROUND</button>
        {/* <button className="btn add-btn2" style={{ margin: '10px', borderRadius: '2px', marginBottom: '0px', marginRight: '0px' }} onClick={() => setToPublicFunc()} >+ CREATE PUBLIC ROUND</button> */}
    </div>
</div>
</div>