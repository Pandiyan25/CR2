import React, { Component, useState, useEffect } from 'react';
import {
    Redirect, Route, Switch, BrowserRouter as Router,
    useLocation
} from 'react-router-dom';
import LoginPage from './loginpage'
import RegistrationPage from './RegistrationPage'
import ForgotPassword from './forgotpassword'
import guardian from "../assets/img/guardian.png"
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { Link } from 'react-router-dom';
import { setContext } from 'apollo-link-context';
import { HttpLink } from 'apollo-link-http';
import { apiURI } from '../config/config';
import { isMobile } from 'react-device-detect';
import "../initialpage/app.css"
import ProfilePage from '../MainPage/Pages/Profile';
import DashboardRoute from '../MainPage/Main/Dashboard';
import InviteRoute from '../MainPage/Invite';
import ProposalRoute from '../MainPage/Proposals';
import ProjectsRoute from '../MainPage/Projects';
import ResetPassword from './Sidebar/ResetPassword';
import ValidatorProfileMain from '../MainPage/Pages/validatorsProfile';
import ValidatorDashboardRoute from '../MainPage/Pages/validatorsNewDashboard';
import ValidatorsReward from '../MainPage/Pages/ValidatorsRewards/ValidatorsReward';
import ValidatorsRewardRoute from '../MainPage/Pages/ValidatorsRewards';
import ValidatorsProposalRoute from '../MainPage/Pages/ValidatorsProposal';
import FounderDashboardRoute from '../MainPage/Pages/FounderDashboard';
import Home from '../MainPage/Pages/FounderDashboard/home';
import FounderProjectRoute from '../MainPage/Pages/FounderProject';
import ProjectDataRoute from '../MainPage/Pages/ProjectDataPage';
import ExpenseDataRoute from '../MainPage/Pages/Pages/Expense';
import ProposalMainRoute from '../MainPage/Pages/Pages/Proposals';
import SettingsRoute from '../MainPage/Pages/Settings';
import SuperAdminDashboardRoute from '../MainPage/Pages/superAdmin/dashboard';
import projectDataPageRoute from '../MainPage/Pages/superAdmin/projectDataPage';
import SuperAdminValidatorsRoute from '../MainPage/Pages/superAdmin/Validators';
import SuperAdminFounderRoute from '../MainPage/Pages/superAdmin/Founders';
import SuperAdminInvestorsRoute from '../MainPage/Pages/superAdmin/Investors';
import DetailsProjectRoute from '../MainPage/Pages/ProjectDetails';
import InviteSuperAdminRoute from '../MainPage/Pages/superAdmin/Invite';
import SuperAdminProjectDetails from '../MainPage/Pages/ProjectDetails/SuperAdminProjectDetails';
import FounderSuperAdminRoute from '../MainPage/Pages/superAdmin/FoundersProfile';
import ValidatorProjectRoute from '../MainPage/Pages/superAdmin/Validators/ValidaatorProjectPage';
import FounderSearchProjectRoute from '../MainPage/Pages/superAdmin/Validators/FounderSearchProjectRoute';
import { createUploadLink } from 'apollo-upload-client'
import VestingRoute from '../MainPage/Pages/FounderProject/Vesting';
import VestingInvestorRoute from '../MainPage/Pages/Pages/Vesting1';
import { env } from 'process';
import UnderConstructionRoute from '../MainPage/Pages/FounderProject/UnderConstructionPage';
import ResetPasswordRoute from '../MainPage/Pages/FounderProject/ResetPassword';
import chatlayout from './Sidebar/chatlayout';
import UnderConstructionInvestorRoute from '../MainPage/Pages/FounderProject/UnderConstructionPage/investorUnderConstruction';
import UnderConstructionValidatorRoute from '../MainPage/Pages/FounderProject/UnderConstructionPage/underConstructionValidator';
import FounderFundRaiseRoute from '../MainPage/Pages/FounderProject/Fundraise';
import InestorFundRaiseRoute from '../MainPage/Projects/InvestorFundraise';
import Clients from '../MainPage/Employees/clients';
import ClientChartLayout from './Sidebar/ClientChartLayout';
import SendRequestLayout from './Sidebar/SendRequestLayout';
import ValidatorsRequestsRoute from '../MainPage/Pages/ValidatorsRequest';
import { withOneTabEnforcer } from 'react-one-tab-enforcer';
import ConfirmPageComp from './ConfirmPageComp';
import InvestorProfileViewRoute from '../MainPage/Pages/Profile/InvestorProfileViewOther';
import Idealist from '../MainPage/Pages/Ideas/Idealist';
import Ideareview from '../MainPage/Pages/Ideas/Ideareview';
import Subscription from '../MainPage/Pages/Ideas/subscription';
import Cookies from 'js-cookie';
import { loginId, subscriptionData } from '../reducers/ConstantSlice';
import { useSelector, useDispatch } from 'react-redux';
import Onboarding from '../MainPage/Pages/onboarding/onboarding';
// import Ideacreatenewmodal from '../MainPage/Pages/Ideas/ideacreatenewmodal';

const App = (props) => {





    const dispatch = useDispatch();
    let location = useLocation();
    const [changeLogin, setChangeLogin] = useState(false)
    const [founder, setFounder] = useState(false)
    const [validator, setValidator] = useState(false)
    const [investor, setInvestor] = useState(false)
    const [PopUp, setPopUp] = useState(true)
    // (sessionStorage.getItem("lock")?.length > 0 ? true : false
    const [authenticated, setAuthenticated] = useState(true);
    const [superadmin, setsuperadmin] = useState(localStorage.getItem("superadmin")?.length > 0 ? true : false);
    const { match, user } = props;
    const [firstlogin, setfirstlogin] = useState(false);
    const [plans, setplans] = useState("myplans");
    const [profileToggle, setprofileToggle] = useState(false)
    // console.log(location, match, "location, match");
    // console.log(match, " match");
    // console.log(location, " location");
    // console.log(founder, " founder");
    // console.log(validator, " validator");
    // console.log(investor, " investor");
    // console.log(process.env, "env");
    // console.log(process.env.NODE_ENV, " NODE_ENV");

    // console.log(process.env.FOUNDER_SYMBOL, " FOUNDER_SYMBOL");
    // console.log(process.env.STABLE_COIN_ADDRESS, " STABLE_COIN_ADDRESS");
    // console.log(process.env.STABLE_COIN_SYMBOL, " STABLE_COIN_SYMBOL");
    // console.log(process.env.PROJECT_AND_PROPOSAL_CONTRACT_ADDRESS, " PROJECT_AND_PROPOSAL_CONTRACT_ADDRESS");
    // console.log(process.env.FOUNDER_CONTRACT_ADDRESS, " FOUNDER_CONTRACT_ADDRESS");
    // console.log(process.env.FACTORY_CONTRACT_ADDRESS, " FACTORY_CONTRACT_ADDRESS");
    // console.log(process.env.VESTING_CONTRACT_ADDRESS, " VESTING_CONTRACT_ADDRESS");







    // const link = new HttpLink({
    //     uri: apiURI.URL
    // })

    const link = createUploadLink({
        uri: apiURI.URL,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'x-power': process.env.POWER_KEY,
            'x-domain-agent': process.env.DOMAIN_AGENT,
            'x-strict-origin-name': process.env.ORIGIN_NAME,
            'x-range-name': process.env.RANGE_NAME

        },
    });


    const cache = new InMemoryCache();


    const authLink = setContext((_, { headers }) => {
        return {
            headers: {
                ...headers
            }
        };
    });
    const client = new ApolloClient({
        link: authLink.concat(link),
        cache,
        resolvers: {},
        connectToDevTools: true
    });
    useEffect(() => {

        console.log("is mobile", isMobile)
    }, [])

    // if (isMobile) {
    //     return (
    //         <div className='mobilescreen'>
    //             <div style={{ width: "80%", margin: "60% auto", textAlign: 'center' }}>
    //                 <img style={{ width: "80%", marginBottom: "40px" }} src={guardian} ></img>
    //                 <h2>Guardian is Available only for desktop version, Mobile version is under construction !!</h2>
    //             </div>
    //         </div>
    //     )
    // }
    // else {
    {
        useEffect(() => {
            if (Cookies.getJSON('session') === undefined) {
                console.log("cookies not defined")
            }
            else {
                let loginIdCookies = Cookies.getJSON('session').userId;
                if (loginIdCookies != undefined) {
                    dispatch(loginId(loginIdCookies));
                    console.log("cookies available")
                }
                else {
                    Cookies.set('session', { userId: "", role: '' });
                    console.log("first login")
                }
            }


        }, [])


        var userrole;
        if (Cookies.getJSON('session') == undefined) {
            console.log("value undefined")
            userrole = "";
        }
        else {
            userrole = Cookies.getJSON('session').role;
        }

        const location = useLocation();
        const requestedPath = location.pathname;
        console.log(requestedPath,)

console.log(firstlogin,"first login state")

        return (


            <ApolloProvider client={client}>
                <Router>

                    <Switch>
                    <Route path="/Idealist"  ><Idealist plans={plans} setplans={setplans} profileToggle={profileToggle} setprofileToggle={setprofileToggle} /></Route>
                        <Route exact path="/login" >
                            <LoginPage setInvestor={setInvestor} setFounder={setFounder} setValidator={setValidator} setsuperadmin={setsuperadmin} setfirstlogin={setfirstlogin} />
                        </Route>
                        {/* <Route exact path="/lockscreen" component={LockScreen} /> */}
                        <Route exact path="/forgotpassword" >
                            <ForgotPassword />
                        </Route>
                        <Route exact path="/register" >
                            <RegistrationPage setInvestor={setInvestor} setFounder={setFounder} setValidator={setValidator} setsuperadmin={setsuperadmin} />
                        </Route>
                        <Route exact path="/resetPassword" >
                            <ResetPassword />
                        </Route>

                        {/* <Route path="/onboarding" >
                            <Onboarding ></Onboarding>
                        </Route> */}



                        <Route exact path="/verify" >
                            <ConfirmPageComp />
                        </Route>


                        {

                            authenticated == true && (founder == true || userrole == "Founder") ?

                                <>



                                    <Route path="/home">
                                        {
                                           firstlogin ?
                                                <Redirect to={`/onboarding`} />
                                                :
                                                <Home />
                                        }
                                    </Route>
                                    <Route exact path="/">
                                        {
                                            authenticated ?
                                                <Redirect to={`/home`} />
                                                :
                                                <Redirect to={`/login`} />
                                        }
                                    </Route>
                                    <Route path="/dashboard"  ><FounderDashboardRoute PopUp={PopUp} setPopUp={setPopUp} /></Route>
                                    <Route path="/Profile" component={FounderProjectRoute} />
                                    <Route path="/Project" component={ProjectDataRoute} />
                                    <Route path="/expenseManagement" component={ExpenseDataRoute} />
                                    <Route path="/proposals" component={ProposalMainRoute} />
                                    <Route path='/settings' component={SettingsRoute} />
                                    <Route path='/Vesting' component={VestingRoute} />
                                    <Route path='/detail-projects' component={FounderSearchProjectRoute} />
                                    <Route path='/mile-stone' component={UnderConstructionRoute} />
                                    <Route path='/tasks' component={UnderConstructionRoute} />
                                    <Route path='/Support' component={UnderConstructionRoute} />
                                    {/* chatlayout */}
                                    <Route path='/conversation' component={chatlayout} />
                                    <Route path='/FundRaise' component={FounderFundRaiseRoute} />
                                    <Route path='/More' component={UnderConstructionRoute} />
                                    <Route path='/ConnectRequest' component={ClientChartLayout} />
                                    <Route path='/SentRequest' component={SendRequestLayout} />
                                    {/* <Route path='/resetPassword' component={ResetPasswordRoute} /> */}
                                    <Route path='/InvestorDetails' component={InvestorProfileViewRoute} />
                                    
                                    {/* <Route path='/Idealist' component={Idealist} /> */}
                                    <Route path="/Ideareview"  ><Ideareview plans={plans} setplans={setplans} /></Route>
                                  
                                    <Route path="/subscription"  ><Subscription plans={plans} setplans={setplans} profileToggle={profileToggle} setprofileToggle={setprofileToggle} /></Route>

                                    {/* <Route path='/Ideacreatenewmodal' component={Ideacreatenewmodal} /> */}

                                    <Route path="/onboarding" >
                                        {

                                            firstlogin ?
                                                <Onboarding setfirstlogin={setfirstlogin}></Onboarding>
                                                :
                                                <Redirect to={`/home`} />
                                        }

                                    </Route>

                                </>
                                :
                                authenticated == true && validator == true ?
                                    <>
                                        <Route exact path={`/`} render={() => {
                                            return (<Redirect to={`/dashboard`} />)
                                        }} />

                                        <Route path="/profile" component={ValidatorProfileMain} />
                                        <Route path="/dashboard" component={ValidatorDashboardRoute} />
                                        <Route path="/proposal" component={ValidatorsProposalRoute} />
                                        <Route path="/rewards" component={ValidatorsRewardRoute} />
                                        <Route path='/detail-projects' component={ValidatorProjectRoute} />
                                        <Route path='/More' component={UnderConstructionValidatorRoute} />
                                        <Route path='/Validations' component={UnderConstructionValidatorRoute} />
                                        <Route path='/Project' component={UnderConstructionValidatorRoute} />
                                        <Route path='/ConnectRequest' component={ClientChartLayout} />
                                        <Route path='/conversation' component={chatlayout} />
                                        <Route path='/SentRequest' component={SendRequestLayout} />
                                        <Route path='/Requests' component={ValidatorsRequestsRoute} />

                                    </>
                                    :
                                    authenticated == true && (investor == true || userrole == "Investor") ?
                                        <>
                                            <Route exact path={`/`} render={() => {
                                                return (<Redirect to={`/dashboard`} />)
                                            }} />

                                            <Route path="/profile" component={ProfilePage} />
                                            <Route path="/dashboard" component={DashboardRoute} />
                                            <Route path="/projects" component={UnderConstructionInvestorRoute} />
                                            {/* <Route path="/projects" component={ProjectsRoute} /> */}
                                            <Route path="/proposal" component={ProposalRoute} />
                                            <Route path="/invite" component={InviteRoute} />
                                            <Route path="/Vesting" component={VestingInvestorRoute} />
                                            <Route path='/detail-projects' component={DetailsProjectRoute} />
                                            <Route path='/Investments' component={InestorFundRaiseRoute} />
                                            <Route path='/more' component={UnderConstructionInvestorRoute} />
                                            <Route path='/conversation' component={chatlayout} />
                                            <Route path='/ConnectRequest' component={ClientChartLayout} />
                                            <Route path='/SentRequest' component={SendRequestLayout} />

                                        </>
                                        :

                                        authenticated == true && superadmin == true ?
                                            <>
                                                <Route exact path={`/`} render={() => {
                                                    return (<Redirect to={`/dashboard`} />)
                                                }} />

                                                <Route path="/dashboard" component={SuperAdminDashboardRoute} />
                                                <Route path="/Project" component={projectDataPageRoute} />
                                                <Route path="/Validators" component={SuperAdminValidatorsRoute} />
                                                <Route path="/Founders" component={SuperAdminFounderRoute} />
                                                <Route path="/Investors" component={SuperAdminInvestorsRoute} />
                                                <Route path='/conversation' component={chatlayout} />
                                                <Route path="/invite" component={InviteSuperAdminRoute} />
                                                <Route path='/detail-projects' component={SuperAdminProjectDetails} />
                                                <Route path='/founderDetails' component={FounderSuperAdminRoute} />
                                                <Route path='/ConnectRequest' component={ClientChartLayout} />
                                                <Route path='/SentRequest' component={SendRequestLayout} />

                                            </>
                                            :

                                            <Redirect to={`/login`} />


                        }

                    </Switch>



                </Router>
            </ApolloProvider>
        )
    }



}

export default App;