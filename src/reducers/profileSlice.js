import { createSlice, createEntityAdapter, createSelector, createAsyncThunk } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from "react-redux";
import { apiURI, client } from '../config/config';
import { gql } from '@apollo/client';
import 'regenerator-runtime/runtime'



const PRODUCTS = gql`

query GetUser($id: ID) {
    getUser(_id: $id) {
      _id
      email
      password
      role
      contact
      first_name
      last_name
      role_in_organization
      fund_description
      minimum_investment_size
      project_invested
      type_of_fund
      preferred_sectors {
        value
      }
      fund_name
      asset_under_management
      projected_invested_till_date
      fund_head_quarters
      team_size
      website_link
      twitter_link
      linkedin_link
      linkedin
    }
  }
`;

const profileAdapter = createEntityAdapter();
const initialState = profileAdapter.getInitialState({
    status: "idle",
    error: null,
    searchTerm: "",
});






export const fetchProfileDetails = createAsyncThunk('profile/fetchProfileDetails', async  (item) => {
 console.log("===================sss===============");
    const response = await client
      .query({ query: PRODUCTS, variables: { "id": item} });
  
 console.log("===================sss===============",response);
 console.log("===================sssdata===============",response.data);
//  console.log("===================sssjson===============",response.json());
    return response.data;
  
  })




export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {

        searchTerm: (state, action) => {

            console.log("dararayd,s,msmsl", action.payload);

            state.searchTerm = action.payload;
        },
        searchAllItemsRemove(state, action) {

            profileAdapter.removeAll(state);

        }

    },
    extraReducers: {
        [fetchProfileDetails.pending]: (state, action) => {
            state.status = 'loading'
        },
        [fetchProfileDetails.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            console.log(action.payload, "succeeded");
            profileAdapter.removeAll(state);
            var arr = [];
            arr.push(action.payload?.getUser)
            console.log(arr,"arrarr");
            arr.map ((data) => (

                profileAdapter.addOne(state, data)
                
                ))
                
        },

    }
});

export const { searchAllItemsRemove } = profileSlice.actions;


export default profileSlice.reducer;
export const { selectAll: selectAllProfile, } = profileAdapter.getSelectors((state) => state.profile);
