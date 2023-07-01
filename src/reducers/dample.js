import { createSlice, createEntityAdapter, createSelector, createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../utilities/client';
import { gql } from '@apollo/client';
import { useSelector, useDispatch } from "react-redux";


const PRODUCTS = gql`
query GetItems($count:Int)
{
products(first: $count) {
edges {
node {
id
name
description
}
}
}
}
`;



const tablesAdapter = createEntityAdapter();
const initialState = tablesAdapter.getInitialState({
    statussss: "idle",
    error: null,
    tablesList: [],

});



export const fetchTables = createAsyncThunk("tables/fetchTables", async (item) => {


    const date = new Date();

    //const d=date.prototype.toS()
    const datetime =
        date.getFullYear() +
        "-" +
        (date.getMonth() + 1) +
        "-" +
        date.getDate() +
        " " +
        date.getHours() +
        ":" +
        date.getMinutes() +
        ":" +
        date.getSeconds();



    let dataToSend = {

        token: item[0].tokenCreate[0].token,
        tym: datetime,
    };
    let formBody = [];
    for (let key in dataToSend) {
        let encodedKey = encodeURIComponent(key);
        let encodedValue = encodeURIComponent(dataToSend[key]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    const response = await fetch(
        item[0].link,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            },
            body: formBody,
        }
    );
    return response.json();
});

export const tablesSlice = createSlice({
    name: "tables",
    initialState,
    reducers: {
        updateTable(state, action) {
            console.log(state,action.payload,"updatedTable");
            state.tablesList = action.payload;
        },
    },
    extraReducers: {
        [fetchTables.pending]: (state, action) => {
            state.statussss = "loading";

        },
        [fetchTables.fulfilled]: (state, action) => {
            state.statussss = "succeeded";
            state.tablesList = action.payload;

            tablesAdapter.removeAll(state);


            var keyNames = Object.keys(action.payload);
            if (keyNames[0] === "takeawayviewArr") {
                const arr = action.payload.takeawayviewArr;
                const arr1 = [];
                for (let index = 0; index < arr.length; index++) {
                    arr1.push({
                        id: index.toString(),
                        username: arr[index].tabno,
                        userid: arr[index].aisle,
                        department: arr[index].reservetym,
                        departmentname: arr[index].qty,
                        deptid: arr[index].prepqty,
                        items: arr[index].reservedte,
                        customernam: arr[index].custnam,
                        amount: parseInt(arr[index].amount),
                        intime: arr[index].intime,
                        ordertakenby: arr[index].OrderTakenBy,
                        draftflag: arr[index].draftflag,
                        printsts: arr[index].printsts,
                        custid: arr[index].cusid,
                        pay: arr[index].paymode,
                        name: arr[index].takeawaytype,
                    });

                }

                for (let i = 0; i < arr1.length; i++) {
                    tablesAdapter.addOne(state, arr1[i]);
                }

            } else if (keyNames[0] === "BusyTableArr") {
                const arr = action.payload.BusyTableArr;
                const arr1 = [];
                for (let index = 0; index < arr.length; index++) {
                    arr1.push({
                        id: index.toString(),
                        username: arr[index].tabno,

                        departmentname: arr[index].qty,
                        deptid: arr[index].prepqty,
                        items: arr[index].reservedte,
                        customernam: arr[index].custnam,
                        amount: parseInt(arr[index].amount),
                        intime: arr[index].intime,
                        ordertakenby: arr[index].OrderTakenBy,
                        draftflag: arr[index].draftflag,
                        printsts: arr[index].printsts,
                        custid: arr[index].cusid,
                        pay: arr[index].paymode,
                        name: arr[index].takeawaytype,
                    });
                }

                for (let i = 0; i < arr1.length; i++) {
                    tablesAdapter.addOne(state, arr1[i]);
                }
            } else {
                const arr = action.payload.tableviewArr;
                const arr1 = [];
                for (let index = 0; index < arr.length; index++) {
                    arr1.push({
                        id: index.toString(),
                        username: arr[index].tabno,
                        userid: arr[index].aisle,
                        department: arr[index].reservetym,
                        departmentname: arr[index].qty,
                        deptid: arr[index].prepqty,
                        items: arr[index].reservedte,
                        customernam: arr[index].custnam,
                        amount: parseInt(arr[index].amount),
                        intime: arr[index].intime,
                        ordertakenby: arr[index].OrderTakenBy,
                        draftflag: arr[index].draftflag,
                        printsts: arr[index].printsts,
                        custid: arr[index].cusid,
                        pay: arr[index].paymode,
                        name: arr[index].takeawaytype,
                    });
                }

                // arr1.map((data)=>{
                // tablesAdapter.addOne(state, data);
                // })
                for (let i = 0; i < arr1.length; i++) {
                    tablesAdapter.addOne(state, arr1[i]);
                }
            }






        },
        [fetchTables.rejected]: (state, action) => {
            state.statussss = "failed";
            state.error = action.error.message;
        },
    },
});

export const { updateTable } = tablesSlice.actions;

export default tablesSlice.reducer;
export const {
    selectAll: selectAllTables,
    selectEntities: select,
} = tablesAdapter.getSelectors((state) => state.tables);




//export const selectAllBillItems = (state) => state.items.billItems;