import React, { useState } from 'react';

const SocialMediaInfo = () => {
    const [SocialMediaData, SetSocialMediaData] = useState({
        NameOfAgency: '',
        PrimaryContactName: '',
        PrimaryContactEmail: '',
        PrimaryContactNumber: '',
        HotelApplicable: false
    });

    const handleSocialMediaData = (e) => {
        const { name, value, type, checked } = e.target;
        console.log(type);
        
        SetSocialMediaData({
            ...SocialMediaData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    console.log(SocialMediaData);

    return (
        <div className='flex flex-col gap-5'>
            <header className='border border-black rounded-lg p-3 text-xl bg-data-blue'>
                <h1 className='font-medium text-data-text'>Social Media Agency Information</h1>
            </header>
            <div className='border border-black rounded-lg px-5 py-3 '>
                <p>Complete only if your hotel uses an outside agency to manage the hotel's social media accounts</p>
                <section className='flex items-center gap-5 pt-7 pb-4'>
                    <aside className='flex flex-col w-[50%]'>
                        <label className="font-medium pb-1">Name of Agency <span className='text-red-600 ml-1'>*</span></label>
                        <input 
                            onChange={handleSocialMediaData} 
                            value={SocialMediaData.NameOfAgency} 
                            name="NameOfAgency" 
                            placeholder="Enter Name of the Agency" 
                            className='border h-9 rounded-lg p-2' 
                        />
                    </aside>
                    <aside className='flex flex-col w-[50%]'>
                        <label className="font-medium pb-1">Primary Contact<span className='text-red-600 ml-1'>*</span></label>
                        <input 
                            onChange={handleSocialMediaData} 
                            value={SocialMediaData.PrimaryContactName} 
                            name="PrimaryContactName" 
                            placeholder="Enter Primary Contact Name" 
                            className='border h-9 rounded-lg p-2' 
                        />
                    </aside>
                </section>
                <section className='flex items-center gap-5 pb-7'>
                    <aside className='flex flex-col w-[50%]'>
                        <label className="font-medium pb-1">Primary Contact Email Address </label>
                        <input 
                            onChange={handleSocialMediaData} 
                            value={SocialMediaData.PrimaryContactEmail} 
                            name="PrimaryContactEmail" 
                            placeholder="Enter Primary Contact Email Address" 
                            className='border h-9 rounded-lg p-2' 
                        />
                    </aside>
                    <aside className='flex flex-col w-[50%]'>
                        <label className="font-medium pb-1">Primary Contact Phone Number</label>
                        <input 
                            onChange={handleSocialMediaData} 
                            value={SocialMediaData.PrimaryContactNumber} 
                            name="PrimaryContactNumber" 
                            placeholder="Enter Primary Contact Phone Number" 
                            className='border h-9 rounded-lg p-2' 
                        />
                    </aside>
                </section>
                <p className='flex items-center gap-5'>
                    <span>Not Applicable/Hotel does not use agency </span>
                    <input 
                        onChange={handleSocialMediaData} 
                        checked={SocialMediaData.HotelApplicable} 
                        name="HotelApplicable" 
                        className='relative top-[2px] h-4 w-5' 
                        type='checkbox' 
                    />
                </p>
            </div>
        </div>
    );
};

export default SocialMediaInfo;
