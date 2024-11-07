import React from 'react'
import { useSelector } from 'react-redux';

const AllData = () => {
    const PersonalInfo = useSelector((state) => state.personalInformation.PersonalInfoData);
    const HotelInfo = useSelector((state) => state.hotelInformation.HotelData);
    const SocialMediaAgencyInfo = useSelector((state) => state.SocialMediaAgencyInfo.AgencyInformation);
    return (
        <span className="flex flex-col gap-5 relative">
            <span className='absolute right-2 mb-10 hover:border border-black rounded-full p-1 cursor-pointer'>❌</span>
            <header className='border border-black py-1 rounded-lg bg-data-blue mt-10'>
                <div className='flex items-center justify-between px-5'>
                    <img width={100} src="https://assets.website-files.com/611cbbfb9a41092654f24228/616e52b7d8fc6451b604d39f_logo.png" alt='' />
                    <img width={100} className='' src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Marriott_Logo.svg/1024px-Marriott_Logo.svg.png" alt='' />
                </div>
            </header>

            <section>
                <h1 className='text-2xl mb-3 ml-5 underline'>Personal Information</h1>
                <span className='grid grid-cols-2 gap-5 px-5'>
                    <p>Full Name : {PersonalInfo.LastName} {PersonalInfo.FirstName}</p>
                    <p>Title : {PersonalInfo.Title}</p>
                    <p>Email : {PersonalInfo.Email}</p>
                    <p>Employee-Id : {PersonalInfo.Eid}</p>
                    <p>Phone Number : {PersonalInfo.PhoneNumber}</p>
                </span>
            </section>

            <section>
                <h1 className='text-2xl mb-3 ml-5 underline'>Hotel Information</h1>
                <span className='grid grid-cols-2 gap-5 px-5'>
                    <p>Name of the Hotel : {HotelInfo.HotelName}</p>
                    <p>MARSHA Code : {HotelInfo.MarshaCode}</p>
                    <p>Country : {HotelInfo.Country}</p>
                    <p>State : {HotelInfo.State}</p>
                    <p>City : {HotelInfo.City}</p>
                    <p>Zip Code : {HotelInfo.ZipCode}</p>
                </span>
            </section>


            <section>
                <h1 className='text-2xl mb-3 ml-5 underline'>Social Media Agency Information</h1>
                <span className='grid grid-cols-2 gap-5 px-5'>
                    <p>Name of Agency : {SocialMediaAgencyInfo.NameOfAgency}</p>
                    <p>Primary Contact Name : {SocialMediaAgencyInfo.PrimaryContactName}</p>
                    <p>Primary Contact Email Address  : {SocialMediaAgencyInfo.PrimaryContactEmail}</p>
                    <p>Primary Contact Phone Number : {SocialMediaAgencyInfo.PrimaryContactNumber}</p>
                </span>
            </section>
        </span>
    )
}

export default AllData