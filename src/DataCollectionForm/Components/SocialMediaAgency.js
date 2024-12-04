import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateSocialMediaAgency } from '../../Redux/Slice/SocialMediaAgencySlice';
import { updatebuttonClick, updatedCurrentPage } from '../../Redux/Slice/PersonalInfoSlice';

const SocialMediaAgency = () => {
    const dispatch = useDispatch();
    const sliceData = useSelector((state) => state.SocialMediaAgencyInfo.AgencyInformation);
    const SocialMediaAgencySliceError = useSelector((state) => state.SocialMediaAgencyInfo.SocialMediaAgencySliceError);
    const PageToogle = useSelector((state) => state.personalInformation.PageToogle)

    const [SocialMediaData, SetSocialMediaData] = useState({
        NameOfAgency: '',
        PrimaryContactName: '',
        PrimaryContactEmail: '',
        PrimaryContactNumber: '',
        HotelApplicable: false,
    });

    const handleCheckboxChange = (e) => {
        const { checked, type } = e.target;
        if (type === "checkbox") {
            const updatedData = {
                ...SocialMediaData,
                HotelApplicable: checked,
            }
            SetSocialMediaData(updatedData);
            // dispatch(updateSocialMediaAgency(updatedData));
        }
    };


    const handleSocialMediaData = (e) => {
        const { name, value, checked, type } = e.target;

        const updatedData = {
            ...SocialMediaData,
            [name]: type === 'checkbox' ? checked : value,
        };
        console.log("UpdatedData", updatedData);
        SetSocialMediaData(updatedData);
        dispatch(updateSocialMediaAgency(updatedData));
    };
    // console.log("SocialMediaData", SocialMediaData);
    // console.log("sliceData", sliceData);


    useEffect(() => {
        SetSocialMediaData(sliceData);
        // dispatch(updateSocialMediaAgency(sliceData));
    }, [dispatch, sliceData]);


    return (
        <div className='flex flex-col gap-5'>
            <header className='border border-black rounded-lg p-3 text-xl bg-data-blue flex items-center justify-between px-5'>
                <img width={100} src="https://assets.website-files.com/611cbbfb9a41092654f24228/616e52b7d8fc6451b604d39f_logo.png" alt='' />
                <h1 className='font-medium text-2xl text-data-text text-center'>Social Media Agency Information</h1>
                <img width={100} className='' src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Marriott_Logo.svg/1024px-Marriott_Logo.svg.png" alt='' />
            </header>
            <div className='border border-black rounded-lg px-5 py-3 '>
                <p>Complete only if your hotel uses an outside agency to manage the hotel's social media accounts</p>
                <section className='flex items-center gap-5 pt-7 pb-4'>
                    <aside className='flex flex-col w-[50%]'>
                        <label className="pb-1">Name of Agency <span className='text-red-600 ml-1'>*</span></label>
                        <input
                            type='text'
                            onChange={handleSocialMediaData}
                            value={SocialMediaData.NameOfAgency || ""}
                            name="NameOfAgency"
                            placeholder="Enter Name of the Agency"
                            className={`border h-9 rounded-lg p-2 ${SocialMediaData.HotelApplicable ? "bg-slate-200 cursor-no-drop" : ""} ${SocialMediaAgencySliceError.NameOfAgency ? "border-2 border-red-500" : "border border-gray-300"} `}
                            disabled={SocialMediaData.HotelApplicable}
                        />
                    </aside>
                    <aside className='flex flex-col w-[50%]'>
                        <label className="pb-1">Primary Contact<span className='text-red-600 ml-1'>*</span></label>
                        <input
                            type='text'
                            onChange={handleSocialMediaData}
                            value={SocialMediaData.PrimaryContactName || ""}
                            name="PrimaryContactName"
                            placeholder="Enter Primary Contact Name"
                            className={`border h-9 rounded-lg p-2 ${SocialMediaData.HotelApplicable ? "bg-slate-200 cursor-no-drop" : ""} ${SocialMediaAgencySliceError.PrimaryContactName ? "border-2 border-red-500" : "border border-gray-300"} `}
                            disabled={SocialMediaData.HotelApplicable}
                        />
                    </aside>
                </section>
                <section className='flex items-center gap-5 pb-7'>
                    <aside className='flex flex-col w-[50%]'>
                        <label className="pb-1">Primary Contact Email Address </label>
                        <input
                            type='email'
                            onChange={handleSocialMediaData}
                            value={SocialMediaData.PrimaryContactEmail || ""}
                            name="PrimaryContactEmail"
                            placeholder="Enter Primary Contact Email Address"
                            className={`border h-9 rounded-lg p-2 ${SocialMediaData.HotelApplicable ? "bg-slate-200 cursor-no-drop" : ""} ${SocialMediaAgencySliceError.PrimaryContactEmail ? "border-2 border-red-500" : "border border-gray-300"} `}
                            disabled={SocialMediaData.HotelApplicable}
                        />
                    </aside>
                    <aside className='flex flex-col w-[50%]'>
                        <label className="pb-1">Primary Contact Phone Number</label>
                        <input
                            type='number'
                            onChange={handleSocialMediaData}
                            value={SocialMediaData.PrimaryContactNumber || ""}
                            name="PrimaryContactNumber"
                            placeholder="Enter Primary Contact Phone Number"
                            className={`border h-9 rounded-lg p-2 ${SocialMediaData.HotelApplicable ? "bg-slate-200 cursor-no-drop" : ""} ${SocialMediaAgencySliceError.PrimaryContactNumber ? "border-2 border-red-500" : "border border-gray-300"} `}
                            disabled={SocialMediaData.HotelApplicable}
                        />
                    </aside>
                </section>
                <p className='flex items-center gap-5'>
                    <span>Not Applicable/Hotel does not use agency </span>
                    <input
                        onChange={handleSocialMediaData}
                        checked={SocialMediaData.HotelApplicable || false}
                        name="HotelApplicable"
                        className='relative top-[2px] h-4 w-5'
                        type='checkbox'
                    />
                </p>
            </div>
        </div>
    );
};

export default SocialMediaAgency;
