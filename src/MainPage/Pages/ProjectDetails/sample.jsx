
        <div className="card card-table">

        <div className="card-body" style={{ padding: '10px' }}>

            <div className="col-md-12" style={{ padding: '0px' }}>
                <div className="profile-view" style={{ margin: '10px' }}>


                    <h3 className="card-title">Profile</h3>
                    <div className="">
                        <table style={{ width: '100%' }}>
                            <tbody>
                                {/* <tr>
                                    <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%', padding: '10px 0px' }}>Project Address:</td>
                                    <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0].}</td>
                                </tr> */}
                                <tr>
                                    <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%', padding: '10px 0px' }}>Email ID:</td>
                                    <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0]?.email_id}</td>
                                </tr>
                                <tr>
                                    <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>First Name:</td>
                                    <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0]?.first_name}</td>
                                </tr>
                                <tr>
                                    <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Last Name:</td>
                                    <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0]?.last_name}</td>
                                </tr>
                                <tr>
                                    <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>LinkedIn Profile Link:</td>
                                    <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0]?.linkedin_profile_link}</td>
                                </tr>
                                <tr>
                                    <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Project Name:</td>
                                    <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0]?.project_name}</td>
                                </tr>
                                <tr>
                                    <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Project Description:</td>
                                    <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0]?.project_description}</td>
                                </tr>
                                <tr>
                                    <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Nature of Project:</td>
                                    <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0]?.nature_of_project}</td>
                                </tr>
                                <tr>
                                    <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Project Start Date:</td>
                                    <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0]?.project_start_date}</td>
                                </tr>
                                <tr>
                                    <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Project Tags:</td>
                                    <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0]?.project_tags}</td>
                                </tr>
                                <tr>
                                    <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Project Stage:</td>
                                    <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0]?.project_stage}</td>
                                </tr>
                                <tr>
                                    <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Website Link:</td>
                                    <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0]?.website_link}</td>
                                </tr>
                                <tr>
                                    <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>GitHub Repository:</td>
                                    <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0]?.github_repository}</td>
                                </tr>
                                <tr>
                                    <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Whitepaper:</td>
                                    <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0]?.whitepaper}</td>
                                </tr>
                                <tr>
                                    <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>One Pager Document:</td>
                                    <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0]?.one_pager_document}</td>
                                </tr>
                                <tr>
                                    <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Pitch Deck:</td>
                                    <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0]?.pitch_deck}</td>
                                </tr>

                                <tr>
                                    <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Number of Founders:</td>
                                    <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0]?.number_of_founders}</td>
                                </tr>

                                <tr>
                                    <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Team Size:</td>
                                    <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0]?.team_size}</td>
                                </tr>

                                <tr>
                                    <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Project End Date:</td>
                                    <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0]?.project_end_date}</td>
                                </tr>
                                {/* <tr>
                                    <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Total Fund Raise Target:</td>
                                    <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0]?.email_id}</td>
                                </tr> */}
                                <tr>
                                    <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Total Budget:</td>
                                    <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0]?.total_budget}</td>
                                </tr>

                                {/* <tr>
                                    <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Public Launch Price:</td>
                                    <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0]?.email_id}</td>
                                </tr> */}
                                <tr>
                                    <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Validator Score:</td>
                                    <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0]?.validator_score}</td>
                                </tr>
                                <tr>
                                    <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Investor Score:</td>
                                    <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0]?.investor_score}</td>
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





const ratingFunc = (i) => {
    // console.log(i,"ratingFunc");

    var rating = [];
    if (projectDataDetails.length > 0) {
        console.log(projectDataDetails, "projectDataDetails");
        if (projectDataDetails[0].rating.length > 0) {

            var mainArrayRating = [];
            for (var main = 0; main < projectDataDetails[0].rating.length; main++) {
                mainArrayRating.push({

                    "user_role": projectDataDetails[0].rating[main].user_role,
                    "user_id": projectDataDetails[0].rating[main].user_id,

                    "market_validation": projectDataDetails[0].rating[main].market_validation,
                    "business_model": projectDataDetails[0].rating[main].business_model,
                    "team": projectDataDetails[0].rating[main].team,
                    "tokenomics": projectDataDetails[0].rating[main].tokenomics,
                    "remarks": projectDataDetails[0].rating[main].remarks
                })
            }


            const isFound = projectDataDetails[0].rating.some(element => {
                if (element.user_id === loginId) {
                    return true;
                }

                return false;
            });

            console.log(isFound, "===========isFound==========");

            if (isFound == true) {
                var mainarr = projectDataDetails[0].rating
                console.log(mainarr, "mainarr");
                var index = mainArrayRating.findIndex(i => {
                    return i.user_id === loginId;
                });
                console.log(index, "index");
                //   var indexSplice =  mainarr.splice(index,1);
                const indexSplice = mainArrayRating.filter((item) => item.user_id !== loginId);
                // var indexData = projectDataDetails[0].rating.filter((i => i.user_id == loginId));
                console.log(indexSplice, loginId, "indexData");
                var arr4 = [{

                    "market_validation": valueNum[0].market_validation,
                    "business_model": valueNum[0].business_model,
                    "team": valueNum[0].team,
                    "tokenomics": valueNum[0].tokenomics,
                    // "value": i,
                    "user_role": role,
                    "user_id": loginId,
                    "remarks": valueNum[0].remarks
                }]

                // const filteredPeople = people.filter((item) => item.id !== idToRemove);

                rating = indexSplice.concat(arr4);
            } else {
                var arr = mainArrayRating

                var arr2 = [{

                    "market_validation": valueNum[0].market_validation,
                    "business_model": valueNum[0].business_model,
                    "team": valueNum[0].team,
                    "tokenomics": valueNum[0].tokenomics,
                    "user_role": role,
                    "user_id": loginId,
                    "remarks": valueNum[0].remarks
                }]

                rating = arr.concat(arr2);

                console.log(rating, "arr3")
            }
        } else {
            rating.push({
                "market_validation": valueNum[0].market_validation,
                "business_model": valueNum[0].business_model,
                "team": valueNum[0].team,
                "tokenomics": valueNum[0].tokenomics,
                "user_role": role,
                "user_id": loginId,
                "remarks": valueNum[0].remarks
            })
        }


    } else {
        rating = []
    }

    updateRatingDetails(rating)


}


const changeRemarksratingFunc = (rate) => {

    let main = valueNum
    if (valueNum.length > 0) {
        main[0].remarks = rate
    } else {
        main.push({
            "remarks": rate
        })
    }
    setValueNum(main)
    console.log(main, rate, "ssss");
}



const updateRatingDetails = (i) => {
    try {

        var query =
            `
          mutation UpdateProject($id: ID, $input: ProjectInput) {
            updateProject(_id: $id, input: $input) {
                _id
              email_id
              first_name
              rating {
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
                    "id": projectIdData,
                    "input": {


                        "rating": i
                    }

                }
            })
        })
            .then((response) => {

                const json = response.json();
                return json;
            })
            .then(data => {
                // debugger;
                console.log('updateProjectdata', data);
                dispatch(fetchProjectDetails(''))
                if (data?.data?.updateProject != null && data?.data?.updateProject != undefined) {
                    console.log(data?.data?.updateProject._id, "updateProject Id");
                    dispatch(searchAllProjectDataRemove())
                    dispatch(fetchProjectDetails(data?.data?.updateProject._id))
                    toast.success("Your rating is updated successfully", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    });
                    setTimeout(() => {
                        // setValueNum([])
                        handleClose()
                    }, 3000);
                    // numLogFunc()
                }
            });

    } catch (error) {
        console.log(error, "ProjectGetFunctionError ");
    }
}

console.log(valueNum, "valueNumssss");


const changeBusinessFunc = (rate) => {

    let main = valueNum
    if (valueNum.length > 0) {
        main[0].business_model = rate
    } else {
        main.push({
            "business_model": rate
        })
    }
    setValueNum(main)
    console.log(main, rate, "ssss");
}
const changeTeamratingFunc = (rate) => {

    let main = valueNum
    if (valueNum.length > 0) {
        main[0].team = rate
    } else {
        main.push({
            "team": rate
        })
    }
    setValueNum(main)
    console.log(main, rate, "ssss");
}
const changeTokenomicsratingFunc = (rate) => {

    let main = valueNum
    if (valueNum.length > 0) {
        main[0].tokenomics = rate
    } else {
        main.push({
            "tokenomics": rate
        })
    }
    setValueNum(main)
    console.log(main, rate, "ssss");
}



const numLogFunc = (rate) => {
    console.log(rate, "rate");
    var arr = []
    // for (var i = 0; i < projectDataDetails[0].rating.length; i++) {
    var i = rate.findIndex(i => {
        return i.user_id === loginId;
    })
    const isFound = rate.some(element => {
        if (element.user_id === loginId) {
            return true;
        }

        return false;
    });
    if (isFound == true) {
        setFoundValue(true)
        console.log(rate[i], "rate[i].value");
        // setValueNum(rate[i].value)
        setValueNum([rate[i]])
    } else {
        setFoundValue(false)
        setValueNum([])
    }
}

const changeMarketValueFunc = (rate) => {

    let main = valueNum
    if (valueNum.length > 0) {
        main[0].market_validation = rate
    } else {
        main.push({
            "market_validation": rate
        })
    }
    setValueNum(main)
    console.log(main, rate, "ssss");
}