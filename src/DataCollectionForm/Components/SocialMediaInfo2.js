import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateSocialMediaAgency } from '../../Redux/Slice/SocialMediaAgencySlice';

const SocialMediaInfo2 = () => {
    const dispatch = useDispatch();
    const [socialMediaAccount, setSocialMediaAccount] = useState({
        Facebook: false,
        Instagram: false,
        Linkedin: false,
        Pinterest: false,
        TikTok: false,
        X: false,
        YouTube: false,
        Others: false,
        'I Dont Know': false,
    });

    const [socialMediaData, setSocialMediaData] = useState({});

    const handleSocialMediaAccount = (e) => {
        const { name, checked } = e.target;
        setSocialMediaAccount({ ...socialMediaAccount, [name]: checked });

        if (checked) {
            setSocialMediaData((prevData) => ({
                ...prevData,
                [name]: {
                    agencyName: '',
                    contactName: '',
                    email: '',
                    phone: '',
                    url: '',
                    pageID: '',
                    isInMBM: null,
                    dcubeAdded: null,
                },
            }));
        } else {
            setSocialMediaData((prevData) => {
                const updatedData = { ...prevData };
                delete updatedData[name];
                return updatedData;
            });
        }
    };

    const handleFieldChange = (platform, field, value) => {
        setSocialMediaData((prevData) => ({
            ...prevData,
            [platform]: {
                ...prevData[platform],
                [field]: value,
            },
        }));
    };

    console.log(socialMediaData);
    useEffect(() => {
        dispatch(updateSocialMediaAgency(socialMediaData))
    }, [socialMediaData, dispatch])

    return (
        <div className='flex flex-col gap-5'>
            <header className='border border-black rounded-lg p-3 text-xl bg-data-blue'>
                <div className='flex items-center justify-between px-5'>
                    <img width={100} src="https://assets.website-files.com/611cbbfb9a41092654f24228/616e52b7d8fc6451b604d39f_logo.png" alt='' />
                    <img width={100} className='' src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Marriott_Logo.svg/1024px-Marriott_Logo.svg.png" alt='' />
                </div>
                <h1 className='font-medium text-2xl text-data-text text-center'>Social Media Information</h1>
            </header>
            <div className='border border-black rounded-lg px-5 py-3 '>
                <p>Please Check the social media account you have for the above-mentioned hotel:</p>
                <div className='flex flex-col gap-2 mt-3'>
                    {Object.keys(socialMediaAccount).map((platform) => (
                        <span key={platform} className='flex items-center gap-3'>
                            <input
                                className='relative top-[2px] h-4 w-5'
                                onChange={handleSocialMediaAccount}
                                type='checkbox'
                                id={platform}
                                name={platform}
                                checked={socialMediaAccount[platform]}
                            />
                            <label className='mt-1' htmlFor={platform}>{platform}</label>
                        </span>
                    ))}
                </div>
            </div>

            {Object.entries(socialMediaAccount).map(([platform, isChecked]) => (
                isChecked && (
                    <div key={platform} className='flex flex-col gap-5 mt-5'>
                        {/* Section 1 */}
                        <section>
                            <div className='border border-black rounded-lg p-5 text-xl bg-data-blue'>
                                <h1 className='text-sm font-normal'>
                                    Section 1: Please provide contact information for the person managing the {platform} account.
                                </h1>
                            </div>
                            <div className='flex gap-10 mt-5'>
                                <section className='font-semibold'>{platform}</section>
                                <section className='px-10 py-3 w-full'>
                                    <div className='flex items-center gap-5 py-2'>
                                        <div className='flex flex-col w-[50%]'>
                                            <label className="font-medium pb-1">Hotel / Social Media Agency Name</label>
                                            <input
                                                placeholder="Enter Agency Name"
                                                className='border h-9 rounded-lg p-2'
                                                value={socialMediaData[platform]?.agencyName || ''}
                                                onChange={(e) => handleFieldChange(platform, 'agencyName', e.target.value)}
                                            />
                                        </div>
                                        <div className='flex flex-col w-[50%]'>
                                            <label className="font-medium pb-1">Contact Person Name</label>
                                            <input
                                                placeholder="Enter Contact Person Name"
                                                className='border h-9 rounded-lg p-2'
                                                value={socialMediaData[platform]?.contactName || ''}
                                                onChange={(e) => handleFieldChange(platform, 'contactName', e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className='flex items-center gap-5 py-2'>
                                        <div className='flex flex-col w-[50%]'>
                                            <label className="font-medium pb-1">Email Address</label>
                                            <input
                                                placeholder="Email Address"
                                                className='border h-9 rounded-lg p-2'
                                                value={socialMediaData[platform]?.email || ''}
                                                onChange={(e) => handleFieldChange(platform, 'email', e.target.value)}
                                            />
                                        </div>
                                        <div className='flex flex-col w-[50%]'>
                                            <label className="font-medium pb-1">Phone Number</label>
                                            <input
                                                placeholder="Enter Phone Number"
                                                className='border h-9 rounded-lg p-2'
                                                value={socialMediaData[platform]?.phone || ''}
                                                onChange={(e) => handleFieldChange(platform, 'phone', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </section>

                        {/* Section 2 */}
                        <section>
                            <div className='border border-black rounded-lg p-5 text-xl bg-data-blue'>
                                <h1 className='text-sm font-normal'>Section 2 : Please input the below Information for {platform} Social Media application that your hotel is using.</h1>
                            </div>
                            <div className='flex gap-10 mt-5'>
                                <section className='font-semibold'>{platform}</section>
                                <section className='px-10 py-3 w-full'>
                                    <div className='flex items-center gap-5 py-2'>
                                        <div className='flex flex-col w-[50%]'>
                                            <label className="font-medium pb-1">{platform} URL</label>
                                            <input
                                                placeholder={`${platform} URL`}
                                                className='border h-9 rounded-lg p-2'
                                                value={socialMediaData[platform]?.url || ''}
                                                onChange={(e) => handleFieldChange(platform, 'url', e.target.value)}
                                            />
                                        </div>
                                        <div className='flex flex-col w-[50%]'>
                                            <label className="font-medium pb-1">{platform} Page ID</label>
                                            <input
                                                placeholder={`${platform} Page ID`}
                                                className='border h-9 rounded-lg p-2'
                                                value={socialMediaData[platform]?.pageID || ''}
                                                onChange={(e) => handleFieldChange(platform, 'pageID', e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <span className='flex gap-5 py-2'>
                                        <p>Is your {platform} page in Marriott’s Business Manager (MI {platform.slice(0, 1)}BM)?</p>
                                        <span className='flex items-center gap-3'>
                                            <label>Yes</label>
                                            <input
                                                type='checkbox'
                                                checked={socialMediaData[platform]?.isInFBM || false}
                                                onChange={(e) => handleFieldChange(platform, 'isInFBM', e.target.checked)}
                                            />
                                        </span>
                                        <span className='flex items-center gap-3'>
                                            <label>No</label>
                                            <input
                                                type='checkbox'
                                                checked={!socialMediaData[platform]?.isInFBM}
                                                onChange={(e) => handleFieldChange(platform, 'isInFBM', !e.target.checked)}
                                            />
                                        </span>
                                    </span>
                                </section>
                            </div>
                        </section>

                        {/* Section 3 */}
                        {!socialMediaData[platform]?.isInFBM && (
                            <section>
                                <div className='border border-black rounded-lg p-5 text-xl bg-data-blue'>
                                    <h1 className='text-sm font-normal'>Section 3:  If your {platform} page in  not enrolled in Marriott’s Facebook Business Manager (MI {platform.slice(0, 1)}BM), then update below                                    </h1>
                                </div>
                                <section className='flex flex-col items-center justify-center py-3'>
                                    <p>Did you successfully add DCube to your {platform} account?</p>
                                    <p>Click on the FAQ at top right for instructions on how to add admin access.</p>
                                    <div className='flex gap-5 p-5'>
                                        <span className='flex items-center gap-3'>
                                            <input
                                                type='radio'
                                                checked={socialMediaData[platform]?.dcubeAdded === true}
                                                onChange={() => handleFieldChange(platform, 'dcubeAdded', true)}
                                            />
                                            <label>Yes</label>
                                        </span>
                                        <span className='flex items-center gap-3'>
                                            <input
                                                type='radio'
                                                checked={socialMediaData[platform]?.dcubeAdded === false}
                                                onChange={() => handleFieldChange(platform, 'dcubeAdded', false)}
                                            />
                                            <label>No</label>
                                        </span>
                                    </div>
                                </section>
                                <section className='text-center'>
                                    <p>IMPORTANT: If for any account Two Factor Authentication (2FA) is enabled,please disable before submitting this form.</p>
                                    <p>To Learn how to disable Two-Factor Authentication (2FA), click the FAQ button at the top of the page for instructions.</p>
                                    <p className='text-red-500'>For any further details please reach us at <span className='underline'>marriott@dcubedata.com</span></p>
                                </section>

                            </section>
                        )}
                    </div>
                )
            ))}
        </div>
    );
};

export default SocialMediaInfo2;
