
import React, { useEffect } from 'react';
import { Helmet } from "react-helmet";
import { Link, useHistory } from 'react-router-dom';
import { Avatar_19, Avatar_29, Avatar_07, Avatar_06, Avatar_14, Avatar_18, Avatar_28, Avatar_13 } from "../../Entryfile/imagepath"
import './req.css'
import 'material-react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'material-react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { fetchConnectReq, selectAllConnectRequest } from '../../reducers/ConnectReqSlice';
import { apiURI } from '../../config/config';
import { fetchRoadMapProjectDetails } from '../../reducers/RoadMapSlice';
import { fetchBudgetProjectDetails } from '../../reducers/BudgetSlice';
import { fetchProjectDetails } from '../../reducers/ProjectDetailsSlice';
import { projectId } from '../../reducers/ConstantSlice';
import { fetchFundingProjectDetails } from '../../reducers/FundingProjectSlice';
import { fetchTeamSize } from '../../reducers/TeamSizeSlice';
import { fetchTokenomicsDetails } from '../../reducers/TokenomicsSlice';
import { fetchSocialTeam } from '../../reducers/SocialPageSlice';
import { fetchBudgetBannerDetails } from '../../reducers/BugetBannerSlice';
const RequestListPage = () => {

    // useEffect( ()=>{
    //   if($('.select').length > 0) {
    //     $('.select').select2({
    //       minimumResultsForSearch: -1,
    //       width: '100%'
    //     });
    //   }
    // });  

    const dispatch = useDispatch()
    const loginId = useSelector((state) => state.constVar.loginId)
    const getAllConnectRequest = useSelector(selectAllConnectRequest)
    let history = useHistory()

    useEffect(() => {
        if (loginId != '') {
            dispatch(fetchConnectReq(loginId))
        }

    }, [loginId])

    const successfulladdedfunc = () => {
        toast.error('Canceled Successfully', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });

    }
    const successfullResendedfunc = () => {
        toast.warn('Resended Successfully', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });

    }

    const acceptRequest = (id, status) => {
        try {

            var query =
                `
                mutation UpdateConnectionRequest($input: ConnectionRequestInput, $id: ID) {
                    updateConnectionRequest(input: $input, _id: $id) {
                      _id
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
                    {
                        "input": {
                            "sender_status": status
                        },
                        "id": id,
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
                    if (data?.data?.updateConnectionRequest != null && data?.data?.updateConnectionRequest != undefined) {

                        if (status == 'Cancelled') {
                            successfulladdedfunc()
                        } else {
                            successfullResendedfunc()
                        }
                        dispatch(fetchConnectReq(loginId))
                        //  console.log();
                    }

                });

        } catch (error) {
            console.log(error, "ProjectGetFunctionError  in Dashboard in investors error");
        }
    }

    const sendDatatoProjectPage = (i) => {
        dispatch(fetchRoadMapProjectDetails(i))
        dispatch(fetchBudgetProjectDetails(i))
        dispatch(fetchProjectDetails(i))
        dispatch(projectId(i))
        dispatch(fetchFundingProjectDetails(i))
        dispatch(fetchTeamSize(i))
        dispatch(fetchTokenomicsDetails(i))
        dispatch(fetchSocialTeam(i))
        dispatch(fetchBudgetBannerDetails(i))
        history.push('/detail-projects')
    }


    return (
        <div className="page-wrapper" style={{ paddingTop: '60px' }}>
            {/* Page Content */}
            <div className="content container-fluid">
                {/* Page Header */}
                <div className="page-header">
                    <div className="row align-items-center">
                        <div className="col">
                            <h3 className="page-title">Sent Requests</h3>
                        </div>
                    </div>
                </div>
                {/* Search Filter */}
                <div className="row staff-grid-row">

                    {getAllConnectRequest?.length > 0 && getAllConnectRequest[0].sendRequest.length > 0 && getAllConnectRequest[0].sendRequest?.map((i) => (
                        i?.receiver?.role == 'Founder' ?
                            <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3">
                                <div className="profile-widget" >
                                    <div className="profile-img" style={{ height: '120px', width: '120px' }}>
                                        <button className="avatar" style={{ height: '120px', width: '120px', border: 'transparent', background: "transparent" }} >
                                            {i?.project?.logo != null && i?.project?.logo != undefined && i?.project?.logo != '' ?

                                                <img alt="" src={i?.project?.logo} style={{ height: '110px', width: '110px', border: '2px solid gray' }} />
                                                :

                                                <h3 className='img_not_updated'>No Logo Updated</h3>
                                            }
                                        </button>
                                    </div>
                                    <div className="dropdown profile-action">
                                        {/* <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a> */}
                                        {/* <div className="dropdown-menu dropdown-menu-right">
<a className="dropdown-item" href="#" data-toggle="modal" data-target="#edit_client"><i className="fa fa-pencil m-r-5" /> Edit</a>
<a className="dropdown-item" href="#" data-toggle="modal" data-target="#delete_client"><i className="fa fa-trash-o m-r-5" /> Delete</a>
</div> */}
                                    </div>
                                    <h4 className="user-name m-t-10 mb-0 text-ellipsis" onClick={() => sendDatatoProjectPage(i?._id)} style={{ minHeight: '20px' }}>{i?.project?.project_name}</h4>
                                    <h5 className="user-name m-t-10 mb-0 text-ellipsis">{i?.receiver?.first_name}&nbsp;{i?.receiver?.last_name}</h5>
                                    {/* <div className="small text-muted">{i?.receiver?.fund_logo}</div> */}
                                    <button className="btn btn-ourwhite btn-sm m-t-10 mr-1" style={{ minWidth: '85px', border: "1px solid rgb(41, 122, 255)", color: "rgb(41, 122, 255)" }} onClick={() => acceptRequest(i?._id, "Cancelled")}>Cancel</button>
                                    <button className="btn btn-ourwhite btn-sm m-t-10" style={{ minWidth: '85px' }}
                                    // onClick={() => acceptRequest(i?._id,"Requested")}
                                    >Resend </button>
                                </div>
                            </div>

                            :

                            <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3">
                                <div className="profile-widget" >
                                    <div className="profile-img" style={{ height: '120px', width: '120px' }}>
                                        <button className="avatar" style={{ height: '120px', width: '120px', border: 'transparent', background: "transparent" }} >
                                            {i?.receiver?.fund_logo != null && i?.receiver?.fund_logo != undefined && i?.receiver?.fund_logo != '' ?
                                                <img alt="" src={i?.receiver?.fund_logo} style={{ height: '110px', width: '110px', border: '2px solid gray' }} />

                                                :

                                                <h3 className='img_not_updated'>No Logo Updated</h3>
                                            }

                                        </button>
                                    </div>
                                    <div className="dropdown profile-action">
                                        {/* <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a> */}
                                        {/* <div className="dropdown-menu dropdown-menu-right">
<a className="dropdown-item" href="#" data-toggle="modal" data-target="#edit_client"><i className="fa fa-pencil m-r-5" /> Edit</a>
<a className="dropdown-item" href="#" data-toggle="modal" data-target="#delete_client"><i className="fa fa-trash-o m-r-5" /> Delete</a>
</div> */}
                                    </div>
                                    {/* <h4 className="user-name m-t-10 mb-0 text-ellipsis" >{i?.project?.project_name}</h4> */}
                                    <h4 className="user-name m-t-10 mb-0 text-ellipsis" style={{ minHeight: '20px' }}>{i?.receiver?.fund_name}</h4>
                                    {/* <h4 className="user-name m-t-10 mb-0 text-ellipsis">{i?.receiver?.fund_name}</h4> */}
                                    <h5 className="user-name m-t-10 mb-0 text-ellipsis">{i?.receiver?.first_name}&nbsp;{i?.receiver?.last_name}</h5>
                                    {/* <div className="small text-muted">{i?.receiver?.fund_logo}</div> */}
                                    <button className="btn btn-ourwhite btn-sm m-t-10 mr-1" style={{ minWidth: '85px', border: "1px solid rgb(41, 122, 255)", color: "rgb(41, 122, 255)" }} onClick={() => acceptRequest(i?._id, "Cancelled")}>Cancel</button>
                                    <button className="btn btn-ourwhite btn-sm m-t-10" style={{ minWidth: '85px' }}
                                        onClick={() => successfullResendedfunc()}
                                    //  onClick={() => acceptRequest(i?._id,"Requested")}
                                    >Resend </button>
                                </div>
                            </div>
                        // to="/ConnectRequest"
                        // to="/ConnectRequest"
                        // to="/ConnectRequest"
                        // to="/ConnectRequest"
                        // to="/ConnectRequest"
                        // to="/ConnectRequest"
                    ))}
                </div>
            </div>
            {/* <div className="modal custom-modal fade" id="delete_client" role="dialog">
           <div className="modal-dialog modal-dialog-centered">
             <div className="modal-content">
               <div className="modal-body">
                 <div className="form-header">
                   <h3>Delete Client</h3>
                   <p>Are you sure want to delete?</p>
                 </div>
                 <div className="modal-btn delete-action">
                   <div className="row">
                     <div className="col-6">
                       <a href="" className="btn btn-primary continue-btn">Delete</a>
                     </div>
                     <div className="col-6">
                       <a href="" data-dismiss="modal" className="btn btn-primary cancel-btn">Cancel</a>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           </div>
         </div> */}
            {/* /Delete Client Modal */}


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
        </div>
    );
}

export default RequestListPage;
