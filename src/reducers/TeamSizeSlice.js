import { createSlice, createEntityAdapter, createSelector, createAsyncThunk } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from "react-redux";
import { apiURI, client } from '../config/config';
import { gql } from '@apollo/client';
import 'regenerator-runtime/runtime'


const teamSizeAdaptor = createEntityAdapter();
const initialState = teamSizeAdaptor.getInitialState({
    status: "idle",
    error: null,
    searchTerm: "",
});






export const fetchTeamSize = createAsyncThunk('teamSizeprofile/fetchTeamSize', async  (item) => {
 console.log("===================team===============",item);
 

const query = `
query Query($project: ID) {
    allProjectTeams(project: $project) {
      _id
      name
      role
      linkedin_link
      image_url
      past_organization_tags
      telegram_link
      twitter_link
      kyc_status
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




export const TeamSizeSlice = createSlice({
    name: 'teamSizeprofile',
    initialState,
    reducers: {

        searchTerm: (state, action) => {

            console.log("dararayd,s,msmsl", action.payload);

            state.searchTerm = action.payload;
        },
        searchAllItemsRemove(state, action) {

            teamSizeAdaptor.removeAll(state);

        }

    },
    extraReducers: {
        [fetchTeamSize.pending]: (state, action) => {
            state.status = 'loading'
        },
        [fetchTeamSize.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            console.log(action.payload, "succeeded");
            teamSizeAdaptor.removeAll(state);
            var arr = [];
            arr.push(action.payload?.allProjectTeams)
            console.log(arr,"arrarrallProjectTeams");
            arr.map ((data) => (

                teamSizeAdaptor.addOne(state, data)
                
                ))
                
        },

    }
});

export const { searchAllItemsRemove } = TeamSizeSlice.actions;


export default TeamSizeSlice.reducer;
export const { selectAll: selectAllTeamDetails, } = teamSizeAdaptor.getSelectors((state) => state.teamSizeprofile);
