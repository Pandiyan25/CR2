import {
    createSlice,
    createAsyncThunk,
  } from "@reduxjs/toolkit";
  import { apiURI, client } from "../config/config";
  import { gql } from "@apollo/client";
  import "regenerator-runtime/runtime";
  
  const initialState = {
    loading: false,
    category: {},
    error: '',
  };
  
  export const fetchSubscriptionDetails = createAsyncThunk(
    "subscription/fetchSubscriptionDetails",
     (item) => {
      console.log("Display Id", item);
      
        var query = `
          query Query($userId: ID) {
              getSubscriptionDetails(user_id: $userId) {
              user_id
              user_email
              plan_name
              plan_type
              start_date
              end_date
              status
              }
              }
        `;
        fetch(apiURI.URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "x-power": process.env.POWER_KEY,
            "x-domain-agent": process.env.DOMAIN_AGENT,
            "x-strict-origin-name": process.env.ORIGIN_NAME,
            "x-range-name": process.env.RANGE_NAME,
          },
          body: JSON.stringify({
            query,
            variables: {
              userId: item,
            },
          }),
        }).then((response) => {
          const json = response.json();
          return json;
        })
        .then((data) => {
          console.log(data?.data?.getSubscriptionDetails, "async thunck");
        })
      }
    );
    
  
  const subscriptionSlice = createSlice({
    name: "subscription",
    initialState,
    reducers: {
      // Other reducers specific to this slice
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchSubscriptionDetails.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchSubscriptionDetails.fulfilled, (state, action) => {
          state.loading = false;
          state.category = action.payload;
          state.error = '';
        })
        .addCase(fetchSubscriptionDetails.rejected, (state, action) => {
          state.loading = false;
          state.category = "";
          state.error = action.error.message;
        });
    },
  });
  
  
  
  // Export the slice reducer
  export default subscriptionSlice.reducer;
  
  