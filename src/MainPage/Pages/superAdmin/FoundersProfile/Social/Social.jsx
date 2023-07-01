


import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { apiURI } from '../../../../../config/config';


const SocialPage = () => {

    const [checkData, setcheckData] = useState('')

    
    const projectNumber = useSelector((state) => state.constVar.projectIdSuperAdmin)

    const loginId = useSelector((state) => state.constVar.profileIdValidator)
    const [twitter, settwitter] = useState('')
    const [Instagram, setInstagram] = useState('')
    const [Medium, setMedium] = useState('')
    const [facebook, setfacebook] = useState('')
    const [LinkedIn, setLinkedIn] = useState('')

    const [Discord, setDiscord] = useState('')
    const [Reddit, setReddit] = useState('')
    const [youTube, setyouTube] = useState('')
    const [Telegram, setTelegram] = useState('')
    

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
   
  

    useEffect(() => {
        console.log(loginId, "funding Log1");
        if (loginId != '') {
            getSocialMediaDataFunc()
            console.log(loginId, "funding Log2");
        }

    }, [loginId])

    const opennewWindow = (i) =>{
        // window.open(`https://${i}`)
        window.open(i, '_blank').focus();
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
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' ,color:'#6345ED',textDecoration:'underline'}} onClick={()=>{opennewWindow(twitter)}} >{twitter != null && twitter != undefined && twitter}</td>
                                    </tr>

                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Instagram:</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' ,color:'#6345ED',textDecoration:'underline'}}  onClick={()=>{opennewWindow(Instagram)}}>{Instagram != null && Instagram != undefined && Instagram}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Medium:</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px',color:'#6345ED',textDecoration:'underline' }}  onClick={()=>{opennewWindow(Medium)}}>{Medium != null && Medium != undefined && Medium}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>FaceBook:</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px',color:'#6345ED',textDecoration:'underline' }}  onClick={()=>{opennewWindow(facebook)}}>{facebook != null && facebook != undefined && facebook}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>LinkedIn:</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px',color:'#6345ED',textDecoration:'underline' }}  onClick={()=>{opennewWindow(LinkedIn)}}>{LinkedIn != null && LinkedIn != undefined && LinkedIn}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Discord:</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px',color:'#6345ED',textDecoration:'underline' }}  onClick={()=>{opennewWindow(Discord)}}>{Discord != null && Discord != undefined && Discord}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Telegram:</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px',color:'#6345ED',textDecoration:'underline' }}  onClick={()=>{opennewWindow(Telegram)}}>{Telegram != null && Telegram != undefined && Telegram}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Reddit:</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px',color:'#6345ED',textDecoration:'underline' }}  onClick={()=>{opennewWindow(Reddit)}}>{Reddit != null && Reddit != undefined && Reddit}</td>
                                    </tr>

                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Youtube:</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px',color:'#6345ED',textDecoration:'underline' }}  onClick={()=>{opennewWindow(youTube)}}>{youTube != null && youTube != undefined && youTube}</td>
                                    </tr>

                                    <tr>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                      
                    </div>
                </div>
                {/* <div style={{marginTop:'40px',textAlign:'end'}}>
                    <button className="btn buttonInProposal1 submit-btn">SAVE</button>
                </div> */}

            </div>
           
        </div>


    );
}
export default SocialPage;
