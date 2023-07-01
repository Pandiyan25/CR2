import { createSlice, createEntityAdapter, createSelector, createAsyncThunk } from '@reduxjs/toolkit';
import { apiURI, client } from '../config/config';
import { gql } from '@apollo/client';
import 'regenerator-runtime/runtime'





const RoadMapProjectAdaptor = createEntityAdapter();
const initialState = RoadMapProjectAdaptor.getInitialState({
  status: "idle",
  error: null,
  searchTerm: "",
});






export const fetchRoadMapProjectDetails = createAsyncThunk('roadMapProjectData/fetchRoadMapProjectDetails', async (item) => {
  console.log("RoadMap", item);
  // const response = await client
  //   .query({ query: PRODUCTS, variables: { "project": item } });

  const query = ` 
  query AllProjectRoadmap($project: ID) {
      allProjectRoadmap(project: $project) {
        _id
     
        current_date
        start_date
        end_date
        main_description
        sub_description
        no_of_working_days
        status
      }
      getRoadmapDashboard(project: $project) {
        no_of_milesones
        milestone_completed
        yet_to_start
        milestone_in_progress
        milestone_overdue
        reporting_cycles
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




export const RoadMapProjectSlice = createSlice({
  name: 'roadMapProjectData',
  initialState,
  reducers: {

    searchTerm: (state, action) => {

      console.log("dararayd,s,msmsl", action.payload);

      state.searchTerm = action.payload;
    },
    searchAllProjectItemsRemove(state, action) {

      RoadMapProjectAdaptor.removeAll(state);

    }

  },
  extraReducers: {
    [fetchRoadMapProjectDetails.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchRoadMapProjectDetails.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      console.log(action.payload, "getRoadmapDataReducer");
      RoadMapProjectAdaptor.removeAll(state);
      var arr = [];
      // if (action.payload?.allProjectRoadmap.length > 0) {
        // for (var i = 0; i < action.payload?.allProjectRoadmap.length; i++) {
        var tokenArrStd = [];
        var GattDAta = []
        var tokenarr = [];
        var RoadMapDashboard = [];
        if (action.payload?.allProjectRoadmap != null && action.payload?.allProjectRoadmap != undefined && action.payload?.allProjectRoadmap.length > 0) {
          // setCheckPage(action.payload?.allProjectRoadmap[0]._id)


          for (var j = 0; j < action.payload?.allProjectRoadmap.length; j++) {

            var projectCurrentDate = action.payload?.allProjectRoadmap[j]?.start_date

            projectCurrentDate = projectCurrentDate?.split('T')[0];

            var dashboardDate = action.payload?.allProjectRoadmap[j]?.end_date
            dashboardDate = dashboardDate?.split('T')[0];

            tokenArrStd.push({
              "_id": action.payload?.allProjectRoadmap[j]?._id,
              "current_date": action.payload?.allProjectRoadmap[j]?.current_date,
              "start_date": projectCurrentDate,
              "end_date": dashboardDate,
              "main_description": action.payload?.allProjectRoadmap[j]?.main_description,
              "sub_description": action.payload?.allProjectRoadmap[j]?.sub_description,
              "no_of_working_days": action.payload?.allProjectRoadmap[j]?.no_of_working_days,
              "status": action.payload?.allProjectRoadmap[j]?.status
            })
          }
          // settokenStd(tokenArr)


          for (var i = 0; i < action.payload?.allProjectRoadmap.length; i++) {
            GattDAta.push({
              // main_expense_head 
              name: action.payload?.allProjectRoadmap[i].main_description,
              start: action.payload?.allProjectRoadmap[i].start_date,
              end: action.payload?.allProjectRoadmap[i].end_date,
              id: i + 1,
              color: "orange"
            })
            //   setGattDAta(arr)
          }

          // for (var i = 0; i < action.payload?.allProjectRoadmap.length; i++) {
          //   console.log(parseInt(action.payload?.allProjectRoadmap[i].unit), "getFounderUserDetailsBudgets");
          //   tokenarr.push({
          //     id: i,
          //     name: action.payload?.allProjectRoadmap[i].main_expense_head,
          //     y: parseInt(action.payload?.allProjectRoadmap[i].no_of_working_days)

          //   })


          //   console.log(arr, "tokenarr");


          //   setMydata(tokenarr)
          // }

        }else{
          GattDAta = []
          tokenArrStd = []
        }

        if (action.payload?.getRoadmapDashboard != null && action.payload?.getRoadmapDashboard != undefined) {
          // setRoadMapDashboard([data?.data?.getRoadmapDashboard])
          RoadMapDashboard.push(action.payload?.getRoadmapDashboard)
        } else {
          // setRoadMapDashboard([])
          RoadMapDashboard = []
        }

        var mileStoneChartData = []

        if (action.payload?.getRoadmapDashboard != null && action.payload?.getRoadmapDashboard != undefined) {
          // setRoadMapDashboard([action.payload?.getRoadmapDashboard])


          var milestonechart = [];
          if (action.payload?.getRoadmapDashboard?.milestone_completed != null && action.payload?.getRoadmapDashboard?.milestone_completed != undefined && action.payload?.getRoadmapDashboard?.milestone_completed != 0) {
            milestonechart.push({
              name: 'Milestone Completed',
              y: parseInt(action.payload?.getRoadmapDashboard.milestone_completed),
              color: '#026a0ddb'
            })
          } else {
            milestonechart.push({
              name: 'Milestone Completed',
              y: 0,
              color: '#026a0ddb'
            })
          }

          if (action.payload?.getRoadmapDashboard?.milestone_in_progress != null && action.payload?.getRoadmapDashboard?.milestone_in_progress != undefined && action.payload?.getRoadmapDashboard?.milestone_in_progress != 0) {
            milestonechart.push({
              name: 'Milestone In Progress',
              y: parseInt(action.payload?.getRoadmapDashboard.milestone_in_progress),
              color: '#6345ED'
            })
          } else {
            milestonechart.push({
              name: 'Milestone In Progress',
              y: 0,
              color: '#6345ED'
            })
          }

          if (action.payload?.getRoadmapDashboard?.yet_to_start != null && action.payload?.getRoadmapDashboard?.yet_to_start != undefined && action.payload?.getRoadmapDashboard?.yet_to_start != 0) {
            milestonechart.push({
              name: 'Yet to Start',
              y: parseInt(action.payload?.getRoadmapDashboard.yet_to_start),
              color: '#94B3E8'
            })
          } else {
            milestonechart.push({
              name: 'Yet to Start',
              y: 0,
              color: '#94B3E8'
            })
          }

          console.log(milestonechart, "arrmilestonechart");
          // ,
          // {
          //   title:'Milestone Completed',
          //   value:parseInt(data?.data?.getRoadmapDashboard.milestone_completed),
          //   color:'#6345ED'
          // }
          // {
          //   title:'Milestone Completed',
          //   value:parseInt(data?.data?.getRoadmapDashboard.milestone_completed),
          //   color:'#6345ED'
          // }

          // )


          mileStoneChartData = milestonechart



        } else {
          mileStoneChartData = []
        }

        // console.log(i, "RoadMap");
        // arr.push(action.payload?.allProjectRoadmap)
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
        // }
        arr.push({
          // Mydata:tokenarr,
          Roadmap: tokenArrStd,
          GattDAta: GattDAta,
          RoadMapDashboard: RoadMapDashboard,
          mileStoneChartData:mileStoneChartData
        })
        console.log(arr, "arrarrRoadMap");
        arr.map((data) => (

          RoadMapProjectAdaptor.addOne(state, data)

        ))
      // }


    },

  }
});

export const { searchAllProjectItemsRemove } = RoadMapProjectSlice.actions;


export default RoadMapProjectSlice.reducer;
export const { selectAll: selectAllRoadMapProjectDetails, } = RoadMapProjectAdaptor.getSelectors((state) => state.roadMapProjectData);
