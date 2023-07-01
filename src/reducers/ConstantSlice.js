import { createSlice, createEntityAdapter, createSelector, createAsyncThunk } from '@reduxjs/toolkit';
const userAdapter = createEntityAdapter();
const initialState = userAdapter.getInitialState({

    proposalsData: [],
    showSettings: false,
    loginId: '',
    projectId: '',
    walletAddress: '',
    emailid:'',
    referralCode:'',
    projectIdSuperAdmin: '',
    walletEithDot: '',
    profileIdValidator: '',
    JsonValueUserAccount: [],
    currencyType:'',
    leadInvestor:'',
    currentIdeaId:'',
    externalLeadInvestor:'',
    subscriptionData:"",
    MileStoneArray: [{
        choose: "Choose_MileStone",
        milestone: 'Complete 50% of the Target Fund Raise',
        target_date: "",
        percentage: 1


    }],
    MileStonePrivateArray: [{
        choose: "Choose_MileStone",
        milestone: 'Complete 50% of the Target Fund Raise',
        target_date: "",
        percentage: 1,

        validation_status: '',
        milestone_status: '',
        funds: '',
        remarks: '',
        estimated_target_date: ''
    }],
    MileStoneInvestorPrivateArray: [{
        choose: "Choose_MileStone",
        ValueForChoose: 'Complete 50% of the Target Fund Raise',
        TargetDate: "",
        percentage: 1,

        validation_status: '',
        milestone_status: '',
        id: ''
    }],
    InvestorsDataInFoundersDashboard: [],
    investorsDataDashboard: [],
    founderDataInInvestorsDashboard:[],
    FoundersDataDashboard:[],
    userLoginLinForChat:'',
    InvestorsLoginId:'',
    showTokenomicsData:false,
    userConnectedWalletDetails:{
            status: ''  
    }
});



export const constantSlice = createSlice({
    name: 'table',
    initialState,
    reducers: {
        proposalsData(state, action) {
            state.proposalsData = action.payload;
        },
        showSettings(state, action) {
            state.showSettings = action.payload;
        },
        loginId(state, action) {
            state.loginId = action.payload;
            console.log(action.payload, "user id dispatched");
        },
        projectId(state, action) {
            state.projectId = action.payload;
        },
        referralCode(state, action){
            console.log("project user Referral Codeinside slice");
            state.referralCode = action.payload;
        },
        walletAddress(state, action) {
            state.walletAddress = action.payload;
        },
        emailid(state, action) {
            console.log(action.payload, "email id data");
            state.emailid = action.payload;
        },
        userConnectedWalletDetails(state,action){
            state.userConnectedWalletDetails = action.payload
        },
        showTokenomicsData(state,action){
            state.showTokenomicsData = action.payload;
        },
        currencyType(state, action) {
            state.currencyType = action.payload;
            console.log(action.payload, "datadata");
            
           
        },
        currentIdeaId(state, action) {
            state.currentIdeaId = action.payload;
            console.log(action.payload, "cureent ");
        },
        leadInvestor(state, action) {
            state.leadInvestor = action.payload;
            
            console.log(action.payload, "datadata");
            
           
        },
        subscriptionData(state, action) {
            state.subscriptionData = action.payload;
            console.log(action.payload, "subdt in redux");
            
           
            
        },
        externalLeadInvestor(state, action) {
            state.externalLeadInvestor = action.payload;
            
            console.log(action.payload, "datadata");
            
           
        },
        projectIdSuperAdmin(state, action) {
            state.projectIdSuperAdmin = action.payload;
        },
        profileIdValidator(state, action) {
            state.profileIdValidator = action.payload;
        },
        MileStoneArray(state, action) {
            state.MileStoneArray = action.payload;
        },
        MileStonePrivateArray(state, action) {
            state.MileStonePrivateArray = action.payload;
        },
        MileStoneInvestorPrivateArray(state, action) {
            state.MileStoneInvestorPrivateArray = action.payload;
        },
        walletEithDot(state, action) {
            state.walletEithDot = action.payload;
        },
        JsonValueUserAccount(state, action) {
            state.JsonValueUserAccount = action.payload;
        },
        
        userLoginLinForChat(state, action) {
            state.userLoginLinForChat = action.payload;
        },
        InvestorsDataInFoundersDashboard(state, action) {
            const firstPageIndex = (action.payload.currentPageClosedDeals - 1) * action.payload.PageSizeClosedDeals;
            const lastPageIndex = firstPageIndex + action.payload.PageSizeClosedDeals;
            var data = []
            data = action.payload.data
            console.log(action, "datadata");
            var gigdataRef = []
            if (data?.length > 0) {
                gigdataRef = data?.slice(firstPageIndex, lastPageIndex)

            } else {
                gigdataRef = [];
            }

            state.investorsDataDashboard = action.payload.data
            state.InvestorsDataInFoundersDashboard = gigdataRef

        },

        investorsDataDashboard(state, action) {
            state.investorsDataDashboard = action.payload;
        },
        founderDataInInvestorsDashboard(state, action) {
            const firstPageIndex = (action.payload.currentPageClosedDeals - 1) * action.payload.PageSizeClosedDeals;
            const lastPageIndex = firstPageIndex + action.payload.PageSizeClosedDeals;
            var data = []
            data = action.payload.data
            console.log(action, "datadata");
            var gigdataRef = []
            if (data?.length > 0) {
                gigdataRef = data?.slice(firstPageIndex, lastPageIndex)

            } else {
                gigdataRef = [];
            }

            state.FoundersDataDashboard = action.payload.data
            state.founderDataInInvestorsDashboard = gigdataRef

        },
        
        FoundersDataDashboard(state, action) {
            state.FoundersDataDashboard = action.payload;
        },
        InvestorsLoginId(state, action) {
            state.InvestorsLoginId = action.payload;
        },
    },



});

export const {userLoginLinForChat,InvestorsLoginId, profileIdValidator,founderDataInInvestorsDashboard,FoundersDataDashboard,InvestorNameDecSort, InvestorNameAscSort, investorsDataDashboard, JsonValueUserAccount, InvestorsDataInFoundersDashboard, MileStoneInvestorPrivateArray, walletEithDot, MileStoneArray, MileStonePrivateArray, projectIdSuperAdmin, proposalsData, showSettings, loginId, projectId, walletAddress,currencyType,referralCode,leadInvestor,externalLeadInvestor,showTokenomicsData,userConnectedWalletDetails,currentIdeaId,emailid,subscriptionData } = constantSlice.actions;

export default constantSlice.reducer;






















