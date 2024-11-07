import React, { useState, useEffect } from 'react';
import PersonalInformation from '../Components/personalInformation';
import HotelInformation from '../Components/hotelInformation';
import SocialMediaInfo from '../Components/SocialMediaInfo';
import SocialMediaInfo2 from '../Components/SocialMediaInfo2';
import { useSelector } from 'react-redux';
import AllData from './AllData';

function MainPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const [Loading, setLoading] = useState(false);
    const [transitioning, setTransitioning] = useState(false);
    const [Alldata, setAllData] = useState(false)
    const totalPages = 4;


    const LoadingPage = () => (
        <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-opacity-50 z-10 ">
            <div className="text-2xl text-center">Please Wait While Your Details are Loading...</div>
        </div>
    );

    const handleNextPage = () => {
        setTransitioning(true);
        setTimeout(() => {
            setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
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

    return (
        <>
            {Alldata ? <AllData /> : (
                <div className="flex justify-around gap-5 w-full relative min-h-screen">
                    {Loading ? <LoadingPage /> : (
                        <>
                            <button className="rounded-md text-2xl w-[2%] hover:text-4xl hover:translate-x-2" onClick={handlePreviousPage} disabled={currentPage === 1}>
                                {"<"}
                            </button>
                            <div className={`w-[96%] transition-opacity duration-300 ${transitioning ? "opacity-0" : "opacity-100"}`}>
                                {pageComponents[currentPage] || null}
                            </div>
                            {currentPage === 4 ? (
                                <span className='absolute bottom-[-50px] right-4 pb-5'>
                                    <button
                                        className="border bg-green-500 rounded-md px-3 py-1 text-white "
                                        onClick={handleAlldataPage}
                                    >
                                        {"Save"}
                                    </button>
                                </span>
                            ) : (
                                <button
                                    className="rounded-md text-2xl w-[2%] hover:text-4xl hover:translate-x-2"
                                    onClick={handleNextPage}
                                    disabled={currentPage === totalPages}
                                >
                                    {">"}
                                </button>
                            )}
                        </>
                    )}
                </div>
            )}
        </>
    );
}

export default MainPage;
