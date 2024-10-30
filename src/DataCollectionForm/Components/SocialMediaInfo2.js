// import React, { useState } from 'react';

// const SocialMediaInfo2 = () => {
//     const [socialMediaAccount, setSocialMediaData] = useState({
//         Facebook: false,
//         Instagram: false,
//         Linkedin: false,
//         Pinterest: false,
//         TikTok: false,
//         X: false,
//         YouTube: false,
//         Others: false,
//         'I Dont Know': false,
//     });

//     const handleSocialMediaAccount = (e) => {
//         setSocialMediaData({ ...socialMediaAccount, [e.target.name]: e.target.checked });
//     };
    
//     console.log(socialMediaAccount);

//     return (
//         <div className='flex flex-col gap-5'>
//             <header className='border border-black rounded-lg p-3 text-xl bg-data-blue'>
//                 <h1 className='font-medium text-data-text'>Social Media Information</h1>
//             </header>
//             <div className='border border-black rounded-lg px-5 py-3 '>
//                 <p>Please Check the social media account you have for the above-mentioned hotel:</p>
//                 <div className='flex flex-col gap-2 mt-3'>
//                     {Object.keys(socialMediaAccount).map((platform) => (
//                         <span key={platform} className='flex items-center gap-3'>
//                             <input
//                                 className='relative top-[2px] h-4 w-5'
//                                 onChange={handleSocialMediaAccount}
//                                 type='checkbox'
//                                 id={platform}
//                                 name={platform}
//                                 checked={socialMediaAccount[platform]}
//                             />
//                             <label htmlFor={platform}>{platform}</label>
//                         </span>
//                     ))}
//                 </div>
//             </div>

//             {Object.entries(socialMediaAccount).map(([platform, isChecked]) => (
//                 isChecked && (
//                     <div key={platform} className='flex flex-col gap-5 mt-5'>
//                         <div className='border border-black rounded-lg p-5 text-xl bg-data-blue'>
//                             <h1 className='text-sm font-normal'>
//                                 Section 1: Please provide the name of the MI Associate or Social Media Agency Contact Information for the person managing the {platform} account
//                             </h1>
//                         </div>
//                         <div className='flex gap-10 mt-5'>
//                             <section className='font-semibold'>{platform}</section>
//                             <section className='w-full'>
//                                 <div className='w-[80%] px-10 py-3'>
//                                     <div className='flex items-center gap-5 py-2'>
//                                         <div className='flex flex-col w-[50%]'>
//                                             <label className="font-medium pb-1">Hotel / Social Media Agency Name</label>
//                                             <input placeholder="Enter Hotel / Social Media Agency Name" className='border h-9 rounded-lg p-2' />
//                                         </div>
//                                         <div className='flex flex-col w-[50%]'>
//                                             <label className="font-medium pb-1">Contact Person Name at Social Media Agency</label>
//                                             <input placeholder="Enter Contact Person Name at Social Media Agency" className='border h-9 rounded-lg p-2' />
//                                         </div>
//                                     </div>

//                                     <div className='flex items-center gap-5 py-2'>
//                                         <div className='flex flex-col w-[50%]'>
//                                             <label className="font-medium pb-1">Email Address</label>
//                                             <input placeholder="Email Address" className='border h-9 rounded-lg p-2' />
//                                         </div>
//                                         <div className='flex flex-col w-[50%]'>
//                                             <label className="font-medium pb-1">Phone Number</label>
//                                             <input placeholder="Enter Phone Number" className='border h-9 rounded-lg p-2' />
//                                         </div>
//                                     </div>
//                                 </div>
//                             </section>
//                         </div>
//                     </div>
//                 )
//             ))}
//         </div>
//     );
// };

// export default SocialMediaInfo2;
import React, { useState } from 'react'

const SocialMediaInfo2 = () => {
    const [socialMediaAccount, SetSocialMediaData] = useState({
        "Facebook": false,
        "Instagram": false,
        "Linkedin": false,
        "Pinterest": false,
        "TickTok": false,
        "X": false,
        "YouTube": false,
        "Others": false,
        "I Dont Know": false,
    })
    const handleSocialMediaAccount = (e) => {
        SetSocialMediaData({...socialMediaAccount, [e.target.name]: e.target.checked });
    }
    console.log(socialMediaAccount);
    
    return (
        <div className='flex flex-col gap-5'>
            <header className='border border-black rounded-lg p-3 text-xl bg-data-blue'>
                <h1 className='font-medium text-data-text'>Social Media Information</h1>
            </header>
            <div className='border border-black rounded-lg px-5 py-3 '>
                <p>Please Check the social media account you have for the above-mentioned hotel:</p>
                <div className='flex flex-col gap-2 mt-3'>
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
                            <label htmlFor={platform}>{platform}</label>
                        </span>
                    ))}
                </div>
                </div>
            </div>









            <div className='flex flex-col gap-5'>

                {/* Section 1 */}
                <div className='border border-black rounded-lg p-5 text-xl bg-data-blue'>
                    <h1 className='text-sm font-normal'>Section 1 : Please provide name of MI Associate or Social Media Agency Contact Information for the person managing these Social Media accounts</h1>
                </div>
                <div className='flex gap-10 mt-5'>
                    <section className='font-semibold'>Facebook</section>
                    <section className='w-full'>
                        <div className='w-[80%]px-10 py-3'>
                            <div className='flex items-center gap-5 py-2'>
                                <div className='flex flex-col w-[50%]'>
                                    <label className="font-medium pb-1">Hotel / Social Media Agency Name</label>
                                    <input placeholder="Enter Hotel / Social Media Agency Name" className='border h-9 rounded-lg p-2' />
                                </div>
                                <div className='flex flex-col w-[50%]'>
                                    <label className="font-medium pb-1">Contact Person Name at Social Media Agency</label>
                                    <input placeholder="Enter Contact Person Name at Social Media Agency" className='border h-9 rounded-lg p-2' />
                                </div>
                            </div>

                            <div className='flex items-center gap-5 py-2'>
                                <div className='flex flex-col w-[50%]'>
                                    <label className="font-medium pb-1">Email Address</label>
                                    <input placeholder="Email Address" className='border h-9 rounded-lg p-2' />
                                </div>
                                <div className='flex flex-col w-[50%]'>
                                    <label className="font-medium pb-1">Phone Number</label>
                                    <input placeholder="Enter Phone Number" className='border h-9 rounded-lg p-2' />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>



                {/* Section 2 */}
                <div className='border border-black rounded-lg p-5 text-xl bg-data-blue'>
                    <h1 className='text-sm font-normal'>Section 2 : Please input the below Information for Facebook Social Media application that your hotel is using. Click on the FAQ at top rigth for instructions </h1>
                </div>
                <div className='flex gap-10 mt-5'>
                    <section className='font-semibold'>Facebook</section>
                    <section className='w-full'>
                        <div className='w-[80%]px-10 py-3'>
                            <div className='flex items-center gap-5 py-2'>
                                <div className='flex flex-col w-[50%]'>
                                    <label className="font-medium pb-1">Facebook URL</label>
                                    <input placeholder="Facebook URL" className='border h-9 rounded-lg p-2' />
                                </div>
                                <div className='flex flex-col w-[50%]'>
                                    <label className="font-medium pb-1">Facebook Page ID</label>
                                    <input placeholder="Facebook Page ID" className='border h-9 rounded-lg p-2' />
                                </div>
                            </div>
                        </div>
                        <span className='flex gap-5'>
                            <p>Is your Facebook page in Marriott’s Facebook Business Manager (MI FBM)</p>
                            <span className='flex items-center gap-3'>
                                <label htmlFor='Yes'>Yes</label>
                                <input className='relative top-[2px] h-4 w-5' type='checkbox' />
                            </span>
                            <span className='flex items-center gap-3'>
                                <label htmlFor='NO'>No</label>
                                <input className='relative top-[2px] h-4 w-5' type='checkbox' />
                            </span>
                        </span>
                    </section>
                </div>




                {/* Section 3 */}
                <div className='border border-black rounded-lg p-5 text-xl bg-data-blue'>
                    <h1 className='text-sm font-normal'>Section3: if your Facebook page in  not enrolled in Marriott’s Facebook Business Manager (MI FBM), then update below
                    </h1>
                </div>
                <section className='flex flex-col items-center justify-center'>
                    <p>Did you successfully add DCube to your Facebook account?</p>
                    <p>Click on the FAQ at top right for instructions on how to add admin access.</p>
                    <div className='flex gap-5 p-5'>
                        <span className='flex items-center gap-3'>
                            <input className='relative top-[2px] h-[1.1rem] w-5' type='radio' />
                            <label htmlFor='Yes'>Yes</label>
                        </span>
                        <span className='flex items-center gap-3'>
                            <input className='relative top-[2px] h-[1.1rem] w-5' type='radio' />
                            <label htmlFor='NO'>No</label>
                        </span>
                    </div>
                </section>
                <section className='text-center'>
                    <p>IMPORTANT: If for any account Two Factor Authentication (2FA) is enabled,please disable before submitting this form.</p>
                    <p>To Learn how to disable Two-Factor Authentication (2FA), click the FAQ button at the top of the page for instructions.</p>
                    <p className='text-red-500'>For any further details please reach us at <span className='underline'>marriott@dcubedata.com</span></p>
                </section>
            </div>
        </div>
    )
}

export default SocialMediaInfo2