import { createSlice, createEntityAdapter, createSelector, createAsyncThunk } from '@reduxjs/toolkit';
import { apiURI, client } from '../config/config';
import { gql } from '@apollo/client';
import 'regenerator-runtime/runtime'




// const fundingProjectPieChartDataAdaptor = createEntityAdapter();
// const fundingProjectDataAdaptor = createEntityAdapter();
const fundingProjectAdaptor = createEntityAdapter();
const initialState = fundingProjectAdaptor.getInitialState({
  status: "idle",
  error: null,
  searchTerm: "",
});






export const fetchFundingProjectDetails = createAsyncThunk('fundingProjectData/fetchFundingProjectDetails', async (item) => {
  console.log("funding", item);

  const query = `


query AllProjectFundings($project: ID) {
                

    allProjectFunding(project: $project) {
        _id
        total_fund_raise_target
        fund_raised
        number_of_investors
        stage_of_funding
        primary_funding_wallet_address_network
        primary_funding_wallet_address
        mode_of_funding
        lead_investor {
            _id
          first_name
          last_name
        }
        project {
          _id
        }
      currency
      external_lead_investor
    }
    allProjectFundingData(project: $project)  {
      _id
     
      investor_round
      price_per_token
      investment
      investment_round
      tokens_alloted
      percentage_of_supply
      website
      category
      investor {
        _id
        first_name
        last_name
      }
      project {
        _id
      }
      external_investor
    }
    allFundraise(project: $project) {
      valuation
    }
  }
  
  
`;

  const response =
    // await client
    // .query({ query: PRODUCTS, variables: { "user": item } });
    // .query({ query: PRODUCTS, variables: {
    //     "project": item
    //   } });
    await fetch(apiURI.URL, {
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
        variables: { "project": item }
      })
    })
      .then((response) => {

        const json = response.json();
        return json;
      })
      console.log(response.data,"date")
  return response.data;

})




export const FundingProjectSlice = createSlice({
  name: 'fundingProjectData',
  initialState,
  reducers: {

    searchTerm: (state, action) => {

      console.log("dararayd,s,msmsl", action.payload);

      state.searchTerm = action.payload;
    },
    searchAllProjectFundingProjectItemsRemove(state, action) {

      fundingProjectAdaptor.removeAll(state);

    }

  },
  extraReducers: {
    [fetchFundingProjectDetails.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchFundingProjectDetails.fulfilled]: (state, action) => {

      state.status = 'succeeded'
      console.log(action.payload, "succeeded-fundingProjectData");
      fundingProjectAdaptor.removeAll(state);
      var arr = [];
      var arr2 = [];
      if (action.payload?.allProjectFunding?.length > 0) {
        arr.push(action.payload?.allProjectFunding[0])
        console.log(arr, "arrarr allProjectFundingData");
        // fundingProjectAdaptor.addMany(arr)
        // arr.map((data) => (

        //     fundingProjectAdaptor.addOne(state, data)

        // ))

      }else{
        arr = []
      }
      console.log(action.payload?.allProjectFundingData, "allProjectFundingData");

      if (action.payload?.allProjectFundingData?.length > 0) {

        var arr3 = [];
        for (var map = 0; map < action.payload?.allProjectFundingData.length; map++) {
          arr3.push({
            ...action.payload?.allProjectFundingData[map],

            id: map,
            name: action.payload?.allProjectFundingData[map].investor?.first_name,
            y: parseFloat(action.payload?.allProjectFundingData[map].investment)
          })
        }

       


        // arr3.map((data) => (

        //     fundingProjectPieChartDataAdaptor.addOne(state, data)

        // ))
        console.log(FundRaiseValuation,"FundRaiseValuation");

        

      }else{
        arr3 = []
      }

      var FundRaiseValuation = 0


      if (action.payload?.allFundraise?.length > 0) {
        if (action.payload?.allFundraise?.length > 1) {
          
          var valuationData = action.payload?.allFundraise.sort((a, b) => a.valuation > b.valuation ? -1 : 1)
          FundRaiseValuation = (valuationData[0]?.valuation)
        } else {
          FundRaiseValuation = (action.payload?.allFundraise[0]?.valuation)
        }

      } else {
        FundRaiseValuation = (0)
      }


      arr2.push({
        allProjectFundingData: arr3,
        allProjectFunding: arr,
        FundRaiseValuation
      })

      // arr2.push(action.payload?.allProjectFundingData)
      console.log(arr2, "arr2 allProjectFundingData");
      // fundingProjectAdaptor.addMany(arr)
      arr2.map((data) => (

        fundingProjectAdaptor.addOne(state, data)

      ))
      console.log(fundingProjectAdaptor,"adaptorfund")


    },

  }
});



export const { searchAllProjectFundingProjectItemsRemove } = FundingProjectSlice.actions;


export default FundingProjectSlice.reducer;
export const { selectAll: selectAllFundingProjectDetails, } = fundingProjectAdaptor.getSelectors((state) => state.fundingProjectData);
// export const { selectAll: selectAllFundingDataArray, } = fundingProjectDataAdaptor.getSelectors((state) => state.fundingProjectData);
// export const { selectAll: selectAllFundingPieChartData, } = fundingProjectPieChartDataAdaptor.getSelectors((state) => state.fundingProjectData);
