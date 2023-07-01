import { createSlice, createEntityAdapter, createSelector, createAsyncThunk } from '@reduxjs/toolkit';
import { apiURI, client } from '../config/config';
import { gql } from '@apollo/client';
import 'regenerator-runtime/runtime'
import randomColor from "randomcolor";




const LaunchAdapter = createEntityAdapter();
const initialState = LaunchAdapter.getInitialState({
    status: "idle",
    error: null,
    searchTerm: "",
    buget: []
});






export const fetchLaunchReq = createAsyncThunk('LaunchRequest/fetchLaunchReq', async (item) => {
    console.log("funding", item);
    
    var query =`
    query AllProjects($founder: ID) {
        allProjects(founder: $founder) {
          _id
          launch_status {
            launched
            percentage
          }
        }
      }`;
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
          variables: { "founder": item }
      })
  })
  .then((response) => {

    const json = response.json();
    return json;
})

    // console.log("===================sss===============", response);
    console.log("===================sssdatareqSlice===============", response.data);
    //  console.log("===================sssjson===============",response.json());
    return response.data;

})




export const LaunchProjectSlice = createSlice({
    name: 'LaunchRequest',
    initialState,
    reducers: {

        searchTerm: (state, action) => {

            console.log("dararayd,s,msmsl", action.payload);

            state.searchTerm = action.payload;
        },
        searchallconnect(state, action) {

            LaunchAdapter.removeAll(state);

        }

    },
    extraReducers: {
        [fetchLaunchReq.pending]: (state, action) => {
            state.status = 'loading'
        },
        [fetchLaunchReq.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            console.log(action.payload, "succeeded");
            LaunchAdapter.removeAll(state);
            
            var launchrq = []
            if(action.payload?.allProjects != null && action.payload?.allProjects != undefined && action.payload?.allProjects.length > 0){
                launchrq = action.payload?.allProjects[0]
            }else{
                launchrq=[]
            }
            

                LaunchAdapter.addOne(state, launchrq)

           

        }
    }
})

export const { searchallconnect } = LaunchProjectSlice.actions;


export default LaunchProjectSlice.reducer;
export const { selectAll: selectAllLaunchRequest, } = LaunchAdapter.getSelectors((state) => state.LaunchRequest);
