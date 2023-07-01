import { createSlice, createEntityAdapter, createSelector, createAsyncThunk } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from "react-redux";
import { apiURI, client } from '../config/config';
import { gql } from '@apollo/client';
import 'regenerator-runtime/runtime'



const PRODUCTS = gql`



query Query($id: ID) {
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
      linkedin
      linkedin_link
      website_link
      twitter_link
      education
      experience
      industry
      experience_in_blockchain
      current_position
      past_organisation_tags
      current_organisation
      current_income
      wallet_address
      current_location
      nationality
      id_proof
      self_description
      id_number
    }
  }
`;

const validatorprofileAdapter = createEntityAdapter();
const initialState = validatorprofileAdapter.getInitialState({
    status: "idle",
    error: null,
    searchTerm: "",
});






export const fetchValidatorProfile = createAsyncThunk('validatorprofile/fetchValidatorProfile', async  (item) => {
 console.log("===================sss===============");
    const response = await client
      .query({ query: PRODUCTS, variables: { "id": item} });
  
 console.log("===================sss===============",response);
 console.log("===================sssdata===============",response.data);
//  console.log("===================sssjson===============",response.json());
    return response.data;
  
  })




export const validatorProfileSlice = createSlice({
    name: 'validatorprofile',
    initialState,
    reducers: {

        searchTerm: (state, action) => {

            console.log("dararayd,s,msmsl", action.payload);

            state.searchTerm = action.payload;
        },
        searchAllItemsRemove(state, action) {

            validatorprofileAdapter.removeAll(state);

        }

    },
    extraReducers: {
        [fetchValidatorProfile.pending]: (state, action) => {
            state.status = 'loading'
        },
        [fetchValidatorProfile.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            console.log(action.payload, "succeeded");
            validatorprofileAdapter.removeAll(state);
            var arr = [];
            arr.push(action.payload?.getUser)
            console.log(arr,"arrarr");
            arr.map ((data) => (

                validatorprofileAdapter.addOne(state, data)
                
                ))
                
        },

    }
});

export const { searchAllItemsRemove } = validatorProfileSlice.actions;


export default validatorProfileSlice.reducer;
export const { selectAll: selectAllValidatorProfile, } = validatorprofileAdapter.getSelectors((state) => state.validatorprofile);
