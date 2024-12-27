import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateSocialMediaAccounts } from '../../Redux/Slice/SocialMediaSlice';

const SocialMediaInfo = () => {
    const dispatch = useDispatch();
    const sliceData = useSelector((state) => state.socialMediaInfo.SocialMediaInformation);
    const SocialMediaErrorMessages = useSelector((state) => state.socialMediaInfo.SocialMediaErrorMessages);
    const mainPageToogle = useSelector((state) => state.personalInformation.PageToogle)
    const initialAccountsState = {
        "Facebook": false,
        "Instagram": false,
        "LinkedIn": false,
        "Pinterest": false,
        "TikTok": false,
        "Twitter": false,
        "YouTube": false,
        "Other": false,
        'I Dont Know': false,
    };
    const [socialMediaAccount, setSocialMediaAccount] = useState(initialAccountsState);

    const [socialMediaData, setSocialMediaData] = useState({});

    const handleSocialMediaAccount = (e) => {
        const { name, checked } = e.target;
        setSocialMediaAccount({ ...socialMediaAccount, [name]: checked });

        if (checked) {
            setSocialMediaData((prevData) => ({
                ...prevData,
                [name]: {
                    sma_name: '',
                    sma_person: '',
                    sma_email: '',
                    sma_phone: '',
                    pageURL: '',
                    pageID: '',
                    mi_fbm: null,
                    added_dcube: null,
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
        const updatedData = {
            ...socialMediaData,
            [platform]: {
                ...socialMediaData[platform],
                [field]: value,
            },
        };
        setSocialMediaData(updatedData);

        dispatch(updateSocialMediaAccounts({ platform, field, value }));
    };



    useEffect(() => {
        if (sliceData) {
            setSocialMediaData(sliceData);
            const updatedAccountsState = Object.keys(initialAccountsState).reduce((acc, key) => {
                acc[key] = !!sliceData[key];
                return acc;
            }, {});
            setSocialMediaAccount(updatedAccountsState);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sliceData, mainPageToogle]);


    return (
        <div className='flex flex-col gap-5'>

            <header className='border border-black rounded-lg p-3 text-xl bg-data-blue flex items-center justify-between px-5'>
                <img width={100} src="https://assets.website-files.com/611cbbfb9a41092654f24228/616e52b7d8fc6451b604d39f_logo.png" alt='' />
                <h1 className='font-medium text-2xl text-data-text text-center'>Social Media Information</h1>
                <img width={100} className='' src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Marriott_Logo.svg/1024px-Marriott_Logo.svg.png" alt='' />
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
                            <div className='border border-black rounded-lg px-5 py-2 text-xl bg-data-blue'>
                                <h1 className='text-sm font-normal'>
                                    Section 1: Please provide contact information for the person managing the {platform} account.
                                </h1>
                            </div>
                            <div className='flex gap-10 mt-5 ml-10'>
                                <section className='font-semibold'>{platform}</section>
                                <section className='px-10 py-3 w-full'>
                                    <div className='flex items-center gap-5 py-2'>
                                        <div className='flex flex-col w-[50%]'>
                                            <label className="pb-1">Hotel / Social Media Agency Name</label>
                                            <input
                                                placeholder="Enter Agency Name"
                                                className={`border h-9 rounded-lg p-2 ${SocialMediaErrorMessages[platform]?.sma_name ? "border-2 border-red-500" : "border border-gray-300"}`}
                                                value={socialMediaData[platform]?.sma_name || ''}
                                                onChange={(e) => handleFieldChange(platform, 'sma_name', e.target.value)}
                                            />
                                            {SocialMediaErrorMessages[platform]?.sma_name && (
                                                <p className='text-red-500 text-sm'>{SocialMediaErrorMessages[platform].sma_name}</p>
                                            )}
                                        </div>
                                        <div className='flex flex-col w-[50%]'>
                                            <label className="pb-1">Contact Person Name</label>
                                            <input
                                                placeholder="Enter Contact Person Name"
                                                className={`border h-9 rounded-lg p-2 ${SocialMediaErrorMessages[platform]?.sma_person ? "border-2 border-red-500" : "border border-gray-300"}`}
                                                value={socialMediaData[platform]?.sma_person || ''}
                                                onChange={(e) => handleFieldChange(platform, 'sma_person', e.target.value)}
                                            />
                                            {SocialMediaErrorMessages[platform]?.sma_person && (
                                                <p className='text-red-500 text-sm'>{SocialMediaErrorMessages[platform].sma_person}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className='flex items-center gap-5 py-2'>
                                        <div className='flex flex-col w-[50%]'>
                                            <label className="pb-1">Email Address</label>
                                            <input
                                                placeholder="Email Address"
                                                className={`border h-9 rounded-lg p-2 ${SocialMediaErrorMessages[platform]?.sma_email ? "border-2 border-red-500" : "border border-gray-300"}`}
                                                value={socialMediaData[platform]?.sma_email || ''}
                                                onChange={(e) => handleFieldChange(platform, 'sma_email', e.target.value)}
                                            />
                                            {SocialMediaErrorMessages[platform]?.sma_email && (
                                                <p className='text-red-500 text-sm'>{SocialMediaErrorMessages[platform].sma_email}</p>
                                            )}
                                        </div>
                                        <div className='flex flex-col w-[50%]'>
                                            <label className="pb-1">Phone Number</label>
                                            <input
                                                type='number'
                                                placeholder="Enter Phone Number"
                                                className={`border h-9 rounded-lg p-2 ${SocialMediaErrorMessages[platform]?.sma_phone ? "border-2 border-red-500" : "border border-gray-300"}`}
                                                value={socialMediaData[platform]?.sma_phone || ''}
                                                onChange={(e) => handleFieldChange(platform, 'sma_phone', e.target.value)}
                                            />
                                            {SocialMediaErrorMessages[platform]?.sma_phone && (
                                                <p className='text-red-500 text-sm'>{SocialMediaErrorMessages[platform].sma_phone}</p>
                                            )}
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </section>

                        {/* Section 2 */}
                        <section>
                            <div className='border border-black rounded-lg px-5 py-2 text-xl bg-data-blue'>
                                <h1 className='text-sm font-normal'>Section 2 : Please input the below Information for {platform} Social Media application that your hotel is using.</h1>
                            </div>
                            <div className='flex gap-10 mt-5 ml-10'>
                                <section className='font-semibold'>{platform}</section>
                                <section className='px-10 py-3 w-full'>
                                    <div className='flex items-center gap-5 py-2'>
                                        <div className='flex flex-col w-[50%]'>
                                            <label className="pb-1">{platform} URL</label>
                                            <input
                                                placeholder={`${platform} URL`}
                                                className='border h-9 rounded-lg p-2'
                                                value={socialMediaData[platform]?.pageURL || ''}
                                                onChange={(e) => handleFieldChange(platform, 'pageURL', e.target.value)}
                                            />
                                        </div>
                                        <div className='flex flex-col w-[50%]'>
                                            <label className="pb-1">{platform} Page ID</label>
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
                                                checked={socialMediaData[platform]?.mi_fbm === true} 
                                                onChange={(e) => handleFieldChange(platform, 'mi_fbm', e.target.checked)}
                                            />
                                        </span>
                                        <span className='flex items-center gap-3'>
                                            <label>No</label>
                                            <input
                                                type='checkbox'
                                                checked={socialMediaData[platform]?.mi_fbm === false} 
                                                onChange={(e) => handleFieldChange(platform, 'mi_fbm', !e.target.checked)}
                                            />
                                        </span>
                                    </span>

                                </section>
                            </div>
                        </section>

                        {/* Section 3 */}
                        {!socialMediaData[platform]?.mi_fbm && (
                            <section>
                                <div className='border border-black rounded-lg px-5 py-2 text-xl bg-data-blue'>
                                    <h1 className='text-sm font-normal'>Section 3:  If your {platform} page is not enrolled in Marriott’s Facebook Business Manager (MI {platform.slice(0, 1)}BM), update below</h1>
                                </div>
                                <section className='flex flex-col items-center justify-center py-3'>
                                    <p>Did you successfully add DCube to your {platform} account?</p>
                                    <p>Click on the FAQ at top right for instructions on how to add admin access.</p>
                                    <div className='flex gap-5 p-5'>
                                        <span className='flex items-center gap-3'>
                                            <input
                                                type='radio'
                                                checked={socialMediaData[platform]?.added_dcube === true}
                                                onChange={() => handleFieldChange(platform, 'added_dcube', true)}
                                            />
                                            <label>Yes</label>
                                        </span>
                                        <span className='flex items-center gap-3'>
                                            <input
                                                type='radio'
                                                checked={socialMediaData[platform]?.added_dcube === false}
                                                onChange={() => handleFieldChange(platform, 'added_dcube', false)}
                                            />
                                            <label>No</label>
                                        </span>
                                    </div>
                                    {SocialMediaErrorMessages[platform]?.added_dcube && (
                                        <p className='text-red-500 text-sm'>{SocialMediaErrorMessages[platform].added_dcube}</p>
                                    )}
                                </section>
                            </section>
                        )}
                    </div>
                )
            ))}
        </div>
    );
};

export default SocialMediaInfo;
