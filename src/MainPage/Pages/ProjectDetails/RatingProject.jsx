import React, { useState, useEffect } from "react";
import 'material-react-toastify/dist/ReactToastify.css';
import { Button, Modal, } from "react-bootstrap";

import { useSelector, useDispatch } from 'react-redux';
import "./pd.css"
import Rating from "react-rating";
import { fetchProjectDetails, searchAllProjectDataRemove, selectAllProjectDetails } from "../../../reducers/ProjectDetailsSlice";
import { apiURI } from "../../../config/config";
import { ToastContainer, toast } from 'material-react-toastify';

import 'material-react-toastify/dist/ReactToastify.css';


function RatingProject({ handleClose, show, role ,setRateProject}) {








    const [OverallVisRemarks, setOverallVisRemarks] = useState('')
    const [TeamRemarks, setTeamRemarks] = useState('')
    const [RevenueRemarks, setRevenueRemarks] = useState('')
    const [ProductExpRemarks, setProductExpRemarks] = useState('')
    const [TokenomicsRemarks, setTokenomicsRemarks] = useState('')
    const [ComunityRemarks, setComunityRemarks] = useState('')
    const [ValuationRemarks, setValuationRemarks] = useState('')
    const [IdeaValidation, setIdeaValidation] = useState('')
    const [ratingId, setratingId] = useState('')
    const [ValuationRating, setValuationRating] = useState(0)
    const [idealRating, setidealRating] = useState(0)
    const [revenueRating, setRevenueRating] = useState(0)
    const [teamRating, setTeamRating] = useState(0)
    const [tokenomicsRating, setTokenomicsRating] = useState(0)
    const [ProExpRating, setProExpRating] = useState(0)
    const [CommunityRating, setCommunityRating] = useState(0)
    const [userRole, setuserRole] = useState('')
    const [ratescore,setratescore]=useState("")

    const [foundValue, setFoundValue] = useState(false)
    const dispatch = useDispatch()
    const [valueNum, setValueNum] = useState([])
    const loginId = useSelector((state) => state.constVar.loginId)
    const projectDataDetails = useSelector(selectAllProjectDetails)
    const [Remarks, setRemarks] = useState('')
    const projectIdData = useSelector((state) => state.constVar.projectId)

    useEffect(() => {
        // if (projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0].rating.length > 0) {

        getRatingDetailsFunc()

        //   }
        // }


    }, [projectDataDetails])

    const getRatingDetailsFunc = () => {
        try {

            var query =
                `
                query AllProjectRating($project: ID, $user: ID) {
                    allProjectRating(project: $project, user: $user) {
                      user_role
                      idea_rating
                      revenue_rating
                      team_rating
                      tokenomics_rating
                      product_experience_rating
                      community_rating
                      valuation_rating
                      remarks
                      user {
                        role
                      }
                      _id
                      idea_rating_remarks
                      revenue_rating_remarks
                      team_rating_remarks
                      tokenomics_rating_remarks
                      product_experience_rating_remarks
                      community_rating_remarks
                      valuation_rating_remarks
                    }
                    getUser(_id: $user) {
                      role
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
                        "project": projectIdData,
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
                    console.log('ProjectGetFunctiondata', data?.data?.allProjectRating);
                    if (data?.data?.allProjectRating != null && data?.data?.allProjectRating != undefined) {
                        if (data?.data?.allProjectRating.length > 0) {
                            setFoundValue(true)
                            setRateProject(true)
                            
                        } else {
                            setRateProject(false)
                            setFoundValue(false)
                        }
                        // numLogFunc(data?.data?.allProjectRating)
                        if (data?.data?.allProjectRating.length > 0 && data?.data?.allProjectRating[0]?.idea_rating != null && data?.data?.allProjectRating[0]?.idea_rating != undefined) {
                            console.log("hey ")
                            setratescore(data?.data?.allProjectRating[0]?.idea_rating)

                            // if(data?.data?.allProjectRating[0]?.idea_rating == 2 ){
                            //    setratescore("2") 
                            // }
                            // else if(data?.data?.allProjectRating[0]?.idea_rating == 4 ){
                            //     setratescore("4") 
                            //  }
                            //  else if(data?.data?.allProjectRating[0]?.idea_rating == 6 ){
                            //     setratescore("6") 
                            //  }
                            //  else if(data?.data?.allProjectRating[0]?.idea_rating == 8 ){
                            //     setratescore("8") 
                            //  }
                            //  else if(data?.data?.allProjectRating[0]?.idea_rating == 10 ){
                            //     setratescore("10") 
                            //  }



                        } else {
                            setratescore(0)
                            console.log("hey hey")
                        }
                        if (data?.data?.allProjectRating.length > 0 && data?.data?.allProjectRating[0]?.revenue_rating != null && data?.data?.allProjectRating[0]?.revenue_rating != undefined) {
                            setRevenueRating(data?.data?.allProjectRating[0]?.revenue_rating)
                            console.log('ddrat', data?.data?.allProjectRating[0]?.revenue_rating);

                        } else {
                            setRevenueRating(0)
                        }
                        if (data?.data?.allProjectRating.length > 0 && data?.data?.allProjectRating[0]?.team_rating != null && data?.data?.allProjectRating[0]?.team_rating != undefined) {
                            setTeamRating(data?.data?.allProjectRating[0]?.team_rating)
                            console.log('ddrat', data?.data?.allProjectRating[0]?.team_rating);
                        } else {
                            setTeamRating(0)
                        }
                        if (data?.data?.allProjectRating.length > 0 && data?.data?.allProjectRating[0]?.tokenomics_rating != null && data?.data?.allProjectRating[0]?.tokenomics_rating != undefined) {
                            setTokenomicsRating(data?.data?.allProjectRating[0]?.tokenomics_rating)
                            console.log('ddrat', data?.data?.allProjectRating[0]?.tokenomics_rating);
                        } else {
                            setTokenomicsRating(0)
                        }
                        if (data?.data?.allProjectRating.length > 0 && data?.data?.allProjectRating[0]?.product_experience_rating != null && data?.data?.allProjectRating[0]?.product_experience_rating != undefined) {
                            setProExpRating(data?.data?.allProjectRating[0]?.product_experience_rating)
                            console.log('ddrat', data?.data?.allProjectRating[0]?.product_experience_rating);
                        } else {
                            setProExpRating(0)
                        }
                        if (data?.data?.allProjectRating.length > 0 && data?.data?.allProjectRating[0]?.community_rating != null && data?.data?.allProjectRating[0]?.community_rating != undefined) {
                            setCommunityRating(data?.data?.allProjectRating[0]?.community_rating)
                            console.log('ddrat', data?.data?.allProjectRating[0]?.community_rating);
                        } else {
                            setCommunityRating(0)
                        }
                        if (data?.data?.allProjectRating.length > 0 && data?.data?.allProjectRating[0]?.valuation_rating != null && data?.data?.allProjectRating[0]?.valuation_rating != undefined) {
                            setValuationRating(data?.data?.allProjectRating[0]?.valuation_rating)
                            console.log('ddrat', data?.data?.allProjectRating[0]?.valuation_rating);
                        } else {
                            setValuationRating(0)
                        }
                        setTeamRemarks(data?.data?.allProjectRating[0]?.team_rating_remarks)
                        setProductExpRemarks(data?.data?.allProjectRating[0]?.product_experience_rating_remarks)
                        setComunityRemarks(data?.data?.allProjectRating[0]?.community_rating_remarks)
                        setRevenueRemarks(data?.data?.allProjectRating[0]?.revenue_rating_remarks)
                        setValuationRemarks(data?.data?.allProjectRating[0]?.valuation_rating_remarks)
                        setIdeaValidation(data?.data?.allProjectRating[0]?.idea_rating_remarks)
                        setTokenomicsRemarks(data?.data?.allProjectRating[0]?.tokenomics_rating_remarks)
                        setOverallVisRemarks(data?.data?.allProjectRating[0]?.remarks)
                        setratingId(data?.data?.allProjectRating[0]?._id)
                        //  console.log();
                    } else {
                        // setValueNum([])
                    }
                    if (data?.data?.getUser != null && data?.data?.getUser != undefined) {
                        // numLogFunc(data?.data?.allProjectRating)

                        //  console.log();
                        setuserRole(data?.data?.getUser?.role)
                    } else {
                        // setValueNum([])
                    }
                });

        } catch (error) {
            console.log(error, "ProjectGetFunctionError  in Dashboard in investors error");
        }

    }

    const createRatingFunc = () => {
        try {
            let idealRatingValue = 0
            if (idealRating != null && idealRating != undefined) {
                idealRatingValue = idealRating
            } else {
                idealRatingValue = 0
            }
            let revenueRatingValue = 0
            if (revenueRating != null && revenueRating != undefined) {
                revenueRatingValue = revenueRating
            } else {
                revenueRatingValue = 0
            }
            let TeamRatingValue = 0
            if (teamRating != null && teamRating != undefined) {
                TeamRatingValue = teamRating
            } else {
                TeamRatingValue = 0
            }
            let tokenomicsRatingValue = 0
            if (tokenomicsRating != null && tokenomicsRating != undefined) {
                tokenomicsRatingValue = tokenomicsRating
            } else {
                tokenomicsRatingValue = 0
            }

            let ProExpRatingValue = 0
            if (ProExpRating != null && ProExpRating != undefined) {
                ProExpRatingValue = ProExpRating
            } else {
                ProExpRatingValue = 0
            }
            let CommunityValue = 0
            if (CommunityRating != null && CommunityRating != undefined) {
                CommunityValue = CommunityRating
            } else {
                CommunityValue = 0
            }
            let ValuationValue = 0
            if (ValuationRating != null && ValuationRating != undefined) {
                ValuationValue = ValuationRating
            } else {
                ValuationValue = 0
            }
            let ratescorevalue = 0
// if(ratescore == "2")
// {
//     ratescorevalue =2.0;
// }
// else if(ratescore == "4")
// {
//     ratescorevalue =4.0;
// }
// else if (ratescore == "6")
// {
//     ratescorevalue =6.0;
// }
// else if (ratescore == "8")
// {
//     ratescorevalue =8.0;
// }
// else if (ratescore == "10")
// {
//     ratescorevalue =10.0;
// }


            var query =
                `
                mutation CreateProjectRating($input: RatingInput) {
                    createProjectRating(input: $input) {
                      idea_rating
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
                    variables:
                    //  {
                    //     "id": projectDataDetails[0]._id
                    // }

                    // "input": {
                    //     "project": projectIdData,
                    //     "user": loginId,
                    //     "idea_rating": idealRatingValue,
                    //       "user_role": userRole,
                    //     "revenue_rating": revenueRatingValue,
                    //     "team_rating": TeamRatingValue,
                    //     "tokenomics_rating": revenueRatingValue,
                    //     "product_experience_rating": ProExpRatingValue,
                    //     "community_rating": CommunityValue,
                    //     "valuation_rating": ValuationValue
                    // }


                    {
                        "input": {
                            "project": projectIdData,
                            "user": loginId,
                            "user_role": userRole,
                            "idea_rating": ratescore ,
                            "idea_rating_remarks": IdeaValidation,
                            "revenue_rating_remarks": RevenueRemarks,
                            "revenue_rating": revenueRatingValue,
                            "team_rating_remarks": TeamRemarks,
                            "team_rating": TeamRatingValue,
                            "tokenomics_rating": tokenomicsRating,
                            "tokenomics_rating_remarks": TokenomicsRemarks,
                            "product_experience_rating": ProExpRatingValue,
                            "product_experience_rating_remarks": ProductExpRemarks,
                            "community_rating": CommunityValue,
                            "community_rating_remarks": ComunityRemarks,
                            "valuation_rating": ValuationValue,
                            "valuation_rating_remarks": ValuationRemarks,
                            "remarks": OverallVisRemarks,
                        }
                    }

                })
            })
                .then((response) => {

                    const json = response.json();
                    return json;
                })
                .then(data => {
                    if (data?.data?.createProjectRating != null && data?.data?.createProjectRating != undefined) {
                        // data?.data?.getProject.rating
                        getRatingDetailsFunc()
                        handleClose()
                    }
                });

        } catch (error) {
            console.log(error, "ProjectGetFunctionError  in Dashboard in investors error");
        }

    }

    const updateRatingFunc = () => {
        try {
            let idealRatingValue = 0
            if (idealRating != null && idealRating != undefined) {
                idealRatingValue = idealRating
            } else {
                idealRatingValue = 0
            }
            let revenueRatingValue = 0
            if (revenueRating != null && revenueRating != undefined) {
                revenueRatingValue = revenueRating
            } else {
                revenueRatingValue = 0
            }
            let TeamRatingValue = 0
            if (teamRating != null && teamRating != undefined) {
                TeamRatingValue = teamRating
            } else {
                TeamRatingValue = 0
            }
            let tokenomicsRatingValue = 0
            if (tokenomicsRating != null && tokenomicsRating != undefined) {
                tokenomicsRatingValue = tokenomicsRating
            } else {
                tokenomicsRatingValue = 0
            }

            let ProExpRatingValue = 0
            if (ProExpRating != null && ProExpRating != undefined) {
                ProExpRatingValue = ProExpRating
            } else {
                ProExpRatingValue = 0
            }
            let CommunityValue = 0
            if (CommunityRating != null && CommunityRating != undefined) {
                CommunityValue = CommunityRating
            } else {
                CommunityValue = 0
            }
            let ValuationValue = 0
            if (ValuationRating != null && ValuationRating != undefined) {
                ValuationValue = ValuationRating
            } else {
                ValuationValue = 0
            }
            // let ratescorevalue = 0

            // if(ratescore == "2")
            // {
            //     ratescorevalue =2.0;
            // }
            // else if(ratescore == "4")
            // {
            //     ratescorevalue =4.0;
            // }
            // else if (ratescore == "6")
            // {
            //     ratescorevalue =6.0;
            // }
            // else if (ratescore == "8")
            // {
            //     ratescorevalue =8.0;
            // }
            // else if (ratescore == "10")
            // {
            //     ratescorevalue =10.0;
            // }

            var query =
                `
                mutation UpdateProjectRating($input: RatingInput, $id: ID) {
                    updateProjectRating(input: $input, _id: $id) {
                      idea_rating
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
                    variables:
                    //  {
                    //     "id": projectDataDetails[0]._id
                    // }
                    {
                        "id": ratingId,

                        "input": {
                            "project": projectIdData,
                            "user": loginId,
                            "user_role": userRole,
                            "idea_rating": ratescore,
                            "idea_rating_remarks": IdeaValidation,
                            "revenue_rating_remarks": RevenueRemarks,
                            "revenue_rating": revenueRatingValue,
                            "team_rating_remarks": TeamRemarks,
                            "team_rating": TeamRatingValue,
                            "tokenomics_rating": tokenomicsRating,
                            "tokenomics_rating_remarks": TokenomicsRemarks,
                            "product_experience_rating": ProExpRatingValue,
                            "product_experience_rating_remarks": ProductExpRemarks,
                            "community_rating": CommunityValue,
                            "community_rating_remarks": ComunityRemarks,
                            "valuation_rating": ValuationValue,
                            "valuation_rating_remarks": ValuationRemarks,
                            "remarks": OverallVisRemarks
                        }


                    }
                })
            })
                .then((response) => {

                    const json = response.json();
                    return json;
                })
                .then(data => {
                    if (data?.data?.updateProjectRating != null && data?.data?.updateProjectRating != undefined) {
                        getRatingDetailsFunc()
                        handleClose()
                    }
                });

        } catch (error) {
            console.log(error, "ProjectGetFunctionError  in Dashboard in investors error");
        }

    }

    console.log(revenueRating, "revenueRating");
    // const handleRateChange = (e) => {
    //     console.log(e);
    //     setratescore(e);
    // }

    return (
        <>


            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size="lg"
            >
                <Modal.Header closeButton style={{ borderBottom: '0px' }}>
                    <Modal.Title><h2>Rating</h2></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>

                        <h3
                            style={{ marginBottom: '15px' }}>{"Idea & Market Validation"}</h3>

                     

                        <div className="row mb-2">
                            <div className="col-12">

                                {/* <div style={{display:"flex",width:"100%"}}>
                                    <form onChange={(e)=> handleRateChange(e.target.value)} >
                                    <input  type="radio" value="2" checked={ratescore === "2" }/>&nbsp;&nbsp;&nbsp; Rework this buddy !! &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <input  type="radio" value="4" checked={ratescore === "4" }/>&nbsp;&nbsp;&nbsp; Kind of Okay &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <input type="radio" value="6" checked={ratescore === "6" }/>&nbsp;&nbsp;&nbsp; 50-50 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <input type="radio" value="8" checked={ratescore === "8" }/>&nbsp;&nbsp;&nbsp; cool &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <input type="radio" value="10"  checked={ratescore === "10" }/>&nbsp;&nbsp;&nbsp; super Cool &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    </form>

                                </div> */}
                                   <Rating
                            stop={10}
                            style={{ color: 'red', marginBottom: '15px' }}
                            // emptySymbol="fa fa-star-o fa-mx"
                            // fullSymbol="fa fa-star fa-mx"
                            emptySymbol={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n =>
                                n == 10 ?

                                    <span className="icon-text-on10">{n}</span>
                                    :

                                    <span className="icon-text-on">{n}</span>
                            )}
                            fullSymbol={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n =>
                                n == 10 ?

                                    <span className="icon-text10">{n}</span>
                                    :

                                    <span className="icon-text">{n}</span>


                            )}

                            onChange={(rate) => setratescore(rate)}
                            // readonly={true}
                            initialRating={ratescore ? ratescore : 0}
                        />

                            </div>
                            <div className="form-group col-8">

<textarea className="form-control" style={{ minHeight: '70px' }}
    // defaultValue={valueNum.length > 0 ? valueNum[0]?.remarks : ''}
    defaultValue={IdeaValidation}
    onChange={(e) => setIdeaValidation(e.target.value)}
// onChange={(e) => changeRemarksratingFunc(e.target.value)} 
placeholder="feel free to add comments"/>
</div>

                        </div>

        
                    </div>
                    <div>

                        <h3
                            style={{ marginBottom: '15px' }}>{"Revenue Model"}</h3>

                        <Rating
                            stop={10}
                            style={{ color: 'red', marginBottom: '15px' }}
                            // emptySymbol="fa fa-star-o fa-mx"
                            // fullSymbol="fa fa-star fa-mx"
                            emptySymbol={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n =>
                                n == 10 ?

                                    <span className="icon-text-on10">{n}</span>
                                    :

                                    <span className="icon-text-on">{n}</span>
                            )}
                            fullSymbol={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n =>
                                n == 10 ?

                                    <span className="icon-text10">{n}</span>
                                    :

                                    <span className="icon-text">{n}</span>


                            )}
                            onChange={(rate) => setRevenueRating(rate)}
                            // readonly={true}
                            initialRating={revenueRating ? revenueRating : 0}
                        // initialRating={valueNum.length > 0 ? valueNum[0]?.market_validation : 0}
                        />

                        <div className="form-group">

                            <textarea className="form-control" style={{ minHeight: '100px' }}
                                // defaultValue={valueNum.length > 0 ? valueNum[0]?.remarks : ''}

                                // onChange={(e) => changeRemarksratingFunc(e.target.value)}
                                defaultValue={RevenueRemarks}
                                onChange={(e) => setRevenueRemarks(e.target.value)} />
                        </div>
                    </div>
                    <div>
                        <h3
                            style={{ marginBottom: '15px' }}>{"Team"}</h3>

                        <Rating
                            stop={10}
                            style={{ color: 'red', marginBottom: '15px' }}
                            // emptySymbol="fa fa-star-o fa-mx"
                            // fullSymbol="fa fa-star fa-mx"
                            emptySymbol={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n =>
                                n == 10 ?

                                    <span className="icon-text-on10">{n}</span>
                                    :

                                    <span className="icon-text-on">{n}</span>
                            )}
                            fullSymbol={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n =>
                                n == 10 ?

                                    <span className="icon-text10">{n}</span>
                                    :

                                    <span className="icon-text">{n}</span>


                            )}
                            onChange={(rate) => setTeamRating(rate)}
                            // readonly={true}
                            initialRating={teamRating ? teamRating : 0}
                        />

                        <div className="form-group">

                            <textarea className="form-control" style={{ minHeight: '100px' }}
                                defaultValue={TeamRemarks}

                                // onChange={(e) => changeRemarksratingFunc(e.target.value)} />

                                onChange={(e) => setTeamRemarks(e.target.value)} />
                        </div>
                    </div>
                    <div>

                        <h3
                            style={{ marginBottom: '15px' }}>{"Tokenomics"}</h3>

                        <Rating
                            stop={10}
                            style={{ color: 'red', marginBottom: '15px' }}
                            // emptySymbol="fa fa-star-o fa-mx"
                            // fullSymbol="fa fa-star fa-mx"
                            emptySymbol={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n =>
                                n == 10 ?

                                    <span className="icon-text-on10">{n}</span>
                                    :

                                    <span className="icon-text-on">{n}</span>
                            )}
                            fullSymbol={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n =>
                                n == 10 ?

                                    <span className="icon-text10">{n}</span>
                                    :

                                    <span className="icon-text">{n}</span>


                            )}
                            onChange={(rate) => setTokenomicsRating(rate)}
                            // readonly={true}
                            initialRating={tokenomicsRating ? tokenomicsRating : 0}
                        />

                        <div className="form-group">

                            <textarea className="form-control" style={{ minHeight: '100px' }}
                                // defaultValue={valueNum.length > 0 ? valueNum[0]?.remarks : ''}
                                defaultValue={TokenomicsRemarks}
                                onChange={(e) => setTokenomicsRemarks(e.target.value)} />
                            {/* onChange={(e) => changeRemarksratingFunc(e.target.value)} /> */}
                        </div>

                        {/* 
                        <div className="form-group">
                            
                            <textarea className="form-control" style={{ minHeight: '220px' }}
                                // defaultValue={valueNum.length > 0 ? valueNum[0]?.remarks : ''}

                                onChange={(e) => changeRemarksratingFunc(e.target.value)} />
                        </div> */}
                    </div>

                    <div>

                        <h3
                            style={{ marginBottom: '15px' }}>{"Product Experience"}</h3>

                        <Rating
                            stop={10}
                            style={{ color: 'red', marginBottom: '15px' }}
                            // emptySymbol="fa fa-star-o fa-mx"
                            // fullSymbol="fa fa-star fa-mx"
                            emptySymbol={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n =>
                                n == 10 ?

                                    <span className="icon-text-on10">{n}</span>
                                    :

                                    <span className="icon-text-on">{n}</span>
                            )}
                            fullSymbol={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n =>
                                n == 10 ?

                                    <span className="icon-text10">{n}</span>
                                    :

                                    <span className="icon-text">{n}</span>


                            )}
                            onChange={(rate) => setProExpRating(rate)}
                            // readonly={true}
                            initialRating={ProExpRating ? ProExpRating : 0}
                        />

                        <div className="form-group">

                            <textarea className="form-control" style={{ minHeight: '100px' }}
                                // defaultValue={valueNum.length > 0 ? valueNum[0]?.remarks : ''}
                                defaultValue={ProductExpRemarks}
                                onChange={(e) => setProductExpRemarks(e.target.value)} />
                            {/* // onChange={(e) => changeRemarksratingFunc(e.target.value)} /> */}
                        </div>
                    </div>

                    <div>

                        <h3
                            style={{ marginBottom: '15px' }}>{"Community"}</h3>

                        <Rating
                            stop={10}
                            style={{ color: 'red', marginBottom: '15px' }}
                            // emptySymbol="fa fa-star-o fa-mx"
                            // fullSymbol="fa fa-star fa-mx"
                            emptySymbol={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n =>
                                n == 10 ?

                                    <span className="icon-text-on10">{n}</span>
                                    :

                                    <span className="icon-text-on">{n}</span>
                            )}
                            fullSymbol={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n =>
                                n == 10 ?

                                    <span className="icon-text10">{n}</span>
                                    :

                                    <span className="icon-text">{n}</span>


                            )}
                            onChange={(rate) => setCommunityRating(rate)}
                            // readonly={true}
                            initialRating={CommunityRating ? CommunityRating : 0}
                        />

                        <div className="form-group">

                            <textarea className="form-control" style={{ minHeight: '100px' }}
                                // defaultValue={valueNum.length > 0 ? valueNum[0]?.remarks : ''}
                                defaultValue={ComunityRemarks}
                                onChange={(e) => setComunityRemarks(e.target.value)} />
                        </div>
                    </div>



                    <div>

                        <h3
                            style={{ marginBottom: '15px' }}>{"Valution"}</h3>

                        <Rating
                            stop={10}
                            style={{ color: 'red', marginBottom: '15px' }}
                            // emptySymbol="fa fa-star-o fa-mx"
                            // fullSymbol="fa fa-star fa-mx"
                            emptySymbol={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n =>
                                n == 10 ?

                                    <span className="icon-text-on10">{n}</span>
                                    :

                                    <span className="icon-text-on">{n}</span>
                            )}
                            fullSymbol={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n =>
                                n == 10 ?

                                    <span className="icon-text10">{n}</span>
                                    :

                                    <span className="icon-text">{n}</span>


                            )}
                            onChange={(rate) => setValuationRating(rate)}
                            // readonly={true}
                            initialRating={ValuationRating ? ValuationRating : 0}
                        />

                        <div className="form-group">

                            <textarea className="form-control" style={{ minHeight: '100px' }}
                                // defaultValue={valueNum.length > 0 ? valueNum[0]?.remarks : ''}
                                defaultValue={ValuationRemarks}
                                onChange={(e) => setValuationRemarks(e.target.value)} />
                        </div>
                    </div>


                    <div>

                        <h3
                            style={{ marginBottom: '15px' }}>{"Overall Viability"}</h3>

                        <div className="form-group">

                            <textarea className="form-control" style={{ minHeight: '100px' }}
                                // defaultValue={valueNum.length > 0 ? valueNum[0]?.remarks : ''}
                                defaultValue={OverallVisRemarks}
                                onChange={(e) => setOverallVisRemarks(e.target.value)} />
                        </div>
                    </div>

                </Modal.Body>
                <Modal.Footer style={{ borderTop: '0px', justifyContent: 'end' }}>
                    <div className="submit-section">
                        {/* onClick={() => handleClose()} */}
                        <button className="btn  submit-btn" style={{ background: 'white', border: '1px solid #00c5fb', color: '#00c5fb' }} >Save Draft</button>
                    </div>


                    <div className="submit-section">
                        {foundValue == true ?

                            <button className="btn btn-primary submit-btn" onClick={() => updateRatingFunc()}>Update</button>
                            :

                            <button className="btn btn-primary submit-btn" onClick={() => createRatingFunc()}>Submit</button>
                        }
                    </div>


                </Modal.Footer>

                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </Modal>
        </>
    );
}
export default RatingProject;