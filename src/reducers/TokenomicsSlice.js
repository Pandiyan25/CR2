import { createSlice, createEntityAdapter, createSelector, createAsyncThunk } from '@reduxjs/toolkit';
import { apiURI, client } from '../config/config';
import { gql } from '@apollo/client';
import 'regenerator-runtime/runtime'



const tokenomicsAdaptor = createEntityAdapter();
const initialState = tokenomicsAdaptor.getInitialState({
    status: "idle",
    error: null,
    searchTerm: "",
});

export const fetchTokenomicsDetails = createAsyncThunk('tokenomicsProjectData/fetchTokenomicsDetails', async (item) => {
    console.log("funding", item);

    const query = `
    
    query AllProjectFundings($project: ID) {
        allTokenomics(project: $project) {
          _id
          token_ticker
          token_type {
            value
          }
          contract_address
          primary_network
          token_standard
          public_launch_price
          expected_token_generation_event
          total_token_supply
          token_supply_breakup {
            category
            value
          }
          token_minted
          contract_link
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
    return response.data;

})




export const TokenomicsSlice = createSlice({
    name: 'tokenomicsProjectData',
    initialState,
    reducers: {

        searchTerm: (state, action) => {

            console.log("dararayd,s,msmsl", action.payload);

            state.searchTerm = action.payload;
        },
        searchAllProjectItemsRemove(state, action) {

            tokenomicsAdaptor.removeAll(state);

        }

    },
    extraReducers: {
        [fetchTokenomicsDetails.pending]: (state, action) => {
            state.status = 'loading'
        },
        [fetchTokenomicsDetails.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            console.log(action.payload, "succeeded-tokenomicsProjectData");
            tokenomicsAdaptor.removeAll(state);
            var arr = [];
            if (action.payload?.allTokenomics?.length > 0) {
                arr.push(action.payload?.allTokenomics[0])
                console.log(arr, "arrarr");
               
            }else{
              arr = []
            }
           
            arr.map((data) => (

              tokenomicsAdaptor.addOne(state, data)

          ))

        },

    }
});

export const { searchAllProjectItemsRemove } = TokenomicsSlice.actions;


export default TokenomicsSlice.reducer;
export const { selectAll: selectAllTokenomicsDetails, } = tokenomicsAdaptor.getSelectors((state) => state.tokenomicsProjectData);
