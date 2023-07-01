import { createSlice, createEntityAdapter, createSelector, createAsyncThunk } from '@reduxjs/toolkit';
import { apiURI, client } from '../config/config';
import { gql } from '@apollo/client';
import 'regenerator-runtime/runtime'



const PRODUCTS = gql` 
query AllNotification($user: ID) {
    allNotification(user: $user) {
      _id
      message
      status
      
      module_id
      module
    }
  }
`;

const notificationAdaptor = createEntityAdapter();
const initialState = notificationAdaptor.getInitialState({
    status: "idle",
    error: null,
    searchTerm: "",
});






export const fetchNotificationDetails = createAsyncThunk('notificationsData/fetchNotificationDetails', async (item) => {
    console.log("funding", item);
    const response = await client
        .query({ query: PRODUCTS, variables: { "user": item } });
    // .query({ query: PRODUCTS, variables: {
    //     "project": item
    //   } });

    console.log("===================sss===============", response);
    console.log("===================sssdata===============", response.data);
    //  console.log("===================sssjson===============",response.json());
    return response.data;

})




export const NotificationsSlice = createSlice({
    name: 'notificationsData',
    initialState,
    reducers: {

        searchTerm: (state, action) => {

            console.log("dararayd,s,msmsl", action.payload);

            state.searchTerm = action.payload;
        },
        searchAllProjectItemsRemove(state, action) {

            notificationAdaptor.removeAll(state);

        }

    },
    extraReducers: {
        [fetchNotificationDetails.pending]: (state, action) => {
            state.status = 'loading'
        },
        [fetchNotificationDetails.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            console.log(action.payload, "getBudgetDataReducer");
            notificationAdaptor.removeAll(state);
            var arr = [];
            if (action.payload?.allNotification.length > 0) {
                for (var i = 0; i < action.payload?.allNotification.length; i++) {

                    console.log(i, "payloadgetBudgetDataReducer");
                    // arr=(action.payload?.allNotification)
                    if(action.payload?.allNotification[i].status == 'UnRead'){
                        arr.push({
                            "_id":action.payload?.allNotification[i]._id,
                            "message":action.payload?.allNotification[i].message,
                            "status":action.payload?.allNotification[i].status,
                            
                            "module_id":action.payload?.allNotification[i].module_id,
                            "module":action.payload?.allNotification[i].module
                        })
                    }else{

                    }
                    // arr.push({

                    //     _id: action.payload?.allProjectBudgets[i]._id,
                    //     main_expense_head : action.payload?.allProjectBudgets[i].main_expense_head,
                    //     sub_expense_head : action.payload?.allProjectBudgets[i].sub_expense_head,
                    //     expense_per_cycle : action.payload?.allProjectBudgets[i].expense_per_cycle,
                    //     unit : action.payload?.allProjectBudgets[i].unit,
                    //     expense_frequency : action.payload?.allProjectBudgets[i].expense_frequency,
                    //     no_of_expense_cycle : action.payload?.allProjectBudgets[i].no_of_expense_cycle,
                    //     life_time_budget : action.payload?.allProjectBudgets[i].life_time_budget,
                    //     actual_expense_till_date : action.payload?.allProjectBudgets[i].actual_expense_till_date,
                    //     balance : action.payload?.allProjectBudgets[i].balance,
                    //     start_date : action.payload?.allProjectBudgets[i].start_date,
                    //     end_date : action.payload?.allProjectBudgets[i].end_date,
                    //     status : action.payload?.allProjectBudgets[i].status,
                    //     time_task : action.payload?.allProjectBudgets[i].time_task,
                    // })
                }
                console.log(arr, "arrarr");
                arr.map((data) => (

                    notificationAdaptor.addOne(state, data)

                ))
            }


        },

    }
});

export const { searchAllProjectItemsRemove } = NotificationsSlice.actions;


export default NotificationsSlice.reducer;
export const { selectAll: selectAllNotificationsData, } = notificationAdaptor.getSelectors((state) => state.notificationsData);
