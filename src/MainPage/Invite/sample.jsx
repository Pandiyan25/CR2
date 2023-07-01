try {
    const query = `mutation Mutation($input: InviteMailInput) {
            inviteFounder(input: $input)
          }`;
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
                input: {


                    "name": Name,
                    "email": emailId,
                    "role": "Founder",
                    "user": loginId



                    // "email": email,
                    // "password": '123456',
                    // "role": Role,
                    // "first_name": name,
                }
            }

        })
    })
        .then((response) => {

            const json = response.json();
            return json;
        })
        .then(data => {
            // alert('Mail has been sent to ' + data);
            console.log(data.data?.inviteFounder, "data?.inviteFounder");
            if (data.data?.inviteFounder == "Success") {

                console.log(data.data?.inviteFounder, "data.data?.inviteFounder1");
                // alert('Mail has been sent to ' + email);
                toast.success('Mail has been sent to ' + email, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            // }
        } else if (data?.data?.inviteFounder != null && data?.data?.inviteFounder != undefined && data?.data?.inviteFounder != '' && data?.data?.inviteFounder == 'Email_already_exists') {

            toast.error(' The entered mail already exists. Please register using a different mail ID', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        } else if (data?.data?.inviteFounder != null && data?.data?.inviteFounder != undefined && data?.data?.inviteFounder != '' && data?.data?.inviteFounder == 'Email_has_already_sent') {
            alert('Mail has already sent to this account')
            // 
        }
        //  else {
            // setShowEmailError(true)
        // }
            
            else {

                console.log(data.data?.inviteFounder, "data.data?.inviteFounder2");
                toast.error(' The entered mail already exists. Please register using a different mail ID', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            }

        })
} catch (error) {
    console.log(error, "");
}