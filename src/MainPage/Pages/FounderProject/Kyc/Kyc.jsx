


import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { apiURI } from '../../../../config/config';
import KYCModal from './KYCModal';
import { ToastContainer, toast } from 'material-react-toastify';

import 'material-react-toastify/dist/ReactToastify.css';


const KYCPage = () => {

    const [checkData, setcheckData] = useState('')









    

    const [educationErr, setEducationErr] = useState(false)
    const [CurIncomeErr, setCurIncomeErr] = useState(false)
    const [CurrLocErr, setCurrLocErr] = useState(false)
    const [natonalityErr, setnatonalityErr] = useState(false)
    const [idProofErr, setidProofErr] = useState(false)
    const [idNumErr, setidNumErr] = useState(false)
    const [regOfficeEntErr, setregOfficeEntErr] = useState(false)
    const [judLegalEntyErr, setjudLegalEntyErr] = useState(false)
    const [legalEntyErr, setlegalEntyErr] = useState(false)
    const [incorpErr, setincorpErr] = useState(false)
    const [incorporatedErr, setincorporatedErr] = useState(false)
    const [lawsEntyErr, setlawsEntyErr] = useState(false)

    const [membEntyErr, setmembEntyErr] = useState(false)
    const projectNumber = useSelector((state) => state.constVar.projectId)
    const loginId = useSelector((state) => state.constVar.loginId)
    const [Education, setEducation] = useState('')
    const [Experience, setExperience] = useState('')
    const [Industry, setIndustry] = useState('')
    const [expInBlockChain, setexpInBlockChain] = useState('')
    const [publicLaunchPrice, setpublicLaunchPrice] = useState('')

    const [totalTokenSupply, settotalTokenSupply] = useState('')
    const [exptTokenGen, setexptTokenGen] = useState('')
    const [totalTokenSupplyBreakUp, settotalTokenSupplyBreakUp] = useState('')
    const [youTube, setyouTube] = useState('')
    const [Telegram, setTelegram] = useState('')
    const [currentRole, setCurrentRole] = useState('')
    const [pastOrgTags, setpastOrgTags] = useState('')
    const [currentIncome, setcurrentIncome] = useState('')
    const [CurrLoc, setCurrLoc] = useState('')
    const [natonality, setnatonality] = useState('')
    const [idProof, setidProof] = useState('')
    const [idNum, setidNum] = useState('')
    const [incorporated, setincorporated] = useState('')
    const [legalEnty, setlegalEnty] = useState('')
    const [judLegalEnty, setjudLegalEnty] = useState('')
    const [regOfficeEnt, setregOfficeEnt] = useState('')
    const [incorp, setincorp] = useState('')
    const [lawsEnty, setlawsEnty] = useState('')
    const [membEnty, setmembEnty] = useState('')
    const [diroEnty, setdiroEnty] = useState('')
    const [show, setShow] = useState(false)
    const handleShow = () => {
        setShow(true)
    }
    const handleCloseShow = () => {
        getKycDataFunc()
        setShow(false)
    }

    const getKycDataFunc = () => {
        try {
            var query = `
            query AllProjectKYCs($project: ID) {
                allProjectKYCs(project: $project) {
                  _id
                  
                  education
                  experience
                  industry
                  experience_in_blockchain_industry
                  public_launch_price
                  expected_token_generation_event_
                  total_token_supply_
                  token_supply_breakup
                  current_role
                  past_organization_tags
                  current_income
                  current_location
                  nationality
                  id_proof
                  id_number
                  identity_picture
                  are_you_incorporated
                  name_of_legal_entity
                  jurisdiction_of_legal_entity
                  registered_office_of_legal_entity
                  certificate_of_incorporation
                  memorandum_articles_bye_laws_of_the_entity
                  register_of_members_of_the_entity
                  register_of_directors_of_the_entity
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

                        "project": projectNumber,
                    }

                })
            })
                .then((response) => {

                    const json = response.json();
                    return json;
                })
                .then(data => {
                    if (data?.data?.allProjectKYCs != null && data?.data?.allProjectKYCs != undefined && data?.data?.allProjectKYCs.length > 0) {

                        setcheckData(data?.data?.allProjectKYCs[0]._id)
                        setEducation(data?.data?.allProjectKYCs[0].education)
                        setExperience(data?.data?.allProjectKYCs[0].experience)
                        setIndustry(data?.data?.allProjectKYCs[0].industry)
                        setexpInBlockChain(data?.data?.allProjectKYCs[0].experience_in_blockchain_industry)
                        setpublicLaunchPrice(data?.data?.allProjectKYCs[0].public_launch_price)
                        setexptTokenGen(data?.data?.allProjectKYCs[0].expected_token_generation_event_)
                        settotalTokenSupplyBreakUp(data?.data?.allProjectKYCs[0].token_supply_breakup)
                        settotalTokenSupply(data?.data?.allProjectKYCs[0]?.total_token_supply_)
                        setCurrentRole(data?.data?.allProjectKYCs[0]?.current_role)
                        setpastOrgTags(data?.data?.allProjectKYCs[0]?.past_organization_tags)
                        setcurrentIncome(data?.data?.allProjectKYCs[0]?.current_income)
                        setCurrLoc(data?.data?.allProjectKYCs[0]?.current_location)
                        setnatonality(data?.data?.allProjectKYCs[0]?.nationality)
                        setidProof(data?.data?.allProjectKYCs[0]?.id_proof)
                        setidNum(data?.data?.allProjectKYCs[0]?.id_number)
                        setincorporated(data?.data?.allProjectKYCs[0]?.are_you_incorporated)
                        setlegalEnty(data?.data?.allProjectKYCs[0]?.name_of_legal_entity)
                        setjudLegalEnty(data?.data?.allProjectKYCs[0]?.jurisdiction_of_legal_entity)
                        setregOfficeEnt(data?.data?.allProjectKYCs[0]?.registered_office_of_legal_entity)
                        setincorp(data?.data?.allProjectKYCs[0]?.certificate_of_incorporation)
                        setlawsEnty(data?.data?.allProjectKYCs[0]?.memorandum_articles_bye_laws_of_the_entity)
                        setmembEnty(data?.data?.allProjectKYCs[0]?.register_of_members_of_the_entity)
                        setdiroEnty(data?.data?.allProjectKYCs[0]?.register_of_directors_of_the_entity)















                    } else {
                        setcheckData([])
                    }
                })

        } catch (error) {
            console.log(error, "funding in Project");
        }
    }
    const createKycDataFunc = () => {
        console.log("...........create.............");
        if (Education != '' && currentIncome != '' && CurrLoc != '' &&
        natonality != '' &&
        idProof != '' && idNum != '' && incorp != '' && legalEnty != '' &&
        judLegalEnty != '' && regOfficeEnt != '' && incorporated != '' &&
        lawsEnty != '' && membEnty != ''
    ){
        try {
            var query = `
            mutation Mutation($input: KYCInput) {
                createProjectKYC(input: $input) {
                  _id
                  
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
                    variables:
                    {
                        // "input": {
                        //     "total_token_supply": totalTokenSupply,
                        //     "token_supply_breakup": totalTokenSupplyBreakUp,
                        //     "public_launch_price": publicLaunchPrice,
                        //     "project": projectNumber,
                        //     "industry": Industry,
                        //     "experience_in_blockchain": expInBlockChain,
                        //     "experience": Experience,
                        //     "expected_token_generation_event": exptTokenGen,
                        //     "education": Education,

                        //     "current_role": currentRole,
                        //     "past_organization_tags": pastOrgTags,
                        //     'current_income': currentIncome,
                        //     'current_location': CurrLoc,
                        //     'nationality': natonality,
                        //     'id_proof': idProof,
                        //     'id_number': idNum,
                        //     'are_you_incorporated': incorporated,
                        //     'name_of_legal_entity': legalEnty,
                        //     'jurisdiction_of_legal_entity': judLegalEnty,
                        //     'registered_office_of_legal_entity': regOfficeEnt,
                        //     'certificate_of_incorporation': incorp,
                        //     'memorandum_articles_bye_laws_of_the_entity': lawsEnty,
                        //     'register_of_members_of_the_entity': membEnty,
                        //     'register_of_directors_of_the_entity': diroEnty
                        // }

                        "input": {
                            "project": projectNumber,
                            "education": Education,
                            "experience": Experience,
                            "industry": Industry,
                            "experience_in_blockchain_industry": expInBlockChain,
                            "public_launch_price": publicLaunchPrice,
                            "expected_token_generation_event_": exptTokenGen,
                            "total_token_supply_": totalTokenSupply,
                            "token_supply_breakup": totalTokenSupplyBreakUp,
                            "current_role": currentRole,
                            "past_organization_tags": pastOrgTags,
                            "current_income": currentIncome,
                            "current_location": CurrLoc,
                            "id_proof": idProof,
                            "id_number": idNum,
                            "nationality": natonality,
                            "identity_picture": null,
                            "are_you_incorporated": incorporated,
                            "name_of_legal_entity": legalEnty,
                            "jurisdiction_of_legal_entity": judLegalEnty,
                            "registered_office_of_legal_entity": regOfficeEnt,
                            "certificate_of_incorporation": incorp,
                            "register_of_members_of_the_entity": membEnty,
                            "register_of_directors_of_the_entity": diroEnty,
                            "memorandum_articles_bye_laws_of_the_entity": lawsEnty
                        }

                    }

                })
            })
                .then((response) => {

                    const json = response.json();
                    return json;
                })
                .then(data => {
                    getKycDataFunc()
                    handleCloseShow()
                    if (data?.data?.createProjectKYC != null && data?.data?.createProjectKYC != undefined && data?.data?.createProjectKYC != '') {
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
        else {
            if (Education != '') {
                setEducationErr(false)
            } else {
                setEducationErr(true)

            }
            if (currentIncome != '') {
                setCurIncomeErr(false)
            } else {
                setCurIncomeErr(true)

            }
            if (CurrLoc != '') {
                setCurrLocErr(false)
            } else {
                setCurrLocErr(true)

            }
            if (natonality != '') {
                setnatonalityErr(false)
            } else {
                setnatonalityErr(true)

            }
            if (idProof != '') {
                setidProofErr(false)
            } else {
                setidProofErr(true)

            }
            if (idNum != '') {
                setidNumErr(false)
            } else {
                setidNumErr(true)

            }
            if (incorp != '') {
                setincorpErr(false)
            } else {
                setincorpErr(true)

            }
            if (legalEnty != '') {
                setlegalEntyErr(false)
            } else {
                setlegalEntyErr(true)

            }
            if (
                judLegalEnty != '') {
                setjudLegalEntyErr(false)
            } else {
                setjudLegalEntyErr(true)

            }
            if (regOfficeEnt != '') {
                setregOfficeEntErr(false)
            } else {
                setregOfficeEntErr(true)

            }
            if (incorporated != '') {
                setincorporatedErr(false)
            } else {
                setincorporatedErr(true)

            }
            if (lawsEnty != '') {
                setlawsEntyErr(false)
            } else {
                setlawsEntyErr(true)

            }
            if (membEnty != '') {
                setmembEntyErr(false)
            } else {
                setmembEntyErr(true)

            }
            // alert("Please Fill all the mandatory fields")
        }

    }
    const updateKycDataFunc = () => {
        console.log("...........update.............");
        if (Education != '' && currentIncome != '' && CurrLoc != '' &&
            natonality != '' &&
            idProof != '' && idNum != '' && incorp != '' && legalEnty != '' &&
            judLegalEnty != '' && regOfficeEnt != '' && incorporated != '' &&
            lawsEnty != '' && membEnty != ''
        ) {
            try {
                var query = `
                mutation Mutation($id: ID, $input: KYCInput) {
                    updateProjectKYC(_id: $id, input: $input) {
                      _id
                      education
                      experience
                      industry
                      token_supply_breakup
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
                        variables:
                        {
                            "input": {
                                "project": projectNumber,
                                "education": Education,
                                "experience": Experience,
                                "industry": Industry,
                                "experience_in_blockchain_industry": expInBlockChain,
                                "public_launch_price": publicLaunchPrice,
                                "expected_token_generation_event_": exptTokenGen,
                                "total_token_supply_": totalTokenSupply,
                                "token_supply_breakup": totalTokenSupplyBreakUp,
                                "current_role": currentRole,
                                "past_organization_tags": pastOrgTags,
                                "current_income": currentIncome,
                                "current_location": CurrLoc,
                                "id_proof": idProof,
                                "id_number": idNum,
                                "nationality": natonality,
                                "identity_picture": null,
                                "are_you_incorporated": incorporated,
                                "name_of_legal_entity": legalEnty,
                                "jurisdiction_of_legal_entity": judLegalEnty,
                                "registered_office_of_legal_entity": regOfficeEnt,
                                "certificate_of_incorporation": incorp,
                                "register_of_members_of_the_entity": membEnty,
                                "register_of_directors_of_the_entity": diroEnty,
                                "memorandum_articles_bye_laws_of_the_entity": lawsEnty
                            },
                            "id": checkData
                        }



                    })
                })
                    .then((response) => {

                        const json = response.json();
                        return json;
                    })
                    .then(data => {
                        getKycDataFunc()
                        handleCloseShow()
                        if (data?.data?.updateProjectKYC != null && data?.data?.updateProjectKYC != undefined && data?.data?.updateProjectKYC != '') {
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
        } else {
            if (Education != '') {
                setEducationErr(false)
            } else {
                setEducationErr(true)

            }
            if (currentIncome != '') {
                setCurIncomeErr(false)
            } else {
                setCurIncomeErr(true)

            }
            if (CurrLoc != '') {
                setCurrLocErr(false)
            } else {
                setCurrLocErr(true)

            }
            if (natonality != '') {
                setnatonalityErr(false)
            } else {
                setnatonalityErr(true)

            }
            if (idProof != '') {
                setidProofErr(false)
            } else {
                setidProofErr(true)

            }
            if (idNum != '') {
                setidNumErr(false)
            } else {
                setidNumErr(true)

            }
            if (incorp != '') {
                setincorpErr(false)
            } else {
                setincorpErr(true)

            }
            if (legalEnty != '') {
                setlegalEntyErr(false)
            } else {
                setlegalEntyErr(true)

            }
            if (
                judLegalEnty != '') {
                setjudLegalEntyErr(false)
            } else {
                setjudLegalEntyErr(true)

            }
            if (regOfficeEnt != '') {
                setregOfficeEntErr(false)
            } else {
                setregOfficeEntErr(true)

            }
            if (incorporated != '') {
                setincorporatedErr(false)
            } else {
                setincorporatedErr(true)

            }
            if (lawsEnty != '') {
                setlawsEntyErr(false)
            } else {
                setlawsEntyErr(true)

            }
            if (membEnty != '') {
                setmembEntyErr(false)
            } else {
                setmembEntyErr(true)

            }
            // alert("Please Fill all the mandatory fields")
        }



    }

    useEffect(() => {
        console.log(loginId, "funding Log1");
        if (loginId != '') {
            getKycDataFunc()
            console.log(loginId, "funding Log2");
        }

    }, [loginId])
    return (

        <div className="card card-table">

            <div className="card-body" style={{ padding: '10px' }}>

                <div className="col-md-12" style={{ padding: '0px' }}>
                    <div className="profile-view" style={{ margin: '10px' }}>


                        <h3 className="card-title">KYC</h3>
                        <div className="">
                            <table style={{ width: '100%' }}>
                                <tbody>
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%', padding: '10px 0px' }}>Education:</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{Education != null && Education != undefined && Education}</td>
                                    </tr>

                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Experience:</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{Experience != null && Experience != undefined && Experience}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Industry:</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{Industry != null && Industry != undefined && Industry}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Experience in Blockchain Industry:</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{expInBlockChain != null && expInBlockChain != undefined && expInBlockChain}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Public Launch Price:</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{publicLaunchPrice != null && publicLaunchPrice != undefined && publicLaunchPrice}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Expected Token Generation Event :</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{exptTokenGen != null && exptTokenGen != undefined && exptTokenGen}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Total Token Supply :</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{totalTokenSupply != null && totalTokenSupply != undefined && totalTokenSupply}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Token Supply Breakup:</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{totalTokenSupplyBreakUp != null && totalTokenSupplyBreakUp != undefined && totalTokenSupplyBreakUp}</td>
                                    </tr>

                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Current Role:</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{currentRole != null && currentRole != undefined && currentRole}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Past Organization tags:</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{pastOrgTags != null && pastOrgTags != undefined && pastOrgTags}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Current Income:</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{currentIncome != null && currentIncome != undefined && currentIncome}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Current Location:</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{CurrLoc != null && CurrLoc != undefined && CurrLoc}</td>
                                    </tr>

                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Nationality:</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{natonality != null && natonality != undefined && natonality}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Id Proof:</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{idProof != null && idProof != undefined && idProof}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Id Number:</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{idNum != null && idNum != undefined && idNum}</td>
                                    </tr>
                                    {/* <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Identity Picture:</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{idPic != null && idPic != undefined && idPic}</td>
                                    </tr> */}
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Are you Incorporated :</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{incorporated != null && incorporated != undefined && incorporated}</td>
                                    </tr>

                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Name of Legal Entity:</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{legalEnty != null && legalEnty != undefined && legalEnty}</td>
                                    </tr>

                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Jurisdiction of legal Entity:</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{judLegalEnty != null && judLegalEnty != undefined && judLegalEnty}</td>
                                    </tr>

                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Registered office of legal entity:</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{regOfficeEnt != null && regOfficeEnt != undefined && regOfficeEnt}</td>
                                    </tr>

                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Certificate of Incorporation:</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{incorp != null && incorp != undefined && incorp}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Memorandum/Articles/Bye laws of the Entity:</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{lawsEnty != null && lawsEnty != undefined && lawsEnty}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Register of Members of the Entity:</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{membEnty != null && membEnty != undefined && membEnty}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Register of Directors of the Entity:</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{diroEnty != null && diroEnty != undefined && diroEnty}</td>
                                    </tr>
                                    <tr>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="pro-edit"><button className="edit-icon" onClick={() => handleShow()}><i className="fa fa-pencil" /></button></div>

                    </div>
                </div>
                {/* <div style={{ marginTop: '40px', textAlign: 'end' }}>
                    <button className="btn buttonInProposal1 submit-btn">SAVE</button>
                </div> */}

            </div>
            <KYCModal
                show={show}
                handleClose={handleCloseShow}


                createKycDataFunc={createKycDataFunc}
                updateKycDataFunc={updateKycDataFunc}
                checkData={checkData}
                setcheckData={setcheckData}
                Education={Education}
                setEducation={setEducation}
                Experience={Experience}
                setExperience={setExperience}
                Industry={Industry}
                setIndustry={setIndustry}
                expInBlockChain={expInBlockChain}
                setexpInBlockChain={setexpInBlockChain}
                publicLaunchPrice={publicLaunchPrice}
                setpublicLaunchPrice={setpublicLaunchPrice}
                exptTokenGen={exptTokenGen}
                setexptTokenGen={setexptTokenGen}
                totalTokenSupplyBreakUp={totalTokenSupplyBreakUp}
                settotalTokenSupplyBreakUp={settotalTokenSupplyBreakUp}
                Telegram={Telegram}
                setTelegram={setTelegram}
                totalTokenSupply={totalTokenSupply}
                settotalTokenSupply={settotalTokenSupply}
                youTube={youTube}
                setyouTube={youTube}


                currentRole={currentRole} setCurrentRole={setCurrentRole}
                pastOrgTags={pastOrgTags}
                setpastOrgTags={setpastOrgTags}
                currentIncome={currentIncome}
                setcurrentIncome={setcurrentIncome}
                CurrLoc={CurrLoc}
                setCurrLoc={setCurrLoc}
                natonality={natonality}
                setnatonality={setnatonality}
                idProof={idProof}
                setidProof={setidProof}
                idNum={idNum}
                setidNum={setidNum}
                incorporated={incorporated}
                setincorporated={setincorporated}
                legalEnty={legalEnty}
                setlegalEnty={setlegalEnty}
                judLegalEnty={judLegalEnty}
                setjudLegalEnty={setjudLegalEnty}
                regOfficeEnt={regOfficeEnt}
                setregOfficeEnt={setregOfficeEnt}
                incorp={incorp}
                setincorp={setincorp}
                lawsEnty={lawsEnty}
                setlawsEnty={setlawsEnty}
                membEnty={membEnty}
                setmembEnty={setmembEnty}
                diroEnty={diroEnty}
                setdiroEnty={setdiroEnty}

                educationErr={educationErr}
                CurIncomeErr={CurIncomeErr}
                CurrLocErr={CurrLocErr}
                natonalityErr={natonalityErr}
                idProofErr={idProofErr}
                idNumErr={idNumErr}
                regOfficeEntErr={regOfficeEntErr}
                judLegalEntyErr={judLegalEntyErr}
                legalEntyErr={legalEntyErr}
                incorpErr={incorpErr}
                incorporatedErr={incorporatedErr}
                lawsEntyErr={lawsEntyErr}
                membEntyErr={membEntyErr}
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
export default KYCPage;
