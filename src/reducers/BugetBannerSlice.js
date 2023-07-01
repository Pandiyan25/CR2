import { createSlice, createEntityAdapter, createSelector, createAsyncThunk } from '@reduxjs/toolkit';
import { apiURI, client } from '../config/config';
import { gql } from '@apollo/client';
import 'regenerator-runtime/runtime'




const budgetBannerAdaptor = createEntityAdapter();
const initialState = budgetBannerAdaptor.getInitialState({
    status: "idle",
    error: null,
    searchTerm: "",
});






export const fetchBudgetBannerDetails = createAsyncThunk('budgetBannerData/fetchBudgetBannerDetails', async (item) => {
    console.log("funding", item);
    const query = ` 
    query($project: ID) {
        getBudgetBanner(project: $project) {
        project_start_date
        project_end_date
        allocated_budget
        funds_raised_till_date
        total_budget
        unallocated_budget
        unspent_budget
        no_of_reporting_cycles
        spent_budget_till_date
          excess_cash_flow
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




export const BudgetBudgetSlice = createSlice({
    name: 'budgetBannerData',
    initialState,
    reducers: {

        searchTerm: (state, action) => {

            console.log("dararayd,s,msmsl", action.payload);

            state.searchTerm = action.payload;
        },
        searchAllProjectItemsRemove(state, action) {

            budgetBannerAdaptor.removeAll(state);

        }

    },
    extraReducers: {
        [fetchBudgetBannerDetails.pending]: (state, action) => {
            state.status = 'loading'
        },
        [fetchBudgetBannerDetails.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            console.log(action?.payload?.getBudgetBanner, "getBudgetDataReducer");
            budgetBannerAdaptor.removeAll(state);
            var arr = [action?.payload?.getBudgetBanner];
            if (arr.length > 0) {

                console.log(arr, "arrarrgetBudgetDataReducer");
                arr.map((data) => (

                    budgetBannerAdaptor.addOne(state, data)

                ))
            }


        },

    }
});

export const { searchAllProjectItemsRemove } = BudgetBudgetSlice.actions;


export default BudgetBudgetSlice.reducer;
export const { selectAll: selectAllBudgetBanner, } = budgetBannerAdaptor.getSelectors((state) => state.budgetBannerData);
