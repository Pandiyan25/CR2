import React, { useEffect, useMemo, useState } from 'react'
import OverallRatings from './OverallRatings'
import RatingRemarks from './RatingRemarks'
import RatingReview from './RatingReview'
import './rating.css'
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption
} from 'reactstrap';
import { useSelector } from 'react-redux'
import { apiURI } from '../../../../config/config'
import Pagination from '../../../../Entryfile/Pagination'

const RatingsPage = () => {

    const [OverallRatingData, setOverallRatingData] = useState([])
    const [currentPageClosedDeals, setCurrentPageClosedDeals] = useState(1);
    const [allRatingsData, setAllRatingData] = useState([])
    const projectIdData = useSelector((state) => state.constVar.projectId)
    const getRatingDetailsFunc = () => {
        try {

            var query =
                `
                query AllProjectRating($project: ID) {
                    allProjectRating(project: $project) {
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
                      revenue_rating_remarks
                      idea_rating_remarks
                      team_rating_remarks
                      tokenomics_rating_remarks
                      product_experience_rating_remarks
                      community_rating_remarks
                      valuation_rating_remarks
                      avgRating
                    }
                    ProjectOverAllRating(project: $project) {
                      overall_rating
                      validator_rating
                      investor_rating
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
                        // "user": loginId
                    }
                })
            })
                .then((response) => {

                    const json = response.json();
                    return json;
                })
                .then(data => {
                    if (data?.data?.allProjectRating != null && data?.data?.allProjectRating != undefined && data?.data?.allProjectRating.length > 0) {
                        setAllRatingData(data?.data?.allProjectRating)
                    } else {
                        setAllRatingData([])
                    }

                    if (data?.data?.ProjectOverAllRating != null && data?.data?.ProjectOverAllRating != undefined) {
                        setOverallRatingData([data?.data?.ProjectOverAllRating])
                    } else {
                        setOverallRatingData([])
                    }
                });

        } catch (error) {
            console.log(error, "ProjectGetFunctionError  in Dashboard in investors error");
        }

    }

    useEffect(() => {
        getRatingDetailsFunc()
    }, [])


    let PageSizeClosedDeals = 1;
    const currentTableDataClosedDeals = useMemo(() => {
        const firstPageIndex = (currentPageClosedDeals - 1) * PageSizeClosedDeals;
        const lastPageIndex = firstPageIndex + PageSizeClosedDeals;
        var data = []
        data = allRatingsData
        console.log(allRatingsData, "projectDetailsData in live");
        console.log(data, "data in live");
        if (data.length > 0) {

            return data.slice(firstPageIndex, lastPageIndex);
        } else {

            return data = [];
        }
    }, [currentPageClosedDeals, allRatingsData]);


    const onNext = () => {
        setCurrentPageClosedDeals(currentPageClosedDeals + 1);
    };


    const onPrevious = () => {
        setCurrentPageClosedDeals(currentPageClosedDeals - 1);
    };

    console.log(currentTableDataClosedDeals, "currentTableDataClosedDeals");
    return (
        <div>
            <div className='mainDivPie' style={{ width: '430px', marginTop: '20px' }}>
                <OverallRatings text={'Overall Score'} value={
                    OverallRatingData?.length > 0 && OverallRatingData[0]?.overall_rating != null && OverallRatingData[0]?.overall_rating != undefined ?
                        OverallRatingData[0]?.overall_rating
                        :
                        0
                } />
                <OverallRatings text={`Guardian Score`} value={
                    OverallRatingData?.length > 0 && OverallRatingData[0]?.validator_rating != null && OverallRatingData[0]?.validator_rating != undefined ?
                        OverallRatingData[0]?.validator_rating : 0} />
                <OverallRatings text={'Investor Score'} value={

                    OverallRatingData?.length > 0 && OverallRatingData[0]?.investor_rating != null && OverallRatingData[0]?.investor_rating != undefined ?
                        OverallRatingData[0]?.investor_rating : 0} />
            </div>
            {
                currentTableDataClosedDeals?.length > 0
                    ? 
                    currentTableDataClosedDeals?.map((i) => (
                        < div className='borderRating'>
                            <div className='rateingMainsub'>
                                <OverallRatings text={'Overall Score'} value={i?.avgRating ? i.avgRating : 0}/>
                                <RatingReview type={currentTableDataClosedDeals?.length > 0 ? currentTableDataClosedDeals[0].user_role : ''} />
                                <div className='flex__Btn'>
                                    {currentPageClosedDeals == 1 ?

                                        <div>
                                            <button className='btn__curssol_notallowes' style={{ cursor: 'not-allowed' }} >{"<"}</button>
                                        </div>
                                        :

                                        <div>
                                            <button className='btn__curssol' onClick={() => onPrevious()}>{"<"}</button>
                                        </div>
                                    }
                                    {/* {currentPageClosedDeals} */}
                                    {
                                        currentPageClosedDeals == allRatingsData.length ?
                                            <div>
                                                <button className='btn__curssol_notallowes' style={{ cursor: 'not-allowed' }} >{">"}</button>
                                            </div>
                                            :

                                            <div>
                                                <button className='btn__curssol' onClick={() => onNext()}>{">"}</button>
                                            </div>
                                    }
                                    {/* <Pagination
                                        className="pagination-bar"
                                        currentPage={currentPageClosedDeals}
                                        totalCount={allRatingsData.length}
                                        pageSize={PageSizeClosedDeals}
                                        onPageChange={page => setCurrentPageClosedDeals(page)}
                                    /> */}
                                </div>
                            </div>

                            <div>
                                <h4 className='ratingsCaps'>Rating</h4>
                                <RatingRemarks text={'Idea & market validation'} value={i?.idea_rating != null && i?.idea_rating != undefined ? i?.idea_rating : 0} show={true}
                                    remarks={i?.idea_rating != null && i?.idea_rating != undefined ? i?.revenue_rating_remarks : ''} />

                                <RatingRemarks text={'Revenue Model'} value={i?.revenue_rating != null && i?.revenue_rating != undefined ? i?.revenue_rating : 0} show={true}
                                    remarks={i?.idea_rating_remarks != null && i?.idea_rating_remarks != undefined ? i?.idea_rating_remarks : ''} />

                                <RatingRemarks text={'Team'} value={i?.team_rating != null && i?.team_rating != undefined ? i?.team_rating : 0} show={true}
                                    remarks={i?.team_rating_remarks != null && i?.team_rating_remarks != undefined ? i?.team_rating_remarks : ''} />

                                <RatingRemarks text={'Tokenomics'} value={i?.tokenomics_rating != null && i?.tokenomics_rating != undefined ? i?.tokenomics_rating : 0} show={true}
                                    remarks={i?.tokenomics_rating_remarks != null && i?.tokenomics_rating_remarks != undefined ? i?.tokenomics_rating_remarks : ''} />

                                <RatingRemarks text={'Product Experience'} value={i?.product_experience_rating != null && i?.product_experience_rating != undefined ? i?.product_experience_rating : 0} show={true}
                                    remarks={i?.product_experience_rating_remarks != null && i?.product_experience_rating_remarks != undefined ? i?.product_experience_rating_remarks : ''} />

                                <RatingRemarks text={'Community'} value={i?.community_rating != null && i?.community_rating != undefined ? i?.community_rating : 0} show={true}
                                    remarks={i?.community_rating_remarks != null && i?.community_rating_remarks != undefined ? i?.community_rating_remarks : ''} />

                                <RatingRemarks text={'Valution'} value={i?.valuation_rating != null && i?.valuation_rating != undefined ? i?.valuation_rating : 0} show={true}
                                    remarks={i?.valuation_rating_remarks != null && i?.valuation_rating_remarks != undefined ? i?.valuation_rating_remarks : ''} />
                                <RatingRemarks text={'Overall Viability'} value={0} show={false}
                                    remarks={i?.remarks != null && i?.remarks != undefined ? i?.remarks : ''} />


                            </div>

                        </div>
                    ))

                    :
                    <div className='borderRating'>
                        <div className='rateingMainsub'>
                            <div className='row' style={{margin:"0px",width:"100%"}}>
                                <div className='col-3'>
                                <OverallRatings text={'Overall Score'} value={0} />
                                </div>
                                <div className='col-6'>
                                {/* <RatingReview /> */}
                                </div>

                            </div>
                            
                          
                            <div className='flex__Btn'>
                                <div>  
                                    <button className='btn__curssol'>{"<"}</button>
                                </div>
                                <div>
                                    <button className='btn__curssol'>{">"}</button>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4 className='ratingsCaps'>No Ratings Yet</h4>
                            {/* <RatingRemarks text={'Idea & market validation'} value={0} show={true}
                                remarks={''} />

                            <RatingRemarks text={'Revenue Model'} value={0} show={true}
                                remarks={''} />

                            <RatingRemarks text={'Team'} value={0} show={true}
                                remarks={''} />

                            <RatingRemarks text={'Tokenomics'} value={0} show={true}
                                remarks={''} />

                            <RatingRemarks text={'Product Experience'} value={0} show={true}
                                remarks={''} />

                            <RatingRemarks text={'Community'} value={0} show={true}
                                remarks={''} />

                            <RatingRemarks text={'Valution'} value={0} show={true}
                                remarks={''} />
                            <RatingRemarks text={'Overall Viability'} value={0} show={false}
                                remarks={''} /> */}


                        </div>

                    </div>
            }

        </div >
    )
}

export default RatingsPage