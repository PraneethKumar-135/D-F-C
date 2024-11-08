import React from 'react'
import { useSelector } from 'react-redux';

const AllData = () => {
    const PersonalInfo = useSelector((state) => state.personalInformation.PersonalInfoData);
    const HotelInfo = useSelector((state) => state.hotelInformation.HotelData);
    const SocialMediaAgencyInfo = useSelector((state) => state.SocialMediaAgencyInfo.AgencyInformation);
    return (
        <div className="flex flex-col gap-5 relative">
            <span className='absolute right-2 mb-10 hover:border border-black rounded-full p-1 cursor-pointer'>❌</span>
            <header className='border border-black py-1 rounded-lg bg-data-blue mt-10'>
                <div className='flex items-center justify-between px-5'>
                    <img width={100} src="https://assets.website-files.com/611cbbfb9a41092654f24228/616e52b7d8fc6451b604d39f_logo.png" alt='' />
                    <img width={100} className='' src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Marriott_Logo.svg/1024px-Marriott_Logo.svg.png" alt='' />
                </div>
            </header>

            <section className='flex items-center'>
                <h1 className='text-2xl mb-3 ml-5 w-[30%]'>Personal Information</h1>
                <section className='grid grid-cols-3 gap-5 px-5'>
                    <aside className='flex flex-col bg-slate-100 p-2 border border-black rounded-lg'>
                        <span className='font-thin'>Full Name</span>
                        <span className='font-medium'>{PersonalInfo.LastName} {PersonalInfo.FirstName}</span>
                    </aside>
                    <aside className='flex flex-col bg-slate-100 p-2 border border-black rounded-lg'>
                        <span className='font-thin'>Title</span>
                        <span className='font-medium'>{PersonalInfo.Title}</span>
                    </aside>
                    <aside className='flex flex-col bg-slate-100 p-2 border border-black rounded-lg'>
                        <span className='font-thin'>Email</span>
                        <span className='font-medium'>{PersonalInfo.Email}</span>
                    </aside>
                    <aside className='flex flex-col bg-slate-100 p-2 border border-black rounded-lg'>
                        <span className='font-thin'>Employee-Id</span>
                        <span className='font-medium'>{PersonalInfo.Eid}</span>
                    </aside>
                    <aside className='flex flex-col bg-slate-100 p-2 border border-black rounded-lg'>
                        <span className='font-thin'>Phone Number</span>
                        <span className='font-medium'>{PersonalInfo.PhoneNumber}</span>
                    </aside>
                </section>
            </section>

            <section className='flex items-center'>
                <h1 className='text-2xl mb-3 ml-5 w-[30%]'>Hotel Information</h1>
                <section className='grid grid-cols-3 gap-5 px-5'>
                    <aside className='flex flex-col bg-slate-100 p-2 border border-black rounded-lg'>
                        <span className='font-thin'>Name of the Hotel</span>
                        <span className='font-medium'>{HotelInfo.HotelName}</span>
                    </aside>
                    <aside className='flex flex-col bg-slate-100 p-2 border border-black rounded-lg'>
                        <span className='font-thin'>MARSHA Code</span>
                        <span className='font-medium'>{HotelInfo.MarshaCode}</span>
                    </aside>
                    <aside className='flex flex-col bg-slate-100 p-2 border border-black rounded-lg'>
                        <span className='font-thin'>Country</span>
                        <span className='font-medium'>{HotelInfo.Country}</span>
                    </aside>
                    <aside className='flex flex-col bg-slate-100 p-2 border border-black rounded-lg'>
                        <span className='font-thin'>State - City</span>
                        <span className='font-medium'>{HotelInfo.State}<span className='font-normal'>-</span>{HotelInfo.City}</span>
                    </aside>
                    <aside className='flex flex-col bg-slate-100 p-2 border border-black rounded-lg'>
                        <span className='font-thin'>Zip Code</span>
                        <span className='font-medium'>{HotelInfo.ZipCode}</span>
                    </aside>
                </section>
            </section>


            <section className='flex items-center'>
                <h1 className='text-2xl mb-3 ml-5 w-[23%]'>Social Media Information</h1>
                <section className='grid grid-cols-3 gap-5 px-5 w-[70%]'>
                    <aside className='flex flex-col bg-slate-100 p-2 border border-black rounded-lg'>
                        <span className='font-thin'>Name of Agency</span>
                        <span className='font-medium'>{SocialMediaAgencyInfo.NameOfAgency}</span>
                    </aside>
                    <aside className='flex flex-col bg-slate-100 p-2 border border-black rounded-lg'>
                        <span className='font-thin'>Primary Contact Name</span>
                        <span className='font-medium'>{SocialMediaAgencyInfo.PrimaryContactName}</span>
                    </aside>
                    <aside className='flex flex-col bg-slate-100 p-2 border border-black rounded-lg'>
                        <span className='font-thin'>Primary Contact Email Address</span>
                        <span className='font-medium'>{SocialMediaAgencyInfo.PrimaryContactEmail}</span>
                    </aside>
                    <aside className='flex flex-col bg-slate-100 p-2 border border-black rounded-lg'>
                        <span className='font-thin'>Primary Contact Phone Number</span>
                        <span className='font-medium'>{SocialMediaAgencyInfo.PrimaryContactNumber}</span>
                    </aside>
                </section>
            </section>
        </div>
    )
}

export default AllData