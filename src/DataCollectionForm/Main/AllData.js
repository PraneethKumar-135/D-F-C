import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { editMainPage, updatedCurrentPage } from '../../Redux/Slice/PersonalInfoSlice';
import { FaRegEye } from 'react-icons/fa';
import { LuEyeClosed } from 'react-icons/lu';
import { GiCheckMark, GiCrossMark } from 'react-icons/gi';
import { current } from '@reduxjs/toolkit';
import axios from 'axios';

const AllData = ({ handleAlldataEdit }) => {
    const dispatch = useDispatch();
    const [UrlToggle, setUrlToggle] = useState({});
    const [PageIDToggle, setPageIDToggle] = useState({});
    const PersonalInfo = useSelector((state) => state.personalInformation.PersonalInfoData);
    const HotelInfo = useSelector((state) => state.hotelInformation.HotelData);
    const SocialMediaAgencyInfo = useSelector((state) => state.SocialMediaAgencyInfo.AgencyInformation);
    const SocialMediaData = useSelector((state) => state.socialMediaInfo.SocialMediaInformation);
    // const SocialMediaData =
    // {
    //     "Facebook": {
    //         "agencyName": "Agency ",
    //         "contactName": "Agency ",
    //         "email": "Agency ",
    //         "phone": "Agency ",
    //         "url": "Agency ",
    //         "pageID": "Agency ",
    //         "isInFBM": false,
    //         "dcubeAdded": true
    //     },
    //     "Instagram": {
    //         "agencyName": "instaAgency ",
    //         "contactName": "Agency ",
    //         "email": "Agency ",
    //         "phone": "Agency ",
    //         "url": "Agency ",
    //         "pageID": "Agency ",
    //         "isInFBM": false,
    //         "dcubeAdded": true
    //     },
    // }

    const handleUrlToggle = (platform) => {
        setUrlToggle((prevState) => ({
            ...prevState,
            [platform]: !prevState[platform],
        }));
    };
    const handlePageIDToggle = (platform) => {
        setPageIDToggle((prevState) => ({
            ...prevState,
            [platform]: !prevState[platform],
        }));
    };

    const [section, setsection] = useState('Personal')

    const handlEditFunction = (data) => {
        handleAlldataEdit(data);
        if (data.currentPage === 3 || data.currentPage === 4) {
            dispatch(editMainPage(true))
        } else {
            dispatch(editMainPage(false))
        }
    }


    const HandleApiData = () => {
        const AllData = JSON.stringify({
            "first_name": PersonalInfo.FirstName,
            "last_name": PersonalInfo.LastName,
            "title": PersonalInfo.Title,
            "personal_email": PersonalInfo.Email,
            "eid": PersonalInfo.Eid,
            "country_code": PersonalInfo.CountryCode,
            "ph_no": PersonalInfo.PhoneNumber,
            "hotel_name": HotelInfo.HotelName,
            "marsha_code": HotelInfo.MarshaCode,
            "managed_franchise": HotelInfo.isTheHotel,
            "country": HotelInfo.Country,
            "state": HotelInfo.State,
            "city": HotelInfo.City,
            "zip_code": HotelInfo.ZipCode,
            "agency_name": SocialMediaAgencyInfo.NameOfAgency,
            "primary_contact": SocialMediaAgencyInfo.PrimaryContactName || "",
            "primary_email": SocialMediaAgencyInfo.PrimaryContactEmail,
            "primary_phone": SocialMediaAgencyInfo.PrimaryContactNumber,
            "not_applicable": SocialMediaAgencyInfo.HotelApplicable === null ? false : true,
            "platform_inputs": SocialMediaData
        });
        
        console.log(AllData);
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://127.0.0.1:8000/info_input',
            headers: {
                'Content-Type': 'application/json'
            },
            data: AllData
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
                console.log(error);
            });

    }


    return (
        <div className="flex flex-col gap-5 relative">
            <header className='border border-data-text py-1 rounded-lg bg-data-blue '>
                <div className='flex items-center justify-between px-5'>
                    <img width={100} src="https://assets.website-files.com/611cbbfb9a41092654f24228/616e52b7d8fc6451b604d39f_logo.png" alt='' />
                    <img width={100} className='' src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Marriott_Logo.svg/1024px-Marriott_Logo.svg.png" alt='' />
                </div>
            </header>

            <section className='flex items-center justify-between'>
                <aside className='flex flex-col items-start w-[21%]'>
                    <button className={`text-xl p-1 ${section === "Personal" ? `text-data-text font-bold` : "text-black"}`} onClick={() => setsection("Personal")}>Personal Information</button>
                    <button className={`text-xl p-1 ${section === "Hotel" ? `text-data-text font-bold` : "text-black"}`} onClick={() => setsection("Hotel")}>Hotel Information</button>
                    <button className={`text-xl p-1 ${section === "SocialMedia" ? `text-data-text font-bold` : "text-black"}`} onClick={() => setsection("SocialMedia")}>Social Media Information</button>
                </aside>
                <aside className='w-[80%] mt-5'>

                    {section === "Personal" && <section>
                        <h1 className='text-2xl font-bold mb-5 ml-5'>Personal Information</h1>
                        <section className='flex items-center pb-1 justify-between'>
                            <p className='text-xl mb-5 ml-5'>Please Check Your Personal Information Before submitting</p>
                            <button className='py-2 px-5 rounded-md border hover:text-white hover:border-data-text bg-data-blue font-medium text-data-text' onClick={() => { handlEditFunction({ currentPage: 1 }) }}>Edit</button>
                        </section>
                        <section className='grid grid-cols-2 gap-5 px-5'>
                            <aside className='flex flex-col bg-slate-100 pl-10 py-4 border border-data-text rounded-lg'>
                                <span className='font-medium text-data-text'>Full Name</span>
                                <span className='font-thin'>{PersonalInfo.LastName} {PersonalInfo.FirstName}</span>
                            </aside>
                            <aside className='flex flex-col bg-slate-100 pl-10 py-4 border border-data-text rounded-lg'>
                                <span className='font-medium text-data-text'>Title</span>
                                <span className='font-thin'>{PersonalInfo.Title}</span>
                            </aside>
                            <aside className='flex flex-col bg-slate-100 pl-10 py-4 border border-data-text rounded-lg'>
                                <span className='font-medium text-data-text'>Email</span>
                                <span className='font-thin'>{PersonalInfo.Email}</span>
                            </aside>
                            <aside className='flex flex-col bg-slate-100 pl-10 py-4 border border-data-text rounded-lg'>
                                <span className='font-medium text-data-text'>Employee-Id</span>
                                <span className='font-thin'>{PersonalInfo.Eid}</span>
                            </aside>
                            <aside className='flex flex-col bg-slate-100 pl-10 py-4 border border-data-text rounded-lg'>
                                <span className='font-medium text-data-text'>Phone Number</span>
                                <span className='font-thin'>{PersonalInfo.PhoneNumber}</span>
                            </aside>
                        </section>

                    </section>}


                    {section === "Hotel" && <section>
                        <h1 className='text-2xl font-bold mb-5 ml-5'>Hotel Information</h1>
                        <section className='flex items-center pb-1 justify-between'>
                            <p className='text-xl mb-5 ml-5'>Please Check Your Hotel Information Before submitting</p>
                            <button className='py-2 px-5 rounded-md border hover:text-white hover:border-data-text bg-data-blue font-medium text-data-text' onClick={() => { handlEditFunction({ currentPage: 2 }) }}>Edit</button>
                        </section>
                        <section className='grid grid-cols-2 gap-5 px-5'>
                            <aside className='flex flex-col bg-slate-100 pl-10 py-4 border border-data-text rounded-lg'>
                                <span className='font-medium text-data-text'>Name of the Hotel</span>
                                <span className='font-thin'>{HotelInfo.HotelName}</span>
                            </aside>
                            <aside className='flex flex-col bg-slate-100 pl-10 py-4 border border-data-text rounded-lg'>
                                <span className='font-medium text-data-text'>MARSHA Code</span>
                                <span className='font-thin'>{HotelInfo.MarshaCode}</span>
                            </aside>
                            <aside className='flex flex-col bg-slate-100 pl-10 py-4 border border-data-text rounded-lg'>
                                <span className='font-medium text-data-text'>Country</span>
                                <span className='font-thin'>{HotelInfo.Country}</span>
                            </aside>
                            <aside className='flex flex-col bg-slate-100 pl-10 py-4 border border-data-text rounded-lg'>
                                <span className='font-medium text-data-text'>State - City</span>
                                <span className='font-thin'>{HotelInfo.State}<span className='font-normal'>-</span>{HotelInfo.City}</span>
                            </aside>
                            <aside className='flex flex-col bg-slate-100 pl-10 py-4 border border-data-text rounded-lg'>
                                <span className='font-medium text-data-text'>Zip Code</span>
                                <span className='font-thin'>{HotelInfo.ZipCode}</span>
                            </aside>
                        </section>

                    </section>}


                    {section === "SocialMedia" &&
                        (<section className='overflow-y-auto overflow-hidden h-[22.9rem] pb-2 rounded-lg'>
                            <h1 className='text-2xl font-bold mb-5 ml-5'>Social Media Agency Information</h1>
                            <section className='flex items-center pb-4 justify-between'>
                                <p className='text-xl mb-5 ml-5'>Please Check Your Social Media Agency Information Before submitting</p>
                                <button className='py-2 px-5 rounded-md border hover:text-white hover:border-data-text bg-data-blue font-medium text-data-text' onClick={() => { handlEditFunction({ currentPage: 3 }) }}>Edit</button>
                            </section>

                            {SocialMediaAgencyInfo.HotelApplicable === "True" ?
                                (<section className='grid grid-cols-2 gap-5 px-5'>
                                    <aside className='flex flex-col bg-slate-100 pl-10 py-4 border border-data-text rounded-lg'>
                                        <span className='font-medium text-data-text'>Hotel does not use agency</span>
                                    </aside>
                                </section>
                                ) : (
                                    <section className='grid grid-cols-2 gap-5 px-5'>
                                        <aside className='flex flex-col bg-slate-100 pl-10 py-4 border border-data-text rounded-lg'>
                                            <span className='font-medium text-data-text'>Name of Agency</span>
                                            <span className='font-thin'>{SocialMediaAgencyInfo.NameOfAgency}</span>
                                        </aside>
                                        <aside className='flex flex-col bg-slate-100 pl-10 py-4 border border-data-text rounded-lg'>
                                            <span className='font-medium text-data-text'>Primary Contact Name</span>
                                            <span className='font-thin'>{SocialMediaAgencyInfo.PrimaryContactName}</span>
                                        </aside>
                                        <aside className='flex flex-col bg-slate-100 pl-10 py-4 border border-data-text rounded-lg'>
                                            <span className='font-medium text-data-text'>Primary Contact Email Address</span>
                                            <span className='font-thin'>{SocialMediaAgencyInfo.PrimaryContactEmail}</span>
                                        </aside>
                                        <aside className='flex flex-col bg-slate-100 pl-10 py-4 border border-data-text rounded-lg'>
                                            <span className='font-medium text-data-text'>Primary Contact Phone Number</span>
                                            <span className='font-thin'>{SocialMediaAgencyInfo.PrimaryContactNumber}</span>
                                        </aside>
                                    </section>)}

                            <h1 className='text-2xl font-bold mb-5 ml-5 mt-5'>Social Media Information</h1>
                            <section className='flex items-center pb-1 justify-between'>
                                <p className='text-xl mb-5 ml-5'>Please Check Your Social Media Information Before submitting</p>
                                <button className='py-2 px-5 rounded-md border hover:text-white hover:border-data-text bg-data-blue font-medium text-data-text' onClick={() => { handlEditFunction({ currentPage: 4 }) }}>Edit</button>
                            </section>


                            <section className='ml-5'>
                                {Object.entries(SocialMediaData).map(([platform, details], index) => (
                                    <span key={index}>
                                        <aside className="flex flex-col pl-1 py-1 my-4 rounded-lg">
                                            <span className="font-semibold text-xl text-data-text">PlatForm : <span className="font-thin">{platform}</span></span>
                                        </aside>
                                        <section className="grid grid-cols-3 gap-5 " key={index}>
                                            <aside className="flex flex-col bg-slate-100 pl-10 py-4 border border-data-text rounded-lg">
                                                <span className="font-medium text-data-text">Agency Name</span>
                                                <span className="font-thin">{details.sma_name}</span>
                                            </aside>
                                            <aside className="flex flex-col bg-slate-100 pl-10 py-4 border border-data-text rounded-lg">
                                                <span className="font-medium text-data-text">Contact Name</span>
                                                <span className="font-thin">{details.sma_person}</span>
                                            </aside>
                                            <aside className="flex flex-col bg-slate-100 pl-10 py-4 border border-data-text rounded-lg">
                                                <span className="font-medium text-data-text">Email</span>
                                                <span className="font-thin">{details.sma_email}</span>
                                            </aside>
                                            <aside className="flex flex-col bg-slate-100 pl-10 py-4 border border-data-text rounded-lg">
                                                <span className="font-medium text-data-text">Phone</span>
                                                <span className="font-thin">{details.sma_phone}</span>
                                            </aside>
                                            <aside className="flex flex-col bg-slate-100 pl-10 py-4 border border-data-text rounded-lg">
                                                <span className="font-medium text-data-text">URL</span>
                                                <aside className='flex items-center justify-between'>
                                                    <span className="font-thin">{UrlToggle[platform] ? details.pageURL : '••••••••'}</span>
                                                    <span
                                                        className="pr-5 cursor-pointer"
                                                        onClick={() => handleUrlToggle(platform)}
                                                    >
                                                        {UrlToggle[platform] ? <FaRegEye /> : <LuEyeClosed />}
                                                    </span>
                                                </aside>
                                            </aside>
                                            <aside className="flex flex-col bg-slate-100 pl-10 py-4 border border-data-text rounded-lg">
                                                <span className="font-medium text-data-text">Page ID</span>
                                                <aside className='flex items-center justify-between'>
                                                    <span className="font-thin">{PageIDToggle[platform] ? details.pageID : '••••••••'}</span>
                                                    <span
                                                        className="pr-5 cursor-pointer"
                                                        onClick={() => handlePageIDToggle(platform)}
                                                    >
                                                        {PageIDToggle[platform] ? <FaRegEye /> : <LuEyeClosed />}
                                                    </span>
                                                </aside>
                                            </aside>
                                            <aside className="flex items-center space-x-4 bg-slate-100 pl-10 py-4 border border-data-text rounded-lg">
                                                <span className="font-medium text-data-text">Is in FBM</span>
                                                <span className="font-thin">{details.mi_fbm ? <GiCheckMark /> : <GiCrossMark />}</span>
                                            </aside>
                                            <aside className="flex items-center space-x-4 bg-slate-100 pl-10 py-4 border border-data-text rounded-lg">
                                                <span className="font-medium text-data-text">DCube Added</span>
                                                <span className="font-thin">{details.added_dcube ? <GiCheckMark /> : <GiCrossMark />}</span>
                                            </aside>
                                        </section >
                                    </span>
                                ))}
                            </section>

                        </section>)}

                </aside>
            </section>
            {section === "SocialMedia" &&
                <section className='flex items-end justify-end'>
                    <button type='submit' onClick={HandleApiData} className="border bg-green-500 rounded-md px-3 py-1 text-white">Submit</button>
                </section>}
        </div>
    )
}

export default AllData