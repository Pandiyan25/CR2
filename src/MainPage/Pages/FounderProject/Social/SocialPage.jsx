


import React, { useEffect, useState } from 'react';
import SocialModal from './SocialModal';
import { useSelector } from 'react-redux';
import { apiURI } from '../../../../config/config';
// import { useToast } from 'react-toastify';
import { ToastContainer, toast } from 'material-react-toastify';

import 'material-react-toastify/dist/ReactToastify.css';
// import 'react-toastify/dist/ReactToastify.css';
const SocialPage = () => {
    // const toast = useToast()

    const [checkData, setcheckData] = useState('')

    const projectNumber = useSelector((state) => state.constVar.projectId)
    const loginId = useSelector((state) => state.constVar.loginId)
    const [twitter, settwitter] = useState('')
    const [Instagram, setInstagram] = useState('')
    const [Medium, setMedium] = useState('')
    const [facebook, setfacebook] = useState('')
    const [LinkedIn, setLinkedIn] = useState('')

    const [Discord, setDiscord] = useState('')
    const [Reddit, setReddit] = useState('')
    const [youTube, setyouTube] = useState('')
    const [Telegram, setTelegram] = useState('')
    const [show, setShow] = useState(false)
    const handleShow = () => {
        setShow(true)
    }
    const handleCloseShow = () => {
        getSocialMediaDataFunc()
        setShow(false)
    }

    const getSocialMediaDataFunc = () => {
        try {
            var query = `
            query Query($project: ID) {
                allProjectSocials(project: $project) {
                  _id
                  twitter
                  instagram
                  medium
                  facebook
                  linkedin
                  discord
                  telegram
                  reddit
                  youtube
                }
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

                        "project": projectNumber,
                    }

                })
            })
                .then((response) => {

                    const json = response.json();
                    return json;
                })
                .then(data => {
                    if (data?.data?.allProjectSocials != null && data?.data?.allProjectSocials != undefined) {

                        setcheckData(data?.data?.allProjectSocials[0]._id)
                        settwitter(data?.data?.allProjectSocials[0].twitter)
                        setInstagram(data?.data?.allProjectSocials[0].instagram)
                        setMedium(data?.data?.allProjectSocials[0].medium)
                        setfacebook(data?.data?.allProjectSocials[0].facebook)
                        setLinkedIn(data?.data?.allProjectSocials[0].linkedin)
                        setDiscord(data?.data?.allProjectSocials[0].discord)
                        setReddit(data?.data?.allProjectSocials[0].reddit)
                        setyouTube(data?.data?.allProjectSocials[0].youtube)

                        setTelegram(data?.data?.allProjectSocials[0].telegram)
                    } else {
                        setcheckData('')
                    }
                })

        } catch (error) {
            console.log(error, "funding in Project");
        }
    }
    const createSocialFunc = () => {
        try {
            var query = `
            mutation Mutation($input: ProjectSocialInput) {
                createProjectSocial(input: $input) {
                  _id
                  
                  twitter
                  instagram
                  medium
                  facebook
                  linkedin
                  discord
                  telegram
                  reddit
                  youtube
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
                            "youtube": youTube,
                            "twitter": twitter,
                            "telegram": Telegram,
                            "reddit": Reddit,
                            "project": projectNumber,
                            "linkedin": LinkedIn,
                            "instagram": Instagram,
                            "facebook": facebook,
                            "discord": Discord,
                            "medium": Medium
                        }
                    }

                })
            })
                .then((response) => {

                    const json = response.json();
                    return json;
                })
                .then(data => {
                    getSocialMediaDataFunc()
                    handleCloseShow()

                    // toast.success("Success Notification !", {
                    //     position: toast.POSITION.TOP_CENTER
                    //   });
                    // toast({
                    //     title: `The value got changed to !`,
                    //     status: 'success',
                    //     duration: 2000,
                    //   })

                    if (data?.data?.createProjectSocial != null && data?.data?.createProjectSocial != undefined && data?.data?.createProjectSocial?._id != '') {
                        toast.success('Your Changes Have been Saved', {
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                        });
                    } else {

                        toast.error('Your changes cannot be saved', {
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
            console.log("adding new projectDetail error");
        }


    }
    const updateSocialFunc = () => {
        try {
            var query = `
            mutation Mutation($id: ID, $input: ProjectSocialInput) {
                updateProjectSocial(_id: $id, input: $input) {
                  _id
                  
                  twitter
                  instagram
                  medium
                  facebook
                  linkedin
                  discord
                  telegram
                  reddit
                  youtube
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
                        "id": checkData,
                        "input": {
                            "youtube": youTube,
                            "twitter": twitter,
                            "telegram": Telegram,
                            "reddit": Reddit,
                            "project": projectNumber,
                            "linkedin": LinkedIn,
                            "instagram": Instagram,
                            "facebook": facebook,
                            "discord": Discord,
                            "medium": Medium
                        }
                    }

                })
            })
                .then((response) => {

                    const json = response.json();
                    return json;
                })
                .then(data => {
                    getSocialMediaDataFunc()
                    handleCloseShow()
                    // toast.success("Success Notification !", {
                    //     position: toast.POSITION.TOP_CENTER
                    //   });
                    // toast({
                    //     title: `The value got changed to !`,
                    //     status: 'success',
                    //     duration: 2000,
                    //   })
                    if (data?.data?.updateProjectSocial != null && data?.data?.updateProjectSocial != undefined && data?.data?.updateProjectSocial?._id != '') {
                        toast.success('Your Changes Have been Saved', {
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                        });
                    } else {

                        toast.error('Your changes cannot be saved', {
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
            console.log("adding new projectDetail error");
        }


    }

    useEffect(() => {
        console.log(loginId, "funding Log1");
        if (loginId != '') {
            getSocialMediaDataFunc()
            console.log(loginId, "funding Log2");
        }

    }, [loginId])

    const opennewWindow = (i) => {
        // window.open(`https://${i}`)
        window.open(i, '_blank').focus();
    }



    const notify = () => {

    }

    return (

        <div className="card card-table">

            <div className="card-body" style={{ padding: '10px' }}>

                <div className="col-md-12" style={{ padding: '0px' }}>
                    <div className="profile-view" style={{ margin: '10px' }}>


                        <h3 className="card-title">Socials</h3>
                        <div className="">
                            <table style={{ width: '100%' }}>
                                <tbody>
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%', padding: '10px 0px' }}>Twitter:</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', color: '#6345ED', textDecoration: 'underline', cursor: 'pointer' }} onClick={() => { opennewWindow(twitter) }} >{twitter != null && twitter != undefined && twitter}</td>
                                    </tr>

                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Instagram:</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', color: '#6345ED', textDecoration: 'underline', cursor: 'pointer' }} onClick={() => { opennewWindow(Instagram) }}>{Instagram != null && Instagram != undefined && Instagram}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Medium:</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', color: '#6345ED', textDecoration: 'underline', cursor: 'pointer' }} onClick={() => { opennewWindow(Medium) }}>{Medium != null && Medium != undefined && Medium}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>FaceBook:</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', color: '#6345ED', textDecoration: 'underline', cursor: 'pointer' }} onClick={() => { opennewWindow(facebook) }}>{facebook != null && facebook != undefined && facebook}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>LinkedIn:</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', color: '#6345ED', textDecoration: 'underline', cursor: 'pointer' }} onClick={() => { opennewWindow(LinkedIn) }}>{LinkedIn != null && LinkedIn != undefined && LinkedIn}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Discord:</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', color: '#6345ED', textDecoration: 'underline', cursor: 'pointer' }} onClick={() => { opennewWindow(Discord) }}>{Discord != null && Discord != undefined && Discord}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Telegram:</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', color: '#6345ED', textDecoration: 'underline', cursor: 'pointer' }} onClick={() => { opennewWindow(Telegram) }}>{Telegram != null && Telegram != undefined && Telegram}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Reddit:</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', color: '#6345ED', textDecoration: 'underline', cursor: 'pointer' }} onClick={() => { opennewWindow(Reddit) }}>{Reddit != null && Reddit != undefined && Reddit}</td>
                                    </tr>

                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Youtube:</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', color: '#6345ED', textDecoration: 'underline', cursor: 'pointer' }} onClick={() => { opennewWindow(youTube) }}>{youTube != null && youTube != undefined && youTube}</td>
                                    </tr>

                                    <tr>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="pro-edit"><button className="edit-icon" onClick={() => handleShow()}><i className="fa fa-pencil" /></button></div>

                    </div>
                </div>
                {/* <div style={{marginTop:'40px',textAlign:'end'}}>
                    <button className="btn buttonInProposal1 submit-btn">SAVE</button>
                </div> */}

            </div>
            <SocialModal
                show={show}
                handleClose={handleCloseShow}

                checkData={checkData}
                setcheckData={setcheckData}
                twitter={twitter}
                settwitter={settwitter}
                Instagram={Instagram}
                setInstagram={setInstagram}
                Medium={Medium}
                setMedium={setMedium}
                facebook={facebook}
                setfacebook={setfacebook}
                LinkedIn={LinkedIn}
                setLinkedIn={setLinkedIn}
                Discord={Discord}
                setDiscord={setDiscord}
                Reddit={Reddit}
                setReddit={setReddit}
                Telegram={Telegram}
                setTelegram={setTelegram}

                updateSocialFunc={updateSocialFunc}
                createSocialFunc={createSocialFunc}
                youTube={youTube}
                setyouTube={youTube}
            />
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>


    );
}
export default SocialPage;
