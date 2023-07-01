import {
  createSlice,
  createEntityAdapter,
  createSelector,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { apiURI, client } from "../config/config";
import { gql } from "@apollo/client";
import "regenerator-runtime/runtime";
import randomColor from "randomcolor";

const budgetProjectAdaptor = createEntityAdapter();
const initialState = budgetProjectAdaptor.getInitialState({
  status: "idle",
  error: null,
  searchTerm: "",
  buget: [],
});

export const fetchBudgetProjectDetails = createAsyncThunk(
  "budgetProjectData/fetchBudgetProjectDetails",
  async (item) => {
    console.log("funding", item);
    // const response = await client
    //     .query({ query: PRODUCTS, variables: { "project": item } });

    const query = ` 
query Query($project: ID) {
    allProjectBudgets(project: $project) {
    _id
    main_expense_head
    sub_expense_head
    expense_per_cycle
    unit
    expense_frequency
    no_of_expense_cycle
    life_time_budget
    actual_expense_till_date
    balance
    start_date
    end_date
    status
    time_task
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
          variables: { project: item },
        }),
      }).then((response) => {
        const json = response.json();
        
        return json;
      });

    return response.data;
  }
);

export const BudgetProjectSlice = createSlice({
  name: "budgetProjectData",
  initialState,
  reducers: {
    searchTerm: (state, action) => {
      console.log("dararayd,s,msmsl", action.payload);

      state.searchTerm = action.payload;
    },
    searchAllProjectItemsRemove(state, action) {
      budgetProjectAdaptor.removeAll(state);
    },
  },
  extraReducers: {
    [fetchBudgetProjectDetails.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchBudgetProjectDetails.fulfilled]: (state, action) => {
      state.status = "succeeded";
      console.log(action.payload, "getBudgetDataReducer");
      budgetProjectAdaptor.removeAll(state);
      var arr = [];
      if (action.payload?.allProjectBudgets?.length > 0) {
        var tokenArr = [];
        for (var j = 0; j < action.payload?.allProjectBudgets?.length; j++) {
          var projectCurrentDate =
            action.payload?.allProjectBudgets[j]?.start_date;

          projectCurrentDate = projectCurrentDate?.split("T")[0];

          var dashboardDate = action.payload?.allProjectBudgets[j]?.end_date;
          dashboardDate = dashboardDate?.split("T")[0];

          //   var projectCurrentDate = action.payload?.allProjectBudgets[j]?.start_date

          //   projectCurrentDate = projectCurrentDate?.split('T')[0];

          //   var dashboardDate = action.payload?.allProjectBudgets[j]?.end_date
          //   dashboardDate = dashboardDate?.split('T')[0];

          tokenArr.push({
            _id: action.payload?.allProjectBudgets[j]?._id,
            // "start_date": projectCurrentDate,
            // "end_date": dashboardDate,
            start_date: projectCurrentDate,
            end_date: dashboardDate,
            status: action.payload?.allProjectBudgets[j]?.status,

            main_expense_head:
              action.payload?.allProjectBudgets[j]?.main_expense_head,
            sub_expense_head:
              action.payload?.allProjectBudgets[j]?.sub_expense_head,
            expense_per_cycle:
              action.payload?.allProjectBudgets[j]?.expense_per_cycle,
            unit: action.payload?.allProjectBudgets[j]?.unit,
            expense_frequency:
              action.payload?.allProjectBudgets[j]?.expense_frequency,
            no_of_expense_cycle:
              action.payload?.allProjectBudgets[j]?.no_of_expense_cycle,
            life_time_budget:
              action.payload?.allProjectBudgets[j]?.life_time_budget,
            actual_expense_till_date:
              action.payload?.allProjectBudgets[j]?.actual_expense_till_date,
            balance: action.payload?.allProjectBudgets[j]?.balance,
            time_task: action.payload?.allProjectBudgets[j]?.time_task,
          });
        }
        console.log(tokenArr, "arrarrtokenArr");
        // tokenArr.map((data) => (
        // console.log(data,"stateallProjectBudgets")
        // console.log(data,"data")

        var expenseChart = [];
        if (action.payload?.allProjectBudgets.length > 0) {
          for (var i = 0; i < action.payload?.allProjectBudgets.length; i++) {
            let color = randomColor();
            expenseChart.push({
              title: `${action.payload?.allProjectBudgets[i]?.main_expense_head}-${action.payload?.allProjectBudgets[i]?.life_time_budget}`,
              value: parseInt(
                action.payload?.allProjectBudgets[i].life_time_budget
              ),
              color: color,
            });
          }
        } else {
          expenseChart = [];
        }

        const ids = action.payload?.allProjectBudgets.map(
          (o) => o.main_expense_head
        );
        console.log(ids, "ids");

        var mini = ids.filter((item, index) => ids.indexOf(item) === index);
        console.log(mini, "minimini");
        var sepSum = [];
        var mainaee = [];
        if (mini.length > 0) {
          for (var i = 0; i < mini.length; i++) {
            let color = randomColor();
            var sepMainSum = 0;
            sepSum = action.payload?.allProjectBudgets?.forEach((element) => {
              console.log(element, "element");
              element?.main_expense_head == mini[i]
                ? (sepMainSum = sepMainSum + element.life_time_budget)
                : sepMainSum;
            });
            mainaee.push({
              y: sepMainSum,
              name: mini[i],
              id: i,
              color: color,
            });
          }
        } else {
          mainaee = [];
        }

        arr.push({
          // Mydata:tokenarr,
          budget: tokenArr,
          expenseChart: expenseChart,
          mainaee: mainaee,
        });

        budgetProjectAdaptor.addMany(state, arr);

        // ))
      }
    },
  },
});

export const { searchAllProjectItemsRemove } = BudgetProjectSlice.actions;

export default BudgetProjectSlice.reducer;
export const { selectAll: selectAllBudgetProjectDetails } =
  budgetProjectAdaptor.getSelectors((state) => state.budgetProjectData);
