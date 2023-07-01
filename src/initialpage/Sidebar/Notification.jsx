import { fetchNotificationDetails } from "../../reducers/NotificationsSlice";
import React, { Component, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { apiURI } from "../../config/config";


const dispatch = useDispatch();

async function createNotifFunc(a,b) {
    console.log(a,b,"===========aaaa==========");
    try {

      var query =
        `
      mutation Mutation($input: NotificationInput) {
        createNotification(input: $input) {
          _id
          message
          status
        
          module_id
          module
        }
      }
       `;
      fetch(apiURI.URL, {
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
          variables: {
            "input": {
              "message": null,
              "user": null,
              "status": "null"
            }
          }
        })
      })
        .then((response) => {

          const json = response.json();
          return json;
        })
        .then(data => {
        //   dispatch(fetchNotificationDetails(loginId))
        //   toast.success('Has been Created', {
        //     position: "top-right",
        //     autoClose: 3000,
        //     hideProgressBar: false,
        //     closeOnClick: true,
        //     pauseOnHover: true,
        //     draggable: true,
        // });
        });

    } catch (error) {
      console.log(error, "ProjectGetFunctionError  in Dashboard in investors error");
    }
  }


  
export default createNotifFunc