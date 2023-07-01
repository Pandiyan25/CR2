import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link, useHistory } from "react-router-dom";
import {
  Avatar_19,
  Avatar_29,
  Avatar_07,
  Avatar_06,
  Avatar_14,
  Avatar_18,
  Avatar_28,
  Avatar_13,
} from "../../Entryfile/imagepath";
import "./req.css";
import "material-react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "material-react-toastify";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  fetchConnectReq,
  selectAllConnectRequest,
} from "../../reducers/ConnectReqSlice";
import { apiURI } from "../../config/config";
import { fetchRoadMapProjectDetails } from "../../reducers/RoadMapSlice";
import { fetchBudgetProjectDetails } from "../../reducers/BudgetSlice";
import { fetchProjectDetails } from "../../reducers/ProjectDetailsSlice";
import { projectId } from "../../reducers/ConstantSlice";
import { fetchFundingProjectDetails } from "../../reducers/FundingProjectSlice";
import { fetchTeamSize } from "../../reducers/TeamSizeSlice";
import { fetchTokenomicsDetails } from "../../reducers/TokenomicsSlice";
import { fetchSocialTeam } from "../../reducers/SocialPageSlice";
import { fetchBudgetBannerDetails } from "../../reducers/BugetBannerSlice";
const ClientsMain = () => {
  // useEffect( ()=>{
  //   if($('.select').length > 0) {
  //     $('.select').select2({
  //       minimumResultsForSearch: -1,
  //       width: '100%'
  //     });
  //   }
  // });
  const dispatch = useDispatch();
  const loginId = useSelector((state) => state.constVar.loginId);
  const getAllConnectRequest = useSelector(selectAllConnectRequest);
  console.log(getAllConnectRequest, "getAllConnectRequest in chat");
  let history = useHistory();

  const acceptRequest = (id, status) => {
    try {
      var query = `
                mutation UpdateConnectionRequest($input: ConnectionRequestInput, $id: ID) {
                    updateConnectionRequest(input: $input, _id: $id) {
                      _id
                    }
                  }
     `;
      fetch(apiURI.URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "x-power": process.env.POWER_KEY,
          "x-domain-agent": process.env.DOMAIN_AGENT,
          "x-strict-origin-name": process.env.ORIGIN_NAME,
          "x-range-name": process.env.RANGE_NAME,
        },
        body: JSON.stringify({
          query,
          variables: {
            input: {
              receiver_status: status,
            },
            id: id,
          },
        }),
      })
        .then((response) => {
          const json = response.json();
          return json;
        })
        .then((data) => {
          // debugger;
          //   console.log('ProjectGetFunctiondata', data?.data?.allProjects);
          if (
            data?.data?.updateConnectionRequest != null &&
            data?.data?.updateConnectionRequest != undefined
          ) {
            if (status == "Rejected") {
              successfullRejectedfunc();
            } else {
              successfulladdedfunc();
            }
            dispatch(fetchConnectReq(loginId));
            
            //  console.log();
          }
        });
    } catch (error) {
      console.log(
        error,
        "ProjectGetFunctionError  in Dashboard in investors error"
      );
    }
  };

  const successfulladdedfunc = () => {
    toast.success("Accepted Successfully", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };
  const successfullRejectedfunc = () => {
    toast.warn("Rejected Successfully", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  useEffect(() => {
    if (loginId != "") {
      dispatch(fetchConnectReq(loginId));
    }
  }, [loginId]);

  const sendDatatoProjectPage = (i) => {
    dispatch(fetchRoadMapProjectDetails(i));
    dispatch(fetchBudgetProjectDetails(i));
    dispatch(fetchProjectDetails(i));
    dispatch(projectId(i));
    dispatch(fetchFundingProjectDetails(i));
    dispatch(fetchTeamSize(i));
    dispatch(fetchTokenomicsDetails(i));
    dispatch(fetchSocialTeam(i));
    dispatch(fetchBudgetBannerDetails(i));
    history.push("/detail-projects");
  };
  console.log(getAllConnectRequest, "getAllConnectRequest");

  return (
    <div className="page-wrapper" style={{ paddingTop: "60px" }}>
      {/* Page Content */}
      <div className="content container-fluid">
        {/* Page Header */}
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col">
              <h3 className="page-title">Connect Requests</h3>
            </div>
          </div>
        </div>
        {/* Search Filter */}
        <div className="row staff-grid-row">
          {getAllConnectRequest?.length > 0 &&
            getAllConnectRequest[0].receivedRequest.length > 0 &&
            getAllConnectRequest[0].receivedRequest?.map((i) =>
              i.receiver.role == "Founder" ? (
                <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3">
                  <div className="profile-widget">
                    <div
                      className="profile-img"
                      style={{
                        height: "120px",
                        width: "120px",
                        border: "transparent",
                        background: "transparent",
                      }}
                    >
                      {/* <Link to="/ConnectRequest" className="avatar" style={{ minHeight: '120px', minWidth: '120px' }}><img alt="" src={i?.project?.logo} /></Link> */}
                      <Link
                        to="/ConnectRequest"
                        className="avatar"
                        style={{ height: "120px", width: "120px" }}
                      >
                        {i?.sender?.fund_logo != null &&
                        i?.sender?.fund_logo != undefined &&
                        i?.sender?.fund_logo != "" ? (
                          <img
                            alt=""
                            src={i?.sender?.fund_logo}
                            style={{
                              height: "120px",
                              width: "120px",
                              background: "white",
                              border: "2px solid gray",
                            }}
                          />
                        ) : (
                          <h3 className="img_not_updated">No Logo Updated</h3>
                        )}
                      </Link>
                    </div>
                    <div className="dropdown profile-action"></div>
                    <h4
                      className="user-name m-t-10 mb-0 text-ellipsis"
                      style={{ minHeight: "20px" }}
                    >
                      {i?.sender?.fund_name}
                    </h4>
                    <h5 className="user-name m-t-10 mb-0 text-ellipsis">
                      {i?.sender?.first_name}&nbsp;{i?.sender?.last_name}
                    </h5>
                    <Link
                      to="/ConnectRequest"
                      className="btn btn-ourwhite btn-sm m-t-10 mr-1"
                      style={{ minWidth: "85px" }}
                      onClick={() => acceptRequest(i?._id, "Accepted")}
                    >
                      Accept
                    </Link>
                    <Link
                      to="/ConnectRequest"
                      className="btn btn-ourwhite btn-sm m-t-10"
                      style={{ minWidth: "85px" }}
                      onClick={() => acceptRequest(i?._id, "Rejected")}
                    >
                      Reject{" "}
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3">
                  <div className="profile-widget">
                    <div
                      className="profile-img"
                      style={{
                        minHeight: "120px",
                        minWidth: "120px",
                        border: "transparent",
                        background: "transparent",
                      }}
                    >
                      <Link
                        to="/ConnectRequest"
                        className="avatar"
                        style={{ minHeight: "120px", minWidth: "120px" }}
                      >
                        {i?.project?.logo != null &&
                        i?.project?.logo != undefined &&
                        i?.project?.logo != "" ? (
                          <img
                            alt=""
                            src={i?.project?.logo}
                            style={{
                              height: "120px",
                              width: "120px",
                              background: "white",
                              border: "2px solid gray",
                            }}
                          />
                        ) : (
                          <h3 className="img_not_updated">No Logo Updated</h3>
                        )}
                      </Link>
                      {/* <Link to="/ConnectRequest" className="avatar" style={{ height: '120px', width: '120px' }}><img alt="" src={i?.sender?.fund_logo} style={{ height: '120px', width: '120px',background:'white' }} /></Link> */}
                    </div>
                    <div className="dropdown profile-action"></div>
                    {/* onClick={()=>openWindow(i?._id)} */}
                    <h4
                      className="user-name m-t-10 mb-0 text-ellipsis"
                      style={{ minHeight: "20px" }}
                      onClick={() => sendDatatoProjectPage(i?._id)}
                    >
                      {i?.project?.project_name}
                    </h4>
                    {/* <h4 className="user-name m-t-10 mb-0 text-ellipsis">{i?.sender?.fund_name}</h4> */}
                    <h5 className="user-name m-t-10 mb-0 text-ellipsis">
                      {i?.sender?.first_name}&nbsp;{i?.sender?.last_name}
                    </h5>
                    <Link
                      to="/ConnectRequest"
                      className="btn btn-ourwhite btn-sm m-t-10 mr-1"
                      style={{ minWidth: "85px" }}
                      onClick={() => acceptRequest(i?._id, "Accepted")}
                    >
                      Accept
                    </Link>
                    <Link
                      to="/ConnectRequest"
                      className="btn btn-ourwhite btn-sm m-t-10"
                      style={{ minWidth: "85px" }}
                      onClick={() => acceptRequest(i?._id, "Rejected")}
                    >
                      Reject{" "}
                    </Link>
                  </div>
                </div>
              )
            )}
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
};

export default ClientsMain;
