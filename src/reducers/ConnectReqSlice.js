import { createSlice, createEntityAdapter, createSelector, createAsyncThunk } from '@reduxjs/toolkit';
import { apiURI, client } from '../config/config';
import { gql } from '@apollo/client';
import 'regenerator-runtime/runtime'
import randomColor from "randomcolor";



const PRODUCTS = gql` 
query AllSentRequest($user: ID) {
  allSentRequest(user: $user) {
    _id

    receiver {
      _id
      first_name
      last_name
      fund_logo
      fund_name
      role
    }
    sender_status
    receiver_status
    sender {
      _id
      role
    }
    project {
      _id
      logo
      project_name
    }
  }

    allReceivedRequest(user: $user) {
     _id
     sender_status
     receiver_status
     sender {
       _id
       first_name
       last_name
       fund_logo
       fund_name
       role
     }
     receiver {
       role
     }
     project {
       _id
       project_name
       logo
     }
   }

    allChats(user: $user) {
        messages {
          sender {
            first_name
            last_name
            fund_name
            _id
          }
          receiver {
            first_name
            last_name
            fund_name
            _id
          }
          body
          createdAt
        }
      }
  }
  
`;

const connectRequestAdapter = createEntityAdapter();
const initialState = connectRequestAdapter.getInitialState({
  status: "idle",
  error: null,
  searchTerm: "",
  buget: []
});






export const fetchConnectReq = createAsyncThunk('connectRequest/fetchConnectReq', async (item) => {
  console.log("funding", item);

  var query = `
  query AllSentRequest($user: ID) {
    allSentRequest(user: $user) {
      _id
  
      receiver {
        _id
        first_name
        last_name
        fund_logo
        fund_name
        role
      }
      sender_status
      receiver_status
      sender {
        _id
        role
      }
      project {
        _id
        logo
        project_name
      }
    }
  
      allReceivedRequest(user: $user) {
       _id
       sender_status
       receiver_status
       sender {
         _id
         first_name
         last_name
         fund_logo
         fund_name
         role
       }
       receiver {
         role
       }
       project {
         _id
         project_name
         logo
       }
     }
  
      allChats(user: $user) {
          messages {
            sender {
              first_name
              last_name
              fund_name
              _id
            }
            receiver {
              first_name
              last_name
              fund_name
              _id
            }
            body
            createdAt
            _id
          }
        user {
          _id
          first_name
          last_name
          profile_pic
          role
          email
          linkedin
          twitter_link
          telegram_link
          fund_name
          fund_logo
          role_in_organization
        }
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
        variables: { "user": item }
      })
    })
      .then((response) => {

        const json = response.json();
        return json;
      })

  // console.log("===================sss===============", response);
  console.log("===================sssdatareqSlice===============", response.data);
  //  console.log("===================sssjson===============",response.json());
  return response.data;

})




export const BudgetProjectSlice = createSlice({
  name: 'connectRequest',
  initialState,
  reducers: {

    searchTerm: (state, action) => {

      console.log("dararayd,s,msmsl", action.payload);

      state.searchTerm = action.payload;
    },
    searchallconnect(state, action) {

      connectRequestAdapter.removeAll(state);

    }

  },
  extraReducers: {
    [fetchConnectReq.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchConnectReq.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      console.log(action.payload, "succeeded");
      connectRequestAdapter.removeAll(state);

      var sendRequest = []
      var receivedRequest = []
      var chatData = []
      if (action.payload?.allSentRequest != null && action.payload?.allSentRequest != undefined && action.payload?.allSentRequest.length > 0) {
        sendRequest = action.payload?.allSentRequest
      } else {
        sendRequest = []
      }

      if (action.payload?.allReceivedRequest != null && action.payload?.allReceivedRequest != undefined && action.payload?.allReceivedRequest.length > 0) {
        receivedRequest = action.payload?.allReceivedRequest
      } else {
        receivedRequest = []
      }


      if (action.payload?.allChats != null && action.payload?.allChats != undefined && action.payload?.allChats.length > 0) {
        var dataofChat = action.payload?.allChats
        // // dataofChat.reduce((chat))
        var newdataofChatData = ''
        // if(dataofChat.length > 0){
        //   for(let i = 0;i<dataofChat.length;i++){
        //     newdataofChatData = dataofChat[i]?.messages?.reduce(function (rv, x) {

        //       (rv?.createdAt == x?.createdAt || []).push(x);
        //       return rv;
        //     }, {})


        //  console.log(newdataofChatData,"newdataofChatData");
        //   }
        // }
        var allChats = []
        if (dataofChat.length > 0) {


          for (let i = 0; i < dataofChat.length; i++) {
            let messages = []
            if (dataofChat[i]?.messages.length > 0) {
              for (let j = 0; j < dataofChat[i]?.messages.length; j++) {
                let sender = dataofChat[i]?.messages[j].sender
                let receiver = dataofChat[i]?.messages[j].receiver
                let createdAt = dataofChat[i]?.messages[j].createdAt
                let body = dataofChat[i]?.messages[j].body
                let _id = dataofChat[i]?.messages[j]._id
                // let {sender,receiver,body} = current;
                // let {createdAt} = current;
                let splitDate = createdAt.split('T')
                let time = splitDate[1].split('.')
                messages.push({
                  sender,
                  receiver,
                  body,
                  createdAt: splitDate[0],
                  time: time[0],
                  _id

                })
              }
              console.log(messages, "messages", dataofChat[i]?.messages.length);
            } else {
              messages = []
            }
            allChats.push({
              messages,
              user: dataofChat[i]?.user
            })


            // newdataofChatData = dataofChat[i]?.messages?.map((current)=>{

            //   let {createdAt} = current;
            //   let splitDate = createdAt.split('T')

            //   console.log(splitDate,"splitDate newdataofChatData");
            // })
            // let splitDate = createdAt.split('T')
            // return product.category;
          }



          var allChatsNewData = []
          for (let i = 0; i < allChats.length; i++) {
            let newdataofChatDataMesg = []
            let inin = []
            if (allChats[i]?.messages.length > 0) {
              newdataofChatDataMesg = allChats[i]?.messages?.reduce((prev, current, index) => {
                console.log(prev, current, index, "product in newdataofChatData");
                let { createdAt } = current;
                // prev[createdAt] = prev[createdAt] ?? [];
                // prev[createdAt].push(current);
                // inin.push({current,createdAt})
                if (prev.length == 0) {
                  var newArrayCurrent = [current]
                  prev = [{ current: newArrayCurrent, date: createdAt }]
                } else {
                  var countNew = 0
                  countNew = prev.findIndex((ji) => ji.date == createdAt)

                  if (countNew > -1) {
                    prev[countNew].current.push(current)

                  } else {
                    prev.push({ current: [current], date: createdAt })
                  }

                  console.log(countNew, 'countNew');
                  //  
                }



                return prev
              }, []);
            }
            console.log(inin, "inin");
            //  else {
            //   newdataofChatDataMesg = []
            // }
            console.log(newdataofChatDataMesg, "newdataofChatDataMesg", allChats.length, allChats[i]?.messages.length);
            allChatsNewData.push({
              messages: newdataofChatDataMesg,
              user: allChats[i]?.user
            })

          }
          console.log(allChatsNewData, "allChatsNew");
        }
        // console.log(newdataofChatData,"allChatsMainData");

        // chatData = allChats
        chatData = allChatsNewData
      } else {
        chatData = []
      }
      var arr = {
        sendRequest,
        receivedRequest,
        chatData
      }
      console.log(arr, "arrarrconnect");


      connectRequestAdapter.addOne(state, arr)



    }
  }
})

export const { searchallconnect } = BudgetProjectSlice.actions;


export default BudgetProjectSlice.reducer;
export const { selectAll: selectAllConnectRequest, } = connectRequestAdapter.getSelectors((state) => state.connectRequest);
