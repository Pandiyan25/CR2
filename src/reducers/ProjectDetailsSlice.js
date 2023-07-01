import {
  createSlice,
  createEntityAdapter,
  createSelector,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { apiURI, client } from "../config/config";
import { gql } from "@apollo/client";
import "regenerator-runtime/runtime";

const projectAdaptor = createEntityAdapter();
const initialState = projectAdaptor.getInitialState({
  status: "idle",
  error: null,
  searchTerm: "",
  tablesList: [],
});

// one_line_description

export const fetchProjectDetails = createAsyncThunk(
  "projectData/fetchProjectDetails",
  async (item) => {
    console.log("===================fetchProduct===============", item);
   

    const query = `

    query Query($id: ID) {
        getProject(_id: $id) {
          _id
         
          email_id
          first_name
          last_name
          linkedin_profile_link
          project_name
          project_description
          nature_of_project
          project_start_date
          project_tags
          project_stage
          website_link
          github_repository
          whitepaper
          one_pager_document
          pitch_deck
          number_of_founders
          team_size
          project_id
          project_status
          amount_released
          amount_invested
          amount_in_escrow
          project_end_date
          total_budget
          validator_score
          investor_score
          fund_raised_till_now
          total_fund_raised
          investment_date
          no_of_proposals
          logo
          project_blockchain_id
          fund_raised_target
          public_launch_price
          funds_released_till_date
          cover_page
          twitter
          instagram
          medium
          facebook
          linkedin
          discord
          telegram
          reddit
          youtube
          rating {
            market_validation
            business_model
            team
            tokenomics
            user_role
            user_id
            remarks
          }
          one_line_description
          product_demo
          video_pitch
        }
      }
    `;
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
          variables: { id: item },
        }),
      }).then((response) => {
        console.log(response.data, "login");
        const json = response.json();
        return json;
      });

    // console.log("===================sssfetchProduct===============", response);
    // console.log("===================sssdatafetchProduct===============", response.data);
    //  console.log("===================sssjson===============",response.json());
    return response.data;
  }
);

export const ProjectDetailsSlice = createSlice({
  name: "projectData",
  initialState,
  reducers: {
    updateTable(state, action) {
      console.log(state.tablesList, action.payload, "updatedTable");
      state.tablesList = action.payload;

      projectAdaptor.setAll(state, action);
    },

    searchTerm: (state, action) => {
      console.log("dararayd,s,msmsl", action.payload);

      state.searchTerm = action.payload;
    },
    searchAllProjectDataRemove(state, action) {
      projectAdaptor.removeAll(state, action);
    },
  },
  extraReducers: {
    [fetchProjectDetails.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchProjectDetails.fulfilled]: (state, action) => {
      state.status = "succeeded";

      state.tablesList = action.payload;
      console.log(action.payload, "succeeded-projectData");
      projectAdaptor.removeAll(state);
      var arr = [];
      console.log(arr, "arrarr");

      var investorCount = 0;

      var validatorCount = 0;
      var investor = 0;
      var validator = 0;
      var overall = 0;
      var main = 0;
      var divideValidator = 0;
      var divideOverall = 0;
      var divideInvestor = 0;
      if (action.payload.getProject?.rating?.length > 0) {
        for (var i = 0; i < action.payload.getProject?.rating?.length; i++) {
          overall =
            overall +
            action.payload.getProject?.rating[i].business_model +
            action.payload.getProject?.rating[i].market_validation +
            action.payload.getProject?.rating[i].team +
            action.payload.getProject?.rating[i].tokenomics;
          if (action.payload.getProject?.rating[i].user_role == "Investor") {
            investor =
              investor +
              action.payload.getProject?.rating[i].business_model +
              action.payload.getProject?.rating[i].market_validation +
              action.payload.getProject?.rating[i].team +
              action.payload.getProject?.rating[i].tokenomics;
            investorCount++;
          } else if (
            action.payload.getProject?.rating[i].user_role == "Validator"
          ) {
            validator =
              validator +
              action.payload.getProject?.rating[i].business_model +
              action.payload.getProject?.rating[i].market_validation +
              action.payload.getProject?.rating[i].team +
              action.payload.getProject?.rating[i].tokenomics;
            validatorCount++;
          } else {
            validator = validator;
            investor = investor;
          }
        }
        if (investor == 0) {
          divideInvestor = 0;
        } else {
          // / 2
          divideInvestor = investor / investorCount / 4;
          divideInvestor = Number(divideInvestor.toFixed(1));
        }

        if (validator == 0) {
          divideValidator = 0;
        } else {
          // / 2
          divideValidator = validator / validatorCount / 4;
          divideValidator = Number(divideValidator.toFixed(1));
        }
        if (overall == 0) {
          divideOverall = 0;
        } else {
          divideOverall =
            overall / action.payload.getProject?.rating?.length / 4;
          divideOverall = Number(divideOverall.toFixed(1));
        }
      } else {
        divideOverall = 0;
        divideValidator = 0;
        divideInvestor = 0;
        main = 0;
        // divide = 0
      }

      arr.push({
        divideOverall,
        divideValidator,
        divideInvestor,
        ...action.payload.getProject,
      });

      console.log(arr, "divideInvestorarr");
      arr.map((data) => projectAdaptor.addOne(state, data));
    },
  },
});

export const { searchAllProjectDataRemove, updateTable } =
  ProjectDetailsSlice.actions;

export default ProjectDetailsSlice.reducer;
export const { selectAll: selectAllProjectDetails } =
  projectAdaptor.getSelectors((state) => state.projectData);
