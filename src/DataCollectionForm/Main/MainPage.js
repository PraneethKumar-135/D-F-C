import React, { useState, useEffect } from 'react';
import PersonalInformation from '../Components/personalInformation';
import HotelInformation from '../Components/hotelInformation';
import SocialMediaInfo from '../Components/SocialMediaInfo';
import SocialMediaInfo2 from '../Components/SocialMediaInfo2';
import AllData from './AllData';
import { useDispatch, useSelector } from 'react-redux';
import { updatedCurrentPage, updateinputs } from '../../Redux/Slice/PersonalInfoSlice';

function MainPage() {
    const PageUpdate = useSelector((state) => state.personalInformation.currentPage)
    const [currentPage, setCurrentPage] = useState(PageUpdate);
    const [Loading, setLoading] = useState(false);
    const [transitioning, setTransitioning] = useState(false);
    const [Alldata, setAllData] = useState(false)
    const totalPages = 4;
    const dispatch = useDispatch();


    const LoadingPage = () => (
        <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-opacity-50 z-10 ">
            <div className="text-2xl text-center">Please Wait While Your Details are Loading...</div>
        </div>
    );



    const handleNextPage = () => {
        setTransitioning(true);
        setTimeout(() => {
            setCurrentPage(PageUpdate);
            setTransitioning(false);
        }, 300);
    };

    const handlePreviousPage = () => {

        setTransitioning(true);
        setTimeout(() => {
            setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
            setTransitioning(false);
        }, 300);
    };
    const handleAlldataPage = () => {
        setLoading(true);
        setTimeout(() => {
            setAllData(true);
        }, 2000)
        setAllData(false);
    }

    const pageComponents = {
        1: <PersonalInformation />,
        2: <HotelInformation />,
        3: <SocialMediaInfo />,
        4: <SocialMediaInfo2 />
    };
    console.log("CurrentPage: " + currentPage);

    return (
        <>
            {Alldata ? <AllData /> : (
                <div className="w-full relative">
                    {Loading ? <LoadingPage /> : (
                        <>
                            {currentPage === 1 ? null : (
                                <span className='flex items-center w-[2%] fixed left-0 top-[14rem]'>

                                    <button className="text-2xl p-2 h-32 translate-x-2 border border-black rounded-full" onClick={handlePreviousPage} disabled={currentPage === 1}>
                                        {"<"}
                                    </button>
                                </span>
                            )}

                            <div className={`w-[94%] absolute  ${currentPage === 1 ? "left-5" : "left-10"}  transition-opacity duration-300 ${transitioning ? "opacity-0" : "opacity-100"}`}>
                                {pageComponents[currentPage] || null}

                                {currentPage === 4 && (
                                    <div className="flex justify-end mt-5 mb-2">
                                        <button
                                            className="border bg-green-500 rounded-md px-3 py-1 text-white"
                                            onClick={handleAlldataPage}
                                        >
                                            Save
                                        </button>
                                    </div>
                                )}
                            </div>

                            {currentPage !== 4 && (
                                <span className='flex items-center w-[2%] fixed right-5 top-[14rem]'>
                                    <button className="text-2xl p-2 h-32 translate-x-2 border border-black rounded-full" onClick={handleNextPage} disabled={currentPage === totalPages} >
                                        {">"}
                                    </button>
                                </span>
                            )}
                        </>
                    )}
                </div>

            )}
        </>
    );
}

export default MainPage;
