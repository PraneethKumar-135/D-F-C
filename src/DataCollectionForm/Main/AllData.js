import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { editMainPage, updatedCurrentPage } from '../../Redux/Slice/PersonalInfoSlice';

const AllData = () => {
    const dispatch = useDispatch();
    const PersonalInfo = useSelector((state) => state.personalInformation.PersonalInfoData);
    const HotelInfo = useSelector((state) => state.hotelInformation.HotelData);
    const SocialMediaAgencyInfo = useSelector((state) => state.SocialMediaAgencyInfo.AgencyInformation);
    const SocialMediaData = useSelector((state) => state.socialMediaInfo.SocialMediaInformation);

    const [section, setsection] = useState('Personal')
    console.log(SocialMediaAgencyInfo);

    const handlEditFunction = () => {
        dispatch(editMainPage(true));
        dispatch(updatedCurrentPage(1))
    }

    const HandleApiData = () => {
        const AllData = {
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
            "primary_contact": SocialMediaAgencyInfo.PrimaryContactName,
            "primary_email": SocialMediaAgencyInfo.PrimaryContactEmail,
            "primary_phone": SocialMediaAgencyInfo.PrimaryContactNumber,
            "not_applicable": SocialMediaAgencyInfo.HotelApplicable,
            "sma_name": SocialMediaData.Facebook.agencyName,
            "sma_person": SocialMediaData.Facebook.contactName,
            "sma_email": SocialMediaData.Facebook.email,
            "sma_phone": SocialMediaData.Facebook.phone,
            "pageURL": SocialMediaData.Facebook.url,
            "pageID": SocialMediaData.Facebook.pageID,
            "mi_fbm": SocialMediaData.Facebook.isInFBM,
            "added_dcube": SocialMediaData.Facebook.dcubeAdded,
            "platform_input": Object.keys(SocialMediaData)[0]
        }
        console.log(AllData);
    }
    console.log(SocialMediaData);

    return (
        <div className="flex flex-col gap-5 relative">
            <header className='border border-data-text py-1 rounded-lg bg-data-blue '>
                <div className='flex items-center justify-between px-5'>
                    <img width={100} src="https://assets.website-files.com/611cbbfb9a41092654f24228/616e52b7d8fc6451b604d39f_logo.png" alt='' />
                    <img width={100} className='' src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Marriott_Logo.svg/1024px-Marriott_Logo.svg.png" alt='' />
                </div>
            </header>

            <section className='flex items-center justify-between'>
                <aside className='flex flex-col items-start w-[20%]'>
                    <button className={`text-xl p-1 ${section === "Personal" ? `text-data-text font-bold` : "text-black"}`} onClick={() => setsection("Personal")}>Personal Information</button>
                    <button className={`text-xl p-1 ${section === "Hotel" ? `text-data-text font-bold` : "text-black"}`} onClick={() => setsection("Hotel")}>Hotel Information</button>
                    <button className={`text-xl p-1 ${section === "SocialMedia" ? `text-data-text font-bold` : "text-black"}`} onClick={() => setsection("SocialMedia")}>Social Media Information</button>
                </aside>
                <aside className='w-[80%] mt-5'>

                    {section === "Personal" && <section>
                        <h1 className='text-2xl font-bold mb-5 ml-5'>Personal Information</h1>
                        <p className='text-xl mb-5 ml-5'>Please Check Your Personal Information Before submitting</p>
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
                        <section className='flex items-end justify-end'>
                            <button className='py-2 px-5 rounded-md border hover:text-white hover:border-data-text bg-data-blue font-medium text-data-text my-10' onClick={handlEditFunction}>Edit</button>
                        </section>
                    </section>}


                    {section === "Hotel" && <section>
                        <h1 className='text-2xl font-bold mb-5 ml-5'>Hotel Information</h1>
                        <p className='text-xl mb-5 ml-5'>Please Check Your Hotel Information Before submitting</p>
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
                        <section className='flex items-end justify-end'>
                            <button className='py-2 px-5 rounded-md border hover:text-white hover:border-data-text bg-data-blue font-medium text-data-text my-10' onClick={handlEditFunction}>Edit</button>
                        </section>
                    </section>}


                    {section === "SocialMedia" && <section>
                        <h1 className='text-2xl font-bold mb-5 ml-5'>Social Media Information</h1>
                        <p className='text-xl mb-5 ml-5'>Please Check Your Social Media Information Before submitting</p>
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
                        </section>
                        <section className='flex items-end justify-end'>
                            <button className='py-2 px-5 rounded-md border hover:text-white hover:border-data-text bg-data-blue font-medium text-data-text my-10' onClick={handlEditFunction}>Edit</button>
                        </section>
                    </section>}

                </aside>
            </section>

            <section>
                <button type='submit' onClick={HandleApiData}>Submit</button>
                {/* <p>{SocialMediaData.Facebook.agencyName}</p> */}
            </section>
        </div>
    )
}

export default AllData