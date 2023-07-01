import { gql, useMutation } from '@apollo/client';
import React, { useState } from 'react';

import { Button, Modal, } from "react-bootstrap";
import 'material-react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'material-react-toastify';

import { FacebookShareButton, TwitterShareButton, WhatsappShareButton, PinterestShareButton, WorkplaceShareButton, RedditShareButton, TelegramShareButton, EmailShareButton, WeiboShareButton } from "react-share";
import { FacebookIcon, TwitterIcon, WhatsappIcon, InstapaperIcon, TelegramIcon, EmailIcon, HatenaIcon, OKIcon, PocketIcon, RedditIcon, TumblrIcon, ViberIcon, WeiboIcon, WorkplaceIcon, PinterestIcon } from "react-share";
import linkedin from 'sharer.js'
import { IconCopy,IconCheck } from '@tabler/icons';
import './roadMap.css'
import { useSelector } from 'react-redux';
import ReactTooltip from 'react-tooltip';
// import {Gmail} from 'sharer.js'

function SocialMediaSharePage({ handleClose, show }) {
    const [copiedBol,setcopiedBol] = useState(false)

    const projectIdData = useSelector((state) => state.constVar.projectId)

    const copylink = () => {
        navigator.clipboard.writeText(`https://project.sharing.crsquare.finance/?${projectIdData}`)
        setcopiedBol(true)
        // toast.success('Copied', {
        //     position: "top-right",
        //     autoClose: 3000,
        //     hideProgressBar: false,
        //     closeOnClick: true,
        //     pauseOnHover: true,
        //     draggable: true,
        // });
        setTimeout(() => {
            setcopiedBol(false)
              }, 2000);
    }

    return (
        <>


            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size="xs"
            >
                <Modal.Header closeButton style={{ borderBottom: '0px' }}>
                    <Modal.Title>Share via </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="" style={{ display: 'flex', margin: '10px', width: '100%', justifyContent: 'space-evenly' }}>
                            {/* <PinterestShareButton
                            url={"https://peing.net/ja/"}
                            hashtag={"Check and rate our project on CR Square Guardian Platform"}
                            className="Demo__some-network__share-button"
                        >

                            <PinterestIcon size={54} round />
                        </PinterestShareButton>
                        <WorkplaceShareButton
                            url={"https://peing.net/ja/"}
                            hashtag={"Check and rate our project on CR Square Guardian Platform"}
                            className="Demo__some-network__share-button"
                        >

                            <WorkplaceIcon size={54} round />
                        </WorkplaceShareButton> */}

                            <RedditShareButton
                                url={`https://project.sharing.crsquare.finance/?${projectIdData}`}
                                hashtag={"Check and rate our project on CR Square Guardian Platform"}
                                className="Demo__some-network__share-button"
                            >

                                <RedditIcon size={42} round />
                            </RedditShareButton>
                            <WeiboShareButton
                                url={`https://project.sharing.crsquare.finance/?${projectIdData}`}
                                hashtag={"Check and rate our project on CR Square Guardian Platform"}
                                // description={"aiueo"}
                                className="Demo__some-network__share-button"
                            >
                                <WeiboIcon size={42} round />

                            </WeiboShareButton>
                            {/* <HatenaIcon size={42} round /> */}
                            <FacebookShareButton
                                url={`https://project.sharing.crsquare.finance/?${projectIdData}`}
                                hashtag={"Check and rate our project on CR Square Guardian Platform"}
                                // description={"aiueo"}
                                className="Demo__some-network__share-button"
                            >
                                <FacebookIcon size={42} round />
                            </FacebookShareButton>
                            <br />
                            <EmailShareButton
                                url={`https://project.sharing.crsquare.finance/?${projectIdData}`}
                                hashtag={"Check and rate our project on CR Square Guardian Platform"}
                                // description={"aiueo"}
                                className="Demo__some-network__share-button"
                            >
                                <EmailIcon size={42} round />
                            </EmailShareButton>
                            <br />

                            <TwitterShareButton
                                title={"Check and rate our project on CR Square Guardian Platform"}
                                url={`https://project.sharing.crsquare.finance/?${projectIdData}`}
                            // hashtags={["CRYPTO", "CRYPTO"]}
                            >
                                <TwitterIcon size={42} round />

                            </TwitterShareButton>
                            <br />
                            <WhatsappShareButton
                                title={"Check and rate our project on CR Square Guardian Platform"}
                                url={`https://project.sharing.crsquare.finance/?${projectIdData}`}
                            // hashtags={["CRYPTO", "CRYPTO"]}
                            >
                                <WhatsappIcon size={42} round />

                            </WhatsappShareButton>
                            <br />
                            <TelegramShareButton
                                title={"Check and rate our project on CR Square Guardian Platform"}
                                url={`https://project.sharing.crsquare.finance/?${projectIdData}`}
                            // hashtags={["CRYPTO", "CRYPTO"]}
                            >
                                <TelegramIcon size={42} round />

                            </TelegramShareButton>
                            {copiedBol == true ? 
                               <Button className="maianButn react-share__ShareButton" style={{ borderRadius: '50%' ,background:'white'}}  data-tip="Copied">
                                <ReactTooltip place="top" type="info" effect="solid" />
                               <IconCheck style={{ width: '20px',color:'green' }}  />
                           </Button>
                            :
                            <Button className="maianButn react-share__ShareButton" style={{ borderRadius: '50%' }} >
                            <IconCopy style={{ width: '20px' }} onClick={() =>
                                copylink()} />
                        </Button>
                        
                        }
                            {/* <button >Copy Link</button> */}
                         



                        </div>

                    </div>

                </Modal.Body>
                {/* <Modal.Footer style={{ borderTop: '0px', justifyContent: 'end' }}>
                    <div className="submit-section">
                        <button className="btn  submit-btn" onClick={() => changeData()} style={{ background: 'white', border: '1px solid #00c5fb', color: '#00c5fb' }}>CANCEL</button>
                    </div>
                    


                </Modal.Footer> */}



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



            </Modal>
        </>
    );
}

export default SocialMediaSharePage;