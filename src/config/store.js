import { configureStore } from '@reduxjs/toolkit'
import  BudgetProjectSlice  from '../reducers/BudgetSlice'
import  BudgetBudgetSlice  from '../reducers/BugetBannerSlice'
import ConnectReqSlice from '../reducers/ConnectReqSlice'

import ConstantSlice from '../reducers/ConstantSlice'
import FundingProjectSlice from '../reducers/FundingProjectSlice'
import LaunchSlice from '../reducers/LaunchSlice'
import NotificationsSlice from '../reducers/NotificationsSlice'
import profileSlice from '../reducers/profileSlice'
import ProjectDetailsSlice from '../reducers/ProjectDetailsSlice'
import  RoadMapProjectSlice  from '../reducers/RoadMapSlice'
import SocialPageSlice from '../reducers/SocialPageSlice'
import TeamSizeSlice from '../reducers/TeamSizeSlice'
import TokenomicsSlice from '../reducers/TokenomicsSlice'
import  validatorProfileSlice  from '../reducers/ValidatorProfileSlice'
import  subscriptionReducer   from '../reducers/subscriptionSlice'
export default configureStore({
  reducer: {
    connectRequest:ConnectReqSlice,
    constVar:ConstantSlice,
    profile:profileSlice,
    validatorprofile:validatorProfileSlice,
    projectData:ProjectDetailsSlice,
    fundingProjectData:FundingProjectSlice,
    teamSizeprofile:TeamSizeSlice,
    tokenomicsProjectData:TokenomicsSlice,
    socialPage:SocialPageSlice,
    budgetProjectData:BudgetProjectSlice,
    notificationsData:NotificationsSlice,
    roadMapProjectData:RoadMapProjectSlice,
    budgetBannerData:BudgetBudgetSlice,
    subscription: subscriptionReducer,
    LaunchRequest:LaunchSlice
},
})