import { createSlice, createEntityAdapter, createSelector, createAsyncThunk } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from "react-redux";
import { apiURI, client } from '../config/config';
import { gql } from '@apollo/client';
import 'regenerator-runtime/runtime'





const socialAdaptor = createEntityAdapter();
const initialState = socialAdaptor.getInitialState({
    status: "idle",
    error: null,
    searchTerm: "",
});






export const fetchSocialTeam = createAsyncThunk('socialPage/fetchSocialTeam', async  (item) => {
 console.log("===================socialPage===============",item);
 const query = `
 
 
             query Query($project: ID) {
                 allProjectSocials(project: $project) {
                   _id
                   twitter
                   instagram
                   medium
                   facebook
                   linkedin
                   discord
                   telegram
                   reddit
                   youtube
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
     variables: { "project": item }
   })
 })
   .then((response) => {

     const json = response.json();
     return json;
   })
    return response.data;
  
  })




export const SocialPageSlice = createSlice({
    name: 'socialPage',
    initialState,
    reducers: {

        searchTerm: (state, action) => {

            console.log("dararayd,s,msmsl", action.payload);

            state.searchTerm = action.payload;
        },
        searchAllItemsRemove(state, action) {

            socialAdaptor.removeAll(state);

        }

    },
    extraReducers: {
        [fetchSocialTeam.pending]: (state, action) => {
            state.status = 'loading'
        },
        [fetchSocialTeam.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            console.log(action.payload, "succeeded");
            socialAdaptor.removeAll(state);
            var arr = [];
            
                if(action.payload?.allProjectSocials?.length > 0){
                    arr.push(action.payload?.allProjectSocials[0])
                    console.log(arr, "arrarr");
                    
                }else{
                  arr = []
                }
                arr.map((data) => (
        
                  socialAdaptor.addOne(state, data)
  
              ))
        },

    }
});

export const { searchAllItemsRemove } = SocialPageSlice.actions;


export default SocialPageSlice.reducer;
export const { selectAll: selectAllSocialDetails, } = socialAdaptor.getSelectors((state) => state.socialPage);
